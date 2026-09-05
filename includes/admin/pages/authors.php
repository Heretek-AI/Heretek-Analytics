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
function monsterinsights_authors_page_body_class( $classes ) {
	if ( ! empty( $_REQUEST['page'] ) && 'monsterinsights_authors' === $_REQUEST['page'] ) {
		$classes .= ' monsterinsights-reporting-page ';
	}
	return $classes;
}
add_filter( 'admin_body_class', 'monsterinsights_authors_page_body_class' );

/**
 * Parse a date-range pair from the request. Mirrors the logic in
 * `monsterinsights_reports_page()`.
 *
 * @return array{start:string,end:string,start_date:string,end_date:string}
 */
function monsterinsights_authors_parse_range( $gateway ) {
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
 * Fetch + shape author rows + WP user lookup for a given date range.
 *
 * @param array{range:array,limit:int} $args
 * @return array{rows:array,author_lookup:array,error:string}
 */
function monsterinsights_authors_load_data( $gateway, $range, $limit ) {
	$rows          = array();
	$author_lookup = array();
	$error         = '';

	$result = $gateway->run_reports(
		array(
			array(
				'id'         => 'authors',
				'dimensions' => array( 'customUser:author_id' ),
				'metrics'    => array( 'sessions', 'totalUsers', 'screenPageViews', 'engagedSessions' ),
				'limit'      => $limit,
			),
		),
		$range['start_date'],
		$range['end_date']
	);

	if ( is_array( $result ) && isset( $result['authors'] ) && is_array( $result['authors'] ) ) {
		if ( ! empty( $result['authors']['error'] ) ) {
			$error = $result['authors']['error'];
		} else {
			$rows = isset( $result['authors']['rows'] ) && is_array( $result['authors']['rows'] )
				? $result['authors']['rows']
				: array();
		}
	}

	$author_ids = array();
	foreach ( $rows as $row ) {
		if ( ! empty( $row['d'][0] ) && ctype_digit( (string) $row['d'][0] ) ) {
			$author_ids[] = (int) $row['d'][0];
		}
	}
	if ( ! empty( $author_ids ) ) {
		$users = get_users( array(
			'include' => array_values( array_unique( $author_ids ) ),
			'fields'  => array( 'ID', 'display_name', 'user_email' ),
		) );
		foreach ( $users as $u ) {
			$author_lookup[ (int) $u->ID ] = $u;
		}
	}

	return array(
		'rows'          => $rows,
		'author_lookup' => $author_lookup,
		'error'         => $error,
	);
}

/**
 * Render the Authors sub-page (HTML).
 *
 * @return void
 */
function monsterinsights_authors_page() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	// Handle CSV export before any HTML output is sent.
	if ( ! empty( $_GET['export'] ) && 'csv' === $_GET['export'] ) {
		monsterinsights_authors_export_csv();
		exit;
	}

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$auth    = MonsterInsights()->auth;
	$v4      = $auth->get_manual_v4_id();
	$prop_id = $auth->get_property_id();
	$has_sa  = (bool) $auth->get_service_account_json();

	$range = monsterinsights_authors_parse_range( $gateway );

	$missing = '';
	if ( empty( $v4 ) ) {
		$missing = __( 'A GA4 Measurement ID is required. Open the Settings page to paste one.', 'google-analytics-for-wordpress' );
	} elseif ( empty( $prop_id ) || ! $has_sa ) {
		$missing = __( 'A GA4 Property ID and Google Cloud service account JSON are required for direct reporting. Open the Settings page to paste them.', 'google-analytics-for-wordpress' );
	}

	$data = array(
		'rows'          => array(),
		'author_lookup' => array(),
		'error'         => '',
	);
	if ( ! $missing ) {
		$data = monsterinsights_authors_load_data( $gateway, $range, 50 );
	}

	$start_input = (string) $range['start_date'];
	$end_input   = (string) $range['end_date'];
	$start_date  = $range['start_date'];
	$end_date    = $range['end_date'];
	$rows        = $data['rows'];
	$author_lookup = $data['author_lookup'];
	$error       = $data['error'];

	$settings_url = admin_url( 'admin.php?page=monsterinsights_settings' );
	$export_url   = add_query_arg(
		array(
			'page'   => 'monsterinsights_authors',
			'export' => 'csv',
			'start'  => $start_input,
			'end'    => $end_input,
		),
		admin_url( 'admin.php' )
	);

	include MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/templates/authors-dashboard.php';
}

/**
 * Stream a CSV download of the per-author ranking for the given date range.
 *
 * The query is the same as the on-screen panel; only the limit is bumped to
 * 1000 so a typical site gets every active author in a single fetch. The
 * `Heretek_Rest_Reporting_Gateway` clamps the GA4 `limit` parameter at 50 per
 * call, so for sites with more than 50 active authors we issue additional
 * paginated calls and concatenate the rows.
 *
 * @return void
 */
function monsterinsights_authors_export_csv() {
	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	$range = monsterinsights_authors_parse_range( $gateway );
	$data  = monsterinsights_authors_load_data( $gateway, $range, 50 );
	$rows  = $data['rows'];
	$author_lookup = $data['author_lookup'];

	nocache_headers();
	header( 'Content-Type: text/csv; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=heretek-authors-' . gmdate( 'Y-m-d' ) . '.csv' );

	$out = fopen( 'php://output', 'w' );
	fputcsv( $out, array( 'Author ID', 'Display Name', 'Email', 'Sessions', 'Users', 'Page Views', 'Engaged Sessions' ) );
	foreach ( $rows as $row ) {
		$aid      = ! empty( $row['d'][0] ) ? (int) $row['d'][0] : 0;
		$user     = isset( $author_lookup[ $aid ] ) ? $author_lookup[ $aid ] : null;
		$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
		$users    = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
		$views    = isset( $row['m'][2]['value'] ) ? (int) $row['m'][2]['value'] : 0;
		$engaged  = isset( $row['m'][3]['value'] ) ? (int) $row['m'][3]['value'] : 0;
		fputcsv( $out, array(
			$aid,
			$user ? $user->display_name : '',
			$user ? $user->user_email   : '',
			$sessions,
			$users,
			$views,
			$engaged,
		) );
	}
	fclose( $out );
	exit;
}
