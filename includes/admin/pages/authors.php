<?php
/**
 * Heretek Analytics — Authors sub-page.
 *
 * Renders a per-author ranking table from the GA4 Data API. Author IDs are
 * read from a User-scoped custom dimension named `author_id` that the front-end
 * tracking script emits on singular views. Display names and emails are then
 * joined back from `get_users()`.
 *
 * The page also supports a CSV export via ?export=csv on the same URL.
 *
 * @since 12.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Body class for the Authors screen.
 *
 * @param string $classes
 * @return string
 */
function heretekanalytics_authors_page_body_class( $classes ) {
	if ( ! empty( $_REQUEST['page'] ) && ( 'heretekanalytics_authors' === $_REQUEST['page'] || 'monsterinsights_authors' === $_REQUEST['page'] ) ) {
		$classes .= ' heretekanalytics-reporting-page monsterinsights-reporting-page ';
	}
	return $classes;
}
add_filter( 'admin_body_class', 'heretekanalytics_authors_page_body_class' );

/**
 * Backward compatibility alias for monsterinsights_authors_page_body_class.
 */
function monsterinsights_authors_page_body_class( $classes ) {
	return heretekanalytics_authors_page_body_class( $classes );
}

/**
 * Parse a date-range pair from the request. Mirrors the logic in
 * `heretekanalytics_reports_page()`.
 *
 * @return array{start:string,end:string,start_date:string,end_date:string}
 */
function heretekanalytics_authors_parse_range( $gateway ) {
	$raw_start = isset( $_GET['start'] ) ? sanitize_text_field( wp_unslash( $_GET['start'] ) ) : '-30days';
	$raw_end   = isset( $_GET['end'] )   ? sanitize_text_field( wp_unslash( $_GET['end'] ) )   : 'today';

	$start_date = $gateway->resolve_date( $raw_start, strtotime( '-30 days' ) );
	$end_date   = $gateway->resolve_date( $raw_end, time() );

	return array(
		'start'      => $raw_start,
		'end'        => $raw_end,
		'start_date' => (string) $start_date,
		'end_date'   => (string) $end_date,
	);
}

/**
 * Backward compatibility alias for monsterinsights_authors_parse_range.
 */
function monsterinsights_authors_parse_range( $gateway ) {
	return heretekanalytics_authors_parse_range( $gateway );
}

/**
 * Fetch + shape telemetry rows + lookup for a given date range and taxonomy.
 *
 * @param Heretek_Rest_Reporting_Gateway $gateway
 * @param array                          $range
 * @param int                            $limit
 * @param string                         $taxonomy
 * @return array
 */
function heretekanalytics_authors_load_data( $gateway, $range, $limit, $taxonomy = 'author' ) {
	return $gateway->get_taxonomy_telemetry( $taxonomy, $range['start_date'], $range['end_date'], $limit );
}

/**
 * Backward compatibility alias for monsterinsights_authors_load_data.
 */
function monsterinsights_authors_load_data( $gateway, $range, $limit, $taxonomy = 'author' ) {
	return heretekanalytics_authors_load_data( $gateway, $range, $limit, $taxonomy );
}

/**
 * Render the Authors / Taxonomy sub-page (HTML).
 *
 * @return void
 */
