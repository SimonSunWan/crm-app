<template>
  <button 
    class="common-btn"
    :class="[`btn-${type}`, { 'btn-loading': loading, 'btn-disabled': disabled }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <text v-if="loading" class="loading-text">{{ loadingText }}</text>
    <text v-else>{{ text }}</text>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '按钮'
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.common-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border: none;
  border-radius: 44rpx;
  font-size: 28rpx;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.btn-primary {
    background: #3b82f6;
    color: #ffffff;
    
    &:active {
      background: #2563eb;
    }
    
    &.btn-disabled {
      background: #9ca3af;
      opacity: 0.6;
    }
  }
  
  &.btn-success {
    background: #10b981;
    color: #ffffff;
    
    &:active {
      background: #059669;
    }
    
    &.btn-disabled {
      background: #9ca3af;
      opacity: 0.6;
    }
  }
  
  &.btn-warning {
    background: #f59e0b;
    color: #ffffff;
    
    &:active {
      background: #d97706;
    }
    
    &.btn-disabled {
      background: #9ca3af;
      opacity: 0.6;
    }
  }
  
  &.btn-danger {
    background: #ef4444;
    color: #ffffff;
    
    &:active {
      background: #dc2626;
    }
    
    &.btn-disabled {
      background: #9ca3af;
      opacity: 0.6;
    }
  }
  
  &.btn-loading {
    opacity: 0.8;
    
    .loading-text {
      opacity: 0.8;
    }
  }
}
</style>
