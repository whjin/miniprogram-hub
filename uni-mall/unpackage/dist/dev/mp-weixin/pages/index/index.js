"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello World");
    const gotoSearch = (type) => {
      let url = "";
      switch (type) {
        case "search":
          url = "/subpkg/search/index";
          break;
        case "goods:list":
          url = "/subpkg/goods/list";
          break;
        case "goods:detail":
          url = "/subpkg/goods/detail";
          break;
        case "order":
          url = "/subpkg/order/index";
          break;
      }
      common_vendor.index.navigateTo({ url });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(title.value),
        c: common_vendor.o(($event) => gotoSearch("search"), "59"),
        d: common_vendor.o(($event) => gotoSearch("goods:list"), "dc"),
        e: common_vendor.o(($event) => gotoSearch("goods:detail"), "25"),
        f: common_vendor.o(($event) => gotoSearch("order"), "ec")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
