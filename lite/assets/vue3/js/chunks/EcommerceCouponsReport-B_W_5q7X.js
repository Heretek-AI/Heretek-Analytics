import { a1 as storeToRefs, o as openBlock, E as createBlock, D as withCtx, b as createVNode, u as unref, m as computed } from "./toastStore-BFDhxKQh.js";
import { _ as __ } from "./default-i18n-KrIlCc2E.js";
import { u as useOverviewReportStore, b as buildApiFilters } from "../reports-CAGQu_Y_.js";
import { a as fetchEcommerceCouponsData } from "./ecommerceReports-C7bVDt7g.js";
import { u as useReportPermissions } from "./useReportPermissions-CMVp6zeD.js";
import { u as useReport } from "./useReport-B0Jpe_cO.js";
import { a as generateCouponsSample } from "./ecommerceSampleData-CfcmM5cV.js";
import { a as formatCurr, b as formatNum } from "./overviewTableFormatters-dHzA8ZV1.js";
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
  __name: "EcommerceCouponsReport",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const { dateRange, activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const { isBlocked } = useReportPermissions({ minTier: "pro" });
    const columns = [
      { key: "couponName", label: __("Coupon Name", "google-analytics-for-wordpress"), sortable: true },
      { key: "revenue", label: __("Revenue", "google-analytics-for-wordpress"), sortable: true },
      { key: "transactions", label: __("Transactions", "google-analytics-for-wordpress"), sortable: true },
      { key: "avgOrderValue", label: __("Avg. Order Value", "google-analytics-for-wordpress"), sortable: true, totalType: "average" }
    ];
    const aggregatedCoupons = computed(
      () => aggregateDateEntityRows(rawData.value?.coupons_table?.rows, {
        metricCount: 3,
        avgIndices: [2],
        weightIndex: 1
      })
    );
    function formatCouponRow(dims, vals) {
      const name = dims[0] != null && String(dims[0]).trim() !== "" ? String(dims[0]) : "(not set)";
      return {
        couponName: name,
        revenue: formatCurr(vals[0] || 0),
        transactions: formatNum(vals[1] || 0),
        avgOrderValue: formatCurr(vals[2] || 0)
      };
    }
    const tableRows = computed(
      () => aggregatedCoupons.value.filter((entity) => !shouldHideNotSetValue(entity.dims[0])).map((entity) => formatCouponRow(entity.dims, entity.current))
    );
    const compareRows = computed(
      () => aggregateDateEntityRows(rawData.value?.coupons_table_prev?.rows, {
        metricCount: 3,
        avgIndices: [2],
        weightIndex: 1
      }).filter((entity) => !shouldHideNotSetValue(entity.dims[0])).map((entity) => formatCouponRow(entity.dims, entity.current))
    );
    const compareDateLabelsForTable = computed(() => getCompareDateLabels(dateRange.value));
    const { rawData, loading } = useReport({
      fetch: () => fetchEcommerceCouponsData(
        dateRange.value,
        buildApiFilters(storeActiveFilters.value, storeActiveDevice.value)
      ),
      sample: () => generateCouponsSample(dateRange.value),
      isBlocked,
      watch: [dateRange, storeActiveFilters, storeActiveDevice],
      guard: () => !!(dateRange.value?.start && dateRange.value?.end)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ReportPageLayout, {
        "required-license": "pro",
        "upsell-feature": "ecommerce-coupons",
        "required-addon": "ecommerce"
      }, {
        table: withCtx(() => [
          createVNode(_sfc_main$1, {
            title: unref(__)("Coupons Report", "google-analytics-for-wordpress"),
            columns,
            rows: tableRows.value,
            "compare-rows": compareRows.value,
            "compare-date-labels": compareDateLabelsForTable.value,
            loading: unref(loading),
            "empty-message": unref(__)("No data currently for the eCommerce Coupons report.", "google-analytics-for-wordpress"),
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
