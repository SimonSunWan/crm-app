// 环境配置
const config = {
  // 开发环境
  development: {
    API_BASE_URL: "https://donglidianchi.com.cn/api",
    DEBUG: true,
  },
  // 生产环境
  production: {
    API_BASE_URL: "https://donglidianchi.com.cn/api",
    DEBUG: false,
  },
};

// 根据当前环境获取配置
const getConfig = () => {
  let env = "development";

  // #ifdef MP-WEIXIN
  // 微信小程序环境
  try {
    const accountInfo = wx.getAccountInfoSync();
    const envVersion = accountInfo.miniProgram.envVersion;

    if (envVersion === "develop") {
      env = "development";
    } else {
      env = "production";
    }
  } catch (error) {
    env = "production";
  }
  // #endif

  // #ifndef MP-WEIXIN
  env = process.env.NODE_ENV || "development";
  // #endif

  return config[env] || config.development;
};

export default getConfig;
