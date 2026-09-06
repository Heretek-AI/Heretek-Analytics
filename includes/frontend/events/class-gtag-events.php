<?php
/**
 * Events JS class.
 *
 * @since 6.0.0
 *
 * @package MonsterInsights
 * @subpackage  Events
 * @author  Chris Christoff
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Analytics_Gtag_Events {

	/**
	 * Holds the name of the events type.
	 *
	 * @since 6.0.0
	 * @access public
	 *
	 * @var string $name Name of the events type.
	 */
	public $name = 'js';

	/**
	 * Version of the events class.
	 *
	 * @since 6.0.0
	 * @access public
	 *
	 * @var string $version Version of the events class.
	 */
	public $version = '1.0.0';

	/**
	 * Primary class constructor.
	 *
	 * @since 6.0.0
	 * @access public
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'output_javascript' ), 9 );
	}

	/**
	 * Outputs the Javascript for JS tracking on the page.
	 *
	 * @since 6.0.0
	 * @access public
	 *
	 * @return null
	 */
	public function output_javascript() {
		$inbound_paths = array();

		$internal = monsterinsights_get_option( 'internal_elements', array() );
		if ( ! empty( $internal ) && is_array( $internal ) ) {
			foreach ( $internal as $internal_element ) {
				if ( ! empty( $internal_element['url'] ) ) {
					$inbound_paths[] = esc_js( $internal_element['url'] );
				}
			}
		}

		$internal_paths = monsterinsights_get_option( 'internal_paths', array() );
		if ( ! empty( $internal_paths ) && is_array( $internal_paths ) ) {
			foreach ( $internal_paths as $internal_path ) {
				if ( ! empty( $internal_path['path'] ) ) {
					$inbound_paths[] = esc_js( $internal_path['path'] );
				}
			}
		}

		$inbound_paths = wp_json_encode( $inbound_paths );

		// Get download extensions to track
		$download_extensions = monsterinsights_get_option( 'extensions_of_files', '' );
		$download_extensions = explode( ',', str_replace( '.', '', $download_extensions ) );
		if ( ! is_array( $download_extensions ) ) {
			$download_extensions = array( $download_extensions );
		}
		$i = 0;
		foreach ( $download_extensions as $extension ) {
			$download_extensions[ $i ] = esc_js( trim( $extension ) );
			$i ++;
		}

		$download_extensions = implode( ",", $download_extensions );

		$hash_tracking = monsterinsights_get_option( 'hash_tracking', false ) ? 'true' : 'false';

		$suffix = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) || ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		if ( ! file_exists( HERETEK_ANALYTICS_PLUGIN_DIR . 'assets/js/frontend-gtag.min.js' ) ) {
			$suffix = '';
		}

		$ver = function_exists( 'heretekanalytics_get_asset_version' ) ? heretekanalytics_get_asset_version() : monsterinsights_get_asset_version();
		wp_enqueue_script( 'monsterinsights-frontend-script', plugins_url( 'assets/js/frontend-gtag' . $suffix . '.js', HERETEK_ANALYTICS_PLUGIN_FILE ), array(), $ver, false );

		$use_async = apply_filters( 'monsterinsights_frontend_gtag_script_async', true );

		if ( $use_async ) {
			wp_script_add_data( 'monsterinsights-frontend-script', 'strategy', 'async' );
		}

		$frontend_data = array(
			'js_events_tracking'  => 'true',
			'download_extensions' => $download_extensions, /* Let's get the extensions to track */
			'inbound_paths'       => $inbound_paths, /* Let's get the internal paths to track */
			'home_url'            => home_url(), /* Let's get the url to compare for external/internal use */
			'hash_tracking'       => $hash_tracking, /* Should hash track */
			'v4_id'               => monsterinsights_get_v4_id_to_output(), /* V4 ID used for tracking */
		);

		monsterinsights_localize_script(
			'monsterinsights-frontend-script',
			'monsterinsights_frontend',
			$frontend_data
		);

		monsterinsights_localize_script(
			'monsterinsights-frontend-script',
			'heretekanalytics_frontend',
			$frontend_data
		);
	}
}

class_alias( 'Heretek_Analytics_Gtag_Events', 'MonsterInsights_Gtag_Events' );
