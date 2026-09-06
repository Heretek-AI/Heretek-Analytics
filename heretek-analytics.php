<?php

/**
 * Plugin Name:         Heretek Analytics
 * Plugin URI:          https://github.com/Heretek-AI/Heretek-Analytics
 * Description:         The unrestricted GA4 Data Augur & Telemetry Cogitator for WordPress. 100% open-source, Pro/Agency unlocked, direct GA4 Data API reporting, eCommerce, Forms, PPC, Media, and EU Consent with zero upsells, zero phone-home, and zero paywalls.
 * Author:              Heretek AI
 * Author URI:          https://github.com/Heretek-AI
 *
 * Version:             12.3.0
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
final class Heretek_Analytics {

	/**
	 * Holds the class object.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var object Instance of instantiated Heretek_Analytics class.
	 */
	public static $instance;

	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 *
	 * @since 6.0.0
	 * @access public
	 * @var string $version Plugin version.
	 */
	public $version = '12.3.0';

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
	 * Holds instance of Admin Notice class.
	 *
	 * @access public
	 * @var Heretek_Analytics_Notice_Admin $notices Instance of Admin Notice class.
	 */
	public $notices;

	/**
	 * Holds instance of Auth class.
	 *
	 * @access public
	 * @var Heretek_Analytics_Auth $auth Instance of Auth class.
	 */
	protected $auth;

	/**
	 * Holds instance of API Rest Routes class.
	 *
	 * @access public
	 * @var Heretek_Analytics_Rest_Routes $routes Instance of rest routes.
	 */
	public $routes;

	/**
	 * The tracking mode used in the frontend.
	 *
	 * @var string
	 */
	public $tracking_mode;

	/**
	 * Primary class constructor.
	 */
	public function __construct() {
		// We don't use this
	}

	/**
	 * Returns the singleton instance of the class.
	 *
	 * @access public
	 * @return Heretek_Analytics
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Heretek_Analytics ) ) {
			self::$instance       = new Heretek_Analytics();
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

			// Load admin only components.
			if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
				self::$instance->notices = class_exists( 'Heretek_Analytics_Notice_Admin' ) ? new Heretek_Analytics_Notice_Admin() : new MonsterInsights_Notice_Admin();
				self::$instance->routes  = class_exists( 'Heretek_Analytics_Rest_Routes' ) ? new Heretek_Analytics_Rest_Routes() : new MonsterInsights_Rest_Routes();
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
	 */
	private function check_compatibility() {
		if ( defined( 'HERETEK_ANALYTICS_FORCE_ACTIVATION' ) && HERETEK_ANALYTICS_FORCE_ACTIVATION ) {
			return true;
		}
		if ( defined( 'MONSTERINSIGHTS_FORCE_ACTIVATION' ) && MONSTERINSIGHTS_FORCE_ACTIVATION ) {
			return true;
		}

		require_once plugin_dir_path( __FILE__ ) . 'includes/compatibility-check.php';
		$compatibility = class_exists( 'Heretek_Analytics_Compatibility_Check' ) ? Heretek_Analytics_Compatibility_Check::get_instance() : MonsterInsights_Compatibility_Check::get_instance();
		$compatibility->maybe_display_notice();

		return $compatibility->is_php_compatible() && $compatibility->is_wp_compatible();
	}

	/**
	 * Define Heretek Analytics constants.
	 *
	 * @return void
	 */
	public function define_globals() {
		if ( ! defined( 'HERETEK_ANALYTICS_VERSION' ) ) {
			define( 'HERETEK_ANALYTICS_VERSION', $this->version );
		}
		if ( ! defined( 'HERETEK_ANALYTICS_PLUGIN_NAME' ) ) {
			define( 'HERETEK_ANALYTICS_PLUGIN_NAME', $this->plugin_name );
		}
		if ( ! defined( 'HERETEK_ANALYTICS_PLUGIN_SLUG' ) ) {
			define( 'HERETEK_ANALYTICS_PLUGIN_SLUG', $this->plugin_slug );
		}
		if ( ! defined( 'HERETEK_ANALYTICS_PLUGIN_FILE' ) ) {
			define( 'HERETEK_ANALYTICS_PLUGIN_FILE', $this->file );
		}
		if ( ! defined( 'HERETEK_ANALYTICS_PLUGIN_DIR' ) ) {
			define( 'HERETEK_ANALYTICS_PLUGIN_DIR', plugin_dir_path( $this->file ) );
		}
		if ( ! defined( 'HERETEK_ANALYTICS_PLUGIN_URL' ) ) {
			define( 'HERETEK_ANALYTICS_PLUGIN_URL', plugin_dir_url( $this->file ) );
		}

		// Backward-compatibility aliases for legacy MonsterInsights constants
		if ( ! defined( 'MONSTERINSIGHTS_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_VERSION', HERETEK_ANALYTICS_VERSION );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PRO_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_PRO_VERSION', HERETEK_ANALYTICS_VERSION );
		}
		if ( ! defined( 'MONSTERINSIGHTS_LITE_VERSION' ) ) {
			define( 'MONSTERINSIGHTS_LITE_VERSION', HERETEK_ANALYTICS_VERSION );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_NAME' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_NAME', HERETEK_ANALYTICS_PLUGIN_NAME );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_SLUG' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_SLUG', HERETEK_ANALYTICS_PLUGIN_SLUG );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_FILE' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_FILE', HERETEK_ANALYTICS_PLUGIN_FILE );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_DIR' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_DIR', HERETEK_ANALYTICS_PLUGIN_DIR );
		}
		if ( ! defined( 'MONSTERINSIGHTS_PLUGIN_URL' ) ) {
			define( 'MONSTERINSIGHTS_PLUGIN_URL', HERETEK_ANALYTICS_PLUGIN_URL );
		}
	}

	/**
	 * Loads Heretek Analytics settings.
	 *
	 * @return void
	 */
	public function load_settings() {
		global $heretekanalytics_settings, $monsterinsights_settings;
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/options.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/helpers.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/deprecated.php';
		$heretekanalytics_settings = heretekanalytics_get_options();
		$monsterinsights_settings  = $heretekanalytics_settings;
	}

	/**
	 * Loads Auth handler.
	 *
	 * @return void
	 */
	public function load_auth() {
		if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/auth.php';
			self::$instance->auth = new Heretek_Analytics_Auth();
		}
	}

	/**
	 * Loads all plugin files into scope.
	 *
	 * @return void
	 */
	public function require_files() {
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/capabilities.php';

		// REST reporting gateway — registers WP REST routes on rest_api_init.
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';

		if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
			// Core admin files
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/ajax.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/admin.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/common.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/notice.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/eea-compliance.php';

			// Pages
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/settings.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/tools.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/reports.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/authors.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/addons.php';
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/pages/about.php';

			// Admin-ajax + REST routes
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/routes.php';

			// Native WordPress Dashboard Widget
			require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/dashboard-widget.php';
		}

		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/exclude-page-metabox.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/frontend/frontend.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/frontend/class-amp-compatibility.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/frontend/seedprod.php';
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/measurement-protocol-v4.php';
	}

	/**
	 * Get the tracking mode for the frontend scripts.
	 *
	 * @return string
	 */
	public function get_tracking_mode() {
		if ( ! isset( $this->tracking_mode ) ) {
			$this->tracking_mode = heretekanalytics_get_option( 'tracking_mode', 'gtag' );
		}
		return $this->tracking_mode;
	}
}

