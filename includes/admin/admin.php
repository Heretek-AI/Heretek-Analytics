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
function monsterinsights_admin_menu()
{
	$hook             = monsterinsights_get_menu_hook();
	$menu_icon_inline = monsterinsights_get_inline_menu_icon();
	$new_indicator     = sprintf(
		'<span class="monsterinsights-menu-new-indicator">&nbsp;%s</span>',
		__( 'NEW', 'google-analytics-for-wordpress' )
	);

	$menu_notification_indicator = MonsterInsights()->notifications->get_menu_count();

	if ( MonsterInsights()->license->license_expired() ) {
		$menu_notification_indicator = MonsterInsights()->notifications->get_license_expired_indicator();
	}

	$parent_slug          = 'monsterinsights_reports';
	$hide_reports_submenu = false;
	$is_lite              = ! monsterinsights_is_pro_version();

	// If user not dismissed setup checklist.
	if ( ! MonsterInsights()->setup_checklist->is_dismissed() ) {
		$hide_reports_submenu = true;
	}

	// If user disabled report view, and it is a lite user.
	if ( $hook === 'monsterinsights_settings' ) {
		$hide_reports_submenu = true;
	}

	add_menu_page(__('Heretek Analytics', 'google-analytics-for-wordpress'), __('Heretek Analytics', 'google-analytics-for-wordpress') . $menu_notification_indicator, 'monsterinsights_view_dashboard', $parent_slug, 'monsterinsights_reports_page', $menu_icon_inline, '100.00013467543');

	if ( ! MonsterInsights()->setup_checklist->is_dismissed() ) {
		add_submenu_page( $hook, __( 'Setup Checklist', 'google-analytics-for-wordpress' ), __( 'Setup Checklist', 'google-analytics-for-wordpress' ) . MonsterInsights()->setup_checklist->get_menu_count(), 'monsterinsights_save_settings', 'monsterinsights_settings#/setup-checklist', 'monsterinsights_settings_page' );
	}

	if ( $hook === 'monsterinsights_reports' ) {
		// Add Overview report page (Vue 3 app) - this is the visible Reports menu item
		add_submenu_page(
			$parent_slug,
			__( 'Augur Reports:', 'google-analytics-for-wordpress' ),
			__( 'Reports', 'google-analytics-for-wordpress' ),
			'monsterinsights_view_dashboard',
			'monsterinsights_overview_report',
			'monsterinsights_overview_report_page'
		);

		// Register reports page with empty parent to keep it accessible but hidden from menu
		add_submenu_page( '', __( 'General Reports:', 'google-analytics-for-wordpress' ), __( 'Reports', 'google-analytics-for-wordpress' ), 'monsterinsights_view_dashboard', 'monsterinsights_reports', 'monsterinsights_reports_page' );
	}

	/**
	 * Output the Custom Dashboard app mount node.
	 *
	 * @return void
	 */
	function monsterinsights_custom_dashboard_page() {
		do_action( 'monsterinsights_head' );
		// Hide WordPress admin notices on this page - Vue app handles its own notifications
		echo '<style>.monsterinsights_page_monsterinsights_custom_dashboard .notice:not(.monsterinsights-notice),.monsterinsights_page_monsterinsights_custom_dashboard .error:not(.monsterinsights-notice),.monsterinsights_page_monsterinsights_custom_dashboard .updated:not(.monsterinsights-notice){display:none !important;}</style>';
		echo '<div id="monsterinsights-custom-dashboard-app" class="mi-custom-dashboard-app">';
		monsterinsights_app_loading_placeholder();
		echo '</div>';
	}

	// then settings page
	add_submenu_page( $parent_slug, __( 'Heretek Analytics Settings', 'google-analytics-for-wordpress' ), __( 'Settings', 'google-analytics-for-wordpress' ), 'monsterinsights_save_settings', 'monsterinsights_settings', 'monsterinsights_settings_page' );

	// Add dashboard submenu.
	add_submenu_page( 'index.php', __( 'General Reports:', 'google-analytics-for-wordpress' ), __( 'Heretek Analytics', 'google-analytics-for-wordpress' ), 'monsterinsights_view_dashboard', 'admin.php?page=monsterinsights_reports' );

	// Remove own auto-generated `Insights` submenu when Reports submenu is explicitly registered.
	// Because the first submenu slug is not `monsterinsights_reports`, WordPress adds this item automatically.
	if ( $hook === 'monsterinsights_reports' ) {
		remove_submenu_page( 'monsterinsights_reports', 'monsterinsights_reports' );
	}

	// If the setup checklist is not dismissed, remove the own submenu of `Insights` main menu.
	// This way the Checklist will be the first submenu which is an important thing for onboarding.
	if ( $hide_reports_submenu && $hook !== 'monsterinsights_reports' ) {

		// Check if the user has the capability to save settings and view dashboard.
		// We should skip this for editors that have only view capability have only item in the submenu, removing that would break the menu.
		if ( ! ( ! current_user_can( 'monsterinsights_save_settings' ) && current_user_can( 'monsterinsights_view_dashboard' ) ) ) {
			// Remove own submenu of `Insights` main menu.
			remove_submenu_page( 'monsterinsights_reports', 'monsterinsights_reports' );
		}
	}

	$submenu_base = add_query_arg('page', 'monsterinsights_settings', admin_url('admin.php'));

	//  Site Notes
	add_submenu_page( $parent_slug, __( 'Site Notes:', 'google-analytics-for-wordpress' ), __( 'Site Notes', 'google-analytics-for-wordpress' ), 'monsterinsights_save_settings', $submenu_base . '#/site-notes' );

	// Add Popular Posts menu item.
	add_submenu_page( $parent_slug, __( 'Popular Posts:', 'google-analytics-for-wordpress' ), __( 'Popular Posts', 'google-analytics-for-wordpress' ), 'monsterinsights_save_settings', $submenu_base . '#/popular-posts' );

	// then tools
	add_submenu_page($parent_slug, __('Tools:', 'google-analytics-for-wordpress'), __('Tools', 'google-analytics-for-wordpress'), 'manage_options', $submenu_base . '#/tools');

	// then addons / subsystems
	$network_key = monsterinsights_is_pro_version() ? MonsterInsights()->license->get_network_license_key() : '';
	if (!monsterinsights_is_network_active() || (monsterinsights_is_network_active() && empty($network_key))) {
		add_submenu_page($parent_slug, __('Modules & Subsystems:', 'google-analytics-for-wordpress'), '<span style="color:' . monsterinsights_menu_highlight_color() . '"> ' . __('Modules', 'google-analytics-for-wordpress') . '</span>', 'monsterinsights_save_settings', $submenu_base . '#/addons');
	}

	// then About Us page.
	add_submenu_page($parent_slug, __('About Heretek AI:', 'google-analytics-for-wordpress'), __('About Heretek AI', 'google-analytics-for-wordpress'), 'manage_options', $submenu_base . '#/about');
}

