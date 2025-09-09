import { ExternalOrderService, DictionaryService } from "@/api/orderApi.js";
import { DictionaryUtils } from "@/utils/dictionaryUtils.js";

export class ExternalOrderDataService {
  static async getOrderList(params) {
    try {
      const response = await ExternalOrderService.getOrderList(params);
      return {
        success: true,
        data: response?.records || [],
        total: response?.total || 0,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        total: 0,
        error: error.message || "获取数据失败",
      };
    }
  }

  static async createOrder(data) {
    try {
      const response = await ExternalOrderService.createOrder(data);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || "创建失败",
      };
    }
  }

  static async getOrderDetail(id) {
    try {
      const response = await ExternalOrderService.getOrderById(id);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || "获取数据失败",
      };
    }
  }

  static async updateOrder(id, data) {
    try {
      const response = await ExternalOrderService.updateOrder(id, data);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || "更新失败",
      };
    }
  }

  static async deleteOrder(id) {
    try {
      await ExternalOrderService.deleteOrder(id);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "删除失败",
      };
    }
  }

  static async loadDictionaryData() {
    const dictionaryCodes = {
      carModel: "order_car_model",
      projectType: "order_project_type",
      projectPhase: "order_project_phase",
      faultClassification: "order_fault_classification",
      faultLocation: "order_fault_location",
      partCategory: "order_part_category",
      spareLocation: "order_spare_location",
      partNumber: "order_part_number",
      feeType: "order_fee_type",
      repairItems: "order_repair_items",
    };

    const dictionaryOptions = {};

    const loadPromises = Object.entries(dictionaryCodes).map(
      async ([key, code]) => {
        try {
          const response = await DictionaryService.getDictionaryByCode(code);
          dictionaryOptions[key] = response?.enums || [];
        } catch (error) {
          dictionaryOptions[key] = [];
        }
      }
    );

    await Promise.all(loadPromises);
    return dictionaryOptions;
  }

  static buildNavigationParams(dictionaryOptions, additionalParams = {}) {
    // 将字典数据存储到本地存储中，避免URL过长
    const storageKey = "external_order_dictionary_data";
    uni.setStorageSync(storageKey, dictionaryOptions);

    // 只传递必要的参数
    const params = {
      _dictData: "true", // 标记表示字典数据已存储
      ...additionalParams,
    };

    return params;
  }

  static parseNavigationParams(options) {
    // 检查是否有存储的字典数据
    if (options._dictData === "true") {
      const storageKey = "external_order_dictionary_data";
      const dictionaryOptions = uni.getStorageSync(storageKey) || {};

      // 移除标记参数
      const { _dictData, ...otherParams } = options;
      return { ...dictionaryOptions, ...otherParams };
    }

    // 如果没有存储数据，使用传统方式解析
    return DictionaryUtils.parseQueryParams(options);
  }

  static validateFormData(formData, repairData) {
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

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static showSuccessToast(message) {
    uni.showToast({
      title: message,
      icon: "success",
    });
  }

  static showErrorToast(message) {
    uni.showToast({
      title: message,
      icon: "error",
    });
  }

  static async showConfirmDialog(title, content) {
    return new Promise((resolve) => {
      uni.showModal({
        title: title,
        content: content,
        success: (res) => {
          resolve(res.confirm);
        },
      });
    });
  }
}
