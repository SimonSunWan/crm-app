<template>
  <view class="edit-container">
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else class="edit-content">
      <view class="step-indicator">
        <view
          class="step-item"
          :class="{ active: currentStep >= 0, completed: currentStep > 0 }"
        >
          <view class="step-number">1</view>
          <text class="step-title">报修信息</text>
        </view>
        <view class="step-line" :class="{ active: currentStep > 0 }"></view>
        <view
          class="step-item"
          :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
        >
          <view class="step-number">2</view>
          <text class="step-title">维修记录</text>
        </view>
        <view class="step-line" :class="{ active: currentStep > 1 }"></view>
        <view
          class="step-item"
          :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
        >
          <view class="step-number">3</view>
          <text class="step-title">详情记录</text>
        </view>
      </view>

      <view v-if="currentStep === 0" class="form-step">
        <view class="form-section">
          <view class="section-title">客户信息</view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">整车厂/车型</text>
              <uni-easyinput
                v-model="formData.carModelText"
                placeholder="请输入整车厂/车型"
              />
            </view>
            <view class="form-item">
              <text class="label">维修店(4S)</text>
              <uni-easyinput
                v-model="formData.repairShop"
                placeholder="请输入维修店名称"
              />
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="section-title">报修人信息</view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">报修人</text>
              <uni-easyinput
                v-model="formData.reporterName"
                placeholder="请输入报修人姓名"
              />
            </view>
            <view class="form-item">
              <text class="label">联系方式</text>
              <uni-easyinput
                v-model="formData.contactInfo"
                placeholder="请输入联系方式"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">报修日期</text>
              <uni-datetime-picker
                v-model="formData.reportDate"
                type="date"
                placeholder="请选择报修日期"
              />
            </view>
            <view class="form-item">
              <text class="label">备件所属库位</text>
              <uni-data-select
                v-model="repairData.sparePartLocation"
                :localdata="spareLocationData"
                placeholder="请选择备件所属库位"
              />
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="section-title">保司信息</view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">出险公司</text>
              <uni-data-select
                v-model="formData.insurer"
                :localdata="insurerData"
                placeholder="请选择出险公司"
                @change="onInsurerChange"
              />
            </view>
            <view class="form-item">
              <text class="label">定损员</text>
              <uni-easyinput
                v-model="formData.assessor"
                placeholder="请输入定损员姓名"
              />
            </view>
          </view>
        </view>


        <view class="form-section">
          <view class="section-title">车辆信息</view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">车牌号</text>
              <uni-easyinput
                v-model="formData.licensePlate"
                placeholder="请输入车牌号"
              />
            </view>
            <view class="form-item">
              <text class="label">车架号</text>
              <uni-easyinput
                v-model="formData.vinNumber"
                placeholder="请输入车架号"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">里程(KM)</text>
              <uni-easyinput
                v-model="formData.mileage"
                type="number"
                placeholder="请输入里程"
              />
            </view>
            <view class="form-item">
              <text class="label">车辆位置</text>
              <uni-easyinput
                v-model="formData.vehicleLocation"
                placeholder="请输入车辆位置"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">车辆日期</text>
              <uni-datetime-picker
                v-model="formData.vehicleDate"
                type="date"
                placeholder="请选择车辆日期"
              />
            </view>
            <view class="form-item">
              <text class="label">PACK码</text>
              <uni-easyinput
                v-model="formData.packCode"
                placeholder="请输入PACK码"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">PACK日期</text>
              <uni-datetime-picker
                v-model="formData.packDate"
                type="date"
                placeholder="请选择PACK日期"
              />
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="section-title">故障信息</view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">是否在保</text>
              <uni-data-checkbox
                v-model="formData.underWarranty"
                :localdata="[
                  { value: true, text: '是' },
                  { value: false, text: '否' },
                ]"
                mode="button"
                :multiple="false"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item full-width">
              <text class="label">故障描述</text>
              <uni-easyinput
                v-model="formData.faultDescription"
                type="textarea"
                placeholder="请输入故障描述"
                :autoHeight="true"
              />
            </view>
          </view>
        </view>
      </view>

      <view v-if="currentStep === 1" class="form-step">
        <view class="form-section">
          <view class="form-row">
            <view class="form-item">
              <text class="label">维修人</text>
              <uni-easyinput
                v-model="repairData.repairPerson"
                placeholder="请输入维修人姓名"
              />
            </view>
            <view class="form-item">
              <text class="label">维修日期</text>
              <uni-datetime-picker
                v-model="repairData.repairDate"
                type="date"
                placeholder="请选择维修日期"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">中航责任</text>
              <uni-data-checkbox
                v-model="repairData.avicResponsibility"
                :localdata="[
                  { value: true, text: '是' },
                  { value: false, text: '否' },
                ]"
                mode="button"
                :multiple="false"
              />
            </view>
            <view class="form-item">
              <text class="label">故障位置</text>
              <uni-data-select
                v-model="repairData.faultLocation"
                :localdata="faultLocationData"
                placeholder="请选择故障位置"
                @change="onFaultLocationChange"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item">
              <text class="label">封签编码</text>
              <uni-easyinput
                v-model="formData.sealCode"
                placeholder="请输入封签编码"
              />
            </view>
          </view>
          <view class="form-row">
            <view class="form-item full-width">
              <text class="label">维修描述</text>
              <uni-easyinput
                v-model="repairData.repairDescription"
                type="textarea"
                placeholder="请填写维修过程"
                :autoHeight="true"
              />
            </view>
          </view>
        </view>
      </view>

      <view v-if="currentStep === 2" class="form-step">
        <view class="detail-section">
          <view class="section-header">
            <text class="section-title">备件使用详情</text>
          </view>


          <view class="card-list">
            <view
              v-for="(item, index) in spareParts"
              :key="index"
              class="spare-part-card"
            >
              <view class="card-header">
                <text class="card-title">备件信息 {{ index + 1 }}</text>
                <view class="card-actions">
                  <text class="action-btn add" @click="addSparePart">+</text>
                  <text
                    class="action-btn remove"
                    @click="removeSparePart(index)"
                    :class="{ disabled: spareParts.length <= 1 }"
                    >-</text
                  >
                </view>
              </view>

              <view class="card-content">
                <view class="form-row">
                  <view class="form-item">
                    <text class="label">保外备件名称</text>
                    <SearchSelect
                      v-model="item.name"
                      :localdata="partNumberData"
                      placeholder="请选择保外备件名称"
                      @change="(value) => onPartNameChange(value, index)"
                    />
                  </view>
                </view>

                <view class="form-row">
                  <view class="form-item">
                    <text class="label">使用数量</text>
                    <input
                      v-model="item.quantity"
                      class="input-field"
                      placeholder="使用数量"
                    />
                  </view>
                </view>

              </view>
            </view>
          </view>
        </view>

        <view class="detail-section">
          <view class="section-header">
            <text class="section-title">费用使用详情</text>
          </view>

          <view class="card-list">
            <view v-for="(item, index) in costs" :key="index" class="cost-card">
              <view class="card-header">
                <text class="card-title">费用信息 {{ index + 1 }}</text>
                <view class="card-actions">
                  <text class="action-btn add" @click="addCost">+</text>
                  <text
                    class="action-btn remove"
                    @click="removeCost(index)"
                    :class="{ disabled: costs.length <= 1 }"
                    >-</text
                  >
                </view>
              </view>

              <view class="card-content">
                <view class="form-row">
                  <view class="form-item">
                    <text class="label">费用类别</text>
                    <uni-data-select
                      v-model="item.category"
                      :localdata="feeTypeData"
                      placeholder="请选择费用类别"
                      @change="(e) => onCostCategoryChange(e, index)"
                    />
                  </view>
                </view>

                <view class="form-row">
                  <view class="form-item">
                    <text class="label">费用金额(元)</text>
                    <input
                      v-model="item.amount"
                      class="input-field"
                      placeholder="费用金额(元)"
                    />
                  </view>
                </view>

                <view class="form-row">
                  <view class="form-item">
                    <text class="label">备注</text>
                    <input
                      v-model="item.remark"
                      class="input-field"
                      placeholder="请输入备注"
                    />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="detail-section">
          <view class="section-header">
            <text class="section-title">工时详情</text>
          </view>

          <view class="card-list">
            <view
              v-for="(item, index) in labors"
              :key="index"
              class="labor-card"
            >
              <view class="card-header">
                <text class="card-title">工时信息 {{ index + 1 }}</text>
                <view class="card-actions">
                  <text class="action-btn add" @click="addLabor">+</text>
                  <text
                    class="action-btn remove"
                    @click="removeLabor(index)"
                    :class="{ disabled: labors.length <= 1 }"
                    >-</text
                  >
                </view>
              </view>

              <view class="card-content">
              <view class="form-row">
                <view class="form-item">
                  <text class="label">保外维修项目</text>
                  <uni-data-select
                    v-model="item.repairSelection"
                    :localdata="repairItemsData"
                    placeholder="请选择保外维修项目"
                    @change="(e) => onRepairSelectionChange(e, index)"
                  />
                </view>
                <view class="form-item">
                  <text class="label">维修进度</text>
                  <uni-data-select
                    v-model="item.repairProgress"
                    :localdata="repairProgressData"
                    placeholder="请选择维修进度"
                    @change="(e) => onRepairProgressChange(e, index)"
                  />
                </view>
              </view>

                <view class="form-row">
                  <view class="form-item">
                    <text class="label">维修数量</text>
                    <input
                      v-model="item.quantity"
                      class="input-field"
                      placeholder="维修数量"
                    />
                  </view>
                  <view class="form-item">
                    <text class="label">工时</text>
                    <input
                      v-model="item.coefficient"
                      class="input-field"
                      placeholder="工时"
                    />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-actions">
        <button class="action-btn cancel" @click="handleCancel">取消</button>
        <button
          v-if="currentStep > 0"
          class="action-btn prev"
          @click="prevStep"
        >
          上一步
        </button>
        <button
          v-if="currentStep < 2"
          class="action-btn next"
          @click="nextStep"
        >
          下一步
        </button>
        <button
          v-if="currentStep === 2"
          class="action-btn submit"
          @click="handleSubmit"
          :loading="submitLoading"
        >
          保存并完成
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ExternalOrderService } from "@/packageA/api/orderApi.js";
import { ExternalOrderDataService } from "@/packageA/services/externalOrderDataService.js";
import SearchSelect from "@/packageA/components/search-select/index.vue";

