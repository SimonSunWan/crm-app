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
import { ref, reactive, onMounted } from "vue";
import { UserInfoManager } from "@/utils/userInfoManager.js";
import { HttpError } from "@/utils/api.js";
import CommonButton from "@/components/common-button/index.vue";
import {
  validatePhone,
  validateEmail,
  validateAccount,
  validateName,
} from "@/utils/validation.js";

const loading = ref(false);
const formRef = ref();

const formData = reactive({
  userName: "",
  nickName: "",
  phone: "",
  email: "",
});

const rules = {
  userName: {
    rules: [
      {
        required: true,
        errorMessage: "请输入账号",
      },
      {
        validateFunction: (rule, value, data, callback) => {
          if (!validateAccount(value)) {
            callback("字母开头, 4-20位, 支持字母、数字、下划线");
          }
          return true;
        },
      },
    ],
  },
  nickName: {
    rules: [
      {
        required: true,
        errorMessage: "请输入姓名",
      },
      {
        validateFunction: (rule, value, data, callback) => {
          if (!validateName(value)) {
            callback("2-20位, 支持中文、英文字母、空格");
          }
          return true;
        },
      },
    ],
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: "请输入手机号",
      },
      {
        validateFunction: (rule, value, data, callback) => {
          if (!validatePhone(value)) {
            callback("请输入正确的手机号");
          }
          return true;
        },
      },
    ],
  },
  email: {
    rules: [
      {
        validateFunction: (rule, value, data, callback) => {
          if (value && !validateEmail(value)) {
            callback("请输入正确的邮箱格式");
          }
          return true;
        },
      },
    ],
  },
};

onMounted(() => {
  loadUserInfo();
});

const loadUserInfo = async () => {
  try {
    const data = await UserInfoManager.refreshUserInfo();
    if (data) {
      formData.userName = data.userName || "";
      formData.nickName = data.nickName || "";
      formData.phone = data.phone || "";
      formData.email = data.email || "";
    }
  } catch (error) {
    uni.showToast({
      title: "获取用户信息失败",
      icon: "none",
    });
  }
};

const handleSave = async () => {
  try {
    const valid = await formRef.value.validate();
    if (!valid) return;

    loading.value = true;

    await UserInfoManager.updateUserInfo({
      userName: formData.userName,
      nickName: formData.nickName,
      phone: formData.phone,
      email: formData.email,
    });

    uni.showToast({
      title: "保存成功",
      icon: "success",
    });

    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "保存失败",
        icon: "none",
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
