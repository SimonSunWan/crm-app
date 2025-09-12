<template>
  <view class="change-password">
    <view class="form-container">
      <uni-forms
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="180rpx"
        label-align="right"
      >
        <uni-forms-item label="当前密码" name="currentPassword" required>
          <uni-easyinput
            v-model="formData.currentPassword"
            placeholder="请输入当前密码"
            type="password"
            password-icon
            trim="both"
          />
        </uni-forms-item>

        <uni-forms-item label="新密码" name="newPassword" required>
          <uni-easyinput
            v-model="formData.newPassword"
            placeholder="请输入新密码"
            type="password"
            password-icon
            trim="both"
          />
        </uni-forms-item>

        <uni-forms-item label="确认新密码" name="confirmPassword" required>
          <uni-easyinput
            v-model="formData.confirmPassword"
            placeholder="请再次输入新密码"
            type="password"
            password-icon
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
import { ref, reactive } from "vue";
import { UserInfoManager } from "@/utils/main/userInfoManager.js";
import { HttpError } from "@/utils/api.js";
import CommonButton from "@/components/main/common-button/index.vue";
import { validatePassword } from "@/utils/validation.js";

const loading = ref(false);
const formRef = ref();

const formData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  currentPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入当前密码",
      },
    ],
  },
  newPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入新密码",
      },
      {
        validateFunction: (rule, value, data, callback) => {
          if (!validatePassword(value)) {
            callback("6-20位, 必须包含字母和数字");
          }
          return true;
        },
      },
    ],
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请再次输入新密码",
      },
      {
        validateFunction: (rule, value, data, callback) => {
          if (value !== data.newPassword) {
            callback("两次输入密码不一致");
          }
          return true;
        },
      },
    ],
  },
};

const handleSave = async () => {
  try {
    const valid = await formRef.value.validate();
    if (!valid) return;

    loading.value = true;

    await UserInfoManager.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    uni.showToast({
      title: "密码修改成功",
      icon: "success",
    });

    formData.currentPassword = "";
    formData.newPassword = "";
    formData.confirmPassword = "";

    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    if (error instanceof HttpError) {
      uni.showToast({
        title: error.message || "修改密码失败",
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
