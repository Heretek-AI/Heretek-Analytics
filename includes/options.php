<?php
/**
 * Option functions for Heretek Analytics.
 *
 * @package Heretek_Analytics
 * @subpackage Options
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the option name used to store settings in wp_options.
 *
 * @return string
 */
function heretekanalytics_get_option_name() {
	return 'heretekanalytics_settings';
}

/**
 * Get all Heretek Analytics options.
 *
 * Transparently migrates existing legacy monsterinsights_settings
 * on first execution so all credentials and configurations are preserved.
 *
 * @return array
 */
function heretekanalytics_get_options() {
	$option_name = heretekanalytics_get_option_name();
	$settings    = get_option( $option_name, null );

	// Automated Zero-Loss Migration from legacy monsterinsights_settings
	if ( null === $settings || ! is_array( $settings ) ) {
		$legacy = get_option( 'monsterinsights_settings', null );
		if ( is_array( $legacy ) && ! empty( $legacy ) ) {
			update_option( $option_name, $legacy );
			$settings = $legacy;
		} else {
			$settings = is_array( $settings ) ? $settings : array();
		}
	}

	return $settings;
}

/**
 * Helper method for getting a setting's value. Falls back to default.
 *
 * @param string $key Setting key.
 * @param mixed  $default Default value.
 * @return mixed
 */
function heretekanalytics_get_option( $key = '', $default = false ) {
	global $heretekanalytics_settings, $monsterinsights_settings;

	if ( ! isset( $heretekanalytics_settings ) || ! is_array( $heretekanalytics_settings ) ) {
		$heretekanalytics_settings = heretekanalytics_get_options();
		$monsterinsights_settings  = $heretekanalytics_settings;
	}

	$value = ! empty( $heretekanalytics_settings[ $key ] ) ? $heretekanalytics_settings[ $key ] : $default;
	$value = apply_filters( 'heretekanalytics_get_option', $value, $key, $default );
	$value = apply_filters( 'monsterinsights_get_option', $value, $key, $default );

	$value = apply_filters( 'heretekanalytics_get_option_' . $key, $value, $key, $default );
	return apply_filters( 'monsterinsights_get_option_' . $key, $value, $key, $default );
}

/**
 * Helper method for updating a setting's value.
 *
 * @param string $key Setting key.
 * @param mixed  $value Setting value.
 * @return bool
 */
function heretekanalytics_update_option( $key = '', $value = false ) {
	if ( empty( $key ) ) {
		return false;
	}

	if ( empty( $value ) ) {
		return heretekanalytics_delete_option( $key );
	}

	$option_name = heretekanalytics_get_option_name();
	$settings    = heretekanalytics_get_options();

	$value = apply_filters( 'heretekanalytics_update_option', $value, $key );
	$value = apply_filters( 'monsterinsights_update_option', $value, $key );

	$settings[ $key ] = $value;
	$did_update       = update_option( $option_name, $settings );

	if ( $did_update ) {
		global $heretekanalytics_settings, $monsterinsights_settings;
		$heretekanalytics_settings[ $key ] = $value;
		$monsterinsights_settings[ $key ]  = $value;
	}

	return $did_update;
}

/**
 * Helper method for deleting a setting.
 *
 * @param string $key Setting key.
 * @return bool
 */
function heretekanalytics_delete_option( $key = '' ) {
	if ( empty( $key ) ) {
		return false;
	}

	$option_name = heretekanalytics_get_option_name();
	$settings    = heretekanalytics_get_options();

	if ( isset( $settings[ $key ] ) ) {
		unset( $settings[ $key ] );
	}

	$did_update = update_option( $option_name, $settings );

	if ( $did_update ) {
		global $heretekanalytics_settings, $monsterinsights_settings;
		$heretekanalytics_settings = $settings;
		$monsterinsights_settings  = $settings;
	}

	return $did_update;
}

/**
 * Helper method for deleting multiple settings.
 *
 * @param array $keys Setting keys.
 * @return bool
 */
function heretekanalytics_delete_options( $keys = array() ) {
	if ( empty( $keys ) || ! is_array( $keys ) ) {
		return false;
	}

	$option_name = heretekanalytics_get_option_name();
	$settings    = heretekanalytics_get_options();

	foreach ( $keys as $key ) {
		if ( isset( $settings[ $key ] ) ) {
			unset( $settings[ $key ] );
		}
	}

	$did_update = update_option( $option_name, $settings );

	if ( $did_update ) {
		global $heretekanalytics_settings, $monsterinsights_settings;
		$heretekanalytics_settings = $settings;
		$monsterinsights_settings  = $settings;
	}

	return $did_update;
}

/**
 * Sanitize tracking measurement ID.
 *
 * @param string $id
 * @return string
 */
function heretekanalytics_sanitize_tracking_id( $id ) {
	$id = (string) $id;
	$id = trim( $id );

	if ( empty( $id ) ) {
		return '';
	}

	// Replace en-dash, em-dash, minus with standard hyphen.
	return str_replace( array( '–', '—', '−' ), '-', $id );
}

