<?php

/**
 * Plugin Name:         Heretek Analytics
 * Plugin URI:          https://github.com/Heretek-AI/Heretek-Analytics
 * Description:         The unrestricted GA4 Data Augur & Telemetry Cogitator for WordPress. 100% open-source, Pro/Agency unlocked, direct GA4 Data API reporting, eCommerce, Forms, PPC, Media, and EU Consent with zero upsells, zero phone-home, and zero paywalls.
 * Author:              Heretek AI
 * Author URI:          https://github.com/Heretek-AI
 *
 * Version:             11.2.0
 * Requires at least:   5.6.0
 * Requires PHP:        7.4
 *
 * License:             GPL v3
 * License URI:         https://www.gnu.org/licenses/gpl-3.0.html
 *
 * Text Domain:         google-analytics-for-wordpress
 * Domain Path:         /languages
 *
 * Heretek Analytics (GPLv3 Fork of Google Analytics for WordPress)
 * Copyright (C) 2024 Heretek AI / Chris Christoff
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @category            Plugin
 * @copyright           Copyright © 2024 Heretek AI
 * @author              Heretek AI
 * @package             Heretek_Analytics
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load AMP compatibility very early if we're in AMP context
if ( ( isset( $_GET['amp'] ) && 1 === $_GET['amp'] ) || 
	 ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) ||
	 ( function_exists( 'amp_is_request' ) && amp_is_request() ) ||
	 ( isset( $_SERVER['REQUEST_URI'] ) && false !== strpos( $_SERVER['REQUEST_URI'], '/amp/' ) ) ) {
	require_once plugin_dir_path( __FILE__ ) . 'includes/frontend/class-amp-compatibility-early.php';
}

/**
 * Main plugin class.
 *
 * @since 6.0.0
 *
 * @package MonsterInsights
 * @author  Chris Christoff
 * @access public
 */
final class MonsterInsights {


	/**
	 * Holds the class object.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var object Instance of instantiated MonsterInsights class.
	 */
	public static $instance;

	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var string $version Plugin version.
	 */
	public $version = '11.2.0';
	/**
	 * Plugin file.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var string $file PHP File constant for main file.
	 */
	public $file;

	/**
	 * The name of the plugin.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var string $plugin_name Plugin name.
	 */
	public $plugin_name = 'Heretek Analytics';

	/**
	 * Unique plugin slug identifier.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var string $plugin_slug Plugin slug.
	 */
	public $plugin_slug = 'heretek-analytics';

	/**
	 * Holds instance of MonsterInsights Admin Notice class.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var MonsterInsights_Admin_Notice $notices Instance of Admin Notice class.
	 */
	public $notices;

	/**
	 * Holds instance of MonsterInsights Auth class.
	 *
	 * @since 7.0.0
	 * @access public
	 * @var MonsterInsights_Auth $auth Instance of Auth class.
	 */
	protected $auth;

	/**
	 * Holds instance of MonsterInsights API Rest Routes class.
	 *
	 * @since 7.4.0
	 * @access public
	 * @var MonsterInsights_Rest_Routes $routes Instance of rest routes.
	 */
	public $routes;

	/**
	 * The tracking mode used in the frontend.
	 *
	 * @since 7.15.0
	 * @accces public
	 * @var string
	 * @deprecated Since 8.3 with the removal of ga compatibility
	 */
	public $tracking_mode;

