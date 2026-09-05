<?php
/**
 * Frontend events tracking.
 *
 * @since 6.0.0
 *
 * @package MonsterInsights
 * @author  Chris Christoff
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Clear snoozed notifications on login.
// Registered here (frontend) because the notifications class file is only
// loaded inside is_admin(), but wp_login fires on the frontend login form.
add_action( 'wp_login', 'monsterinsights_clear_snoozed_on_login', 10, 2 );

/**
 * Clear snoozed notifications when a user logs in.
 *
 * @param string   $user_login Username.
 * @param \WP_User $user       WP_User object.
 */
function monsterinsights_clear_snoozed_on_login( $user_login, $user ) {
	delete_user_meta( $user->ID, 'monsterinsights_notifications_snoozed' );
}

/**
 * Check if we are in an AMP context
 *
 * @return bool
 * @since 8.0.0
 */
function monsterinsights_is_amp() {
	// Check for AMP plugin
	if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
		return true;
	}

	// Check for AMP theme
	if ( function_exists( 'amp_is_request' ) && amp_is_request() ) {
		return true;
	}

	// Check for AMP query parameter
	if ( isset( $_GET['amp'] ) && '1' === $_GET['amp'] ) {
		return true;
	}

	// Check for AMP in URL path
	if ( isset( $_SERVER['REQUEST_URI'] ) && false !== strpos( $_SERVER['REQUEST_URI'], '/amp/' ) ) {
		return true;
	}

	// Check for AMP in theme
	if ( function_exists( 'amp_is_canonical' ) && amp_is_canonical() ) {
		return true;
	}

	return false;
}

/**
 * Print Monsterinsights frontend tracking script.
 *
 * @return void
 * @since 7.0.0
 * @access public
 */
function monsterinsights_tracking_script() {
	// Check if we're in AMP context - if so, don't output any scripts
	if ( monsterinsights_is_amp() ) {
		return;
	}

	if ( monsterinsights_skip_tracking() ) {
		return;
	}

	require_once plugin_dir_path( MONSTERINSIGHTS_PLUGIN_FILE ) . 'includes/frontend/class-tracking-abstract.php';

	$mode = is_preview() ? 'preview' : MonsterInsights()->get_tracking_mode();

	do_action( 'monsterinsights_tracking_before_' . $mode );
	do_action( 'monsterinsights_tracking_before', $mode );
	if ( 'preview' === $mode ) {
		require_once plugin_dir_path( MONSTERINSIGHTS_PLUGIN_FILE ) . 'includes/frontend/tracking/class-tracking-preview.php';
		$tracking = new MonsterInsights_Tracking_Preview();
		// Escaped in frontend_output function
		echo $tracking->frontend_output(); // phpcs:ignore
	} else {
		require_once plugin_dir_path( MONSTERINSIGHTS_PLUGIN_FILE ) . 'includes/frontend/tracking/class-tracking-gtag.php';
		$tracking = new MonsterInsights_Tracking_Gtag();
		// Escaped in frontend_output function
		echo $tracking->frontend_output(); // phpcs:ignore
	}

	do_action( 'monsterinsights_tracking_after_' . $mode );
	do_action( 'monsterinsights_tracking_after', $mode );
}

add_action( 'wp_head', 'monsterinsights_tracking_script', 6 );
// add_action( 'login_head', 'monsterinsights_tracking_script', 6 );

/**
 * Get frontend tracking options.
 *
 * This function is used to return an array of parameters
 * for the frontend_output() function to output. These are
 * generally dimensions and turned on GA features.
 *
 * @return array Array of the options to use.
 * @since 6.0.0
 * @access public
 */
function monsterinsights_events_tracking() {
	if ( monsterinsights_skip_tracking() ) {
		return;
	}

	$track_user = monsterinsights_track_user();

	if ( $track_user ) {
		require_once plugin_dir_path( MONSTERINSIGHTS_PLUGIN_FILE ) . 'includes/frontend/events/class-gtag-events.php';
		new MonsterInsights_Gtag_Events();
	} else {
		// User is in the disabled group or events mode is off
	}
}

