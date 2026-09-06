<?php

/**
 * Admin class.
 *
 * @since 6.0.0
 *
 * @package MonsterInsights
 * @subpackage Admin
 * @author  Chris Christoff
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Register menu items for MonsterInsights.
 *
 * @return void
 * @since 6.0.0
 * @access public
 *
 */
function heretekanalytics_admin_menu()
{
	$menu_icon_inline = monsterinsights_get_inline_menu_icon();
	$parent_slug      = 'heretekanalytics_reports';

	add_menu_page(
		__('Heretek Analytics', 'heretek-analytics'),
		__('Heretek Analytics', 'heretek-analytics'),
		'heretekanalytics_view_dashboard',
		$parent_slug,
		'heretekanalytics_reports_page',
		$menu_icon_inline,
		'100.00013467543'
	);

	// Reports (Augur Cockpit)
	add_submenu_page(
		$parent_slug,
		__( 'Augur Reports:', 'heretek-analytics' ),
		__( 'Reports', 'heretek-analytics' ),
		'heretekanalytics_view_dashboard',
		'heretekanalytics_reports',
		'heretekanalytics_reports_page'
	);

	// Authors & Content Taxonomy Telemetry
	add_submenu_page(
		$parent_slug,
		__('Authors & Content:', 'heretek-analytics'),
		__('Authors', 'heretek-analytics'),
		'heretekanalytics_view_dashboard',
		'heretekanalytics_authors',
		'heretekanalytics_authors_page'
	);

	// Settings
	add_submenu_page(
		$parent_slug,
		__( 'Heretek Analytics Settings', 'heretek-analytics' ),
		__( 'Settings', 'heretek-analytics' ),
		'heretekanalytics_save_settings',
		'heretekanalytics_settings',
		'heretekanalytics_settings_page'
	);

	// Tools
	add_submenu_page(
		$parent_slug,
		__('Tools:', 'heretek-analytics'),
		__('Tools', 'heretek-analytics'),
		'manage_options',
		'heretekanalytics_tools',
		'heretekanalytics_tools_page'
	);

	// Addons
	add_submenu_page(
		$parent_slug,
		__('Addons:', 'heretek-analytics'),
		__('Addons', 'heretek-analytics'),
		'manage_options',
		'heretekanalytics_addons',
		'heretekanalytics_addons_page'
	);

	// About Heretek AI
	add_submenu_page(
		$parent_slug,
		__('About Heretek AI:', 'heretek-analytics'),
		__('About Heretek AI', 'heretek-analytics'),
		'manage_options',
		'heretekanalytics_about',
		'heretekanalytics_about_page'
	);

	// Hidden compatibility submenus for legacy monsterinsights_* slugs
	add_submenu_page( '', 'Reports', 'Reports', 'heretekanalytics_view_dashboard', 'monsterinsights_reports', 'heretekanalytics_reports_page' );
	add_submenu_page( '', 'Authors', 'Authors', 'heretekanalytics_view_dashboard', 'monsterinsights_authors', 'heretekanalytics_authors_page' );
	add_submenu_page( '', 'Settings', 'Settings', 'heretekanalytics_save_settings', 'monsterinsights_settings', 'heretekanalytics_settings_page' );
	add_submenu_page( '', 'Tools', 'Tools', 'manage_options', 'monsterinsights_tools', 'heretekanalytics_tools_page' );
	add_submenu_page( '', 'Addons', 'Addons', 'manage_options', 'monsterinsights_addons', 'heretekanalytics_addons_page' );
	add_submenu_page( '', 'About', 'About', 'manage_options', 'monsterinsights_about', 'heretekanalytics_about_page' );
}

add_action('admin_menu', 'heretekanalytics_admin_menu');

if ( ! function_exists( 'monsterinsights_admin_menu' ) ) {
	function monsterinsights_admin_menu() {
		// Handled by heretekanalytics_admin_menu
	}
}

/**
 * Transparent Legacy Admin URL Redirect Interceptor.
 *
 * Catches any request for ?page=monsterinsights_* and seamlessly redirects
 * to ?page=heretekanalytics_* while preserving all query parameters.
 */
function heretekanalytics_legacy_menu_redirect() {
	if ( ! empty( $_GET['page'] ) && strpos( $_GET['page'], 'monsterinsights_' ) === 0 ) {
		$legacy_page = sanitize_text_field( wp_unslash( $_GET['page'] ) );
		$new_page    = str_replace( 'monsterinsights_', 'heretekanalytics_', $legacy_page );
		$args        = $_GET;
		$args['page'] = $new_page;
		wp_safe_redirect( add_query_arg( $args, admin_url( 'admin.php' ) ) );
		exit;
	}
}
add_action( 'admin_init', 'heretekanalytics_legacy_menu_redirect' );

