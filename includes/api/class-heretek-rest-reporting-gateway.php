<?php
/**
 * Heretek Analytics REST Reporting Gateway.
 *
 * Provides local REST endpoints for direct Google Analytics 4 Data API access.
 * Authentication is performed server-to-server using a Google Cloud service
 * account JSON key stored by the site administrator in the plugin settings.
 *
 * @package Heretek_Analytics
 * @subpackage API
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Rest_Reporting_Gateway {

	const REST_NAMESPACE = 'heretek-analytics/v1';
	const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
	const GA4_DATA_API_BASE = 'https://analyticsdata.googleapis.com/v1beta';
	const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
	const TOKEN_TRANSIENT_PREFIX = 'heretek_ga4_sa_token_';
	const TOKEN_TTL_SECONDS = 50 * MINUTE_IN_SECONDS;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Register REST routes.
	 */
	public function register_rest_routes() {
		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/query',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_reporting_query' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);

		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/api/v3/reporting/query',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_reporting_query' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);
	}

	/**
	 * Permission check.
	 *
	 * @return bool
	 */
	public function check_permission() {
		return current_user_can( 'monsterinsights_view_dashboard' ) || current_user_can( 'manage_options' );
	}

	/**
	 * REST handler: run one or more GA4 Data API reports and return formatted rows.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function handle_reporting_query( WP_REST_Request $request ) {
		$body = $request->get_json_params();
		if ( empty( $body ) ) {
			$body = $request->get_params();
		}

		$start   = ! empty( $body['start'] ) ? sanitize_text_field( $body['start'] ) : date( 'Y-m-d', strtotime( '-30 days' ) );
		$end     = ! empty( $body['end'] )   ? sanitize_text_field( $body['end'] )   : date( 'Y-m-d' );
		$queries = ! empty( $body['queries'] ) ? (array) $body['queries'] : array();

		$data = array();
		foreach ( $queries as $q ) {
			$query_id   = ! empty( $q['id'] ) ? sanitize_text_field( $q['id'] ) : 'query';
			$result     = $this->run_ga4_report( $q, $start, $end );
			$data[ $query_id ] = is_wp_error( $result )
				? array( 'error' => $result->get_error_message() )
				: $result;
		}

		return new WP_REST_Response( array(
			'success' => true,
			'data'    => $data,
		), 200 );
	}

	/**
	 * Public runner used by the PHP reports page (no WP_REST_Request needed).
	 *
	 * @param array  $queries List of query specs (id, dimensions, metrics, limit).
	 * @param string $start   ISO-8601 date or relative like '-30days'.
	 * @param string $end     ISO-8601 date or 'today'.
	 * @return array
	 */
	public function run_reports( array $queries, $start = '-30days', $end = 'today' ) {
		$start_date = $this->resolve_date( $start, strtotime( '-30 days' ) );
		$end_date   = $this->resolve_date( $end, time() );

		$data = array();
		foreach ( $queries as $q ) {
			$query_id = ! empty( $q['id'] ) ? sanitize_key( $q['id'] ) : 'query';
			$result   = $this->run_ga4_report( $q, $start_date, $end_date );
			$data[ $query_id ] = is_wp_error( $result )
				? array( 'error' => $result->get_error_message() )
				: $result;
		}
		return $data;
	}

	/**
	 * Verify a stored service account JSON + Property ID by minting a token and
	 * calling the GA4 Admin API metadata endpoint.
	 *
	 * @param string|null $sa_json     Optional override; defaults to stored value.
	 * @param string|null $property_id Optional override; defaults to stored value.
	 * @return true|WP_Error True on success; WP_Error with human-readable message on failure.
	 */
	public function verify_credentials( $sa_json = null, $property_id = null ) {
		if ( null === $sa_json ) {
			$sa_json = MonsterInsights()->auth->get_service_account_json();
		}
		if ( null === $property_id ) {
			$property_id = MonsterInsights()->auth->get_property_id();
		}
		if ( empty( $sa_json ) ) {
			return new WP_Error( 'heretek_no_sa', 'Service account JSON is not configured.' );
		}
		if ( empty( $property_id ) ) {
			return new WP_Error( 'heretek_no_pid', 'GA4 Property ID is not configured.' );
		}
		$token = $this->get_access_token( $sa_json );
		if ( is_wp_error( $token ) ) {
			return $token;
		}
		$resp = wp_remote_get(
			sprintf( '%s/properties/%s/metadata', self::GA4_DATA_API_BASE, rawurlencode( $property_id ) ),
			array(
				'headers' => array(
					'Authorization' => 'Bearer ' . $token,
				),
				'timeout' => 15,
			)
		);
		if ( is_wp_error( $resp ) ) {
			return $resp;
		}
		$code    = wp_remote_retrieve_response_code( $resp );
		$payload = json_decode( wp_remote_retrieve_body( $resp ), true );
		if ( $code >= 400 ) {
			$msg = ! empty( $payload['error']['message'] ) ? $payload['error']['message'] : 'GA4 Admin API error';
			return new WP_Error( 'heretek_ga4_error', $msg, array( 'status' => $code ) );
		}
		return true;
	}

	/**
	 * Resolve a date string into YYYY-MM-DD.
	 *
	 * Accepts ISO-8601 dates ('2024-01-15') and relative markers like '-30days' or 'today'.
	 *
	 * @param string $value
	 * @param int    $default_ts Fallback timestamp if parsing fails.
	 * @return string
	 */
	private function resolve_date( $value, $default_ts ) {
		if ( is_string( $value ) && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value ) ) {
			return $value;
		}
		$ts = strtotime( (string) $value );
		if ( false === $ts ) {
			$ts = $default_ts;
		}
		return gmdate( 'Y-m-d', $ts );
	}

	/**
	 * Execute a single GA4 Data API runReport call.
	 *
	 * @param array  $q     Query spec.
	 * @param string $start YYYY-MM-DD start date.
	 * @param string $end   YYYY-MM-DD end date.
	 * @return array|WP_Error Formatted rows array or WP_Error.
	 */
	private function run_ga4_report( array $q, $start, $end ) {
		$auth = MonsterInsights()->auth;
		$sa   = $auth->get_service_account_json();
		$pid  = $auth->get_property_id();

		if ( empty( $sa ) || empty( $pid ) ) {
			return new WP_Error(
				'heretek_no_credentials',
				'GA4 service account JSON and Property ID must be configured in Heretek Analytics Settings.'
			);
		}

		$token = $this->get_access_token( $sa );
		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$dimensions = ! empty( $q['dimensions'] ) ? array_map( 'sanitize_text_field', (array) $q['dimensions'] ) : array();
		$metrics    = ! empty( $q['metrics'] )    ? array_map( 'sanitize_text_field', (array) $q['metrics'] )    : array( 'sessions' );
		$limit      = isset( $q['limit'] ) ? min( max( 1, (int) $q['limit'] ), 50 ) : 10;

		$body = array(
			'dateRanges' => array( array( 'startDate' => $start, 'endDate' => $end ) ),
			'metrics'    => array_map(
				static function ( $m ) {
					return array( 'name' => $m );
				},
				$metrics
			),
			'limit'      => $limit,
		);
		if ( ! empty( $dimensions ) ) {
			$body['dimensions'] = array_map(
				static function ( $d ) {
					return array( 'name' => $d );
				},
				$dimensions
			);
		}

		$url  = sprintf( '%s/properties/%s:runReport', self::GA4_DATA_API_BASE, rawurlencode( $pid ) );
		$resp = wp_remote_post(
			$url,
			array(
				'headers' => array(
					'Authorization' => 'Bearer ' . $token,
					'Content-Type'  => 'application/json',
				),
				'body'    => wp_json_encode( $body ),
				'timeout' => 20,
			)
		);

		if ( is_wp_error( $resp ) ) {
			return $resp;
		}

		$code    = wp_remote_retrieve_response_code( $resp );
		$payload = json_decode( wp_remote_retrieve_body( $resp ), true );

		if ( $code >= 400 ) {
			$msg = ! empty( $payload['error']['message'] ) ? $payload['error']['message'] : 'GA4 Data API error';
			return new WP_Error( 'heretek_ga4_error', $msg, array( 'status' => $code ) );
		}

		return $this->format_rows( $payload );
	}

	/**
	 * Mint a service-account JWT and exchange it for an OAuth2 access token.
	 *
	 * Tokens are cached in transients keyed by an MD5 of the SA JSON.
	 *
	 * @param string $sa_json
	 * @return string|WP_Error Bearer token on success.
	 */
	private function get_access_token( $sa_json ) {
		$sa = json_decode( $sa_json, true );
		if ( ! is_array( $sa ) || empty( $sa['client_email'] ) || empty( $sa['private_key'] ) ) {
			return new WP_Error(
				'heretek_bad_sa',
				'Service account JSON is missing client_email or private_key.'
			);
		}

		$cache_key = self::TOKEN_TRANSIENT_PREFIX . md5( $sa_json );
		$cached    = get_transient( $cache_key );
		if ( ! empty( $cached ) && is_string( $cached ) ) {
			return $cached;
		}

		$now    = time();
		$header = $this->b64url_encode( wp_json_encode( array( 'alg' => 'RS256', 'typ' => 'JWT' ) ) );
		$claim  = $this->b64url_encode( wp_json_encode( array(
			'iss'   => $sa['client_email'],
			'scope' => self::GA4_SCOPE,
			'aud'   => self::OAUTH_TOKEN_URL,
			'iat'   => $now,
			'exp'   => $now + 3600,
		) ) );

		$signing_input = $header . '.' . $claim;
		$signature     = '';
		$ok            = openssl_sign( $signing_input, $signature, $sa['private_key'], OPENSSL_ALGO_SHA256 );
		if ( ! $ok ) {
			return new WP_Error( 'heretek_sign_failed', 'Failed to sign JWT with the service account private key.' );
		}
		$jwt = $signing_input . '.' . $this->b64url_encode( $signature );

		$resp = wp_remote_post(
			self::OAUTH_TOKEN_URL,
			array(
				'timeout' => 15,
				'body'    => array(
					'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
					'assertion'  => $jwt,
				),
			)
		);

		if ( is_wp_error( $resp ) ) {
			return $resp;
		}

		$payload = json_decode( wp_remote_retrieve_body( $resp ), true );
		if ( empty( $payload['access_token'] ) || ! is_string( $payload['access_token'] ) ) {
			$detail = ! empty( $payload['error_description'] ) ? $payload['error_description'] : '';
			$msg    = 'Failed to mint GA4 access token.';
			if ( ! empty( $detail ) ) {
				$msg .= ' ' . $detail;
			}
			return new WP_Error( 'heretek_token_failed', $msg, $payload );
		}

		set_transient( $cache_key, $payload['access_token'], self::TOKEN_TTL_SECONDS );
		return $payload['access_token'];
	}

	/**
	 * Base64URL-encode without padding (RFC 7515).
	 *
	 * @param string $data
	 * @return string
	 */
	private function b64url_encode( $data ) {
		return rtrim( strtr( base64_encode( $data ), '+/', '-_' ), '=' );
	}

	/**
	 * Reshape a GA4 runReport response into a Vue-friendly rows array.
	 *
	 * Returns:
	 *   array(
	 *       'dimensionHeaders' => array( 'date', 'pageTitle', … ),
	 *       'metricHeaders'    => array( 'sessions', 'totalUsers', … ),
	 *       'rows'             => array(
	 *           array(
	 *               'd' => array( '20240901', 'Home' ),
	 *               'm' => array( array( 'value' => '1234' ), array( 'value' => '987' ) ),
	 *           ),
	 *       ),
	 *   )
	 *
	 * @param array $payload Raw GA4 API response.
	 * @return array
	 */
	private function format_rows( $payload ) {
		$dim_headers = array();
		if ( ! empty( $payload['dimensionHeaders'] ) && is_array( $payload['dimensionHeaders'] ) ) {
			foreach ( $payload['dimensionHeaders'] as $h ) {
				$dim_headers[] = isset( $h['name'] ) ? (string) $h['name'] : '';
			}
		}
		$met_headers = array();
		if ( ! empty( $payload['metricHeaders'] ) && is_array( $payload['metricHeaders'] ) ) {
			foreach ( $payload['metricHeaders'] as $h ) {
				$met_headers[] = isset( $h['name'] ) ? (string) $h['name'] : '';
			}
		}

		$rows = array();
		if ( ! empty( $payload['rows'] ) && is_array( $payload['rows'] ) ) {
			foreach ( $payload['rows'] as $row ) {
				$d = array();
				if ( ! empty( $row['dimensionValues'] ) ) {
					foreach ( $row['dimensionValues'] as $dv ) {
						$d[] = isset( $dv['value'] ) ? (string) $dv['value'] : '';
					}
				}
				$m = array();
				if ( ! empty( $row['metricValues'] ) ) {
					foreach ( $row['metricValues'] as $mv ) {
						$m[] = array( 'value' => isset( $mv['value'] ) ? (string) $mv['value'] : '0' );
					}
				}
				$rows[] = array(
					'd' => $d,
					'm' => $m,
				);
			}
		}

		return array(
			'dimensionHeaders' => $dim_headers,
			'metricHeaders'    => $met_headers,
			'rows'             => $rows,
			'rowCount'         => count( $rows ),
			'metadata'         => array(
				'currencyCode' => isset( $payload['metadata']['currencyCode'] ) ? (string) $payload['metadata']['currencyCode'] : 'USD',
				'timeZone'     => isset( $payload['metadata']['timeZone'] ) ? (string) $payload['metadata']['timeZone']   : 'UTC',
			),
		);
	}
}

new Heretek_Rest_Reporting_Gateway();
