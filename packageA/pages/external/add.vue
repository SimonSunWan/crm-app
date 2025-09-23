<template>
  <view class="add-order-container">
    <uni-steps :active="currentStep" direction="row">
      <uni-steps-item
        title="报修信息"
        :status="
          currentStep >= 0 ? (currentStep > 0 ? 'finish' : 'process') : 'wait'
        "
      ></uni-steps-item>
      <uni-steps-item
        title="维修记录"
        :status="
          currentStep >= 1 ? (currentStep > 1 ? 'finish' : 'process') : 'wait'
        "
      ></uni-steps-item>
      <uni-steps-item
        title="详情记录"
        :status="currentStep >= 2 ? 'process' : 'wait'"
      ></uni-steps-item>
    </uni-steps>

    <view v-if="currentStep === 0" class="form-step">
      <view class="form-section">
        <view class="section-title">客户信息</view>
        <view class="form-row">
          <view class="form-item">
            <text class="label">整车厂/车型</text>
            <uni-data-picker
              v-model="formData.carSelection"
              :localdata="carModelData"
              placeholder="请选择整车厂/车型"
              @change="onCarChange"
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
              @change="onSparePartLocationChange"
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
                  <text class="label">备件名称</text>
                  <SearchSelect
                    v-model="item.name"
                    :localdata="partNumberData"
                    placeholder="备件名称"
                    @change="(value) => onPartNameChange(value, index)"
                  />
                </view>
              </view>

              <view class="form-row">
                <view class="form-item">
                  <text class="label">使用数量</text>
                  <uni-easyinput
                    v-model="item.quantity"
                    placeholder="使用数量"
                  />
                </view>
              </view>

              <view class="form-row">
                <view class="form-item">
                  <text class="label">旧件编码</text>
                  <uni-easyinput
                    v-model="item.oldPartCode"
                    placeholder="旧件编码"
                  />
                </view>
                <view class="form-item">
                  <text class="label">新件编码</text>
                  <uni-easyinput
                    v-model="item.newPartCode"
                    placeholder="新件编码"
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
                    placeholder="费用类别"
                    @change="(e) => onCostCategoryChange(e, index)"
                  />
                </view>
              </view>

              <view class="form-row">
                <view class="form-item">
                  <text class="label">费用金额(元)</text>
                  <uni-easyinput
                    v-model="item.amount"
                    placeholder="费用金额(元)"
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
          <view v-for="(item, index) in labors" :key="index" class="labor-card">
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
                  <text class="label">故障位置/维修项目</text>
                  <uni-data-picker
                    v-model="item.repairSelection"
                    :localdata="repairItemsData"
                    placeholder="请选择故障位置/维修项目"
                    @change="(e) => onRepairSelectionChange(e, index)"
                  />
                </view>
              </view>

              <view class="form-row">
                <view class="form-item">
                  <text class="label">维修数量</text>
                  <uni-easyinput
                    v-model="item.quantity"
                    placeholder="维修数量"
                  />
                </view>
                <view class="form-item">
                  <text class="label">工时</text>
                  <uni-easyinput
                    v-model="item.coefficient"
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
      <button type="default" class="action-btn cancel" @click="handleCancel">
        取消
      </button>
      <button
        v-if="currentStep > 0"
        type="primary"
        class="action-btn prev"
        @click="prevStep"
      >
        上一步
      </button>
      <button
        v-if="currentStep < 2"
        type="primary"
        class="action-btn next"
        @click="nextStep"
      >
        下一步
      </button>
      <button
        v-if="currentStep === 2"
        type="primary"
        class="action-btn submit"
        @click="handleSubmit"
        :loading="loading"
      >
        保存并完成
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ExternalOrderDataService } from "@/packageA/services/externalOrderDataService.js";
import { DictionaryUtils } from "@/packageA/utils/dictionaryUtils.js";
import SearchSelect from "@/packageA/components/search-select/index.vue";

const currentStep = ref(0);
const loading = ref(false);

const dictionaryOptions = ref({
  carModel: [],
  faultLocation: [],
  spareLocation: [],
  partNumber: [],
  feeType: [],
  repairItems: [],
  insurer: [],
});

