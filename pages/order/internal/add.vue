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

    <view v-show="currentStep === 0" class="form-step">
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
          <view class="form-item"> </view>
        </view>
      </view>

      <view class="form-section">
        <view class="section-title">产品信息</view>
        <view class="form-row">
          <view class="form-item">
            <text class="label">项目类型</text>
            <uni-data-select
              v-model="formData.projectType"
              :localdata="projectTypeData"
              placeholder="请选择项目类型"
              @change="onProjectTypeChange"
            />
          </view>
          <view class="form-item">
            <text class="label">项目阶段</text>
            <uni-data-select
              v-model="formData.projectStage"
              :localdata="projectStageData"
              placeholder="请选择项目阶段"
              @change="onProjectStageChange"
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
          <view class="form-item"> </view>
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

    <view v-show="currentStep === 1" class="form-step">
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
            <text class="label">故障分类</text>
            <uni-data-select
              v-model="repairData.faultClassification"
              :localdata="faultClassificationData"
              placeholder="请选择故障分类"
              @change="onFaultClassificationChange"
            />
          </view>
        </view>
        <view class="form-row">
          <view class="form-item">
            <text class="label">故障位置</text>
            <uni-data-select
              v-model="repairData.faultLocation"
              :localdata="faultLocationData"
              placeholder="请选择故障位置"
              @change="onFaultLocationChange"
            />
          </view>
          <view class="form-item">
            <text class="label">零件类别/定位</text>
            <uni-data-picker
              v-model="repairData.partSelection"
              :localdata="partCategoryData"
              placeholder="请选择零件类别/定位"
              @change="onPartSelectionChange"
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

    <view v-show="currentStep === 2" class="form-step">
      <view class="detail-section">
        <view class="section-header">
          <text class="section-title">备件使用详情</text>
        </view>

        <view class="bei-row">
          <text class="label">备件所属库位</text>
          <uni-data-select
            v-model="repairData.sparePartLocation"
            :localdata="spareLocationData"
            placeholder="请选择备件所属库位"
            @change="onSparePartLocationChange"
          />
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
                  <text class="label">备件料号</text>
                  <uni-easyinput
                    v-model="item.partNumber"
                    placeholder="备件料号"
                    disabled
                  />
                </view>
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
                  <text class="label">备件名称</text>
                  <uni-data-select
                    v-model="item.name"
                    :localdata="partNumberData"
                    placeholder="备件名称"
                    @change="(e) => onPartNameChange(e, index)"
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
                  <text class="label">系数</text>
                  <uni-easyinput
                    v-model="item.coefficient"
                    placeholder="系数"
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
import { ref, reactive, computed, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { InternalOrderDataService } from "@/services/internalOrderDataService.js";
import { DictionaryUtils } from "@/utils/dictionaryUtils.js";

const currentStep = ref(0);
const loading = ref(false);

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
  repairItems: [],
});

const formData = reactive({
  carSelection: [], // 级联选择器：整车厂/车型
  customer: "", // 整车厂
  vehicleModel: "", // 车型
  repairShop: "",
  reporterName: "",
  contactInfo: "",
  reportDate: "",
  projectType: "",
  projectStage: "",
  licensePlate: "",
  vinNumber: "",
  mileage: "",
  vehicleLocation: "",
  vehicleDate: "",
  packCode: "",
  packDate: "",
  underWarranty: null,
  faultDescription: "",
});