function heretekanalytics_authors_page() {
	if ( ! current_user_can( 'heretekanalytics_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	// Handle CSV export before any HTML output is sent.
	if ( ! empty( $_GET['export'] ) && 'csv' === $_GET['export'] ) {
		heretekanalytics_authors_export_csv();
		exit;
	}

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$auth    = HeretekAnalytics()->auth;
	$v4      = $auth->get_manual_v4_id();
	$prop_id = $auth->get_property_id();
	$has_sa  = (bool) $auth->get_service_account_json();

	$range = heretekanalytics_authors_parse_range( $gateway );

	$current_taxonomy = isset( $_GET['tax'] ) ? sanitize_text_field( wp_unslash( $_GET['tax'] ) ) : 'author';
	if ( ! in_array( $current_taxonomy, array( 'author', 'character', 'chapter', 'tag' ), true ) ) {
		$current_taxonomy = 'author';
	}

	$missing = '';
	if ( empty( $v4 ) ) {
		$missing = __( 'A GA4 Measurement ID is required. Open the Settings page to paste one.', 'google-analytics-for-wordpress' );
	} elseif ( empty( $prop_id ) || ! $has_sa ) {
		$missing = __( 'A GA4 Property ID and Google Cloud service account JSON are required for direct reporting. Open the Settings page to paste them.', 'google-analytics-for-wordpress' );
	}

	$data = array(
		'rows'          => array(),
		'author_lookup' => array(),
		'is_hybrid'     => false,
		'error'         => '',
	);
	$dimensions_status = array();
	if ( ! $missing ) {
		$data              = heretekanalytics_authors_load_data( $gateway, $range, 50, $current_taxonomy );
		$dimensions_status = $gateway->get_dimensions_status();
	}

	$start_input   = (string) $range['start_date'];
	$end_input     = (string) $range['end_date'];
	$start_date    = $range['start_date'];
	$end_date      = $range['end_date'];
	$rows          = isset( $data['rows'] ) ? $data['rows'] : array();
	$author_lookup = isset( $data['author_lookup'] ) ? $data['author_lookup'] : array();
	$is_hybrid     = ! empty( $data['is_hybrid'] );
	$error         = isset( $data['error'] ) ? $data['error'] : '';
	$has_comics    = taxonomy_exists( 'characters' );

	$settings_url = admin_url( 'admin.php?page=heretekanalytics_settings' );
	$export_url   = add_query_arg(
		array(
			'page'   => 'heretekanalytics_authors',
			'export' => 'csv',
			'tax'    => $current_taxonomy,
			'start'  => $start_input,
			'end'    => $end_input,
		),
		admin_url( 'admin.php' )
	);

	include HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/templates/authors-dashboard.php';
}

/**
 * Backward compatibility alias for monsterinsights_authors_page.
 *
 * @return void
 */
function monsterinsights_authors_page() {
	heretekanalytics_authors_page();
}

/**
 * Stream a CSV download of the per-author or per-taxonomy ranking.
 *
 * @return void
 */
function heretekanalytics_authors_export_csv() {
	if ( ! current_user_can( 'heretekanalytics_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$current_taxonomy = isset( $_GET['tax'] ) ? sanitize_text_field( wp_unslash( $_GET['tax'] ) ) : 'author';
	if ( ! in_array( $current_taxonomy, array( 'author', 'character', 'chapter', 'tag' ), true ) ) {
		$current_taxonomy = 'author';
	}

	$range = heretekanalytics_authors_parse_range( $gateway );
	$data  = heretekanalytics_authors_load_data( $gateway, $range, 100, $current_taxonomy );
	$rows  = isset( $data['rows'] ) ? $data['rows'] : array();
	$author_lookup = isset( $data['author_lookup'] ) ? $data['author_lookup'] : array();

	nocache_headers();
	header( 'Content-Type: text/csv; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=heretek-' . sanitize_key( $current_taxonomy ) . '-' . gmdate( 'Y-m-d' ) . '.csv' );

	$out = fopen( 'php://output', 'w' );
	if ( 'author' === $current_taxonomy ) {
		fputcsv( $out, array( 'Author ID', 'Display Name', 'Email', 'Sessions', 'Page Views', 'Unique Users', 'Engaged Sessions' ) );
		foreach ( $rows as $row ) {
			$aid      = ! empty( $row['d'][0] ) ? (int) $row['d'][0] : 0;
			$user     = isset( $author_lookup[ $aid ] ) ? $author_lookup[ $aid ] : null;
			$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
			$views    = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
			$users    = isset( $row['m'][2]['value'] ) ? (int) $row['m'][2]['value'] : 0;
			$engaged  = isset( $row['m'][3]['value'] ) ? (int) $row['m'][3]['value'] : 0;
			fputcsv( $out, array(
				$aid,
				$user ? $user['name'] : ( '(not set)' === $row['d'][0] ? '(not set)' : 'Author #' . $aid ),
				$user ? $user['email'] : '',
				$sessions,
				$views,
				$users,
				$engaged,
			) );
		}
	} else {
		$tax_label = ucfirst( $current_taxonomy );
		fputcsv( $out, array( $tax_label . ' Name', 'Sessions', 'Page Views', 'Unique Users', 'Engaged Sessions' ) );
		foreach ( $rows as $row ) {
			$term_name = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
			$sessions  = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
			$views     = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
			$users     = isset( $row['m'][2]['value'] ) ? (int) $row['m'][2]['value'] : 0;
			$engaged   = isset( $row['m'][3]['value'] ) ? (int) $row['m'][3]['value'] : 0;
			fputcsv( $out, array(
				$term_name,
				$sessions,
				$views,
				$users,
				$engaged,
			) );
		}
	}
	fclose( $out );
	exit;
}

/**
 * Backward compatibility alias for monsterinsights_authors_export_csv.
 *
 * @return void
 */
function monsterinsights_authors_export_csv() {
	heretekanalytics_authors_export_csv();
}

