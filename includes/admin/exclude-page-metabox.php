<?php

/**
 * Metabox class.
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! class_exists( 'Heretek_Analytics_MetaBox_ExcludePage' ) ) {
	class Heretek_Analytics_MetaBox_ExcludePage {

		public function __construct() {
			add_action( 'init', [ $this, 'register_meta' ] );

			if ( ! is_admin() ) {
				return;
			}

			add_action( 'load-post.php', [ $this, 'meta_box_init' ] );
			add_action( 'load-post-new.php', [ $this, 'meta_box_init' ] );
			add_action( 'save_post', [ $this, 'save_meta_box' ] );
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
				'_heretekanalytics_skip_tracking',
				[
					'auth_callback' => '__return_true',
					'default'       => false,
					'show_in_rest'  => true,
					'single'        => true,
					'type'          => 'boolean',
				]
			);

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
				'heretekanalytics-metabox',
				'Heretek Analytics',
				[ $this, 'print_metabox_html' ],
				null,
				'side',
				'high'
			);
		}

		public function print_metabox_html( $post ) {
			$skipped = get_post_meta( $post->ID, '_heretekanalytics_skip_tracking', true );
			if ( '' === $skipped ) {
				$skipped = get_post_meta( $post->ID, '_monsterinsights_skip_tracking', true );
			}
			$skipped = (bool) $skipped;
			wp_nonce_field( 'heretekanalytics_metabox', 'heretekanalytics_metabox_nonce' );
			?>
			<div class="heretekanalytics-metabox monsterinsights-metabox" id="heretekanalytics-metabox-skip-tracking">
				<div class="monsterinsights-metabox-input-checkbox">
					<label class="">
						<input type="checkbox" name="_heretekanalytics_skip_tracking"
							   value="1" <?php checked( $skipped ); ?>>
						<span
							class="monsterinsights-metabox-input-checkbox-label"><?php esc_html_e('Exclude page from Google Analytics Tracking', 'google-analytics-for-wordpress' ); ?></span>
					</label>
				</div>
				<div class="monsterinsights-metabox-helper">
					<?php esc_html_e('Toggle to prevent Google Analytics from tracking this page.', 'google-analytics-for-wordpress' ); ?>
				</div>
			</div>

			<?php
			do_action( 'heretekanalytics_after_exclude_metabox', $skipped, $post );
			do_action( 'monsterinsights_after_exclude_metabox', $skipped, $post );
		}

		public function save_meta_box( $post_id ) {
			if ( ! isset( $_POST['heretekanalytics_metabox_nonce'] ) && ! isset( $_POST['monsterinsights_metabox_nonce'] ) ) {
				return;
			}
			$nonce = isset( $_POST['heretekanalytics_metabox_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['heretekanalytics_metabox_nonce'] ) ) : sanitize_text_field( wp_unslash( $_POST['monsterinsights_metabox_nonce'] ) );
			if ( ! wp_verify_nonce( $nonce, 'heretekanalytics_metabox' ) && ! wp_verify_nonce( $nonce, 'monsterinsights_metabox' ) ) {
				return;
			}
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return;
			}
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}
			$skipped = ! empty( $_POST['_heretekanalytics_skip_tracking'] ) || ! empty( $_POST['_monsterinsights_skip_tracking'] );
			update_post_meta( $post_id, '_heretekanalytics_skip_tracking', $skipped );
			update_post_meta( $post_id, '_monsterinsights_skip_tracking', $skipped );
		}

		public function load_metabox_styles() {
			$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			$ver    = function_exists( 'heretekanalytics_get_asset_version' ) ? heretekanalytics_get_asset_version() : monsterinsights_get_asset_version();

			wp_register_style( 'monsterinsights-admin-metabox-style', plugins_url( 'assets/css/admin-metabox' . $suffix . '.css', HERETEK_ANALYTICS_PLUGIN_FILE ), array(), $ver );
			wp_enqueue_style( 'monsterinsights-admin-metabox-style' );
		}
	}

	class_alias( 'Heretek_Analytics_MetaBox_ExcludePage', 'MonsterInsights_MetaBox_ExcludePage' );
	new Heretek_Analytics_MetaBox_ExcludePage();
}
