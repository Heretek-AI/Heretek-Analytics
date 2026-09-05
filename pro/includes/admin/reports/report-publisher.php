<?php
/**
 * Publishers Report.
 *
 * @package Heretek_Analytics
 * @subpackage Reports
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MonsterInsights_Report_Publisher extends MonsterInsights_Report {

	public $title;
	public $class = 'MonsterInsights_Report_Publisher';
	public $name = 'publisher';
	public $version = '1.0.0';
	public $level = 'plus';

	public function __construct() {
		$this->title = __( 'Publishers', 'heretek-analytics' );
		parent::__construct();
	}

	public function prepare_report_data( $data ) {
		return apply_filters( 'monsterinsights_report_publisher_data', $data );
	}

	protected function get_report_html( $data = array() ) {
		return '<div id="heretek-report-publisher" class="heretek-report-container"></div>';
	}
}
