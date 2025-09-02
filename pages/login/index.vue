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
        <input 
          v-model="formData.password"
          class="input-field"
          placeholder="请输入密码"
          type="password"
        />
      </view>
      
      <view class="slider-group">
        <slider-verify 
          ref="sliderVerifyRef"
          @verify="onSliderVerify"
        />
      </view>
      
      <view class="options-row">
        <view class="remember-password">
          <view class="checkbox" :class="{ checked: rememberPassword }" @click="toggleRemember">
            <text v-if="rememberPassword" class="checkmark iconfont icon-duigou"></text>
          </view>
          <text class="checkbox-label">记住密码</text>
        </view>
        <text class="forgot-link" @click="forgotPassword">忘记密码</text>
      </view>
      
      <button 
        class="login-btn" 
        :loading="loading"
        :disabled="loading"
        @click="handleLogin"
      >
        {{ loading ? '登 录 中...' : '登 录' }}
      </button>
      
      <view class="register-section">
        <text class="register-text">还没有账号？</text>
        <text class="register-link" @click="goToRegister">注册</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SliderVerify from '@/components/slider-verify/index.vue'

const loading = ref(false)
const rememberPassword = ref(false)
const sliderVerified = ref(false)
const sliderVerifyRef = ref(null)

const formData = reactive({
  username: '',
  password: ''
})

const onSliderVerify = () => {
  sliderVerified.value = true
}

const toggleRemember = () => {
  rememberPassword.value = !rememberPassword.value
}

const handleLogin = async () => {
  if (!formData.username || !formData.password) {
    uni.showToast({
      title: '请输入账号和密码',
      icon: 'none'
    })
    return
  }
  
  if (!sliderVerified.value) {
    uni.showToast({
      title: '请先完成滑块验证',
      icon: 'none'
    })
    return
  }
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }, 1000)
    
  } catch (error) {
    uni.showToast({
      title: '登录失败，请重试',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/register/register'
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