add_action('admin_menu', 'monsterinsights_admin_menu');

/**
 * Returns the current rotating promotional submenu item (cycles every 14 days).
 *
 * Sequence: 0=UserFeedback, 1=Privacy Compliance, 2=AIOSEO, 3=RewardsWP
 *
 * @param string $submenu_base Base settings URL.
 * @param string $new_indicator HTML string for the "NEW" badge.
 * @return array Keys: menu_title, page_title, menu_slug.
 */
function monsterinsights_get_rotating_promo_submenu( $submenu_base, $new_indicator ) {
	$start = get_option( 'monsterinsights_promo_rotation_start' );
	if ( ! $start || $start > time() ) {
		$start = time();
		update_option( 'monsterinsights_promo_rotation_start', $start, false );
	}

	$index = (int) floor( ( time() - $start ) / ( 14 * DAY_IN_SECONDS ) ) % 4;


	$seo_url = $submenu_base . '#/seo';

	if ( function_exists( 'aioseo' ) ) {
		$seo_url = monsterinsights_aioseo_dashboard_url();
	}

	$items = [
		[
			'label'     => __( 'UserFeedback', 'google-analytics-for-wordpress' ) . $new_indicator,
			'menu_slug' => $submenu_base . '#/userfeedback',
		],
		[
			'label'     => __( 'Privacy Compliance', 'google-analytics-for-wordpress' ),
			'menu_slug' => $submenu_base . '#/wpconsent',
		],
		[
			'label'     => __( 'SEO', 'google-analytics-for-wordpress' ),
			'menu_slug' => $seo_url,
		],
		[
			'label'     => __( 'RewardsWP', 'google-analytics-for-wordpress' ),
			'menu_slug' => $submenu_base . '#/rewardswp',
		],
	];

	$item = $items[ $index ];

	return [
		'menu_title' => $item['label'],
		'page_title' => wp_strip_all_tags( $item['label'] ) . ':',
		'menu_slug'  => $item['menu_slug'],
	];
}

/**
 * Reset the promo rotation timer on plugin deactivation.
 */
function monsterinsights_promo_rotation_reset() {
	delete_option( 'monsterinsights_promo_rotation_start' );
}
add_action( 'monsterinsights_plugin_deactivated', 'monsterinsights_promo_rotation_reset' );