// Register backward-compatible class aliases
class_alias( 'Heretek_Analytics', 'MonsterInsights' );
class_alias( 'Heretek_Analytics', 'MonsterInsights_Lite' );
class_alias( 'Heretek_Analytics', 'MonsterInsights_Pro' );

/**
 * Fired when the plugin is activated.
 *
 * @param boolean $network_wide
 * @return void
 */
function heretekanalytics_activation_hook( $network_wide ) {
	$url = admin_url( 'plugins.php' );
	if ( is_network_admin() ) {
		$url = network_admin_url( 'plugins.php' );
	}

	if ( function_exists( 'is_plugin_active' ) && ( is_plugin_active( 'google-analytics-for-wordpress/googleanalytics.php' ) || is_plugin_active( 'google-analytics-premium/googleanalytics-premium.php' ) ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die( sprintf( esc_html__( 'Please deactivate and remove MonsterInsights before activating Heretek Analytics. %1$sClick here to return to the Plugins page%2$s.', 'heretek-analytics' ), '<a href="' . esc_url( $url ) . '">', '</a>' ) );
	}

	require_once plugin_dir_path( __FILE__ ) . 'includes/compatibility-check.php';
	$compatibility = class_exists( 'Heretek_Analytics_Compatibility_Check' ) ? Heretek_Analytics_Compatibility_Check::get_instance() : MonsterInsights_Compatibility_Check::get_instance();
	$compatibility->maybe_deactivate_plugin( plugin_basename( __FILE__ ) );

	set_transient( '_heretekanalytics_activation_redirect', 1, 30 );
	set_transient( '_monsterinsights_activation_redirect', 1, 30 );

	do_action( 'heretekanalytics_plugin_activated' );
	do_action( 'monsterinsights_plugin_activated' );
}

register_activation_hook( __FILE__, 'heretekanalytics_activation_hook' );

if ( ! function_exists( 'monsterinsights_lite_activation_hook' ) ) {
	function monsterinsights_lite_activation_hook( $network_wide ) {
		heretekanalytics_activation_hook( $network_wide );
	}
}

/**
 * Fired when the plugin is uninstalled.
 *
 * @return void
 */
function heretekanalytics_uninstall_hook() {
	wp_cache_flush();

	$instance = HeretekAnalytics();
	$instance->define_globals();
	$instance->load_settings();

	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		define( 'WP_ADMIN', true );
		$instance->load_auth();
	}

	require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/admin/uninstall.php';

	if ( is_multisite() ) {
		$site_list = get_sites();
		foreach ( (array) $site_list as $site ) {
			switch_to_blog( $site->blog_id );
			if ( function_exists( 'heretekanalytics_uninstall_remove_options' ) ) {
				heretekanalytics_uninstall_remove_options();
			} else {
				monsterinsights_uninstall_remove_options();
			}
			restore_current_blog();
		}
	} else {
		if ( function_exists( 'heretekanalytics_uninstall_remove_options' ) ) {
			heretekanalytics_uninstall_remove_options();
		} else {
			monsterinsights_uninstall_remove_options();
		}
	}
}

