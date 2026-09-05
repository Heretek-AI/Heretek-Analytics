<?php
/**
 * Heretek Analytics admin AJAX handlers.
 *
 * Most of the upstream MonsterInsights admin AJAX endpoints existed to drive
 * the Vue 3 admin app (install/activate add-ons, dismiss CTAs, backfill the
 * relay cache). Heretek Analytics is fully PHP and self-hosted, so almost
 * all of that surface is gone.
 *
 * The save / verify handlers for the native Settings form live in
 * includes/admin/routes.php (`MonsterInsights_Rest_Routes`).
 *
 * @since 12.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Persist a per-user WordPress user setting via admin-ajax.
 *
 * Kept because the upstream editor sidebar (`exclude-page-metabox.php`) still
 * calls `monsterinsights_ajax_set_user_setting` from legacy meta-box JS.
 * The action handler below is the only piece of upstream admin-ajax that
 * remains in use; everything else is replaced by the new Heretek routes.
 *
 * @return void
 */
function monsterinsights_ajax_set_user_setting() {
	check_ajax_referer( 'monsterinsights-set-user-setting', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'google-analytics-for-wordpress' ) ) );
	}

	$name  = isset( $_POST['name'] )  ? sanitize_text_field( wp_unslash( $_POST['name'] ) )  : '';
	$value = isset( $_POST['value'] ) ? sanitize_text_field( wp_unslash( $_POST['value'] ) ) : '';

	if ( '' === $name ) {
		wp_send_json_error( array( 'message' => __( 'Missing setting name.', 'google-analytics-for-wordpress' ) ) );
	}

	set_user_setting( $name, $value );
	wp_send_json_success();
}
add_action( 'wp_ajax_monsterinsights_set_user_setting', 'monsterinsights_ajax_set_user_setting' );
