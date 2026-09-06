<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Heretek_Analytics_Measurement_Protocol_V4 {
	private static $instance;

	public static function get_instance() {
		if ( empty( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private $is_debug;

	private $measurement_id;

	private $schema;

	private function __construct() {
		$this->is_debug       = function_exists( 'heretekanalytics_is_debug_mode' ) ? heretekanalytics_is_debug_mode() : monsterinsights_is_debug_mode();
		$this->measurement_id = function_exists( 'heretekanalytics_get_v4_id_to_output' ) ? heretekanalytics_get_v4_id_to_output() : monsterinsights_get_v4_id_to_output();

		$this->schema = array(
			'currency'       => 'string',
			'value'          => 'money',
			'coupon'         => 'string',
			'transaction_id' => 'string',
			'affiliation'    => 'string',
			'shipping'       => 'double',
			'tax'            => 'double',
			'user_id'        => 'string',
			'items'          => array(
				'item_id'        => 'string',
				'item_name'      => 'string',
				'affiliation'    => 'string',
				'coupon'         => 'string',
				'currency'       => 'string',
				'discount'       => 'double',
				'index'          => 'integer',
				'item_brand'     => 'string',
				'item_category'  => 'string',
				'item_list_id'   => 'string',
				'item_list_name' => 'string',
				'item_variant'   => 'string',
				'location_id'    => 'string',
				'price'          => 'money',
				'quantity'       => 'integer',
			),
		);
	}

	private function get_base_url() {
		return 'https://www.google-analytics.com/mp/collect';
	}

	private function get_url() {
		$auth = function_exists( 'HeretekAnalytics' ) ? HeretekAnalytics()->auth : MonsterInsights()->auth;
		$api_secret = is_multisite() && is_network_admin()
			? $auth->get_network_measurement_protocol_secret()
			: $auth->get_measurement_protocol_secret();

		return add_query_arg(
			array(
				'api_secret'     => apply_filters( 'heretekanalytics_get_mp_call_secret', apply_filters( 'monsterinsights_get_mp_call_secret', $api_secret ) ),
				'measurement_id' => $this->measurement_id,
			),
			$this->get_base_url()
		);
	}

	private function get_client_id( $args ) {
		if ( ! empty( $args['client_id'] ) ) {
			return $args['client_id'];
		}

		$payment_id = 0;
		if ( ! empty( $args['payment_id'] ) ) {
			$payment_id = $args['payment_id'];
		}

		return function_exists( 'heretekanalytics_get_client_id' ) ? heretekanalytics_get_client_id( $payment_id ) : monsterinsights_get_client_id( $payment_id );
	}

	private function sanitize_event( $params, $schema ) {
		$sanitized_params = array();

		foreach ( $params as $key => $value ) {
			// Skip empty string values to prevent sending invalid data to Google
			// Google may reject events with empty string parameters
			if ( $value === '' && $key !== 'transaction_id' ) {
				continue;
			}

			if ( ! array_key_exists( $key, $schema ) ||
				 ( ! is_array( $value ) && gettype( $value ) === $schema[ $key ] )
			) {
				$sanitized_params[ $key ] = $value;
				continue;
			}

			if ( is_array( $value ) && is_array( $schema[ $key ] ) ) {
				$sanitized_params[ $key ] = array();
				foreach ( $value as $item_index => $item ) {
					$sanitized_params[ $key ][ $item_index ] = $this->sanitize_event( $item, $schema[ $key ] );
				}
				continue;
			}

			switch ( $schema[ $key ] ) {
				case 'string':
					$sanitized_params[ $key ] = (string) $value;
					break;

				case 'double':
					$sanitized_params[ $key ] = (float) $value;
					break;

				case 'integer':
					$sanitized_params[ $key ] = (int) $value;
					break;

				case 'money':
					// Heretek Analytics ships without the upstream
					// MonsterInsights_eCommerce_Helper::round_price helper;
					// cast directly to float with two-decimal precision.
					$sanitized_params[ $key ] = round( (float) $value, 2 );
					break;
			}
		}

		return $sanitized_params;
	}

	private function validate_args( $args, $defaults ) {
		$out = array();

		foreach ( $defaults as $key => $default ) {
			if ( array_key_exists( $key, $args ) ) {
				$out[ $key ] = $args[ $key ];
			} else {
				$out[ $key ] = $default;
			}
		}

		$userid_opt = function_exists( 'heretekanalytics_get_option' ) ? heretekanalytics_get_option( 'userid', false ) : monsterinsights_get_option( 'userid', false );
		if ( ! empty( $args['user_id'] ) && $userid_opt ) {
			$out['user_id'] = (string) $args['user_id'];
		}

		foreach ( $out['events'] as $event_index => $event ) {
			$sanitized_event         = array();
			$sanitized_event['name'] = (string) $event['name'];

			if ( ! empty( $event['params'] ) ) {
				$sanitized_event['params'] = $this->sanitize_event( $event['params'], $this->schema );
			}

			$out['events'][ $event_index ] = $sanitized_event;
		}

		return $out;
	}

	private function request( $args ) {
		if ( empty( $this->measurement_id ) ) {
			return;
		}

		$session_id = function_exists( 'heretekanalytics_get_browser_session_id' )
			? heretekanalytics_get_browser_session_id( $this->measurement_id )
			: monsterinsights_get_browser_session_id( $this->measurement_id );

		$defaults = array(
			'client_id' => $this->get_client_id( $args ),
			'events'    => array(),
			'consent' => array(
				'ad_personalization' => 'GRANTED',
			),
		);

		$body = $this->validate_args( $args, $defaults );

		foreach ( $body['events'] as $index => $event ) {

			//  Provide a default session id if not set already.
			if ( !empty( $session_id ) && empty( $body['events'][$index]['params']['session_id'] ) ) {
				$body['events'][$index]['params']['session_id'] = $session_id;
			}

			if ( $this->is_debug ) {
				$body['events'][ $index ]['params']['debug_mode'] = true;
			}
		}

		$body = apply_filters( 'heretekanalytics_mp_v4_api_call', apply_filters( 'monsterinsights_mp_v4_api_call', $body ) );

		return wp_remote_post(
			$this->get_url(),
			array(
				'method'   => 'POST',
				'timeout'  => 5, // phpcs:ignore
				'blocking' => $this->is_debug,
				'body'     => wp_json_encode( $body ),
			)
		);
	}

	public function collect( $args ) {
		// Detect if browser request is a prefetch
		if ( ( isset( $_SERVER["HTTP_X_PURPOSE"] ) && ( 'prefetch' === strtolower( sanitize_text_field($_SERVER["HTTP_X_PURPOSE"]) ) ) ) ||
			 ( isset( $_SERVER["HTTP_X_MOZ"] ) && ( 'prefetch' === strtolower( sanitize_text_field($_SERVER["HTTP_X_MOZ"]) ) ) ) ) {
			return;
		}

		return $this->request( $args );
	}
}

if ( ! class_exists( 'MonsterInsights_Measurement_Protocol_V4' ) ) {
	class_alias( 'Heretek_Analytics_Measurement_Protocol_V4', 'MonsterInsights_Measurement_Protocol_V4' );
}

function heretekanalytics_mp_collect_v4( $args ) {
	return Heretek_Analytics_Measurement_Protocol_V4::get_instance()->collect( $args );
}

function monsterinsights_mp_collect_v4( $args ) {
	return heretekanalytics_mp_collect_v4( $args );
}
