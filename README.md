# Heretek Analytics

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![PHP Version](https://img.shields.io/badge/PHP-7.4%20to%208.3-8892BF.svg)](https://www.php.net/)
[![WordPress Compatibility](https://img.shields.io/badge/WordPress-5.6+-21759B.svg)](https://wordpress.org/)
[![Status](https://img.shields.io/badge/Status-100%25%20Open%20Source-success.svg)]()
[![Features](https://img.shields.io/badge/Features-All%20Pro%2FAgency%20Unlocked-brightgreen.svg)]()

> **The 100% Free and Open-Source Google Analytics 4 (GA4) Plugin for WordPress.**  
> Permanent, complete unlock of all Pro and Agency tier reporting features, enhanced eCommerce, forms tracking, custom dimensions, PPC pixels, media analytics, and EU Consent Mode v2 — with **zero paywalls, zero license keys, zero telemetry, and zero phone-home tracking**.

---

## 🌟 Why Heretek Analytics?

Commercial WordPress analytics plugins lock essential business features — eCommerce conversion tracking, form submission attribution, custom dimensions, and real-time dashboards — behind expensive tiered subscriptions (up to $799/year). Furthermore, they route your private visitor reporting traffic through proprietary relay cloud proxies and bundle background telemetry pings.

**Heretek Analytics** is a 100% open-source fork of Google Analytics for WordPress (MonsterInsights 11.2.0), distributed under the **GNU General Public License v3.0 (GPLv3)**.

- 🔓 **Permanent Agency Tier Unlock**: Every report, module, and dashboard capability is available immediately upon activation.
- 🛡️ **Zero Telemetry & Absolute Privacy**: All phone-home checkins, Customer360 usage trackers, deactivation surveys, and marketing promotion rotators have been excised.
- ⚡ **Autonomous Local REST Gateway**: Vue 3 dashboard reports communicate directly with your local WordPress REST API and Google's GA4 Data API rather than third-party relay brokers.
- 🚫 **No Upsell Nags or Paywalls**: All upgrade banners, fake "Pro" lock badges, and promo menu entries are permanently removed.

---

## 📊 Feature Comparison

| Feature | Upstream Free (Lite) | Upstream Agency ($799/yr) | Heretek Analytics (Free & Open Source) |
|:---|:---:|:---:|:---:|
| **Core GA4 Tracking (gtag.js)** | ✅ | ✅ | ✅ |
| **Full Vue 3 Reports Dashboard** | ❌ (Limited) | ✅ | ✅ **Full Access** |
| **Enhanced eCommerce (WooCommerce & EDD)** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Form Conversion Tracking (WPForms, CF7, Gravity, Ninja, Fluent)** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Custom Dimensions (Authors, Tags, Categories, User Types, SEO)** | ❌ Paywalled | ✅ | ✅ **Built-in (9 dimensions)** |
| **PPC Ad Tracking (Google Ads, Meta Pixel & CAPI)** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Video & Media Tracking (YouTube, Vimeo, HTML5)** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **EU Compliance & Google Consent Mode v2** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **User Journey & Real-Time Reports** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Site Notes & Important Events** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Popular Posts & Products Widgets** | ❌ (Basic) | ✅ | ✅ **Full Access** |
| **PDF & Email Report Summaries** | ❌ Paywalled | ✅ | ✅ **Built-in** |
| **Telemetery & Tracking Free** | ❌ Phone-home | ❌ Phone-home | ✅ **100% Private (Zero Telemetry)** |
| **No External Proprietary Proxy Required** | ❌ Relay locked | ❌ Relay locked | ✅ **Autonomous Local Gateway** |
| **Cost** | Free (Crippled) | **$799 / year** | **$0 (GPLv3 Open Source Forever)** |

---

## 🚀 Built-in Pro Modules & Reports

### 1. Enhanced eCommerce Analytics
Complete GA4 eCommerce measurement for **WooCommerce** and **Easy Digital Downloads**:
- Item list impressions and product clicks.
- Product detail views (`view_item`).
- Cart addition and removals (`add_to_cart`, `remove_from_cart`).
- Checkout step tracking (`begin_checkout`).
- Purchase tracking with full transaction ID, revenue, tax, and currency attribution (`purchase`).

### 2. Automated Forms Tracking
Automatically detects and tracks impressions and conversions without manual event tags:
- **WPForms**, **Gravity Forms**, **Contact Form 7**, **Ninja Forms**, **Fluent Forms**, and **Formidable Forms**.
- Generic HTML forms with automated debounced submission listeners.

### 3. Custom Dimensions
Deep contextual categorization registered directly with GA4:
1. `author` — Performance attribution by post author.
2. `post_type` — Breakdowns by post, page, product, or custom post type.
3. `category` — Primary taxonomy category.
4. `tags` — Associated article tags.
5. `logged_in` — User authentication status (`yes` / `no`).
6. `wp_user_id` — WordPress user ID tracking for membership sites.
7. `seo_score` — Content quality / SEO rating.
8. `focus_keyword` — Target SEO keywords.
9. `publish_date` — Content age analysis.

### 4. PPC & Ad Attribution
- **Google Ads**: Track conversions with Conversion ID and Remarketing / Conversion Label.
- **Meta Ads**: Facebook Pixel event integration with server-side CAPI compatibility.

### 5. Media & Video Tracking
Measure engagement and video completion drop-offs:
- Embedded **YouTube** iframe API integration.
- Embedded **Vimeo** player API tracking.
- Native **HTML5 `<video>`** play, progress (25%, 50%, 75%), and completion events.

### 6. EU Compliance & Privacy Guard
- **Google Consent Mode v2**: Default granted/denied states for `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`.
- **Privacy Guard**: Automatic sanitization of query parameters and URL paths to strip personally identifiable information (PII) before transmission.

### 7. Autonomous Local REST Gateway
Frontend Vue 3 dashboard charts query the local endpoint at:
```
POST /wp-json/heretek-analytics/v1/reporting/api/v3/reporting/query
```
This local gateway handles authentication, executes report data queries, and formats metrics to render reports entirely independently of upstream servers.

---

## 📦 Installation

### Option A: Install via WordPress Admin (Recommended)
1. Download the latest `heretek-analytics.zip` from the [Releases](https://github.com/Heretek-AI/Heretek-Analytics/releases) page.
2. In your WordPress Dashboard, navigate to **Plugins** > **Add New** > **Upload Plugin**.
3. Select `heretek-analytics.zip` and click **Install Now**.
4. Click **Activate Plugin**.

### Option B: Install via Git Clone
Clone directly into your WordPress `wp-content/plugins` directory:
```bash
cd wp-content/plugins
git clone https://github.com/Heretek-AI/Heretek-Analytics.git heretek-analytics
```
Activate the plugin from **Plugins** in your WordPress dashboard or via WP-CLI:
```bash
wp plugin activate heretek-analytics
```

---

## ⚙️ Configuration

1. **Add your Measurement ID**:
   - Go to **Insights** > **Settings** in your WordPress admin menu.
   - Enter your GA4 Measurement ID (`G-XXXXXXXXXX`).
2. **Set up Measurement Protocol Secret (Optional for Server-side Events)**:
   - In Google Analytics, navigate to **Admin** > **Data Streams** > **Measurement Protocol API secrets**.
   - Create a secret and paste it into the **API Secret** field.
3. **Configure Direct Reporting Gateway**:
   - Set up your Google Cloud Service Account JSON key or OAuth credentials under **Insights** > **Settings** > **Reporting API** to populate dashboard charts directly from GA4.

---

## 🛠️ Development & Building

To create a clean release ZIP archive:
```bash
# Clone the repository
git clone https://github.com/Heretek-AI/Heretek-Analytics.git
cd Heretek-Analytics

# Verify all PHP files pass linting
find . -name "*.php" -exec php -l {} +

# Package distribution ZIP
mkdir -p dist/heretek-analytics
rsync -av --exclude='.git*' --exclude='.github' --exclude='dist' --exclude='*.zip' ./ dist/heretek-analytics/
cd dist && zip -r ../heretek-analytics.zip heretek-analytics/
```

Continuous Integration via GitHub Actions automatically verifies PHP 7.4 through 8.3 compatibility and builds release archives on every tag push.

---

## 📄 License & Attribution

Heretek Analytics is free software licensed under the **[GNU General Public License v3.0 (GPLv3)](LICENSE)**.

- **Upstream Authors**: Chris Christoff, Yoast, MonsterInsights Team, Awesome Motive, Inc.
- **Maintainer & Fork Author**: Heretek AI (`https://github.com/Heretek-AI`)

### Trademark Notice
*Heretek Analytics* is an independent open-source project and is not affiliated with, sponsored by, or endorsed by MonsterInsights, LLC or Awesome Motive, Inc. "MonsterInsights" is a trademark of MonsterInsights, LLC.

---

## 🤝 Contributing

Contributions, bug reports, and pull requests are welcome! Please open an issue or submit a PR on [GitHub](https://github.com/Heretek-AI/Heretek-Analytics).
