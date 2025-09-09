<template>
  <view class="register-container">
    <view class="register-form">
      <view class="input-group">
        <input
          v-model="formData.username"
          class="input-field"
          placeholder="请输入账号"
          type="text"
        />
      </view>

      <view class="input-group">
        <input
          v-model="formData.nickName"
          class="input-field"
          placeholder="请输入姓名"
          type="text"
        />
      </view>

      <view class="input-group">
        <input
          v-model="formData.phone"
          class="input-field"
          placeholder="请输入手机号"
          type="text"
        />
      </view>

      <view class="input-group">
        <input
          v-model="formData.email"
          class="input-field"
          placeholder="请输入邮箱"
          type="text"
        />
      </view>

      <uni-easyinput
        v-model="formData.password"
        class="input-field"
        placeholder="请输入密码"
        type="password"
        password-icon
        trim="both"
      />

      <uni-easyinput
        v-model="formData.confirmPassword"
        class="input-field"
        placeholder="请再次输入密码"
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
        text="注册"
        type="primary"
        :loading="loading"
        :loading-text="loading ? '注册中...' : '注册'"
        @click="handleRegister"
      />

      <view class="login-section">
        <text class="login-text">已有账号？</text>
        <text class="login-link" @click="goToLogin">去登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { UserService } from "@/api/userApi.js";
import { HttpError } from "@/utils/api.js";
import CommonButton from "@/components/common-button/index.vue";
import {
  validatePhone,
  validateEmail,
  validatePassword,
  validateAccount,
  validateName,
} from "@/utils/validation.js";

const loading = ref(false);

const formData = reactive({
  username: "",
  nickName: "",
  phone: "",
  email: "",
  password: "",
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
  if (!validateAccount(formData.username)) {
    uni.showToast({
      title: "字母开头, 5-20位, 支持字母、数字、下划线",
      icon: "none",
    });
    return false;
  }

  // 验证姓名
  if (!formData.nickName) {
    uni.showToast({
      title: "请输入姓名",
      icon: "none",
    });
    return false;
  }
  if (!validateName(formData.nickName)) {
    uni.showToast({
      title: "2-20位, 支持中文、英文字母、空格",
      icon: "none",
    });
    return false;
  }

  // 验证手机号
  if (!formData.phone) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return false;
  }
  if (!validatePhone(formData.phone)) {
    uni.showToast({
      title: "请输入正确的手机号",
      icon: "none",
    });
    return false;
  }

  // 验证邮箱（可选）
  if (formData.email && !validateEmail(formData.email)) {
    uni.showToast({
      title: "请输入正确的邮箱格式",
      icon: "none",
    });
    return false;
  }

  // 验证密码
  if (!formData.password) {
    uni.showToast({
      title: "请输入密码",
      icon: "none",
    });
    return false;
  }
  if (!validatePassword(formData.password)) {
    uni.showToast({
      title: "6-20位, 必须包含字母和数字",
      icon: "none",
    });
    return false;
  }

  // 验证确认密码
  if (!formData.confirmPassword) {
    uni.showToast({
      title: "请再次输入密码",
      icon: "none",
    });
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
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

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    await UserService.register({
      userName: formData.username,
      nickName: formData.nickName,
      phone: formData.phone,
      email: formData.email || undefined,
      password: formData.password,
      systemCode: formData.systemCode,
    });

    uni.showToast({
      title: "注册成功，请等待超级管理员审核",
      icon: "success",
    });

    setTimeout(() => {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    }, 1000);
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "注册失败，请稍后重试",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "注册失败，请稍后重试",
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
