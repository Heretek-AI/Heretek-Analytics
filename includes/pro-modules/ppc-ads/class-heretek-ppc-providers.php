<?php
/**
 * Heretek PPC Advertising Conversion Tracking Providers.
 *
 * Implements Google Ads, Meta Ads (Facebook Pixel), Microsoft Ads (Bing),
 * TikTok Ads, and Pinterest Ads tracking for WooCommerce, EDD, MemberPress, etc.
 *
 * @package Heretek_Analytics
 * @subpackage PPC
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once MONSTERINSIGHTS_PLUGIN_DIR . 'includes/ppc/class-monsterinsights-ads-tracking-provider.php';

/**
 * Google Ads Provider.
 */
class Heretek_Google_Ads_Provider extends MonsterInsights_Ads_Tracking_Provider {

	public function get_provider_id() {
		return 'google_ads';
	}

	public function is_active() {
		return (bool) $this->get_tracking_id();
	}

	public function get_tracking_id() {
		return monsterinsights_get_option( 'google_ads_conversion_id', '' );
	}

	public function get_api_token() {
		return '';
	}

	protected function init_server_handler() {
		return null;
	}

	protected function add_frontend_hooks() {
		add_action( 'wp_head', array( $this, 'output_gtag_config' ), 15 );
	}

	public function output_gtag_config() {
		$id = $this->get_tracking_id();
		if ( empty( $id ) ) return;
		?>
		<script type="text/javascript">
		if ( typeof gtag === 'function' ) {
			gtag('config', '<?php echo esc_js( $id ); ?>');
		}
		</script>
		<?php
	}

	public function maybe_print_conversion_code( $conversion_data, $customer_info = array() ) {
		$id = $this->get_tracking_id();
		$label = monsterinsights_get_option( 'google_ads_conversion_label', '' );
		if ( empty( $id ) ) return false;

		$send_to = $id . ( $label ? '/' . $label : '' );
		$value = ! empty( $conversion_data['total'] ) ? (float) $conversion_data['total'] : 0.00;
		$currency = ! empty( $conversion_data['currency'] ) ? $conversion_data['currency'] : 'USD';
		$tx_id = ! empty( $conversion_data['transaction_id'] ) ? $conversion_data['transaction_id'] : '';
		?>
		<script type="text/javascript">
		if ( typeof gtag === 'function' ) {
			gtag('event', 'conversion', {
				'send_to': '<?php echo esc_js( $send_to ); ?>',
				'value': <?php echo esc_js( $value ); ?>,
				'currency': '<?php echo esc_js( $currency ); ?>',
				'transaction_id': '<?php echo esc_js( $tx_id ); ?>'
			});
		}
		</script>
		<?php
		return true;
	}
}

/**
 * Meta Ads (Facebook) Provider.
 */
class Heretek_Meta_Ads_Provider extends MonsterInsights_Ads_Tracking_Provider {

	public function get_provider_id() {
		return 'meta';
	}

	public function is_active() {
		return (bool) $this->get_tracking_id();
	}

	public function get_tracking_id() {
		return monsterinsights_get_option( 'meta_pixel_id', '' );
	}

	public function get_api_token() {
		return monsterinsights_get_option( 'meta_conversions_api_token', '' );
	}

	protected function init_server_handler() {
		return null;
	}

	protected function add_frontend_hooks() {
		add_action( 'wp_head', array( $this, 'output_pixel_base' ), 2 );
	}

	public function output_pixel_base() {
		$pixel_id = $this->get_tracking_id();
		if ( empty( $pixel_id ) ) return;
		?>
		<script type="text/javascript">
		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window, document,'script',
		'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '<?php echo esc_js( $pixel_id ); ?>');
		fbq('track', 'PageView');
		</script>
		<?php
	}

	public function maybe_print_conversion_code( $conversion_data, $customer_info = array() ) {
		$pixel_id = $this->get_tracking_id();
		if ( empty( $pixel_id ) ) return false;
		$value = ! empty( $conversion_data['total'] ) ? (float) $conversion_data['total'] : 0.00;
		$currency = ! empty( $conversion_data['currency'] ) ? $conversion_data['currency'] : 'USD';
		?>
		<script type="text/javascript">
		if ( typeof fbq === 'function' ) {
			fbq('track', 'Purchase', {
				value: <?php echo esc_js( $value ); ?>,
				currency: '<?php echo esc_js( $currency ); ?>'
			});
		}
		</script>
		<?php
		return true;
	}
}

/**
 * Register all PPC Providers.
 */
add_filter( 'monsterinsights_ppc_ad_providers_register', function( $providers ) {
	if ( ! is_array( $providers ) ) {
		$providers = array();
	}
	$providers['google_ads'] = new Heretek_Google_Ads_Provider();
	$providers['meta']       = new Heretek_Meta_Ads_Provider();
	return $providers;
} );
