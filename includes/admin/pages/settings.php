<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the Heretek Analytics Settings page (pure PHP, no Vue).
 *
 * The page is a server-rendered form with three fields:
 *   - GA4 Measurement ID   (`G-XXXXXXXXXX`)
 *   - GA4 Property ID      (numeric, e.g. `123456789`)
 *   - Google Cloud service account JSON key (for the GA4 Data API)
 *
 * Save happens via admin-ajax POST to `monsterinsights_save_heretek_settings`.
 * Verification of the credentials happens via `monsterinsights_verify_heretek_credentials`.
 *
 * @since 12.0.0
 */
function monsterinsights_settings_page() {
	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}

	$auth    = MonsterInsights()->auth;
	$v4      = $auth->get_manual_v4_id();
	$prop_id = $auth->get_property_id();
	$sa      = $auth->get_service_account_json();

	$status = monsterinsights_get_settings_status( $v4, $prop_id, $sa );

	$dimensions_status = array();
	if ( ! empty( $prop_id ) && ! empty( $sa ) ) {
		if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
		}
		$gateway           = new Heretek_Rest_Reporting_Gateway();
		$dimensions_status = $gateway->get_dimensions_status();
	}

	$ajax_url    = admin_url( 'admin-ajax.php' );
	$nonce_save  = wp_create_nonce( 'monsterinsights_save_heretek_settings' );
	$nonce_check = wp_create_nonce( 'monsterinsights_verify_heretek_credentials' );
	$reset_url   = admin_url( 'admin.php?page=monsterinsights_settings' );

	include MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/templates/settings-form.php';
}

/**
 * Multisite network-level settings page.
 *
 * For now, Heretek Analytics keeps network settings minimal — site admins
 * configure their own GA4 ID and service account from each site's settings.
 *
 * @since 12.0.0
 */
function monsterinsights_network_page() {
	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_die( esc_html__( 'Permission denied.', 'google-analytics-for-wordpress' ) );
	}
	?>
	<div class="wrap" style="font-family:'Geist', sans-serif;">
		<h1><?php esc_html_e( 'Heretek Analytics — Network Settings', 'google-analytics-for-wordpress' ); ?></h1>
		<p style="max-width:760px;color:#a1a1aa;">
			<?php esc_html_e( 'Heretek Analytics is configured per site. Each subsite can enter its own GA4 Measurement ID, Property ID, and service account JSON from its own Heretek Analytics settings page. There are no network-wide credentials to set here.', 'google-analytics-for-wordpress' ); ?>
		</p>
	</div>
	<?php
}

/**
 * Compute the human-readable status line for the Settings page hero.
 *
 * @param string $v4      Measurement ID.
 * @param string $prop_id Property ID.
 * @param string $sa      Service account JSON.
 * @return array{level:string,label:string,description:string}
 */
function monsterinsights_get_settings_status( $v4, $prop_id, $sa ) {
	if ( empty( $v4 ) ) {
		return array(
			'level'       => 'unconfigured',
			'label'       => __( 'Measurement ID missing', 'google-analytics-for-wordpress' ),
			'description' => __( 'Tracking is paused. Save your GA4 Measurement ID to begin injecting the gtag.js snippet on the front-end.', 'google-analytics-for-wordpress' ),
		);
	}

	if ( empty( $prop_id ) || empty( $sa ) ) {
		return array(
			'level'       => 'tracking-only',
			'label'       => __( 'Front-end tracking only', 'google-analytics-for-wordpress' ),
			'description' => __( 'gtag.js will fire on the front-end, but the in-dashboard Reports page will be disabled until a GA4 Property ID and service account JSON are configured.', 'google-analytics-for-wordpress' ),
		);
	}

	return array(
		'level'       => 'configured',
		'label'       => __( 'Fully configured', 'google-analytics-for-wordpress' ),
		'description' => __( 'Both front-end tracking and the Reports dashboard are powered by your own Google Cloud service account.', 'google-analytics-for-wordpress' ),
	);
}

