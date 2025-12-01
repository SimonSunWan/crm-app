<template>
  <view class="cascader-picker-page">
    <!-- 面包屑导航 -->
    <view v-if="breadcrumbs.length > 0" class="breadcrumbs">
      <view
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        @click="handleBreadcrumbClick(index)"
      >
        <text class="breadcrumb-text">{{ item.text }}</text>
        <text v-if="index < breadcrumbs.length - 1" class="breadcrumb-arrow">›</text>
      </view>
    </view>

    <!-- 选项列表 -->
    <scroll-view scroll-y="true" class="options-container">
      <view
        v-for="(option, index) in currentOptions"
        :key="index"
        class="option-item"
        :class="{ active: isSelected(option.value) }"
        @click="handleSelect(option)"
      >
        <text class="option-text">{{ option.text }}</text>
        <view class="option-right">
          <text v-if="option.children && option.children.length > 0" class="arrow-icon">›</text>
          <text v-else-if="isSelected(option.value)" class="check-icon">✓</text>
        </view>
      </view>
      <view v-if="currentOptions.length === 0" class="no-data">
        <text>暂无数据</text>
      </view>
    </scroll-view>

    <!-- 底部确定按钮 -->
    <view class="footer-btn">
      <button type="primary" @click="handleConfirm" class="confirm-button">确定</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const pageTitle = ref('选择维修项目');
const allOptions = ref([]);
const selectedValues = ref([]);
const breadcrumbs = ref([]);
const callbackId = ref('');

// 当前显示的选项列表
const currentOptions = computed(() => {
  if (breadcrumbs.value.length === 0) {
    return allOptions.value;
  }

  let options = allOptions.value;
  for (const breadcrumb of breadcrumbs.value) {
    const found = options.find(opt => opt.value === breadcrumb.value);
    if (found && found.children) {
      options = found.children;
    } else {
      return [];
    }
  }

  return options;
});

// 判断选项是否被选中
const isSelected = (value) => {
  const currentLevel = breadcrumbs.value.length;
  return selectedValues.value[currentLevel] === value;
};

// 处理选项点击
const handleSelect = (option) => {
  const currentLevel = breadcrumbs.value.length;

  // 更新选中值
  selectedValues.value = selectedValues.value.slice(0, currentLevel);
  selectedValues.value.push(option.value);

  // 如果有子选项，进入下一级
  if (option.children && option.children.length > 0) {
    breadcrumbs.value.push({
      value: option.value,
      text: option.text
    });
  }
};

// 面包屑点击
const handleBreadcrumbClick = (index) => {
  breadcrumbs.value = breadcrumbs.value.slice(0, index + 1);
  selectedValues.value = selectedValues.value.slice(0, index + 1);
};

// 确定按钮
const handleConfirm = () => {
  if (selectedValues.value.length === 0) {
    uni.showToast({
      title: '请选择维修项目',
      icon: 'none'
    });
    return;
  }

  // 获取选中项的文本
  const selectedTexts = [];
  let options = allOptions.value;

  for (const value of selectedValues.value) {
    const found = options.find(opt => opt.value === value);
    if (found) {
      selectedTexts.push(found.text);
      if (found.children) {
        options = found.children;
      }
    }
  }

  const result = {
    callbackId: callbackId.value,
    selectedValues: selectedValues.value,
    selectedTexts: selectedTexts
  };

  // 使用多种方式传递数据
  const app = getApp();
  app.globalData = app.globalData || {};
  app.globalData.cascaderPickerResult = result;

  uni.$emit('cascader-picker-result', result);

  uni.setStorageSync('cascaderPickerResult', result);

  uni.navigateBack();
};

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;

  // 解析传递的参数
  if (options.localdata) {
    try {
      allOptions.value = JSON.parse(decodeURIComponent(options.localdata));
      console.log('级联选择器数据:', allOptions.value);
    } catch (e) {
      console.error('解析localdata失败:', e);
      allOptions.value = [];
    }
  }

  if (options.selected) {
    try {
      selectedValues.value = JSON.parse(decodeURIComponent(options.selected));
      console.log('已选中的值:', selectedValues.value);

      // 重建面包屑
      if (selectedValues.value.length > 0) {
        let opts = allOptions.value;
        for (let i = 0; i < selectedValues.value.length - 1; i++) {
          const value = selectedValues.value[i];
          const found = opts.find(opt => opt.value === value);
          if (found) {
            breadcrumbs.value.push({
              value: found.value,
              text: found.text
            });
            if (found.children) {
              opts = found.children;
            }
          }
        }
      }
    } catch (e) {
      console.error('解析selected失败:', e);
      selectedValues.value = [];
    }
  }

  if (options.title) {
    pageTitle.value = decodeURIComponent(options.title);
  }

  if (options.callbackId) {
    callbackId.value = options.callbackId;
  }
});
</script>

<style lang="scss" scoped>
.cascader-picker-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
  overflow-x: auto;
  white-space: nowrap;

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-size: 30rpx;
    color: #666666;

    &:first-child {
      .breadcrumb-text {
        font-weight: 600;
      }
    }

    .breadcrumb-text {
      &:active {
        opacity: 0.6;
      }
    }

    .breadcrumb-arrow {
      margin: 0 16rpx;
      font-size: 32rpx;
      color: #999999;
    }

    &:last-child {
      .breadcrumb-text {
        color: #333333;
        font-weight: 500;
      }
    }
  }
}

.options-container {
  flex: 1;
  background-color: #fff;

  .option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background-color: #fff;
    transition: background-color 0.2s;

    &:active {
      background-color: #f8f9fa;
    }

    &.active {
      background-color: #ecf5ff;

      .option-text {
        color: #007aff;
        font-weight: 500;
      }
    }

    .option-text {
      flex: 1;
      font-size: 28rpx;
      color: #333333;
    }

    .option-right {
      margin-left: 24rpx;

      .arrow-icon {
        font-size: 48rpx;
        color: #c8c8c8;
      }

      .check-icon {
        font-size: 40rpx;
        color: #007aff;
        font-weight: bold;
      }
    }
  }

  .no-data {
    padding: 160rpx 40rpx;
    text-align: center;
    font-size: 28rpx;
    color: #9ca3af;
  }
}

.footer-btn {
  padding: 20rpx 32rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #f0f0f0;

  .confirm-button {
    width: 100%;
    height: 88rpx;
    font-size: 32rpx;
    border-radius: 12rpx;
  }
}
</style>
