<?php
/**
 * Backward-compatibility entry point for installations where WordPress
 * or existing scripts reference googleanalytics.php.
 *
 * @package Heretek_Analytics
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/heretek-analytics.php';
