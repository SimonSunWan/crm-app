// 分包配置
export const subPackages = {
  // 工单分包
  order: {
    root: "packageA",
    pages: [
      "pages/internal/index",
      "pages/internal/add",
      "pages/internal/detail",
      "pages/internal/edit",
      "pages/external/index",
      "pages/external/add",
      "pages/external/detail",
      "pages/external/edit",
    ],
  },
  // 设置分包
  settings: {
    root: "packageB",
    pages: ["pages/basic/index", "pages/password/index"],
  },
};

// 页面路径配置
export const pagePaths = {
  // 主包页面
  login: "/pages/login/index",
  register: "/pages/register/index",
  forgetPassword: "/pages/forget-password/index",
  index: "/pages/home/index",
  my: "/pages/profile/index",

  // 工单分包页面
  internalOrderList: "/packageA/pages/internal/index",
  internalOrderAdd: "/packageA/pages/internal/add",
  internalOrderDetail: "/packageA/pages/internal/detail",
  internalOrderEdit: "/packageA/pages/internal/edit",
  externalOrderList: "/packageA/pages/external/index",
  externalOrderAdd: "/packageA/pages/external/add",
  externalOrderDetail: "/packageA/pages/external/detail",
  externalOrderEdit: "/packageA/pages/external/edit",

  // 设置分包页面
  basicSettings: "/packageB/pages/basic/index",
  passwordSettings: "/packageB/pages/password/index",
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
