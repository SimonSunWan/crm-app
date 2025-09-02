<template>
  <view class="basic-settings">
    <view class="form-container">
      <uni-forms 
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120rpx"
        label-align="right"
      >
        <uni-forms-item label="用户名" name="userName" required>
          <uni-easyinput
            v-model="formData.userName"
            placeholder="请输入用户名"
            trim="both"
          />
        </uni-forms-item>
        
        <uni-forms-item label="昵称" name="nickName" required>
          <uni-easyinput
            v-model="formData.nickName"
            placeholder="请输入昵称"
            trim="both"
          />
        </uni-forms-item>
        
        <uni-forms-item label="手机号" name="phone" required>
          <uni-easyinput
            v-model="formData.phone"
            placeholder="请输入手机号"
            type="number"
            trim="both"
          />
        </uni-forms-item>
        
        <uni-forms-item label="邮箱" name="email">
          <uni-easyinput
            v-model="formData.email"
            placeholder="请输入邮箱"
            type="email"
            trim="both"
          />
        </uni-forms-item>
        
        <view class="form-actions">
          <common-button
            text="保存"
            type="primary"
            :loading="loading"
            @click="handleSave"
          />
        </view>
      </uni-forms>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { UserService } from '@/api/userApi.js'
import { HttpError } from '@/utils/api.js'
import CommonButton from '@/components/common-button/index.vue'

const loading = ref(false)
const formRef = ref()

const formData = reactive({
  userName: '',
  nickName: '',
  phone: '',
  email: ''
})

const rules = {
  userName: {
    rules: [{
      required: true,
      errorMessage: '请输入用户名'
    }]
  },
  nickName: {
    rules: [{
      required: true,
      errorMessage: '请输入昵称'
    }]
  },
  phone: {
    rules: [{
      required: true,
      errorMessage: '请输入手机号'
    }, {
      pattern: /^1[3-9]\d{9}$/,
      errorMessage: '请输入正确的手机号格式'
    }]
  },
  email: {
    rules: [{
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: '请输入正确的邮箱格式'
    }]
  }
}

onMounted(() => {
  loadUserInfo()
})

const loadUserInfo = async () => {
  try {
    const data = await UserService.getUserInfo()
    if (data) {
      formData.userName = data.userName || ''
      formData.nickName = data.nickName || ''
      formData.phone = data.phone || ''
      formData.email = data.email || ''
    }
  } catch (error) {
    uni.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
  }
}

const handleSave = async () => {
  try {
    const valid = await formRef.value.validate()
    if (!valid) return
    
    loading.value = true
    
    await UserService.updateCurrentUser({
      userName: formData.userName,
      nickName: formData.nickName,
      phone: formData.phone,
      email: formData.email
    })
    
    await loadUserInfo()
    
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || '保存失败',
        icon: 'none'
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.basic-settings {
  background-color: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
  
  .form-container {
    background-color: #fff;
    padding: 40rpx;
    box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.1);
    
    .form-actions {
      margin-top: 40rpx;
    }
  }
}
</style>
