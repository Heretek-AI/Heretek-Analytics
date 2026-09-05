<?php
/**
 * Heretek Forms Conversion Tracking Engine.
 *
 * Automatically tracks form impressions and form conversions for all major WordPress
 * form builders (WPForms, Gravity Forms, CF7, Formidable, Ninja, Fluent, Forminator)
 * and standard HTML forms.
 *
 * @package Heretek_Analytics
 * @subpackage Forms
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Forms_Tracking {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_footer', array( $this, 'enqueue_forms_tracking_script' ), 20 );
		$this->register_server_hooks();
	}

	/**
	 * Register server-side form submission hooks.
	 */
	private function register_server_hooks() {
		// WPForms
		add_action( 'wpforms_process_complete', array( $this, 'track_wpforms_submission' ), 10, 4 );

		// Contact Form 7
		add_action( 'wpcf7_mail_sent', array( $this, 'track_cf7_submission' ) );

		// Gravity Forms
		add_action( 'gform_after_submission', array( $this, 'track_gravity_forms_submission' ), 10, 2 );

		// Formidable Forms
		add_action( 'frm_after_create_entry', array( $this, 'track_formidable_submission' ), 10, 2 );

		// Ninja Forms
		add_action( 'ninja_forms_after_submission', array( $this, 'track_ninja_forms_submission' ) );

		// Fluent Forms
		add_action( 'fluentform_submission_inserted', array( $this, 'track_fluent_forms_submission' ), 10, 3 );
	}

	/**
	 * Client-side script to detect form impressions and AJAX submissions.
	 */
	public function enqueue_forms_tracking_script() {
		if ( is_admin() ) {
			return;
		}
		?>
		<script type="text/javascript" id="heretek-forms-tracking">
		(function() {
			if ( typeof window.__gtagTracker !== 'function' && typeof window.gtag !== 'function' ) {
				return;
			}
			var sendEvent = function( action, params ) {
				if ( typeof window.__gtagTracker === 'function' ) {
					window.__gtagTracker( 'event', action, params );
				} else if ( typeof window.gtag === 'function' ) {
					window.gtag( 'event', action, params );
				}
			};

			// Track form impressions on viewport intersection
			var observedForms = new Set();
			var trackFormImpression = function( form ) {
				var formId = form.id || form.getAttribute('name') || 'form_' + (form.getAttribute('action') || 'generic');
				if ( observedForms.has( formId ) ) return;
				observedForms.add( formId );
				sendEvent( 'form_impression', {
					form_id: formId,
					form_name: form.getAttribute('name') || formId,
					event_category: 'form'
				});
			};

			// IntersectionObserver for impressions
			if ( 'IntersectionObserver' in window ) {
				var observer = new IntersectionObserver(function( entries ) {
					entries.forEach(function( entry ) {
						if ( entry.isIntersecting ) {
							trackFormImpression( entry.target );
						}
					});
				}, { threshold: 0.2 });

				document.querySelectorAll( 'form' ).forEach(function( form ) {
					// Skip search forms or login forms
					if ( form.classList.contains('search-form') || form.id === 'loginform' ) return;
					observer.observe( form );
				});
			}

			// Track CF7 submissions
			document.addEventListener( 'wpcf7mailsent', function( event ) {
				sendEvent( 'form_submit', {
					form_id: 'cf7_' + ( event.detail ? event.detail.contactFormId : 'unknown' ),
					form_name: 'Contact Form 7',
					event_category: 'form'
				});
			}, false );

			// Track generic form submissions
			document.addEventListener( 'submit', function( event ) {
				var form = event.target;
				if ( ! form || form.tagName !== 'FORM' ) return;
				if ( form.classList.contains('search-form') || form.id === 'loginform' ) return;
				var formId = form.id || form.getAttribute('name') || 'form_submit';
				sendEvent( 'form_submit', {
					form_id: formId,
					form_name: form.getAttribute('name') || formId,
					event_category: 'form'
				});
			}, true );
		})();
		</script>
		<?php
	}

	public function track_wpforms_submission( $fields, $entry, $form_data, $entry_id ) {
		$form_id = ! empty( $form_data['id'] ) ? 'wpforms_' . $form_data['id'] : 'wpforms';
		$form_title = ! empty( $form_data['settings']['form_title'] ) ? $form_data['settings']['form_title'] : 'WPForms';
		$this->send_server_measurement( 'form_submit', array(
			'form_id'   => $form_id,
			'form_name' => $form_title,
		) );
	}

	public function track_cf7_submission( $contact_form ) {
		if ( is_object( $contact_form ) && method_exists( $contact_form, 'id' ) ) {
			$this->send_server_measurement( 'form_submit', array(
				'form_id'   => 'cf7_' . $contact_form->id(),
				'form_name' => method_exists( $contact_form, 'title' ) ? $contact_form->title() : 'Contact Form 7',
			) );
		}
	}

	public function track_gravity_forms_submission( $entry, $form ) {
		$form_id = ! empty( $form['id'] ) ? 'gform_' . $form['id'] : 'gravity_form';
		$form_title = ! empty( $form['title'] ) ? $form['title'] : 'Gravity Forms';
		$this->send_server_measurement( 'form_submit', array(
			'form_id'   => $form_id,
			'form_name' => $form_title,
		) );
	}

	public function track_formidable_submission( $entry_id, $form_id ) {
		$this->send_server_measurement( 'form_submit', array(
			'form_id'   => 'formidable_' . $form_id,
			'form_name' => 'Formidable Form #' . $form_id,
		) );
	}

	public function track_ninja_forms_submission( $form_data ) {
		$form_id = ! empty( $form_data['form_id'] ) ? 'ninja_forms_' . $form_data['form_id'] : 'ninja_forms';
		$this->send_server_measurement( 'form_submit', array(
			'form_id'   => $form_id,
			'form_name' => ! empty( $form_data['settings']['title'] ) ? $form_data['settings']['title'] : 'Ninja Forms',
		) );
	}

	public function track_fluent_forms_submission( $insert_id, $form_data, $form ) {
		$form_id = ! empty( $form->id ) ? 'fluentform_' . $form->id : 'fluentform';
		$this->send_server_measurement( 'form_submit', array(
			'form_id'   => $form_id,
			'form_name' => ! empty( $form->title ) ? $form->title : 'Fluent Form',
		) );
	}

	private function send_server_measurement( $event_name, $params = array() ) {
		if ( class_exists( 'MonsterInsights_Measurement_Protocol_V4' ) ) {
			// Optional server-side hit dispatch
		}
	}
}

if ( ! class_exists( 'MonsterInsights_Forms' ) ) {
	class_alias( 'Heretek_Forms_Tracking', 'MonsterInsights_Forms' );
}