const formData = reactive({
  carSelection: [], // 级联选择器：整车厂/车型
  customer: "", // 整车厂
  vehicleModel: "", // 车型
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
    oldPartCode: "",
    newPartCode: "",
  },
]);

const costs = ref([
  {
    category: "",
    categoryIndex: 0,
    categoryText: "",
    amount: "",
  },
]);

const labors = ref([
  {
    repairSelection: [],
    repairSelectionIndex: 0,
    repairSelectionText: "",
    quantity: "",
    coefficient: "",
  },
]);

const carModelData = ref([]);
const faultLocationData = ref([]);
const spareLocationData = ref([]);
const partNumberData = ref([]);
const feeTypeData = ref([]);
const repairItemsData = ref([]);
const insurerData = ref([]);

const initOptionsArrays = () => {
  carModelData.value = DictionaryUtils.convertToUniDataPickerFormat(
    dictionaryOptions.value.carModel || []
  );

  faultLocationData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.faultLocation || []
  );
  spareLocationData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.spareLocation || []
  );
  insurerData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.insurer || []
  );
  partNumberData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.partNumber || []
  );
  feeTypeData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.feeType || []
  );
  repairItemsData.value = DictionaryUtils.convertToUniDataPickerFormat(
    dictionaryOptions.value.repairItems || []
  );
};

const onCarChange = (e) => {
  if (e && e.detail && e.detail.value && Array.isArray(e.detail.value)) {
    formData.customer = e.detail.value[0]?.value || "";
    formData.vehicleModel = e.detail.value[1]?.value || "";
  }
};


const onInsurerChange = (e) => {};

const onFaultLocationChange = (e) => {};

const onSparePartLocationChange = (e) => {};

const onPartNameChange = (value, index) => {
  if (value && spareParts.value[index]) {
    spareParts.value[index].partNumber = value;
  }
};

const onCostCategoryChange = (e, index) => {};

const onRepairSelectionChange = (e, index) => {
  if (
    e &&
    e.detail &&
    e.detail.value &&
    Array.isArray(e.detail.value) &&
    labors.value[index]
  ) {
    labors.value[index].repairSelection = e.detail.value;
  }
};

const validateStep0 = () => {
  const errors = [];

  if (!formData.carSelection || formData.carSelection.length === 0) {
    errors.push("请选择整车厂/车型");
  }
  if (!formData.repairShop || formData.repairShop.trim() === "") {
    errors.push("请输入维修店名称");
  }
  if (!formData.reporterName || formData.reporterName.trim() === "") {
    errors.push("请输入报修人姓名");
  }
  if (!formData.contactInfo || formData.contactInfo.trim() === "") {
    errors.push("请输入联系方式");
  }
  if (!formData.reportDate || formData.reportDate.trim() === "") {
    errors.push("请选择报修日期");
  }
  if (!formData.insurer || formData.insurer.trim() === "") {
    errors.push("请选择出险公司");
  }
  if (!formData.assessor || formData.assessor.trim() === "") {
    errors.push("请输入定损员姓名");
  }
  if (!formData.vinNumber || formData.vinNumber.trim() === "") {
    errors.push("请输入车架号");
  }
  if (!formData.vehicleLocation || formData.vehicleLocation.trim() === "") {
    errors.push("请输入车辆位置");
  }
  if (!formData.vehicleDate || formData.vehicleDate.trim() === "") {
    errors.push("请选择车辆日期");
  }
  if (formData.underWarranty === null) {
    errors.push("请选择是否在保");
  }
  if (!formData.faultDescription || formData.faultDescription.trim() === "") {
    errors.push("请输入故障描述");
  }
  if (!repairData.sparePartLocation || repairData.sparePartLocation.trim() === "") {
    errors.push("请选择备件所属库位");
  }

  return errors;
};

const validateStep1 = () => {
  const errors = [];

  if (!repairData.repairPerson || repairData.repairPerson.trim() === "") {
    errors.push("请输入维修人姓名");
  }
  if (!repairData.repairDate || repairData.repairDate.trim() === "") {
    errors.push("请选择维修日期");
  }
  if (repairData.avicResponsibility === null) {
    errors.push("请选择中航责任");
  }
  if (!repairData.faultLocation || repairData.faultLocation.trim() === "") {
    errors.push("请选择故障位置");
  }
  if (
    !repairData.repairDescription ||
    repairData.repairDescription.trim() === ""
  ) {
    errors.push("请输入维修描述");
  }

  return errors;
};

