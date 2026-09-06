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
	const CACHE_TRANSIENT_PREFIX = 'heretek_ga4_cache_';
	const CACHE_TTL_DEFAULT = 900; // 15 minutes for historical data
	const CACHE_TTL_TODAY = 180;   // 3 minutes for current day
	const CACHE_TTL_REALTIME = 30; // 30 seconds for live stream

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
		// Single comprehensive dashboard telemetry endpoint
		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/dashboard',
			array(
				array(
					'methods'             => array( 'GET', 'POST' ),
					'callback'            => array( $this, 'handle_dashboard_query' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
			)
		);

		// Realtime live telemetry endpoint
		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/realtime',
			array(
				array(
					'methods'             => array( 'GET', 'POST' ),
					'callback'            => array( $this, 'handle_realtime_query' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
			)
		);

		// Credentials verification endpoint
		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/verify',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'handle_verify_query' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
			)
		);

		// General batch query endpoint
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
	 * REST handler for the dashboard intelligence bundle.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function handle_dashboard_query( WP_REST_Request $request ) {
		$params = $request->get_params();
		$start  = ! empty( $params['start'] ) ? sanitize_text_field( $params['start'] ) : '-30days';
		$end    = ! empty( $params['end'] )   ? sanitize_text_field( $params['end'] )   : 'today';
		$force  = ! empty( $params['force_refresh'] ) && ( 'true' === (string) $params['force_refresh'] || 1 === (int) $params['force_refresh'] );

		$data = $this->get_dashboard_telemetry( $start, $end, $force );

		return new WP_REST_Response( array(
			'success' => empty( $data['error'] ),
			'data'    => $data,
		), 200 );
	}

	/**
	 * REST handler for realtime telemetry.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function handle_realtime_query( WP_REST_Request $request ) {
		$params = $request->get_params();
		$force  = ! empty( $params['force_refresh'] ) && ( 'true' === (string) $params['force_refresh'] || 1 === (int) $params['force_refresh'] );

		$data = $this->run_realtime_summary( $force );

		return new WP_REST_Response( array(
			'success' => empty( $data['error'] ),
			'data'    => $data,
		), 200 );
	}

	/**
	 * REST handler for verifying credentials.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function handle_verify_query( WP_REST_Request $request ) {
		$res = $this->verify_credentials();
		if ( is_wp_error( $res ) ) {
			return new WP_REST_Response( array(
				'success' => false,
				'message' => $res->get_error_message(),
			), 400 );
		}
		$pid = MonsterInsights()->auth->get_property_id();
		return new WP_REST_Response( array(
			'success' => true,
			'message' => sprintf(
				/* translators: %s: GA4 property id */
				__( 'Connected to GA4 property %s successfully.', 'google-analytics-for-wordpress' ),
				$pid
			),
		), 200 );
	}

	/**
	 * REST handler: run arbitrary GA4 Data API reports.
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
	 * Compute the full dashboard telemetry bundle with caching, comparative deltas, and user joins.
	 *
	 * @param string $start
	 * @param string $end
	 * @param bool   $force_refresh
	 * @return array
	 */
	public function get_dashboard_telemetry( $start = '-30days', $end = 'today', $force_refresh = false ) {
		$auth = MonsterInsights()->auth;
		$v4   = $auth->get_manual_v4_id();
		$pid  = $auth->get_property_id();
		$sa   = $auth->get_service_account_json();

		if ( empty( $v4 ) ) {
			return array(
				'configured' => false,
				'error'      => __( 'A GA4 Measurement ID is required. Please enter one in Settings.', 'google-analytics-for-wordpress' ),
			);
		}

		if ( empty( $pid ) || empty( $sa ) ) {
			return array(
				'configured' => false,
				'error'      => __( 'GA4 Property ID and Google Cloud service account JSON must be configured in Settings.', 'google-analytics-for-wordpress' ),
			);
		}

		$start_date = $this->resolve_date( $start, strtotime( '-30 days' ) );
		$end_date   = $this->resolve_date( $end, time() );

		// Calculate matching previous comparison window
		$start_ts  = strtotime( $start_date );
		$end_ts    = strtotime( $end_date );
		$diff_sec  = max( DAY_IN_SECONDS, abs( $end_ts - $start_ts ) );
		$diff_days = (int) round( $diff_sec / DAY_IN_SECONDS ) + 1;

		$prev_end_ts   = $start_ts - DAY_IN_SECONDS;
		$prev_start_ts = $prev_end_ts - ( ( $diff_days - 1 ) * DAY_IN_SECONDS );

		$prev_start_date = gmdate( 'Y-m-d', $prev_start_ts );
		$prev_end_date   = gmdate( 'Y-m-d', $prev_end_ts );

		$cache_key = self::CACHE_TRANSIENT_PREFIX . md5( $pid . '_' . $start_date . '_' . $end_date );
		if ( ! $force_refresh ) {
			$cached = get_transient( $cache_key );
			if ( ! empty( $cached ) && is_array( $cached ) ) {
				$cached['from_cache'] = true;
				return $cached;
			}
		}

		// Prepare queries
		$queries = array(
			// Daily timeline for chart
			array(
				'id'         => 'overview',
				'dimensions' => array( 'date' ),
				'metrics'    => array( 'sessions', 'totalUsers', 'screenPageViews', 'userEngagementDuration', 'engagedSessions' ),
				'limit'      => 90,
				'orderBys'   => array( array( 'dimension' => array( 'dimensionName' => 'date' ), 'desc' => false ) ),
			),
			// Aggregated current totals
			array(
				'id'      => 'current_totals',
				'metrics' => array( 'sessions', 'totalUsers', 'screenPageViews', 'userEngagementDuration', 'engagedSessions', 'bounceRate' ),
				'limit'   => 1,
			),
			// Channels
			array(
				'id'         => 'channels',
				'dimensions' => array( 'sessionDefaultChannelGroup' ),
				'metrics'    => array( 'sessions', 'totalUsers', 'screenPageViews' ),
				'limit'      => 10,
			),
			// Devices
			array(
				'id'         => 'devices',
				'dimensions' => array( 'deviceCategory' ),
				'metrics'    => array( 'sessions', 'totalUsers' ),
				'limit'      => 6,
			),
			// Browsers
			array(
				'id'         => 'browsers',
				'dimensions' => array( 'browser' ),
				'metrics'    => array( 'sessions' ),
				'limit'      => 8,
			),
			// Operating Systems
			array(
				'id'         => 'operating_systems',
				'dimensions' => array( 'operatingSystem' ),
				'metrics'    => array( 'sessions' ),
				'limit'      => 8,
			),
			// Top Pages
			array(
				'id'         => 'top_pages',
				'dimensions' => array( 'pageTitle', 'pagePath' ),
				'metrics'    => array( 'screenPageViews', 'totalUsers', 'userEngagementDuration', 'bounceRate' ),
				'limit'      => 15,
			),
			// Top Sources
			array(
				'id'         => 'top_sources',
				'dimensions' => array( 'sessionSource', 'sessionMedium' ),
				'metrics'    => array( 'sessions', 'totalUsers' ),
				'limit'      => 12,
			),
			// Top Countries
			array(
				'id'         => 'top_countries',
				'dimensions' => array( 'country' ),
				'metrics'    => array( 'sessions', 'totalUsers' ),
				'limit'      => 12,
			),
			// Top Cities
			array(
				'id'         => 'top_cities',
				'dimensions' => array( 'city', 'country' ),
				'metrics'    => array( 'sessions' ),
				'limit'      => 12,
			),
			// Top Authors
			array(
				'id'         => 'top_authors',
				'dimensions' => array( 'customUser:author_id' ),
				'metrics'    => array( 'sessions', 'screenPageViews', 'totalUsers', 'engagedSessions' ),
				'limit'      => 15,
			),
		);

		// Execute current period reports
		$current_reports = array();
		foreach ( $queries as $q ) {
			$qid = $q['id'];
			$res = $this->run_ga4_report( $q, $start_date, $end_date );
			$current_reports[ $qid ] = is_wp_error( $res )
				? array( 'error' => $res->get_error_message() )
				: $res;
		}

		// Execute previous period totals for delta comparison
		$prev_totals_query = array(
			'id'      => 'previous_totals',
			'metrics' => array( 'sessions', 'totalUsers', 'screenPageViews', 'userEngagementDuration', 'engagedSessions', 'bounceRate' ),
			'limit'   => 1,
		);
		$prev_res = $this->run_ga4_report( $prev_totals_query, $prev_start_date, $prev_end_date );
		$previous_totals = is_wp_error( $prev_res ) ? array() : $prev_res;

		// Extract metrics & compute deltas
		$cur_m  = isset( $current_reports['current_totals']['rows'][0]['m'] ) ? $current_reports['current_totals']['rows'][0]['m'] : array();
		$prev_m = isset( $previous_totals['rows'][0]['m'] ) ? $previous_totals['rows'][0]['m'] : array();

		$sessions_cur = isset( $cur_m[0]['value'] ) ? (int) $cur_m[0]['value'] : 0;
		$users_cur    = isset( $cur_m[1]['value'] ) ? (int) $cur_m[1]['value'] : 0;
		$views_cur    = isset( $cur_m[2]['value'] ) ? (int) $cur_m[2]['value'] : 0;
		$duration_cur = isset( $cur_m[3]['value'] ) ? (float) $cur_m[3]['value'] : 0.0;
		$engaged_cur  = isset( $cur_m[4]['value'] ) ? (int) $cur_m[4]['value'] : 0;
		$bounce_cur   = isset( $cur_m[5]['value'] ) ? (float) $cur_m[5]['value'] : 0.0;

		$sessions_prev = isset( $prev_m[0]['value'] ) ? (int) $prev_m[0]['value'] : 0;
		$users_prev    = isset( $prev_m[1]['value'] ) ? (int) $prev_m[1]['value'] : 0;
		$views_prev    = isset( $prev_m[2]['value'] ) ? (int) $prev_m[2]['value'] : 0;
		$duration_prev = isset( $prev_m[3]['value'] ) ? (float) $prev_m[3]['value'] : 0.0;
		$engaged_prev  = isset( $prev_m[4]['value'] ) ? (int) $prev_m[4]['value'] : 0;
		$bounce_prev   = isset( $prev_m[5]['value'] ) ? (float) $prev_m[5]['value'] : 0.0;

		$avg_duration_cur  = $sessions_cur > 0 ? ( $duration_cur / $sessions_cur ) : 0;
		$avg_duration_prev = $sessions_prev > 0 ? ( $duration_prev / $sessions_prev ) : 0;

		$engagement_rate_cur  = $sessions_cur > 0 ? ( ( $engaged_cur / $sessions_cur ) * 100 ) : 0;
		$engagement_rate_prev = $sessions_prev > 0 ? ( ( $engaged_prev / $sessions_prev ) * 100 ) : 0;

		$views_per_user_cur  = $users_cur > 0 ? ( $views_cur / $users_cur ) : 0;
		$views_per_user_prev = $users_prev > 0 ? ( $views_prev / $users_prev ) : 0;

		$calc_delta = static function( $cur, $prev ) {
			if ( $prev <= 0 ) {
				return $cur > 0 ? 100.0 : 0.0;
			}
			return round( ( ( $cur - $prev ) / $prev ) * 100, 1 );
		};

		$kpis = array(
			'sessions' => array(
				'value'      => $sessions_cur,
				'prev_value' => $sessions_prev,
				'delta'      => $calc_delta( $sessions_cur, $sessions_prev ),
			),
			'users' => array(
				'value'      => $users_cur,
				'prev_value' => $users_prev,
				'delta'      => $calc_delta( $users_cur, $users_prev ),
			),
			'pageviews' => array(
				'value'      => $views_cur,
				'prev_value' => $views_prev,
				'delta'      => $calc_delta( $views_cur, $views_prev ),
			),
			'avg_duration' => array(
				'value'      => round( $avg_duration_cur ),
				'prev_value' => round( $avg_duration_prev ),
				'delta'      => $calc_delta( $avg_duration_cur, $avg_duration_prev ),
			),
			'engagement_rate' => array(
				'value'      => round( $engagement_rate_cur, 1 ),
				'prev_value' => round( $engagement_rate_prev, 1 ),
				'delta'      => $calc_delta( $engagement_rate_cur, $engagement_rate_prev ),
			),
			'views_per_user' => array(
				'value'      => round( $views_per_user_cur, 1 ),
				'prev_value' => round( $views_per_user_prev, 1 ),
				'delta'      => $calc_delta( $views_per_user_cur, $views_per_user_prev ),
			),
			'bounce_rate' => array(
				'value'      => round( $bounce_cur * 100, 1 ),
				'prev_value' => round( $bounce_prev * 100, 1 ),
				'delta'      => $calc_delta( $bounce_cur, $bounce_prev ),
			),
		);

		// Resolve Author IDs with WordPress users
		$author_ids = array();
		$author_rows = isset( $current_reports['top_authors']['rows'] ) && is_array( $current_reports['top_authors']['rows'] )
			? $current_reports['top_authors']['rows']
			: array();

		foreach ( $author_rows as $arow ) {
			$aid = isset( $arow['d'][0] ) ? (string) $arow['d'][0] : '';
			if ( '' !== $aid && '(not set)' !== $aid && ctype_digit( $aid ) ) {
				$author_ids[] = (int) $aid;
			}
		}

		$author_lookup = array();
		if ( ! empty( $author_ids ) ) {
			$wp_users = get_users( array(
				'include' => array_values( array_unique( $author_ids ) ),
				'fields'  => array( 'ID', 'display_name', 'user_email' ),
			) );
			foreach ( $wp_users as $u ) {
				$author_lookup[ (int) $u->ID ] = array(
					'id'       => (int) $u->ID,
					'name'     => $u->display_name,
					'email'    => $u->user_email,
					'avatar'   => get_avatar_url( $u->ID, array( 'size' => 48 ) ),
					'edit_url' => get_edit_user_link( $u->ID ),
				);
			}
		}

		// Find any global API error
		$error = '';
		foreach ( $current_reports as $panel ) {
			if ( is_array( $panel ) && ! empty( $panel['error'] ) ) {
				$error = $panel['error'];
				break;
			}
		}

		$payload = array(
			'configured'     => true,
			'property_id'    => $pid,
			'measurement_id' => $v4,
			'start_date'     => $start_date,
			'end_date'       => $end_date,
			'prev_start'     => $prev_start_date,
			'prev_end'       => $prev_end_date,
			'kpis'           => $kpis,
			'reports'        => $current_reports,
			'author_lookup'  => $author_lookup,
			'error'          => $error,
			'updated_at'     => current_time( 'mysql' ),
			'from_cache'     => false,
		);

		// Cache TTL decision: 3 mins if ending today, else 15 mins
		$ttl = ( $end_date >= gmdate( 'Y-m-d' ) ) ? self::CACHE_TTL_TODAY : self::CACHE_TTL_DEFAULT;
		set_transient( $cache_key, $payload, $ttl );

		return $payload;
	}

	/**
	 * Run the live GA4 Realtime telemetry summary.
	 *
	 * @param bool $force_refresh
	 * @return array
	 */
	public function run_realtime_summary( $force_refresh = false ) {
		$auth = MonsterInsights()->auth;
		$pid  = $auth->get_property_id();
		$v4   = $auth->get_manual_v4_id();
		$sa   = $auth->get_service_account_json();

		if ( empty( $pid ) || empty( $sa ) ) {
			return array(
				'configured' => false,
				'error'      => __( 'GA4 Property ID and service account JSON are required for realtime telemetry.', 'google-analytics-for-wordpress' ),
			);
		}

		$cache_key = self::CACHE_TRANSIENT_PREFIX . 'realtime_' . $pid;
		if ( ! $force_refresh ) {
			$cached = get_transient( $cache_key );
			if ( ! empty( $cached ) && is_array( $cached ) ) {
				$cached['from_cache'] = true;
				return $cached;
			}
		}

		// Realtime active users
		$active_total_res = $this->run_ga4_realtime_report( array(
			'metrics' => array( 'activeUsers' ),
		) );
		$active_users = 0;
		if ( ! is_wp_error( $active_total_res ) && ! empty( $active_total_res['rows'][0]['m'][0]['value'] ) ) {
			$active_users = (int) $active_total_res['rows'][0]['m'][0]['value'];
		}

		// Minutes ago breakdown (0 to 29)
		$minutes_res = $this->run_ga4_realtime_report( array(
			'dimensions' => array( 'minutesAgo' ),
			'metrics'    => array( 'activeUsers' ),
			'limit'      => 30,
		) );

		// Top active pages
		$pages_res = $this->run_ga4_realtime_report( array(
			'dimensions' => array( 'unifiedScreenName' ),
			'metrics'    => array( 'screenPageViews' ),
			'limit'      => 10,
		) );

		// Top countries
		$countries_res = $this->run_ga4_realtime_report( array(
			'dimensions' => array( 'country' ),
			'metrics'    => array( 'activeUsers' ),
			'limit'      => 8,
		) );

		// Devices
		$devices_res = $this->run_ga4_realtime_report( array(
			'dimensions' => array( 'deviceCategory' ),
			'metrics'    => array( 'activeUsers' ),
			'limit'      => 4,
		) );

		$data = array(
			'configured'     => true,
			'property_id'    => $pid,
			'measurement_id' => $v4,
			'active_users'   => $active_users,
			'timestamp'      => time(),
			'minutes'        => is_wp_error( $minutes_res ) ? array() : ( isset( $minutes_res['rows'] ) ? $minutes_res['rows'] : array() ),
			'pages'          => is_wp_error( $pages_res ) ? array() : ( isset( $pages_res['rows'] ) ? $pages_res['rows'] : array() ),
			'countries'      => is_wp_error( $countries_res ) ? array() : ( isset( $countries_res['rows'] ) ? $countries_res['rows'] : array() ),
			'devices'        => is_wp_error( $devices_res ) ? array() : ( isset( $devices_res['rows'] ) ? $devices_res['rows'] : array() ),
			'updated_at'     => current_time( 'mysql' ),
			'from_cache'     => false,
		);

		set_transient( $cache_key, $data, self::CACHE_TTL_REALTIME );
		return $data;
	}

	/**
	 * Public runner used by PHP pages for arbitrary reports.
	 *
	 * @param array  $queries
	 * @param string $start
	 * @param string $end
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
	 * Verify a stored service account JSON + Property ID.
	 *
	 * @param string|null $sa_json
	 * @param string|null $property_id
	 * @return true|WP_Error
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
	 * @param string $value
	 * @param int    $default_ts
	 * @return string
	 */
	public function resolve_date( $value, $default_ts ) {
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
	 * @param array  $q
	 * @param string $start
	 * @param string $end
	 * @return array|WP_Error
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
		$limit      = isset( $q['limit'] ) ? min( max( 1, (int) $q['limit'] ), 100 ) : 10;

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
		if ( ! empty( $q['orderBys'] ) && is_array( $q['orderBys'] ) ) {
			$body['orderBys'] = $q['orderBys'];
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
	 * Execute a single GA4 Data API runRealtimeReport call.
	 *
	 * @param array $q
	 * @return array|WP_Error
	 */
	private function run_ga4_realtime_report( array $q ) {
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
		$metrics    = ! empty( $q['metrics'] )    ? array_map( 'sanitize_text_field', (array) $q['metrics'] )    : array( 'activeUsers' );
		$limit      = isset( $q['limit'] ) ? min( max( 1, (int) $q['limit'] ), 50 ) : 10;

		$body = array(
			'metrics' => array_map(
				static function ( $m ) {
					return array( 'name' => $m );
				},
				$metrics
			),
			'limit'   => $limit,
		);
		if ( ! empty( $dimensions ) ) {
			$body['dimensions'] = array_map(
				static function ( $d ) {
					return array( 'name' => $d );
				},
				$dimensions
			);
		}

		$url  = sprintf( '%s/properties/%s:runRealtimeReport', self::GA4_DATA_API_BASE, rawurlencode( $pid ) );
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
			$msg = ! empty( $payload['error']['message'] ) ? $payload['error']['message'] : 'GA4 Realtime API error';
			return new WP_Error( 'heretek_ga4_realtime_error', $msg, array( 'status' => $code ) );
		}

		return $this->format_rows( $payload );
	}

	/**
	 * Mint a service-account JWT and exchange it for an OAuth2 access token.
	 *
	 * @param string $sa_json
	 * @return string|WP_Error
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
	 * Reshape a GA4 runReport response into formatted rows.
	 *
	 * @param array $payload
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
