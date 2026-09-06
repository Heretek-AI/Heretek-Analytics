<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Removes report-view telemetry options.
 *
 * @since 11.2.0
 */
function heretekanalytics_uninstall_remove_report_view_telemetry_options() {
	delete_option( 'heretekanalytics_report_views' );
	delete_option( 'heretekanalytics_last_admin_seen' );
	delete_option( 'monsterinsights_report_views' );
	delete_option( 'monsterinsights_last_admin_seen' );
}

/**
 * Backward compatibility alias for monsterinsights_uninstall_remove_report_view_telemetry_options.
 */
function monsterinsights_uninstall_remove_report_view_telemetry_options() {
	heretekanalytics_uninstall_remove_report_view_telemetry_options();
}

/**
 * Remove various options used in the plugin.
 */
function heretekanalytics_uninstall_remove_options() {

	// Remove usage tracking options.
	delete_option( 'heretekanalytics_usage_tracking_config' );
	delete_option( 'heretekanalytics_usage_tracking_last_checkin' );
	delete_option( 'monsterinsights_usage_tracking_config' );
	delete_option( 'monsterinsights_usage_tracking_last_checkin' );

	// Remove version options.
	delete_option( 'heretekanalytics_db_version' );
	delete_option( 'heretekanalytics_version_upgraded_from' );
	delete_option( 'monsterinsights_db_version' );
	delete_option( 'monsterinsights_version_upgraded_from' );

	// Remove notice options.
	delete_option( 'heretekanalytics_notices' );
	delete_option( 'monsterinsights_notices' );

	// Remove other options used for display.
	delete_option( 'heretekanalytics_email_summaries_infoblocks_sent' );
	delete_option( 'heretekanalytics_float_bar_hidden' );
	delete_option( 'heretekanalytics_frontend_tracking_notice_viewed' );
	delete_option( 'heretekanalytics_admin_menu_tooltip' );
	delete_option( 'heretekanalytics_review' );
	delete_option( 'monsterinsights_email_summaries_infoblocks_sent' );
	delete_option( 'monsterinsights_float_bar_hidden' );
	delete_option( 'monsterinsights_frontend_tracking_notice_viewed' );
	delete_option( 'monsterinsights_admin_menu_tooltip' );
	delete_option( 'monsterinsights_review' );

	// Remove Ads addon-notice dismissal option (and any legacy transient from
	// before the option-based persistence).
	delete_option( 'heretekanalytics_ads_addon_installed_notice_dismissed' );
	delete_transient( 'heretekanalytics_ads_addon_installed_notice_dismissed' );
	delete_option( 'monsterinsights_ads_addon_installed_notice_dismissed' );
	delete_transient( 'monsterinsights_ads_addon_installed_notice_dismissed' );

	// Delete addons transient.
	delete_transient( 'heretekanalytics_addons' );
	delete_transient( 'monsterinsights_addons' );
	heretekanalytics_uninstall_remove_report_view_telemetry_options();

}

/**
 * Backward compatibility alias for monsterinsights_uninstall_remove_options.
 */
function monsterinsights_uninstall_remove_options() {
	heretekanalytics_uninstall_remove_options();
}