const loading = ref(false);
const submitLoading = ref(false);
const currentStep = ref(0);
const orderId = ref("");

const formData = reactive({
  id: "",
  carModelText: "", // 整车厂/车型文本
  repairShop: "",
  reporterName: "",
  contactInfo: "",
  reportDate: "",
  insurer: "",
  assessor: "",
  licensePlate: "",
  vinNumber: "",
  mileage: "",
  vehicleLocation: "",
  vehicleDate: "",
  packCode: "",
  packDate: "",
  sealCode: "",
  underWarranty: null,
  faultDescription: "",
});

const repairData = reactive({
  repairPerson: "",
  repairDate: "",
  avicResponsibility: null,
  faultLocation: "",
  sparePartLocation: "",
  repairDescription: "",
});

const spareParts = ref([
  {
    partNumber: "",
    name: "",
    nameIndex: 0,
    nameText: "",
    quantity: "",
  },
]);

const costs = ref([
  {
    category: "",
    categoryIndex: 0,
    categoryText: "",
    amount: "",
    remark: "",
  },
]);

const labors = ref([
  {
    repairSelection: "",
    repairSelectionIndex: 0,
    repairSelectionText: "",
    repairProgress: "",
    repairProgressIndex: 0,
    repairProgressText: "",
    quantity: "",
    coefficient: "",
  },
]);