function monsterinsights_woocommerce_menu_item()
{
	// Heretek Analytics has no WooCommerce cross-promo submenu.
}
add_action('admin_menu', 'monsterinsights_woocommerce_menu_item', 11);

function monsterinsights_get_menu_hook()
{
	return 'heretekanalytics_reports';
}

function monsterinsights_network_admin_menu()
{
	$base = HeretekAnalytics();

	if (!function_exists('is_plugin_active_for_network')) {
		require_once(ABSPATH . '/wp-admin/includes/plugin.php');
	}

	$plugin = plugin_basename(HERETEK_ANALYTICS_PLUGIN_FILE);
	if (!is_plugin_active_for_network($plugin)) {
		return;
	}

	$menu_icon_inline = monsterinsights_get_inline_menu_icon();
	$hook             = 'heretekanalytics_network';
	add_menu_page(__('Network Augur:', 'heretek-analytics'), __('Heretek Analytics', 'heretek-analytics'), 'heretekanalytics_save_settings', $hook, 'heretekanalytics_network_page', $menu_icon_inline, '100.00013467543');
	add_submenu_page($hook, __('Network Augur:', 'heretek-analytics'), __('Network Settings', 'heretek-analytics'), 'heretekanalytics_save_settings', $hook, 'heretekanalytics_network_page');
	add_submenu_page($hook, __('General Reports:', 'heretek-analytics'), __('Reports', 'heretek-analytics'), 'heretekanalytics_view_dashboard', 'heretekanalytics_reports', 'heretekanalytics_reports_page');
	add_submenu_page($hook, __('About Heretek AI:', 'heretek-analytics'), __('About Heretek AI', 'heretek-analytics'), 'manage_options', 'heretekanalytics_about', 'heretekanalytics_about_page');
}

add_action('network_admin_menu', 'monsterinsights_network_admin_menu', 5);

/**
 * Adds one or more classes to the body tag in the dashboard.
 *
 * @param String $classes Current body classes.
 *
 * @return String          Altered body classes.
 */
function monsterinsights_add_admin_body_class($classes)
{
	$screen = function_exists('get_current_screen') ? get_current_screen() : false;
	if (empty($screen) || empty($screen->id)) {
		return $classes;
	}

	if (strpos($screen->id, 'monsterinsights') !== false || strpos($screen->id, 'heretek') !== false) {
		$classes .= ' heretekanalytics_page monsterinsights_page ';
		if (strpos($screen->id, 'reports') !== false || strpos($screen->id, 'authors') !== false) {
			$classes .= ' heretekanalytics-reporting-page monsterinsights-reporting-page ';
		}
	}

	return $classes;
}

add_filter('admin_body_class', 'monsterinsights_add_admin_body_class', 10, 1);

/**
 * Adds one or more classes to the body tag in the dashboard.
 *
 * @param String $classes Current body classes.
 *
 * @return String          Altered body classes.
 */
function monsterinsights_add_admin_body_class_tools_page($classes)
{
	$screen = function_exists('get_current_screen') ? get_current_screen() : false;

	if (empty($screen) || empty($screen->id) || (strpos($screen->id, 'tools') === false)) {
		return $classes;
	}

	return "$classes insights_page_monsterinsights_tools ";
}

add_filter('admin_body_class', 'monsterinsights_add_admin_body_class_tools_page', 10, 1);

/**
 * Adds one or more classes to the body tag in the dashboard.
 *
 * @param String $classes Current body classes.
 *
 * @return String          Altered body classes.
 */
function monsterinsights_add_admin_body_class_addons_page($classes)
{
	$screen = function_exists('get_current_screen') ? get_current_screen() : false;
	if (empty($screen) || empty($screen->id) || (strpos($screen->id, 'addons') === false)) {
		return $classes;
	}

	return "$classes insights_page_monsterinsights_addons ";
}

add_filter('admin_body_class', 'monsterinsights_add_admin_body_class_addons_page', 10, 1);

/**
 * Add a link to the settings page to the plugins list
 *
 * @param array $links array of links for the plugins, adapted when the current plugin is found.
 *
 * @return array $links
 */
