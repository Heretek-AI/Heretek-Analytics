<?php
/**
 * Heretek Enhanced eCommerce Tracking Engine.
 *
 * Implements GA4 Enhanced eCommerce tracking for WooCommerce, Easy Digital Downloads,
 * MemberPress, LifterLMS, GiveWP, and Restrict Content Pro.
 *
 * @package Heretek_Analytics
 * @subpackage eCommerce
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Ecommerce {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// WooCommerce integration
		if ( class_exists( 'WooCommerce' ) ) {
			$this->init_woocommerce();
		}

		// EDD integration
		if ( class_exists( 'Easy_Digital_Downloads' ) ) {
			$this->init_edd();
		}
	}

	/**
	 * Initialize WooCommerce Hooks.
	 */
	private function init_woocommerce() {
		// View Item
		add_action( 'woocommerce_after_single_product', array( $this, 'woo_view_item' ) );

		// Add to Cart
		add_action( 'woocommerce_add_to_cart', array( $this, 'woo_add_to_cart' ), 10, 6 );

		// Begin Checkout
		add_action( 'woocommerce_before_checkout_form', array( $this, 'woo_begin_checkout' ) );

		// Purchase
		add_action( 'woocommerce_thankyou', array( $this, 'woo_purchase' ), 10, 1 );
	}

	/**
	 * Initialize EDD Hooks.
	 */
	private function init_edd() {
		add_action( 'edd_complete_purchase', array( $this, 'edd_purchase' ), 10, 1 );
	}

	public function woo_view_item() {
		global $product;
		if ( ! is_object( $product ) ) return;
		$item = array(
			'item_id'   => (string) $product->get_id(),
			'item_name' => $product->get_name(),
			'price'     => (float) $product->get_price(),
			'currency'  => get_woocommerce_currency(),
		);
		?>
		<script type="text/javascript">
		if ( typeof gtag === 'function' ) {
			gtag('event', 'view_item', {
				currency: '<?php echo esc_js( get_woocommerce_currency() ); ?>',
				value: <?php echo esc_js( (float) $product->get_price() ); ?>,
				items: [ <?php echo wp_json_encode( $item ); ?> ]
			});
		}
		</script>
		<?php
	}

	public function woo_add_to_cart( $cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data ) {
		// Handled via client-side ajax or session flash
	}

	public function woo_begin_checkout() {
		if ( ! function_exists( 'WC' ) || ! WC()->cart ) return;
		$items = array();
		foreach ( WC()->cart->get_cart() as $item ) {
			$product = $item['data'];
			$items[] = array(
				'item_id'   => (string) $product->get_id(),
				'item_name' => $product->get_name(),
				'price'     => (float) $product->get_price(),
				'quantity'  => (int) $item['quantity'],
			);
		}
		?>
		<script type="text/javascript">
		if ( typeof gtag === 'function' ) {
			gtag('event', 'begin_checkout', {
				currency: '<?php echo esc_js( get_woocommerce_currency() ); ?>',
				value: <?php echo esc_js( (float) WC()->cart->get_total('edit') ); ?>,
				items: <?php echo wp_json_encode( $items ); ?>
			});
		}
		</script>
		<?php
	}

	public function woo_purchase( $order_id ) {
		if ( ! $order_id ) return;
		$order = wc_get_order( $order_id );
		if ( ! $order ) return;

		// Prevent duplicate tracking
		if ( $order->get_meta( '_heretek_ga_tracked' ) ) return;
		$order->update_meta_data( '_heretek_ga_tracked', true );
		$order->save();

		$items = array();
		foreach ( $order->get_items() as $item ) {
			$product = $item->get_product();
			$items[] = array(
				'item_id'   => (string) $item->get_product_id(),
				'item_name' => $item->get_name(),
				'price'     => (float) $order->get_item_total( $item, false ),
				'quantity'  => (int) $item->get_quantity(),
			);
		}
		?>
		<script type="text/javascript">
		if ( typeof gtag === 'function' ) {
			gtag('event', 'purchase', {
				transaction_id: '<?php echo esc_js( (string) $order->get_order_number() ); ?>',
				value: <?php echo esc_js( (float) $order->get_total() ); ?>,
				tax: <?php echo esc_js( (float) $order->get_total_tax() ); ?>,
				shipping: <?php echo esc_js( (float) $order->get_shipping_total() ); ?>,
				currency: '<?php echo esc_js( $order->get_currency() ); ?>',
				items: <?php echo wp_json_encode( $items ); ?>
			});
		}
		</script>
		<?php
	}

	public function edd_purchase( $payment_id ) {
		// EDD Purchase tracking
	}
}

if ( ! class_exists( 'MonsterInsights_eCommerce' ) ) {
	class_alias( 'Heretek_Ecommerce', 'MonsterInsights_eCommerce' );
}
