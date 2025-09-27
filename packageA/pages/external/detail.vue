<template>
  <view class="detail-container">
    <view v-if="loading" class="loading-container">
      <uni-load-more
        status="loading"
        content-text="{ contentText: { contentdown: '加载中...' } }"
      ></uni-load-more>
    </view>

    <view v-else-if="!orderData" class="empty-container">
      <text class="empty-text">数据不存在</text>
    </view>

    <view v-else class="detail-content">
      <view class="info-section">
        <view class="section-title">客户信息</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">整车厂/车型：</text>
            <text class="value">{{ orderData.customer || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">维修店(4S)：</text>
            <text class="value">{{ orderData.repairShop || "-" }}</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">报修人信息</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">报修人：</text>
            <text class="value">{{ orderData.reporterName || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">联系方式：</text>
            <text class="value">{{ orderData.contactInfo || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">报修日期：</text>
            <text class="value">{{ orderData.reportDate || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">备件所属库位：</text>
            <text class="value">{{
              getSpareLocationLabel(getDetailValue("sparePartLocation")) || "-"
            }}</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">保司信息</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">出险公司：</text>
            <text class="value">{{
              getInsurerLabel(orderData.insurer) || "-"
            }}</text>
          </view>
          <view class="info-item">
            <text class="label">定损员：</text>
            <text class="value">{{ orderData.assessor || "-" }}</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">车辆信息</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">车牌号：</text>
            <text class="value">{{ orderData.licensePlate || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">车架号：</text>
            <text class="value">{{ orderData.vinNumber || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">里程(KM)：</text>
            <text class="value">{{
              orderData.mileage ? `${orderData.mileage}` : "-"
            }}</text>
          </view>
          <view class="info-item">
            <text class="label">车辆位置：</text>
            <text class="value">{{ orderData.vehicleLocation || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">车辆日期：</text>
            <text class="value">{{ orderData.vehicleDate || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">PACK码：</text>
            <text class="value">{{ orderData.packCode || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">PACK日期：</text>
            <text class="value">{{ orderData.packDate || "-" }}</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">故障信息</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">是否在保：</text>
            <view
              class="tag"
              :class="{
                'tag-success': orderData.underWarranty,
                'tag-danger': !orderData.underWarranty,
              }"
            >
              {{ orderData.underWarranty ? "是" : "否" }}
            </view>
          </view>
          <view class="info-item inline-layout">
            <text class="label">故障描述：</text>
            <text class="value">{{ orderData.faultDescription || "-" }}</text>
          </view>
        </view>
      </view>

      <view v-if="getDetailValue('repairPerson')" class="info-section">
        <view class="section-title">维修记录</view>
        <view class="info-grid">
          <view class="info-item">
            <text class="label">维修人：</text>
            <text class="value">{{
              getDetailValue("repairPerson") || "-"
            }}</text>
          </view>
          <view class="info-item">
            <text class="label">维修日期：</text>
            <text class="value">{{ getDetailValue("repairDate") || "-" }}</text>
          </view>
          <view class="info-item">
            <text class="label">中航责任：</text>
            <view
              class="tag"
              :class="{
                'tag-success': getDetailValue('avicResponsibility'),
                'tag-danger': !getDetailValue('avicResponsibility'),
              }"
            >
              {{ getDetailValue("avicResponsibility") ? "是" : "否" }}
            </view>
          </view>
          <view class="info-item">
            <text class="label">故障位置：</text>
            <text class="value">{{
              getFaultLocationLabel(getDetailValue("faultLocation")) || "-"
            }}</text>
          </view>
          <view class="info-item">
            <text class="label">封签编码：</text>
            <text class="value">{{ orderData.sealCode || "-" }}</text>
          </view>
          <view class="info-item inline-layout">
            <text class="label">维修描述：</text>
            <text class="value">{{
              getDetailValue("repairDescription") || "-"
            }}</text>
          </view>
        </view>
      </view>

      <view v-if="getSpareParts().length > 0" class="info-section">
        <view class="section-title">备件使用详情</view>

        <view
          v-for="(item, index) in getSpareParts()"
          :key="index"
          class="info-section"
        >
          <view class="section-title">备件信息 {{ index + 1 }}</view>
          <view class="info-grid">
            <view class="info-item">
              <text class="label">保外备件名称：</text>
              <text class="value">{{
                getPartNameLabel(item.name) || item.name || "-"
              }}</text>
            </view>
            <view class="info-item">
              <text class="label">使用数量：</text>
              <text class="value">{{ item.quantity || "-" }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="getCosts().length > 0" class="info-section">
        <view class="section-title">费用使用详情</view>

        <view
          v-for="(item, index) in getCosts()"
          :key="index"
          class="info-section"
        >
          <view class="section-title">费用信息 {{ index + 1 }}</view>
          <view class="info-grid">
            <view class="info-item">
              <text class="label">费用类别：</text>
              <text class="value">{{
                getFeeTypeLabel(item.category) || item.category || "-"
              }}</text>
            </view>
            <view class="info-item">
              <text class="label">费用金额(元)：</text>
              <text class="value">{{ item.amount || "-" }}</text>
            </view>
            <view class="info-item">
              <text class="label">备注：</text>
              <text class="value">{{ item.remark || "-" }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="getLabors().length > 0" class="info-section">
        <view class="section-title">工时详情</view>

        <view
          v-for="(item, index) in getLabors()"
          :key="index"
          class="info-section"
        >
          <view class="section-title">工时信息 {{ index + 1 }}</view>
          <view class="info-grid">
            <view class="info-item">
              <text class="label">保外维修项目：</text>
              <text class="value">{{
                getRepairSelectionText(item.repairSelection) || "-"
              }}</text>
            </view>
            <view class="info-item">
              <text class="label">维修进度：</text>
              <text class="value">{{
                getRepairProgressLabel(item.repairProgress) || "-"
              }}</text>
            </view>
            <view class="info-item">
              <text class="label">维修数量：</text>
              <text class="value">{{ item.quantity || "-" }}</text>
            </view>
            <view class="info-item">
              <text class="label">工时：</text>
              <text class="value">{{ item.coefficient || "-" }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ExternalOrderDataService } from "@/packageA/services/externalOrderDataService.js";
import { DictionaryUtils } from "@/packageA/utils/dictionaryUtils.js";

const loading = ref(false);
const orderData = ref(null);
const orderId = ref("");

const dictionaryOptions = ref({
  carModel: [],
  insurer: [],
  outRepairItems: [],
  repairProgress: [],
  faultLocation: [],
  spareLocation: [],
  partNumber: [],
  feeType: [],
});

const getOrderDetail = async (id) => {
  loading.value = true;
  try {
    const result = await ExternalOrderDataService.getOrderDetail(id);
    if (result.success) {
      orderData.value = result.data;
    } else {
      ExternalOrderDataService.showErrorToast(result.error || "获取数据失败");
    }
  } catch (error) {
    ExternalOrderDataService.showErrorToast("获取数据失败");
  } finally {
    loading.value = false;
  }
};

const getCarModelLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.carModel,
    true
  );
const getInsurerLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.insurer
  );
const getFaultLocationLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.faultLocation
  );
const getSpareLocationLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.spareLocation
  );
const getPartNameLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.partNumber
  );
const getFeeTypeLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(keyValue, dictionaryOptions.value.feeType);
const getOutRepairItemLabel = (keyValue) =>
  DictionaryUtils.getDictionaryLabel(
    keyValue,
    dictionaryOptions.value.outRepairItems,
    true
  );

const getRepairSelectionText = (repairSelection) => {
  if (!repairSelection) return null;

  if (Array.isArray(repairSelection)) {
    const texts = repairSelection
      .map((item) => {
        if (typeof item === "object" && item.text) {
          return item.text;
        }
        if (typeof item === "string") {
          return getOutRepairItemLabel(item);
        }
        return item;
      })
      .filter((text) => text);

    return texts.length > 0 ? texts.join(" / ") : null;
  }

  // 如果是字符串，使用字典工具函数获取对应的文本标签
  if (typeof repairSelection === "string") {
    return getOutRepairItemLabel(repairSelection);
  }

  return repairSelection;
};

const getRepairProgressLabel = (keyValue) => {
  if (!keyValue) return null;
  const options = dictionaryOptions.value.repairProgress || [];
  const item = options.find((option) => option.keyValue === keyValue);
  return item ? item.dictValue : keyValue;
};

const getDetailValue = (key) => {
  if (orderData.value?.details && orderData.value.details.length > 0) {
    return orderData.value.details[0][key];
  }
  return null;
};

const getSpareParts = () => {
  const spareParts = getDetailValue("spareParts");
  return Array.isArray(spareParts) ? spareParts : [];
};

const getCosts = () => {
  const costs = getDetailValue("costs");
  return Array.isArray(costs) ? costs : [];
};

const getLabors = () => {
  const labors = getDetailValue("labors");
  return Array.isArray(labors) ? labors : [];
};

onLoad((options) => {
  orderId.value = options.id || "";
  dictionaryOptions.value =
    ExternalOrderDataService.parseNavigationParams(options);

  if (orderId.value) {
    getOrderDetail(orderId.value);
  }
});

onMounted(async () => {});
</script>

<style lang="scss" scoped>
@import "./detail.scss";
</style>
