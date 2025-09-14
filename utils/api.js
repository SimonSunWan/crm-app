const BASE_URL = "http://127.0.0.1:8000/api";
// const BASE_URL = "http://8.135.237.19:8000/api";

class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "HttpError";
  }
}

const request = async (config) => {
  const {
    url,
    method = "GET",
    data,
    params,
    headers = {},
    showErrorMessage = true,
  } = config;

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
    if (showErrorMessage) {
      let errorMessage = "请求失败";

      if (error instanceof HttpError) {
        errorMessage = error.message;
      } else if (error.response?.data) {
        const responseData = error.response.data;

        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.detail) {
          if (Array.isArray(responseData.detail)) {
            const firstError = responseData.detail[0];
            if (firstError && firstError.msg) {
              errorMessage = firstError.msg;
            } else if (typeof firstError === "string") {
              errorMessage = firstError;
            }
          } else if (typeof responseData.detail === "string") {
            errorMessage = responseData.detail;
          }
        }
      }

      uni.showToast({
        title: errorMessage,
        icon: "none",
        duration: 3000,
      });
    }

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

  request(config) {
    return request(config);
  },
};

export { api, HttpError };
