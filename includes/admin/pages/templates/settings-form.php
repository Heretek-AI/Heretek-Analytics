<?php
/**
 * Heretek Analytics — Settings Form Template.
 *
 * Rendered by monsterinsights_settings_page().
 *
 * @var string $v4
 * @var string $prop_id
 * @var string $sa
 * @var array  $status
 * @var string $ajax_url
 * @var string $nonce_save
 * @var string $nonce_check
 * @var string $reset_url
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$level    = isset( $status['level'] ) ? (string) $status['level'] : 'unconfigured';
$icon_url = MONSTERINSIGHTS_PLUGIN_URL . 'assets/images/icon-sm.png';
?>

<div class="htk-cockpit" style="max-width:980px;">

	<!-- Header -->
	<header class="htk-header">
		<div class="htk-header-brand">
			<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Emblem">
			<div class="htk-header-title">
				<h1>
					<?php esc_html_e( 'Augur Configuration', 'google-analytics-for-wordpress' ); ?>
					<span class="htk-badge-ver"><?php echo esc_html( MONSTERINSIGHTS_VERSION ); ?></span>
				</h1>
				<div class="htk-header-telemetry-meta">
					<span><?php esc_html_e( 'Direct server-to-server GA4 Data API authentication', 'google-analytics-for-wordpress' ); ?></span>
				</div>
			</div>
		</div>
		<div class="htk-toolbar">
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=monsterinsights_reports' ) ); ?>" class="htk-btn htk-btn-primary">
				<?php esc_html_e( 'Launch Augur Cockpit &rarr;', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>
	</header>

	<!-- Status Card -->
	<div id="heretek-settings-status" class="htk-card htk-card-bracket" data-level="<?php echo esc_attr( $level ); ?>" style="margin-bottom:22px;border-left:4px solid <?php echo 'configured' === $level ? '#10b981' : ( 'tracking-only' === $level ? '#f59e0b' : '#dc2626' ); ?>;">
		<div style="display:flex;align-items:center;gap:12px;">
			<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:<?php echo 'configured' === $level ? '#10b981' : ( 'tracking-only' === $level ? '#f59e0b' : '#dc2626' ); ?>;box-shadow:0 0 10px currentColor;"></span>
			<div>
				<h3 style="margin:0 0 4px;font-size:16px;color:#f8fafc;"><?php echo esc_html( $status['label'] ); ?></h3>
				<p style="margin:0;color:var(--htk-text-dim);font-size:13px;line-height:1.5;"><?php echo esc_html( $status['description'] ); ?></p>
			</div>
		</div>
	</div>

	<form id="heretek-settings-form" autocomplete="off"
		  data-ajax-url="<?php echo esc_attr( $ajax_url ); ?>"
		  data-nonce="<?php echo esc_attr( $nonce_save ); ?>">

		<!-- Measurement ID Card -->
		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( '1. GA4 Measurement ID', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;margin:0 0 14px;line-height:1.5;">
				<?php esc_html_e( 'Found in your GA4 property under Admin → Data Streams → Web. Format: G-XXXXXXXXXX. Powers the front-end tracking tag.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div style="margin-bottom:12px;">
				<input type="text" id="heretek-v4" name="v4" value="<?php echo esc_attr( $v4 ); ?>" placeholder="G-XXXXXXXXXX" pattern="^G-[A-Za-z0-9]+$" spellcheck="false" class="htk-date-input" style="width:100%;max-width:360px;font-size:14px;padding:8px 12px;" />
			</div>
		</div>

		<!-- Property ID Card -->
		<div class="htk-card htk-card-bracket" style="margin-bottom:20px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( '2. GA4 Property ID', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;margin:0 0 14px;line-height:1.5;">
				<?php esc_html_e( 'Found in your GA4 property under Admin → Property settings → Property ID (numeric string, e.g. 123456789). Required to query report data.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div style="margin-bottom:12px;">
				<input type="text" id="heretek-pid" name="property_id" value="<?php echo esc_attr( $prop_id ); ?>" placeholder="123456789" inputmode="numeric" pattern="[0-9]+" spellcheck="false" class="htk-date-input" style="width:100%;max-width:360px;font-size:14px;padding:8px 12px;" />
			</div>
		</div>

		<!-- Service Account JSON Card -->
		<div class="htk-card htk-card-bracket" style="margin-bottom:22px;">
			<div class="htk-panel-header">
				<h2><?php esc_html_e( '3. Google Cloud Service Account JSON Key', 'google-analytics-for-wordpress' ); ?></h2>
			</div>
			<p style="color:var(--htk-text-dim);font-size:13px;margin:0 0 14px;line-height:1.5;">
				<?php esc_html_e( 'Heretek Analytics uses this server-side key to mint a short-lived OAuth2 bearer token and call the GA4 Data API directly. Zero SaaS relays.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div style="margin-bottom:14px;">
				<textarea id="heretek-sa" name="service_account_json" spellcheck="false" class="htk-date-input" style="width:100%;min-height:220px;font-size:13px;padding:10px 12px;line-height:1.4;" placeholder='{
  "type": "service_account",
  "project_id": "my-ga4-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "[email protected]"
}'><?php echo esc_textarea( $sa ); ?></textarea>
			</div>
			<div style="background:var(--htk-void);border:1px solid var(--htk-border);border-radius:6px;padding:14px 18px;font-size:12px;color:var(--htk-text-dim);line-height:1.6;">
				<strong><?php esc_html_e( '3-Minute Setup Instructions:', 'google-analytics-for-wordpress' ); ?></strong>
				<ol style="margin:6px 0 0 16px;padding:0;">
					<li><?php esc_html_e( 'In Google Cloud Console, create or pick a project and enable the "Google Analytics Data API".', 'google-analytics-for-wordpress' ); ?></li>
					<li><?php esc_html_e( 'Under IAM & Admin → Service Accounts, create a service account and download its JSON key.', 'google-analytics-for-wordpress' ); ?></li>
					<li><?php esc_html_e( 'In GA4 Admin → Property access management, add the service account email as Viewer.', 'google-analytics-for-wordpress' ); ?></li>
				</ol>
			</div>
		</div>

		<!-- Action Buttons -->
		<div style="display:flex;gap:12px;align-items:center;">
			<button type="button" id="heretek-settings-save" class="htk-btn htk-btn-primary" style="padding:10px 24px;font-size:14px;">
				<?php esc_html_e( 'Save Credentials', 'google-analytics-for-wordpress' ); ?>
			</button>
			<button type="button" id="heretek-settings-verify" class="htk-btn htk-btn-secondary" style="padding:10px 20px;font-size:14px;">
				<?php esc_html_e( 'Test & Verify Connection', 'google-analytics-for-wordpress' ); ?>
			</button>
			<a id="heretek-settings-reset" class="htk-btn htk-btn-secondary" style="border-color:#7f1d1d;color:#fca5a5;padding:10px 20px;font-size:14px;" href="<?php echo esc_url( $reset_url ); ?>">
				<?php esc_html_e( 'Reset', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>

		<div id="heretek-settings-feedback" class="htk-alert" style="display:none;margin-top:16px;" role="status"></div>
	</form>

</div>

<?php monsterinsights_settings_inline_js(); ?>
