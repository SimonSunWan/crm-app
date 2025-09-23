<template>
  <view class="external-container">
    <view class="fixed-search">
      <view class="content-header">
        <text class="iconfont icon-plus add-btn" @click="handleAdd"></text>

        <view class="filter-section">
          <uni-easyinput
            v-model="searchForm.orderNo"
            class="filter-input"
            placeholder="请输入工单编号"
            :clearable="true"
          />

          <view class="filter-actions">
            <text
              class="iconfont icon-search search-btn"
              @click="handleSearch"
            ></text>
            <text
              class="iconfont icon-reset_line reset-btn"
              @click="handleReset"
            ></text>
          </view>
        </view>
      </view>
    </view>

    <scroll-view
      class="list-scroll"
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <view class="list-container">
        <view
          v-if="loading && orderList.length === 0"
          class="loading-container"
        >
          <uni-load-more
            status="loading"
            content-text="{ contentText: { contentdown: '加载中...' } }"
          ></uni-load-more>
        </view>

        <view v-else-if="orderList.length === 0" class="empty-container">
          <text class="empty-text">暂无数据</text>
        </view>

        <view v-else class="card-list">
          <view
            v-for="item in orderList"
            :key="item.id"
            class="order-card"
            @click="handleCardClick(item)"
          >
            <view class="card-header">
              <text class="order-number">{{ item.id || "-" }}</text>
              <view class="card-actions">
                <text
                  v-if="shouldShowEditDelete(item)"
                  class="iconfont icon-edit action-btn edit"
                  @click.stop="handleEdit(item)"
                ></text>
                <text
                  v-if="shouldShowEditDelete(item)"
                  class="iconfont icon-delete action-btn delete"
                  @click.stop="handleDelete(item)"
                ></text>
              </view>
            </view>

            <view class="card-content">
              <view class="content-row">
                <text class="label">整车厂：</text>
                <text class="value">{{
                  getCarModelLabel(item.customer) || "-"
                }}</text>
              </view>
              <view class="content-row">
                <text class="label">车型：</text>
                <text class="value">{{
                  getCarModelLabel(item.vehicleModel) || "-"
                }}</text>
              </view>
              <view class="content-row">
                <text class="label">维修店(4S)：</text>
                <text class="value">{{ item.repairShop || "-" }}</text>
              </view>
              <view class="content-row">
                <text class="label">报修人：</text>
                <text class="value">{{ item.reporterName || "-" }}</text>
              </view>
            </view>
          </view>
        </view>

        <view v-if="orderList.length > 0" class="load-more-container">
          <uni-load-more
            :status="loadingMore ? 'loading' : noMore ? 'noMore' : 'more'"
            :content-text="{
              contentdown: '上拉加载更多',
              contentrefresh: '加载中...',
              contentnomore: '没有更多数据了',
            }"
          ></uni-load-more>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { ExternalOrderDataService } from "@/packageA/services/externalOrderDataService.js";
import { DictionaryUtils } from "@/packageA/utils/dictionaryUtils.js";
import { PermissionManager } from "@/packageA/utils/permissionManager.js";
import { userStore } from "@/store/userStore.js";

const loading = ref(false);
const refreshing = ref(false);
const loadingMore = ref(false);
const noMore = ref(false);
const orderList = ref([]);
const isFirstLoad = ref(true);
const pagination = ref({
  current: 1,
  size: 10,
  total: 0,
});
const dictionaryOptions = ref({
  carModel: [],
  projectType: [],
  projectPhase: [],
  faultClassification: [],
  faultLocation: [],
  partCategory: [],
  spareLocation: [],
  partNumber: [],
  feeType: [],
  outRepairItems: [],
});

const searchForm = ref({
  orderNo: "",
});

// 判断是否显示编辑删除按钮
const shouldShowEditDelete = (item) => {
  const hasViewAllPermission = PermissionManager.hasPagePermission('/order/external', 'view_all');
  return hasViewAllPermission || !item.isEnd;
};

const handleAdd = () => {
  const params = ExternalOrderDataService.buildNavigationParams(
    dictionaryOptions.value
  );
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  uni.navigateTo({
    url: `/packageA/pages/external/add?${queryString}`,
  });
};

const handleSearch = () => {
  pagination.value.current = 1;
  noMore.value = false;
  getOrderList();
};

const handleReset = () => {
  searchForm.value.orderNo = "";
  pagination.value.current = 1;
  noMore.value = false;
  getOrderList();
};

const handleCardClick = (item) => {
  const params = ExternalOrderDataService.buildNavigationParams(
    dictionaryOptions.value,
    { id: item.id }
  );
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  uni.navigateTo({
    url: `/packageA/pages/external/detail?${queryString}`,
  });
};

const handleEdit = (item) => {
  const params = ExternalOrderDataService.buildNavigationParams(
    dictionaryOptions.value,
    { id: item.id }
  );
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  uni.navigateTo({
    url: `/packageA/pages/external/edit?${queryString}`,
  });
};

const handleDelete = async (item) => {
  const confirmed = await ExternalOrderDataService.showConfirmDialog(
    "确认删除",
    `确定要删除保外工单 ${item.id} 吗？`
  );

  if (confirmed) {
    const result = await ExternalOrderDataService.deleteOrder(item.id);
    if (result.success) {
      ExternalOrderDataService.showSuccessToast("删除成功");
      getOrderList();
    } else {
      ExternalOrderDataService.showErrorToast(result.error || "删除失败");
    }
  }
};

const getOrderList = async (isLoadMore = false) => {
  if (isLoadMore) {
    loadingMore.value = true;
  } else {
    loading.value = true;
  }

  try {
    const params = {
      orderNo: searchForm.value.orderNo || "",
      current: pagination.value.current,
      size: pagination.value.size,
    };

    // 检查权限，没有view_all权限则只查看自己创建的工单
    if (!PermissionManager.hasPagePermission("/order/external", "view_all")) {
      params.createdBy = userStore.userInfo.id;
    }

    const result = await ExternalOrderDataService.getOrderList(params);

    if (result.success) {
      if (isLoadMore) {
        orderList.value = [...orderList.value, ...result.data];
      } else {
        orderList.value = result.data;
      }

      pagination.value.total = result.total;
      const totalPages = Math.ceil(
        pagination.value.total / pagination.value.size
      );
      noMore.value = pagination.value.current >= totalPages;
    } else {
      ExternalOrderDataService.showErrorToast(result.error || "获取数据失败");
    }
  } catch (error) {
    ExternalOrderDataService.showErrorToast("获取数据失败");
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadDictionaryData = async () => {
  try {
    dictionaryOptions.value =
      await ExternalOrderDataService.loadDictionaryData();
  } catch (error) {
    ExternalOrderDataService.showErrorToast("加载字典数据失败");
  }
};

const getCarModelLabel = (value) => {
  return (
    DictionaryUtils.getDictionaryLabel(
      value,
      dictionaryOptions.value.carModel,
      true
    ) || value
  );
};

const onRefresh = async () => {
  refreshing.value = true;
  pagination.value.current = 1;
  noMore.value = false;

  try {
    await getOrderList();
  } finally {
    refreshing.value = false;
  }
};

const onLoadMore = async () => {
  if (loadingMore.value || noMore.value) {
    return;
  }

  pagination.value.current += 1;
  await getOrderList(true);
};

onShow(() => {
  if (!isFirstLoad.value) {
    pagination.value.current = 1;
    noMore.value = false;
    getOrderList();
  }
});

onMounted(async () => {
  await loadDictionaryData();
  getOrderList();
  isFirstLoad.value = false;
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
