import { a1 as storeToRefs, o as openBlock, E as createBlock, D as withCtx, b as createVNode, u as unref, m as computed } from "./toastStore-BFDhxKQh.js";
import { _ as __ } from "./default-i18n-KrIlCc2E.js";
import { u as useOverviewReportStore, b as buildApiFilters } from "../reports-CAGQu_Y_.js";
import { h as fetchRefundsByGeoData } from "./ecommerceReports-C7bVDt7g.js";
import { u as useReportPermissions } from "./useReportPermissions-CMVp6zeD.js";
import { u as useReport } from "./useReport-B0Jpe_cO.js";
import { i as generateRefundsByGeoSample } from "./ecommerceSampleData-CfcmM5cV.js";
import { a as formatCurr, b as formatNum, f as formatPct } from "./overviewTableFormatters-dHzA8ZV1.js";
import { a as aggregateDateEntityRows } from "./aggregateDateEntityRows-i7QMgwng.js";
import { g as getCompareDateLabels } from "./compareDateLabels-B56Y3XjZ.js";
import { s as shouldHideNotSetValue } from "./reportValues-CMJcTH_s.js";
import { R as ReportPageLayout } from "./ReportPageLayout-Bd5LX5mV.js";
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
import "./settings-BjRrUnzx.js";
import "./ReAuthModal-3Vk41c9q.js";
import "./auth-3SRm882Q.js";
import "./LoadingSpinnerInline-DUh3WpRB.js";
import "./ReportTableModal-diw6r5QT.js";
const _sfc_main = {
  __name: "EcommerceRefundsByGeoReport",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const { dateRange, activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const { isBlocked } = useReportPermissions({ minTier: "pro" });
    const columns = [
      { key: "location", label: __("Location", "google-analytics-for-wordpress"), sortable: true },
      { key: "refunds", label: __("Refunds", "google-analytics-for-wordpress"), sortable: true },
      { key: "pctRefunds", label: __("% of Refunds", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "refundAmount", label: __("Refund Amount", "google-analytics-for-wordpress"), sortable: true },
      { key: "pctRefundAmount", label: __("% of Refund Amount", "google-analytics-for-wordpress"), sortable: true, totalType: "average" },
      { key: "transactions", label: __("Transactions", "google-analytics-for-wordpress"), sortable: true },
      { key: "avgOrderValue", label: __("Avg. Order Value", "google-analytics-for-wordpress"), sortable: true, totalType: "average" }
    ];
    const aggregatedGeo = computed(
      () => aggregateDateEntityRows(rawData.value?.refunds_geo_table?.rows, {
        metricCount: 3,
        avgIndices: [],
        weightIndex: 0
      })
    );
    function formatGeoRow(dims, vals, totals) {
      const refunds = vals[0] || 0;
      const refundAmount = Math.abs(vals[1] || 0);
      const transactions = vals[2] || 0;
      const pctRefunds = totals.refunds > 0 ? refunds / totals.refunds * 100 : 0;
      const pctAmount = totals.refundAmount > 0 ? refundAmount / totals.refundAmount * 100 : 0;
      const avgOrderValue = transactions > 0 ? refundAmount / transactions : 0;
      return {
        location: String(dims[0] || "").trim() || "(not set)",
        refunds: formatNum(refunds),
        pctRefunds: formatPct(pctRefunds),
        refundAmount: formatCurr(refundAmount),
        pctRefundAmount: formatPct(pctAmount),
        transactions: formatNum(transactions),
        avgOrderValue: formatCurr(avgOrderValue)
      };
    }
    function periodTotals(entities, pick) {
      let refunds = 0;
      let refundAmount = 0;
      for (const entity of entities) {
        const vals = pick(entity);
        refunds += vals[0] || 0;
        refundAmount += Math.abs(vals[1] || 0);
      }
      return { refunds, refundAmount };
    }
    const tableRows = computed(() => {
      const entities = aggregatedGeo.value.filter((entity) => (entity.current[0] || 0) > 0).filter((entity) => !shouldHideNotSetValue(entity.dims[0]));
      const totals = periodTotals(entities, (entity) => entity.current);
      return entities.map((entity) => formatGeoRow(entity.dims, entity.current, totals));
    });
    const compareRows = computed(() => {
      const prev = aggregateDateEntityRows(rawData.value?.refunds_geo_table_prev?.rows, {
        metricCount: 3,
        avgIndices: [],
        weightIndex: 0
      });
      const entities = prev.filter((entity) => (entity.current[0] || 0) > 0).filter((entity) => !shouldHideNotSetValue(entity.dims[0]));
      const totals = periodTotals(entities, (entity) => entity.current);
      return entities.map((entity) => formatGeoRow(entity.dims, entity.current, totals));
    });
    const compareDateLabelsForTable = computed(() => getCompareDateLabels(dateRange.value));
    const { rawData, loading } = useReport({
      fetch: () => fetchRefundsByGeoData(
        dateRange.value,
        buildApiFilters(storeActiveFilters.value, storeActiveDevice.value)
      ),
      sample: () => generateRefundsByGeoSample("country", dateRange.value),
      isBlocked,
      watch: [dateRange, storeActiveFilters, storeActiveDevice],
      guard: () => !!(dateRange.value?.start && dateRange.value?.end)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ReportPageLayout, {
        "required-license": "pro",
        "upsell-feature": "ecommerce-refunds-by-geo",
        "required-addon": "ecommerce"
      }, {
        table: withCtx(() => [
          createVNode(_sfc_main$1, {
            title: unref(__)("Refunds by Geography", "google-analytics-for-wordpress"),
            columns,
            rows: tableRows.value,
            "compare-rows": compareRows.value,
            "compare-date-labels": compareDateLabelsForTable.value,
            loading: unref(loading),
            "empty-message": unref(__)("No refunds tracked during this time period.", "google-analytics-for-wordpress"),
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