	/**
	 * Primary class constructor.
	 *
	 * @since 6.0.0
	 * @access public
	 */
	public function __construct() {
		// We don't use this
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @access public
	 * @return object The MonsterInsights_Lite object.
	 * @since 6.0.0
	 *
	 */
	public static function get_instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof MonsterInsights ) ) {
			self::$instance       = new MonsterInsights();
			self::$instance->file = __FILE__;

			// Define constants
			self::$instance->define_globals();

			// Load in settings
			self::$instance->load_settings();

			// Compatibility check
			if ( ! self::$instance->check_compatibility() ) {
				return self::$instance;
			}

			// Load in Auth
			self::$instance->load_auth();

			// Load files
			self::$instance->require_files();

			// This does the version to version background upgrade routines and initial install
			$mi_version = get_option( 'monsterinsights_current_version', '5.5.3' );
			if ( version_compare( $mi_version, '9.11.0', '<' ) ) {
				monsterinsights_lite_call_install_and_upgrade();
			}

			// Load admin only components.
			if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
				self::$instance->notices = new MonsterInsights_Notice_Admin();
				self::$instance->routes  = new MonsterInsights_Rest_Routes();
			}
		}
		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @return void
	 * @since 6.0.0
	 * @access public
	 *
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'google-analytics-for-wordpress' ), '6.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * Attempting to wakeup an MonsterInsights instance will throw a doing it wrong notice.
	 *
	 * @return void
	 * @since 6.0.0
	 * @access public
	 *
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'google-analytics-for-wordpress' ), '6.0.0' );
	}

	/**
	 * Magic get function.
	 *
	 * We use this to lazy load certain functionality. Right now used to lazyload
	 * the API & Auth frontend, so it's only loaded if user is using a plugin
	 * that requires it.
	 *
	 * @return void
	 * @since 7.0.0
	 * @access public
	 *
	 */
	public function __get( $key ) {
		if ( $key === 'auth' ) {
			if ( empty( self::$instance->auth ) ) {
				// LazyLoad Auth for Frontend
				require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/auth.php';
				self::$instance->auth = new MonsterInsights_Auth();
			}

			return self::$instance->$key;
		}
		return self::$instance->$key;
	}

	/**
	 * Check compatibility with PHP and WP, and display notices if necessary
	 *
	 * @return bool
	 * @since 8.0.0
	 */
	private function check_compatibility() {
		if ( defined( 'MONSTERINSIGHTS_FORCE_ACTIVATION' ) && MONSTERINSIGHTS_FORCE_ACTIVATION ) {
			return true;
		}

		require_once plugin_dir_path( __FILE__ ) . 'includes/compatibility-check.php';
		$compatibility = MonsterInsights_Compatibility_Check::get_instance();
		$compatibility->maybe_display_notice();

		return $compatibility->is_php_compatible() && $compatibility->is_wp_compatible();
	}

	/**
	 * Define MonsterInsights constants.
	 *
	 * This function defines all of the MonsterInsights PHP constants.
	 *
	 * @return void
	 * @since 6.0.0
	 * @access public
	 *
	 */
	public function define_globals() {

		if ( ! defined( 'MONSTERINSIGHTS_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_VERSION', $this->version );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PRO_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_PRO_VERSION', MONSTERINSIGHTS_VERSION );
		}

		if ( ! defined( 'MONSTERINSIGHTS_LITE_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_LITE_VERSION', MONSTERINSIGHTS_VERSION );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_NAME' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_NAME', $this->plugin_name );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_SLUG' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_SLUG', $this->plugin_slug );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_FILE' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_FILE', $this->file );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_DIR' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_DIR', plugin_dir_path( $this->file ) );
		}

		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_URL' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_URL', plugin_dir_url( $this->file ) );
		}

	}

	/**
	 * Output a nag notice if the user has both Lite and Pro activated
	 *
	 * @access public
	 * @return    void
	 * @since 6.0.0
	 *
	 */
	public function monsterinsights_pro_notice() {
		$url = admin_url( 'plugins.php' );
		// Check for MS dashboard
		if ( is_network_admin() ) {
			$url = network_admin_url( 'plugins.php' );
		}
		?>
		<div class="error">
			<p><?php echo sprintf(esc_html__('Please %1$suninstall%2$s the MonsterInsights Lite Plugin. Your Pro version of MonsterInsights may not work as expected until the Lite version is uninstalled.', 'google-analytics-for-wordpress'), '<a href="' . $url . '">', '</a>'); // phpcs:ignore ?></p>
		</div>
		<?php
	}

	/**
	 * Loads MonsterInsights settings
	 *
	 * Adds the items to the base object, and adds the helper functions.
	 *
	 * @return void
	 * @since 6.0.0
	 * @access public
	 *
	 */
	public function load_settings() {
		global $monsterinsights_settings;
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/options.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/helpers.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/deprecated.php';
		$monsterinsights_settings = monsterinsights_get_options();
	}


	/**
	 * Loads MonsterInsights Auth
	 *
	 * Loads auth used by MonsterInsights
	 *
	 * @return void
	 * @since 7.0.0
	 * @access public
	 *
	 */
	public function load_auth() {
		if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/auth.php';
			self::$instance->auth = new MonsterInsights_Auth();
		}
	}

	/**
	 * Loads all files into scope.
	 *
	 * @access public
	 * @return    void
	 * @since 6.0.0
	 *
	 */
	public function require_files() {

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/capabilities.php';

		// REST reporting gateway — registers WP REST routes on rest_api_init.
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';

		if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {

			// Core admin files
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/ajax.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/admin.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/common.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/notice.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/eea-compliance.php';

			// Pages
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/settings.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/tools.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/reports.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/addons.php';
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/pages/about.php';

			// Admin-ajax + REST routes used by the new PHP admin pages.
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/routes.php';
		}

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/exclude-page-metabox.php';

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/frontend/frontend.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/frontend/class-amp-compatibility.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/frontend/seedprod.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/measurement-protocol-v4.php';
	}

	/**
	 * Get the tracking mode for the frontend scripts.
	 *
	 * @return string
	 * @deprecated Since 8.3 with the removal of ga compatibility
	 */
	public function get_tracking_mode() {

		if ( ! isset( $this->tracking_mode ) ) {
			// This will already be set to 'analytics' to anybody already using the plugin before 7.15.0.
			$this->tracking_mode = monsterinsights_get_option( 'tracking_mode', 'gtag' );
		}

		return $this->tracking_mode;
	}
}

