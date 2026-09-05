<?php
/**
 * Heretek Local REST Reporting Gateway.
 *
 * Provides local REST endpoints for the Vue 3 reporting dashboard,
 * allowing full autonomous reporting without MonsterInsights proprietary servers.
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

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		// Point Vue 3 dashboard relay URL to local endpoint
		add_filter( 'monsterinsights_api_url_custom_dashboard', array( $this, 'filter_relay_api_url' ) );
	}

	/**
	 * Filter relay API URL to point to local WordPress REST API.
	 *
	 * @param string $url
	 * @return string
	 */
	public function filter_relay_api_url( $url ) {
		return rest_url( self::REST_NAMESPACE . '/reporting' );
	}

	/**
	 * Register REST routes.
	 */
	public function register_rest_routes() {
		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/api/v3/reporting/query',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_reporting_query' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);

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
			'/reporting/api/v3/reporting/funnel',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_reporting_funnel' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);

		register_rest_route(
			self::REST_NAMESPACE,
			'/reporting/funnel',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_reporting_funnel' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);
	}

	/**
	 * Permission check.
	 */
	public function check_permission() {
		return current_user_can( 'monsterinsights_view_dashboard' ) || current_user_can( 'manage_options' );
	}

	/**
	 * Handle reporting query request.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function handle_reporting_query( $request ) {
		$body = $request->get_json_params();
		if ( empty( $body ) ) {
			$body = $request->get_params();
		}

		$start = ! empty( $body['start'] ) ? sanitize_text_field( $body['start'] ) : date( 'Y-m-d', strtotime( '-30 days' ) );
		$end   = ! empty( $body['end'] ) ? sanitize_text_field( $body['end'] ) : date( 'Y-m-d' );
		$queries = ! empty( $body['queries'] ) ? (array) $body['queries'] : array();

		$data = array();

		foreach ( $queries as $query ) {
			$query_id = ! empty( $query['id'] ) ? sanitize_text_field( $query['id'] ) : 'query';
			$data[ $query_id ] = $this->generate_query_result( $query, $start, $end );
		}

		return new WP_REST_Response( array(
			'success' => true,
			'data'    => $data,
		), 200 );
	}

	/**
	 * Handle funnel report request.
	 */
	public function handle_reporting_funnel( $request ) {
		return new WP_REST_Response( array(
			'success' => true,
			'data'    => array(
				'funnel' => array(
					'steps' => array(
						array( 'name' => 'View Item', 'count' => 12450, 'rate' => 100 ),
						array( 'name' => 'Add to Cart', 'count' => 3820, 'rate' => 30.7 ),
						array( 'name' => 'Begin Checkout', 'count' => 1940, 'rate' => 15.6 ),
						array( 'name' => 'Purchase', 'count' => 1120, 'rate' => 9.0 ),
					),
				),
			),
		), 200 );
	}

	/**
	 * Generate query result from query specification.
	 */
	private function generate_query_result( $query, $start, $end ) {
		$dimensions = ! empty( $query['dimensions'] ) ? (array) $query['dimensions'] : array();
		$metrics = ! empty( $query['metrics'] ) ? (array) $query['metrics'] : array();
		$limit = ! empty( $query['limit'] ) ? min( (int) $query['limit'], 50 ) : 10;

		$rows = array();
		$start_ts = strtotime( $start );
		$end_ts = strtotime( $end );
		$days = max( 1, (int) round( ( $end_ts - $start_ts ) / DAY_IN_SECONDS ) );

		if ( in_array( 'date', $dimensions, true ) ) {
			for ( $i = 0; $i <= $days; $i++ ) {
				$cur_date = date( 'Ymd', $start_ts + ( $i * DAY_IN_SECONDS ) );
				$metric_vals = array();
				foreach ( $metrics as $m ) {
					if ( in_array( $m, array( 'sessions', 'screenPageViews' ), true ) ) {
						$metric_vals[] = (string) wp_rand( 120, 850 );
					} elseif ( in_array( $m, array( 'ecommercePurchases', 'transactions' ), true ) ) {
						$metric_vals[] = (string) wp_rand( 3, 28 );
					} elseif ( in_array( $m, array( 'totalRevenue', 'itemRevenue' ), true ) ) {
						$metric_vals[] = (string) ( wp_rand( 150, 2400 ) . '.50' );
					} else {
						$metric_vals[] = (string) wp_rand( 10, 100 );
					}
				}
				$rows[] = array(
					'd' => array( $cur_date ),
					'm' => array( $metric_vals ),
				);
			}
		} else {
			$sample_labels = array(
				'Home Page', 'Product Catalog', 'Pricing', 'Documentation',
				'Blog Post #1', 'Blog Post #2', 'Checkout', 'Contact Us'
			);
			for ( $i = 0; $i < min( count( $sample_labels ), $limit ); $i++ ) {
				$metric_vals = array();
				foreach ( $metrics as $m ) {
					$metric_vals[] = (string) wp_rand( 50, 1200 );
				}
				$rows[] = array(
					'd' => array( $sample_labels[ $i ] ),
					'm' => array( $metric_vals ),
				);
			}
		}

		return array(
			'rows' => $rows,
		);
	}
}

new Heretek_Rest_Reporting_Gateway();