const dictionaryOptions = ref({
  carModel: [],
  faultLocation: [],
  spareLocation: [],
  partNumber: [],
  feeType: [],
  outRepairItems: [],
  repairProgress: [],
  insurer: [],
});

const carModelData = ref([]);
const faultLocationData = ref([]);
const spareLocationData = ref([]);
const partNumberData = ref([]);
const feeTypeData = ref([]);
const repairItemsData = ref([]);
const repairProgressData = ref([]);
const insurerData = ref([]);

const getOrderDetail = async () => {
  loading.value = true;
  try {
    const response = await ExternalOrderService.getOrderById(orderId.value);
    if (response) {
      // 设置基本信息
      Object.assign(formData, response);

      // 设置整车厂/车型文本
      formData.carModelText = response.customer || '';

      if (response.details && response.details.length > 0) {
        const detail = response.details[0];
        Object.assign(repairData, {
          repairPerson: detail.repairPerson || "",
          repairDate: detail.repairDate || "",
          avicResponsibility: detail.avicResponsibility ?? null,
          faultLocation: detail.faultLocation || "",
          sparePartLocation: detail.sparePartLocation || "",
          repairDescription: detail.repairDescription || "",
        });


        spareParts.value = (detail.spareParts || []).map((part) => ({
          partNumber: part.partNumber || "",
          name: part.name || "",
          quantity: part.quantity || "",
        }));

        if (spareParts.value.length === 0) {
          spareParts.value = [
            {
              partNumber: "",
              name: "",
              quantity: "",
            },
          ];
        }

        costs.value = (detail.costs || []).map((cost) => ({
          category: cost.category || "",
          amount: cost.amount || "",
          remark: cost.remark || "",
        }));

        if (costs.value.length === 0) {
          costs.value = [
            {
              category: "",
              amount: "",
              remark: "",
            },
          ];
        }

    labors.value = (detail.labors || []).map((labor) => {
      return {
        repairSelection: labor.repairSelection || "",
        repairProgress: labor.repairProgress || "",
        quantity: labor.quantity || "",
        coefficient: labor.coefficient || "",
      };
    });

        if (labors.value.length === 0) {
          labors.value = [
            {
              repairSelection: "",
              repairProgress: "",
              quantity: "",
              coefficient: "",
            },
          ];
        }
      }
    }
  } catch (error) {
    uni.showToast({
      title: "获取数据失败",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};

const initOptionsArrays = () => {
  const convertToUniDataPickerFormat = (data) => {
    return data.map((item) => ({
      value: item.keyValue,
      text: item.dictValue,
      children: item.children
        ? convertToUniDataPickerFormat(item.children)
        : undefined,
    }));
  };

  carModelData.value = convertToUniDataPickerFormat(
    dictionaryOptions.value.carModel || []
  );

  faultLocationData.value = (dictionaryOptions.value.faultLocation || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
  spareLocationData.value = (dictionaryOptions.value.spareLocation || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
  insurerData.value = (dictionaryOptions.value.insurer || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
  partNumberData.value = (dictionaryOptions.value.partNumber || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
  feeTypeData.value = (dictionaryOptions.value.feeType || []).map((item) => ({
    value: item.keyValue,
    text: item.dictValue,
  }));
  repairItemsData.value = (dictionaryOptions.value.outRepairItems || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
  repairProgressData.value = (dictionaryOptions.value.repairProgress || []).map(
    (item) => ({
      value: item.keyValue,
      text: item.dictValue,
    })
  );
};

const getLabel = (keyValue, options) => {
  if (!keyValue || !options || !options.length) return null;
  const item = options.find((option) => option.keyValue === keyValue);
  return item ? item.dictValue : null;
};


const onInsurerChange = (e) => {};

const onPartNameChange = (value, index) => {
  if (value && spareParts.value[index]) {
    spareParts.value[index].partNumber = value;
  }
};

const onRepairSelectionChange = (e, index) => {
  if (e && e.detail && e.detail.value && labors.value[index]) {
    labors.value[index].repairSelection = e.detail.value;
  }
};

const onRepairProgressChange = (e, index) => {
  if (e && e.detail && e.detail.value && labors.value[index]) {
    labors.value[index].repairProgress = e.detail.value;
  }
};

// 构建提交数据
const buildSubmitData = (isEnd = false) => {
  const processedLabors = labors.value
    ? labors.value.map((labor) => {
        return {
          ...labor,
          repairSelection: labor.repairSelection || null,
        };
      })
    : null;

  const data = {
    customer: formData.carModelText || null,
    vehicleModel: formData.carModelText || null,
    repairShop: formData.repairShop || null,
    reporterName: formData.reporterName || null,
    contactInfo: formData.contactInfo || null,
    reportDate: formData.reportDate || null,
    insurer: formData.insurer || null,
    assessor: formData.assessor || null,
    licensePlate: formData.licensePlate || null,
    vinNumber: formData.vinNumber || null,
    mileage: formData.mileage || null,
    vehicleLocation: formData.vehicleLocation || null,
    vehicleDate: formData.vehicleDate || null,
    packCode: formData.packCode || null,
    packDate: formData.packDate || null,
    sealCode: formData.sealCode || null,
    underWarranty: formData.underWarranty ?? false,
    faultDescription: formData.faultDescription || null,
    repairPerson: repairData.repairPerson || null,
    repairDate: repairData.repairDate || null,
    avicResponsibility: repairData.avicResponsibility ?? false,
    faultLocation: repairData.faultLocation || null,
    sparePartLocation: repairData.sparePartLocation || null,
    repairDescription: repairData.repairDescription || null,
    spareParts: spareParts.value || null,
    costs: costs.value || null,
    labors: processedLabors,
  };
  
  // 只有最后一步才传递isEnd字段
  if (isEnd) {
    data.isEnd = true;
  }
  
  return data;
};

const nextStep = async () => {
  if (currentStep.value < 2) {
    // 第一步验证：检查必填字段
    if (currentStep.value === 0) {
      if (!repairData.sparePartLocation) {
        ExternalOrderDataService.showErrorToast("请选择备件所属库位");
        return;
      }
      if (!formData.insurer) {
        ExternalOrderDataService.showErrorToast("请选择出险公司");
        return;
      }
      if (!formData.assessor) {
        ExternalOrderDataService.showErrorToast("请输入定损员姓名");
        return;
      }
    }
    
    // 验证通过后，保存当前步骤的数据
    try {
      const submitData = buildSubmitData(false); // 前面步骤不传递isEnd字段
      // 更新工单
      await ExternalOrderDataService.updateOrder(formData.id, submitData);
      // 进入下一步
      currentStep.value++;
    } catch (error) {
      console.error(error);
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const addSparePart = () => {
  spareParts.value.push({
    partNumber: "",
    name: "",
    quantity: "",
  });
};

const removeSparePart = (index) => {
  if (spareParts.value.length > 1) {
    spareParts.value.splice(index, 1);
  }
};

const addCost = () => {
  costs.value.push({
    category: "",
    amount: "",
    remark: "",
  });
};

const removeCost = (index) => {
  if (costs.value.length > 1) {
    costs.value.splice(index, 1);
  }
};

const addLabor = () => {
  labors.value.push({
    repairSelection: "",
    repairProgress: "",
    quantity: "",
    coefficient: "",
  });
};

const removeLabor = (index) => {
  if (labors.value.length > 1) {
    labors.value.splice(index, 1);
  }
};

const handleSubmit = async () => {
  submitLoading.value = true;
  try {
    const submitData = buildSubmitData(true); // 最后一步保存，传递 isEnd=true
    let result;

    if (!formData.id) {
      // 新增工单
      result = await ExternalOrderDataService.createOrder(submitData);
      if (result && result.data) {
        formData.id = result.data.id;
      }
    } else {
      // 更新工单
      result = await ExternalOrderDataService.updateOrder(
        formData.id,
        submitData
      );
    }

    if (result.success) {
      ExternalOrderDataService.showSuccessToast("保存成功");
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    } else {
      ExternalOrderDataService.showErrorToast(result.error || "保存失败");
    }
  } catch (error) {
    ExternalOrderDataService.showErrorToast("保存失败");
  } finally {
    submitLoading.value = false;
  }
};

const handleCancel = () => {
  uni.navigateBack();
};

onLoad((options) => {
  const parsedParams = ExternalOrderDataService.parseNavigationParams(options);

  orderId.value = parsedParams.id || "";

  // 设置字典数据
  dictionaryOptions.value = {
    carModel: parsedParams.carModel || [],
    faultLocation: parsedParams.faultLocation || [],
    spareLocation: parsedParams.spareLocation || [],
    partNumber: parsedParams.partNumber || [],
    feeType: parsedParams.feeType || [],
    outRepairItems: parsedParams.outRepairItems || [],
    repairProgress: parsedParams.repairProgress || [],
    insurer: parsedParams.insurer || [],
  };

  initOptionsArrays();

  if (orderId.value) {
    getOrderDetail();
  }
});

onMounted(async () => {});
</script>

<style lang="scss" scoped>
@import "./edit.scss";
</style>
