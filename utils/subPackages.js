// 分包配置
export const subPackages = {
  // 设置分包
  settings: {
    root: "pages/settings",
    pages: ["basic/index", "password/index"],
  },
};

// 页面路径配置
export const pagePaths = {
  // 主包页面
  login: "/pages/login/index",
  index: "/pages/index/index",
  my: "/pages/my/index",

  // 设置分包页面
  basicSettings: "/pages/settings/basic/index",
  passwordSettings: "/pages/settings/password/index",
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
