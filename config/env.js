// 环境配置
const config = {
  // 开发环境
  development: {
    API_BASE_URL: "http://127.0.0.1:8000/api",
    DEBUG: true,
  },
  // 测试环境
  test: {
    API_BASE_URL: "http://8.135.237.19:8000/api",
    DEBUG: true,
  },
  // 生产环境
  production: {
    API_BASE_URL: "http://8.135.237.19:8000/api",
    DEBUG: false,
  },
};

// 根据当前环境获取配置
const getConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return config[env] || config.development;
};

// 获取当前环境
const getCurrentEnv = () => {
  return process.env.NODE_ENV || "development";
};

// 判断是否为开发环境
const isDevelopment = () => {
  return getCurrentEnv() === "development";
};

// 判断是否为生产环境
const isProduction = () => {
  return getCurrentEnv() === "production";
};

export default getConfig;
export { getCurrentEnv, isDevelopment, isProduction };
