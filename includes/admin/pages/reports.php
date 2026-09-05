<?php

/**
 * Heretek Analytics Reports page (pure PHP).
 *
 * The page renders a small dashboard with three GA4 Data API panels: a daily
 * sessions/users/pageviews chart, a top-pages list, and a top-countries list.
 *
 * @since 12.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Body class for the Reports screen.
 *
 * @param string $classes
 * @return string
 */
function monsterinsights_reports_page_body_class( $classes ) {
	if ( ! empty( $_REQUEST['page'] ) && 'monsterinsights_reports' === $_REQUEST['page'] ) {
		$classes .= ' monsterinsights-reporting-page ';
	}
	return $classes;
}
add_filter( 'admin_body_class', 'monsterinsights_reports_page_body_class' );

/**
 * Render the Reports page (server-side, no Vue).
 *
 * @return void
 */
function monsterinsights_reports_page() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	$auth = MonsterInsights()->auth;
	$v4       = $auth->get_manual_v4_id();
	$prop_id  = $auth->get_property_id();
	$has_sa   = (bool) $auth->get_service_account_json();

	// Try to load the REST gateway so we can reuse its `run_reports` helper.
	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$reports = array();
	$error   = '';
	$missing = '';

	if ( empty( $v4 ) ) {
		$missing = __( 'A GA4 Measurement ID is required before reports can load. Open the Settings page to paste one.', 'google-analytics-for-wordpress' );
	} elseif ( empty( $prop_id ) || ! $has_sa ) {
		$missing = __( 'A GA4 Property ID and a Google Cloud service account JSON key are required for direct reporting. Open the Settings page to paste them.', 'google-analytics-for-wordpress' );
	} else {
		$reports = $gateway->run_reports(
			array(
				array(
					'id'         => 'overview',
					'dimensions' => array( 'date' ),
					'metrics'    => array( 'sessions', 'totalUsers', 'screenPageViews' ),
					'limit'      => 30,
				),
				array(
					'id'         => 'top_pages',
					'dimensions' => array( 'pageTitle', 'pagePath' ),
					'metrics'    => array( 'screenPageViews' ),
					'limit'      => 10,
				),
				array(
					'id'         => 'top_countries',
					'dimensions' => array( 'country' ),
					'metrics'    => array( 'sessions' ),
					'limit'      => 10,
				),
			),
			'-30days',
			'today'
		);

		// If any panel errored, surface a single-line message at the top.
		foreach ( $reports as $panel ) {
			if ( is_array( $panel ) && ! empty( $panel['error'] ) ) {
				$error = $panel['error'];
				break;
			}
		}
	}

	$settings_url = admin_url( 'admin.php?page=monsterinsights_settings' );

	include MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/templates/reports-dashboard.php';
}

/**
 * Vue 3 overview report stub.
 *
 * Kept as an empty placeholder so any stale admin-ajax hook pointing here
 * does not 500. The real screen lives at `monsterinsights_reports_page()`.
 *
 * @return void
 */
function monsterinsights_overview_report_page() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	monsterinsights_reports_page();
}
