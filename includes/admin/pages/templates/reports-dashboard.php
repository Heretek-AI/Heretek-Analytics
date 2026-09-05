<?php
/**
 * Reports dashboard template.
 *
 * Rendered server-side by monsterinsights_reports_page().
 *
 * @var string $v4
 * @var string $prop_id
 * @var bool   $has_sa
 * @var array  $reports
 * @var string $missing
 * @var string $error
 * @var string $settings_url
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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

$overview    = isset( $reports['overview'] ) && is_array( $reports['overview'] ) ? $reports['overview'] : array();
$top_pages   = isset( $reports['top_pages'] ) && is_array( $reports['top_pages'] ) ? $reports['top_pages'] : array();
$countries   = isset( $reports['top_countries'] ) && is_array( $reports['top_countries'] ) ? $reports['top_countries'] : array();
$top_authors = isset( $reports['top_authors'] ) && is_array( $reports['top_authors'] ) ? $reports['top_authors'] : array();

// Resolve author_id -> WordPress user for the Top Authors panel.
$author_ids = array();
if ( ! empty( $top_authors['rows'] ) && is_array( $top_authors['rows'] ) ) {
	foreach ( $top_authors['rows'] as $row ) {
		if ( ! empty( $row['d'][0] ) && ctype_digit( (string) $row['d'][0] ) ) {
			$author_ids[] = (int) $row['d'][0];
		}
	}
}
$author_lookup = array();
if ( ! empty( $author_ids ) ) {
	$users = get_users( array(
		'include' => array_values( array_unique( $author_ids ) ),
		'fields'  => array( 'ID', 'display_name', 'user_email' ),
	) );
	foreach ( $users as $u ) {
		$author_lookup[ (int) $u->ID ] = $u;
	}
}

$sum_metric = static function ( array $rows, int $idx ) {
	$total = 0;
	foreach ( $rows as $row ) {
		if ( ! empty( $row['m'][ $idx ]['value'] ) && is_numeric( $row['m'][ $idx ]['value'] ) ) {
			$total += (int) $row['m'][ $idx ]['value'];
		}
	}
	return $total;
};
?>
<style>
.heretek-dashboard {
	max-width: 1180px;
	margin: 24px auto 80px;
	padding: 0 20px;
	font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	color: #e4e4e7;
}
.heretek-dashboard h1 {
	font-family: 'Cinzel', serif;
	font-size: 26px;
	font-weight: 700;
	letter-spacing: 0.04em;
	color: #f4f4f5;
	margin: 0 0 6px;
}
.heretek-dashboard .heretek-lede {
	color: #a1a1aa;
	font-size: 14px;
	max-width: 760px;
	margin: 0 0 24px;
	line-height: 1.55;
}
.heretek-kpi-row {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 16px;
	margin-bottom: 24px;
}
.heretek-kpi {
	background: #111116;
	border: 1px solid #27272a;
	border-left: 3px solid #dc2626;
	border-radius: 6px;
	padding: 18px 22px;
}
.heretek-kpi__label {
	text-transform: uppercase;
	letter-spacing: 0.06em;
	font-size: 11px;
	font-weight: 700;
	color: #a1a1aa;
	margin: 0 0 6px;
}
.heretek-kpi__value {
	font-family: 'Geist', monospace;
	font-size: 28px;
	font-weight: 600;
	color: #f4f4f5;
	letter-spacing: 0.02em;
	line-height: 1.05;
}
.heretek-kpi__sub {
	font-size: 12px;
	color: #71717a;
	margin-top: 6px;
}
.heretek-panels {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 16px;
}
.heretek-panel {
	background: #111116;
	border: 1px solid #27272a;
	border-radius: 6px;
	padding: 18px 22px;
}
.heretek-panel h2 {
	font-family: 'Cinzel', serif;
	font-size: 16px;
	letter-spacing: 0.04em;
	font-weight: 700;
	color: #f4f4f5;
	margin: 0 0 12px;
}
.heretek-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 13px;
}
.heretek-table th,
.heretek-table td {
	text-align: left;
	padding: 8px 6px;
	border-bottom: 1px solid #1f1f23;
	color: #d4d4d8;
}
.heretek-table th {
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-size: 11px;
	color: #a1a1aa;
	font-weight: 700;
}
.heretek-table td.num {
	font-family: 'Geist', monospace;
	text-align: right;
	color: #f4f4f5;
	white-space: nowrap;
}
.heretek-table td.muted {
	color: #71717a;
	font-style: italic;
}
.heretek-chart {
	display: flex;
	align-items: flex-end;
	gap: 4px;
	height: 160px;
	padding: 12px 0 6px;
	border-bottom: 1px solid #1f1f23;
}
.heretek-chart__bar {
	flex: 1;
	background: linear-gradient(180deg, #dc2626 0%, #7f1d1d 100%);
	border-radius: 2px 2px 0 0;
	min-height: 2px;
}
.heretek-empty,
.heretek-error,
.heretek-info {
	padding: 14px 18px;
	border-radius: 6px;
	border-left: 3px solid;
	font-size: 13px;
	line-height: 1.5;
	margin-bottom: 18px;
}
.heretek-info  { background:#18181b; border-color:#52525b; color:#d4d4d8; }
.heretek-error { background:#1c1917; border-color:#dc2626; color:#fecaca; }
.heretek-empty { background:#18181b; border-color:#52525b; color:#a1a1aa; }
.heretek-empty a,
.heretek-error a,
.heretek-info a { color:#fca5a5; }
.heretek-date-filter { margin-bottom: 22px; padding: 18px 22px; }
.heretek-date-filter__row {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	gap: 14px;
}
.heretek-date-filter__row .heretek-field { margin-bottom: 0; min-width: 170px; }
.heretek-date-filter__row .heretek-actions { margin-top: 0; }
</style>

<div class="heretek-dashboard">
	<h1><?php
		printf(
			/* translators: 1: start date, 2: end date */
			esc_html__( 'Augur Reports — %1$s to %2$s', 'google-analytics-for-wordpress' ),
			esc_html( $start_date ),
			esc_html( $end_date )
		);
	?></h1>
	<p class="heretek-lede">
		<?php
		printf(
			/* translators: %s is the GA4 Measurement ID. */
			esc_html__( 'Direct GA4 Data API reporting for measurement ID %s. Powered by your Google Cloud service account — no third-party relay.', 'google-analytics-for-wordpress' ),
			'<code>' . esc_html( $v4 ) . '</code>'
		);
		?>
	</p>

	<form method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" class="heretek-card heretek-date-filter">
		<input type="hidden" name="page" value="monsterinsights_reports" />
		<div class="heretek-date-filter__row">
			<div class="heretek-field">
				<label for="heretek-start"><?php esc_html_e( 'Start date', 'google-analytics-for-wordpress' ); ?></label>
				<input type="date" id="heretek-start" name="start" value="<?php echo esc_attr( $start_input ); ?>" required />
			</div>
			<div class="heretek-field">
				<label for="heretek-end"><?php esc_html_e( 'End date', 'google-analytics-for-wordpress' ); ?></label>
				<input type="date" id="heretek-end" name="end" value="<?php echo esc_attr( $end_input ); ?>" required />
			</div>
			<div class="heretek-actions">
				<button type="submit" class="heretek-button"><?php esc_html_e( 'Apply', 'google-analytics-for-wordpress' ); ?></button>
				<a class="heretek-button heretek-button--secondary" href="<?php echo esc_url( admin_url( 'admin.php?page=monsterinsights_reports' ) ); ?>"><?php esc_html_e( 'Reset', 'google-analytics-for-wordpress' ); ?></a>
			</div>
		</div>
	</form>

	<?php if ( ! empty( $missing ) ) : ?>
		<div class="heretek-empty">
			<?php echo esc_html( $missing ); ?>
			<a href="<?php echo esc_url( $settings_url ); ?>"><?php esc_html_e( 'Open Settings', 'google-analytics-for-wordpress' ); ?></a>
		</div>
	<?php elseif ( ! empty( $error ) ) : ?>
		<div class="heretek-error">
			<strong><?php esc_html_e( 'GA4 Data API error:', 'google-analytics-for-wordpress' ); ?></strong>
			<?php echo esc_html( $error ); ?>
		</div>
	<?php else : ?>
		<?php
		$overview_rows  = isset( $overview['rows'] )  && is_array( $overview['rows'] )  ? $overview['rows']  : array();
		$pages_rows     = isset( $top_pages['rows'] ) && is_array( $top_pages['rows'] ) ? $top_pages['rows'] : array();
		$countries_rows = isset( $countries['rows'] ) && is_array( $countries['rows'] ) ? $countries['rows'] : array();

		$total_sessions  = $sum_metric( $overview_rows, 0 );
		$total_users     = $sum_metric( $overview_rows, 1 );
		$total_pageviews = $sum_metric( $overview_rows, 2 );

		// Daily series for the chart (sessions, index 0).
		$daily_sessions = array();
		foreach ( $overview_rows as $row ) {
			$label = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
			$value = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
			$daily_sessions[] = array( 'label' => $label, 'value' => $value );
		}
		$max_daily = 0;
		foreach ( $daily_sessions as $d ) {
			if ( $d['value'] > $max_daily ) {
				$max_daily = $d['value'];
			}
		}
		?>

		<div class="heretek-kpi-row">
			<div class="heretek-kpi">
				<p class="heretek-kpi__label"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></p>
				<p class="heretek-kpi__value"><?php echo esc_html( $fmt_int( $total_sessions ) ); ?></p>
				<p class="heretek-kpi__sub"><?php esc_html_e( 'Last 30 days', 'google-analytics-for-wordpress' ); ?></p>
			</div>
			<div class="heretek-kpi">
				<p class="heretek-kpi__label"><?php esc_html_e( 'Total Users', 'google-analytics-for-wordpress' ); ?></p>
				<p class="heretek-kpi__value"><?php echo esc_html( $fmt_int( $total_users ) ); ?></p>
				<p class="heretek-kpi__sub"><?php esc_html_e( 'Unique visitors', 'google-analytics-for-wordpress' ); ?></p>
			</div>
			<div class="heretek-kpi">
				<p class="heretek-kpi__label"><?php esc_html_e( 'Page Views', 'google-analytics-for-wordpress' ); ?></p>
				<p class="heretek-kpi__value"><?php echo esc_html( $fmt_int( $total_pageviews ) ); ?></p>
				<p class="heretek-kpi__sub"><?php esc_html_e( 'All page events', 'google-analytics-for-wordpress' ); ?></p>
			</div>
			<div class="heretek-kpi">
				<p class="heretek-kpi__label"><?php esc_html_e( 'Property ID', 'google-analytics-for-wordpress' ); ?></p>
				<p class="heretek-kpi__value"><?php echo esc_html( $prop_id ); ?></p>
				<p class="heretek-kpi__sub"><?php esc_html_e( 'GA4 numeric property', 'google-analytics-for-wordpress' ); ?></p>
			</div>
		</div>

		<div class="heretek-panels">

			<div class="heretek-panel" style="grid-column: 1 / -1;">
				<h2><?php esc_html_e( 'Sessions per Day', 'google-analytics-for-wordpress' ); ?></h2>
				<?php if ( empty( $daily_sessions ) ) : ?>
					<p class="heretek-empty"><?php esc_html_e( 'No sessions recorded in the selected window.', 'google-analytics-for-wordpress' ); ?></p>
				<?php else : ?>
					<div class="heretek-chart" aria-label="<?php esc_attr_e( 'Daily sessions chart', 'google-analytics-for-wordpress' ); ?>">
						<?php foreach ( $daily_sessions as $d ) :
							$height = $max_daily > 0 ? max( 2, (int) round( ( $d['value'] / $max_daily ) * 150 ) ) : 2;
							$date_label = $d['label'];
							if ( strlen( $date_label ) === 8 ) {
								$date_label = substr( $date_label, 0, 4 ) . '-' . substr( $date_label, 4, 2 ) . '-' . substr( $date_label, 6, 2 );
							}
							?>
							<div class="heretek-chart__bar" style="height: <?php echo (int) $height; ?>px;"
								 title="<?php echo esc_attr( $date_label . ' — ' . (int) $d['value'] . ' sessions' ); ?>"></div>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>

			<div class="heretek-panel">
				<h2><?php esc_html_e( 'Top Pages', 'google-analytics-for-wordpress' ); ?></h2>
				<?php if ( empty( $pages_rows ) ) : ?>
					<p class="heretek-empty"><?php esc_html_e( 'No page data available.', 'google-analytics-for-wordpress' ); ?></p>
				<?php else : ?>
					<table class="heretek-table">
						<thead><tr><th><?php esc_html_e( 'Page', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Views', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
						<tbody>
							<?php foreach ( $pages_rows as $row ) :
								$title = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
								$path  = isset( $row['d'][1] ) ? (string) $row['d'][1] : '';
								$views = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
								$label = '' !== $title ? $title : $path;
								if ( '' === $label ) {
									$label = __( '(not set)', 'google-analytics-for-wordpress' );
								}
								?>
								<tr>
									<td>
										<?php echo esc_html( $label ); ?>
										<?php if ( '' !== $title && '' !== $path ) : ?>
											<div class="heretek-table td muted"><?php echo esc_html( $path ); ?></div>
										<?php endif; ?>
									</td>
									<td class="num"><?php echo esc_html( $fmt_int( $views ) ); ?></td>
								</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				<?php endif; ?>
			</div>

			<div class="heretek-panel">
				<h2><?php esc_html_e( 'Top Authors', 'google-analytics-for-wordpress' ); ?></h2>
				<?php if ( empty( $top_authors['rows'] ) ) : ?>
					<p class="heretek-empty"><?php esc_html_e( 'No author data in this window. Make sure your GA4 property has a User-scoped custom dimension named <code>author_id</code> registered, and that singular views are emitting it.', 'google-analytics-for-wordpress' ); ?></p>
				<?php else : ?>
					<table class="heretek-table">
						<thead><tr><th><?php esc_html_e( 'Author', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Page Views', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
						<tbody>
							<?php foreach ( $top_authors['rows'] as $row ) :
								$aid = ! empty( $row['d'][0] ) ? (int) $row['d'][0] : 0;
								$user = isset( $author_lookup[ $aid ] ) ? $author_lookup[ $aid ] : null;
								$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
								$views    = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
								if ( $user ) {
									$display = $user->display_name;
									$sub     = $user->user_email;
									$edit    = esc_url( get_edit_user_link( $user->ID ) );
								} else {
									$display = sprintf( __( 'Author #%d', 'google-analytics-for-wordpress' ), $aid );
									$sub     = '';
									$edit    = '';
								}
								?>
								<tr>
									<td>
										<?php if ( $edit ) : ?>
											<a href="<?php echo $edit; ?>"><?php echo esc_html( $display ); ?></a>
										<?php else : ?>
											<?php echo esc_html( $display ); ?>
										<?php endif; ?>
										<?php if ( $sub ) : ?>
											<div class="heretek-table td muted"><?php echo esc_html( $sub ); ?></div>
										<?php endif; ?>
									</td>
									<td class="num"><?php echo esc_html( $fmt_int( $sessions ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $views ) ); ?></td>
								</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
					<p class="heretek-info" style="margin-top: 14px;">
						<?php
						printf(
							/* translators: %s is a URL to the Authors admin sub-page. */
							esc_html__( 'Need a full per-author breakdown across more metrics? Open %s.', 'google-analytics-for-wordpress' ),
							'<a href="' . esc_url( admin_url( 'admin.php?page=monsterinsights_authors' ) ) . '">' . esc_html__( 'Heretek Analytics → Authors', 'google-analytics-for-wordpress' ) . '</a>'
						);
						?>
					</p>
				<?php endif; ?>
			</div>

			<div class="heretek-panel">
				<h2><?php esc_html_e( 'Top Countries', 'google-analytics-for-wordpress' ); ?></h2>
				<?php if ( empty( $countries_rows ) ) : ?>
					<p class="heretek-empty"><?php esc_html_e( 'No country data available.', 'google-analytics-for-wordpress' ); ?></p>
				<?php else : ?>
					<table class="heretek-table">
						<thead><tr><th><?php esc_html_e( 'Country', 'google-analytics-for-wordpress' ); ?></th><th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th></tr></thead>
						<tbody>
							<?php foreach ( $countries_rows as $row ) :
								$country  = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
								$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
								?>
								<tr>
									<td><?php echo '' !== $country ? esc_html( $country ) : '<em>' . esc_html__( '(not set)', 'google-analytics-for-wordpress' ) . '</em>'; ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $sessions ) ); ?></td>
								</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				<?php endif; ?>
			</div>

		</div>
	<?php endif; ?>
</div>
