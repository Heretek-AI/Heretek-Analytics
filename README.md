<h1 align="center">
  <img src="assets/images/icon-sm.png" width="80" alt="Heretek Analytics logo"><br>
  Heretek Analytics
</h1>

<p align="center">
  <strong>The Unrestricted GA4 Data Augur &amp; Telemetry Cogitator for WordPress</strong><br>
  <em>Forged by <a href="https://github.com/Heretek-AI">Heretek AI</a> · 100% Open Source · All Pro &amp; Agency Abilities Unlocked</em>
</p>

<p align="center">
  <em>A 100% self-hosted Google Analytics 4 plugin for WordPress. Configure with a Measurement ID and a Google Cloud service account JSON; reports come straight from the GA4 Data API. Zero subscriptions, zero phone-homes, zero paywalls.</em>
</p>

<div align="center">

[![Version](https://img.shields.io/github/v/release/Heretek-AI/Heretek-Analytics?label=version&color=dc2626)](https://github.com/Heretek-AI/Heretek-Analytics/releases)
[![License](https://img.shields.io/badge/license-GPL--3.0-dc2626.svg)](LICENSE)
[![PHP](https://img.shields.io/badge/PHP-%3E%3D7.4-8892BF.svg)](https://php.net)
[![WordPress](https://img.shields.io/badge/WordPress-%3E%3D5.6-21759B.svg)](https://wordpress.org)
[![Telemetry](https://img.shields.io/badge/Telemetry-Zero%20Phone--Home-brightgreen.svg)](#-zero-telemetry-manifesto)
[![GitHub Issues](https://img.shields.io/github/issues/Heretek-AI/Heretek-Analytics)](https://github.com/Heretek-AI/Heretek-Analytics/issues)
[![GitHub Stars](https://img.shields.io/github/stars/Heretek-AI/Heretek-Analytics?style=social)](https://github.com/Heretek-AI/Heretek-Analytics)

**[Quick Start](#-quick-start) · [Capabilities](#-capabilities) · [GA4 Data API Gateway](#-ga4-data-api-gateway) · [Theme: Blood & Steel](#-the-blood--steel-theme) · [GitHub Updater](#-native-in-dashboard-github-updates) · [Contributing](#-contributing)**

</div>

---

## ⚙️ About Heretek Analytics

**Heretek Analytics** is a 100% open-source, telemetry-free fork and overhaul of Google Analytics for WordPress (MonsterInsights), distributed under the **GNU General Public License v3.0 (GPLv3)**.

Upstream commercial analytics distributions artificially cordon vital enterprise capabilities — eCommerce funnels, form submission tracking, custom dimensions, PPC pixel tracking, and raw reporting data — behind expensive annual paywalls (up to $799/year). Worse, they relay your site's proprietary visitor statistics through third-party cloud proxy servers and bundle unsolicited marketing rotators, deactivation surveys, and tracking telemetry.

**Heretek Analytics liberates the Machine Spirit:**
- 🔓 **Stand-alone, no subscription, no license key, no paywall** — the entire feature surface is shipped in the plugin and never gated behind a third-party API call.
- 🛡️ **Zero Telemetry Manifesto**: All upstream phone-home beacons, Customer360 usage trackers, third-party notification feeds, upsell banners, hosted "Connect" portals, and deactivation-survey relays have been purged.
- ⚡ **Direct GA4 Data API Gateway**: The admin Reports dashboard calls `analyticsdata.googleapis.com` directly using a Google Cloud service account JSON key you supply — no relays, no SaaS proxies.
- 🩸 **Blood & Steel Aesthetic**: Pure-PHP admin pages styled in the dark cyber-theurgy aesthetic of the Adeptus Mechanicus — Obsidian void surfaces, Cinzel gothic tech typography, glowing crimson telemetry readouts.
- 🔄 **Native In-Dashboard GitHub Releases Updater**: Automated release detection and one-click upgrades directly from [`Heretek-AI/Heretek-Analytics/releases`](https://github.com/Heretek-AI/Heretek-Analytics/releases).

---

## ⚙️ Capabilities

| Subsystem | Heretek Analytics |
|:---|:---:|
| **Core GA4 tracking (gtag.js)** | ✅ Auto page-view, scroll, download, affiliate-link, form, AMP |
| **Author & author_id tracking** | ✅ Emitted as gtag config keys on singular views |
| **In-admin Reports dashboard** | ✅ Pure-PHP, server-rendered KPI tiles + charts + tables |
| **Date-range filter** | ✅ Two `<input type="date">` fields, GET round-trip, no JS |
| **Authors sub-page** | ✅ Per-author ranking with CSV export |
| **Direct GA4 Data API reporting** | ✅ Real data via service-account JWT — no random-number stub |
| **Google Consent Mode v2** | ✅ EEA compliance helpers in `includes/admin/eea-compliance.php` |
| **Server-side GA4 Measurement Protocol** | ✅ `MonsterInsights_Measurement_Protocol_V4` |
| **Per-page tracking exclusion** | ✅ Editor sidebar metabox |
| **Native GitHub release updater** | ✅ Automatic, no license keys |
| **Settings export** | ✅ JSON download from the Tools page |
| **Telemetry / phone-home / SaaS relay** | ❌ None |
| **License key / subscription / paywall** | ❌ None |
| **Cost** | **$0 forever (GPLv3)** |

---

## 🩸 The Blood & Steel Theme

Heretek Analytics renders its admin pages in a dark, gothic-tech aesthetic:

- **Void Surfaces**: Obsidian canvas (`#09090b`), tech-slab cards (`#111116`), deep carbon borders (`#27272a`), and crimson glows.
- **Sacred Typography**: **Cinzel Bold** headings for hierarchy paired with **Geist** for numeric readouts.
- **Suppression of Upstream Clutter**: No commercial upsell cards, no fake lock badges, no promotional notification rotators. The Settings page is a single form. The Reports page is KPI tiles + tables + a daily chart. A separate **Authors** sub-page ranks authors by sessions and page views with a CSV export.

---

## 📐 Author tracking & custom dimensions

Heretek Analytics emits two gtag config keys on every singular view (post, page, custom post type):

| gtag key | Source | Purpose |
|---|---|---|
| `author` | `get_the_author_meta( 'display_name', $author_id )` | Human-readable author name. |
| `author_id` | `(int) $queried_object->post_author` | Numeric WordPress user ID — stable across renames. |

To surface these in GA4 reports, register two **User-scoped** custom dimensions in **GA4 → Admin → Property → Custom definitions** with the exact API names `author` and `author_id`. Then visit **Heretek Analytics → Authors** (or the Top Authors panel on the Reports page) to see them populated.

The PHP query spec is:

```php
array(
    'id'         => 'authors',
    'dimensions' => array( 'customUser:author_id' ),
    'metrics'    => array( 'sessions', 'totalUsers', 'screenPageViews', 'engagedSessions' ),
)
```

To switch the panel to display names instead of IDs, change `customUser:author_id` to `customUser:author` in `includes/admin/pages/authors.php` and `includes/admin/pages/reports.php`.

---

## 🚀 Quick Start

### 1. Installation

#### Option A: Install via WordPress Admin
1. Download the latest `heretek-analytics.zip` from **[Releases](https://github.com/Heretek-AI/Heretek-Analytics/releases)**.
2. In your WordPress Dashboard, navigate to **Plugins** → **Add New** → **Upload Plugin**.
3. Select `heretek-analytics.zip` and click **Install Now**.
4. Click **Activate Plugin**.

#### Option B: Clone via Git
```bash
cd wp-content/plugins
git clone https://github.com/Heretek-AI/Heretek-Analytics.git heretek-analytics
wp plugin activate heretek-analytics
```

### 2. Configuration

1. In your WordPress admin sidebar, locate the cog icon and click **Heretek Analytics** → **Settings**.
2. Fill in three fields and click **Save Settings**:
   - **GA4 Measurement ID** — the `G-XXXXXXXXXX` string from your GA4 property.
   - **GA4 Property ID** — the numeric ID (`Admin → Property settings → Property ID`).
   - **Service Account JSON** — a Google Cloud service account key (see below).
3. Click **Verify Credentials** to confirm the service account has access to the GA4 property.
4. Once saved, visit **Reports** in the same sidebar to see real GA4 data.

### 3. Create a Google Cloud service account (one-time, ~3 minutes)

1. Open [Google Cloud Console](https://console.cloud.google.com/) and pick (or create) a project.
2. **APIs & Services → Library** → enable **Google Analytics Data API**.
3. **IAM & Admin → Service Accounts** → **Create Service Account**, then **Keys → Add Key → Create new key → JSON**. Save the downloaded JSON file.
4. Paste the **entire contents** of the JSON file into the **Service Account JSON** field on the Settings page.
5. In [GA4](https://analytics.google.com/), open **Admin → Property access management** and add the service account email (it looks like `[email protected]`) as a **Viewer**.

That's it — no WordPress license keys, no MonsterInsights account, no third-party relay.

---

## 🔄 Native In-Dashboard GitHub Updates

Heretek Analytics includes an integrated GitHub Releases updater:
- Automatically scans `Heretek-AI/Heretek-Analytics/releases` every 12 hours.
- Matches release packages (`heretek-analytics.zip`).
- Injects update notifications directly into **Dashboard** → **Updates** and the **Plugins** table.
- Perform seamless, one-click in-place updates without entering commercial license keys.

---

## 🌐 GA4 Data API Gateway

Reporting data flows straight from Google — never through a third-party proxy:

```
POST /wp-json/heretek-analytics/v1/reporting/query
```

The PHP gateway `includes/api/class-heretek-rest-reporting-gateway.php`:

1. Mints a JWT signed with your service-account private key.
2. Exchanges the JWT for an OAuth2 bearer token at `oauth2.googleapis.com/token` (cached for 50 minutes).
3. Calls `analyticsdata.googleapis.com/v1beta/properties/{id}:runReport` with the bearer token.
4. Returns a normalised rows array to the admin Reports page.

The same gateway powers a `verify_credentials()` helper used by the **Verify Credentials** button on the Settings page.

---

## 🛡️ Zero Telemetry Manifesto

Heretek Analytics operates with total respect for data sovereignty:
- **No Phone-Homes**: No license heartbeat checks, pingbacks, hosted onboarding portal redirects, or SaaS beacons. The plugin never reaches `monsterinsights.com`, `exactmetrics.com`, `app.monsterinsights.com`, `api.monsterinsights.com`, `connect.monsterinsights.com`, `upgrade.monsterinsights.com`, `plugin-cdn.monsterinsights.com`, or `ai-api.monsterinsights.com`.
- **No Third-Party Feeds**: The remote notification JSON feed and remote translations CDN are gone.
- **No Commercial Upsells**: The "Connect to MonsterInsights" wizard, the rotating promo menu items (Earth Day, Halloween, …), the wpconsent install notice, and the WPForms / UserFeedback / OptinMonster cross-promos are all removed.
- **No Vue app**: The admin UI is plain PHP, so there is no JS bundle phoning home.
- **Privacy Guard**: Sensitive query parameters are stripped before transmission to Google Analytics.

---

## 🛠️ Build & Packaging

To forge a production distribution package:

```bash
# Clone the repository
git clone https://github.com/Heretek-AI/Heretek-Analytics.git
cd Heretek-Analytics

# Verify syntax across all PHP scripts
find . -name "*.php" -exec php -l {} +

# Package distribution ZIP archive
mkdir -p dist/heretek-analytics
rsync -av --exclude='.git*' --exclude='.github' --exclude='dist' --exclude='*.zip' ./ dist/heretek-analytics/
cd dist && zip -r ../heretek-analytics.zip heretek-analytics/
```

---

## 📄 License & Attribution

Heretek Analytics is free software licensed under the **[GNU General Public License v3.0 (GPLv3)](LICENSE)**.

- **Upstream Authors**: Chris Christoff, Yoast, MonsterInsights Team, Awesome Motive, Inc.
- **Fork Architect & Maintainer**: [Heretek AI](https://github.com/Heretek-AI)

### Disclaimer
*Heretek Analytics* is an independent, community-driven open-source project and is not affiliated with, sponsored by, or endorsed by MonsterInsights, LLC or Awesome Motive, Inc. "MonsterInsights" is a trademark of MonsterInsights, LLC.

---

## 🤝 Contributing

Pull requests, telemetry enhancements, and bug reports are welcome in the Omnissiah's service. Please submit issues or PRs via [GitHub Issues](https://github.com/Heretek-AI/Heretek-Analytics/issues).
