// 工单分包工具类
export const OrderUtils = {
  // 格式化工单状态
  formatOrderStatus(status) {
    const statusMap = {
      pending: "待处理",
      processing: "处理中",
      completed: "已完成",
      cancelled: "已取消",
    };
    return statusMap[status] || status;
  },

  // 格式化工单类型
  formatOrderType(type) {
    const typeMap = {
      internal: "保内工单",
      external: "保外工单",
    };
    return typeMap[type] || type;
  },

  // 验证工单数据
  validateOrderData(data) {
    const errors = [];

    if (!data.title) {
      errors.push("工单标题不能为空");
    }

    if (!data.description) {
      errors.push("工单描述不能为空");
    }

    if (!data.priority) {
      errors.push("请选择优先级");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // 生成工单编号
  generateOrderNumber(type = "internal") {
    const prefix = type === "internal" ? "IN" : "EX";
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  },
};
