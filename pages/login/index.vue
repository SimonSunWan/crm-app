<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.svg" mode="aspectFit"></image>
    </view>

    <view class="login-form">
      <view class="input-group">
        <input
          v-model="formData.username"
          class="input-field"
          placeholder="请输入账号"
          type="text"
        />
      </view>

      <view class="input-group">
        <uni-easyinput
          v-model="formData.password"
          class="input-field"
          placeholder="请输入密码"
          type="password"
          password-icon
          trim="both"
        />
      </view>

      <view class="slider-group">
        <slider-verify ref="sliderVerifyRef" @verify="onSliderVerify" />
      </view>

      <view class="options-row">
        <view class="remember-password">
          <view
            class="checkbox"
            :class="{ checked: rememberPassword }"
            @click="toggleRemember"
          >
            <text
              v-if="rememberPassword"
              class="checkmark iconfont icon-duigou"
            ></text>
          </view>
          <text class="checkbox-label">记住密码</text>
        </view>
        <text class="forgot-link" @click="forgotPassword">忘记密码</text>
      </view>

      <common-button
        text="登录"
        type="primary"
        :loading="loading"
        :loading-text="loading ? '登录中...' : '登录'"
        @click="handleLogin"
      />

      <view class="register-section">
        <text class="register-text">还没有账号？</text>
        <text class="register-link" @click="goToRegister">注册</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import SliderVerify from "@/components/slider-verify/index.vue";
import { UserService } from "@/api/userApi.js";
import { userStore } from "@/store/userStore.js";
import { HttpError } from "@/utils/api.js";
import { storage } from "@/utils/storage.js";
import CommonButton from "@/components/common-button/index.vue";

const loading = ref(false);
const rememberPassword = ref(true);
const sliderVerified = ref(false);
const sliderVerifyRef = ref(null);

const formData = reactive({
  username: "",
  password: "",
});

onMounted(() => {
  const rememberedAccount = storage.getRememberedAccount();
  if (rememberedAccount.flag) {
    rememberPassword.value = true;
    formData.username = rememberedAccount.username;
    formData.password = rememberedAccount.password;
  }
});

const onSliderVerify = () => {
  sliderVerified.value = true;
};

const toggleRemember = () => {
  rememberPassword.value = !rememberPassword.value;
  if (!rememberPassword.value) {
    storage.clearRememberedAccount();
  }
};

const handleLogin = async () => {
  if (!formData.username || !formData.password) {
    uni.showToast({
      title: "请输入账号和密码",
      icon: "none",
    });
    return;
  }

  if (!sliderVerified.value) {
    uni.showToast({
      title: "请先完成滑块验证",
      icon: "none",
    });
    return;
  }

  loading.value = true;

  try {
    const loginResponse = await UserService.login({
      userName: formData.username,
      password: formData.password,
    });

    const { accessToken, tokenType } = loginResponse;
    userStore.setToken(`${tokenType} ${accessToken}`);
    const userInfo = await UserService.getUserInfo();
    userStore.setUserInfo(userInfo);
    userStore.setLoginStatus(true);

    if (rememberPassword.value) {
      storage.setRememberedAccount(formData.username, formData.password);
    } else {
      storage.clearRememberedAccount();
    }

    uni.showToast({
      title: "登录成功",
      icon: "success",
    });

    setTimeout(() => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }, 1000);
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "登录失败，请稍后重试",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "登录失败，请稍后重试",
        icon: "none",
      });
    }
  } finally {
    loading.value = false;
    resetSliderVerify();
  }
};

const resetSliderVerify = () => {
  if (sliderVerifyRef.value && sliderVerifyRef.value.reset) {
    sliderVerifyRef.value.reset();
  }
  sliderVerified.value = false;
};

const forgotPassword = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};

const goToRegister = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
