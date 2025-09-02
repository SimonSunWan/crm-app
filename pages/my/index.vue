<template>
  <view class="my-container">
    <view class="my-header">
      <view class="my-header-left">
        <view v-if="userInfo.avatar" class="my-header-left-avatar">
          <image
            :src="userInfo.avatar"
            mode="aspectFill"
            class="avatar-image"
          ></image>
        </view>
        <view v-else class="my-header-left-avatar avatar-placeholder">
          {{ getAvatarText(userInfo.nickName || userInfo.userName) }}
        </view>
      </view>
      <view class="my-header-info">
        <text class="user-name">{{ userInfo.userName }}</text>
        <text v-if="userInfo.nickName" class="user-nickname">{{
          userInfo.nickName
        }}</text>
        <text v-if="userInfo.phone" class="user-phone">{{
          userInfo.phone
        }}</text>
        <text v-if="userInfo.email" class="user-email">{{
          userInfo.email
        }}</text>
      </view>
    </view>
    <view class="my-content">
      <view
        v-for="item in menuList"
        :key="item.id"
        class="my-content-item"
        @click="handleItemClick(item)"
      >
        <view class="item-icon">
          <text class="iconfont" :class="item.icon"></text>
        </view>
        <view class="item-name">{{ item.name }}</view>
        <view class="item-arrow">
          <text class="iconfont icon-arrow"></text>
        </view>
      </view>
    </view>
    <view class="my-footer">
      <view class="logout-btn" @click="handleLogout">退出登录</view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onShow } from "vue";
import { UserInfoManager } from "@/utils/userInfoManager.js";
import { userStore } from "@/store/userStore.js";
import { HttpError } from "@/utils/api.js";
import { pagePaths } from "@/utils/subPackages.js";

const userInfo = computed(() => userStore.userInfo);

const menuList = ref([
  {
    id: 1,
    name: "基本设置",
    icon: "icon-setting",
    path: pagePaths.basicSettings,
  },
  {
    id: 2,
    name: "更改密码",
    icon: "icon-password",
    path: pagePaths.passwordSettings,
  },
]);

onMounted(() => {
  loadUserInfo();
});

onShow(() => {
  loadUserInfo();
});

const loadUserInfo = async () => {
  try {
    await UserInfoManager.refreshUserInfo();
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "获取用户信息失败",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "获取用户信息失败",
        icon: "none",
      });
    }
  }
};

const getAvatarText = (text) => {
  return text ? text.charAt(0) : "";
};

const handleItemClick = (item) => {
  uni.navigateTo({
    url: item.path,
  });
};

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        userStore.logout();
      }
    },
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