/**
 * Check if string is a valid GT code.
 *
 * @param string $gt_code
 * @return bool
 */
function heretekanalytics_is_valid_gt( $gt_code = '' ) {
	return (bool) preg_match( '/^GT-[a-zA-Z0-9]{5,}$/', $gt_code );
}

/**
 * Check if string is a valid GA4 Measurement ID.
 *
 * @param string $v4_code
 * @return string Validated ID in uppercase, or empty string.
 */
function heretekanalytics_is_valid_v4_id( $v4_code = '' ) {
	$v4_code = heretekanalytics_sanitize_tracking_id( $v4_code );

	if (
		preg_match( '/^G-[A-Za-z\d]+$/', $v4_code ) ||
		heretekanalytics_is_valid_gt( $v4_code )
	) {
		return strtoupper( $v4_code );
	}

	return '';
}

/**
 * Get active GA4 Measurement ID.
 *
 * @return string
 */
function heretekanalytics_get_v4_id() {
	if ( defined( 'HERETEK_ANALYTICS_DISABLE_TRACKING' ) && HERETEK_ANALYTICS_DISABLE_TRACKING ) {
		return '';
	}
	if ( defined( 'MONSTERINSIGHTS_DISABLE_TRACKING' ) && MONSTERINSIGHTS_DISABLE_TRACKING ) {
		return '';
	}

	$auth = function_exists( 'HeretekAnalytics' ) ? HeretekAnalytics()->auth : null;
	if ( ! $auth && function_exists( 'MonsterInsights' ) ) {
		$auth = MonsterInsights()->auth;
	}

	$v4_id = $auth ? $auth->get_v4_id() : '';

	if ( empty( $v4_id ) && $auth ) {
		$v4_id = $auth->get_manual_v4_id();
		if ( empty( $v4_id ) ) {
			$v4_id = heretekanalytics_get_network_v4_id();
			if ( empty( $v4_id ) ) {
				if ( defined( 'HERETEK_ANALYTICS_GA_V4_ID' ) && HERETEK_ANALYTICS_GA_V4_ID ) {
					$v4_id = heretekanalytics_is_valid_v4_id( HERETEK_ANALYTICS_GA_V4_ID );
				} elseif ( defined( 'MONSTERINSIGHTS_GA_V4_ID' ) && MONSTERINSIGHTS_GA_V4_ID ) {
					$v4_id = heretekanalytics_is_valid_v4_id( MONSTERINSIGHTS_GA_V4_ID );
				}
			}
		}
	}

	$pre_filter = $v4_id;
	$v4_id      = apply_filters( 'heretekanalytics_get_v4_id', $v4_id );
	$v4_id      = apply_filters( 'monsterinsights_get_v4_id', $v4_id );

	return $pre_filter === $v4_id ? $v4_id : heretekanalytics_is_valid_v4_id( $v4_id );
}

/**
 * Get network GA4 ID.
 *
 * @return string
 */
function heretekanalytics_get_network_v4_id() {
	if ( ! is_multisite() ) {
		return '';
	}

	$auth = function_exists( 'HeretekAnalytics' ) ? HeretekAnalytics()->auth : null;
	if ( ! $auth && function_exists( 'MonsterInsights' ) ) {
		$auth = MonsterInsights()->auth;
	}

	if ( ! $auth ) {
		return '';
	}

	$v4_id = $auth->get_network_v4_id();
	if ( ! empty( $v4_id ) ) {
		return $v4_id;
	}

	$v4_id = $auth->get_network_manual_v4_id();
	if ( ! empty( $v4_id ) ) {
		return $v4_id;
	}

	if ( defined( 'HERETEK_ANALYTICS_MS_GA_V4_ID' ) && heretekanalytics_is_valid_v4_id( HERETEK_ANALYTICS_MS_GA_V4_ID ) ) {
		return HERETEK_ANALYTICS_MS_GA_V4_ID;
	}
	if ( defined( 'MONSTERINSIGHTS_MS_GA_V4_ID' ) && heretekanalytics_is_valid_v4_id( MONSTERINSIGHTS_MS_GA_V4_ID ) ) {
		return MONSTERINSIGHTS_MS_GA_V4_ID;
	}

	return '';
}

/**
 * Get GA4 Measurement ID for frontend output.
 *
 * @param array $args
 * @return string
 */
function heretekanalytics_get_v4_id_to_output( $args = array() ) {
	$v4_id = heretekanalytics_get_v4_id();
	$v4_id = apply_filters( 'heretekanalytics_get_v4_id_to_output', $v4_id, $args );
	$v4_id = apply_filters( 'monsterinsights_get_v4_id_to_output', $v4_id, $args );

	return heretekanalytics_is_valid_v4_id( $v4_id );
}

