import { a1 as storeToRefs, o as openBlock, E as createBlock, D as withCtx, b as createVNode, u as unref, m as computed, j as ref } from "./toastStore-BFDhxKQh.js";
import { _ as __ } from "./default-i18n-KrIlCc2E.js";
import { u as useOverviewReportStore, b as buildApiFilters } from "../reports-CAGQu_Y_.js";
import { e as fetchSpendByHourData } from "./ecommerceReports-C7bVDt7g.js";
import { u as useReportPermissions } from "./useReportPermissions-CMVp6zeD.js";
import { u as useReport } from "./useReport-B0Jpe_cO.js";
import { f as generateSpendByHourSample } from "./ecommerceSampleData-CfcmM5cV.js";
import { a as formatCurr, f as formatPct, b as formatNum } from "./overviewTableFormatters-dHzA8ZV1.js";
import { a as aggregateDateEntityRows } from "./aggregateDateEntityRows-i7QMgwng.js";
import { g as getCompareDateLabels } from "./compareDateLabels-B56Y3XjZ.js";
import { R as ReportPageLayout } from "./ReportPageLayout-Bd5LX5mV.js";
import { _ as _sfc_main$2 } from "./ReportChartSection-CFGeV6ts.js";
import { _ as _sfc_main$1 } from "./ReportDataTable-BkTbvqUz.js";
import "./TheAppHeader-BvSxrQeu.js";
import "./ajax-C-oSp5vP.js";
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
import "./ReAuthModal-3Vk41c9q.js";
import "./auth-3SRm882Q.js";
import "./ApexLineChart-DDCTWf2E.js";
import "./vue3-apexcharts-D13Rajua.js";
import "./useChartColors-Bi1Kbjjv.js";
import "./LoadingSpinnerInline-DUh3WpRB.js";
import "./SiteNotes-CrGyAmHk.js";
import "./siteNotes-FbDvBF-G.js";
import "./useOverviewChartData-qvoUbzHf.js";
import "./ReportTableModal-diw6r5QT.js";
const _sfc_main = {
  __name: "EcommerceSpendByHourReport",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const { dateRange, activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const { isBlocked } = useReportPermissions({ minTier: "pro" });
    const activeChartTab = ref("revenue");
    const chartTabs = [
      { id: "revenue", label: __("Revenue", "google-analytics-for-wordpress"), icon: "revenue" },
      { id: "purchases", label: __("Purchases", "google-analytics-for-wordpress"), icon: "cart" }
    ];
    const isCompareActive = computed(
      () => !!(dateRange.value?.compareReport && dateRange.value?.compareStart && dateRange.value?.compareEnd)
    );
    function formatHourLabel(h) {
      if (h === 0) return "12 AM";
      if (h < 12) return `${h} AM`;
      if (h === 12) return "12 PM";
      return `${h - 12} PM`;
    }
    const hourEntries = computed(() => {
      const result = rawData.value?.spend_by_hour;
      const rows = Array.isArray(result?.rows) ? result.rows : [];
      return aggregateDateEntityRows(rows, { metricCount: 3, avgIndices: [] });
    });
    const hasCompareData = computed(
      () => isCompareActive.value && hourEntries.value.some((entry) => entry.previous)
    );
    function to24Hours(usePrevious) {
      const byHour = {};
      for (const entry of hourEntries.value) {
        const hourStr = String(entry.dims?.[0] ?? "").padStart(2, "0");
        const vals = usePrevious ? entry.previous : entry.current;
        if (!vals) continue;
        byHour[hourStr] = {
          revenue: vals[0] || 0,
          transactions: Math.round(vals[1] || 0),
          items: Math.round(vals[2] || 0)
        };
      }
      const result = [];
      for (let h = 0; h < 24; h++) {
        const key = String(h).padStart(2, "0");
        result.push(byHour[key] || { revenue: 0, transactions: 0, items: 0 });
      }
      return result;
    }
    function buildHourTable(hourly) {
      let totalTransactions = 0;
      let totalRevenue = 0;
      for (let h = 0; h < 24; h++) {
        totalTransactions += hourly[h].transactions;
        totalRevenue += hourly[h].revenue;
      }
      const tableData = [];
      for (let h = 0; h < 24; h++) {
        const { revenue, transactions, items } = hourly[h];
        const pctTx = totalTransactions > 0 ? transactions / totalTransactions * 100 : 0;
        const pctRev = totalRevenue > 0 ? revenue / totalRevenue * 100 : 0;
        const avg = transactions > 0 ? revenue / transactions : 0;
        tableData.push({
          hour: formatHourLabel(h),
          itemsSold: formatNum(items),
          transactions: formatNum(transactions),
          pctTransactions: formatPct(pctTx),
          revenue: formatCurr(revenue),
          pctRevenue: formatPct(pctRev),
          avgOrderValue: formatCurr(avg)
        });
      }
      return tableData;
    }
    const chartData = computed(() => {
      if (hourEntries.value.length === 0) return { categories: [], series: [] };
      const currHourly = to24Hours(false);
      const categories = [];
      const revenueCurr = [];
      const purchasesCurr = [];
      for (let h = 0; h < 24; h++) {
        categories.push(formatHourLabel(h));
        revenueCurr.push(Math.round(currHourly[h].revenue * 100) / 100);
        purchasesCurr.push(currHourly[h].transactions);
      }
      const primaryColor = "#3A93DD";
      const compareColor = "#A0AEC0";
      const isRevenueTab = activeChartTab.value === "revenue";
      const series = [];
      const colors = [];
      const strokeDashArray = [];
      series.push({
        name: isRevenueTab ? "Revenue" : "Purchases",
        data: isRevenueTab ? revenueCurr : purchasesCurr
      });
      colors.push(primaryColor);
      strokeDashArray.push(0);
      if (hasCompareData.value) {
        const prevHourly = to24Hours(true);
        const revenuePrev = [];
        const purchasesPrev = [];
        for (let h = 0; h < 24; h++) {
          revenuePrev.push(Math.round(prevHourly[h].revenue * 100) / 100);
          purchasesPrev.push(prevHourly[h].transactions);
        }
        series.push({
          name: "Previous Period",
          data: isRevenueTab ? revenuePrev : purchasesPrev
        });
        colors.push(compareColor);
        strokeDashArray.push(5);
      }
      return { categories, series, colors, strokeDashArray };
    });
    const columns = [
      { key: "hour", label: __("Hour", "google-analytics-for-wordpress"), sortable: true },
      { key: "itemsSold", label: __("Items Sold", "google-analytics-for-wordpress"), sortable: true },
      { key: "transactions", label: __("Transactions", "google-analytics-for-wordpress"), sortable: true },
      { key: "pctTransactions", label: __("% of Transactions", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "revenue", label: __("Revenue", "google-analytics-for-wordpress"), sortable: true },
      { key: "pctRevenue", label: __("% of Revenue", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "avgOrderValue", label: __("Avg. Order Value", "google-analytics-for-wordpress"), sortable: true, totalType: "average" }
    ];
    const tableRows = computed(() => {
      if (hourEntries.value.length === 0) return [];
      return buildHourTable(to24Hours(false));
    });
    const compareTableRows = computed(() => {
      if (!hasCompareData.value) return [];
      return buildHourTable(to24Hours(true));
    });
    const compareDateLabelsForTable = computed(() => getCompareDateLabels(dateRange.value));
    const { rawData, loading, error, reload } = useReport({
      fetch: () => fetchSpendByHourData(
        dateRange.value,
        buildApiFilters(storeActiveFilters.value, storeActiveDevice.value)
      ),
      sample: () => generateSpendByHourSample(dateRange.value),
      isBlocked,
      watch: [dateRange, storeActiveFilters, storeActiveDevice],
      guard: () => !!(dateRange.value?.start && dateRange.value?.end)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ReportPageLayout, {
        "required-license": "pro",
        "upsell-feature": "ecommerce-spend-by-hour",
        "required-addon": "ecommerce"
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
            "raw-dates": [],
            "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => activeChartTab.value = $event),
            onSiteNotesSaved: unref(reload)
          }, null, 8, ["active-tab", "chart-data", "loading", "error", "show-site-notes", "date-range", "onSiteNotesSaved"])
        ]),
        table: withCtx(() => [
          createVNode(_sfc_main$1, {
            title: unref(__)("Spending by Hour", "google-analytics-for-wordpress"),
            columns,
            rows: tableRows.value,
            "compare-rows": compareTableRows.value,
            "compare-date-labels": compareDateLabelsForTable.value,
            loading: unref(loading),
            "empty-message": unref(__)("No spending data for this time period.", "google-analytics-for-wordpress"),
            "required-addon": "ecommerce",
            "required-addon-name": "eCommerce"
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
