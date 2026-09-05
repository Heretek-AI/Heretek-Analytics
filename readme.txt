=== Heretek Analytics ===
Contributors: Heretek-AI
Tags: analytics, google analytics, ga4, privacy
Requires at least: 5.6.0
Tested up to: 6.9
Stable tag: 11.2.0
Requires PHP: 7.4
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

A 100% self-hosted Google Analytics 4 plugin for WordPress. Configure with a Measurement ID plus a Google Cloud service account JSON; reports come straight from the GA4 Data API. No subscriptions, no phone-homes, no paywalls.

== Description ==

= Heretek Analytics =

Heretek Analytics is an open-source, telemetry-free fork of Google Analytics for WordPress, distributed under the GNU General Public License v3.0 (GPLv3).

Unlike commercial distributions, Heretek Analytics does not phone home to a third-party SaaS, does not gate capabilities behind a license key, and does not relay reporting traffic through external proxies. The plugin speaks directly to Google Analytics 4 on behalf of your site.

= What you get =

* **Core GA4 tracking (gtag.js)** — automatic page-view, scroll, download, affiliate-link, form-submission, and AMP tracking.
* **In-admin Reports dashboard** — pure-PHP, server-rendered KPI tiles, a daily-sessions chart, top-pages table, and top-countries table.
* **Direct GA4 Data API gateway** — the REST endpoint `/wp-json/heretek-analytics/v1/reporting/query` mints a JWT with your service account, exchanges it for an OAuth2 token, and calls `analyticsdata.googleapis.com` directly.
* **Google Consent Mode v2** — EEA compliance helpers in `includes/admin/eea-compliance.php`.
* **Server-side GA4 Measurement Protocol** — `MonsterInsights_Measurement_Protocol_V4`.
* **Per-page tracking exclusion** — editor sidebar metabox.
* **Native GitHub Releases updater** — automatic, no license keys.
* **Settings export** — JSON download from the Tools page.

== Installation ==

1. Download the latest `heretek-analytics.zip` release from https://github.com/Heretek-AI/Heretek-Analytics/releases
2. In your WordPress admin, go to **Plugins** > **Add New** > **Upload Plugin**.
3. Select `heretek-analytics.zip` and click **Install Now**.
4. Activate the plugin.
5. In your admin sidebar, navigate to **Heretek Analytics** > **Settings** and fill in three fields:
   * **GA4 Measurement ID** — `G-XXXXXXXXXX`
   * **GA4 Property ID** — numeric (find under Admin > Property settings > Property ID)
   * **Service Account JSON** — a Google Cloud service account key (see the FAQ below).

== Frequently Asked Questions ==

= Do I need a license key? =
No. Heretek Analytics is 100% free software licensed under GPLv3. There are no paid tiers, no license keys, and no subscriptions.

= Does this plugin send data to third-party servers? =
No. Heretek Analytics never contacts monsterinsights.com, exactmetrics.com, or any other third-party SaaS. The only outbound HTTP requests are to Google (`googletagmanager.com`, `analyticsdata.googleapis.com`, `oauth2.googleapis.com`) for GA4 tracking and reporting.

= How do I create a Google Cloud service account for the GA4 Data API? =
1. Open Google Cloud Console and pick (or create) a project.
2. APIs & Services -> Library -> enable "Google Analytics Data API".
3. IAM & Admin -> Service Accounts -> Create Service Account, then Keys -> Add Key -> Create new key -> JSON. Save the downloaded JSON file.
4. In GA4, open Admin -> Property access management and add the service-account email (it looks like `[email protected]`) as a Viewer.
5. Paste the entire contents of the JSON file into the "Service Account JSON" field on the Settings page.

= How do updates work? =
Heretek Analytics includes an integrated GitHub Releases updater. When a new version is tagged on GitHub (`Heretek-AI/Heretek-Analytics`), your WordPress admin will notify you under Dashboard -> Updates and allow one-click in-place upgrading.

== Changelog ==

= 11.2.0 =
* Complete retheme to Heretek "Blood & Steel" aesthetic.
* Integrated native GitHub Releases updater (Heretek-AI/Heretek-Analytics).
* Purged all upstream telemetry, promotional rotators, and phone-home beacons.
* Autonomous Local REST Reporting Gateway for direct GA4 Data API queries.
* Full Pro/Agency tier reporting modules unlocked.

= 12.0.0 =
* Stand-alone, no SaaS: dropped every call to monsterinsights.com / exactmetrics.com / app.monsterinsights.com / connect.monsterinsights.com / upgrade.monsterinsights.com / plugin-cdn.monsterinsights.com / ai-api.monsterinsights.com.
* Removed the entire Vue 3 admin app (lite/assets/vue3/ and pro/assets/vue3/). Settings, Reports, Tools, Addons, and About pages are now pure PHP.
* Removed MonsterInsights Connect / API-Auth / API-Request / Notifications / Feature-Feedback / Charitable / Last-Seen / Usage-Tracking / Review / Setup-Checklist / Onboarding classes.
* Removed all upstream Pro-modules (eCommerce, Forms, Media, Custom Dimensions, PPC, EU Compliance) and the popular-posts / gutenberg / email-summaries sub-systems.
* Added GA4 Data API direct integration: the REST gateway mints a service-account JWT, exchanges it for an OAuth2 token, and queries `analyticsdata.googleapis.com/v1beta/properties/{id}:runReport`.
* Settings page now has a three-field form (Measurement ID + GA4 Property ID + Google Cloud service account JSON) with a "Verify Credentials" button that confirms service-account access.
* Reports page is server-rendered with real GA4 data — daily sessions chart, top-pages table, top-countries table.
* New Tools page (settings export + environment read-out) and About page.
