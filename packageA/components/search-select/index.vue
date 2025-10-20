<template>
  <view class="search-select-container">
    <view class="search-input-wrapper" @click="navigateToSearchPage">
      <view
        class="search-input"
        :class="{ 'has-value': displayText }"
      >
        <text v-if="displayText" class="input-text">{{ displayText }}</text>
        <text v-else class="input-placeholder">{{ placeholder }}</text>
      </view>
      <view class="dropdown-arrow">
        <uni-icons type="bottom" size="14" color="#999" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { onShow } from "@dcloudio/uni-app";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  localdata: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  textKey: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const selectedOption = ref(null);
const callbackId = ref("");

const displayText = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.textKey];
  }
  return "";
});

const generateCallbackId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const navigateToSearchPage = () => {
  callbackId.value = generateCallbackId();
  
  const params = {
    localdata: encodeURIComponent(JSON.stringify(props.localdata)),
    valueKey: props.valueKey,
    textKey: props.textKey,
    callbackId: callbackId.value
  };
  
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  uni.navigateTo({
    url: `/packageA/pages/search-select/index?${queryString}`
  });
};

const handleSearchResult = (result) => {
  if (result.callbackId === callbackId.value) {
    if (result.selectedOption) {
      selectedOption.value = result.selectedOption;
    } else {
      const option = props.localdata.find(
        item => item[props.valueKey] === result.selectedValue
      );
      if (option) {
        selectedOption.value = option;
      }
    }
    emit("update:modelValue", result.selectedValue);
    emit("change", result.selectedValue);
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      const option = props.localdata.find(
        (item) => item[props.valueKey] === newValue
      );
      if (option) {
        selectedOption.value = option;
      }
    } else {
      selectedOption.value = null;
    }
  },
  { immediate: true }
);

onMounted(() => {
  uni.$on('search-select-result', handleSearchResult);
});

onUnmounted(() => {
  uni.$off('search-select-result', handleSearchResult);
});

onShow(() => {
  checkGlobalResult();
});

const checkGlobalResult = () => {
  // 检查全局数据
  const app = getApp();
  if (app.globalData && app.globalData.searchSelectResult) {
    const result = app.globalData.searchSelectResult;
    handleSearchResult(result);
    delete app.globalData.searchSelectResult;
    return;
  }
  
  // 检查存储数据
  try {
    const result = uni.getStorageSync('searchSelectResult');
    if (result) {
      handleSearchResult(result);
      uni.removeStorageSync('searchSelectResult');
    }
  } catch (e) {
    // 忽略存储错误
  }
};
</script>

<style lang="scss" scoped>
.search-select-container {
  position: relative;
  width: 100%;

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 70rpx;
    padding: 0 20rpx;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    background: #ffffff;
    box-sizing: border-box;

    .search-input {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      background: transparent;

      .input-text {
        color: #333333;
      }

      .input-placeholder {
        color: #9ca3af;
      }
    }

    .dropdown-arrow {
      display: flex;
      align-items: center;
    }
  }
}
</style>
