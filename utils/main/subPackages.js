// 分包配置
export const subPackages = {
  // 工单分包
  order: {
    root: "pages/subpackages/order/order",
    pages: [
      "internal/index",
      "internal/add",
      "internal/detail",
      "internal/edit",
      "external/index",
      "external/add",
      "external/detail",
      "external/edit",
    ],
  },
  // 设置分包
  settings: {
    root: "pages/subpackages/settings/settings",
    pages: ["basic/index", "password/index"],
  },
};

// 页面路径配置
export const pagePaths = {
  // 主包页面
  login: "/pages/main/auth/login/index",
  register: "/pages/main/auth/register/index",
  forgetPassword: "/pages/main/auth/forget-password/index",
  index: "/pages/main/home/index/index",
  my: "/pages/main/profile/my/index",

  // 工单分包页面
  internalOrderList: "/pages/subpackages/order/order/internal/index",
  internalOrderAdd: "/pages/subpackages/order/order/internal/add",
  internalOrderDetail: "/pages/subpackages/order/order/internal/detail",
  internalOrderEdit: "/pages/subpackages/order/order/internal/edit",
  externalOrderList: "/pages/subpackages/order/order/external/index",
  externalOrderAdd: "/pages/subpackages/order/order/external/add",
  externalOrderDetail: "/pages/subpackages/order/order/external/detail",
  externalOrderEdit: "/pages/subpackages/order/order/external/edit",

  // 设置分包页面
  basicSettings: "/pages/subpackages/settings/settings/basic/index",
  passwordSettings: "/pages/subpackages/settings/settings/password/index",
};

// 页面跳转工具函数
export const navigateTo = {
  // 跳转到设置页面
  toBasicSettings() {
    uni.navigateTo({
      url: pagePaths.basicSettings,
    });
  },

  toPasswordSettings() {
    uni.navigateTo({
      url: pagePaths.passwordSettings,
    });
  },

  // 返回上一页
  back() {
    uni.navigateBack();
  },

  // 跳转到我的页面
  toMy() {
    uni.switchTab({
      url: pagePaths.my,
    });
  },
};
