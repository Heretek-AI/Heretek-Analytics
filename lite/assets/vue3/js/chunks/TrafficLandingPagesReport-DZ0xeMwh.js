import { a1 as storeToRefs, o as openBlock, E as createBlock, D as withCtx, b as createVNode, u as unref, m as computed, j as ref } from "./toastStore-BFDhxKQh.js";
import { _ as __ } from "./default-i18n-KrIlCc2E.js";
import { u as useOverviewReportStore, b as buildApiFilters } from "../reports-CAGQu_Y_.js";
import { c as generateTrafficLandingPagesSample, d as fetchTrafficLandingPagesData } from "./trafficSampleData-OLCJUN9c.js";
import { u as useReportPermissions } from "./useReportPermissions-CMVp6zeD.js";
import { u as useReport } from "./useReport-B0Jpe_cO.js";
import { a as formatCurr, f as formatPct, b as formatNum } from "./overviewTableFormatters-dHzA8ZV1.js";
import { f as formatDateLabel } from "./useOverviewChartData-qvoUbzHf.js";
import { j as getMiGlobal } from "./ajax-C-oSp5vP.js";
import { a as aggregateDateEntityRows } from "./aggregateDateEntityRows-i7QMgwng.js";
import { g as getCompareDateLabels } from "./compareDateLabels-B56Y3XjZ.js";
import { s as shouldHideNotSetValue } from "./reportValues-CMJcTH_s.js";
import { R as ReportPageLayout } from "./ReportPageLayout-Bd5LX5mV.js";
import { _ as _sfc_main$2 } from "./ReportChartSection-CFGeV6ts.js";
import { _ as _sfc_main$1 } from "./ReportDataTable-BkTbvqUz.js";
import "./TheAppHeader-BvSxrQeu.js";
import "./AppOverlays-DGxRP-4a.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./dateIntervals-BPoui_3H.js";
import "./addons-Bf1m2lwx.js";
import "./useNotices-Dhx8Of2G.js";
import "./Modal-UAnTro5Z.js";
import "./Icon-BFlAZSOo.js";
import "./useAuthGate-C_NQX5oE.js";
import "./flatpickr-BYuwqjaD.js";
import "./useFeatureGate-BsTOJNuR.js";
import "./UniversallyPromo-BzsvCRPf.js";
import "./reportCache-CA21a8cP.js";
import "./settings-BjRrUnzx.js";
import "./ReAuthModal-3Vk41c9q.js";
import "./auth-3SRm882Q.js";
import "./ApexLineChart-DDCTWf2E.js";
import "./vue3-apexcharts-D13Rajua.js";
import "./useChartColors-Bi1Kbjjv.js";
import "./LoadingSpinnerInline-DUh3WpRB.js";
import "./SiteNotes-CrGyAmHk.js";
import "./siteNotes-FbDvBF-G.js";
import "./ReportTableModal-diw6r5QT.js";
const _sfc_main = {
  __name: "TrafficLandingPagesReport",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const { dateRange, activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const { isBlocked } = useReportPermissions({ minTier: "plus" });
    const activeChartTab = ref("sessions");
    const chartTabs = [
      { id: "sessions", label: __("Sessions", "google-analytics-for-wordpress"), icon: "users" },
      { id: "pageviews", label: __("Pageviews", "google-analytics-for-wordpress"), icon: "view" }
    ];
    const chartRawDates = computed(() => {
      const chartResult = rawData.value?.sessions_chart;
      if (!chartResult?.rows?.length) return [];
      return chartResult.rows.map((row) => row?.d?.[0] || "");
    });
    const isCompareActive = computed(
      () => !!(dateRange.value?.compareReport && dateRange.value?.compareStart && dateRange.value?.compareEnd)
    );
    const chartData = computed(() => {
      const chartResult = rawData.value?.sessions_chart;
      if (!chartResult?.rows?.length) return { categories: [], series: [] };
      const rows = chartResult.rows;
      const categories = [];
      const sessionsCurr = [];
      const pageViewsCurr = [];
      const sessionsPrev = [];
      const pageViewsPrev = [];
      const firstM = rows[0]?.m;
      const isCompareFormat = Array.isArray(firstM) && firstM.length === 2 && Array.isArray(firstM[0]) && firstM[0].length === 2 && isCompareActive.value;
      for (const row of rows) {
        const date = row?.d?.[0] || "";
        categories.push(formatDateLabel(date));
        if (isCompareFormat) {
          const mSessions = row?.m?.[0] || [];
          const mPageViews = row?.m?.[1] || [];
          sessionsPrev.push(Number(mSessions[0]) || 0);
          sessionsCurr.push(Number(mSessions[1]) || 0);
          pageViewsPrev.push(Number(mPageViews[0]) || 0);
          pageViewsCurr.push(Number(mPageViews[1]) || 0);
        } else {
          const m0 = Array.isArray(row?.m?.[0]) ? row.m[0] : [];
          sessionsCurr.push(Number(m0[0]) || 0);
          pageViewsCurr.push(Number(m0[1]) || 0);
        }
      }
      const primaryColor = "#3A93DD";
      const compareColor = "#A0AEC0";
      const isSessionsTab = activeChartTab.value === "sessions";
      const series = [];
      const colors = [];
      const strokeDashArray = [];
      series.push({
        name: isSessionsTab ? "Sessions" : "Pageviews",
        data: isSessionsTab ? sessionsCurr : pageViewsCurr
      });
      colors.push(primaryColor);
      strokeDashArray.push(0);
      if (isCompareFormat) {
        series.push({
          name: "Previous Period",
          data: isSessionsTab ? sessionsPrev : pageViewsPrev
        });
        colors.push(compareColor);
        strokeDashArray.push(5);
      }
      return { categories, series, colors, strokeDashArray };
    });
    const columns = [
      { key: "landingPage", label: __("Landing Page", "google-analytics-for-wordpress"), sortable: true, linkKey: "landingPageUrl" },
      { key: "sessions", label: __("Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "engagedSessions", label: __("Engaged Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "pagesPerSession", label: __("Pages / Sessions", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "purchases", label: __("Purchases", "google-analytics-for-wordpress"), sortable: true },
      { key: "conversionRate", label: __("Conversion Rate", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "revenue", label: __("Revenue", "google-analytics-for-wordpress"), sortable: true }
    ];
    const aggregatedLandingPages = computed(
      () => aggregateDateEntityRows(rawData.value?.landing_pages_table?.rows, {
        metricCount: 6,
        avgIndices: [2, 4],
        weightIndex: 0
      }).filter((entity) => !shouldHideNotSetValue(entity.dims?.[0]))
    );
    function formatLandingRow(dims, vals) {
      const siteUrl = getMiGlobal("site_url", "");
      const landingPage = dims[0] != null && String(dims[0]).trim() !== "" ? String(dims[0]) : __("(not set)", "google-analytics-for-wordpress");
      return {
        landingPage,
        // Sample rows are fabricated paths (`/pricing/`, `/features/`…) that almost
        // certainly don't exist on the site, so leave the URL empty — ReportDataTable
        // then renders plain text instead of a link that would 404.
        landingPageUrl: isSample.value ? "" : siteUrl + landingPage,
        sessions: formatNum(vals[0] || 0),
        engagedSessions: formatNum(vals[1] || 0),
        pagesPerSession: (vals[2] || 0).toFixed(2),
        purchases: formatNum(vals[3] || 0),
        // API returns session key event rate as a decimal (0.05 = 5%)
        conversionRate: formatPct((vals[4] || 0) * 100),
        revenue: formatCurr(vals[5] || 0)
      };
    }
    const tableRows = computed(
      () => aggregatedLandingPages.value.map((entity) => formatLandingRow(entity.dims, entity.current))
    );
    const compareRows = computed(
      () => aggregateDateEntityRows(rawData.value?.landing_pages_table_prev?.rows, {
        metricCount: 6,
        avgIndices: [2, 4],
        weightIndex: 0
      }).map((entity) => formatLandingRow(entity.dims, entity.current))
    );
    const compareDateLabelsForTable = computed(() => getCompareDateLabels(dateRange.value));
    const { rawData, loading, error, isSample, reload } = useReport({
      fetch: () => fetchTrafficLandingPagesData(
        dateRange.value,
        buildApiFilters(storeActiveFilters.value, storeActiveDevice.value)
      ),
      sample: () => generateTrafficLandingPagesSample(dateRange.value),
      isBlocked,
      watch: [dateRange, storeActiveFilters, storeActiveDevice],
      guard: () => !!(dateRange.value?.start && dateRange.value?.end)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ReportPageLayout, {
        "required-license": "plus",
        "upsell-feature": "traffic-landing-pages"
      }, {
        chart: withCtx(() => [
          createVNode(_sfc_main$2, {
            tabs: chartTabs,
            "active-tab": activeChartTab.value,
            "chart-data": chartData.value,
            loading: unref(loading),
            error: unref(error),
            "show-site-notes": !unref(isBlocked),
            "date-range": unref(overviewStore).dateRange,
            "raw-dates": chartRawDates.value,
            "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => activeChartTab.value = $event),
            onSiteNotesSaved: unref(reload)
          }, null, 8, ["active-tab", "chart-data", "loading", "error", "show-site-notes", "date-range", "raw-dates", "onSiteNotesSaved"])
        ]),
        table: withCtx(() => [
          createVNode(_sfc_main$1, {
            title: unref(__)("Top Landing Pages", "google-analytics-for-wordpress"),
            columns,
            rows: tableRows.value,
            "compare-rows": compareRows.value,
            "compare-date-labels": compareDateLabelsForTable.value,
            loading: unref(loading),
            searchable: "",
            "empty-message": unref(__)("No data currently for the Landing Page report.", "google-analytics-for-wordpress")
          }, null, 8, ["title", "rows", "compare-rows", "compare-date-labels", "loading", "empty-message"])
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