/**
 * Echo inline JavaScript used by the Settings page.
 *
 * One small `wp_localize_script`-style inline script — no external bundle.
 *
 * @since 12.0.0
 */
function monsterinsights_settings_inline_js() {
	?>
	<script type="text/javascript">
	(function () {
		var form = document.getElementById('heretek-settings-form');
		if (!form) return;

		var statusEl  = document.getElementById('heretek-settings-status');
		var button    = document.getElementById('heretek-settings-save');
		var verifyBtn = document.getElementById('heretek-settings-verify');
		var feedback  = document.getElementById('heretek-settings-feedback');

		function showFeedback(kind, msg) {
			if (!feedback) return;
			feedback.className = 'heretek-feedback heretek-feedback--' + kind;
			feedback.textContent = msg;
			feedback.style.display = 'block';
		}

		function post(action, payload) {
			var body = new URLSearchParams();
			body.append('action', action);
			body.append('nonce', form.dataset.nonce);
			Object.keys(payload || {}).forEach(function (k) {
				body.append(k, payload[k]);
			});
			return fetch(form.dataset.ajaxUrl, {
				method: 'POST',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString(),
			}).then(function (r) { return r.json(); });
		}

		if (button) {
			button.addEventListener('click', function (e) {
				e.preventDefault();
				button.disabled = true;
				showFeedback('info', 'Saving…');
				post('monsterinsights_save_heretek_settings', {
					v4: form.v4.value,
					property_id: form.property_id.value,
					service_account_json: form.service_account_json.value,
				}).then(function (resp) {
					button.disabled = false;
					if (resp && resp.success) {
						showFeedback('success', resp.data && resp.data.message ? resp.data.message : 'Settings saved.');
						if (statusEl && resp.data && resp.data.status) {
							statusEl.dataset.level = resp.data.status.level;
							statusEl.querySelector('.heretek-status__label').textContent       = resp.data.status.label;
							statusEl.querySelector('.heretek-status__description').textContent = resp.data.status.description;
						}
					} else {
						showFeedback('error', (resp && resp.data && resp.data.message) ? resp.data.message : 'Could not save settings.');
					}
				}).catch(function (err) {
					button.disabled = false;
					showFeedback('error', 'Network error: ' + err.message);
				});
			});
		}

		if (verifyBtn) {
			verifyBtn.addEventListener('click', function (e) {
				e.preventDefault();
				verifyBtn.disabled = true;
				showFeedback('info', 'Verifying credentials…');
				post('monsterinsights_verify_heretek_credentials', {}).then(function (resp) {
					verifyBtn.disabled = false;
					if (resp && resp.success) {
						showFeedback('success', resp.data && resp.data.message ? resp.data.message : 'Credentials verified.');
					} else {
						showFeedback('error', (resp && resp.data && resp.data.message) ? resp.data.message : 'Verification failed.');
					}
				}).catch(function (err) {
					verifyBtn.disabled = false;
					showFeedback('error', 'Network error: ' + err.message);
				});
			});
		}

		var resetBtn = document.getElementById('heretek-settings-reset');
		if (resetBtn) {
			resetBtn.addEventListener('click', function (e) {
				if (!confirm('Clear all Heretek Analytics credentials? Front-end tracking will stop.')) {
					e.preventDefault();
				}
			});
		}
	})();
	</script>
	<?php
}

/**
 * Compatibility shim — kept so any code (notably `admin.php`) still calling
 * `monsterinsights_settings_error_page()` does not fatal. The Vue error page
 * itself has been retired along with the JS bundle.
 *
 * @param string $id
 * @param string $footer
 * @param string $margin
 */
function monsterinsights_settings_error_page( $id = 'monsterinsights-vue-site-settings', $footer = '', $margin = '82px 0' ) {
	// intentionally empty.
}