class_alias( 'MonsterInsights', 'MonsterInsights_Lite' );
class_alias( 'MonsterInsights', 'Heretek_Analytics' );

/**
 * Fired when the plugin is activated.
 *
 * @access public
 *
 * @param boolean $network_wide True if WPMU superadmin uses "Network Activate" action, false otherwise.
 *
 * @return void
 * @global object $wpdb The WordPress database object.
 * @since 6.0.0
 *
 * @global int $wp_version The version of WordPress for this install.
 */
function monsterinsights_lite_activation_hook( $network_wide ) {
	$url = admin_url( 'plugins.php' );
	// Check for MS dashboard
	if ( is_network_admin() ) {
		$url = network_admin_url( 'plugins.php' );
	}

	if ( function_exists( 'is_plugin_active' ) && ( is_plugin_active( 'google-analytics-for-wordpress/googleanalytics.php' ) || is_plugin_active( 'google-analytics-premium/googleanalytics-premium.php' ) ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die( sprintf( esc_html__( 'Please deactivate and remove MonsterInsights before activating Heretek Analytics. %1$sClick here to return to the Plugins page%2$s.', 'google-analytics-for-wordpress' ), '<a href="' . esc_url( $url ) . '">', '</a>' ) ); // phpcs:ignore
	}

	require_once plugin_dir_path( __FILE__ ) . 'includes/compatibility-check.php';
	$compatibility = MonsterInsights_Compatibility_Check::get_instance();
	$compatibility->maybe_deactivate_plugin( plugin_basename( __FILE__ ) );

	// Add transient to trigger redirect.
	set_transient( '_monsterinsights_activation_redirect', 1, 30 );

	// Hook to trigger when plugin activate.
	do_action( 'monsterinsights_plugin_activated' );
}

register_activation_hook( __FILE__, 'monsterinsights_lite_activation_hook' );

/**
 * Fired when the plugin is uninstalled.
 *
 * @access public
 * @return    void
 * @since 6.0.0
 *
 */
function monsterinsights_lite_uninstall_hook() {
	wp_cache_flush();

	$instance = MonsterInsights();

	$instance->define_globals();
	$instance->load_settings();

	// WP-CLI: nothing admin-only to load anymore.
	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		define( 'WP_ADMIN', true );
		$instance->load_auth();
	}

	require_once 'includes/admin/uninstall.php';

	// Drop all Heretek Analytics options on every site (multisite-aware).
	if ( is_multisite() ) {
		$site_list = get_sites();
		foreach ( (array) $site_list as $site ) {
			switch_to_blog( $site->blog_id );
			monsterinsights_uninstall_remove_options();
			restore_current_blog();
		}
	} else {
		monsterinsights_uninstall_remove_options();
	}
}

register_uninstall_hook( __FILE__, 'monsterinsights_lite_uninstall_hook' );

/**
 * The main function responsible for returning the one true MonsterInsights_Lite
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $monsterinsights = MonsterInsights_Lite(); ?>
 *
 * @return MonsterInsights_Lite The singleton MonsterInsights_Lite instance.
 * @uses MonsterInsights_Lite::get_instance() Retrieve MonsterInsights_Lite instance.
 *
 * @since 6.0.0
 *
 */
/**
 * MonsterInsights Install and Updates.
 *
 * This function is used install and upgrade MonsterInsights. This is used for upgrade routines
 * that can be done automatically, behind the scenes without the need for user interaction
 * (for example pagination or user input required), as well as the initial install.
 *
 * @return void
 * @global string $wp_version WordPress version (provided by WordPress core).
 * @uses MonsterInsights_Lite::load_settings() Loads MonsterInsights settings
 * @uses MonsterInsights_Install::init() Runs upgrade process
 *
 * @since 6.0.0
 * @access public
 *
 */
