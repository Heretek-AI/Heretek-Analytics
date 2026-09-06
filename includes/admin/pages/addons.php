<?php
/**
 * Heretek Analytics add-ons page.
 *
 * The upstream MonsterInsights distribution used this screen to sell paid
 * add-on plugins via the MonsterInsights SaaS. Heretek Analytics is fully
 * self-hosted and ships with no paid add-ons, so this page now just shows a
 * short notice pointing to the in-dashboard Tools and Settings pages.
 *
 * @since 12.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the Add-ons page (no SaaS, no upsell).
 *
 * @return void
 */
function heretekanalytics_addons_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	?>
	<style>
	.heretek-addons-wrap { max-width:880px; margin:24px auto 80px; padding:0 20px; font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#e4e4e7; }
	.heretek-addons-wrap h1 { font-family:'Cinzel',serif; font-size:26px; font-weight:700; letter-spacing:0.04em; color:#f4f4f5; margin:0 0 6px; }
	.heretek-addons-wrap .lede { color:#a1a1aa; font-size:14px; margin:0 0 22px; line-height:1.55; }
	.heretek-card { background:#111116; border:1px solid #27272a; border-radius:8px; padding:22px 26px; }
	.heretek-card p { color:#a1a1aa; font-size:13px; line-height:1.55; margin:0 0 12px; }
	.heretek-card a { color:#fca5a5; }
	</style>

	<div class="heretek-addons-wrap">
		<h1><?php esc_html_e( 'Heretek Analytics — Add-ons', 'google-analytics-for-wordpress' ); ?></h1>
		<p class="lede"><?php esc_html_e( 'There are no paid add-ons.', 'google-analytics-for-wordpress' ); ?></p>

		<div class="heretek-card">
			<p>
				<?php esc_html_e( 'Heretek Analytics is fully self-hosted and unlocked. Every capability that the upstream MonsterInsights distribution put behind a paywall is shipped in this plugin or stripped entirely as obsolete.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<p>
				<?php esc_html_e( 'Configure the plugin from the', 'google-analytics-for-wordpress' ); ?>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_settings' ) ); ?>"><?php esc_html_e( 'Settings page', 'google-analytics-for-wordpress' ); ?></a>,
				<?php esc_html_e( 'or export your configuration from the', 'google-analytics-for-wordpress' ); ?>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_tools' ) ); ?>"><?php esc_html_e( 'Tools page', 'google-analytics-for-wordpress' ); ?></a>.
			</p>
		</div>
	</div>
	<?php
}

/**
 * Backward compatibility alias for monsterinsights_addons_page.
 *
 * @return void
 */
function monsterinsights_addons_page() {
	heretekanalytics_addons_page();
}

/**
 * Compatibility shim.
 *
 * @return bool Always false; Heretek Analytics has no add-ons.
 */
function heretekanalytics_get_addons() {
	return false;
}

/**
 * Backward compatibility alias for monsterinsights_get_addons.
 *
 * @return bool Always false.
 */
function monsterinsights_get_addons() {
	return heretekanalytics_get_addons();
}
