<?php
/**
 * Forms Report.
 *
 * @package Heretek_Analytics
 * @subpackage Reports
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MonsterInsights_Report_Forms extends MonsterInsights_Report {

	public $title;
	public $class = 'MonsterInsights_Report_Forms';
	public $name = 'forms';
	public $version = '1.0.0';
	public $level = 'pro';

	public function __construct() {
		$this->title = __( 'Forms', 'heretek-analytics' );
		parent::__construct();
	}

	public function prepare_report_data( $data ) {
		return apply_filters( 'monsterinsights_report_forms_data', $data );
	}

	protected function get_report_html( $data = array() ) {
		return '<div id="heretek-report-forms" class="heretek-report-container"></div>';
	}
}
