<?php
/**
 * Capabilities handling for Heretek Analytics.
 *
 * @package Heretek_Analytics
 * @subpackage Capabilities
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Map Heretek Analytics Capabilities.
 *
 * Using meta caps, we're creating virtual capabilities that are
 * given to users with manage_options, or users who have at least
 * one of the roles selected in the permissions settings.
 *
 * @param array  $caps Array of capabilities the user has.
 * @param string $cap The current cap being filtered.
 * @param int    $user_id User to check permissions for.
 * @param array  $args Extra parameters.
 * @return array
 */
function heretekanalytics_add_capabilities( $caps, $cap, $user_id, $args ) {
	switch ( $cap ) {
		case 'heretekanalytics_view_dashboard':
		case 'monsterinsights_view_dashboard':
			$roles = heretekanalytics_get_option( 'view_reports', array() );

			$user_can_via_settings = false;
			if ( ! empty( $roles ) && is_array( $roles ) ) {
				foreach ( $roles as $role ) {
					if ( is_string( $role ) && user_can( $user_id, $role ) ) {
						$user_can_via_settings = true;
						break;
					}
				}
			} elseif ( ! empty( $roles ) && is_string( $roles ) ) {
				if ( user_can( $user_id, $roles ) ) {
					$user_can_via_settings = true;
				}
			}

			if ( user_can( $user_id, 'manage_options' ) || $user_can_via_settings ) {
				$caps = array();
			}
			break;

		case 'heretekanalytics_save_settings':
		case 'monsterinsights_save_settings':
			$roles = heretekanalytics_get_option( 'save_settings', array() );

			$user_can_via_settings = false;
			if ( ! empty( $roles ) && is_array( $roles ) ) {
				foreach ( $roles as $role ) {
					if ( is_string( $role ) && user_can( $user_id, $role ) ) {
						$user_can_via_settings = true;
						break;
					}
				}
			} elseif ( ! empty( $roles ) && is_string( $roles ) ) {
				if ( user_can( $user_id, $roles ) ) {
					$user_can_via_settings = true;
				}
			}

			if ( user_can( $user_id, 'manage_options' ) || $user_can_via_settings ) {
				$caps = array();
			}
			break;
	}

	return $caps;
}

add_filter( 'map_meta_cap', 'heretekanalytics_add_capabilities', 10, 4 );

if ( ! function_exists( 'monsterinsights_add_capabilities' ) ) {
	function monsterinsights_add_capabilities( $caps, $cap, $user_id, $args ) {
		return heretekanalytics_add_capabilities( $caps, $cap, $user_id, $args );
	}
}

/**
 * Get list of settings that only users with manage_options can modify.
 *
 * @return array
 */
function heretekanalytics_get_admin_only_settings() {
	$settings = array(
		'save_settings',
		'view_reports',
		'ignore_users',
	);

	$settings = apply_filters( 'heretekanalytics_admin_only_settings', $settings );
	return apply_filters( 'monsterinsights_admin_only_settings', $settings );
}

if ( ! function_exists( 'monsterinsights_get_admin_only_settings' ) ) {
	function monsterinsights_get_admin_only_settings() {
		return heretekanalytics_get_admin_only_settings();
	}
}

/**
 * Check if a setting is admin-only.
 *
 * @param string $setting
 * @return bool
 */
function heretekanalytics_is_admin_only_setting( $setting ) {
	return in_array( $setting, heretekanalytics_get_admin_only_settings(), true );
}

if ( ! function_exists( 'monsterinsights_is_admin_only_setting' ) ) {
	function monsterinsights_is_admin_only_setting( $setting ) {
		return heretekanalytics_is_admin_only_setting( $setting );
	}
}

/**
 * Get sensitive settings withheld from non-admin users.
 *
 * @return array
 */
function heretekanalytics_get_sensitive_settings() {
	$settings = array(
		'ads_meta_api_access_token',
		'ads_pinterest_api_token',
		'ads_snapchat_api_token',
		'gtag_selector_tracking_mp',
		'sharedcount_key',
		'summaries_email_addresses',
		'exception_alert_email_addresses',
	);

	$settings = array_merge( $settings, heretekanalytics_get_admin_only_settings() );

	$settings = (array) apply_filters( 'heretekanalytics_sensitive_settings', $settings );
	return (array) apply_filters( 'monsterinsights_sensitive_settings', $settings );
}

if ( ! function_exists( 'monsterinsights_get_sensitive_settings' ) ) {
	function monsterinsights_get_sensitive_settings() {
		return heretekanalytics_get_sensitive_settings();
	}
}
