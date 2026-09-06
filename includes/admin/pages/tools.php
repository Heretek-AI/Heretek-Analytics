<?php
/**
 * Heretek Analytics Tools Page.
 *
 * Exposes settings backup export/import, server diagnostics, and Google console links.
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 * @since 12.2.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the Heretek Analytics Tools page.
 *
 * @return void
 */
function heretekanalytics_tools_page() {
	if ( ! current_user_can( 'heretekanalytics_save_settings' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	$export_url = admin_url( 'admin.php?page=heretekanalytics_tools' );
	$nonce      = wp_create_nonce( 'heretekanalytics_export_settings' );
	$icon_url   = HERETEK_ANALYTICS_PLUGIN_URL . 'assets/images/icon-sm.png';
	?>
	<div class="htk-cockpit" style="max-width:980px;">

		<header class="htk-header">
			<div class="htk-header-brand">
				<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Emblem">
				<div class="htk-header-title">
					<h1>
						<?php esc_html_e( 'Augur Tools & Utilities', 'google-analytics-for-wordpress' ); ?>
						<span class="htk-badge-ver"><?php echo esc_html( HERETEK_ANALYTICS_VERSION ); ?></span>
					</h1>
					<div class="htk-header-telemetry-meta">
						<span><?php esc_html_e( 'Self-hosted administration utilities', 'google-analytics-for-wordpress' ); ?></span>
					</div>
				</div>
			</div>
			<div class="htk-toolbar">
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_reports' ) ); ?>" class="htk-btn htk-btn-secondary">
					<?php esc_html_e( '&larr; Master Augur', 'google-analytics-for-wordpress' ); ?>
				</a>
			</div>
		</header>

		<!-- Settings Export Card -->
		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'Settings Snapshot Export', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;line-height:1.6;margin-bottom:16px;">
				<?php esc_html_e( 'Download a JSON snapshot of your Heretek Analytics configuration, including your GA4 credentials and custom settings. Ideal for backups or syncing to staging/production.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<form method="post" action="<?php echo esc_url( $export_url ); ?>">
				<input type="hidden" name="heretekanalytics_action" value="heretekanalytics_export_settings" />
				<input type="hidden" name="heretekanalytics_export_settings" value="<?php echo esc_attr( $nonce ); ?>" />
				<button type="submit" class="htk-btn htk-btn-primary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					<?php esc_html_e( 'Download JSON Backup', 'google-analytics-for-wordpress' ); ?>
				</button>
			</form>
		</div>

		<!-- Environment Readout Card -->
		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'Cogitator Environment', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<div class="htk-table-wrap">
				<table class="htk-table">
					<tbody>
						<tr><th style="width:240px;"><?php esc_html_e( 'Plugin Version', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#fca5a5;"><?php echo esc_html( HERETEK_ANALYTICS_VERSION ); ?></code></td></tr>
						<tr><th><?php esc_html_e( 'WordPress Version', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#f4f4f5;"><?php echo esc_html( get_bloginfo( 'version' ) ); ?></code></td></tr>
						<tr><th><?php esc_html_e( 'PHP Version', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#f4f4f5;"><?php echo esc_html( PHP_VERSION ); ?></code></td></tr>
						<tr><th><?php esc_html_e( 'REST Dashboard Route', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#94a3b8;"><?php echo esc_html( rest_url( 'heretek-analytics/v1/reporting/dashboard' ) ); ?></code></td></tr>
						<tr><th><?php esc_html_e( 'REST Realtime Route', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#94a3b8;"><?php echo esc_html( rest_url( 'heretek-analytics/v1/reporting/realtime' ) ); ?></code></td></tr>
						<tr><th><?php esc_html_e( 'Plugin Directory', 'google-analytics-for-wordpress' ); ?></th><td><code style="background:var(--htk-void);padding:2px 8px;border-radius:4px;color:#64748b;"><?php echo esc_html( HERETEK_ANALYTICS_PLUGIN_DIR ); ?></code></td></tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Useful Links Card -->
		<div class="htk-card htk-card-bracket">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'External Auguries', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;line-height:1.6;">
				<a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" class="htk-btn htk-btn-secondary" style="margin-right:6px;">Google Analytics Console</a>
				<a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" class="htk-btn htk-btn-secondary" style="margin-right:6px;">Google Cloud Console</a>
				<a href="https://developers.google.com/analytics/devguides/reporting/data/v1" target="_blank" rel="noopener noreferrer" class="htk-btn htk-btn-secondary" style="margin-right:6px;">GA4 Data API Docs</a>
				<a href="https://github.com/Heretek-AI/Heretek-Analytics" target="_blank" rel="noopener noreferrer" class="htk-btn htk-btn-secondary">GitHub Repository</a>
			</p>
		</div>

	</div>
	<?php
}

/**
 * Backward compatibility alias for monsterinsights_tools_page.
 *
 * @return void
 */
function monsterinsights_tools_page() {
	heretekanalytics_tools_page();
}

/**
 * Download the plugin settings as a JSON file.
 *
 * @return void
 */
function heretekanalytics_process_export_settings() {
	$action = '';
	if ( ! empty( $_POST['heretekanalytics_action'] ) ) {
		$action = sanitize_text_field( wp_unslash( $_POST['heretekanalytics_action'] ) );
	} elseif ( ! empty( $_POST['monsterinsights_action'] ) ) {
		$action = sanitize_text_field( wp_unslash( $_POST['monsterinsights_action'] ) );
	}

	if ( empty( $action ) || ( 'heretekanalytics_export_settings' !== $action && 'monsterinsights_export_settings' !== $action ) ) {
		return;
	}

	if ( ! current_user_can( 'heretekanalytics_save_settings' ) ) {
		return;
	}

	$nonce_valid = false;
	if ( ! empty( $_POST['heretekanalytics_export_settings'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['heretekanalytics_export_settings'] ) ), 'heretekanalytics_export_settings' ) ) {
		$nonce_valid = true;
	} elseif ( ! empty( $_POST['monsterinsights_export_settings'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['monsterinsights_export_settings'] ) ), 'mi-admin-nonce' ) ) {
		$nonce_valid = true;
	}

	if ( ! $nonce_valid ) {
		return;
	}

	$settings = heretekanalytics_get_options();
	$profile  = HeretekAnalytics()->auth->get_analytics_profile();

	// Output clean dual-keyed export for maximum compatibility
	$export = array(
		'heretekanalytics_version'      => HERETEK_ANALYTICS_VERSION,
		'monsterinsights_version'      => HERETEK_ANALYTICS_VERSION,
		'exported_at'                  => current_time( 'mysql' ),
		'heretekanalytics_settings'    => $settings,
		'monsterinsights_settings'     => $settings,
		'heretekanalytics_site_profile'=> $profile,
		'monsterinsights_site_profile' => $profile,
	);

	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=heretek-analytics-settings-' . gmdate( 'Y-m-d' ) . '.json' );
	header( 'Expires: 0' );

	echo wp_json_encode( $export, JSON_PRETTY_PRINT );
	exit;
}
add_action( 'admin_init', 'heretekanalytics_process_export_settings' );

/**
 * Backward compatibility alias for monsterinsights_process_export_settings.
 *
 * @return void
 */
function monsterinsights_process_export_settings() {
	heretekanalytics_process_export_settings();
}
