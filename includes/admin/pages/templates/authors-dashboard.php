<?php
/**
 * Heretek Analytics — Authors & Content Taxonomy Leaderboard Template.
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
 * @var bool   $is_hybrid
 * @var string $current_taxonomy
 * @var bool   $has_comics
 * @var array  $dimensions_status
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

$icon_url = HERETEK_ANALYTICS_PLUGIN_URL . 'assets/images/icon-sm.png';

$tax_labels = array(
	'author'    => __( 'Authors', 'google-analytics-for-wordpress' ),
	'character' => __( 'Comic Characters', 'google-analytics-for-wordpress' ),
	'chapter'   => __( 'Comic Chapters', 'google-analytics-for-wordpress' ),
	'tag'       => __( 'Post Tags', 'google-analytics-for-wordpress' ),
);

$active_title = isset( $tax_labels[ $current_taxonomy ] ) ? $tax_labels[ $current_taxonomy ] : __( 'Authors', 'google-analytics-for-wordpress' );
?>

<div class="htk-cockpit">

	<!-- Header -->
	<header class="htk-header">
		<div class="htk-header-brand">
			<img src="<?php echo esc_url( $icon_url ); ?>" alt="Heretek Analytics Emblem">
			<div class="htk-header-title">
				<h1>
					<?php echo esc_html( $active_title ); ?> <?php esc_html_e( 'Leaderboard', 'google-analytics-for-wordpress' ); ?>
					<span class="htk-badge-ver"><?php echo esc_html( HERETEK_ANALYTICS_VERSION ); ?></span>
				</h1>
				<div class="htk-header-telemetry-meta">
					<span><?php echo esc_html( $start_date ); ?> &rarr; <?php echo esc_html( $end_date ); ?></span>
					<span>&bull;</span>
					<span style="font-family:var(--htk-font-mono);">PID: <?php echo esc_html( $prop_id ); ?></span>
					<?php if ( $is_hybrid ) : ?>
						<span>&bull;</span>
						<span class="htk-status-indicator" style="background:#dc2626;" title="<?php esc_attr_e( 'Hybrid Attribution Active', 'google-analytics-for-wordpress' ); ?>"></span>
						<span style="color:#f87171;font-size:11px;font-family:var(--htk-font-mono);"><?php esc_html_e( 'HYBRID ENGINE ACTIVE', 'google-analytics-for-wordpress' ); ?></span>
					<?php endif; ?>
				</div>
			</div>
		</div>

		<!-- Toolbar -->
		<div class="htk-toolbar">
			<form method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" style="display:flex;align-items:center;gap:8px;">
				<input type="hidden" name="page" value="heretekanalytics_authors" />
				<input type="hidden" name="tax" value="<?php echo esc_attr( $current_taxonomy ); ?>" />
				<input type="date" name="start" class="htk-date-input" value="<?php echo esc_attr( $start_input ); ?>" required />
				<span style="color:var(--htk-text-muted);">&rarr;</span>
				<input type="date" name="end" class="htk-date-input" value="<?php echo esc_attr( $end_input ); ?>" required />
				<button type="submit" class="htk-btn htk-btn-primary"><?php esc_html_e( 'Apply', 'google-analytics-for-wordpress' ); ?></button>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_authors&tax=' . $current_taxonomy ) ); ?>" class="htk-btn htk-btn-secondary"><?php esc_html_e( 'Reset', 'google-analytics-for-wordpress' ); ?></a>
			</form>
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=heretekanalytics_reports' ) ); ?>" class="htk-btn htk-btn-secondary">
				<?php esc_html_e( '&larr; Back to Master Augur', 'google-analytics-for-wordpress' ); ?>
			</a>
		</div>
	</header>

	<!-- Taxonomy Filter Tabs -->
	<nav class="htk-nav-tabs" style="margin-bottom:20px;">
		<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'heretekanalytics_authors', 'tax' => 'author', 'start' => $start_input, 'end' => $end_input ), admin_url( 'admin.php' ) ) ); ?>" class="htk-nav-tab <?php echo 'author' === $current_taxonomy ? 'active' : ''; ?>">
			<?php esc_html_e( '👤 Authors', 'google-analytics-for-wordpress' ); ?>
		</a>
		<?php if ( $has_comics ) : ?>
			<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'heretekanalytics_authors', 'tax' => 'character', 'start' => $start_input, 'end' => $end_input ), admin_url( 'admin.php' ) ) ); ?>" class="htk-nav-tab <?php echo 'character' === $current_taxonomy ? 'active' : ''; ?>">
				<?php esc_html_e( '🎭 Comic Characters', 'google-analytics-for-wordpress' ); ?>
			</a>
			<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'heretekanalytics_authors', 'tax' => 'chapter', 'start' => $start_input, 'end' => $end_input ), admin_url( 'admin.php' ) ) ); ?>" class="htk-nav-tab <?php echo 'chapter' === $current_taxonomy ? 'active' : ''; ?>">
				<?php esc_html_e( '📖 Comic Chapters', 'google-analytics-for-wordpress' ); ?>
			</a>
		<?php endif; ?>
		<a href="<?php echo esc_url( add_query_arg( array( 'page' => 'heretekanalytics_authors', 'tax' => 'tag', 'start' => $start_input, 'end' => $end_input ), admin_url( 'admin.php' ) ) ); ?>" class="htk-nav-tab <?php echo 'tag' === $current_taxonomy ? 'active' : ''; ?>">
			<?php esc_html_e( '🏷️ Post Tags', 'google-analytics-for-wordpress' ); ?>
		</a>
	</nav>

	<!-- GA4 Custom Dimensions Status / Schema Forge Bar -->
	<?php if ( ! empty( $dimensions_status ) ) : ?>
		<div class="htk-card htk-card-bracket" style="padding:16px 20px;margin-bottom:20px;border-color:rgba(220,38,38,0.3);">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
				<div style="display:flex;align-items:center;gap:12px;">
					<span class="htk-status-indicator" style="background:<?php echo ! empty( $dimensions_status['all_provisioned'] ) ? '#10b981' : ( empty( $dimensions_status['can_admin'] ) ? '#f59e0b' : '#38bdf8' ); ?>;"></span>
					<div>
						<strong style="color:var(--htk-text-white);font-size:13px;letter-spacing:0.5px;text-transform:uppercase;">
							<?php esc_html_e( 'GA4 Schema Forge & Custom Dimensions', 'google-analytics-for-wordpress' ); ?>
						</strong>
						<div style="font-size:12px;color:var(--htk-text-dim);margin-top:2px;">
							<?php if ( ! empty( $dimensions_status['all_provisioned'] ) ) : ?>
								<span style="color:#6ee7b7;"><?php esc_html_e( 'All 8 standard content & taxonomy dimensions are registered in GA4.', 'google-analytics-for-wordpress' ); ?></span>
							<?php elseif ( empty( $dimensions_status['can_admin'] ) ) : ?>
								<span style="color:#fcd34d;"><?php echo esc_html( ! empty( $dimensions_status['instructions'] ) ? $dimensions_status['instructions'] : $dimensions_status['error'] ); ?></span>
							<?php else : ?>
								<span style="color:#93c5fd;"><?php esc_html_e( 'Some custom dimensions are missing in your GA4 Property. Click auto-provision to create them instantly.', 'google-analytics-for-wordpress' ); ?></span>
							<?php endif; ?>
						</div>
					</div>
				</div>
				<div>
					<?php if ( ! empty( $dimensions_status['can_admin'] ) && empty( $dimensions_status['all_provisioned'] ) ) : ?>
						<button type="button" id="htk-provision-dimensions-btn" class="htk-btn htk-btn-primary" style="background:#dc2626;">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
							<?php esc_html_e( 'Auto-Provision GA4 Dimensions', 'google-analytics-for-wordpress' ); ?>
						</button>
					<?php elseif ( empty( $dimensions_status['can_admin'] ) ) : ?>
						<a href="https://analytics.google.com/analytics/web/#/a/admin/property/accessmanagement" target="_blank" rel="noopener" class="htk-btn htk-btn-secondary" style="font-size:11px;">
							<?php esc_html_e( 'Upgrade Service Account in GA4 &rarr;', 'google-analytics-for-wordpress' ); ?>
						</a>
					<?php else : ?>
						<span class="htk-badge" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#6ee7b7;padding:6px 12px;font-size:11px;">
							✓ <?php esc_html_e( 'Schema Synced in GA4', 'google-analytics-for-wordpress' ); ?>
						</span>
					<?php endif; ?>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php if ( $is_hybrid ) : ?>
		<div class="htk-alert" style="background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.3);color:#fca5a5;padding:12px 18px;margin-bottom:20px;border-radius:4px;display:flex;align-items:center;gap:10px;">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
			<span style="font-size:12px;line-height:1.5;">
				<strong><?php esc_html_e( 'Instant Hybrid Attribution Active:', 'google-analytics-for-wordpress' ); ?></strong>
				<?php esc_html_e( 'GA4 custom dimension data for this date range was uncaptured. Heretek has intelligently cross-referenced GA4 top-page traffic against local WordPress post and comic taxonomy data so you have real telemetry immediately.', 'google-analytics-for-wordpress' ); ?>
			</span>
		</div>
	<?php endif; ?>

	<?php if ( ! empty( $missing ) ) : ?>
		<div class="htk-card htk-card-bracket" style="padding:28px 32px;">
			<h2 style="font-size:20px;color:#f87171;margin-bottom:10px;"><?php esc_html_e( 'Credentials Required', 'google-analytics-for-wordpress' ); ?></h2>
			<p style="color:var(--htk-text-dim);font-size:14px;line-height:1.6;margin-bottom:18px;"><?php echo esc_html( $missing ); ?></p>
			<a href="<?php echo esc_url( $settings_url ); ?>" class="htk-btn htk-btn-primary"><?php esc_html_e( 'Open Settings &rarr;', 'google-analytics-for-wordpress' ); ?></a>
		</div>
	<?php elseif ( ! empty( $error ) ) : ?>
		<div class="htk-alert htk-alert-error">
			<strong><?php esc_html_e( 'GA4 Telemetry Notice:', 'google-analytics-for-wordpress' ); ?></strong>
			<?php echo esc_html( $error ); ?>
		</div>
	<?php else : ?>

		<div class="htk-card htk-card-bracket">
			<div class="htk-panel-header">
				<div>
					<h2><?php echo esc_html( $active_title ); ?> <?php esc_html_e( 'Ranking', 'google-analytics-for-wordpress' ); ?></h2>
					<p style="font-size:12px;color:var(--htk-text-dim);margin:4px 0 0;">
						<?php printf( esc_html__( 'Ranking %s by sessions, pageviews, and visitor engagement.', 'google-analytics-for-wordpress' ), strtolower( esc_html( $active_title ) ) ); ?>
					</p>
				</div>
				<a href="<?php echo esc_url( $export_url ); ?>" class="htk-btn htk-btn-secondary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					<?php printf( esc_html__( 'Download %s CSV', 'google-analytics-for-wordpress' ), esc_html( $active_title ) ); ?>
				</a>
			</div>

			<?php if ( empty( $rows ) ) : ?>
				<div class="htk-alert htk-alert-empty">
					<?php printf( esc_html__( 'No %s data found in this date window.', 'google-analytics-for-wordpress' ), strtolower( esc_html( $active_title ) ) ); ?>
				</div>
			<?php else : ?>
				<div class="htk-table-wrap">
					<table class="htk-table" id="htk-authors-ranking-table">
						<thead>
							<tr>
								<th><?php echo esc_html( 'author' === $current_taxonomy ? __( 'Author', 'google-analytics-for-wordpress' ) : $active_title ); ?></th>
								<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Page Views', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Unique Users', 'google-analytics-for-wordpress' ); ?></th>
								<th class="num"><?php esc_html_e( 'Engaged Sessions', 'google-analytics-for-wordpress' ); ?></th>
							</tr>
						</thead>
						<tbody>
							<?php
							$tot_sessions = 0;
							$tot_views    = 0;
							$tot_users    = 0;
							$tot_engaged  = 0;
							$rank         = 1;

							foreach ( $rows as $row ) :
								$raw_d    = isset( $row['d'][0] ) ? (string) $row['d'][0] : '';
								$sessions = isset( $row['m'][0]['value'] ) ? (int) $row['m'][0]['value'] : 0;
								$views    = isset( $row['m'][1]['value'] ) ? (int) $row['m'][1]['value'] : 0;
								$users    = isset( $row['m'][2]['value'] ) ? (int) $row['m'][2]['value'] : 0;
								$engaged  = isset( $row['m'][3]['value'] ) ? (int) $row['m'][3]['value'] : 0;

								$tot_sessions += $sessions;
								$tot_views    += $views;
								$tot_users    += $users;
								$tot_engaged  += $engaged;

								if ( 'author' === $current_taxonomy ) {
									$aid     = ( '' !== $raw_d && '(not set)' !== $raw_d && ctype_digit( $raw_d ) ) ? (int) $raw_d : 0;
									$user    = ( $aid > 0 && isset( $author_lookup[ $aid ] ) ) ? $author_lookup[ $aid ] : null;
									if ( $user ) {
										$display = is_array( $user ) ? $user['name'] : $user->display_name;
										$sub     = is_array( $user ) ? $user['email'] : $user->user_email;
										$edit    = is_array( $user ) ? $user['edit_url'] : get_edit_user_link( $user->ID );
										$avatar  = is_array( $user ) ? $user['avatar'] : get_avatar_url( $user->ID, array( 'size' => 48 ) );
									} elseif ( $aid > 0 ) {
										$display = sprintf( __( 'Author #%d (deleted)', 'google-analytics-for-wordpress' ), $aid );
										$sub     = '';
										$edit    = '';
										$avatar  = '';
									} elseif ( '' === $raw_d || '(not set)' === $raw_d ) {
										$display = __( '(not set)', 'google-analytics-for-wordpress' );
										$sub     = __( 'Author ID was uncaptured.', 'google-analytics-for-wordpress' );
										$edit    = '';
										$avatar  = '';
									} else {
										$display = sprintf( __( 'Unknown author (%s)', 'google-analytics-for-wordpress' ), $raw_d );
										$sub     = '';
										$edit    = '';
										$avatar  = '';
									}
								} else {
									if ( '' === $raw_d || '(not set)' === $raw_d ) {
										$display = __( '(not set)', 'google-analytics-for-wordpress' );
										$sub     = sprintf( __( '%s was uncaptured on these sessions.', 'google-analytics-for-wordpress' ), $active_title );
									} else {
										$display = $raw_d;
										$sub     = sprintf( __( '%s term', 'google-analytics-for-wordpress' ), $active_title );
									}
									$edit    = '';
									$avatar  = '';
								}
								?>
								<tr>
									<td>
										<div class="htk-author-cell">
											<span class="htk-rank-badge"><?php echo (int) $rank++; ?></span>
											<?php if ( ! empty( $avatar ) ) : ?>
												<img class="htk-author-avatar" src="<?php echo esc_url( $avatar ); ?>" alt="">
											<?php endif; ?>
											<div>
												<?php if ( ! empty( $edit ) ) : ?>
													<a href="<?php echo esc_url( $edit ); ?>" class="htk-author-meta-name"><?php echo esc_html( $display ); ?></a>
												<?php else : ?>
													<span class="htk-author-meta-name"><?php echo esc_html( $display ); ?></span>
												<?php endif; ?>
												<?php if ( ! empty( $sub ) ) : ?>
													<div class="htk-author-meta-email"><?php echo esc_html( $sub ); ?></div>
												<?php endif; ?>
											</div>
										</div>
									</td>
									<td class="num"><?php echo esc_html( $fmt_int( $sessions ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $views ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $users ) ); ?></td>
									<td class="num"><?php echo esc_html( $fmt_int( $engaged ) ); ?></td>
								</tr>
							<?php endforeach; ?>
							<tr style="border-top:2px solid var(--htk-border-blood);font-weight:700;">
								<td><strong><?php esc_html_e( 'Total Stream Volume', 'google-analytics-for-wordpress' ); ?></strong></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_sessions ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_views ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_users ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $tot_engaged ) ); ?></td>
							</tr>
						</tbody>
					</table>
				</div>
			<?php endif; ?>
		</div>

	<?php endif; ?>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
	var btn = document.getElementById('htk-provision-dimensions-btn');
	if (btn) {
		btn.addEventListener('click', function() {
			btn.disabled = true;
			btn.innerHTML = '⚡ Provisioning Schema in GA4...';
			fetch('<?php echo esc_url( rest_url( 'heretek-analytics/v1/dimensions/provision' ) ); ?>', {
				method: 'POST',
				headers: {
					'X-WP-Nonce': '<?php echo esc_js( wp_create_nonce( 'wp_rest' ) ); ?>',
					'Content-Type': 'application/json'
				}
			})
			.then(function(res) { return res.json(); })
			.then(function(data) {
				if (data.success) {
					alert('GA4 Schema Forge: Custom dimensions successfully created and verified in Google Analytics!');
					window.location.reload();
				} else {
					var err = (data.data && data.data.error) ? data.data.error : 'Failed to provision dimensions.';
					alert('Notice: ' + err);
					btn.disabled = false;
					btn.innerHTML = '⚡ Auto-Provision GA4 Dimensions';
				}
			})
			.catch(function(e) {
				alert('Connection failed. Verify REST API access.');
				btn.disabled = false;
				btn.innerHTML = '⚡ Auto-Provision GA4 Dimensions';
			});
		});
	}
});
</script>
