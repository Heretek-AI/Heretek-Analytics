<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the Heretek Analytics Tools page.
 *
 * Currently exposes: settings export/import (full backup), server-info read-out,
 * and quick links to Google Cloud + GA4 consoles.
 *
 * @return void
 * @since 12.0.0
 */
function monsterinsights_tools_page() {
	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	$export_url = admin_url( 'admin.php?page=monsterinsights_tools' );
	$nonce      = wp_create_nonce( 'mi-admin-nonce' );
	?>
	<style>
	.heretek-tools-wrap { max-width:880px; margin:24px auto 80px; padding:0 20px; font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#e4e4e7; }
	.heretek-tools-wrap h1 { font-family:'Cinzel',serif; font-size:26px; font-weight:700; letter-spacing:0.04em; color:#f4f4f5; margin:0 0 6px; }
	.heretek-tools-wrap .lede { color:#a1a1aa; font-size:14px; margin:0 0 22px; line-height:1.55; }
	.heretek-card { background:#111116; border:1px solid #27272a; border-radius:8px; padding:20px 24px; margin-bottom:18px; }
	.heretek-card h2 { font-family:'Cinzel',serif; font-size:16px; color:#f4f4f5; margin:0 0 8px; }
	.heretek-card p  { color:#a1a1aa; font-size:13px; line-height:1.55; margin:0 0 12px; }
	.heretek-card .button-primary { background:#dc2626; border-color:#b91c1c; }
	.heretek-card .button-primary:hover { background:#b91c1c; }
	.heretek-table { width:100%; border-collapse:collapse; font-size:13px; }
	.heretek-table th, .heretek-table td { padding:8px 6px; border-bottom:1px solid #1f1f23; text-align:left; color:#d4d4d8; }
	.heretek-table th { color:#a1a1aa; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; font-size:11px; }
	.heretek-table code { background:#18181b; padding:1px 6px; border-radius:3px; color:#f4f4f5; }
	</style>

	<div class="heretek-tools-wrap">
		<h1><?php esc_html_e( 'Heretek Analytics Tools', 'google-analytics-for-wordpress' ); ?></h1>
		<p class="lede"><?php esc_html_e( 'Self-hosted utilities for managing your Heretek Analytics installation.', 'google-analytics-for-wordpress' ); ?></p>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'Settings Export', 'google-analytics-for-wordpress' ); ?></h2>
			<p><?php esc_html_e( 'Download a JSON snapshot of your Heretek Analytics options. Useful for backup or for migrating the configuration to another site.', 'google-analytics-for-wordpress' ); ?></p>
			<form method="post" action="<?php echo esc_url( $export_url ); ?>">
				<input type="hidden" name="monsterinsights_action" value="monsterinsights_export_settings" />
				<input type="hidden" name="monsterinsights_export_settings" value="<?php echo esc_attr( $nonce ); ?>" />
				<button type="submit" class="button button-primary"><?php esc_html_e( 'Download Settings Export', 'google-analytics-for-wordpress' ); ?></button>
			</form>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'Environment', 'google-analytics-for-wordpress' ); ?></h2>
			<table class="heretek-table">
				<tbody>
					<tr><th><?php esc_html_e( 'Plugin version', 'google-analytics-for-wordpress' ); ?></th><td><code><?php echo esc_html( MONSTERINSIGHTS_VERSION ); ?></code></td></tr>
					<tr><th><?php esc_html_e( 'WordPress version', 'google-analytics-for-wordpress' ); ?></th><td><code><?php echo esc_html( get_bloginfo( 'version' ) ); ?></code></td></tr>
					<tr><th><?php esc_html_e( 'PHP version', 'google-analytics-for-wordpress' ); ?></th><td><code><?php echo esc_html( PHP_VERSION ); ?></code></td></tr>
					<tr><th><?php esc_html_e( 'REST API namespace', 'google-analytics-for-wordpress' ); ?></th><td><code><?php echo esc_html( rest_url( 'heretek-analytics/v1/reporting/query' ) ); ?></code></td></tr>
					<tr><th><?php esc_html_e( 'Plugin directory', 'google-analytics-for-wordpress' ); ?></th><td><code><?php echo esc_html( MONSTERINSIGHTS_PLUGIN_DIR ); ?></code></td></tr>
				</tbody>
			</table>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'Useful Links', 'google-analytics-for-wordpress' ); ?></h2>
			<p>
				<a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Google Analytics', 'google-analytics-for-wordpress' ); ?></a> &middot;
				<a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Google Cloud Console', 'google-analytics-for-wordpress' ); ?></a> &middot;
				<a href="https://developers.google.com/analytics/devguides/reporting/data/v1" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'GA4 Data API docs', 'google-analytics-for-wordpress' ); ?></a> &middot;
				<a href="https://github.com/Heretek-AI/Heretek-Analytics" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Heretek Analytics on GitHub', 'google-analytics-for-wordpress' ); ?></a>
			</p>
		</div>
	</div>
	<?php
}

/**
 * Download the plugin settings as a JSON file.
 *
 * Wired to `admin_init` so the POST from the Tools form can run before any
 * output is produced.
 *
 * @return void
 */
function monsterinsights_process_export_settings() {
	if ( ! isset( $_POST['monsterinsights_action'] ) || empty( $_POST['monsterinsights_action'] ) ) {
		return;
	}

	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		return;
	}

	if ( 'monsterinsights_export_settings' !== $_POST['monsterinsights_action'] ) {
		return;
	}

	if ( empty( $_POST['monsterinsights_export_settings'] ) || ! wp_verify_nonce( $_POST['monsterinsights_export_settings'], 'mi-admin-nonce' ) ) {
		return;
	}

	$settings = monsterinsights_export_settings();
	ignore_user_abort( true );

	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=heretek-analytics-settings-' . gmdate( 'Y-m-d' ) . '.json' );
	header( 'Expires: 0' );
	echo $settings; // phpcs:ignore
	exit;
}
add_action( 'admin_init', 'monsterinsights_process_export_settings' );
