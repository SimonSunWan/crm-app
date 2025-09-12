<template>
  <view class="index-container">
    <view class="banner">
      <view class="banner-content">
        <text class="banner-subtitle">高效管理，智能服务</text>
      </view>
    </view>
    <view class="index-content">
      <view
        class="content-item"
        v-for="(item, index) in filteredMenuList"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <view class="content-icon" :style="{ background: item.gradient }">
          <text class="iconfont icon-text" :class="item.icon"></text>
        </view>
        <text class="content-name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { userStore } from "@/store/userStore.js";
import { UserService } from "@/api/main/userApi.js";

const menuList = ref([
  {
    name: "保内工单",
    icon: "icon-gongdanxinxi",
    gradient: "linear-gradient(to bottom, #00ceaa, #00c09c)",
    path: "/pages/subpackages/order/order/internal/index",
    permission: "/order/internal",
  },
  {
    name: "保外工单",
    icon: "icon-waibu-02",
    gradient: "linear-gradient(to bottom, #f9b06f, #ff7721)",
    path: "/pages/subpackages/order/order/external/index",
    permission: "/order/external",
  },
]);

// 递归查找菜单权限
const findMenuByPath = (menus, targetPath) => {
  for (const menu of menus) {
    if (menu.path === targetPath) return menu;
    if (menu.children?.length > 0) {
      const found = findMenuByPath(menu.children, targetPath);
      if (found) return found;
    }
  }
  return null;
};

// 过滤菜单列表
const filteredMenuList = computed(() => {
  const menuPermissions = userStore.menuPermissions;

  if (!menuPermissions?.length) return [];

  return menuList.value.filter(
    (item) => findMenuByPath(menuPermissions, item.permission) !== null
  );
});

const loadMenuPermissions = async () => {
  try {
    const response = await UserService.getNavigationMenus();
    if (response && Array.isArray(response)) {
      userStore.setMenuPermissions(response);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadMenuPermissions();
});

const handleMenuClick = (item) => {
  uni.navigateTo({
    url: item.path,
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