function monsterinsights_lite_install_and_upgrade() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/compatibility-check.php';
	$compatibility = MonsterInsights_Compatibility_Check::get_instance();

	// If the WordPress site doesn't meet the correct WP or PHP version requirements, don't activate MonsterInsights
	if ( ! $compatibility->is_php_compatible() || ! $compatibility->is_wp_compatible() ) {
		if ( is_plugin_active( plugin_basename( __FILE__ ) ) ) {
			return;
		}
	}

	// Load settings and globals (so we can use/set them during the upgrade process)
	MonsterInsights_Lite()->define_globals();
	MonsterInsights_Lite()->load_settings();

	// Load in Auth
	MonsterInsights()->load_auth();

	// Load upgrade file
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/install.php';

	// Run the MonsterInsights upgrade routines
	$updates = new MonsterInsights_Install();
	$updates->init();
}

/**
 * MonsterInsights check for install and update processes.
 *
 * This function is used to call the MonsterInsights automatic upgrade class, which in turn
 * checks to see if there are any update procedures to be run, and if
 * so runs them. Also installs MonsterInsights for the first time.
 *
 * @return void
 * @uses MonsterInsights_Install() Runs install and upgrade process.
 *
 * @since 6.0.0
 * @access public
 *
 */
function monsterinsights_lite_call_install_and_upgrade() {
	add_action( 'wp_loaded', 'monsterinsights_lite_install_and_upgrade' );
}

/**
 * Returns the MonsterInsights combined object that you can use for both
 * MonsterInsights Lite and Pro Users. When both plugins active, defers to the
 * more complete Pro object.
 *
 * Warning: Do not use this in Lite or Pro specific code (use the individual objects instead).
 * Also do not use in the MonsterInsights Lite/Pro upgrade and install routines.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Prevents the need to do conditional global object logic when you have code that you want to work with
 * both Pro and Lite.
 *
 * Example: <?php $monsterinsights = MonsterInsights(); ?>
 *
 * @return MonsterInsights The singleton MonsterInsights instance.
 * @uses MonsterInsights::get_instance() Retrieve MonsterInsights Pro instance.
 * @uses MonsterInsights_Lite::get_instance() Retrieve MonsterInsights Lite instance.
 *
 * @since 6.0.0
 *
 */
if ( ! function_exists( 'MonsterInsights' ) ) {
	function MonsterInsights() {
		return MonsterInsights::get_instance();
	}
}

if ( ! function_exists( 'MonsterInsights_Pro' ) ) {
	function MonsterInsights_Pro() {
		return MonsterInsights::get_instance();
	}
}

if ( ! function_exists( 'MonsterInsights_Lite' ) ) {
	function MonsterInsights_Lite() {
		return MonsterInsights::get_instance();
	}
}

if ( ! function_exists( 'Heretek_Analytics' ) ) {
	function Heretek_Analytics() {
		return MonsterInsights::get_instance();
	}
}

if ( ! class_exists( 'Heretek_Analytics' ) ) {
	class_alias( 'MonsterInsights', 'Heretek_Analytics' );
}

add_action( 'plugins_loaded', 'MonsterInsights' );

// Initialize Heretek GitHub release updater in admin context
if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
	add_action( 'plugins_loaded', function () {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/class-heretek-github-updater.php';
		new Heretek_Analytics_GitHub_Updater();
	}, 20 );
}

/**
 * Remove scheduled cron hooks during deactivation.
 */
function monsterinsights_lite_deactivation_hook() {
	wp_clear_scheduled_hook( 'monsterinsights_usage_tracking_cron' );
	wp_clear_scheduled_hook( 'monsterinsights_email_summaries_cron' );
	wp_clear_scheduled_hook( 'monsterinsights_charitable_notice_cron' );

	// Clear any GA4 access-token transients we minted.
	$transients_like = function ( $prefix ) {
		global $wpdb;
		$like = $wpdb->esc_like( '_transient_' . $prefix ) . '%';
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like ) );
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $wpdb->esc_like( '_transient_timeout_' . $prefix ) . '%' ) );
	};
	$transients_like( 'heretek_ga4_sa_token_' );

	// Hook to trigger on deactivation.
	do_action( 'monsterinsights_plugin_deactivated' );
}

register_deactivation_hook( __FILE__, 'monsterinsights_lite_deactivation_hook' );
