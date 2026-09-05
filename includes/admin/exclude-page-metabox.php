<?php

/**
 * Metabox class.
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! class_exists( 'MonsterInsights_MetaBox_ExcludePage' ) ) {
	class MonsterInsights_MetaBox_ExcludePage {

		public function __construct() {
			add_action( 'init', [ $this, 'register_meta' ] );

			if ( ! is_admin() ) {
				return;
			}

			add_action( 'load-post.php', [ $this, 'meta_box_init' ] );
			add_action( 'load-post-new.php', [ $this, 'meta_box_init' ] );
		}

		private function is_gutenberg_editor() {
			if ( function_exists( 'is_gutenberg_page' ) && is_gutenberg_page() ) {
				return true;
			}

			$current_screen = get_current_screen();
			if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
				return true;
			}

			return false;
		}

		private function get_current_post_type() {
			global $post;

			if ( $post && $post->post_type ) {
				return $post->post_type;
			}

			global $typenow;

			if ( $typenow ) {
				return $typenow;
			}

			global $current_screen;

			if ( $current_screen && $current_screen->post_type ) {
				return $current_screen->post_type;
			}

			if ( isset( $_REQUEST['post_type'] ) ) {
				return sanitize_key( $_REQUEST['post_type'] );
			}

			return null;
		}

		public function meta_box_init() {
			$post_type = $this->get_current_post_type();
			if ( ! is_post_type_viewable( $post_type ) ) {
				return;
			}

			add_action( 'admin_enqueue_scripts', array( $this, 'load_metabox_styles' ) );
			if ( $this->is_gutenberg_editor() ) {
				return;
			}
			if ( 'attachment' !== $post_type ) {
				add_action( 'add_meta_boxes', [ $this, 'create_meta_box' ] );
			}
		}

		public function register_meta() {
			if ( ! function_exists( 'register_post_meta' ) ) {
				return;
			}

			register_post_meta(
				'',
				'_monsterinsights_skip_tracking',
				[
					'auth_callback' => '__return_true',
					'default'       => false,
					'show_in_rest'  => true,
					'single'        => true,
					'type'          => 'boolean',
				]
			);
		}

		public function create_meta_box() {
			add_meta_box(
				'monsterinsights-metabox',
				'MonsterInsights',
				[ $this, 'print_metabox_html' ],
				null,
				'side',
				'high'
			);
		}

		public function print_metabox_html( $post ) {
			$skipped = (bool) get_post_meta( $post->ID, '_monsterinsights_skip_tracking', true );
			wp_nonce_field( 'monsterinsights_metabox', 'monsterinsights_metabox_nonce' );
			?>
			<div class="monsterinsights-metabox" id="monsterinsights-metabox-skip-tracking">
				<div class="monsterinsights-metabox-input-checkbox">
					<label class="">
						<input type="checkbox" name="_monsterinsights_skip_tracking"
							   value="1" <?php checked( $skipped ); ?> <?php disabled( ! monsterinsights_is_pro_version() ); ?>>
						<span
							class="monsterinsights-metabox-input-checkbox-label"><?php esc_html_e('Exclude page from Google Analytics Tracking', 'google-analytics-for-wordpress' ); ?></span>
					</label>
				</div>
				<div class="monsterinsights-metabox-helper">
					<?php esc_html_e('Toggle to prevent Google Analytics from tracking this page.', 'google-analytics-for-wordpress' ); ?>
				</div>
			</div>

			<?php do_action( 'monsterinsights_after_exclude_metabox', $skipped, $post ); ?>

			<?php
			// Heretek Analytics has no Lite/Pro gating — per-page exclusion is
			// always available. The upstream "This is a PRO feature" badge is
			// intentionally not rendered.
			?>

			<?php
		}

		public function load_metabox_styles() {
			$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

			wp_register_style( 'monsterinsights-admin-metabox-style', plugins_url( 'assets/css/admin-metabox' . $suffix . '.css', MONSTERINSIGHTS_PLUGIN_FILE ), array(), monsterinsights_get_asset_version() );
			wp_enqueue_style( 'monsterinsights-admin-metabox-style' );

			if ( monsterinsights_is_pro_version() ) {
				return;
			}

			wp_register_script( 'monsterinsights-admin-metabox-script', plugins_url( 'assets/js/admin-metabox' . $suffix . '.js', MONSTERINSIGHTS_PLUGIN_FILE ), array( 'jquery' ), monsterinsights_get_asset_version(), true );
			wp_enqueue_script( 'monsterinsights-admin-metabox-script' );
		}
	}

	new MonsterInsights_MetaBox_ExcludePage();
}
