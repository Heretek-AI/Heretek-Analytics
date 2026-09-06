<?php
/**
 * Heretek Analytics — Authors Dashboard Template.
 *
 * Rendered server-side by monsterinsights_authors_page().
 *
 * @var string $v4
 * @var string $prop_id
 * @var bool   $has_sa
 * @var string $missing
 * @var string $error
 * @var string $start_date
 * @var string $end_date
 * @var string $start_input
 * @var string $end_input
 * @var array  $rows
 * @var array  $author_lookup
 * @var string $settings_url
 * @var string $export_url
 *
 * @package Heretek_Analytics
 * @subpackage Admin
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

$icon_url = MONSTERINSIGHTS_PLUGIN_URL . 'assets/images/icon-sm.png';
?>

<div class="htk-cockpit">

	<!-- Header -->
	<header class="htk-header">
		<div class="htk-header-brand">
			<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Analytics Emblem">
			<div class="htk-header-title">
				<h1>
					<?php esc_html_e( 'Author Telemetry Leaderboard', 'google-analytics-for-wordpress' ); ?>
					<span class="htk-badge-ver"><?php echo esc_html( MONSTERINSIGHTS_VERSION ); ?></span>
				</h1>
				<div class="htk-header-telemetry-meta">
					<span><?php echo esc_html( $start_date ); ?> &rarr; <?php echo esc_html( $end_date ); ?></span>
					<span>&bull;</span>
					<span style="font-family:var(--htk-font-mono);">PID: <?php echo esc_html( $prop_id ); ?></span>
				</div>
			</div>
		</div>

		<!-- Toolbar -->
		<div class="htk-toolbar">
			<form method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" style="display:flex;align-items:center;gap:8px;">
				<input type="hidden" name="page" value="monsterinsights_authors" />
				<input type="date" name="start" class="htk-date-input" value="<?php echo esc_attr( $start_input ); ?>" required />
				<span style="color:var(--htk-text-muted);">&rarr;</span>
				<input type="date" name="end" class="htk-date-input" value="<?php echo esc_attr( $end_input ); ?>" required />
				<button type="submit" class="htk-btn htk-btn-primary"><?php esc_html_e( 'Apply', 'google-analytics-for-wordpress' ); ?></button>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=monsterinsights_authors' ) ); ?>" class="htk-btn htk-btn-secondary"><?php esc_html_e( 'Reset', 'google-analytics-for-wordpress' ); ?></a>
			</form>
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=monsterinsights_reports' ) ); ?>" class="htk-btn htk-btn-secondary">
				<?php esc_html_e( '&larr; Back to Master Augur', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>
	</header>

	<?php if ( ! empty( $missing ) ) : ?>
		<div class="htk-card htk-card-bracket" style="padding:28px 32px;">
			<h2 style="font-size:20px;color:#f87171;margin-bottom:10px;"><?php esc_html_e( 'Credentials Required', 'google-analytics-for-wordpress' ); ?></h2>
			<p style="color:var(--htk-text-dim);font-size:14px;line-height:1.6;margin-bottom:18px;"><?php echo esc_html( $missing ); ?></p>
			<a href="<?php echo esc_url( $settings_url ); ?>" class="htk-btn htk-btn-primary"><?php esc_html_e( 'Open Settings &rarr;', 'google-analytics-for-wordpress' ); ?></a>
		</div>
	<?php elseif ( ! empty( $error ) ) : ?>
		<div class="htk-alert htk-alert-error">
			<strong><?php esc_html_e( 'GA4 Data API Error:', 'google-analytics-for-wordpress' ); ?></strong>
			<?php echo esc_html( $error ); ?>
		</div>
	<?php else : ?>

		<div class="htk-card htk-card-bracket">
			<div class="htk-panel-header">
				<div>
					<h2><?php esc_html_e( 'Author Performance Ranking', 'google-analytics-for-wordpress' ); ?></h2>
					<p style="font-size:12px;color:var(--htk-text-dim);margin:4px 0 0;">
						<?php esc_html_e( 'Ranking authors by sessions, pageviews, and visitor engagement from GA4 custom dimension author_id.', 'google-analytics-for-wordpress' ); ?>
					</p>
				</div>
				<a href="<?php echo esc_url( $export_url ); ?>" class="htk-btn htk-btn-secondary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					<?php esc_html_e( 'Download CSV Snapshot', 'google-analytics-for-wordpress' ); ?>
				</a>
			</div>

			<?php if ( empty( $rows ) ) : ?>
				<div class="htk-alert htk-alert-empty">
					<?php esc_html_e( 'No author data in this window. Make sure your GA4 property has a User-scoped custom dimension named author_id registered.', 'google-analytics-for-wordpress' ); ?>
				</div>
			<?php else : ?>
				<div class="htk-table-wrap">
					<table class="htk-table" id="htk-authors-ranking-table">
						<thead>
							<tr>
								<th><?php esc_html_e( 'Author', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Unique Users', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Page Views', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Engaged Sessions', 'google-analytics-for-wordpress' ); ?></th>
							</tr>
						</thead>
						<tbody>
							<?php
							$tot_sessions = 0;
							$tot_users    = 0;
							$tot_views    = 0;
							$tot_engaged  = 0;
							$rank = 1;

							foreach ( $rows as $row ) :
								$raw_d   = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
								$aid     = ( '' !== $raw_d && '(not set)' !== $raw_d && ctype_digit( $raw_d ) ) ? (int) $raw_d : 0;
								$user    = ( $aid > 0 && isset( $author_lookup[ $aid ] ) ) ? $author_lookup[ $aid ] : null;
								$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
								$users    = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
								$views    = isset( $row['m'][2]['value'] ) ? (int) $row['m'][2]['value'] : 0;
								$engaged  = isset( $row['m'][3]['value'] ) ? (int) $row['m'][3]['value'] : 0;

								$tot_sessions += $sessions;
								$tot_users    += $users;
								$tot_views    += $views;
								$tot_engaged  += $engaged;

								if ( $user ) {
									$display = $user->display_name;
									$sub     = $user->user_email;
									$edit    = esc_url( get_edit_user_link( $user->ID ) );
									$avatar  = get_avatar_url( $user->ID, array( 'size' => 48 ) );
								} elseif ( $aid > 0 ) {
									$display = sprintf( __( 'Author #%d (deleted)', 'google-analytics-for-wordpress' ), $aid );
									$sub     = '';
									$edit    = '';
									$avatar  = '';
								} elseif ( '' === $raw_d || '(not set)' === $raw_d ) {
									$display = __( '(not set)', 'google-analytics-for-wordpress' );
									$sub     = __( 'Author ID was not captured on these sessions.', 'google-analytics-for-wordpress' );
									$edit    = '';
									$avatar  = '';
								} else {
									$display = sprintf( __( 'Unknown author (%s)', 'google-analytics-for-wordpress' ), $raw_d );
									$sub     = '';
									$edit    = '';
									$avatar  = '';
								}
								?>
								<tr>
									<td>
										<div class="htk-author-cell">
											<span class="htk-rank-badge"><?php echo (int) $rank++; ?></span>
											<?php if ( $avatar ) : ?>
												<img class="htk-author-avatar" src="<?php echo esc_url( $avatar ); ?>" alt="">
											<?php endif; ?>
											<div>
												<?php if ( $edit ) : ?>
													<a href="<?php echo $edit; ?>" class="htk-author-meta-name"><?php echo esc_html( $display ); ?></a>
												<?php else : ?>
													<span class="htk-author-meta-name"><?php echo esc_html( $display ); ?></span>
												<?php endif; ?>
												<?php if ( $sub ) : ?>
													<div class="htk-author-meta-email"><?php echo esc_html( $sub ); ?></div>
												<?php endif; ?>
											</div>
										</div>
									</td>
									<td class="num"><?php echo esc_html( $fmt_int( $sessions ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $users ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $views ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $engaged ) ); ?></td>
								</tr>
							<?php endforeach; ?>
							<tr style="border-top:2px solid var(--htk-border-blood);font-weight:700;">
								<td><strong><?php esc_html_e( 'Total Stream Volume', 'google-analytics-for-wordpress' ); ?></strong></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_sessions ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_users ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_views ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_engaged ) ); ?></td>
							</tr>
						</tbody>
					</table>
				</div>
			<?php endif; ?>
		</div>

	<?php endif; ?>

</div>
