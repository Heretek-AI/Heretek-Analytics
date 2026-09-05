<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Callback to output the MonsterInsights settings page.
 *
 * @return void
 * @since 7.4.0
 * @access public
 *
 */
function monsterinsights_settings_page() {
	echo monsterinsights_ublock_notice(); // phpcs:ignore
	monsterinsights_settings_error_page( 'monsterinsights-vue-site-settings' );
	monsterinsights_settings_inline_js();
}

function monsterinsights_network_page() {
	echo monsterinsights_ublock_notice(); // phpcs:ignore
	monsterinsights_settings_error_page( 'monsterinsights-vue-network-settings' );
	monsterinsights_settings_inline_js();
}

/**
 * Attempt to catch the js error preventing the Vue app from loading and displaying that message for better support.
 */
function monsterinsights_settings_inline_js() {
	?>
	<script type="text/javascript">
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			var browser_error = document.getElementById('monsterinsights-error-browser');
			var js_error = document.getElementById('monsterinsights-error-js');
			js_error.style.display = 'none';
			browser_error.style.display = 'block';
		} else {
			window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
				/* Don't try to put error in container that no longer exists post-vue loading */
				var message_container = document.getElementById('monsterinsights-nojs-error-message');
				if (!message_container) {
					return false;
				}
				var message = document.getElementById('monsterinsights-alert-message');
				message.innerHTML = errorMsg;
				message_container.style.display = 'block';
				return false;
			}
		}
	</script>
	<?php
}


/**
 * Error page HTML
 **/
function monsterinsights_settings_error_page( $id = 'monsterinsights-vue-site-settings', $footer = '', $margin = '82px 0' ) {
	$inline_logo_image = plugins_url( 'assets/images/logo.png', MONSTERINSIGHTS_PLUGIN_FILE );
	?>
	<style type="text/css">
		#monsterinsights-settings-area {
			visibility: hidden;
			animation: loadMonsterInsightsSettingsNoJSView 0s 2s forwards;
		}

		@keyframes loadMonsterInsightsSettingsNoJSView {
			to {
				visibility: visible;
			}
		}
	</style>
	<!--[if IE]>
	<style>
		#monsterinsights-settings-area {
			visibility: visible !important;
		}
	</style>
	<![endif]-->
	<div id="<?php echo esc_attr($id); ?>">
		<div id="monsterinsights-settings-area" class="monsterinsights-settings-area mi-container"
			 style="font-family:'Geist', 'Cinzel', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;margin: auto;width: 750px;max-width: 100%;">
			<div id="monsterinsights-settings-error-loading-area">
				<div class=""
					 style="text-align: center; background-color: #111116; border: 1px solid #27272a; padding: 25px 50px 35px; color: #a1a1aa; border-radius: 8px; margin: <?php echo esc_attr( $margin ); ?>">
					<div class="" style="border-bottom: 0;padding: 5px 20px 0;">
						<img class="" src="<?php echo esc_url( $inline_logo_image ); ?>" alt="Heretek Analytics"
							 style="max-width: 100%;width: 240px;padding: 20px 0 15px;">
					</div>
					<div id="monsterinsights-error-js">
						<h3 class=""
							style="font-family: 'Cinzel', serif; font-size: 20px; color: #f4f4f5; font-weight: 700; line-height: 1.4;"><?php esc_html_e( 'Cogitator Alert: JavaScript Stream Interrupted', 'google-analytics-for-wordpress' ); ?></h3>
						<p class="info"
						   style="line-height: 1.5;margin: 1em 0;font-size: 15px;color: #a1a1aa;padding: 5px 20px 10px;"><?php esc_html_e( 'There seems to be an issue running JavaScript in this sector. Heretek Analytics requires active JavaScript execution to render telemetry interfaces.', 'google-analytics-for-wordpress' ); ?></p>
						<p class="info"
						   style="line-height: 1.5;margin: 1em 0;font-size: 15px;color: #a1a1aa;padding: 5px 20px 20px;">
							<?php
							// Translators: Placeholders make the text bold.
							printf( esc_html__( 'If you are using an %1$sad blocker%2$s, please disable or allowlist the current page to load Heretek Analytics correctly.', 'google-analytics-for-wordpress' ), '<strong style="color:#ef4444;">', '</strong>' );
							?>
						</p>
						<div style="display: none" id="monsterinsights-nojs-error-message">
							<div class="" style="border: 1px solid #ef4444;
																border-left: 3px solid #ef4444;
																background-color: #1c1917;
																color: #ef4444;
																font-size: 14px;
																padding: 18px 18px 18px 21px;
																font-weight: 300;
																text-align: left;">
								<strong style="font-weight: 500;" id="monsterinsights-alert-message"></strong>
							</div>
							<p class=""
							   style="font-size: 14px;color: #71717a;padding-bottom: 15px;"><?php esc_html_e( 'Copy the error message above and submit an issue on the Heretek Analytics repository.', 'google-analytics-for-wordpress' ); ?></p>
						</div>
						<a href="https://github.com/Heretek-AI/Heretek-Analytics/issues" target="_blank"
						   style="margin-left: auto;background-color: #dc2626;border: 1px solid #b91c1c;color: #fff;border-radius: 4px;font-weight: 600;padding: 12px 30px;font-size: 15px;margin-top: 10px;margin-bottom: 20px; text-decoration: none; display: inline-block;">
							<?php esc_html_e( 'Open Support Dossier', 'google-analytics-for-wordpress' ); ?>
						</a>
					</div>
					<div id="monsterinsights-error-browser" style="display: none">
						<h3 class=""
							style="font-family: 'Cinzel', serif; font-size: 20px;color: #f4f4f5;font-weight: 700;"><?php esc_html_e( 'Browser Protocol Obsolete', 'google-analytics-for-wordpress' ); ?></h3>
						<p class="info"
						   style="line-height: 1.5;margin: 1em 0;font-size: 15px;color: #a1a1aa;padding: 5px 20px 20px;"><?php esc_html_e( 'You are using a browser cipher that is no longer supported by Heretek Analytics. Please upgrade your browser to access the cogitator settings.', 'google-analytics-for-wordpress' ); ?></p>
						<a href="https://github.com/Heretek-AI/Heretek-Analytics#readme" target="_blank"
						   style="margin-left: auto;background-color: #dc2626;border: 1px solid #b91c1c;color: #fff;border-radius: 4px;font-weight: 600;padding: 12px 30px;font-size: 15px;margin-top: 10px;margin-bottom: 20px; text-decoration: none; display: inline-block;">
							<?php esc_html_e( 'System Requirements', 'google-analytics-for-wordpress' ); ?>
						</a>
					</div>
				</div>
			</div>
			<div style="text-align: center;">
				<?php echo wp_kses_post( $footer ); ?>
			</div>
		</div>
	</div>
	<?php
}