function monsterinsights_add_action_links($links)
{
	$docs = '<a title="' . esc_attr__('Heretek Analytics Documentation', 'heretek-analytics') . '" href="https://github.com/Heretek-AI/Heretek-Analytics#readme" target="_blank" rel="noopener">' . esc_html__('Documentation', 'heretek-analytics') . '</a>';
	array_unshift($links, $docs);

	$support = '<a title="' . esc_attr__('Heretek AI Issues & Support', 'heretek-analytics') . '" href="https://github.com/Heretek-AI/Heretek-Analytics/issues" target="_blank" rel="noopener">' . esc_html__('Support', 'heretek-analytics') . '</a>';
	array_unshift($links, $support);

	if (is_network_admin()) {
		$settings_link = '<a href="' . esc_url(network_admin_url('admin.php?page=heretekanalytics_network')) . '">' . esc_html__('Network Settings', 'heretek-analytics') . '</a>';
	} else {
		$settings_link = '<a href="' . esc_url(admin_url('admin.php?page=heretekanalytics_settings')) . '">' . esc_html__('Settings', 'heretek-analytics') . '</a>';
	}

	array_unshift($links, $settings_link);

	return $links;
}

add_filter('plugin_action_links_' . plugin_basename(HERETEK_ANALYTICS_PLUGIN_FILE), 'monsterinsights_add_action_links');
add_filter('network_admin_plugin_action_links_' . plugin_basename(HERETEK_ANALYTICS_PLUGIN_FILE), 'monsterinsights_add_action_links');

/**
 * Loads a partial view for the Administration screen
 *
 * @access public
 *
 * @param string $template PHP file at includes/admin/partials, excluding file extension
 * @param array $data Any data to pass to the view
 *
 * @return  void
 * @since 6.0.0
 *
 */
function monsterinsights_load_admin_partial($template, $data = array())
{

	if (monsterinsights_is_pro_version()) {
		$dir = trailingslashit(plugin_dir_path(MonsterInsights()->file) . 'pro/includes/admin/partials');

		if (file_exists($dir . $template . '.php')) {
			require_once($dir . $template . '.php');

			return true;
		}
	} else {
		$dir = trailingslashit(plugin_dir_path(MonsterInsights()->file) . 'lite/includes/admin/partials');

		if (file_exists($dir . $template . '.php')) {
			require_once($dir . $template . '.php');

			return true;
		}
	}

	$dir = trailingslashit(plugin_dir_path(MonsterInsights()->file) . 'includes/admin/partials');

	if (file_exists($dir . $template . '.php')) {
		require_once($dir . $template . '.php');

		return true;
	}

	return false;
}

/**
 * When user is on a MonsterInsights related admin page, display footer text
 * that graciously asks them to rate us.
 *
 * @param string $text
 *
 * @return string
 * @since 6.0.0
 */
function monsterinsights_admin_footer($text)
{
	global $current_screen;
	if (
		! empty( $current_screen->id )
		&& strpos( $current_screen->id, 'monsterinsights' ) !== false
	) {
		$url = 'https://github.com/Heretek-AI/Heretek-Analytics';
		$text = sprintf(
			__( 'Thank you for creating with WordPress & %1$sHeretek Analytics%2$s · Unlocked & Telemetry-Free.', 'google-analytics-for-wordpress' ),
			'<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener noreferrer" style="color:#dc2626;font-weight:700;">',
			'</a>'
		);
	}

	return $text;
}

add_filter('admin_footer_text', 'monsterinsights_admin_footer', 1, 2);