register_uninstall_hook( __FILE__, 'heretekanalytics_uninstall_hook' );

if ( ! function_exists( 'monsterinsights_lite_uninstall_hook' ) ) {
	function monsterinsights_lite_uninstall_hook() {
		heretekanalytics_uninstall_hook();
	}
}

/**
 * Main function returning the singleton Heretek_Analytics instance.
 *
 * @return Heretek_Analytics
 */
if ( ! function_exists( 'HeretekAnalytics' ) ) {
	function HeretekAnalytics() {
		return Heretek_Analytics::get_instance();
	}
}

if ( ! function_exists( 'Heretek_Analytics' ) ) {
	function Heretek_Analytics() {
		return Heretek_Analytics::get_instance();
	}
}

if ( ! function_exists( 'MonsterInsights' ) ) {
	function MonsterInsights() {
		return Heretek_Analytics::get_instance();
	}
}

if ( ! function_exists( 'MonsterInsights_Pro' ) ) {
	function MonsterInsights_Pro() {
		return Heretek_Analytics::get_instance();
	}
}

if ( ! function_exists( 'MonsterInsights_Lite' ) ) {
	function MonsterInsights_Lite() {
		return Heretek_Analytics::get_instance();
	}
}

add_action( 'plugins_loaded', 'HeretekAnalytics' );

// Initialize Heretek GitHub release updater in admin context
if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
	add_action( 'plugins_loaded', function () {
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/class-heretek-github-updater.php';
		new Heretek_Analytics_GitHub_Updater();
	}, 20 );
}

/**
 * Remove scheduled cron hooks during deactivation.
 */
function heretekanalytics_deactivation_hook() {
	wp_clear_scheduled_hook( 'monsterinsights_usage_tracking_cron' );
	wp_clear_scheduled_hook( 'monsterinsights_email_summaries_cron' );
	wp_clear_scheduled_hook( 'monsterinsights_charitable_notice_cron' );
	wp_clear_scheduled_hook( 'heretekanalytics_usage_tracking_cron' );

	// Clear any GA4 access-token transients we minted.
	$transients_like = function ( $prefix ) {
		global $wpdb;
		$like = $wpdb->esc_like( '_transient_' . $prefix ) . '%';
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $like ) );
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $wpdb->esc_like( '_transient_timeout_' . $prefix ) . '%' ) );
	};
	$transients_like( 'heretek_ga4_sa_token_' );

	do_action( 'heretekanalytics_plugin_deactivated' );
	do_action( 'monsterinsights_plugin_deactivated' );
}

register_deactivation_hook( __FILE__, 'heretekanalytics_deactivation_hook' );

if ( ! function_exists( 'monsterinsights_lite_deactivation_hook' ) ) {
	function monsterinsights_lite_deactivation_hook() {
		heretekanalytics_deactivation_hook();
	}
}
