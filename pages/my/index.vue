<template>
    <view class="my-container">
        <view class="my-header">
            <view class="my-header-left">
                <view v-if="userInfo.avatar" class="my-header-left-avatar">
                    <image :src="userInfo.avatar" mode="aspectFill" class="avatar-image"></image>
                </view>
                <view v-else class="my-header-left-avatar avatar-placeholder">
                    {{ getAvatarText(userInfo.nickName || userInfo.userName) }}
                </view>
            </view>
            <view class="my-header-info">
                <text class="user-name">{{ userInfo.userName }}</text>
                <text v-if="userInfo.nickName" class="user-nickname">{{ userInfo.nickName }}</text>
                <text v-if="userInfo.phone" class="user-phone">{{ userInfo.phone }}</text>
            </view>
        </view>
        <view class="my-content">
            <view 
                v-for="item in menuList" 
                :key="item.id"
                class="my-content-item"
                @click="handleItemClick(item)"
            >
                <view class="item-icon">
                    <text class="iconfont" :class="item.icon"></text>
                </view>
                <view class="item-name">{{ item.name }}</view>
                <view class="item-arrow">
                    <text class="iconfont icon-arrow"></text>
                </view>
            </view>
        </view>
        <view class="my-footer">
            <view class="logout-btn">退出登录</view>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from "vue";

const userInfo = ref({
    userName: 'test',
    nickName: '测试',
    phone: '13800138000',
    avatar: ''
})

const menuList = ref([
    {
        id: 1,
        name: '基本设置',
        icon: 'icon-setting',
        path: '/pages/settings/basic'
    },
    {
        id: 2,
        name: '更改密码',
        icon: 'icon-password',
        path: '/pages/settings/password'
    }
])

const getAvatarText = (text) => {
    return text ? text.charAt(0) : ''
}

const handleItemClick = (item) => {
    uni.navigateTo({
        url: item.path
    })
}
</script>
  
<style lang="scss" scoped>
@import "./index.scss";
</style>
  