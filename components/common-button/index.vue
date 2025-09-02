<template>
  <button
    class="common-btn"
    :class="[
      `btn-${type}`,
      { 'btn-loading': loading, 'btn-disabled': disabled },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <text v-if="loading" class="loading-text">{{ loadingText }}</text>
    <text v-else>{{ text }}</text>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "按钮",
  },
  type: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "success", "warning", "danger"].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "加载中...",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
