<?php
/**
 * Heretek Analytics Reports Page (Augur Telemetry Cockpit).
 *
 * Renders the state-of-the-art Adeptus Mechanicus data cockpit with interactive
 * ApexCharts visualizations, realtime active user streams, author ranking,
 * and period-over-period growth comparisons.
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 * @since 12.2.0
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
 * Render the Augur Telemetry Cockpit.
 *
 * @return void
 */
function monsterinsights_reports_page() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	$auth    = MonsterInsights()->auth;
	$v4      = $auth->get_manual_v4_id();
	$prop_id = $auth->get_property_id();
	$has_sa  = (bool) $auth->get_service_account_json();

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$raw_start = isset( $_GET['start'] ) ? sanitize_text_field( wp_unslash( $_GET['start'] ) ) : '-30days';
	$raw_end   = isset( $_GET['end'] )   ? sanitize_text_field( wp_unslash( $_GET['end'] ) )   : 'today';

	$start_date = $gateway->resolve_date( $raw_start, strtotime( '-30 days' ) );
	$end_date   = $gateway->resolve_date( $raw_end, time() );

	$start_input = (string) $start_date;
	$end_input   = (string) $end_date;

	$telemetry = array();
	$missing   = '';
	$error     = '';

	if ( empty( $v4 ) ) {
		$missing = __( 'A GA4 Measurement ID is required to begin tracking and reporting. Open Settings to configure.', 'google-analytics-for-wordpress' );
	} elseif ( empty( $prop_id ) || ! $has_sa ) {
		$missing = __( 'A GA4 Property ID and Google Cloud service account JSON key are required for the Telemetry Augur. Open Settings to configure.', 'google-analytics-for-wordpress' );
	} else {
		$telemetry = $gateway->get_dashboard_telemetry( $start_date, $end_date, false );
		if ( ! empty( $telemetry['error'] ) ) {
			$error = $telemetry['error'];
		}
	}

	// Pass preloaded initial data to JavaScript so interactive charts render immediately without waiting
	wp_localize_script(
		'heretek-dashboard',
		'HeretekConfig',
		array(
			'restUrl'       => esc_url_raw( rest_url( 'heretek-analytics/v1/reporting/' ) ),
			'restNonce'     => wp_create_nonce( 'wp_rest' ),
			'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
			'ajaxNonce'     => wp_create_nonce( 'heretek_dashboard_nonce' ),
			'isConfigured'  => ! empty( $v4 ) && ! empty( $prop_id ) && $has_sa,
			'propertyId'    => $prop_id,
			'measurementId' => $v4,
			'initialData'   => ! empty( $telemetry['kpis'] ) ? $telemetry : null,
		)
	);

	$settings_url = admin_url( 'admin.php?page=monsterinsights_settings' );

	include MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/templates/reports-dashboard.php';
}

/**
 * Overview report route alias.
 *
 * @return void
 */
function monsterinsights_overview_report_page() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	monsterinsights_reports_page();
}
