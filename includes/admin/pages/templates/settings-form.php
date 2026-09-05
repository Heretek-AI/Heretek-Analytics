<?php
/**
 * Settings form template.
 *
 * Rendered server-side by monsterinsights_settings_page().
 *
 * @var string $v4
 * @var string $prop_id
 * @var string $sa
 * @var array  $status
 * @var string $ajax_url
 * @var string $nonce_save
 * @var string $nonce_check
 * @var string $reset_url
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$level = isset( $status['level'] ) ? (string) $status['level'] : 'unconfigured';
?>
<style>
.heretek-settings-wrap {
	max-width: 880px;
	margin: 24px auto 80px;
	padding: 0 20px;
	font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	color: #e4e4e7;
}
.heretek-settings-wrap h1 {
	font-family: 'Cinzel', serif;
	font-size: 26px;
	font-weight: 700;
	letter-spacing: 0.04em;
	color: #f4f4f5;
	margin: 0 0 6px;
}
.heretek-settings-wrap .heretek-lede {
	color: #a1a1aa;
	font-size: 14px;
	max-width: 720px;
	margin: 0 0 24px;
	line-height: 1.55;
}
.heretek-card {
	background: #111116;
	border: 1px solid #27272a;
	border-radius: 8px;
	padding: 22px 26px;
	margin-bottom: 18px;
	box-shadow: 0 0 0 1px rgba(220,38,38,0.04) inset;
}
.heretek-card h2 {
	font-family: 'Cinzel', serif;
	font-size: 18px;
	letter-spacing: 0.03em;
	color: #f4f4f5;
	margin: 0 0 4px;
	font-weight: 700;
}
.heretek-card .heretek-card__hint {
	color: #a1a1aa;
	font-size: 13px;
	margin: 0 0 16px;
	line-height: 1.5;
}
.heretek-field {
	display: flex;
	flex-direction: column;
	gap: 6px;
	margin-bottom: 16px;
}
.heretek-field label {
	font-weight: 600;
	font-size: 13px;
	letter-spacing: 0.02em;
	color: #d4d4d8;
	text-transform: uppercase;
}
.heretek-field input[type="text"],
.heretek-field textarea {
	background: #09090b;
	border: 1px solid #27272a;
	border-radius: 6px;
	padding: 10px 12px;
	color: #f4f4f5;
	font-family: 'Geist', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
	font-size: 14px;
	width: 100%;
	box-sizing: border-box;
}
.heretek-field input[type="text"]:focus,
.heretek-field textarea:focus {
	border-color: #dc2626;
	outline: none;
	box-shadow: 0 0 0 1px #dc2626;
}
.heretek-field textarea {
	min-height: 220px;
	resize: vertical;
	line-height: 1.4;
	white-space: pre;
}
.heretek-field .heretek-help {
	color: #71717a;
	font-size: 12px;
	line-height: 1.5;
}
.heretek-actions {
	display: flex;
	gap: 10px;
	align-items: center;
	margin-top: 6px;
}
.heretek-button {
	background: #dc2626;
	border: 1px solid #b91c1c;
	color: #fff;
	border-radius: 4px;
	padding: 10px 22px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	font-family: inherit;
}
.heretek-button:hover {
	background: #b91c1c;
}
.heretek-button:disabled {
	opacity: 0.55;
	cursor: progress;
}
.heretek-button--secondary {
	background: transparent;
	border: 1px solid #3f3f46;
	color: #d4d4d8;
}
.heretek-button--secondary:hover {
	background: #1c1917;
	color: #f4f4f5;
}
.heretek-button--danger {
	background: transparent;
	border: 1px solid #7f1d1d;
	color: #fca5a5;
}
.heretek-button--danger:hover {
	background: #450a0a;
	color: #fecaca;
}
.heretek-feedback {
	display: none;
	margin: 14px 0 0;
	padding: 12px 14px;
	border-radius: 4px;
	font-size: 13px;
	line-height: 1.5;
	border-left: 3px solid;
}
.heretek-feedback--info    { background:#18181b; border-color:#52525b; color:#e4e4e7; }
.heretek-feedback--success { background:#052e16; border-color:#22c55e; color:#bbf7d0; }
.heretek-feedback--error   { background:#1c1917; border-color:#dc2626; color:#fecaca; }
.heretek-status {
	display: flex;
	gap: 14px;
	align-items: flex-start;
	padding: 16px 18px;
	background: #111116;
	border: 1px solid #27272a;
	border-left: 3px solid #52525b;
	border-radius: 6px;
	margin-bottom: 22px;
}
.heretek-status[data-level="unconfigured"]   { border-left-color:#dc2626; }
.heretek-status[data-level="tracking-only"]  { border-left-color:#eab308; }
.heretek-status[data-level="configured"]     { border-left-color:#22c55e; }
.heretek-status__dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin-top: 8px;
	flex-shrink: 0;
	background: #52525b;
}
.heretek-status[data-level="unconfigured"]  .heretek-status__dot { background:#dc2626; }
.heretek-status[data-level="tracking-only"] .heretek-status__dot { background:#eab308; }
.heretek-status[data-level="configured"]    .heretek-status__dot { background:#22c55e; }
.heretek-status__label {
	font-weight: 700;
	font-size: 14px;
	color: #f4f4f5;
	letter-spacing: 0.02em;
	margin-bottom: 4px;
}
.heretek-status__description {
	color: #a1a1aa;
	font-size: 13px;
	line-height: 1.5;
}
.heretek-card ol {
	margin: 0 0 0 18px;
	padding: 0;
	color: #a1a1aa;
	font-size: 13px;
	line-height: 1.7;
}
.heretek-card ol li { margin-bottom: 6px; }
.heretek-card code {
	background: #18181b;
	padding: 1px 6px;
	border-radius: 3px;
	font-size: 12px;
	color: #f4f4f5;
}
</style>

<div class="heretek-settings-wrap">
	<h1><?php esc_html_e( 'Heretek Analytics Settings', 'google-analytics-for-wordpress' ); ?></h1>
	<p class="heretek-lede">
		<?php esc_html_e( 'Stand-alone, self-hosted Google Analytics 4 tracking. No external service ever sees your traffic — paste your GA4 details and a Google Cloud service account JSON key below, then save.', 'google-analytics-for-wordpress' ); ?>
	</p>

	<div id="heretek-settings-status" class="heretek-status" data-level="<?php echo esc_attr( $level ); ?>">
		<span class="heretek-status__dot"></span>
		<div>
			<div class="heretek-status__label"><?php echo esc_html( $status['label'] ); ?></div>
			<div class="heretek-status__description"><?php echo esc_html( $status['description'] ); ?></div>
		</div>
	</div>

	<form id="heretek-settings-form" autocomplete="off"
		  data-ajax-url="<?php echo esc_attr( $ajax_url ); ?>"
		  data-nonce="<?php echo esc_attr( $nonce_save ); ?>">

		<div class="heretek-card">
			<h2><?php esc_html_e( 'GA4 Measurement ID', 'google-analytics-for-wordpress' ); ?></h2>
			<p class="heretek-card__hint">
				<?php esc_html_e( 'Found in your GA4 property under Admin → Data Streams → Web. Format: G-XXXXXXXXXX.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div class="heretek-field">
				<label for="heretek-v4"><?php esc_html_e( 'Measurement ID', 'google-analytics-for-wordpress' ); ?></label>
				<input type="text" id="heretek-v4" name="v4" value="<?php echo esc_attr( $v4 ); ?>" placeholder="G-XXXXXXXXXX" pattern="^G-[A-Za-z0-9]+$" spellcheck="false" />
				<p class="heretek-help"><?php esc_html_e( 'Saved here it powers the gtag.js snippet injected on every front-end page.', 'google-analytics-for-wordpress' ); ?></p>
			</div>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'GA4 Property ID', 'google-analytics-for-wordpress' ); ?></h2>
			<p class="heretek-card__hint">
				<?php esc_html_e( 'Found in your GA4 property under Admin → Property settings → Property ID (numeric, e.g. 123456789). Required to fetch reports through the Data API.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div class="heretek-field">
				<label for="heretek-pid"><?php esc_html_e( 'Property ID', 'google-analytics-for-wordpress' ); ?></label>
				<input type="text" id="heretek-pid" name="property_id" value="<?php echo esc_attr( $prop_id ); ?>" placeholder="123456789" inputmode="numeric" pattern="[0-9]+" spellcheck="false" />
			</div>
		</div>

		<div class="heretek-card">
			<h2><?php esc_html_e( 'Google Cloud Service Account JSON', 'google-analytics-for-wordpress' ); ?></h2>
			<p class="heretek-card__hint">
				<?php esc_html_e( 'Heretek Analytics uses this server-side to mint a short-lived OAuth2 token and call the GA4 Data API directly. Your site is the only place this key is stored.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<div class="heretek-field">
				<label for="heretek-sa"><?php esc_html_e( 'Service Account JSON', 'google-analytics-for-wordpress' ); ?></label>
				<textarea id="heretek-sa" name="service_account_json" spellcheck="false" placeholder='{
  "type": "service_account",
  "project_id": "my-ga4-reader",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "[email protected]",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}'><?php echo esc_textarea( $sa ); ?></textarea>
				<p class="heretek-help"><?php esc_html_e( 'Required scopes: https://www.googleapis.com/auth/analytics.readonly. The service account email must be added as a Viewer on this GA4 property.', 'google-analytics-for-wordpress' ); ?></p>
			</div>
			<ol>
				<li><?php esc_html_e( 'In Google Cloud Console, create (or select) a project and enable the "Google Analytics Data API".', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'Create a service account, download its JSON key, and paste the contents above.', 'google-analytics-for-wordpress' ); ?></li>
				<li><?php esc_html_e( 'In GA4 Admin → Property access management, add the service account email as a Viewer.', 'google-analytics-for-wordpress' ); ?></li>
			</ol>
		</div>

		<div class="heretek-actions">
			<button type="button" id="heretek-settings-save" class="heretek-button">
				<?php esc_html_e( 'Save Settings', 'google-analytics-for-wordpress' ); ?>
			</button>
			<button type="button" id="heretek-settings-verify" class="heretek-button heretek-button--secondary">
				<?php esc_html_e( 'Verify Credentials', 'google-analytics-for-wordpress' ); ?>
			</button>
			<a id="heretek-settings-reset" class="heretek-button heretek-button--danger" href="<?php echo esc_url( $reset_url ); ?>">
				<?php esc_html_e( 'Clear All', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>

		<div id="heretek-settings-feedback" class="heretek-feedback" role="status"></div>
	</form>
</div>

<?php monsterinsights_settings_inline_js(); ?>
