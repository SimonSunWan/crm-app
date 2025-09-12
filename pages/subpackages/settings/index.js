// 设置分包入口文件
// 统一管理设置相关的页面跳转和状态

import { SettingsUtils } from "@/utils/subpackages/settings/settingsUtils.js";

export const SettingsPackage = {
  // 页面路径常量
  paths: {
    basic: "/pages/subpackages/settings/settings/basic/index",
    password: "/pages/subpackages/settings/settings/password/index",
  },

  // 页面跳转方法
  navigate: {
    toBasicSettings() {
      uni.navigateTo({ url: this.paths.basic });
    },
    toPasswordSettings() {
      uni.navigateTo({ url: this.paths.password });
    },
  },

  // 工具方法
  utils: SettingsUtils,

  // 分包信息
  info: {
    name: "设置管理",
    version: "1.0.0",
    description: "用户基本设置和密码管理功能",
  },
};