add_action( 'template_redirect', 'monsterinsights_events_tracking', 9 );

/**
 * Add the UTM source parameters in the RSS feeds to track traffic.
 *
 * @param string $guid The link for the RSS feed.
 *
 * @return string The new link for the RSS feed.
 * @since 6.0.0
 * @access public
 */
function monsterinsights_rss_link_tagger( $guid ) {
	global $post;

	if (
		monsterinsights_get_option( 'tag_links_in_rss', false )
		&& is_feed()
		&& ! empty( $post->post_name )
	) {
		if ( monsterinsights_get_option( 'allow_anchor', false ) ) {
			$delimiter = '#';
		} else {
			$delimiter = '?';
			if ( strpos( $guid, $delimiter ) > 0 ) {
				$delimiter = '&amp;';
			}
		}

		return $guid . $delimiter . 'utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=' . urlencode( $post->post_name );
	}

	return $guid;
}

add_filter( 'the_permalink_rss', 'monsterinsights_rss_link_tagger', 99 );



/**
 * Load the tracking notice for logged in users.
 */
function monsterinsights_administrator_tracking_notice() {
	// Don't do anything for guests.
	if ( ! is_user_logged_in() ) {
		return;
	}

	// Only show this to users who are not tracked.
	if ( monsterinsights_track_user() ) {
		return;
	}

	// Only show when tracking.
	$tracking_tag = monsterinsights_get_v4_id();
	if ( empty( $tracking_tag ) ) {
		return;
	}

	// Don't show if already dismissed.
	if ( get_option( 'monsterinsights_frontend_tracking_notice_viewed', false ) ) {
		return;
	}

	// Automatically dismiss when loaded.
	update_option( 'monsterinsights_frontend_tracking_notice_viewed', 1 );

	?>
<div class="monsterinsights-tracking-notice monsterinsights-tracking-notice-hide">
	<div class="monsterinsights-tracking-notice-icon">
		<img src="<?php echo esc_url( plugins_url( 'assets/images/mascot.png', MONSTERINSIGHTS_PLUGIN_FILE ) ); ?>"
			width="40" alt="MonsterInsights Mascot" />
	</div>
	<div class="monsterinsights-tracking-notice-text">
		<h3><?php esc_html_e( 'Tracking is Disabled for Administrators', 'google-analytics-for-wordpress' ); ?></h3>
		<p>
			<?php
				$doc_url = 'https://github.com/Heretek-AI/Heretek-Analytics#readme';
				// Translators: %s is the link to the article where more details about tracking are listed.
				printf( esc_html__( 'To keep stats accurate, we do not load Google Analytics scripts for admin users. %1$sLearn More &raquo;%2$s', 'google-analytics-for-wordpress' ), '<a href="' . esc_url( $doc_url ) . '" target="_blank">', '</a>' );
			?>
		</p>
	</div>
	<div class="monsterinsights-tracking-notice-close">&times;</div>
</div>
<style type="text/css">
.monsterinsights-tracking-notice {
	position: fixed;
	bottom: 20px;
	right: 15px;
	font-family: Arial, Helvetica, "Trebuchet MS", sans-serif;
	background: #fff;
	box-shadow: 0 0 10px 0 #dedede;
	padding: 6px 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 380px;
	max-width: calc(100% - 30px);
	border-radius: 6px;
	transition: bottom 700ms ease;
	z-index: 10000;
}

.monsterinsights-tracking-notice h3 {
	font-size: 13px;
	color: #222;
	font-weight: 700;
	margin: 0 0 8px;
	padding: 0;
	line-height: 1;
	border: none;
}

.monsterinsights-tracking-notice p {
	font-size: 13px;
	color: #7f7f7f;
	font-weight: 400;
	margin: 0;
	padding: 0;
	line-height: 1.2;
	border: none;
}

.monsterinsights-tracking-notice p a {
	color: #7f7f7f;
	font-size: 13px;
	line-height: 1.2;
	margin: 0;
	padding: 0;
	text-decoration: underline;
	font-weight: 400;
}

.monsterinsights-tracking-notice p a:hover {
	color: #7f7f7f;
	text-decoration: none;
}

.monsterinsights-tracking-notice-icon img {
	height: auto;
	display: block;
	margin: 0;
}

.monsterinsights-tracking-notice-icon {
	padding: 14px;
	background-color: #f2f6ff;
	border-radius: 6px;
	flex-grow: 0;
	flex-shrink: 0;
	margin-right: 12px;
}

.monsterinsights-tracking-notice-close {
	padding: 0;
	margin: 0 3px 0 0;
	border: none;
	box-shadow: none;
	border-radius: 0;
	color: #7f7f7f;
	background: transparent;
	line-height: 1;
	align-self: flex-start;
	cursor: pointer;
	font-weight: 400;
}

.monsterinsights-tracking-notice.monsterinsights-tracking-notice-hide {
	bottom: -200px;
}
</style>
<?php

	if ( ! wp_script_is( 'jquery', 'queue' ) ) {
		wp_enqueue_script( 'jquery' );
	}
	?>
<script>
if ('undefined' !== typeof jQuery) {
	jQuery(document).ready(function($) {
		/* Don't show the notice if we don't have a way to hide it (no js, no jQuery). */
		$(document.querySelector('.monsterinsights-tracking-notice')).removeClass(
			'monsterinsights-tracking-notice-hide');
		$(document.querySelector('.monsterinsights-tracking-notice-close')).on('click', function(e) {
			e.preventDefault();
			$(this).closest('.monsterinsights-tracking-notice').addClass(
				'monsterinsights-tracking-notice-hide');
			$.ajax({
				url: '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>',
				method: 'POST',
				data: {
					action: 'monsterinsights_dismiss_tracking_notice',
					nonce: '<?php echo esc_js( wp_create_nonce( 'monsterinsights-tracking-notice' ) ); ?>',
				}
			});
		});
	});
}
</script>
<?php
}

