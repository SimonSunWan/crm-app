// 设置分包工具类
export const SettingsUtils = {
  // 验证密码强度
  validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    return {
      score,
      level: score < 2 ? "weak" : score < 4 ? "medium" : "strong",
      suggestions: this.getPasswordSuggestions(password, {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar,
      }),
    };
  },

  // 获取密码建议
  getPasswordSuggestions(password, checks) {
    const suggestions = [];

    if (password.length < checks.minLength) {
      suggestions.push(`密码长度至少需要${checks.minLength}位`);
    }

    if (!checks.hasUpperCase) {
      suggestions.push("建议包含大写字母");
    }

    if (!checks.hasLowerCase) {
      suggestions.push("建议包含小写字母");
    }

    if (!checks.hasNumbers) {
      suggestions.push("建议包含数字");
    }

    if (!checks.hasSpecialChar) {
      suggestions.push("建议包含特殊字符");
    }

    return suggestions;
  },

  // 验证用户信息
  validateUserInfo(userInfo) {
    const errors = [];

    if (!userInfo.userName || userInfo.userName.trim().length < 2) {
      errors.push("用户名至少需要2个字符");
    }

    if (userInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.push("邮箱格式不正确");
    }

    if (userInfo.phone && !/^1[3-9]\d{9}$/.test(userInfo.phone)) {
      errors.push("手机号格式不正确");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // 格式化文件大小
  formatFileSize(bytes) {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};
