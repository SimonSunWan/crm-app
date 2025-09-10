import { reactive, ref } from "vue";

const userStore = reactive({
  isLogin: false,
  userInfo: {},
  accessToken: "",
  menuPermissions: [],

  setUserInfo(info) {
    this.userInfo = info;
  },

  setLoginStatus(status) {
    this.isLogin = status;
  },

  setToken(token) {
    this.accessToken = token;
    uni.setStorageSync("accessToken", token);
  },

  setMenuPermissions(permissions) {
    this.menuPermissions = permissions;
  },

  logout() {
    this.userInfo = {};
    this.isLogin = false;
    this.accessToken = "";
    this.menuPermissions = [];
    uni.removeStorageSync("accessToken");
    uni.reLaunch({
      url: "/pages/login/index",
    });
  },
});

export { userStore };