function monsterinsights_admin_setup_notices()
{
	// Make sure they have the permissions to do something
	if (!current_user_can('monsterinsights_save_settings')) {
		return;
	}

	// Priority:
	// 0. UA sunset
	// 1. Google Analytics not authenticated
	// 2. License key not entered for pro
	// 3. License key not valid/okay for pro
	// 4. WordPress + PHP min versions
	// 5. (old) Optin setting not configured
	// 6. Manual UA code
	// 7. Automatic updates not configured
	// 8. Woo upsell
	// 9. EDD upsell

	//  0. UA sunset supported alert
	$profile = is_network_admin() ? MonsterInsights()->auth->get_network_analytics_profile() : MonsterInsights()->auth->get_analytics_profile();

	if ( !empty($profile['ua']) && empty($profile['v4']) && !monsterinsights_is_own_admin_page() ) {
		$title = __('Urgent: Your Website is Not Tracking Any Google Analytics Data!', 'google-analytics-for-wordpress');
		$message = __('Google Analytics 3 (UA) and support was sunset on July 1, 2023. Your website is currently NOT tracking any analytics. </br>Create or connect a new Google Analytics 4 property immediately to start tracking.', 'google-analytics-for-wordpress');

		$wizard_url     = monsterinsights_get_onboarding_url();

		echo '<div class="notice notice-error is-dismissible monsterinsights-notice" data-notice="monsterinsights_ua_sunset">';
		echo '<p><strong>' . esc_html($title) . '</strong></p>';
		echo '<p>' . wp_kses_post($message) . '</p>';
		echo '<p>';
		echo '<a href="https://support.google.com/analytics/answer/9744165"
				   target="_blank" rel="noopener noreferrer">' .
			__( 'Learn How to Create a GA4 Property', 'google-analytics-for-wordpress' ) . // phpcs:ignore
			'</a><br>';
		echo '<a href="' . esc_url($wizard_url) . '">' .
			__( 'Open Settings', 'google-analytics-for-wordpress' ) . // phpcs:ignore
			'</a><br>';
		echo '</p>';
		echo '</div>';

		return;
	}

	$is_plugins_page = 'plugins' === get_current_screen()->id;

	// 1. Google Analytics not authenticated
	if ( ! is_network_admin() && ! monsterinsights_get_v4_id() && ! defined( 'MONSTERINSIGHTS_DISABLE_TRACKING' ) && ! monsterinsights_is_own_admin_page() ) {

		$submenu_base = is_network_admin() ? add_query_arg( 'page', 'heretekanalytics_network', network_admin_url( 'admin.php' ) ) : add_query_arg( 'page', 'heretekanalytics_settings', admin_url( 'admin.php' ) );
		$title        = esc_html__( 'Please configure Heretek Analytics to begin tracking.', 'heretek-analytics' );
		$primary      = esc_html__( 'Open Settings', 'heretek-analytics' );
		$secondary    = esc_html__( 'Documentation', 'heretek-analytics' );
		$urltwo       = 'https://github.com/Heretek-AI/Heretek-Analytics#readme';
		$message      = esc_html__( 'Heretek Analytics is fully self-hosted. Paste your Google Analytics 4 Measurement ID plus a Google Cloud service account JSON key on the Settings page to begin tracking.', 'heretek-analytics' );
		echo '<div class="notice notice-info"><p style="font-weight:700">' . $title . '</p><p>' . $message . '</p><p><a href="' . esc_url($submenu_base) . '" class="button-primary">' . $primary . '</a>&nbsp;&nbsp;&nbsp;<a href="' . esc_url($urltwo) . '" target="_blank" rel="noopener" class="button-secondary">' . $secondary . '</a></p></div>';

		return;
	}

	// 2. License checks disarmed for open-source Heretek Analytics release

	// 4. Notices for PHP/WP version deprecations
	if (current_user_can('update_core')) {
		global $wp_version;

		$compatible_php_version = apply_filters('monsterinsights_compatible_php_version', false);
		$compatible_wp_version  = apply_filters('monsterinsights_compatible_wp_version', false);

		$url = monsterinsights_get_url('global-notice', 'settings-page', 'https://github.com/Heretek-AI/Heretek-Analytics#readme');

		$message = false;
		if (version_compare(phpversion(), $compatible_php_version['required'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress stopped supporting your PHP version in April, 2019.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'heretek-analytics'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
		} else if (version_compare(phpversion(), $compatible_php_version['warning'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress stopped supporting your PHP version in November, 2019.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'heretek-analytics'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
		} else if (version_compare(phpversion(), $compatible_php_version['recommended'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress is working towards discontinuing support for your PHP version.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'heretek-analytics'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
		}

		if ($message) {
			echo '<div class="error"><p>' . wp_kses($message, [
				'br' => array(),
				'b' => array(),
				'strong' => array(),
				'i' => array(),
				'a' => array(
					'href' => array(),
					'target' => array(),
					'title' => array(),
				),
			]) . '</p></div>';
			return;
		}
	}

	$notices = get_option('monsterinsights_notices');
	if (!is_array($notices)) {
		$notices = array();
	}

	$auth            = HeretekAnalytics()->auth;
	$tracking_code   = monsterinsights_get_v4_id_to_output();
	$has_property    = (bool) $auth->get_property_id();
	$has_sa          = (bool) $auth->get_service_account_json();
	$is_configured   = (bool) $tracking_code && $has_property && $has_sa;
	$is_manual_only  = (bool) $tracking_code && ( ! $has_property || ! $has_sa );

	$migrated = monsterinsights_get_option( 'gadwp_migrated', 0 );
	if ( $migrated > 0 ) {
		monsterinsights_update_option( 'gadwp_migrated', 0 );
	}

	// 6. Measurement ID set, but Property ID / service account missing
	if ( $is_manual_only && ! isset( $notices['monsterinsights_manual_v4'] ) ) {
		$settings_url = is_network_admin()
			? network_admin_url( 'admin.php?page=heretekanalytics_network' )
			: admin_url( 'admin.php?page=heretekanalytics_settings' );

		printf(
			'<div class="notice notice-info is-dismissible monsterinsights-notice" data-notice="monsterinsights_manual_v4"><p>%s</p></div>',
			sprintf(
				/* translators: %s is a link to the Heretek Analytics Settings page. */
				esc_html__( 'A GA4 Measurement ID is configured, but the in-admin Reports dashboard is disabled until you also add a GA4 Property ID and a Google Cloud service account JSON key. Open %s to finish.', 'heretek-analytics' ),
				'<a href="' . esc_url( $settings_url ) . '">' . esc_html__( 'Heretek Analytics → Settings', 'heretek-analytics' ) . '</a>'
			)
		);

		return;
	}

	if (isset($notices['monsterinsights_cross_domains_extracted']) && false === $notices['monsterinsights_cross_domains_extracted']) {
		$settings_url = is_network_admin() ? network_admin_url('admin.php?page=heretekanalytics_network') : admin_url('admin.php?page=heretekanalytics_settings');
		$settings_url = $settings_url . '#/advanced';
		/* translators: adds a link to the settings panel. */
		$message = sprintf(esc_html__('Warning: Heretek Analytics found cross-domain settings in the custom code field and converted them to the new settings structure.  %1$sPlease click here to review and remove the code no longer needed.%2$s', 'heretek-analytics'), '<a href="' . esc_url($settings_url) . '">', '</a>');
		echo '<div class="notice notice-success is-dismissible monsterinsights-notice" data-notice="monsterinsights_cross_domains_extracted"><p>' . $message . '</p></div>'; // phpcs:ignore

		return;
	}
}

add_action('admin_notices', 'monsterinsights_admin_setup_notices');
add_action('network_admin_notices', 'monsterinsights_admin_setup_notices');


// AM Notices
function monsterinsights_am_notice_optout($super_admin)
{
	if (monsterinsights_get_option('hide_am_notices', false) || monsterinsights_get_option('network_hide_am_notices', false)) {
		return false;
	}

	return $super_admin;
}

add_filter("am_notifications_display", 'monsterinsights_am_notice_optout', 10, 1);

/**
 * Inline critical css for the menu to prevent breaking the layout when our scripts get blocked by browsers.
 */
function monsterinsights_admin_menu_inline_styles()
{
?>
	<style>
		#toplevel_page_heretekanalytics_reports .wp-menu-image img,
		#toplevel_page_monsterinsights_reports .wp-menu-image img,
		#toplevel_page_heretekanalytics_settings .wp-menu-image img,
		#toplevel_page_monsterinsights_settings .wp-menu-image img,
		#toplevel_page_heretekanalytics_network .wp-menu-image img,
		#toplevel_page_monsterinsights_network .wp-menu-image img {
			width: 18px;
			height: auto;
			padding-top: 7px;
		}

		#toplevel_page_heretekanalytics_reports .wp-submenu li a,
		#toplevel_page_monsterinsights_reports .wp-submenu li a {
			display: flex;
			align-items: center;
		}

		#toplevel_page_heretekanalytics_reports .wp-submenu .monsterinsights-sidebar-icon,
		#toplevel_page_monsterinsights_reports .wp-submenu .monsterinsights-sidebar-icon {
			padding-right: 6px;
		}
	</style>
<?php
}

add_action('admin_head', 'monsterinsights_admin_menu_inline_styles', 300);

/**
 * Display notice in admin when measurement protocol is left blank
 */
function monsterinsights_empty_measurement_protocol_token()
{
	if (!class_exists('MonsterInsights_eCommerce') && !class_exists('MonsterInsights_Forms')) {
		return;
	}

	$page = is_network_admin()
		? network_admin_url('admin.php?page=heretekanalytics_network')
		: admin_url('admin.php?page=heretekanalytics_settings');

	$api_secret = is_network_admin()
		? HeretekAnalytics()->auth->get_network_measurement_protocol_secret()
		: HeretekAnalytics()->auth->get_measurement_protocol_secret();

	$current_code = monsterinsights_get_v4_id_to_output();

	if (empty($current_code) || !empty($api_secret)) {
		return;
	}

	$message = sprintf(
		/* translators: Placeholders add a link to an article. */
		esc_html__(
			'Your Measurement Protocol API Secret is currently left blank. To see more advanced analytics please enter a Measurement API Secret. %1$sLearn how to find your API Secret%2$s.',
			'google-analytics-for-wordpress'
		),
		'<a target="_blank" href="' . monsterinsights_get_url('notice', 'empty-measurement-protocol-secret', 'https://www.monsterinsights.com/docs/how-to-create-your-measurement-protocol-api-secret-in-ga4/') . '">',
		'</a>'
	);
	echo '<div class="error"><p>' . $message . '</p></div>'; // phpcs:ignore
}

add_action( 'admin_notices', 'monsterinsights_empty_measurement_protocol_token' );
add_action( 'network_admin_notices', 'monsterinsights_admin_setup_notices' );

/**
 * Whether an addon admin notice was dismissed within the last 30 days.
 *
 * The dismissal timestamp is stored in an option rather than a transient: on
 * hosts with a persistent object cache, transients can be evicted at any time,
 * which made dismissed notices reappear within minutes. The legacy transient is
 * still checked as a fallback so dismissals saved by the previous implementation
 * stay honored until they expire.
 *
 * @since 10.2.3
 *
 * @param string $key Base key shared by the option and the legacy transient.
 * @return bool True if dismissed less than 30 days ago, false otherwise.
 */
function monsterinsights_is_addon_notice_dismissed( $key ) {
	$key          = sanitize_key( $key );
	$dismissed_at = (int) get_option( $key, 0 );

	if ( $dismissed_at && ( time() - $dismissed_at ) < 30 * DAY_IN_SECONDS ) {
		return true;
	}

	// Legacy transient fallback for dismissals saved by the previous implementation.
	return (bool) get_transient( $key );
}

/**
 * Display notice in admin when MonsterInsights Ads addon is installed.
 */

/**
 * AJAX handler to persist dismissal of the Ads addon installed notice for 30 days.
 */

/**
 * Display notice in admin when the legacy MonsterInsights AI Insights addon is still active.
 * AI Charlie replaces AI Insights, so users should deactivate the old addon.
 */

/**
 * AJAX handler to persist dismissal of the AI Insights addon notice for 30 days.
 */

/**
 * Check if the plugin is MI Lite.
 *
 * @return bool
 */

/**
 * Add custom text and links to footer.
 */
function monsterinsights_in_admin_footer() {
	$screen = get_current_screen();
	// Check the current screen is MonsterInsights.
	if (empty($screen) || empty($screen->id) || strpos($screen->id, 'monsterinsights') === false) {
		return;
	}

	$links = [
		[
			'text'   => __( 'GitHub Issues', 'google-analytics-for-wordpress' ),
			'link'   => 'https://github.com/Heretek-AI/Heretek-Analytics/issues',
			'target' => '_blank',
		],
		[
			'text'   => __( 'Documentation', 'google-analytics-for-wordpress' ),
			'link'   => 'https://github.com/Heretek-AI/Heretek-Analytics#readme',
			'target' => '_blank',
		],
		[
			'text'   => __( 'Releases', 'google-analytics-for-wordpress' ),
			'link'   => 'https://github.com/Heretek-AI/Heretek-Analytics/releases',
			'target' => '_blank',
		],
	];

	echo '<div class="monsterinsights-footer-love">';
	echo sprintf(esc_html__('Forged for the Omnissiah by %1$s', 'google-analytics-for-wordpress'), '<a href="https://github.com/Heretek-AI" target="_blank" rel="noopener noreferrer" style="color:#dc2626;font-weight:700;">Heretek AI</a>');
	$links_output = [];
	foreach($links as $link){
		$links_output[] = '<a target="'.esc_attr($link['target']).'" href="'.esc_url($link['link']).'">' . esc_html($link['text']) . '</a>';
	}
	echo '<div>'. implode('<span class="flsep"> / </span>', $links_output) .'</div>'; // phpcs:ignore
	echo '</div>';
}

add_action( 'in_admin_footer', 'monsterinsights_in_admin_footer' );

/**
 * Display notice in admin to install WPConsent.
 */
/**
 * Add EEA Compliance file.
 */
require_once __DIR__ . '/eea-compliance.php';

// Heretek Analytics: report-filter CRUD, last-admin-seen, and report-view
// recorder classes were removed along with their SaaS/Customer360 telemetry.
