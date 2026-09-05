<?php
/**
 * Heretek Analytics Unlocked License Class.
 *
 * Provides a 100% open-source, permanent Agency/Pro-tier license object
 * with all features unlocked and zero phone-home verification.
 *
 * @package Heretek_Analytics
 * @subpackage Licensing
 * @author Heretek AI
 * @license GPL-3.0-or-later
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Heretek_License {

	const KEY = 'HERETEK-COMMUNITY-PRO-UNLOCKED';
	const TIER = 'agency';
	const EXPIRY = '2099-12-31 23:59:59';

	public function __construct() {}

	public function get_license_type() {
		return self::TIER;
	}

	public function get_site_license_type() {
		return self::TIER;
	}

	public function get_network_license_type() {
		return self::TIER;
	}

	public function get_default_license_key() {
		return self::KEY;
	}

	public function get_license_key() {
		return self::KEY;
	}

	public function get_site_license_key() {
		return self::KEY;
	}

	public function get_network_license_key() {
		return self::KEY;
	}

	public function get_license_key_by_context( bool $network = false ) {
		return self::KEY;
	}

	public function get_site_license() {
		return array(
			'key'         => self::KEY,
			'type'        => self::TIER,
			'is_agency'   => true,
			'is_expired'  => false,
			'is_disabled' => false,
			'is_invalid'  => false,
			'expiry_date' => self::EXPIRY,
		);
	}

	public function get_network_license() {
		return array(
			'key'         => self::KEY,
			'type'        => self::TIER,
			'is_agency'   => true,
			'is_expired'  => false,
			'is_disabled' => false,
			'is_invalid'  => false,
			'expiry_date' => self::EXPIRY,
		);
	}

	public function has_license() {
		return true;
	}

	public function is_site_licensed() {
		return true;
	}

	public function is_network_licensed() {
		return true;
	}

	public function is_agency() {
		return true;
	}

	public function site_is_agency() {
		return true;
	}

	public function network_is_agency() {
		return true;
	}

	public function license_can($level = 'lite' ) {
		return true;
	}

	public function license_expired() {
		return false;
	}

	public function site_license_expired() {
		return false;
	}

	public function network_license_expired() {
		return false;
	}

	public function license_has_error() {
		return false;
	}

	public function site_license_has_error() {
		return false;
	}

	public function network_license_has_error() {
		return false;
	}

	public function site_license_disabled() {
		return false;
	}

	public function network_license_disabled() {
		return false;
	}

	public function site_license_invalid() {
		return false;
	}

	public function network_license_invalid() {
		return false;
	}

	public function get_license_expiry_date() {
		return self::EXPIRY;
	}

	public function get_site_license_expiry_date() {
		return self::EXPIRY;
	}

	public function get_network_license_expiry_date() {
		return self::EXPIRY;
	}

	public function set_site_license( $key ) {
		return true;
	}
}

if ( ! class_exists( 'MonsterInsights_License' ) ) {
	class_alias( 'Heretek_License', 'MonsterInsights_License' );
}
if ( ! class_exists( 'MonsterInsights_License_Compat' ) ) {
	class_alias( 'Heretek_License', 'MonsterInsights_License_Compat' );
}
