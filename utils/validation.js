/**
 * 表单验证工具函数
 * 提供常用的表单字段验证方法
 */

/**
 * 去除字符串首尾空格
 * @param {string} value 待处理的字符串
 * @returns {string} 返回去除首尾空格后的字符串
 */
export function trimSpaces(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

/**
 * 验证手机号码(中国大陆)
 * @param {string} value 手机号码字符串
 * @returns {boolean} 返回验证结果, true表示格式正确
 */
export function validatePhone(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  /* 中国大陆手机号码: 1开头, 第二位为3-9, 共11位数字 */
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(value.trim());
}

/**
 * 验证用户账号
 * @param {string} value 账号字符串
 * @returns {boolean} 返回验证结果, true表示格式正确
 * @description 规则: 字母开头, 4-20位, 支持字母、数字、下划线
 */
export function validateAccount(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  /* 字母开头, 4-20位, 支持字母、数字、下划线 */
  const accountRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
  return accountRegex.test(value.trim());
}

/**
 * 验证姓名
 * @param {string} value 姓名字符串
 * @returns {boolean} 返回验证结果, true表示格式正确
 * @description 规则: 2-20位, 支持中文、英文字母、空格
 */
export function validateName(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  // 长度检查
  if (trimmedValue.length < 2 || trimmedValue.length > 20) {
    return false;
  }

  // 支持中文、英文字母、空格
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z\s]+$/;
  return nameRegex.test(trimmedValue);
}

/**
 * 验证密码
 * @param {string} value 密码字符串
 * @returns {boolean} 返回验证结果, true表示格式正确
 * @description 规则: 6-20位, 必须包含字母和数字
 */
export function validatePassword(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  // 长度检查
  if (trimmedValue.length < 6 || trimmedValue.length > 20) {
    return false;
  }

  // 必须包含字母和数字
  const hasLetter = /[a-zA-Z]/.test(trimmedValue);
  const hasNumber = /\d/.test(trimmedValue);

  return hasLetter && hasNumber;
}

/**
 * 验证邮箱地址
 * @param {string} value 邮箱地址字符串
 * @returns {boolean} 返回验证结果, true表示格式正确
 */
export function validateEmail(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  // RFC 5322 标准的简化版邮箱正则
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(trimmedValue) && trimmedValue.length <= 254;
}