const repairData = reactive({
  repairPerson: "",
  repairDate: "",
  avicResponsibility: null,
  faultClassification: "",
  faultLocation: "",
  partCategory: "", // 零件类别
  partLocation: "", // 零件定位
  sparePartLocation: "",
  partSelection: [], // 级联选择器：零件类别/定位
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
const projectTypeData = ref([]);
const projectStageData = ref([]);
const faultClassificationData = ref([]);
const faultLocationData = ref([]);
const partCategoryData = ref([]);
const spareLocationData = ref([]);
const partNumberData = ref([]);
const feeTypeData = ref([]);
const repairItemsData = ref([]);

const initOptionsArrays = () => {
  carModelData.value = DictionaryUtils.convertToUniDataPickerFormat(
    dictionaryOptions.value.carModel || []
  );
  partCategoryData.value = DictionaryUtils.convertToUniDataPickerFormat(
    dictionaryOptions.value.partCategory || []
  );

  projectTypeData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.projectType || []
  );
  projectStageData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.projectPhase || []
  );
  faultClassificationData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.faultClassification || []
  );
  faultLocationData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.faultLocation || []
  );
  spareLocationData.value = DictionaryUtils.convertToUniDataSelectFormat(
    dictionaryOptions.value.spareLocation || []
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

const onProjectTypeChange = (e) => {};

const onProjectStageChange = (e) => {};

const onFaultClassificationChange = (e) => {};

const onFaultLocationChange = (e) => {};

const onPartSelectionChange = (e) => {
  if (e && e.detail && e.detail.value && Array.isArray(e.detail.value)) {
    repairData.partCategory = e.detail.value[0]?.value || "";
    repairData.partLocation = e.detail.value[1]?.value || "";
  }
};

const onSparePartLocationChange = (e) => {};

const onPartNameChange = (e, index) => {
  const selectedValue = e;
  if (selectedValue && spareParts.value[index]) {
    spareParts.value[index].partNumber = selectedValue;
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
  if (!formData.projectType || formData.projectType.trim() === "") {
    errors.push("请选择项目类型");
  }
  if (!formData.projectStage || formData.projectStage.trim() === "") {
    errors.push("请选择项目阶段");
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
  if (
    !repairData.faultClassification ||
    repairData.faultClassification.trim() === ""
  ) {
    errors.push("请选择故障分类");
  }
  if (!repairData.faultLocation || repairData.faultLocation.trim() === "") {
    errors.push("请选择故障位置");
  }
  if (!repairData.partSelection || repairData.partSelection.length === 0) {
    errors.push("请选择零件类别/定位");
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

  if (
    !repairData.sparePartLocation ||
    repairData.sparePartLocation.trim() === ""
  ) {
    errors.push("请选择备件所属库位");
  }

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
      errors.push(`工时信息${i + 1}：请输入系数`);
    }
  }

  return errors;
};

const nextStep = () => {
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

    currentStep.value++;
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

  const validation = InternalOrderDataService.validateFormData(
    formData,
    repairData
  );
  if (!validation.isValid) {
    InternalOrderDataService.showErrorToast(validation.errors[0]);
    return;
  }

  loading.value = true;
  try {
    const submitData = {
      customer: formData.customer,
      vehicleModel: formData.vehicleModel,
      repairShop: formData.repairShop,
      reporterName: formData.reporterName,
      contactInfo: formData.contactInfo,
      reportDate: formData.reportDate,
      projectType: formData.projectType,
      projectStage: formData.projectStage,
      licensePlate: formData.licensePlate,
      vinNumber: formData.vinNumber,
      mileage: formData.mileage,
      vehicleLocation: formData.vehicleLocation,
      vehicleDate: formData.vehicleDate,
      packCode: formData.packCode,
      packDate: formData.packDate,
      underWarranty: formData.underWarranty ?? false,
      faultDescription: formData.faultDescription,
      repairPerson: repairData.repairPerson,
      repairDate: repairData.repairDate,
      avicResponsibility: repairData.avicResponsibility ?? false,
      faultClassification: repairData.faultClassification,
      faultLocation: repairData.faultLocation,
      partCategory: repairData.partCategory,
      partLocation: repairData.partLocation,
      sparePartLocation: repairData.sparePartLocation,
      repairDescription: repairData.repairDescription,
      spareParts: spareParts.value,
      costs: costs.value,
      labors: labors.value,
    };

    const result = await InternalOrderDataService.createOrder(submitData);

    if (result.success) {
      InternalOrderDataService.showSuccessToast("保存成功");
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    } else {
      InternalOrderDataService.showErrorToast(result.error || "保存失败");
    }
  } catch (error) {
    InternalOrderDataService.showErrorToast("保存失败");
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  uni.navigateBack();
};

onLoad((options) => {
  dictionaryOptions.value =
    InternalOrderDataService.parseNavigationParams(options);
  initOptionsArrays();
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
@import "./add.scss";
</style>
