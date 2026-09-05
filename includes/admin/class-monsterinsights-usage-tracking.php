<?php
/**
 * Tracking functions for reporting plugin usage to the MonsterInsights site for users that have opted in
 *
 * @package     MonsterInsights
 * @subpackage  Admin
 * @copyright   Copyright (c) 2018, Chris Christoff
 * @since       7.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Usage tracking
 *
 * @access public
 * @return void
 * @since  7.0.0
 */
class MonsterInsights_Usage_Tracking {

	public function __construct() {
		add_action( 'init', array( $this, 'schedule_send' ) );
		add_action( 'monsterinsights_after_update_settings', array( $this, 'maybe_clear_retained_report_data' ), 10, 2 );
		add_filter( 'cron_schedules', array( $this, 'add_schedules' ) );
		add_action( 'monsterinsights_usage_tracking_cron', array( $this, 'send_checkin' ) );
	}

	private function get_data() {
		$data = array();

		// Retrieve current theme info
		$theme_data    = wp_get_theme();
		$tracking_mode = monsterinsights_get_option( 'tracking_mode', 'gtag' );
		$events_mode   = monsterinsights_get_option( 'events_mode', 'none' );
		$update_mode   = monsterinsights_get_option( 'automatic_updates', false );

		if ( $tracking_mode === false ) {
			$tracking_mode = 'gtag';
		}
		if ( $events_mode === false ) {
			$events_mode = 'none';
		}

		if ( $update_mode === false ) {
			$update_mode = 'none';
		}

		$count_b = 1;
		if ( is_multisite() ) {
			if ( function_exists( 'get_blog_count' ) ) {
				$count_b = get_blog_count();
			} else {
				$count_b = 'Not Set';
			}
		}

		$usesauth = 'No';
		$local    = MonsterInsights()->auth->is_authed();
		$network  = MonsterInsights()->auth->is_network_authed();

		if ( $local && $network ) {
			$usesauth = 'Both';
		} else if ( $local ) {
			$usesauth = 'Local';
		} else if ( $network ) {
			$usesauth = 'Network';
		}

		//  Get auth connection type
		$auth = MonsterInsights()->auth;

		$auth_mode = 'v4';

		$data['php_version']    = phpversion();
		$data['mi_version']     = MONSTERINSIGHTS_VERSION;
		$data['wp_version']     = get_bloginfo( 'version' );
		$data['server']         = isset( $_SERVER['SERVER_SOFTWARE'] ) ? $_SERVER['SERVER_SOFTWARE'] : ''; // phpcs:ignore
		$data['over_time']      = wp_json_encode( get_option( 'monsterinsights_over_time', array() ) );
		$data['multisite']      = is_multisite();
		$data['url']            = home_url();
		$data['themename']      = $theme_data->Name;
		$data['themeversion']   = $theme_data->Version;
		$data['email']          = get_bloginfo( 'admin_email' );
		$data['key']            = monsterinsights_get_license_key();
		$data['sas']            = monsterinsights_get_shareasale_id();
		$data['settings']       = wp_json_encode( monsterinsights_get_options() );
		$data['tracking_mode']  = $tracking_mode;
		$data['events_mode']    = $events_mode;
		$data['autoupdate']     = $update_mode;
		$data['pro']            = (int) monsterinsights_is_pro_version();
		$data['sites']          = $count_b;
		$data['usagetracking']  = wp_json_encode( get_option( 'monsterinsights_usage_tracking_config', false ) );
		$data['usercount']      = function_exists( 'get_user_count' ) ? get_user_count() : 'Not Set';
		$data['usesauth']       = $usesauth;
		$data['timezoneoffset'] = date( 'P' ); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date -- We need this to depend on the runtime timezone.
		$data['ga_auth_mode']   = $auth_mode;

		// Retrieve current plugin information
		if ( ! function_exists( 'get_plugins' ) ) {
			include ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$checklist                 = get_option( 'monsterinsights_setup_checklist', array() );
		$data['last_plugin_error'] = wp_json_encode( get_option( 'monsterinsights_last_plugin_error', null ) );
		// Find the last completed checklist step
		$last_checklist_step = '';
		if ( ! empty( $checklist ) && is_array( $checklist ) ) {
			// Iterate through the checklist to find the last true value
			foreach ( $checklist as $key => $value ) {
				// Skip the settings key
				if ( 'settings' === $key ) {
					continue;
				}
				if ( is_array( $value ) ) {
					$all_true = true;
					foreach ( $value as $sub_value ) {
						if ( ! $sub_value ) {
							$all_true = false;
							break;
						}
					}
					if ( $all_true ) {
						$last_checklist_step = $key;
					}
				} elseif ( true === $value ) {
					$last_checklist_step = $key;
				}
			}
		}
		$data['setup_checklist_highest_completed_step']  = $last_checklist_step;
		$data['setup_checklist_dismissed'] = isset( $checklist['settings'] ) && isset( $checklist['settings']['dismiss'] ) ? $checklist['settings']['dismiss'] : false;
		$plugins                           = array_keys( get_plugins() );
		$active_plugins                    = get_option( 'active_plugins', array() );

		foreach ( $plugins as $key => $plugin ) {
			if ( in_array( $plugin, $active_plugins ) ) {
				// Remove active plugins from list so we can show active and inactive separately
				unset( $plugins[ $key ] );
			}
		}
		$data['active_plugins']   = wp_json_encode( $active_plugins );
		$data['inactive_plugins'] = wp_json_encode( $plugins );
		$data['locale']           = get_locale();

		// Customer360 telemetry: local report-view counts and last admin activity.
		$data['reports_viewed'] = wp_json_encode( MonsterInsights_Report_Views::get_aggregated_counts() );

		$last_admin_seen = get_option( 'monsterinsights_last_admin_seen', false );
		if ( is_numeric( $last_admin_seen ) ) {
			// gmdate() rather than date() -- the payload contract requires UTC, not the site timezone.
			$data['last_admin_seen'] = gmdate( 'Y-m-d\TH:i:s\Z', $last_admin_seen );
		}

		return $data;
	}

	public function send_checkin( $override = false, $ignore_last_checkin = false ) {
		// Telemetry and external check-in permanently disabled in Heretek Analytics
		return false;
	}

	/**
	 * Whether this install has consented to usage tracking.
	 *
	 * Permanently disabled in Heretek Analytics.
	 *
	 * @since 11.2.0
	 * @access public
	 *
	 * @return bool True when tracking data may be collected and sent.
	 */
	public static function tracking_allowed() {
		return false;
	}

	public function schedule_send() {
		// Telemetry cron permanently disabled
		if ( wp_next_scheduled( 'monsterinsights_usage_tracking_cron' ) ) {
			wp_clear_scheduled_hook( 'monsterinsights_usage_tracking_cron' );
		}
	}

	/**
	 * Clears the retained report-view telemetry when consent is withdrawn.
	 *
	 * Consent isn't retroactive: without this, a withdrawal leaves the
	 * existing 90-day report-views log and last-admin-seen timestamp in
	 * place, and the next opt-in would ship that pre-withdrawal history on
	 * its immediate check-in.
	 *
	 * @since 11.2.0
	 * @access public
	 *
	 * @param string $setting Name of the setting that was written.
	 * @param mixed  $value   New value of the setting.
	 * @return void
	 */
	public function maybe_clear_retained_report_data( $setting, $value ) {
		if ( 'anonymous_data' !== $setting || ! empty( $value ) ) {
			return;
		}

		delete_option( MonsterInsights_Report_Views::OPTION );
		delete_option( MonsterInsights_Last_Seen::OPTION );
	}

	public function add_schedules( $schedules = array() ) {
		// Adds once weekly to the existing schedules.
		$schedules['weekly'] = array(
			'interval' => 604800,
			'display'  => __( 'Once Weekly', 'google-analytics-for-wordpress' )
		);

		return $schedules;
	}
}
new MonsterInsights_Usage_Tracking();
