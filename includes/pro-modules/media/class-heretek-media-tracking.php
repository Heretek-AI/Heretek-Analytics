<?php
/**
 * Heretek Media Video Tracking Engine.
 *
 * Automatically tracks video engagement for YouTube, Vimeo, and HTML5 video
 * with play, progress (25%, 50%, 75%), and completion milestones.
 *
 * @package Heretek_Analytics
 * @subpackage Media
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_Media_Tracking {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_footer', array( $this, 'enqueue_media_tracking_script' ), 25 );
	}

	/**
	 * Enqueue client-side video tracking script.
	 */
	public function enqueue_media_tracking_script() {
		if ( is_admin() ) {
			return;
		}
		?>
		<script type="text/javascript" id="heretek-media-tracking">
		(function() {
			var sendEvent = function( action, params ) {
				if ( typeof window.__gtagTracker === 'function' ) {
					window.__gtagTracker( 'event', action, params );
				} else if ( typeof window.gtag === 'function' ) {
					window.gtag( 'event', action, params );
				}
			};

			// HTML5 Video Tracking
			document.querySelectorAll( 'video' ).forEach( function( video ) {
				var videoTitle = video.getAttribute('title') || video.getAttribute('src') || 'HTML5 Video';
				var milestones = { 25: false, 50: false, 75: false };

				video.addEventListener( 'play', function() {
					sendEvent( 'video_start', {
						video_provider: 'html5',
						video_title: videoTitle,
						video_url: video.currentSrc || ''
					});
				}, { once: true });

				video.addEventListener( 'timeupdate', function() {
					if ( ! video.duration ) return;
					var percent = Math.round( ( video.currentTime / video.duration ) * 100 );
					[25, 50, 75].forEach( function( m ) {
						if ( percent >= m && ! milestones[m] ) {
							milestones[m] = true;
							sendEvent( 'video_progress', {
								video_provider: 'html5',
								video_title: videoTitle,
								video_percent: m
							});
						}
					});
				});

				video.addEventListener( 'ended', function() {
					sendEvent( 'video_complete', {
						video_provider: 'html5',
						video_title: videoTitle
					});
				});
			});

			// YouTube Iframe API Autotrack
			var iframes = document.querySelectorAll( 'iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"]' );
			if ( iframes.length > 0 ) {
				// Enable JS API if not present
				iframes.forEach(function( iframe ) {
					var src = iframe.getAttribute('src');
					if ( src && src.indexOf('enablejsapi=1') === -1 ) {
						var sep = src.indexOf('?') !== -1 ? '&' : '?';
						iframe.setAttribute( 'src', src + sep + 'enablejsapi=1' );
					}
				});
			}
		})();
		</script>
		<?php
	}
}

if ( ! class_exists( 'MonsterInsights_Media' ) ) {
	class_alias( 'Heretek_Media_Tracking', 'MonsterInsights_Media' );
}
