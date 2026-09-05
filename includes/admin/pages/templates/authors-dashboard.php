<?php
/**
 * Authors dashboard template.
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
?>
<style>
.heretek-authors-wrap { max-width:1100px; margin:24px auto 80px; padding:0 20px; font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#e4e4e7; }
.heretek-authors-wrap h1 { font-family:'Cinzel',serif; font-size:26px; font-weight:700; letter-spacing:0.04em; color:#f4f4f5; margin:0 0 6px; }
.heretek-authors-wrap .lede { color:#a1a1aa; font-size:14px; max-width:760px; margin:0 0 22px; line-height:1.55; }
.heretek-card { background:#111116; border:1px solid #27272a; border-radius:8px; padding:20px 24px; margin-bottom:18px; }
.heretek-card h2 { font-family:'Cinzel',serif; font-size:16px; color:#f4f4f5; margin:0 0 8px; }
.heretek-field { display:flex; flex-direction:column; gap:6px; margin-bottom:0; min-width:170px; }
.heretek-field label { font-weight:600; font-size:11px; letter-spacing:0.06em; color:#a1a1aa; text-transform:uppercase; }
.heretek-field input[type="date"] { background:#09090b; border:1px solid #27272a; border-radius:6px; padding:10px 12px; color:#f4f4f5; font-family:'Geist',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:14px; }
.heretek-actions { display:flex; gap:10px; align-items:center; margin-top:0; }
.heretek-button { background:#dc2626; border:1px solid #b91c1c; color:#fff; border-radius:4px; padding:10px 22px; font-weight:600; font-size:14px; cursor:pointer; font-family:inherit; text-decoration:none; display:inline-block; }
.heretek-button:hover { background:#b91c1c; color:#fff; }
.heretek-button--secondary { background:transparent; border:1px solid #3f3f46; color:#d4d4d8; }
.heretek-button--secondary:hover { background:#1c1917; color:#f4f4f5; }
.heretek-date-filter__row { display:flex; flex-wrap:wrap; align-items:flex-end; gap:14px; }
.heretek-table { width:100%; border-collapse:collapse; font-size:13px; }
.heretek-table th, .heretek-table td { text-align:left; padding:9px 6px; border-bottom:1px solid #1f1f23; color:#d4d4d8; vertical-align: top; }
.heretek-table th { color:#a1a1aa; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; font-size:11px; }
.heretek-table td.num { font-family:'Geist',monospace; text-align:right; color:#f4f4f5; white-space:nowrap; }
.heretek-table td.muted { color:#71717a; font-style:italic; font-size:12px; }
.heretek-table a { color:#fca5a5; text-decoration:none; }
.heretek-table a:hover { text-decoration:underline; }
.heretek-table tr.total-row td { border-top: 1px solid #3f3f46; border-bottom: 0; font-weight: 700; }
.heretek-empty, .heretek-info, .heretek-error { padding:14px 18px; border-radius:6px; border-left:3px solid; font-size:13px; line-height:1.5; margin-bottom:18px; }
.heretek-info { background:#18181b; border-color:#52525b; color:#d4d4d8; }
.heretek-error { background:#1c1917; border-color:#dc2626; color:#fecaca; }
.heretek-empty { background:#18181b; border-color:#52525b; color:#a1a1aa; }
.heretek-empty a, .heretek-info a, .heretek-error a { color:#fca5a5; }
.heretek-empty code, .heretek-info code, .heretek-error code { background:#18181b; padding:1px 6px; border-radius:3px; color:#f4f4f5; font-size:12px; }
.heretek-toolbar { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
.heretek-toolbar .heretek-button { padding:7px 16px; font-size:13px; }
</style>

<div class="heretek-authors-wrap">
	<h1><?php
		printf(
			/* translators: 1: start date, 2: end date */
			esc_html__( 'Authors — %1$s to %2$s', 'google-analytics-for-wordpress' ),
			esc_html( $start_date ),
			esc_html( $end_date )
		);
	?></h1>
	<p class="lede">
		<?php esc_html_e( 'Per-author ranking pulled directly from the GA4 Data API. Author IDs come from a User-scoped custom dimension; display names are joined from WordPress user accounts.', 'google-analytics-for-wordpress' ); ?>
	</p>

	<form method="get" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>" class="heretek-card">
		<input type="hidden" name="page" value="monsterinsights_authors" />
		<div class="heretek-date-filter__row">
			<div class="heretek-field">
				<label for="heretek-authors-start"><?php esc_html_e( 'Start date', 'google-analytics-for-wordpress' ); ?></label>
				<input type="date" id="heretek-authors-start" name="start" value="<?php echo esc_attr( $start_input ); ?>" required />
			</div>
			<div class="heretek-field">
				<label for="heretek-authors-end"><?php esc_html_e( 'End date', 'google-analytics-for-wordpress' ); ?></label>
				<input type="date" id="heretek-authors-end" name="end" value="<?php echo esc_attr( $end_input ); ?>" required />
			</div>
			<div class="heretek-actions">
				<button type="submit" class="heretek-button"><?php esc_html_e( 'Apply', 'google-analytics-for-wordpress' ); ?></button>
				<a class="heretek-button heretek-button--secondary" href="<?php echo esc_url( admin_url( 'admin.php?page=monsterinsights_authors' ) ); ?>"><?php esc_html_e( 'Reset', 'google-analytics-for-wordpress' ); ?></a>
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

		<div class="heretek-toolbar">
			<div class="lede" style="margin:0;">
				<?php
				printf(
					/* translators: %d is the number of authors. */
					esc_html( _n( '%d author in this window.', '%d authors in this window.', count( $rows ), 'google-analytics-for-wordpress' ) ),
					count( $rows )
				);
				?>
			</div>
			<a class="heretek-button heretek-button--secondary" href="<?php echo esc_url( $export_url ); ?>"><?php esc_html_e( 'Export CSV', 'google-analytics-for-wordpress' ); ?></a>
		</div>

		<div class="heretek-card" style="padding:0;">
			<?php if ( empty( $rows ) ) : ?>
				<div class="heretek-empty" style="margin:18px;">
					<?php
					printf(
						/* translators: %s is the custom dimension API name. */
						wp_kses(
							__( 'No author data in this window. Make sure your GA4 property has a User-scoped custom dimension named <code>%s</code> registered, and that singular views are emitting it.', 'google-analytics-for-wordpress' ),
							array( 'code' => array() )
						),
						'author_id'
					);
					?>
				</div>
			<?php else : ?>
				<table class="heretek-table">
					<thead>
						<tr>
							<th><?php esc_html_e( 'Author', 'google-analytics-for-wordpress' ); ?></th>
							<th class="num"><?php esc_html_e( 'Sessions', 'google-analytics-for-wordpress' ); ?></th>
							<th class="num"><?php esc_html_e( 'Users', 'google-analytics-for-wordpress' ); ?></th>
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
						foreach ( $rows as $row ) :
							// Three possible states for $row['d'][0]:
							//   1. A numeric WordPress user ID -> look up display name.
							//   2. "(not set)" or empty -> GA4 returned no author for these
							//      sessions (typically historic traffic before the
							//      front-end started emitting author_id).
							//   3. Anything else (unrecognised dimension value) -> show
							//      the raw value so the admin can spot the bug.
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
							} elseif ( $aid > 0 ) {
								// Numeric ID that didn't match a WordPress user — likely
								// a deleted author. Surface the ID so the admin knows.
								$display = sprintf( __( 'Author #%d (deleted)', 'google-analytics-for-wordpress' ), $aid );
								$sub     = '';
								$edit    = '';
							} elseif ( '' === $raw_d || '(not set)' === $raw_d ) {
								$display = __( '(not set)', 'google-analytics-for-wordpress' );
								$sub     = __( 'Author ID was not captured on these sessions.', 'google-analytics-for-wordpress' );
								$edit    = '';
							} else {
								// Unrecognised dimension value (string, negative, etc.).
								$display = sprintf( __( 'Unknown author (%s)', 'google-analytics-for-wordpress' ), $raw_d );
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
										<div class="muted"><?php echo esc_html( $sub ); ?></div>
									<?php endif; ?>
								</td>
								<td class="num"><?php echo esc_html( $fmt_int( $sessions ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $users ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $views ) ); ?></td>
								<td class="num"><?php echo esc_html( $fmt_int( $engaged ) ); ?></td>
							</tr>
						<?php endforeach; ?>
						<tr class="total-row">
							<td><?php esc_html_e( 'Total', 'google-analytics-for-wordpress' ); ?></td>
							<td class="num"><?php echo esc_html( $fmt_int( $tot_sessions ) ); ?></td>
							<td class="num"><?php echo esc_html( $fmt_int( $tot_users ) ); ?></td>
							<td class="num"><?php echo esc_html( $fmt_int( $tot_views ) ); ?></td>
							<td class="num"><?php echo esc_html( $fmt_int( $tot_engaged ) ); ?></td>
						</tr>
					</tbody>
				</table>
			<?php endif; ?>
		</div>

		<div class="heretek-info" style="margin-top:18px;">
			<strong><?php esc_html_e( 'Setup', 'google-analytics-for-wordpress' ); ?></strong>
			<ol style="margin:8px 0 0 18px;padding:0;color:#a1a1aa;font-size:13px;line-height:1.7;">
				<li>
					<?php
					printf(
						/* translators: %s is the custom dimension API name. */
						wp_kses(
							__( 'In <strong>GA4 → Admin → Property → Custom definitions</strong>, create a User-scoped custom dimension named <code>%s</code>.', 'google-analytics-for-wordpress' ),
							array( 'strong' => array(), 'code' => array() )
						),
						'author_id'
					);
					?>
				</li>
				<li><?php esc_html_e( 'Heretek Analytics already emits author_id on singular views, so no extra gtag.js work is needed.', 'google-analytics-for-wordpress' ); ?></li>
				<li>
					<?php
					printf(
						/* translators: %s is a relative path. */
						wp_kses(
							__( 'For a per-author display name breakdown, also register an Event- or User-scoped custom dimension named <code>author</code> in GA4 and switch the query in <code>%s</code> to <code>customUser:author</code>.', 'google-analytics-for-wordpress' ),
							array( 'code' => array() )
						),
						'includes/api/class-heretek-rest-reporting-gateway.php'
					);
					?>
				</li>
			</ol>
		</div>

	<?php endif; ?>
</div>