add_action( 'wp_footer', 'monsterinsights_administrator_tracking_notice', 300 );

/**
 * Ajax handler to hide the tracking notice.
 */
function monsterinsights_dismiss_tracking_notice() {

	check_ajax_referer( 'monsterinsights-tracking-notice', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_save_settings' ) ) {
		wp_die();
	}

	update_option( 'monsterinsights_frontend_tracking_notice_viewed', 1 );

	wp_die();

}

add_action( 'wp_ajax_monsterinsights_dismiss_tracking_notice', 'monsterinsights_dismiss_tracking_notice' );

/**
 * If the legacy shortcodes are not registered, make sure they don't output.
 */
function monsterinsights_maybe_handle_legacy_shortcodes() {

	if ( ! shortcode_exists( 'gadwp_useroptout' ) ) {
		add_shortcode( 'gadwp_useroptout', '__return_empty_string' );
	}

}

add_action( 'init', 'monsterinsights_maybe_handle_legacy_shortcodes', 1000 );

/**
 * Remove Query String from a Vue Settings before sending the data to GA.
 *
 * @return void
 */
function monsterinsights_exclude_query_params_v4() {
	global $wp;

	if ( ! monsterinsights_get_option( 'exclude_query_params', false ) ) {
		return;
	}

	$current_page_url = add_query_arg( !empty($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '', '', trailingslashit( home_url( $wp->request ) ) ); // phpcs:ignore
	$query_options    = monsterinsights_get_option( 'exclude_query_params_options', false );
	$pg_options       = $query_options ? explode( ',', $query_options ) : array();

	if ( is_array( $pg_options ) && empty( $pg_options ) ) {
		return;
	}

	$filtered_options                  = array();
	$filtered_url                      = remove_query_arg( $pg_options, $current_page_url );
	$filtered_options['page_location'] = $filtered_url;

	if ( wp_get_referer() ) {
		$filtered_page_ref_url             = remove_query_arg( $pg_options, wp_get_referer() );
		$filtered_options['page_referrer'] = $filtered_page_ref_url;
	}

	printf( "var MonsterInsightsExcludeQuery = %s;\n", wp_json_encode( $filtered_options ) );
}

add_action( 'monsterinsights_tracking_gtag_frontend_output_after_mi_track_user', 'monsterinsights_exclude_query_params_v4' );
