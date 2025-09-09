import { api } from "@/utils/api.js";

export class InternalOrderService {
  static getOrderList(params) {
    return api.get("/orders/internal/", { params });
  }

  static createOrder(data) {
    return api.post("/orders/internal/", data);
  }

  static getOrderById(id) {
    return api.get(`/orders/internal/${id}`);
  }

  static updateOrder(id, data) {
    return api.put(`/orders/internal/${id}`, data);
  }

  static deleteOrder(id) {
    return api.delete(`/orders/internal/${id}`);
  }
}

export class DictionaryService {
  static getDictionaryByCode(code) {
    return api.get(`/dictionary/public/by-code/${code}`);
  }
}
