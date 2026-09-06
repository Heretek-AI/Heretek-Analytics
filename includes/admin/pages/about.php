<?php
/**
 * Heretek Analytics — About Page.
 *
 * Details the open-source ethos, zero-telemetry architecture, and capabilities.
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
 * Render the Heretek Analytics "About" page.
 *
 * @return void
 */
function heretekanalytics_about_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	$icon_url = HERETEK_ANALYTICS_PLUGIN_URL . 'assets/images/icon-sm.png';
	?>
	<div class="htk-cockpit" style="max-width:980px;">

		<header class="htk-header">
			<div class="htk-header-brand">
				<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Emblem">
				<div class="htk-header-title">
					<h1>
						Heretek Analytics
						<span class="htk-badge-ver"><?php echo esc_html( HERETEK_ANALYTICS_VERSION ); ?></span>
					</h1>
					<div class="htk-header-telemetry-meta">
						<span><?php esc_html_e( 'The Unrestricted GA4 Data Augur & Telemetry Cogitator for WordPress', 'google-analytics-for-wordpress' ); ?></span>
					</div>
				</div>
			</div>
			<div class="htk-toolbar">
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_reports' ) ); ?>" class="htk-btn htk-btn-primary">
					<?php esc_html_e( 'Open Augur Cockpit &rarr;', 'google-analytics-for-wordpress' ); ?>
				</a>
			</div>
		</header>

		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'The Zero-Telemetry Manifesto', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:14px;line-height:1.6;margin-bottom:14px;">
				<?php esc_html_e( 'Heretek Analytics is 100% open-source, telemetry-free, and self-hosted. All commercial paywalls, promotional banner rotators, deactivation survey beacons, and hosted SaaS relays have been permanently purged.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<ul style="padding-left:20px;color:var(--htk-text-dim);font-size:13px;line-height:1.7;margin:0;">
				<li><?php esc_html_e( 'Direct GA4 Data API reporting straight from analyticsdata.googleapis.com via your own service account.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Realtime active reader radar powered by runRealtimeReport.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Per-author telemetry with custom dimension author_id joined directly with WordPress user accounts.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Automated native release updates directly from GitHub Releases without license keys.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Google Consent Mode v2 and server-side Measurement Protocol support included.', 'google-analytics-for-wordpress' ); ?></li>
			</ul>
		</div>

		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'Whitelisted Google Outbound Endpoints', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;line-height:1.6;margin-bottom:12px;">
				<?php esc_html_e( 'Heretek Analytics strictly contacts only official Google APIs:', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div class="htk-table-wrap">
				<table class="htk-table">
					<tbody>
						<tr><td style="font-family:monospace;color:#fca5a5;">https://www.googletagmanager.com/gtag/js</td><td><?php esc_html_e( 'Front-end gtag.js tag loader', 'google-analytics-for-wordpress' ); ?></td></tr>
						<tr><td style="font-family:monospace;color:#fca5a5;">https://analyticsdata.googleapis.com/v1beta/</td><td><?php esc_html_e( 'Direct GA4 Data and Realtime APIs', 'google-analytics-for-wordpress' ); ?></td></tr>
						<tr><td style="font-family:monospace;color:#fca5a5;">https://oauth2.googleapis.com/token</td><td><?php esc_html_e( 'Service account JWT token exchange', 'google-analytics-for-wordpress' ); ?></td></tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="htk-card htk-card-bracket">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( 'Open Source & Attribution', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;line-height:1.6;margin-bottom:12px;">
				<?php esc_html_e( 'Heretek Analytics is forked from Google Analytics for WordPress (MonsterInsights) under the GNU General Public License v3.0 (GPLv3). Maintained with honour by Heretek AI.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<a href="https://github.com/Heretek-AI/Heretek-Analytics" target="_blank" rel="noopener noreferrer" class="htk-btn htk-btn-secondary">
				<?php esc_html_e( 'Heretek Analytics on GitHub &rarr;', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>

	</div>
	<?php
}

/**
 * Backward compatibility alias for monsterinsights_about_page.
 *
 * @return void
 */
function monsterinsights_about_page() {
	heretekanalytics_about_page();
}

