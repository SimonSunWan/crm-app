const BASE_URL = "http://127.0.0.1:8000/api";

class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "HttpError";
  }
}

const request = async (config) => {
  const { url, method = "GET", data, params, headers = {} } = config;

  let fullUrl = `${BASE_URL}${url}`;
  if (params) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    fullUrl += `?${queryString}`;
  }

  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const token = uni.getStorageSync("accessToken");
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await new Promise((resolve, reject) => {
      uni.request({
        url: fullUrl,
        method: method.toUpperCase(),
        data: data,
        header: requestHeaders,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });

    const { statusCode, data: responseData } = response;

    if (statusCode === 200) {
      return responseData.data;
    } else {
      throw new HttpError(
        responseData?.message || "请求失败",
        responseData?.code || statusCode
      );
    }
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      throw new HttpError("网络请求失败", 500);
    }
  }
};

const api = {
  get(url, config = {}) {
    const { params, ...restConfig } = config;
    return request({ ...restConfig, url, method: "GET", params });
  },

  post(url, data, config = {}) {
    return request({ ...config, url, method: "POST", data });
  },

  put(url, data, config = {}) {
    return request({ ...config, url, method: "PUT", data });
  },

  delete(url, config = {}) {
    return request({ ...config, url, method: "DELETE" });
  },
};

export { api, HttpError };
