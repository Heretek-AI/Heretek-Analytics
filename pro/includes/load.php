<?php
/**
 * Heretek Analytics Pro Loader.
 *
 * Loads all Pro reporting engines, eCommerce integrations, forms tracking,
 * custom dimensions, PPC tracking, and EU compliance.
 *
 * @package Heretek_Analytics
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', function () {

	// Load API classes
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-monsterinsights-api-error.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-monsterinsights-api.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-monsterinsights-api-reports.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-monsterinsights-api-tracking.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-monsterinsights-api-token.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';

	// Load Pro modules
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/custom-dimensions/class-heretek-custom-dimensions.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/forms/class-heretek-forms-tracking.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/media/class-heretek-media-tracking.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/ppc-ads/class-heretek-ppc-providers.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/ecommerce/class-heretek-ecommerce.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/pro-modules/eu-compliance/class-heretek-eu-compliance.php';

	new Heretek_Custom_Dimensions();
	new Heretek_Forms_Tracking();
	new Heretek_Media_Tracking();
	new Heretek_Ecommerce();
	new Heretek_EU_Compliance();
	new Heretek_REST_Reporting_Gateway();

	if ( is_admin() ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/tools.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/metaboxes.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/woocommerce-marketing.php';
	}

	if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {

		// Base Overview & Site Summary
		$overview_report = new MonsterInsights_Report_Overview();
		MonsterInsights()->reporting->add_report( $overview_report );

		$site_summary = new MonsterInsights_Report_Site_Summary();
		MonsterInsights()->reporting->add_report( $site_summary );

		// Pro Reports
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-publisher.php';
		$publisher_report = new MonsterInsights_Report_Publisher();
		MonsterInsights()->reporting->add_report( $publisher_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-ecommerce.php';
		$ecommerce_report = new MonsterInsights_Report_eCommerce();
		MonsterInsights()->reporting->add_report( $ecommerce_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-queries.php';
		$queries_report = new MonsterInsights_Report_Queries();
		MonsterInsights()->reporting->add_report( $queries_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-dimensions.php';
		$dimensions_report = new MonsterInsights_Report_Dimensions();
		MonsterInsights()->reporting->add_report( $dimensions_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-forms.php';
		$forms_report = new MonsterInsights_Report_Forms();
		MonsterInsights()->reporting->add_report( $forms_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-realtime.php';
		$realtime_report = new MonsterInsights_Report_RealTime();
		MonsterInsights()->reporting->add_report( $realtime_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-user-journey.php';
		$user_journey = new MonsterInsights_Report_UserJourney();
		MonsterInsights()->reporting->add_report( $user_journey );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-media.php';
		$media_report = new MonsterInsights_Report_Media();
		MonsterInsights()->reporting->add_report( $media_report );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'pro/includes/admin/reports/report-year-in-review.php';
		$year_in_review = new MonsterInsights_Report_YearInReview();
		MonsterInsights()->reporting->add_report( $year_in_review );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/reports/report-summaries.php';
		$summaries = new MonsterInsights_Report_Summaries();
		MonsterInsights()->reporting->add_report( $summaries );

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/reports/report-ecommerce-product-feed.php';
		$ecommerce_product_feed = new MonsterInsights_Report_Ecommerce_Product_Feed();
		MonsterInsights()->reporting->add_report( $ecommerce_product_feed );

		// Email summaries
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/emails/summaries-infoblocks.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/emails/summaries.php';
		new MonsterInsights_Email_Summaries();
	}

	if ( is_admin() ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/dashboard-widget.php';
		new MonsterInsights_Dashboard_Widget();

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/welcome.php';

		if ( isset( $_GET['page'] ) && 'monsterinsights-onboarding' === $_GET['page'] ) {
			require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/onboarding-wizard.php';
		}

		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/wp-site-health.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/helpers.php';
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/admin/user-journey/init.php';
	}

	if ( is_admin() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/admin/sharedcount.php';
	}

	// Popular posts & products
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/popular-posts/class-popular-posts-themes.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/popular-posts/class-popular-posts.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/popular-posts/class-popular-posts-helper.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/popular-posts/class-popular-posts-inline.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/popular-posts/class-popular-posts-cache.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/popular-posts/class-popular-posts-widget.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/popular-posts/class-popular-posts-widget-sidebar.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/popular-posts/class-popular-posts-ajax.php';

	// Gutenberg blocks
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'lite/includes/gutenberg/frontend.php';
	require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/connect.php';

	do_action( 'monsterinsights_load_plugins' );

	if ( ! is_admin() ) {
		require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/ppc/class-monsterinsights-ppc-tracking-core.php';
	}
}, 0 );

/**
 * Filter frontend script localization to unlock all Pro capabilities and local reporting routes.
 */
add_filter( 'monsterinsights_localize_script_data', function ( $data ) {
	if ( ! is_array( $data ) ) {
		$data = array();
	}
	if ( function_exists( 'MonsterInsights' ) && isset( MonsterInsights()->license ) ) {
		$data['license'] = MonsterInsights()->license->get_site_license();
	}
	$data['is_pro'] = true;
	$data['addons'] = array(
		'ecommerce'     => true,
		'dimensions'    => true,
		'forms'         => true,
		'page_insights' => true,
		'exceptions'    => true,
		'media'         => true,
		'ads'           => true,
	);
	$data['addons_info'] = array(
		'ecommerce'     => array( 'installed' => true, 'basename' => 'heretek-analytics/ecommerce' ),
		'dimensions'    => array( 'installed' => true, 'basename' => 'heretek-analytics/dimensions' ),
		'forms'         => array( 'installed' => true, 'basename' => 'heretek-analytics/forms' ),
		'page_insights' => array( 'installed' => true, 'basename' => 'heretek-analytics/page_insights' ),
		'exceptions'    => array( 'installed' => true, 'basename' => 'heretek-analytics/exceptions' ),
		'media'         => array( 'installed' => true, 'basename' => 'heretek-analytics/media' ),
		'ads'           => array( 'installed' => true, 'basename' => 'heretek-analytics/ads' ),
	);
	$data['reporting_api'] = array(
		'url'      => rest_url( 'heretek-analytics/v1/reporting' ),
		'license'  => 'HERETEK-COMMUNITY-PRO-UNLOCKED',
		'site_url' => is_network_admin() ? network_admin_url() : home_url(),
	);
	$data['relay_api_url']   = rest_url( 'heretek-analytics/v1/reporting' );
	$data['license_expired'] = false;
	return $data;
} );
