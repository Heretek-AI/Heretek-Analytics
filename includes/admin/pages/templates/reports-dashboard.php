<?php
/**
 * Heretek Analytics — Augur Telemetry Cockpit Template.
 *
 * Rendered by monsterinsights_reports_page().
 *
 * @var string $v4
 * @var string $prop_id
 * @var bool   $has_sa
 * @var array  $telemetry
 * @var string $missing
 * @var string $error
 * @var string $start_date
 * @var string $end_date
 * @var string $start_input
 * @var string $end_input
 * @var string $settings_url
 *
 * @package Heretek_Analytics
 * @subpackage Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$kpis       = isset( $telemetry['kpis'] ) ? $telemetry['kpis'] : array();
$reports    = isset( $telemetry['reports'] ) ? $telemetry['reports'] : array();
$author_map = isset( $telemetry['author_lookup'] ) ? $telemetry['author_lookup'] : array();

$fmt_int = static function ( $value ) {
	$value = is_numeric( $value ) ? (int) $value : 0;
	if ( $value >= 1000000 ) {
		return number_format( $value / 1000000, 1 ) . 'M';
	}
	if ( $value >= 1000 ) {
		return number_format( $value / 1000, 1 ) . 'K';
	}
	return number_format( $value );
};

$fmt_dur = static function ( $sec ) {
	$sec = (int) round( $sec );
	$m   = floor( $sec / 60 );
	$s   = $sec % 60;
	return $m . 'm ' . ( $s < 10 ? '0' : '' ) . $s . 's';
};

$fmt_delta = static function ( $d ) {
	$d = (float) $d;
	return ( $d > 0 ? '+' : '' ) . number_format( $d, 1 ) . '%';
};

$icon_url = MONSTERINSIGHTS_PLUGIN_URL . 'assets/images/icon-sm.png';
?>

<div class="htk-cockpit">

	<!-- Master Header & Telemetry Bar -->
	<header class="htk-header">
		<div class="htk-header-brand">
			<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Analytics Emblem">
			<div class="htk-header-title">
				<h1>
					<?php esc_html_e( 'Augur Telemetry Cockpit', 'google-analytics-for-wordpress' ); ?>
					<span class="htk-badge-ver"><?php echo esc_html( MONSTERINSIGHTS_VERSION ); ?></span>
				</h1>
				<div class="htk-header-telemetry-meta">
					<?php if ( ! empty( $v4 ) && ! empty( $prop_id ) && $has_sa ) : ?>
						<span class="htk-status-indicator active">
							<span class="htk-status-dot"></span>
							<?php esc_html_e( 'Stream Active', 'google-analytics-for-wordpress' ); ?>
						</span>
						<span>&bull;</span>
						<span style="font-family:var(--htk-font-mono);">
							<?php echo esc_html( $v4 ); ?>
						</span>
						<span>&bull;</span>
						<span style="font-family:var(--htk-font-mono);">
							PID: <?php echo esc_html( $prop_id ); ?>
						</span>
						<span>&bull;</span>
						<span style="color:var(--htk-text-muted);font-size:11px;">
							<?php esc_html_e( 'Synced:', 'google-analytics-for-wordpress' ); ?> <span id="htk-last-synced"><?php echo esc_html( ! empty( $telemetry['updated_at'] ) ? $telemetry['updated_at'] : current_time( 'H:i:s' ) ); ?></span>
						</span>
					<?php else : ?>
						<span class="htk-status-indicator unconfigured">
							<span class="htk-status-dot"></span>
							<?php esc_html_e( 'Credentials Required', 'google-analytics-for-wordpress' ); ?>
						</span>
					<?php endif; ?>
				</div>
			</div>
		</div>

		<!-- Toolbar: Presets & Controls -->
		<div class="htk-toolbar">
			<div class="htk-presets-group" role="group" aria-label="<?php esc_attr_e( 'Date Presets', 'google-analytics-for-wordpress' ); ?>">
				<button type="button" class="htk-preset-btn" data-preset="today"><?php esc_html_e( 'Today', 'google-analytics-for-wordpress' ); ?></button>
				<button type="button" class="htk-preset-btn" data-preset="yesterday"><?php esc_html_e( 'Yesterday', 'google-analytics-for-wordpress' ); ?></button>
				<button type="button" class="htk-preset-btn" data-preset="7d"><?php esc_html_e( '7D', 'google-analytics-for-wordpress' ); ?></button>
				<button type="button" class="htk-preset-btn active" data-preset="30d"><?php esc_html_e( '30D', 'google-analytics-for-wordpress' ); ?></button>
				<button type="button" class="htk-preset-btn" data-preset="90d"><?php esc_html_e( '90D', 'google-analytics-for-wordpress' ); ?></button>
				<button type="button" class="htk-preset-btn" data-preset="custom"><?php esc_html_e( 'Custom', 'google-analytics-for-wordpress' ); ?></button>
			</div>

			<div class="htk-custom-dates" id="htk-custom-dates-wrap" style="display:none;">
				<input type="date" id="htk-input-start" class="htk-date-input" value="<?php echo esc_attr( $start_input ); ?>">
				<span style="color:var(--htk-text-muted);">&rarr;</span>
				<input type="date" id="htk-input-end" class="htk-date-input" value="<?php echo esc_attr( $end_input ); ?>">
				<button type="button" id="htk-btn-apply" class="htk-btn htk-btn-primary"><?php esc_html_e( 'Apply', 'google-analytics-for-wordpress' ); ?></button>
			</div>

			<button type="button" id="htk-btn-sync" class="htk-btn htk-btn-secondary" title="<?php esc_attr_e( 'Bust cache and pull fresh telemetry from GA4', 'google-analytics-for-wordpress' ); ?>">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
				</svg>
				<?php esc_html_e( 'Sync Telemetry', 'google-analytics-for-wordpress' ); ?>
			</button>

			<a href="<?php echo esc_url( $settings_url ); ?>" class="htk-btn htk-btn-secondary" title="<?php esc_attr_e( 'Settings', 'google-analytics-for-wordpress' ); ?>">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="3"></circle>
					<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
				</svg>
			</a>
		</div>
	</header>

	<!-- Global Diagnostics & Errors -->
	<div id="htk-global-alert" class="htk-alert htk-alert-error" style="<?php echo empty( $error ) ? 'display:none;' : ''; ?>">
		<?php if ( ! empty( $error ) ) : ?>
			<strong><?php esc_html_e( 'GA4 Data API Notice:', 'google-analytics-for-wordpress' ); ?></strong>
			<?php echo esc_html( $error ); ?>
		<?php endif; ?>
	</div>

	<?php if ( ! empty( $missing ) ) : ?>
		<!-- Setup Guide Callout -->
		<div class="htk-card htk-card-bracket" style="padding:28px 32px;margin-bottom:24px;">
			<h2 style="font-size:20px;color:#f87171;margin-bottom:10px;">
				<?php esc_html_e( 'Activate The Machine Spirit', 'google-analytics-for-wordpress' ); ?>
			</h2>
			<p style="color:var(--htk-text-dim);font-size:14px;max-width:760px;line-height:1.6;margin-bottom:20px;">
				<?php echo esc_html( $missing ); ?>
			</p>
			<div style="display:flex;gap:12px;">
				<a href="<?php echo esc_url( $settings_url ); ?>" class="htk-btn htk-btn-primary" style="padding:10px 22px;font-size:14px;">
					<?php esc_html_e( 'Open Heretek Settings &rarr;', 'google-analytics-for-wordpress' ); ?>
				</a>
			</div>
		</div>
	<?php else : ?>

		<!-- Cockpit Navigation Tabs -->
		<nav class="htk-nav-tabs" aria-label="<?php esc_attr_e( 'Telemetry Views', 'google-analytics-for-wordpress' ); ?>">
			<button type="button" class="htk-nav-tab active" data-tab="overview">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
				<?php esc_html_e( 'Master Augur (Overview)', 'google-analytics-for-wordpress' ); ?>
			</button>
			<button type="button" class="htk-nav-tab" data-tab="realtime">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
				<?php esc_html_e( 'Realtime Live Stream', 'google-analytics-for-wordpress' ); ?>
				<span class="htk-live-badge"><?php esc_html_e( 'Live', 'google-analytics-for-wordpress' ); ?></span>
			</button>
			<button type="button" class="htk-nav-tab" data-tab="authors">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
				<?php esc_html_e( 'Authors & Content', 'google-analytics-for-wordpress' ); ?>
			</button>
			<button type="button" class="htk-nav-tab" data-tab="acquisition">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
				<?php esc_html_e( 'Traffic & Acquisition', 'google-analytics-for-wordpress' ); ?>
			</button>
			<button type="button" class="htk-nav-tab" data-tab="tech">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
				<?php esc_html_e( 'Tech & Audience', 'google-analytics-for-wordpress' ); ?>
			</button>
		</nav>

		<!-- =============================================================== -->
		<!-- TAB 1: MASTER AUGUR (OVERVIEW)                                  -->
		<!-- =============================================================== -->
		<section id="htk-pane-overview" class="htk-tab-pane">

			<!-- 6 Hero KPI Cards with Deltas & Sparklines -->
			<div class="htk-kpi-grid">
				<!-- Sessions -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-sessions" class="htk-delta-badge <?php echo ( isset( $kpis['sessions']['delta'] ) && $kpis['sessions']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['sessions']['delta'] ) ? $fmt_delta( $kpis['sessions']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-sessions">
						<?php echo esc_html( isset( $kpis['sessions']['value'] ) ? $fmt_int( $kpis['sessions']['value'] ) : '0' ); ?>
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'vs. previous window', 'google-analytics-for-wordpress' ); ?></div>
					<div class="htk-kpi-sparkline" id="spark-sessions"></div>
				</div>

				<!-- Active Users -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Total Users', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-users" class="htk-delta-badge <?php echo ( isset( $kpis['users']['delta'] ) && $kpis['users']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['users']['delta'] ) ? $fmt_delta( $kpis['users']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-users">
						<?php echo esc_html( isset( $kpis['users']['value'] ) ? $fmt_int( $kpis['users']['value'] ) : '0' ); ?>
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'Unique visitors', 'google-analytics-for-wordpress' ); ?></div>
					<div class="htk-kpi-sparkline" id="spark-users"></div>
				</div>

				<!-- Page Views -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Screen Views', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-pageviews" class="htk-delta-badge <?php echo ( isset( $kpis['pageviews']['delta'] ) && $kpis['pageviews']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['pageviews']['delta'] ) ? $fmt_delta( $kpis['pageviews']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-pageviews">
						<?php echo esc_html( isset( $kpis['pageviews']['value'] ) ? $fmt_int( $kpis['pageviews']['value'] ) : '0' ); ?>
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'Total page impressions', 'google-analytics-for-wordpress' ); ?></div>
					<div class="htk-kpi-sparkline" id="spark-pageviews"></div>
				</div>

				<!-- Avg Engagement Time -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Avg Duration', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-avg_duration" class="htk-delta-badge <?php echo ( isset( $kpis['avg_duration']['delta'] ) && $kpis['avg_duration']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['avg_duration']['delta'] ) ? $fmt_delta( $kpis['avg_duration']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-avg_duration">
						<?php echo esc_html( isset( $kpis['avg_duration']['value'] ) ? $fmt_dur( $kpis['avg_duration']['value'] ) : '0m 00s' ); ?>
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'Active session time', 'google-analytics-for-wordpress' ); ?></div>
				</div>

				<!-- Engagement Rate -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Engagement', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-engagement_rate" class="htk-delta-badge <?php echo ( isset( $kpis['engagement_rate']['delta'] ) && $kpis['engagement_rate']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['engagement_rate']['delta'] ) ? $fmt_delta( $kpis['engagement_rate']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-engagement_rate">
						<?php echo esc_html( isset( $kpis['engagement_rate']['value'] ) ? number_format( $kpis['engagement_rate']['value'], 1 ) : '0.0' ); ?>%
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'Sessions > 10s or 2+ views', 'google-analytics-for-wordpress' ); ?></div>
				</div>

				<!-- Views per User -->
				<div class="htk-kpi-card htk-card-bracket">
					<div class="htk-kpi-header">
						<span class="htk-kpi-label"><?php esc_html_e( 'Views / User', 'google-analytics-for-wordpress' ); ?></span>
						<span id="htk-delta-views_per_user" class="htk-delta-badge <?php echo ( isset( $kpis['views_per_user']['delta'] ) && $kpis['views_per_user']['delta'] >= 0 ) ? 'pos' : 'neg'; ?>">
							<?php echo esc_html( isset( $kpis['views_per_user']['delta'] ) ? $fmt_delta( $kpis['views_per_user']['delta'] ) : '+0.0%' ); ?>
						</span>
					</div>
					<div class="htk-kpi-value" id="htk-kpi-views_per_user">
						<?php echo esc_html( isset( $kpis['views_per_user']['value'] ) ? number_format( $kpis['views_per_user']['value'], 1 ) : '0.0' ); ?>
					</div>
					<div class="htk-kpi-sub"><?php esc_html_e( 'Depth per reader', 'google-analytics-for-wordpress' ); ?></div>
				</div>
			</div>

			<!-- Main Interactive Timeline Chart (ApexCharts) -->
			<div class="htk-card htk-card-bracket htk-timeline-card">
				<div class="htk-timeline-header">
					<h2><?php esc_html_e( 'Telemetry Stream Over Time', 'google-analytics-for-wordpress' ); ?></h2>
					<div class="htk-metric-switch" role="group" aria-label="<?php esc_attr_e( 'Chart Metric Switcher', 'google-analytics-for-wordpress' ); ?>">
						<button type="button" class="htk-metric-pill active" data-metric="sessions"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></button>
						<button type="button" class="htk-metric-pill" data-metric="users"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></button>
						<button type="button" class="htk-metric-pill" data-metric="pageviews"><?php esc_html_e( 'Views', 'google-analytics-for-wordpress' ); ?></button>
						<button type="button" class="htk-metric-pill" data-metric="engagement"><?php esc_html_e( 'Engagement', 'google-analytics-for-wordpress' ); ?></button>
					</div>
				</div>
				<div id="htk-main-chart" class="htk-chart-canvas"></div>
			</div>

			<!-- Secondary Visualizations Grid: Channels & Devices Donut -->
			<div class="htk-grid-2">
				<!-- Traffic Acquisition Channels -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Acquisition Channels', 'google-analytics-for-wordpress' ); ?></h3>
						<button type="button" class="htk-btn htk-btn-secondary htk-export-btn" data-table="htk-table-sources" data-format="csv" style="padding:4px 8px;font-size:11px;">
							<?php esc_html_e( 'Export CSV', 'google-analytics-for-wordpress' ); ?>
						</button>
					</div>
					<div id="htk-channels-chart" style="min-height:240px;"></div>
				</div>

				<!-- Device Categories Breakdown -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Device Platforms', 'google-analytics-for-wordpress' ); ?></h3>
					</div>
					<div id="htk-devices-chart" style="min-height:240px;"></div>
				</div>
			</div>

			<!-- Breakdown Tables: Top Pages & Top Sources -->
			<div class="htk-grid-2">
				<!-- Top Pages Table -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Top Pages & Content', 'google-analytics-for-wordpress' ); ?></h3>
						<button type="button" class="htk-btn htk-btn-secondary htk-export-btn" data-table="htk-table-pages" data-format="csv" style="padding:4px 8px;font-size:11px;">
							<?php esc_html_e( 'Export CSV', 'google-analytics-for-wordpress' ); ?>
						</button>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table" id="htk-table-pages">
							<thead>
								<tr>
									<th><?php esc_html_e( 'Page', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Views', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Avg Time', 'google-analytics-for-wordpress' ); ?></th>
								</tr>
							</thead>
							<tbody id="htk-tbody-pages">
								<!-- Populated dynamically via JS or SSR -->
							</tbody>
						</table>
					</div>
				</div>

				<!-- Top Sources Table -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Top Traffic Referrers', 'google-analytics-for-wordpress' ); ?></h3>
						<button type="button" class="htk-btn htk-btn-secondary htk-export-btn" data-table="htk-table-sources" data-format="csv" style="padding:4px 8px;font-size:11px;">
							<?php esc_html_e( 'Export CSV', 'google-analytics-for-wordpress' ); ?>
						</button>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table" id="htk-table-sources">
							<thead>
								<tr>
									<th><?php esc_html_e( 'Source / Medium', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></th>
								</tr>
							</thead>
							<tbody id="htk-tbody-sources">
								<!-- Populated dynamically via JS or SSR -->
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Top Countries -->
			<div class="htk-card htk-card-bracket">
				<div class="htk-panel-header">
					<h3><?php esc_html_e( 'Top Countries', 'google-analytics-for-wordpress' ); ?></h3>
					<button type="button" class="htk-btn htk-btn-secondary htk-export-btn" data-table="htk-table-countries" data-format="csv" style="padding:4px 8px;font-size:11px;">
						<?php esc_html_e( 'Export CSV', 'google-analytics-for-wordpress' ); ?>
					</button>
				</div>
				<div class="htk-table-wrap">
					<table class="htk-table" id="htk-table-countries">
						<thead>
							<tr>
								<th><?php esc_html_e( 'Country', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></th>
							</tr>
						</thead>
						<tbody id="htk-tbody-countries">
							<!-- Populated dynamically via JS -->
						</tbody>
					</table>
				</div>
			</div>

		</section>

		<!-- =============================================================== -->
		<!-- TAB 2: REALTIME LIVE STREAM (MACHINE SPIRIT LIVE)                -->
		<!-- =============================================================== -->
		<section id="htk-pane-realtime" class="htk-tab-pane" style="display:none;">

			<div class="htk-realtime-hero htk-card-bracket">
				<div class="htk-realtime-count-box">
					<div class="htk-realtime-radar"></div>
					<div>
						<div class="htk-realtime-count-num" id="htk-realtime-active-users">0</div>
						<div class="htk-realtime-count-label"><?php esc_html_e( 'Active Readers on Site (Last 30 Min)', 'google-analytics-for-wordpress' ); ?></div>
					</div>
				</div>
				<div class="htk-realtime-controls">
					<span style="font-size:12px;color:var(--htk-text-dim);">
						<?php esc_html_e( 'Next Sync in:', 'google-analytics-for-wordpress' ); ?> <strong id="htk-realtime-countdown" style="color:var(--htk-crimson);font-family:monospace;">30s</strong>
					</span>
					<button type="button" id="htk-btn-realtime-pause" class="htk-btn htk-btn-secondary">
						<?php esc_html_e( '⏸ Pause Stream', 'google-analytics-for-wordpress' ); ?>
					</button>
				</div>
			</div>

			<!-- Realtime 30-Minute Histogram -->
			<div class="htk-card htk-card-bracket" style="margin-bottom:22px;">
				<div class="htk-panel-header">
					<h3><?php esc_html_e( 'Activity By Minute (Last 30 Minutes)', 'google-analytics-for-wordpress' ); ?></h3>
				</div>
				<div id="htk-realtime-chart" style="min-height:180px;"></div>
			</div>

			<!-- Realtime Pages & Countries -->
			<div class="htk-grid-2">
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Active Pages Right Now', 'google-analytics-for-wordpress' ); ?></h3>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table">
							<thead>
								<tr>
									<th><?php esc_html_e( 'Page / Screen', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Active Views', 'google-analytics-for-wordpress' ); ?></th>
								</tr>
							</thead>
							<tbody id="htk-tbody-realtime-pages">
								<tr><td colspan="2" class="htk-alert htk-alert-empty"><?php esc_html_e( 'Waiting for live telemetry stream...', 'google-analytics-for-wordpress' ); ?></td></tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Active Geographic Origins', 'google-analytics-for-wordpress' ); ?></h3>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table">
							<thead>
								<tr>
									<th><?php esc_html_e( 'Country', 'google-analytics-for-wordpress' ); ?></th>
									<th class="num"><?php esc_html_e( 'Active Users', 'google-analytics-for-wordpress' ); ?></th>
								</tr>
							</thead>
							<tbody id="htk-tbody-realtime-countries">
								<tr><td colspan="2" class="htk-alert htk-alert-empty"><?php esc_html_e( 'Waiting for live telemetry stream...', 'google-analytics-for-wordpress' ); ?></td></tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</section>

		<!-- =============================================================== -->
		<!-- TAB 3: AUTHORS & CONTENT TELEMETRY                              -->
		<!-- =============================================================== -->
		<section id="htk-pane-authors" class="htk-tab-pane" style="display:none;">

			<div class="htk-card htk-card-bracket" style="margin-bottom:22px;">
				<div class="htk-panel-header">
					<div>
						<h2><?php esc_html_e( 'Top Author Telemetry Leaderboard', 'google-analytics-for-wordpress' ); ?></h2>
						<p style="font-size:12px;color:var(--htk-text-dim);margin:4px 0 0;">
							<?php esc_html_e( 'Resolved from custom user dimension author_id and joined with WordPress user accounts.', 'google-analytics-for-wordpress' ); ?>
						</p>
					</div>
					<button type="button" class="htk-btn htk-btn-secondary htk-export-btn" data-table="htk-table-authors" data-format="csv">
						<?php esc_html_e( 'Export Authors CSV', 'google-analytics-for-wordpress' ); ?>
					</button>
				</div>
				<div class="htk-table-wrap">
					<table class="htk-table" id="htk-table-authors">
						<thead>
							<tr>
								<th><?php esc_html_e( 'Author', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Views', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Engagement %', 'google-analytics-for-wordpress' ); ?></th>
							</tr>
						</thead>
						<tbody id="htk-tbody-authors">
							<!-- Dynamic -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- Author Distribution Visualizer -->
			<div class="htk-card htk-card-bracket">
				<div class="htk-panel-header">
					<h3><?php esc_html_e( 'Author Traffic Distribution', 'google-analytics-for-wordpress' ); ?></h3>
				</div>
				<div id="htk-authors-chart" style="min-height:280px;"></div>
			</div>

		</section>

		<!-- =============================================================== -->
		<!-- TAB 4: TRAFFIC & ACQUISITION                                    -->
		<!-- =============================================================== -->
		<section id="htk-pane-acquisition" class="htk-tab-pane" style="display:none;">

			<div class="htk-card htk-card-bracket" style="margin-bottom:22px;">
				<div class="htk-panel-header">
					<h2><?php esc_html_e( 'Traffic Acquisition Channels & Referrers', 'google-analytics-for-wordpress' ); ?></h2>
				</div>
				<p style="font-size:13px;color:var(--htk-text-dim);margin:0 0 16px;">
					<?php esc_html_e( 'Understand how readers and cosmic wanderers navigate to your domain across organic search, direct links, and social platforms.', 'google-analytics-for-wordpress' ); ?>
				</p>
			</div>

		</section>

		<!-- =============================================================== -->
		<!-- TAB 5: TECH & AUDIENCE                                          -->
		<!-- =============================================================== -->
		<section id="htk-pane-tech" class="htk-tab-pane" style="display:none;">

			<div class="htk-grid-2">
				<!-- Browsers -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Top Browsers', 'google-analytics-for-wordpress' ); ?></h3>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table">
							<thead><tr><th><?php esc_html_e( 'Browser', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
							<tbody id="htk-tbody-browsers"></tbody>
						</table>
					</div>
				</div>

				<!-- Operating Systems -->
				<div class="htk-card htk-card-bracket">
					<div class="htk-panel-header">
						<h3><?php esc_html_e( 'Operating Systems', 'google-analytics-for-wordpress' ); ?></h3>
					</div>
					<div class="htk-table-wrap">
						<table class="htk-table">
							<thead><tr><th><?php esc_html_e( 'OS', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
							<tbody id="htk-tbody-os"></tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Top Cities -->
			<div class="htk-card htk-card-bracket">
				<div class="htk-panel-header">
					<h3><?php esc_html_e( 'Top Cities', 'google-analytics-for-wordpress' ); ?></h3>
				</div>
				<div class="htk-table-wrap">
					<table class="htk-table">
						<thead><tr><th><?php esc_html_e( 'City', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
						<tbody id="htk-tbody-cities"></tbody>
					</table>
				</div>
			</div>

		</section>

	<?php endif; ?>

</div>
