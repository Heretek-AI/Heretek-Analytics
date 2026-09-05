<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the Heretek Analytics "About" page.
 *
 * Pure PHP, no Vue. Replaces the upstream MonsterInsights About screen.
 *
 * @return void
 * @since 12.0.0
 */
function monsterinsights_about_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	?>
	<style>
	.heretek-about-wrap { max-width:880px; margin:24px auto 80px; padding:0 20px; font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#e4e4e7; }
	.heretek-about-wrap h1 { font-family:'Cinzel',serif; font-size:30px; font-weight:700; letter-spacing:0.04em; color:#f4f4f5; margin:0 0 4px; }
	.heretek-about-wrap .lede { color:#a1a1aa; font-size:15px; margin:0 0 22px; line-height:1.6; }
	.heretek-card { background:#111116; border:1px solid #27272a; border-radius:8px; padding:22px 26px; margin-bottom:18px; }
	.heretek-card h2 { font-family:'Cinzel',serif; font-size:18px; color:#f4f4f5; margin:0 0 8px; }
	.heretek-card p, .heretek-card li { color:#a1a1aa; font-size:13px; line-height:1.6; }
	.heretek-card ul { padding-left:20px; margin:0; }
	.heretek-card code { background:#18181b; padding:1px 6px; border-radius:3px; color:#f4f4f5; font-size:12px; }
	.heretek-card a { color:#fca5a5; }
	.heretek-badge { display:inline-block; background:#dc2626; color:#fff; padding:2px 10px; border-radius:12px; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; margin-left:8px; vertical-align:middle; }
	</style>

	<div class="heretek-about-wrap">
		<h1>Heretek Analytics <span class="heretek-badge"><?php echo esc_html( MONSTERINSIGHTS_VERSION ); ?></span></h1>
		<p class="lede">
			<?php esc_html_e( 'A 100% open-source, self-hosted Google Analytics 4 plugin for WordPress. No subscriptions. No phone-home. No external relay. No paywalls.', 'google-analytics-for-wordpress' ); ?>
		</p>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'What you get', 'google-analytics-for-wordpress' ); ?></h2>
			<ul>
				<li><?php esc_html_e( 'Core GA4 tracking via gtag.js — automatic pageview, scroll, outbound-link, download, and affiliate-link tracking.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Direct GA4 Data API reporting — KPIs, daily sessions chart, top pages, top countries, all fetched live from your own service account.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Google Consent Mode v2 — wire up consent defaults (analytics_storage, ad_storage, ad_user_data, ad_personalization) from your own banner.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Native GitHub release updater — automatic update checks against the Heretek-AI/Heretek-Analytics repository.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Per-page exclude tracking via the editor sidebar.', 'google-analytics-for-wordpress' ); ?></li>
			</ul>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'No third-party traffic', 'google-analytics-for-wordpress' ); ?></h2>
			<p>
				<?php esc_html_e( 'Heretek Analytics never talks to monsterinsights.com, exactmetrics.com, or any other SaaS. The only outbound HTTP requests are to Google:', 'google-analytics-for-wordpress' ); ?>
			</p>
			<ul>
				<li><code>https://www.googletagmanager.com/gtag/js</code> — <?php esc_html_e( 'gtag.js script load', 'google-analytics-for-wordpress' ); ?></li>
				<li><code>https://analyticsdata.googleapis.com/v1beta/</code> — <?php esc_html_e( 'GA4 Data API', 'google-analytics-for-wordpress' ); ?></li>
				<li><code>https://oauth2.googleapis.com/token</code> — <?php esc_html_e( 'OAuth2 access-token mint from your service account JWT', 'google-analytics-for-wordpress' ); ?></li>
			</ul>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'Forked from', 'google-analytics-for-wordpress' ); ?></h2>
			<p>
				<?php esc_html_e( 'Heretek Analytics is a fork of Google Analytics for WordPress by MonsterInsights (Chris Christoff, Yoast, Awesome Motive, Inc.), originally released under GPLv3. We have retained the upstream attribution and license.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<p>
				<a href="https://github.com/Heretek-AI/Heretek-Analytics" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Heretek-AI/Heretek-Analytics on GitHub', 'google-analytics-for-wordpress' ); ?></a>
			</p>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'License', 'google-analytics-for-wordpress' ); ?></h2>
			<p><?php esc_html_e( 'GNU General Public License v3.0 (GPLv3). You may use, modify, and redistribute this plugin freely. The full text is in the LICENSE file distributed with the plugin.', 'google-analytics-for-wordpress' ); ?></p>
		</div>
	</div>
	<?php
}