function monsterinsights_automated_menu($hook){
	$display = false;

	$now = apply_filters('monsterinsights_automated_promotion_date', wp_date('M d, Y h:i:s a'));
	$conditions = [
		[
			'title' => __('Earth Day', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('Apr 17, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('Apr 18, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'earth-day',
		],
		[
			'title' => __('Cinco De Mayo!', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('May 01, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('May 08, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'cinco-de-mayo',
		],
		[
			'title' => __('Upgrade to GA4', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('Jun 01, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('July 01, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'goodbye-ga3',
		],
		[
			'title' => __('Summer Sale', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('Jul 29, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('Aug 05, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'dogdays',
		],
		[
			'title' => __('Fortune Cookie Day', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('Sep 12, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('Sep 13, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'fortune-cookie',
		],
		[
			'title' => __('Halloween Sale', 'google-analytics-for-wordpress'),
			'start_time' => wp_date('M d, Y h:i:s a', strtotime('Oct 26, 2023')),
			'end_time' => wp_date('M d, Y h:i:s a', strtotime('Nov 04, 2023')),
			'utm_campaign' => 'lite-promo',
			'utm_source' => 'liteplugin',
			'utm_medium' => 'halloween',
		],
	];

	foreach($conditions as $key => $condition){
		if(strtotime($now) >= strtotime($condition['start_time']) && strtotime($now) <= strtotime($condition['end_time'])){
			add_submenu_page($hook, $condition['title'], '<span class="monsterinsights-automated-submenu"> ' . $condition['title'] . '</span>', 'monsterinsights_save_settings', monsterinsights_get_upgrade_link($condition['utm_medium'], $condition['utm_campaign'], "https://www.monsterinsights.com/lite-promo/"));
			break;
		}
	}
}

/**
 * Add this separately so all the Woo menu items are loaded and the position parameter works correctly.
 */
function monsterinsights_woocommerce_menu_item()
{
	if (class_exists('WooCommerce')) {
		// Add "Heretek Analytics" sub menu item for WooCommerce Analytics menu
		if (class_exists('MonsterInsights_eCommerce')) {
			add_submenu_page('wc-admin&path=/analytics/overview', __('Heretek Analytics', 'google-analytics-for-wordpress'), __('Heretek Analytics', 'google-analytics-for-wordpress'), 'monsterinsights_view_dashboard', admin_url('admin.php?page=monsterinsights_reports#/ecommerce'), '', 2);
		} else {
			$submenu_base = add_query_arg('page', 'monsterinsights_settings', admin_url('admin.php'));
			add_submenu_page('wc-admin&path=/analytics/overview', __('Heretek Analytics', 'google-analytics-for-wordpress'), __('Heretek Analytics', 'google-analytics-for-wordpress'), 'manage_options', $submenu_base . '#/woocommerce-insights', '', 1);
		}
	}
}
add_action('admin_menu', 'monsterinsights_woocommerce_menu_item', 11);

function monsterinsights_get_menu_hook()
{
	$dashboards_disabled = monsterinsights_get_option('dashboards_disabled', false);
	if ($dashboards_disabled || (current_user_can('monsterinsights_save_settings') && !current_user_can('monsterinsights_view_dashboard'))) {
		return 'monsterinsights_settings';
	} else {
		return 'monsterinsights_reports';
	}
}

function monsterinsights_network_admin_menu()
{
	// Get the base class object.
	$base = MonsterInsights();

	// First, let's see if this is an MS network enabled plugin. If it is, we should load the license
	// menu page and the updater on the network panel
	if (!function_exists('is_plugin_active_for_network')) {
		require_once(ABSPATH . '/wp-admin/includes/plugin.php');
	}

	$plugin = plugin_basename(MONSTERINSIGHTS_PLUGIN_FILE);
	if (!is_plugin_active_for_network($plugin)) {
		return;
	}

	$menu_notification_indicator = MonsterInsights()->notifications->get_menu_count();

	if ( MonsterInsights()->license->license_expired() ) {
		$menu_notification_indicator = MonsterInsights()->notifications->get_license_expired_indicator();
	}

	$menu_icon_inline = monsterinsights_get_inline_menu_icon();
	$hook             = 'monsterinsights_network';
	$submenu_base     = add_query_arg('page', 'monsterinsights_network', network_admin_url('admin.php'));
	add_menu_page(__('Network Augur:', 'google-analytics-for-wordpress'), __('Heretek Analytics', 'google-analytics-for-wordpress') . $menu_notification_indicator, 'monsterinsights_save_settings', 'monsterinsights_network', 'monsterinsights_network_page', $menu_icon_inline, '100.00013467543');

	add_submenu_page($hook, __('Network Augur:', 'google-analytics-for-wordpress'), __('Network Settings', 'google-analytics-for-wordpress'), 'monsterinsights_save_settings', 'monsterinsights_network', 'monsterinsights_network_page');

	add_submenu_page($hook, __('General Reports:', 'google-analytics-for-wordpress'), __('Reports', 'google-analytics-for-wordpress'), 'monsterinsights_view_dashboard', 'monsterinsights_reports', 'monsterinsights_reports_page');

	if (function_exists('aioseo')) {
		$seo_url = monsterinsights_aioseo_dashboard_url();
	} else {
		$seo_url = $submenu_base . '#/seo';
	}
	// then seo
	add_submenu_page($hook, __('SEO:', 'google-analytics-for-wordpress'), __('SEO', 'google-analytics-for-wordpress'), 'manage_options', $seo_url, 'monsterinsights_seo_page');

	// then modules
	add_submenu_page($hook, __('Modules & Subsystems:', 'google-analytics-for-wordpress'), '<span style="color:' . monsterinsights_menu_highlight_color() . '"> ' . __('Modules', 'google-analytics-for-wordpress') . '</span>', 'monsterinsights_save_settings', $submenu_base . '#/addons');

	$submenu_base = add_query_arg('page', 'monsterinsights_network', network_admin_url('admin.php'));

	// Add About us page.
	add_submenu_page($hook, __('About Heretek AI:', 'google-analytics-for-wordpress'), __('About Heretek AI', 'google-analytics-for-wordpress'), 'manage_options', $submenu_base . '#/about');
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
	if (empty($screen) || empty($screen->id) || strpos($screen->id, 'monsterinsights') === false) {
		return $classes;
	}

	return "$classes monsterinsights_page ";
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

	if (empty($screen) || empty($screen->id) || strpos($screen->id, 'monsterinsights_tools') === false || 'insights_page_monsterinsights_tools' === $screen->id) {
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
	if (empty($screen) || empty($screen->id) || strpos($screen->id, 'monsterinsights_addons') === false || 'insights_page_monsterinsights_addons' === $screen->id) {
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
	$docs = '<a title="' . esc_attr__('Heretek Analytics Documentation', 'google-analytics-for-wordpress') . '" href="https://github.com/Heretek-AI/Heretek-Analytics#readme" target="_blank" rel="noopener">' . esc_html__('Documentation', 'google-analytics-for-wordpress') . '</a>';
	array_unshift($links, $docs);

	$support = '<a title="' . esc_attr__('Heretek AI Issues & Support', 'google-analytics-for-wordpress') . '" href="https://github.com/Heretek-AI/Heretek-Analytics/issues" target="_blank" rel="noopener">' . esc_html__('Support', 'google-analytics-for-wordpress') . '</a>';
	array_unshift($links, $support);

	if (is_network_admin()) {
		$settings_link = '<a href="' . esc_url(network_admin_url('admin.php?page=monsterinsights_network')) . '">' . esc_html__('Network Settings', 'google-analytics-for-wordpress') . '</a>';
	} else {
		$settings_link = '<a href="' . esc_url(admin_url('admin.php?page=monsterinsights_settings')) . '">' . esc_html__('Settings', 'google-analytics-for-wordpress') . '</a>';
	}

	array_unshift($links, $settings_link);

	return $links;
}

add_filter('plugin_action_links_' . plugin_basename(MONSTERINSIGHTS_PLUGIN_FILE), 'monsterinsights_add_action_links');
add_filter('network_admin_plugin_action_links_' . plugin_basename(MONSTERINSIGHTS_PLUGIN_FILE), 'monsterinsights_add_action_links');

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
		echo '<a href="https://www.monsterinsights.com/docs/connect-google-analytics/"
				   target="_blank" rel="noopener noreferrer">' .
			__( 'Learn How to Create a GA4 Property', 'google-analytics-for-wordpress' ) . // phpcs:ignore
			'</a><br>';
		echo '<a href="' . esc_url($wizard_url) . '">' .
			__( 'Connect a Property', 'google-analytics-for-wordpress' ) . // phpcs:ignore
			'</a><br>';
		echo '</p>';
		echo '</div>';

		return;
	}

	$is_plugins_page = 'plugins' === get_current_screen()->id;

	// 1. Google Analytics not authenticated
	if ( ! is_network_admin() && ! monsterinsights_get_v4_id() && ! defined( 'MONSTERINSIGHTS_DISABLE_TRACKING' ) && ! monsterinsights_is_own_admin_page() ) {

		$submenu_base = is_network_admin() ? add_query_arg( 'page', 'monsterinsights_network', network_admin_url( 'admin.php' ) ) : add_query_arg( 'page', 'monsterinsights_settings', admin_url( 'admin.php' ) );
		$title        = esc_html__( 'Please Setup Website Analytics to See Audience Insights', 'google-analytics-for-wordpress' );
		$primary      = esc_html__( 'Connect Heretek Analytics', 'google-analytics-for-wordpress' );
		$secondary    = esc_html__( 'Documentation', 'google-analytics-for-wordpress' );
		$urltwo       = 'https://github.com/Heretek-AI/Heretek-Analytics#readme';
		$message      = esc_html__( 'Heretek Analytics connects your WordPress site directly to Google Analytics 4 for comprehensive audience telemetry, eCommerce metrics, and conversion tracking.', 'google-analytics-for-wordpress' );
		echo '<div class="notice notice-info"><p style="font-weight:700">' . $title . '</p><p>' . $message . '</p><p><a href="' . esc_url($submenu_base) . '" class="button-primary">' . $primary . '</a>&nbsp;&nbsp;&nbsp;<a href="' . esc_url($urltwo) . '" target="_blank" rel="noopener" class="button-secondary">' . $secondary . '</a></p></div>';

		return;
	}

	// 2. License checks disarmed for open-source Heretek Analytics release

	// 4. Notices for PHP/WP version deprecations
	if (current_user_can('update_core')) {
		global $wp_version;

		$compatible_php_version = apply_filters('monsterinsights_compatible_php_version', false);
		$compatible_wp_version  = apply_filters('monsterinsights_compatible_wp_version', false);

		$url = monsterinsights_get_url('global-notice', 'settings-page', 'https://www.monsterinsights.com/docs/update-php/');

		$message = false;
		if (version_compare(phpversion(), $compatible_php_version['required'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress stopped supporting your PHP version in April, 2019.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'google-analytics-for-wordpress'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
		} else if (version_compare(phpversion(), $compatible_php_version['warning'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress stopped supporting your PHP version in November, 2019.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'google-analytics-for-wordpress'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
		} else if (version_compare(phpversion(), $compatible_php_version['recommended'], '<')) {
			/* translators: placeholders add the PHP version, a link to the MonsterInsights blog and a line break. */
			$message = sprintf(esc_html__('Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress is working towards discontinuing support for your PHP version.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'google-analytics-for-wordpress'), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>');
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

		// WordPress 4.9
		/* else if ( version_compare( $wp_version, '5.0', '<' ) ) {
			$url = monsterinsights_get_url( 'global-notice', 'settings-page', 'https://www.monsterinsights.com/docs/update-wordpress/' );
			// translators: placeholders add a link to the wordpress.org repository.
			$message = sprintf( esc_html__( 'Your site is running an outdated version of WordPress (%1$s).%4$sHeretek Analytics will stop supporting WordPress versions lower than 5.0 in 2021.%4$sUpdating WordPress takes just a few minutes and will also solve many bugs that exist in your WordPress install.%4$s%2$sLearn more about updating WordPress%3$s', 'google-analytics-for-wordpress' ), $wp_version, '<a href="' . $url . '" target="_blank">', '</a>', '<br>' );
			echo '<div class="error"><p>'. $message.'</p></div>';
			return;
		} */
		// PHP 5.4/5.5
		// else if ( version_compare( phpversion(), '5.6', '<' ) ) {
		//  $url = monsterinsights_get_url( 'global-notice', 'settings-page', 'https://www.monsterinsights.com/docs/update-php/' );
		//  $message = sprintf( esc_html__( 'Your site is running an outdated, insecure version of PHP (%1$s), which could be putting your site at risk for being hacked.%4$sWordPress will stop supporting your PHP version in April, 2019.%4$sUpdating PHP only takes a few minutes and will make your website significantly faster and more secure.%4$s%2$sLearn more about updating PHP%3$s', 'google-analytics-for-wordpress' ), phpversion(), '<a href="' . $url . '" target="_blank">', '</a>', '<br>' );
		//  echo '<div class="error"><p>'. $message.'</p></div>';
		//  return;
		// }
		// // WordPress 4.6 - 4.8
		// else if ( version_compare( $wp_version, '4.9', '<' ) ) {
		//  $url = monsterinsights_get_url( 'global-notice', 'settings-page', 'https://www.monsterinsights.com/docs/update-wordpress/' );
		//  $message = sprintf( esc_html__( 'Your site is running an outdated version of WordPress (%1$s).%4$sHeretek Analytics will stop supporting WordPress versions lower than 4.9 in October, 2019.%4$sUpdating WordPress takes just a few minutes and will also solve many bugs that exist in your WordPress install.%4$s%2$sLearn more about updating WordPress%3$s', 'google-analytics-for-wordpress' ), $wp_version, '<a href="' . $url . '" target="_blank">', '</a>', '<br>' );
		//  echo '<div class="error"><p>'. $message.'</p></div>';
		//  return;
		// }

	}

	$notices = get_option('monsterinsights_notices');
	if (!is_array($notices)) {
		$notices = array();
	}

	// 6. Authenticate, not manual
	$authed  = MonsterInsights()->auth->is_authed() || MonsterInsights()->auth->is_network_authed();
	$url     = is_network_admin() ? network_admin_url('admin.php?page=monsterinsights_network') : admin_url('admin.php?page=monsterinsights_settings');
	$tracking_code = monsterinsights_get_v4_id_to_output();
	/* translators: placeholders add links to the settings panel. */
	$manual_text = sprintf(esc_html__('Important: You are currently using manual GA4 Measurement ID output. We recommend %1$sconnecting your account%2$s so that you can access the full reporting area and take advantage of all Heretek Analytics features.', 'google-analytics-for-wordpress'), '<a href="' . $url . '">', '</a>');
	$migrated    = monsterinsights_get_option('gadwp_migrated', 0);
	if ($migrated > 0) {
		$url = monsterinsights_get_onboarding_url();
		/* translators: placeholders add links to the settings panel. */
		$text        = esc_html__('Click %1$shere%2$s to reauthenticate to be able to access reports. For more information why this is required, see our %3$sblog post%4$s.', 'google-analytics-for-wordpress');
		$manual_text = sprintf($text, '<a href="' . esc_url($url) . '">', '</a>', '<a href="' . monsterinsights_get_url('notice', 'manual-ua', 'https://www.exactmetrics.com/why-did-we-implement-the-new-google-analytics-authentication-flow-challenges-explained/') . '" target="_blank">', '</a>');
	}

	if (empty($authed) && !isset($notices['monsterinsights_auth_not_manual']) && !empty($tracking_code)) {
		echo '<div class="notice notice-info is-dismissible monsterinsights-notice" data-notice="monsterinsights_auth_not_manual">';
		echo '<p>';
		echo $manual_text; // phpcs:ignore
		echo '</p>';
		echo '</div>';

		return;
	}

	// 7. Automatic updates not configured
	// if ( ! is_network_admin() ) {
	//     $updates   = monsterinsights_get_option( 'automatic_updates', false );
	//     $url       = admin_url( 'admin.php?page=monsterinsights_settings' );

	//     if ( empty( $updates) && ! isset( $notices['monsterinsights_automatic_updates' ] ) ) {
	//         echo '<div class="notice notice-info is-dismissible monsterinsights-notice" data-notice="monsterinsights_automatic_updates">';
	//             echo '<p>';
	//             echo sprintf( esc_html__( 'Important: Please %1$sconfigure the Automatic Updates Settings%2$s in Heretek Analytics.', 'google-analytics-for-wordpress' ), '<a href="' . $url .'">', '</a>' );
	//             echo '</p>';
	//         echo '</div>';
	//         return;
	//     }
	// }

	// 8. WooCommerce / EDD Upsells purged for Heretek Analytics.


	if (isset($notices['monsterinsights_cross_domains_extracted']) && false === $notices['monsterinsights_cross_domains_extracted']) {
		$settings_url = is_network_admin() ? network_admin_url('admin.php?page=monsterinsights_network') : admin_url('admin.php?page=monsterinsights_settings');
		$settings_url = $settings_url . '#/advanced';
		/* translators: adds a link to the settings panel. */
		$message = sprintf(esc_html__('Warning: Heretek Analytics found cross-domain settings in the custom code field and converted them to the new settings structure.  %1$sPlease click here to review and remove the code no longer needed.%2$s', 'google-analytics-for-wordpress'), '<a href="' . esc_url($settings_url) . '">', '</a>');
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
		#toplevel_page_monsterinsights_reports .wp-menu-image img,
		#toplevel_page_monsterinsights_settings .wp-menu-image img,
		#toplevel_page_monsterinsights_network .wp-menu-image img {
			width: 18px;
			height: auto;
			padding-top: 7px;
		}

		#toplevel_page_monsterinsights_reports .wp-submenu li a {
			display: flex;
			align-items: center;
		}

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
		? network_admin_url('admin.php?page=monsterinsights_network')
		: admin_url('admin.php?page=monsterinsights_settings');

	$api_secret = is_network_admin()
		? MonsterInsights()->auth->get_network_measurement_protocol_secret()
		: MonsterInsights()->auth->get_measurement_protocol_secret();

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
function monsterinsights_ads_addon_installed_notice() {
	if ( ! class_exists( 'MonsterInsights_Ads' ) ) {
		return;
	}

	// Only admins can act on the addon recommendation, and the dismiss
	// handler requires the same capability.
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// Hide notice if dismissed in the last 30 days.
	if ( monsterinsights_is_addon_notice_dismissed( 'monsterinsights_ads_addon_installed_notice_dismissed' ) ) {
		return;
	}

	if ( monsterinsights_is_pro_version() && MonsterInsights()->license->get_license_type() === 'pro' ) {
		$addons_url = admin_url() . '/admin.php?page=monsterinsights_settings#/addons?ads_addon_ppc_alert=1';
		$button_text = esc_html__( 'Install Now', 'google-analytics-for-wordpress' );
		$button_target = '_self';
	} else {
		$addons_url = monsterinsights_get_upgrade_link('admin-notices', 'ads-addon-activated', 'https://www.monsterinsights.com/lite/');
		$button_text = esc_html__( 'Upgrade Now', 'google-analytics-for-wordpress' );
		$button_target = '_blank';
	}

	$message = sprintf(
		/* translators: Placeholders link to addons page. */
		esc_html__(
			'We\'ve detected you have our %1$sHeretek Analytics Ads%2$s addon activated. Please activate our %3$sPPC Tracking%4$s addon for more advanced features and powerful integrations.',
			'google-analytics-for-wordpress'
		),
		'<strong>',
		'</strong>',
		'<a href="' . esc_url( $addons_url ) . '" target="' . esc_attr( $button_target ) . '">',
		'</a>'
	);

	// Output notice with an ID so the common admin JS can catch the dismiss and persist it.
	echo '<div id="monsterinsights-ads-addon-notice" class="notice notice-info is-dismissible"><p>' . $message . '</p><p><a href="' . esc_url( $addons_url ) . '" class="button button-primary" target="' . esc_attr( $button_target ) . '">' . $button_text . '</a></p></div>'; // phpcs:ignore
}

add_action( 'admin_notices', 'monsterinsights_ads_addon_installed_notice' );

/**
 * AJAX handler to persist dismissal of the Ads addon installed notice for 30 days.
 */
function monsterinsights_dismiss_ads_addon_notice_ajax() {
	check_ajax_referer( 'monsterinsights-dismiss-notice', 'nonce' );
	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Insufficient permissions', 'google-analytics-for-wordpress' ) ) );
		return;
	}

	// Store the dismissal timestamp in an option (not a transient): transients
	// live in the object cache on sites with persistent caching and can be
	// evicted early, which made the notice reappear after a successful dismissal.
	// Not autoloaded: only read in admin.
	update_option( 'monsterinsights_ads_addon_installed_notice_dismissed', time(), false );
	wp_send_json_success();
}
add_action( 'wp_ajax_monsterinsights_dismiss_ads_addon_notice', 'monsterinsights_dismiss_ads_addon_notice_ajax' );

/**
 * Display notice in admin when the legacy MonsterInsights AI Insights addon is still active.
 * AI Charlie replaces AI Insights, so users should deactivate the old addon.
 */
function monsterinsights_ai_insights_addon_installed_notice() {
	if ( ! class_exists( 'MonsterInsights_AI_Insights_Addon' ) ) {
		return;
	}

	// Hide notice if dismissed in the last 30 days.
	if ( get_transient( 'monsterinsights_ai_insights_addon_notice_dismissed' ) ) {
		return;
	}

	$plugins_url = admin_url( 'plugins.php' );

	$message = sprintf(
		/* translators: %1$s and %2$s are bold tags, %3$s and %4$s are bold tags. */
		esc_html__(
			'The %1$sHeretek Analytics AI Insights%2$s addon has been replaced by %3$sAI Charlie%4$s. Please deactivate the AI Insights addon as it is no longer needed.',
			'google-analytics-for-wordpress'
		),
		'<strong>',
		'</strong>',
		'<strong>',
		'</strong>'
	);

	echo '<div id="monsterinsights-ai-insights-addon-notice" class="notice notice-warning is-dismissible"><p>' . $message . '</p><p><a href="' . esc_url( $plugins_url ) . '" class="button button-primary">' . esc_html__( 'Go to Plugins', 'google-analytics-for-wordpress' ) . '</a></p></div>'; // phpcs:ignore
}

add_action( 'admin_notices', 'monsterinsights_ai_insights_addon_installed_notice' );

/**
 * AJAX handler to persist dismissal of the AI Insights addon notice for 30 days.
 */
function monsterinsights_dismiss_ai_insights_addon_notice_ajax() {
	check_ajax_referer( 'monsterinsights-dismiss-notice', 'nonce' );
	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_send_json_error();
	}
	set_transient( 'monsterinsights_ai_insights_addon_notice_dismissed', 1, 30 * DAY_IN_SECONDS );
	wp_send_json_success();
}
add_action( 'wp_ajax_monsterinsights_dismiss_ai_insights_addon_notice', 'monsterinsights_dismiss_ai_insights_addon_notice_ajax' );

/**
 * Check if the plugin is MI Lite.
 *
 * @return bool
 */
function monsterinsights_check_is_it_monsterinsights_lite() {
	return false;
}

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
function monsterinsights_wpconsent_install_notice() {
	global $pagenow;

	// Dont show the notice on update page.
	if ( 'update-core.php' === $pagenow ) {
		return;
	}

	// If WPConsent plugin active.
	if ( function_exists( 'WPConsent' ) ) {
		return;
	}

	// If other plugin active
	if ( monsterinsights_wpconsent_is_cmp_plugin_active() ) {
		return;
	}

	// If notice has been dismissed
	if ( get_option( 'monsterinsights_wpconsent_notice_dismissed', false ) ) {
		return;
	}

	// If user not authenticated then do not show.
	$authed = MonsterInsights()->auth->is_authed() || MonsterInsights()->auth->is_network_authed();
	if ( empty( $authed ) ) {
		return;
	}

	$plugin_installed = false;
	if ( file_exists( WP_PLUGIN_DIR . '/wpconsent-cookies-banner-privacy-suite/wpconsent.php' ) ) {
		$plugin_installed = true;
	}
	?>
	<div class="monsterinsights-wpconsent-notice-box notice" id="monsterinsights-wpconsent-notice">
		<div class="monsterinsights-wpconsent-sidebar">
			<div class="monsterinsights-wpconsent-icon">
				<img src="<?php echo esc_url(trailingslashit(MONSTERINSIGHTS_PLUGIN_URL)); ?>assets/images/monsterinsights-notice-box-logo.svg">
			</div>
		</div>
		<div class="monsterinsights-wpconsent-content">
			<button class="monsterinsights-wpconsent-close" id="monsterinsights-wpconsent-notice-close">&times;</button>
			<h3><?php esc_html_e('Make Your Website Analytics Compliant with Privacy Laws', 'google-analytics-for-wordpress'); ?></h3>
			<p><?php esc_html_e('Privacy laws like GDPR, CCPA, and others require user consent before you can track visitors. Our sister plugin, WPConsent, helps you add a smart cookie consent banner for better privacy compliance with Google Analytics.', 'google-analytics-for-wordpress'); ?></p>
			<div class="monsterinsights-wpconsent-buttons">
				<a class="monsterinsights-wpconsent-btn-primary" href="<?php echo esc_url( admin_url() ) ?>admin.php?page=monsterinsights_settings#/wpconsent?installnow=1">
					<?php
						if ( $plugin_installed ) {
							esc_html_e('Activate', 'google-analytics-for-wordpress');
						} else {
							esc_html_e('Install Now', 'google-analytics-for-wordpress');
						}
					 ?>
				</a>
				<a class="monsterinsights-wpconsent-btn-secondary" href="<?php echo esc_url( admin_url() ) ?>admin.php?page=monsterinsights_settings#/wpconsent"><?php esc_html_e('Learn More', 'google-analytics-for-wordpress'); ?></a>
			</div>
		</div>
	</div>
	<?php
}
add_action( 'admin_notices', 'monsterinsights_wpconsent_install_notice' );

/**
 * Output the spinner shown while a Vue 3 admin app boots.
 *
 * Shared so screens that are only waiting (the legacy reports screen redirects
 * on load) show the same thing as screens that are actually mounting an app.
 *
 * @return void
 * @since 11.1.3
 */
function monsterinsights_app_loading_placeholder() {
	echo '<div class="mi-app-loading"><span class="dashicons dashicons-update mi-spin"></span></div>';
	echo '<style>.mi-app-loading{display:flex;align-items:center;justify-content:center;min-height:400px;}.mi-spin{animation:mi-spin 1s linear infinite;font-size:40px;width:40px;height:40px;color:#338eef;}@keyframes mi-spin{to{transform:rotate(360deg);}}</style>';
}

/**
 * Add Overview report page (Vue 3 app)
 */
function monsterinsights_overview_report_page() {
	do_action( 'monsterinsights_head' );
	// Hide WordPress admin notices on this page - Vue app handles its own notifications
	echo '<style>.monsterinsights_page .notice:not(.monsterinsights-notice),.monsterinsights_page .error:not(.monsterinsights-notice),.monsterinsights_page .updated:not(.monsterinsights-notice){display:none !important;}</style>';
	echo '<div id="monsterinsights-overview-report-app">';
	monsterinsights_app_loading_placeholder();
	echo '</div>';
}

/**
 * Add EEA Compliance file.
 */
require_once __DIR__ . '/eea-compliance.php';

/**
 * Add translations functionality.
 */
require_once __DIR__ . '/translations.php';

/**
 * Report filter CRUD ajax handler.
 */
require_once __DIR__ . '/reports/filter-ajax.php';

/**
 * Customer360 telemetry: last-admin-seen recorder.
 */
require_once __DIR__ . '/class-monsterinsights-last-seen.php';

/**
 * Customer360 telemetry: report-view recorder. Required here rather than from its
 * callers so the check-in payload builder cannot depend on bootstrap ordering.
 */
require_once __DIR__ . '/class-monsterinsights-report-views.php';
