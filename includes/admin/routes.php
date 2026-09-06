<?php
/**
 * Heretek Analytics Admin Routes & AJAX Handlers.
 *
 * Streamlined native handlers for the Heretek Analytics Augur dashboard,
 * settings, credentials verification, and telemetry streams.
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MonsterInsights_Rest_Routes {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Native Heretek Analytics AJAX handlers
		add_action( 'wp_ajax_monsterinsights_save_heretek_settings', array( $this, 'save_heretek_settings' ) );
		add_action( 'wp_ajax_monsterinsights_verify_heretek_credentials', array( $this, 'verify_heretek_credentials' ) );
		add_action( 'wp_ajax_monsterinsights_get_dashboard_telemetry', array( $this, 'get_dashboard_telemetry' ) );
		add_action( 'wp_ajax_monsterinsights_get_realtime_telemetry', array( $this, 'get_realtime_telemetry' ) );
		add_action( 'wp_ajax_monsterinsights_handle_settings_import', array( $this, 'handle_settings_import' ) );

		// Clean up old third-party notices on Heretek pages
		add_action( 'admin_notices', array( $this, 'hide_old_notices' ), 0 );
	}

	/**
	 * Save the Heretek Analytics native settings.
	 */
	public function save_heretek_settings() {
		check_ajax_referer( 'monsterinsights_save_heretek_settings', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
		}

		$auth = MonsterInsights()->auth;

		// Measurement ID
		$raw_v4   = isset( $_POST['v4'] ) ? sanitize_text_field( wp_unslash( $_POST['v4'] ) ) : '';
		$raw_v4   = trim( $raw_v4 );
		$valid_v4 = monsterinsights_is_valid_v4_id( $raw_v4 );

		if ( '' === $raw_v4 ) {
			$auth->delete_manual_v4_id();
		} elseif ( empty( $valid_v4 ) ) {
			wp_send_json_error( array(
				'message' => __( 'Measurement ID must match the pattern G-XXXXXXXX.', 'google-analytics-for-wordpress' ),
			) );
		} else {
			$auth->set_manual_v4_id( $valid_v4 );
		}

		// Property ID
		$raw_pid = isset( $_POST['property_id'] ) ? sanitize_text_field( wp_unslash( $_POST['property_id'] ) ) : '';
		$raw_pid = trim( $raw_pid );
		if ( '' === $raw_pid ) {
			$auth->set_property_id( '' );
		} elseif ( ! ctype_digit( $raw_pid ) ) {
			wp_send_json_error( array(
				'message' => __( 'GA4 Property ID must be numeric (e.g. 123456789).', 'google-analytics-for-wordpress' ),
			) );
		} else {
			$auth->set_property_id( $raw_pid );
		}

		// Service account JSON
		$raw_sa = isset( $_POST['service_account_json'] ) ? wp_unslash( $_POST['service_account_json'] ) : '';
		if ( is_string( $raw_sa ) ) {
			$raw_sa = trim( $raw_sa );
		} else {
			$raw_sa = '';
		}

		if ( '' === $raw_sa ) {
			$auth->set_service_account_json( '' );
		} else {
			$decoded = json_decode( $raw_sa, true );
			if ( ! is_array( $decoded ) || empty( $decoded['client_email'] ) || empty( $decoded['private_key'] ) ) {
				wp_send_json_error( array(
					'message' => __( 'Service account JSON is missing client_email or private_key.', 'google-analytics-for-wordpress' ),
				) );
			}
			$auth->set_service_account_json( $raw_sa );
		}

		// Purge token & reporting transients on credential update
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_heretek_ga4_%' OR option_name LIKE '_transient_timeout_heretek_ga4_%'" );

		$status = monsterinsights_get_settings_status(
			$auth->get_manual_v4_id(),
			$auth->get_property_id(),
			$auth->get_service_account_json()
		);

		wp_send_json_success( array(
			'message' => __( 'Settings saved and telemetry link synchronized.', 'google-analytics-for-wordpress' ),
			'status'  => $status,
		) );
	}

	/**
	 * Verify the stored credentials by minting a token and calling GA4 metadata.
	 */
	public function verify_heretek_credentials() {
		check_ajax_referer( 'monsterinsights_verify_heretek_credentials', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
		}

		if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
		}

		$gateway = new Heretek_Rest_Reporting_Gateway();
		$result  = $gateway->verify_credentials();

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( array( 'message' => $result->get_error_message() ) );
		}

		$pid = MonsterInsights()->auth->get_property_id();
		wp_send_json_success( array(
			'message' => sprintf(
				/* translators: %s is the GA4 property id. */
				__( 'Machine Spirit awakened: Successfully connected to GA4 property %s.', 'google-analytics-for-wordpress' ),
				$pid
			),
		) );
	}

	/**
	 * AJAX fallback endpoint for dashboard telemetry.
	 */
	public function get_dashboard_telemetry() {
		check_ajax_referer( 'heretek_dashboard_nonce', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
		}

		$start = isset( $_POST['start'] ) ? sanitize_text_field( wp_unslash( $_POST['start'] ) ) : '-30days';
		$end   = isset( $_POST['end'] )   ? sanitize_text_field( wp_unslash( $_POST['end'] ) )   : 'today';
		$force = ! empty( $_POST['force_refresh'] ) && ( 'true' === (string) $_POST['force_refresh'] || 1 === (int) $_POST['force_refresh'] );

		if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
		}

		$gateway = new Heretek_Rest_Reporting_Gateway();
		$data    = $gateway->get_dashboard_telemetry( $start, $end, $force );

		if ( ! empty( $data['error'] ) && empty( $data['kpis'] ) ) {
			wp_send_json_error( $data );
		}

		wp_send_json_success( $data );
	}

	/**
	 * AJAX fallback endpoint for realtime telemetry.
	 */
	public function get_realtime_telemetry() {
		check_ajax_referer( 'heretek_dashboard_nonce', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
		}

		$force = ! empty( $_POST['force_refresh'] ) && ( 'true' === (string) $_POST['force_refresh'] || 1 === (int) $_POST['force_refresh'] );

		if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
		}

		$gateway = new Heretek_Rest_Reporting_Gateway();
		$data    = $gateway->run_realtime_summary( $force );

		if ( ! empty( $data['error'] ) && ! isset( $data['active_users'] ) ) {
			wp_send_json_error( $data );
		}

		wp_send_json_success( $data );
	}

	/**
	 * Handle settings import from JSON backup.
	 */
	public function handle_settings_import() {
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
		}

		if ( empty( $_FILES['import_file']['tmp_name'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Please upload a valid JSON export file.', 'google-analytics-for-wordpress' ) ) );
		}

		$raw = file_get_contents( $_FILES['import_file']['tmp_name'] ); // phpcs:ignore
		$json = json_decode( $raw, true );

		if ( ! is_array( $json ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid JSON payload.', 'google-analytics-for-wordpress' ) ) );
		}

		if ( isset( $json['monsterinsights_settings'] ) && is_array( $json['monsterinsights_settings'] ) ) {
			update_option( 'monsterinsights_settings', $json['monsterinsights_settings'] );
		}
		if ( isset( $json['monsterinsights_site_profile'] ) && is_array( $json['monsterinsights_site_profile'] ) ) {
			update_option( 'monsterinsights_site_profile', $json['monsterinsights_site_profile'] );
		}

		wp_send_json_success( array( 'message' => __( 'Settings imported successfully.', 'google-analytics-for-wordpress' ) ) );
	}

	/**
	 * Suppress upstream promotional or warning notices on Heretek pages.
	 */
	public function hide_old_notices() {
		if ( ! monsterinsights_is_own_admin_page() ) {
			return;
		}

		remove_all_actions( 'admin_notices' );
	}
}
