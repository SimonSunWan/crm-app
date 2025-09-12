// 主包入口文件
// 统一管理主包相关的页面跳转和状态

export const MainPackage = {
  // 页面路径常量
  paths: {
    login: "/pages/login/index",
    register: "/pages/register/index",
    forgetPassword: "/pages/forget-password/index",
    index: "/pages/home/index",
    my: "/pages/profile/index",
  },

  // 页面跳转方法
  navigate: {
    toLogin() {
      uni.navigateTo({ url: this.paths.login });
    },
    toRegister() {
      uni.navigateTo({ url: this.paths.register });
    },
    toForgetPassword() {
      uni.navigateTo({ url: this.paths.forgetPassword });
    },
    toIndex() {
      uni.switchTab({ url: this.paths.index });
    },
    toMy() {
      uni.switchTab({ url: this.paths.my });
    },
  },

  // 分包信息
  info: {
    name: "主包",
    version: "1.0.0",
    description: "认证、首页和个人中心功能",
  },
};