const validateStep2 = () => {
  const errors = [];

  for (let i = 0; i < spareParts.value.length; i++) {
    const part = spareParts.value[i];
    if (!part.name || part.name.trim() === "") {
      errors.push(`备件信息${i + 1}：请选择备件名称`);
    }
    if (!part.quantity || part.quantity.trim() === "") {
      errors.push(`备件信息${i + 1}：请输入使用数量`);
    }
  }

  for (let i = 0; i < costs.value.length; i++) {
    const cost = costs.value[i];
    if (!cost.category || cost.category.trim() === "") {
      errors.push(`费用信息${i + 1}：请选择费用类别`);
    }
    if (!cost.amount || cost.amount.trim() === "") {
      errors.push(`费用信息${i + 1}：请输入费用金额`);
    }
  }

  for (let i = 0; i < labors.value.length; i++) {
    const labor = labors.value[i];
    if (!labor.repairSelection || labor.repairSelection.length === 0) {
      errors.push(`工时信息${i + 1}：请选择故障位置/维修项目`);
    }
    if (!labor.quantity || labor.quantity.trim() === "") {
      errors.push(`工时信息${i + 1}：请输入维修数量`);
    }
    if (!labor.coefficient || labor.coefficient.trim() === "") {
      errors.push(`工时信息${i + 1}：请输入工时`);
    }
  }

  return errors;
};

// 构建提交数据
const buildSubmitData = () => {
  const processedLabors = labors.value
    ? labors.value.map((labor) => {
        const repairSelectionValues = Array.isArray(labor.repairSelection)
          ? labor.repairSelection.map((item) =>
              typeof item === "object" ? item.value : item
            )
          : [];

        return {
          ...labor,
          repairSelection: repairSelectionValues,
          faultLocation: repairSelectionValues[0] || null,
          repairItem: repairSelectionValues[1] || null,
        };
      })
    : null;

  return {
    customer: formData.customer || null,
    vehicleModel: formData.vehicleModel || null,
    repairShop: formData.repairShop || null,
    reporterName: formData.reporterName || null,
    contactInfo: formData.contactInfo || null,
    reportDate: formData.reportDate || null,
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
};

const nextStep = async () => {
  if (currentStep.value < 2) {
    let errors = [];

    if (currentStep.value === 0) {
      errors = validateStep0();
    } else if (currentStep.value === 1) {
      errors = validateStep1();
    }

    if (errors.length > 0) {
      uni.showToast({
        title: errors[0],
        icon: "none",
        duration: 2000,
      });
      return;
    }

    // 验证通过后，保存当前步骤的数据
    try {
      const submitData = buildSubmitData();

      if (!formData.id) {
        // 新增工单
        const result = await ExternalOrderDataService.createOrder(submitData);
        if (result && result.data) {
          formData.id = result.data.id;
        }
      } else {
        // 更新工单
        await ExternalOrderDataService.updateOrder(formData.id, submitData);
      }

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
    nameIndex: 0,
    nameText: "",
    quantity: "",
    oldPartCode: "",
    newPartCode: "",
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
    categoryIndex: 0,
    categoryText: "",
    amount: "",
  });
};

const removeCost = (index) => {
  if (costs.value.length > 1) {
    costs.value.splice(index, 1);
  }
};

const addLabor = () => {
  labors.value.push({
    repairSelection: [],
    repairSelectionIndex: 0,
    repairSelectionText: "",
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
  const step2Errors = validateStep2();
  if (step2Errors.length > 0) {
    uni.showToast({
      title: step2Errors[0],
      icon: "none",
      duration: 2000,
    });
    return;
  }

  const validation = ExternalOrderDataService.validateFormData(
    formData,
    repairData
  );
  if (!validation.isValid) {
    ExternalOrderDataService.showErrorToast(validation.errors[0]);
    return;
  }

  loading.value = true;
  try {
    const submitData = buildSubmitData();
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
    loading.value = false;
  }
};

const handleCancel = () => {
  uni.navigateBack();
};

onLoad((options) => {
  dictionaryOptions.value =
    ExternalOrderDataService.parseNavigationParams(options);
  initOptionsArrays();
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
@import "./add.scss";
</style>
