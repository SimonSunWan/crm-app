<template>
  <view class="index-container">
    <view class="banner">
      <view class="banner-content">
        <text class="banner-subtitle">高效管理，智能服务</text>
      </view>
    </view>
    <view class="index-content">
      <view class="content-item" v-for="(item, index) in menuList" :key="index">
        <view class="content-icon" :style="{ background: item.gradient }">
          <text class="iconfont icon-text" :class="item.icon"></text>
        </view>
        <text class="content-name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const menuList = ref([
  {
    name: "保内工单",
    icon: "icon-gongdanxinxi",
    gradient: "linear-gradient(to bottom, #00ceaa, #00c09c)",
  },
  {
    name: "保外工单",
    icon: "icon-waibu-02",
    gradient: "linear-gradient(to bottom, #f9b06f, #ff7721)",
  },
]);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
