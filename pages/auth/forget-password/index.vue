<template>
  <view class="forget-password-container">
    <view class="forget-password-form">
      <view class="input-group">
        <input
          v-model="formData.username"
          class="input-field"
          placeholder="请输入账号"
          type="text"
        />
      </view>

      <uni-easyinput
        v-model="formData.newPassword"
        class="input-field"
        placeholder="请输入新密码"
        type="password"
        password-icon
        trim="both"
      />

      <uni-easyinput
        v-model="formData.confirmPassword"
        class="input-field"
        placeholder="请再次输入新密码"
        type="password"
        password-icon
        trim="both"
      />

      <view class="input-group">
        <input
          v-model="formData.systemCode"
          class="input-field"
          placeholder="请输入系统码（找超级管理员获取）"
          type="text"
        />
      </view>

      <common-button
        text="提交"
        type="primary"
        :loading="loading"
        :loading-text="loading ? '提交中...' : '提交'"
        @click="handleResetPassword"
      />

      <view class="login-section">
        <text class="login-text">记起密码了？</text>
        <text class="login-link" @click="goToLogin">返回</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UserService } from "@/api/userApi.js";
import { HttpError } from "@/utils/api.js";
import CommonButton from "@/components/common-button/index.vue";
import { validatePassword } from "@/utils/validation.js";

const loading = ref(false);

const formData = reactive({
  username: "",
  newPassword: "",
  confirmPassword: "",
  systemCode: "",
});

const validateForm = () => {
  // 验证用户名
  if (!formData.username) {
    uni.showToast({
      title: "请输入账号",
      icon: "none",
    });
    return false;
  }

  // 验证新密码
  if (!formData.newPassword) {
    uni.showToast({
      title: "请输入新密码",
      icon: "none",
    });
    return false;
  }
  if (!validatePassword(formData.newPassword)) {
    uni.showToast({
      title: "6-20位, 必须包含字母和数字",
      icon: "none",
    });
    return false;
  }

  // 验证确认密码
  if (!formData.confirmPassword) {
    uni.showToast({
      title: "请再次输入新密码",
      icon: "none",
    });
    return false;
  }
  if (formData.newPassword !== formData.confirmPassword) {
    uni.showToast({
      title: "两次输入密码不一致",
      icon: "none",
    });
    return false;
  }

  // 验证系统码
  if (!formData.systemCode) {
    uni.showToast({
      title: "请输入系统码",
      icon: "none",
    });
    return false;
  }

  return true;
};

const handleResetPassword = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    await UserService.forgetPassword({
      username: formData.username,
      newPassword: formData.newPassword,
      systemCode: formData.systemCode,
    });

    uni.showToast({
      title: "密码重置成功",
      icon: "success",
    });

    setTimeout(() => {
      uni.navigateTo({
        url: "/pages/auth/login/index",
      });
    }, 1000);
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "密码重置失败，请稍后重试",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "密码重置失败，请稍后重试",
        icon: "none",
      });
    }
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