/**
 * Unlocked GPL license stub.
 *
 * @return array
 */
function heretekanalytics_get_license() {
	return array(
		'key'  => 'HERETEK-UNRESTRICTED-GPLV3',
		'type' => 'pro',
	);
}

/**
 * Unlocked GPL license key stub.
 *
 * @return string
 */
function heretekanalytics_get_license_key() {
	return 'HERETEK-UNRESTRICTED-GPLV3';
}

/**
 * Export settings as JSON.
 *
 * @return string
 */
function heretekanalytics_export_settings() {
	$settings = heretekanalytics_get_options();
	$exclude  = array(
		'analytics_profile',
		'analytics_profile_code',
		'analytics_profile_name',
		'oauth_version',
		'cron_last_run',
		'monsterinsights_oauth_status',
		'heretekanalytics_oauth_status',
	);

	foreach ( $exclude as $e ) {
		if ( ! empty( $settings[ $e ] ) ) {
			unset( $settings[ $e ] );
		}
	}

	return wp_json_encode( $settings );
}

/**
 * Always return 'gtag' tracking mode.
 *
 * @param string $value
 * @return string
 */
function heretekanalytics_force_tracking_mode( $value ) {
	return 'gtag';
}
add_filter( 'heretekanalytics_get_option_tracking_mode', 'heretekanalytics_force_tracking_mode' );
add_filter( 'monsterinsights_get_option_tracking_mode', 'heretekanalytics_force_tracking_mode' );

/**
 * Always return 'js' events mode.
 *
 * @param string $value
 * @return string
 */
function heretekanalytics_force_events_mode( $value ) {
	return 'js';
}
add_filter( 'heretekanalytics_get_option_events_mode', 'heretekanalytics_force_events_mode' );
add_filter( 'monsterinsights_get_option_events_mode', 'heretekanalytics_force_events_mode' );


// =========================================================================
// Backwards Compatibility Aliases (MonsterInsights wrapper layer)
// =========================================================================

if ( ! function_exists( 'monsterinsights_get_option_name' ) ) {
	function monsterinsights_get_option_name() {
		return heretekanalytics_get_option_name();
	}
}

if ( ! function_exists( 'monsterinsights_get_options' ) ) {
	function monsterinsights_get_options() {
		return heretekanalytics_get_options();
	}
}

if ( ! function_exists( 'monsterinsights_get_option' ) ) {
	function monsterinsights_get_option( $key = '', $default = false ) {
		return heretekanalytics_get_option( $key, $default );
	}
}

if ( ! function_exists( 'monsterinsights_update_option' ) ) {
	function monsterinsights_update_option( $key = '', $value = false ) {
		return heretekanalytics_update_option( $key, $value );
	}
}

if ( ! function_exists( 'monsterinsights_delete_option' ) ) {
	function monsterinsights_delete_option( $key = '' ) {
		return heretekanalytics_delete_option( $key );
	}
}

if ( ! function_exists( 'monsterinsights_delete_options' ) ) {
	function monsterinsights_delete_options( $keys = array() ) {
		return heretekanalytics_delete_options( $keys );
	}
}

if ( ! function_exists( 'monsterinsights_sanitize_tracking_id' ) ) {
	function monsterinsights_sanitize_tracking_id( $id ) {
		return heretekanalytics_sanitize_tracking_id( $id );
	}
}

if ( ! function_exists( 'monsterinsights_is_valid_gt' ) ) {
	function monsterinsights_is_valid_gt( $gt_code = '' ) {
		return heretekanalytics_is_valid_gt( $gt_code );
	}
}

if ( ! function_exists( 'monsterinsights_is_valid_v4_id' ) ) {
	function monsterinsights_is_valid_v4_id( $v4_code = '' ) {
		return heretekanalytics_is_valid_v4_id( $v4_code );
	}
}

if ( ! function_exists( 'monsterinsights_get_v4_id' ) ) {
	function monsterinsights_get_v4_id() {
		return heretekanalytics_get_v4_id();
	}
}

if ( ! function_exists( 'monsterinsights_get_network_v4_id' ) ) {
	function monsterinsights_get_network_v4_id() {
		return heretekanalytics_get_network_v4_id();
	}
}

if ( ! function_exists( 'monsterinsights_get_v4_id_to_output' ) ) {
	function monsterinsights_get_v4_id_to_output( $args = array() ) {
		return heretekanalytics_get_v4_id_to_output( $args );
	}
}

if ( ! function_exists( 'monsterinsights_get_license' ) ) {
	function monsterinsights_get_license() {
		return heretekanalytics_get_license();
	}
}

if ( ! function_exists( 'monsterinsights_get_license_key' ) ) {
	function monsterinsights_get_license_key() {
		return heretekanalytics_get_license_key();
	}
}

if ( ! function_exists( 'monsterinsights_export_settings' ) ) {
	function monsterinsights_export_settings() {
		return heretekanalytics_export_settings();
	}
}
