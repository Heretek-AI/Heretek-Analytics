<?php
/**
 * Heretek Analytics — WordPress Dashboard Widget.
 *
 * Adds an executive telemetry widget to wp-admin/index.php.
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Heretek Analytics dashboard widget.
 */
function heretek_register_dashboard_widget() {
	if ( ! current_user_can( 'heretekanalytics_view_dashboard' ) ) {
		return;
	}

	wp_add_dashboard_widget(
		'heretek_analytics_dashboard_widget',
		__( 'Heretek Analytics — Telemetry Augur', 'google-analytics-for-wordpress' ),
		'heretek_render_dashboard_widget'
	);
}
add_action( 'wp_dashboard_setup', 'heretek_register_dashboard_widget' );

/**
 * Render the dashboard widget markup.
 */
function heretek_render_dashboard_widget() {
	$auth    = HeretekAnalytics()->auth;
	$v4      = $auth->get_manual_v4_id();
	$prop_id = $auth->get_property_id();
	$has_sa  = (bool) $auth->get_service_account_json();

	$reports_url  = admin_url( 'admin.php?page=heretekanalytics_reports' );
	$settings_url = admin_url( 'admin.php?page=heretekanalytics_settings' );

	if ( empty( $v4 ) || empty( $prop_id ) || ! $has_sa ) {
		?>
		<div class="htk-widget-void" style="background:#09090c;color:#a1a1aa;padding:18px;border-radius:6px;font-family:'Geist',sans-serif;font-size:13px;border-left:3px solid #dc2626;">
			<p style="margin:0 0 10px;color:#f4f4f5;font-weight:600;">
				<?php esc_html_e( 'GA4 Telemetry Stream Inactive', 'google-analytics-for-wordpress' ); ?>
			</p>
			<p style="margin:0 0 12px;font-size:12px;line-height:1.5;">
				<?php esc_html_e( 'Connect your GA4 Measurement ID, Property ID, and Google Cloud service account JSON in Settings to activate the Telemetry Augur.', 'google-analytics-for-wordpress' ); ?>
			</p>
			<a href="<?php echo esc_url( $settings_url ); ?>" class="button button-primary" style="background:#dc2626;border-color:#b91c1c;">
				<?php esc_html_e( 'Configure Settings', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>
		<?php
		return;
	}

	if ( ! class_exists( 'Heretek_Rest_Reporting_Gateway' ) ) {
		require_once HERETEK_ANALYTICS_PLUGIN_DIR . 'includes/api/class-heretek-rest-reporting-gateway.php';
	}
	$gateway = new Heretek_Rest_Reporting_Gateway();

	// Cache widget data for 30 minutes
	$cache_key = 'heretek_ga4_widget_' . $prop_id;
	$telemetry = get_transient( $cache_key );
	if ( false === $telemetry || ! is_array( $telemetry ) ) {
		$telemetry = $gateway->get_dashboard_telemetry( '-30days', 'today', false );
		if ( ! empty( $telemetry['kpis'] ) ) {
			set_transient( $cache_key, $telemetry, 1800 );
		}
	}

	$kpis       = isset( $telemetry['kpis'] ) ? $telemetry['kpis'] : array();
	$reports    = isset( $telemetry['reports'] ) ? $telemetry['reports'] : array();
	$top_pages  = isset( $reports['top_pages']['rows'] ) && is_array( $reports['top_pages']['rows'] ) ? $reports['top_pages']['rows'] : array();

	$fmt_num = static function( $v ) {
		$v = (int) $v;
		if ( $v >= 1000000 ) {
			return number_format( $v / 1000000, 1 ) . 'M';
		}
		if ( $v >= 1000 ) {
			return number_format( $v / 1000, 1 ) . 'K';
		}
		return number_format( $v );
	};

	$sessions_val = isset( $kpis['sessions']['value'] ) ? $kpis['sessions']['value'] : 0;
	$sessions_pct = isset( $kpis['sessions']['delta'] ) ? $kpis['sessions']['delta'] : 0;
	$users_val    = isset( $kpis['users']['value'] ) ? $kpis['users']['value'] : 0;
	$users_pct    = isset( $kpis['users']['delta'] ) ? $kpis['users']['delta'] : 0;
	$views_val    = isset( $kpis['pageviews']['value'] ) ? $kpis['pageviews']['value'] : 0;
	$views_pct    = isset( $kpis['pageviews']['delta'] ) ? $kpis['pageviews']['delta'] : 0;
	$eng_val      = isset( $kpis['engagement_rate']['value'] ) ? $kpis['engagement_rate']['value'] : 0;
	$eng_pct      = isset( $kpis['engagement_rate']['delta'] ) ? $kpis['engagement_rate']['delta'] : 0;
	?>
	<div class="htk-widget-wrap" style="background:#09090d;padding:16px;border-radius:6px;color:#e4e4e7;font-family:'Geist',sans-serif;">
		<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid #1c1c28;padding-bottom:10px;">
			<div style="display:flex;align-items:center;gap:6px;">
				<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
				<span style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:#10b981;text-transform:uppercase;">
					<?php esc_html_e( 'Telemetry Active', 'google-analytics-for-wordpress' ); ?>
				</span>
			</div>
			<span style="font-size:11px;color:#71717a;font-family:monospace;">
				<?php echo esc_html( $v4 ); ?>
			</span>
		</div>

		<!-- 4 Mini KPIs -->
		<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
			<div style="background:#111118;border:1px solid #20202c;border-radius:6px;padding:10px 12px;border-left:3px solid #dc2626;">
				<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#a1a1aa;margin-bottom:4px;"><?php esc_html_e( 'Sessions (30d)', 'google-analytics-for-wordpress' ); ?></div>
				<div style="font-size:18px;font-weight:700;color:#f4f4f5;font-family:monospace;"><?php echo esc_html( $fmt_num( $sessions_val ) ); ?></div>
				<div style="font-size:11px;color:<?php echo $sessions_pct >= 0 ? '#10b981' : '#ef4444'; ?>;font-weight:600;margin-top:2px;">
					<?php echo ( $sessions_pct >= 0 ? '+' : '' ) . esc_html( $sessions_pct ) . '%'; ?>
				</div>
			</div>
			<div style="background:#111118;border:1px solid #20202c;border-radius:6px;padding:10px 12px;border-left:3px solid #ef4444;">
				<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#a1a1aa;margin-bottom:4px;"><?php esc_html_e( 'Active Users', 'google-analytics-for-wordpress' ); ?></div>
				<div style="font-size:18px;font-weight:700;color:#f4f4f5;font-family:monospace;"><?php echo esc_html( $fmt_num( $users_val ) ); ?></div>
				<div style="font-size:11px;color:<?php echo $users_pct >= 0 ? '#10b981' : '#ef4444'; ?>;font-weight:600;margin-top:2px;">
					<?php echo ( $users_pct >= 0 ? '+' : '' ) . esc_html( $users_pct ) . '%'; ?>
				</div>
			</div>
			<div style="background:#111118;border:1px solid #20202c;border-radius:6px;padding:10px 12px;border-left:3px solid #dc2626;">
				<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#a1a1aa;margin-bottom:4px;"><?php esc_html_e( 'Page Views', 'google-analytics-for-wordpress' ); ?></div>
				<div style="font-size:18px;font-weight:700;color:#f4f4f5;font-family:monospace;"><?php echo esc_html( $fmt_num( $views_val ) ); ?></div>
				<div style="font-size:11px;color:<?php echo $views_pct >= 0 ? '#10b981' : '#ef4444'; ?>;font-weight:600;margin-top:2px;">
					<?php echo ( $views_pct >= 0 ? '+' : '' ) . esc_html( $views_pct ) . '%'; ?>
				</div>
			</div>
			<div style="background:#111118;border:1px solid #20202c;border-radius:6px;padding:10px 12px;border-left:3px solid #ef4444;">
				<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#a1a1aa;margin-bottom:4px;"><?php esc_html_e( 'Engagement', 'google-analytics-for-wordpress' ); ?></div>
				<div style="font-size:18px;font-weight:700;color:#f4f4f5;font-family:monospace;"><?php echo esc_html( $eng_val ); ?>%</div>
				<div style="font-size:11px;color:<?php echo $eng_pct >= 0 ? '#10b981' : '#ef4444'; ?>;font-weight:600;margin-top:2px;">
					<?php echo ( $eng_pct >= 0 ? '+' : '' ) . esc_html( $eng_pct ) . '%'; ?>
				</div>
			</div>
		</div>

		<!-- Top 4 Pages -->
		<?php if ( ! empty( $top_pages ) ) : ?>
		<div style="margin-bottom:14px;">
			<div style="font-size:11px;text-transform:uppercase;font-weight:700;letter-spacing:0.06em;color:#a1a1aa;margin-bottom:8px;">
				<?php esc_html_e( 'Top Pages', 'google-analytics-for-wordpress' ); ?>
			</div>
			<div style="display:flex;flex-direction:column;gap:6px;">
				<?php
				$count = 0;
				foreach ( $top_pages as $p ) :
					if ( ++$count > 4 ) {
						break;
					}
					$title = ! empty( $p['d'][0] ) ? (string) $p['d'][0] : '';
					$path  = ! empty( $p['d'][1] ) ? (string) $p['d'][1] : '';
					$views = ! empty( $p['m'][0]['value'] ) ? (int) $p['m'][0]['value'] : 0;
					$label = '' !== $title ? $title : $path;
					?>
					<div style="display:flex;justify-content:space-between;align-items:center;background:#111118;padding:6px 10px;border-radius:4px;font-size:12px;">
						<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:210px;color:#d4d4d8;" title="<?php echo esc_attr( $label ); ?>">
							<?php echo esc_html( $label ); ?>
						</span>
						<span style="font-family:monospace;font-weight:600;color:#fca5a5;"><?php echo esc_html( $fmt_num( $views ) ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php endif; ?>

		<div style="text-align:right;border-top:1px solid #1c1c28;padding-top:10px;">
			<a href="<?php echo esc_url( $reports_url ); ?>" style="color:#fca5a5;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:0.02em;">
				<?php esc_html_e( 'Launch Full Augur Cockpit →', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>
	</div>
	<?php
}
