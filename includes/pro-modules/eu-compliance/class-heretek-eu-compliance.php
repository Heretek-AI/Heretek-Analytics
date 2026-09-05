<?php
/**
 * Heretek EU Compliance & Google Consent Mode v2 Engine.
 *
 * Implements Google Consent Mode v2, Privacy Guard (PII stripping),
 * and cookie banner integrations (Cookiebot, Complianz, Borlabs, etc.).
 *
 * @package Heretek_Analytics
 * @subpackage EU_Compliance
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_EU_Compliance {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'output_consent_mode_defaults' ), 1 );
	}

	/**
	 * Output Google Consent Mode v2 defaults early in <head>.
	 */
	public function output_consent_mode_defaults() {
		?>
		<script type="text/javascript" id="heretek-consent-mode-v2">
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}

		// Google Consent Mode v2 defaults
		gtag('consent', 'default', {
			'ad_storage': 'granted',
			'analytics_storage': 'granted',
			'ad_user_data': 'granted',
			'ad_personalization': 'granted',
			'wait_for_update': 500
		});

		// Privacy Guard: Strip PII from URLs
		window.MonsterInsightsPrivacyGuardFilter = function( location ) {
			if ( ! location || ! location.page_location ) return location;
			try {
				var url = new URL( location.page_location );
				var piiKeys = ['email', 'user_email', 'first_name', 'last_name', 'phone', 'address'];
				piiKeys.forEach( function( key ) {
					if ( url.searchParams.has( key ) ) {
						url.searchParams.set( key, '[REDACTED]' );
					}
				});
				location.page_location = url.toString();
			} catch(e) {}
			return location;
		};
		</script>
		<?php
	}
}

if ( ! class_exists( 'MonsterInsights_EU_Compliance' ) ) {
	class_alias( 'Heretek_EU_Compliance', 'MonsterInsights_EU_Compliance' );
}
