<template>
  <view class="search-select-page">
    <view class="search-header">
      <view class="search-input-wrapper">
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索选项"
          @input="onSearchInput"
        />
      </view>
      <view class="cancel-btn" @click="goBack">
        <text>取消</text>
      </view>
    </view>
    
    <scroll-view scroll-y="true" class="options-scroll">
      <view
        v-for="(option, optionIndex) in filteredData"
        :key="optionIndex"
        class="option-item"
        @click="selectOption(option)"
      >
        <text>{{ option[textKey] }}</text>
      </view>
      <view v-if="filteredData.length === 0" class="no-data">
        <text>暂无数据</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const searchKeyword = ref("");
const localdata = ref([]);
const valueKey = ref("value");
const textKey = ref("text");
const callbackId = ref("");

const filteredData = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();
  if (!keyword) {
    return localdata.value;
  }
  return localdata.value.filter((item) =>
    item[textKey.value].toLowerCase().includes(keyword)
  );
});

const onSearchInput = (e) => {
  searchKeyword.value = e.detail.value;
};

const selectOption = (option) => {
  const result = {
    callbackId: callbackId.value,
    selectedValue: option[valueKey.value],
    selectedOption: option
  };
  
  // 使用getApp()全局数据传递
  const app = getApp();
  app.globalData = app.globalData || {};
  app.globalData.searchSelectResult = result;
  
  // 使用uni.$emit传递
  uni.$emit('search-select-result', result);
  
  // 使用uni.setStorageSync作为备选方案
  uni.setStorageSync('searchSelectResult', result);
  
  goBack();
};

const goBack = () => {
  uni.navigateBack();
};

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  
  if (options.localdata) {
    try {
      localdata.value = JSON.parse(decodeURIComponent(options.localdata));
    } catch (e) {
      console.error('解析localdata失败:', e);
      localdata.value = [];
    }
  }
  
  if (options.valueKey) {
    valueKey.value = options.valueKey;
  }
  
  if (options.textKey) {
    textKey.value = options.textKey;
  }
  
  if (options.callbackId) {
    callbackId.value = options.callbackId;
  }
});
</script>

<style lang="scss" scoped>
.search-select-page {
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .search-header {
    display: flex;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 100;

    .search-input-wrapper {
      flex: 1;
      margin-right: 20rpx;

      .search-input {
        width: 100%;
        height: 70rpx;
        padding: 0 20rpx;
        border: 2rpx solid #e5e7eb;
        border-radius: 12rpx;
        font-size: 28rpx;
        color: #333333;
        background: #ffffff;
        box-sizing: border-box;

        &:focus {
          border-color: #3b82f6;
          outline: none;
        }

        &::placeholder {
          color: #9ca3af;
        }
      }
    }

    .cancel-btn {
      padding: 20rpx;
      font-size: 28rpx;
      color: #007aff;
    }
  }

  .options-scroll {
    flex: 1;

    .option-item {
      padding: 30rpx 20rpx;
      border-bottom: 1rpx solid #f0f0f0;
      font-size: 28rpx;
      color: #333333;
      transition: background-color 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background-color: #f8f9fa;
      }
    }

    .no-data {
      padding: 80rpx 20rpx;
      text-align: center;
      font-size: 26rpx;
      color: #9ca3af;
    }
  }
}
</style>
