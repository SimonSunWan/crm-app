<template>
  <view class="search-select-container">
    <view class="search-input-wrapper" @click="toggleDropdown">
      <input
        v-model="displayText"
        class="search-input"
        :placeholder="placeholder"
        readonly
      />
      <view class="dropdown-arrow" :class="{ active: showDropdown }">
        <uni-icons type="bottom" size="14" color="#999" />
      </view>
    </view>
    <view v-if="showDropdown" class="dropdown-list">
      <view class="search-input-inner">
        <input
          v-model="searchKeyword"
          class="search-input-inner"
          placeholder="搜索选项"
          @input="onSearchInput"
        />
      </view>
      <scroll-view scroll-y="true" class="options-scroll">
        <view
          v-for="(option, optionIndex) in filteredData"
          :key="optionIndex"
          class="option-item"
          @click="selectOption(option)"
        >
          <text>{{ option.text }}</text>
        </view>
        <view v-if="filteredData.length === 0" class="no-data">
          <text>暂无数据</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";

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

const showDropdown = ref(false);
const searchKeyword = ref("");
const selectedOption = ref(null);

const displayText = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.textKey];
  }
  return "";
});

const filteredData = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();
  if (!keyword) {
    return props.localdata;
  }
  return props.localdata.filter((item) =>
    item[props.textKey].toLowerCase().includes(keyword)
  );
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    searchKeyword.value = "";
  }
};

const onSearchInput = (e) => {
  searchKeyword.value = e.detail.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  showDropdown.value = false;
  searchKeyword.value = "";
  emit("update:modelValue", option[props.valueKey]);
  emit("change", option[props.valueKey]);
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
      border: none;
      outline: none;
      font-size: 28rpx;
      color: #333333;
      background: transparent;

      &::placeholder {
        color: #9ca3af;
      }
    }

    .dropdown-arrow {
      display: flex;
      align-items: center;
      transition: transform 0.3s ease;

      &.active {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border: 2rpx solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 12rpx 12rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 400rpx;

    .search-input-inner {
      padding: 20rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .search-input-inner {
        width: 100%;
        height: 60rpx;
        padding: 0 15rpx;
        border: 2rpx solid #e5e7eb;
        border-radius: 8rpx;
        font-size: 26rpx;
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

    .options-scroll {
      max-height: 300rpx;

      .option-item {
        padding: 20rpx;
        border-bottom: 1rpx solid #f0f0f0;
        font-size: 26rpx;
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
        padding: 40rpx 20rpx;
        text-align: center;
        font-size: 24rpx;
        color: #9ca3af;
      }
    }
  }
}
</style>
