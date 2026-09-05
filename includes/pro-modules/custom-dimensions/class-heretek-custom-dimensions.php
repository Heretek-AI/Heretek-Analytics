<?php
/**
 * Heretek Custom Dimensions Engine.
 *
 * @package Heretek_Analytics
 * @subpackage Dimensions
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Custom_Dimensions {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Frontend tracking integration
		add_filter( 'monsterinsights_frontend_tracking_options_persistent_gtag_before_pageview', array( $this, 'output_custom_dimensions' ) );
	}

	/**
	 * Available custom dimensions.
	 *
	 * @return array
	 */
	public function custom_dimensions() {
		return array(
			'author' => array(
				'title'   => __( 'Logged In User / Author', 'heretek-analytics' ),
				'label'   => __( 'Author', 'heretek-analytics' ),
				'tooltip' => __( 'Track top performing post authors.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'post_type' => array(
				'title'   => __( 'Post Type', 'heretek-analytics' ),
				'label'   => __( 'Post Type', 'heretek-analytics' ),
				'tooltip' => __( 'Track pageviews by WordPress post type.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'category' => array(
				'title'   => __( 'Category', 'heretek-analytics' ),
				'label'   => __( 'Category', 'heretek-analytics' ),
				'tooltip' => __( 'Track popularity across post categories.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'tags' => array(
				'title'   => __( 'Tags', 'heretek-analytics' ),
				'label'   => __( 'Tags', 'heretek-analytics' ),
				'tooltip' => __( 'Track popularity across post tags.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'seo_score' => array(
				'title'   => __( 'SEO Score', 'heretek-analytics' ),
				'label'   => __( 'SEO Score', 'heretek-analytics' ),
				'tooltip' => __( 'Track SEO score rankings from Yoast, Rank Math, or AIOSEO.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'logged_in' => array(
				'title'   => __( 'Logged In Status', 'heretek-analytics' ),
				'label'   => __( 'Logged In', 'heretek-analytics' ),
				'tooltip' => __( 'Distinguish logged-in vs logged-out traffic.', 'heretek-analytics' ),
				'metric'  => 'sessions',
				'enabled' => true,
			),
			'wp_user_id' => array(
				'title'   => __( 'User ID', 'heretek-analytics' ),
				'label'   => __( 'User ID', 'heretek-analytics' ),
				'tooltip' => __( 'Cross-device user ID tracking.', 'heretek-analytics' ),
				'metric'  => 'sessions',
				'enabled' => true,
			),
			'focus_keyword' => array(
				'title'   => __( 'Focus Keyword', 'heretek-analytics' ),
				'label'   => __( 'Focus Keyword', 'heretek-analytics' ),
				'tooltip' => __( 'Track pageviews by assigned SEO focus keyword.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
			'publish_time' => array(
				'title'   => __( 'Publish Time', 'heretek-analytics' ),
				'label'   => __( 'Publish Time', 'heretek-analytics' ),
				'tooltip' => __( 'Track best time of day/week to publish.', 'heretek-analytics' ),
				'metric'  => 'screenPageViews',
				'enabled' => true,
			),
		);
	}

	/**
	 * Output custom dimensions in frontend tracking options.
	 *
	 * @param array $options
	 * @return array
	 */
	public function output_custom_dimensions( $options = array() ) {
		if ( ! is_array( $options ) ) {
			$options = array();
		}

		// Logged in dimension
		$options['logged_in'] = is_user_logged_in() ? 'true' : 'false';

		// User ID if logged in
		if ( is_user_logged_in() ) {
			$options['wp_user_id'] = (string) get_current_user_id();
		}

		if ( is_singular() ) {
			global $post;
			if ( ! empty( $post ) ) {
				// Author
				$options['author'] = get_the_author_meta( 'display_name', $post->post_author );

				// Post Type
				$options['post_type'] = $post->post_type;

				// Categories
				$categories = get_the_category( $post->ID );
				if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
					$options['category'] = $categories[0]->name;
				}

				// Tags
				$tags = get_the_tags( $post->ID );
				if ( ! empty( $tags ) && ! is_wp_error( $tags ) ) {
					$options['tags'] = implode( ', ', wp_list_pluck( $tags, 'name' ) );
				}

				// Publish Time
				$options['publish_time'] = get_the_date( 'l, F jS, Y 	 g:ia', $post );

				// SEO Score integration (Yoast / Rank Math / AIOSEO)
				$yoast_score = get_post_meta( $post->ID, '_yoast_wpseo_linkdex', true );
				if ( $yoast_score !== '' && is_numeric( $yoast_score ) ) {
					$score_num = (int) $yoast_score;
					if ( $score_num >= 70 ) {
						$options['seo_score'] = 'Good';
					} elseif ( $score_num >= 40 ) {
						$options['seo_score'] = 'OK';
					} else {
						$options['seo_score'] = 'Needs Improvement';
					}
				}

				// Focus keyword
				$keyword = get_post_meta( $post->ID, '_yoast_wpseo_focuskw', true );
				if ( empty( $keyword ) ) {
					$keyword = get_post_meta( $post->ID, 'rank_math_focus_keyword', true );
				}
				if ( ! empty( $keyword ) ) {
					$options['focus_keyword'] = (string) $keyword;
				}
			}
		}

		return apply_filters( 'heretek_analytics_custom_dimensions_frontend', $options );
	}
}

// Aliases for compatibility
if ( ! class_exists( 'MonsterInsights_Admin_Custom_Dimensions' ) ) {
	class_alias( 'Heretek_Custom_Dimensions', 'MonsterInsights_Admin_Custom_Dimensions' );
}
if ( ! class_exists( 'MonsterInsights_Custom_Dimensions' ) ) {
	class_alias( 'Heretek_Custom_Dimensions', 'MonsterInsights_Custom_Dimensions' );
}
