<?php
/**
 * GitHub Release Updater for Heretek Analytics.
 *
 * Provides native in-dashboard WordPress updates directly from
 * Heretek-AI/Heretek-Analytics GitHub releases.
 *
 * @package Heretek_Analytics
 * @since   11.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Analytics_GitHub_Updater {

	/** GitHub owner/repo */
	const REPO = 'Heretek-AI/Heretek-Analytics';

	/** Transient caching release payload */
	const TRANSIENT = 'heretek_analytics_github_release';

	/** TTL for successful release check */
	const CACHE_TTL = 6 * HOUR_IN_SECONDS;

	/** TTL for failed check */
	const CACHE_TTL_FAIL = 2 * HOUR_IN_SECONDS;

	/** Asset filename pattern */
	const ASSET_PATTERN = '/^.*(heretek-analytics|heretek).*\.zip$/i';

	/** Plugin folder slug */
	private $slug;

	/** Plugin basename */
	private $basename;

	public function __construct() {
		$this->basename = plugin_basename( MONSTERINSIGHTS_PLUGIN_FILE );
		$this->slug     = dirname( $this->basename );
		$this->init();
	}

	/**
	 * Register update hooks.
	 */
	public function init(): void {
		add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'inject_update' ) );
		add_filter( 'plugins_api', array( $this, 'plugin_info' ), 10, 3 );
		add_filter( 'upgrader_source_selection', array( $this, 'rename_source_dir' ), 10, 4 );
		add_action( 'upgrader_process_complete', array( $this, 'clear_cache_after_update' ), 10, 2 );
	}

	/**
	 * Inject update into transient.
	 */
	public function inject_update( $transient ) {
		if ( ! is_object( $transient ) ) {
			$transient = new stdClass();
		}

		$release = $this->get_latest_release();
		if ( ! $release ) {
			return $transient;
		}

		$installed = ( isset( $transient->checked ) && is_array( $transient->checked ) && ! empty( $transient->checked[ $this->basename ] ) )
			? (string) $transient->checked[ $this->basename ]
			: MONSTERINSIGHTS_VERSION;

		$item = (object) array(
			'id'            => 'github.com/' . self::REPO,
			'slug'          => $this->slug,
			'plugin'        => $this->basename,
			'new_version'   => $release['version'],
			'url'           => 'https://github.com/' . self::REPO,
			'package'       => $release['package'],
			'icons'         => $this->plugin_icons(),
			'banners'       => array(),
			'tested'        => $release['tested'],
			'requires'      => $release['requires'],
			'requires_php'  => $release['requires_php'],
			'compatibility' => new stdClass(),
		);

		if ( '' !== $release['package'] && version_compare( $release['version'], $installed, '>' ) ) {
			if ( ! isset( $transient->response ) || ! is_array( $transient->response ) ) {
				$transient->response = array();
			}
			$transient->response[ $this->basename ] = $item;
			unset( $transient->no_update[ $this->basename ] );
		} else {
			if ( ! isset( $transient->no_update ) || ! is_array( $transient->no_update ) ) {
				$transient->no_update = array();
			}
			$transient->no_update[ $this->basename ] = $item;
		}

		return $transient;
	}

	/**
	 * Provide plugin information modal content.
	 */
	public function plugin_info( $result, $action, $args ) {
		if ( 'plugin_information' !== $action || empty( $args->slug ) || $args->slug !== $this->slug ) {
			return $result;
		}

		$release = $this->get_latest_release();
		if ( ! $release ) {
			return $result;
		}

		$info                = new stdClass();
		$info->name          = 'Heretek Analytics (Unlocked)';
		$info->slug          = $this->slug;
		$info->version       = $release['version'];
		$info->author        = '<a href="https://github.com/Heretek-AI">Heretek AI</a>';
		$info->homepage      = 'https://github.com/' . self::REPO;
		$info->download_link = $release['package'];
		$info->trunk         = $release['package'];
		$info->requires      = $release['requires'];
		$info->requires_php  = $release['requires_php'];
		$info->tested        = $release['tested'];
		$info->last_updated  = $release['published'];
		$info->icons         = $this->plugin_icons();
		$info->sections      = array(
			'changelog' => $this->render_changelog( $release['changelog'], $release['html_url'] ),
		);

		return $info;
	}

	/**
	 * Rename extracted folder if needed.
	 */
	public function rename_source_dir( $source, $remote_source, $upgrader, $args = array() ) {
		global $wp_filesystem;

		if ( empty( $args['plugin'] ) || $this->basename !== $args['plugin'] || ! $wp_filesystem ) {
			return $source;
		}

		$desired = trailingslashit( $remote_source ) . $this->slug . '/';
		if ( untrailingslashit( $source ) === untrailingslashit( $desired ) ) {
			return $source;
		}

		if ( $wp_filesystem->move( $source, $desired, true ) ) {
			return $desired;
		}

		return new WP_Error(
			'heretek_analytics_rename_failed',
			__( 'Could not rename downloaded Heretek Analytics folder during update.', 'google-analytics-for-wordpress' )
		);
	}

	/**
	 * Clear cache on update completion.
	 */
	public function clear_cache_after_update( $upgrader, $data ): void {
		if ( ! is_array( $data ) || ( $data['action'] ?? '' ) !== 'update' || ( $data['type'] ?? '' ) !== 'plugin' ) {
			return;
		}
		$plugins = (array) ( $data['plugins'] ?? array() );
		if ( ! in_array( $this->basename, $plugins, true ) ) {
			return;
		}

		delete_transient( self::TRANSIENT );

		$updates = get_site_transient( 'update_plugins' );
		if ( is_object( $updates ) ) {
			unset( $updates->response[ $this->basename ] );
			set_site_transient( 'update_plugins', $updates );
		}
	}

	/**
	 * Fetch latest release from GitHub.
	 */
	private function get_latest_release(): ?array {
		$cached = get_transient( self::TRANSIENT );
		if ( is_array( $cached ) ) {
			return isset( $cached['version'] ) ? $cached : null;
		}

		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/releases/latest',
			array(
				'timeout' => 15,
				'headers' => array(
					'Accept'     => 'application/vnd.github+json',
					'User-Agent' => 'Heretek-AI-Analytics-Updater/' . MONSTERINSIGHTS_VERSION,
				),
			)
		);

		if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
			set_transient( self::TRANSIENT, array(), self::CACHE_TTL_FAIL );
			return null;
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! is_array( $data ) || empty( $data['tag_name'] ) ) {
			set_transient( self::TRANSIENT, array(), self::CACHE_TTL_FAIL );
			return null;
		}

		if ( ! empty( $data['draft'] ) || ! empty( $data['prerelease'] ) ) {
			set_transient( self::TRANSIENT, array(), self::CACHE_TTL_FAIL );
			return null;
		}

		$version = ltrim( (string) $data['tag_name'], 'vV' );
		$package = '';
		foreach ( (array) ( $data['assets'] ?? array() ) as $asset ) {
			if ( ! empty( $asset['name'] ) && preg_match( self::ASSET_PATTERN, $asset['name'] ) ) {
				$url = (string) ( $asset['browser_download_url'] ?? '' );
				if ( self::is_release_asset_url( $url ) ) {
					$package = $url;
				}
				break;
			}
		}

		if ( '' === $package && ! empty( $data['zipball_url'] ) ) {
			$zipball = (string) $data['zipball_url'];
			if ( self::is_release_asset_url( $zipball ) ) {
				$package = $zipball;
			}
		}

		if ( '' === $version || '' === $package ) {
			set_transient( self::TRANSIENT, array(), self::CACHE_TTL_FAIL );
			return null;
		}

		$release = array(
			'version'      => $version,
			'package'      => $package,
			'changelog'    => (string) ( $data['body'] ?? '' ),
			'published'    => (string) ( $data['published_at'] ?? '' ),
			'html_url'     => (string) ( $data['html_url'] ?? ( 'https://github.com/' . self::REPO . '/releases' ) ),
			'tested'       => '7.1',
			'requires'     => '5.6',
			'requires_php' => '7.4',
		);

		set_transient( self::TRANSIENT, $release, self::CACHE_TTL );
		return $release;
	}

	/**
	 * Icons for the update UI.
	 */
	private function plugin_icons(): array {
		return array(
			'1x'      => plugins_url( 'assets/images/icon-sm.png', MONSTERINSIGHTS_PLUGIN_FILE ),
			'default' => plugins_url( 'assets/images/icon-sm.png', MONSTERINSIGHTS_PLUGIN_FILE ),
		);
	}

	/**
	 * Convert markdown changelog to safe HTML.
	 */
	private function render_changelog( string $markdown, string $html_url ): string {
		$markdown = trim( $markdown );
		if ( '' === $markdown ) {
			$body = '<p>' . esc_html__( 'See the full release notes on GitHub.', 'google-analytics-for-wordpress' ) . '</p>';
		} else {
			$lines = preg_split( '/\r\n|\r|\n/', $markdown );
			$out   = array();
			$in_ul = false;
			foreach ( $lines as $line ) {
				$line = rtrim( $line );
				if ( preg_match( '/^#{1,6}\s+(.*)$/', $line, $m ) ) {
					if ( $in_ul ) {
						$out[] = '</ul>';
						$in_ul = false;
					}
					$out[] = '<h4>' . esc_html( $m[1] ) . '</h4>';
				} elseif ( preg_match( '/^[\-\*]\s+(.*)$/', $line, $m ) ) {
					if ( ! $in_ul ) {
						$out[] = '<ul>';
						$in_ul = true;
					}
					$out[] = '<li>' . esc_html( $m[1] ) . '</li>';
				} elseif ( '' === trim( $line ) ) {
					if ( $in_ul ) {
						$out[] = '</ul>';
						$in_ul = false;
					}
				} else {
					if ( $in_ul ) {
						$out[] = '</ul>';
						$in_ul = false;
					}
					$out[] = '<p>' . esc_html( $line ) . '</p>';
				}
			}
			if ( $in_ul ) {
				$out[] = '</ul>';
			}
			$body = implode( "\n", $out );
		}

		$body .= '<p><a href="' . esc_url( $html_url ) . '" target="_blank" rel="noopener noreferrer">'
			. esc_html__( 'View full release notes on GitHub →', 'google-analytics-for-wordpress' ) . '</a></p>';

		return $body;
	}

	/**
	 * Validate release asset host.
	 */
	public static function is_release_asset_url( string $url ): bool {
		$parts = wp_parse_url( $url );
		if ( ! is_array( $parts ) || 'https' !== strtolower( (string) ( $parts['scheme'] ?? '' ) ) ) {
			return false;
		}

		$host = strtolower( (string) ( $parts['host'] ?? '' ) );
		$path = (string) ( $parts['path'] ?? '' );

		if ( 'github.com' === $host ) {
			return 0 === strpos( $path, '/' . self::REPO . '/releases/' )
				|| 0 === strpos( $path, '/' . self::REPO . '/archive/' );
		}

		if ( 'api.github.com' === $host ) {
			return 0 === strpos( $path, '/repos/' . self::REPO . '/zipball/' );
		}

		if ( 'codeload.github.com' === $host ) {
			return 0 === strpos( $path, '/' . self::REPO . '/' );
		}

		return 'objects.githubusercontent.com' === $host || 'release-assets.githubusercontent.com' === $host;
	}

	/**
	 * Force immediate release check.
	 */
	public static function check_now(): bool {
		delete_transient( self::TRANSIENT );
		$basename = plugin_basename( MONSTERINSIGHTS_PLUGIN_FILE );
		$updates  = get_site_transient( 'update_plugins' );
		if ( is_object( $updates ) ) {
			unset( $updates->response[ $basename ] );
			unset( $updates->no_update[ $basename ] );
			set_site_transient( 'update_plugins', $updates );
		}
		return true;
	}

}
