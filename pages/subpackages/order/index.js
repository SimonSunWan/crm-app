// 工单分包入口文件
// 统一管理工单相关的页面跳转和状态

import { OrderUtils } from "@/utils/subpackages/order/orderUtils.js";

export const OrderPackage = {
  // 页面路径常量
  paths: {
    internal: {
      list: "/pages/subpackages/order/order/internal/index",
      add: "/pages/subpackages/order/order/internal/add",
      detail: "/pages/subpackages/order/order/internal/detail",
      edit: "/pages/subpackages/order/order/internal/edit",
    },
    external: {
      list: "/pages/subpackages/order/order/external/index",
      add: "/pages/subpackages/order/order/external/add",
      detail: "/pages/subpackages/order/order/external/detail",
      edit: "/pages/subpackages/order/order/external/edit",
    },
  },

  // 页面跳转方法
  navigate: {
    // 保内工单
    toInternalList() {
      uni.navigateTo({ url: this.paths.internal.list });
    },
    toInternalAdd() {
      uni.navigateTo({ url: this.paths.internal.add });
    },
    toInternalDetail(id) {
      uni.navigateTo({ url: `${this.paths.internal.detail}?id=${id}` });
    },
    toInternalEdit(id) {
      uni.navigateTo({ url: `${this.paths.internal.edit}?id=${id}` });
    },

    // 保外工单
    toExternalList() {
      uni.navigateTo({ url: this.paths.external.list });
    },
    toExternalAdd() {
      uni.navigateTo({ url: this.paths.external.add });
    },
    toExternalDetail(id) {
      uni.navigateTo({ url: `${this.paths.external.detail}?id=${id}` });
    },
    toExternalEdit(id) {
      uni.navigateTo({ url: `${this.paths.external.edit}?id=${id}` });
    },
  },

  // 工具方法
  utils: OrderUtils,

  // 分包信息
  info: {
    name: "工单管理",
    version: "1.0.0",
    description: "保内工单和保外工单管理功能",
  },
};
