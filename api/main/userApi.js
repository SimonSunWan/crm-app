import { api } from "@/utils/api.js";

export class UserService {
  static login(params) {
    return api.post("/auth/login", params);
  }

  static getUserInfo() {
    return api.get("/users/me");
  }

  static updateCurrentUser(data) {
    return api.put("/users/me", data);
  }

  static changePassword(data) {
    return api.put("/users/me/change-password", data);
  }

  static register(data) {
    return api.post("/users/register", data);
  }

  static forgetPassword(data) {
    return api.post("/users/forget-password", data);
  }

  static uploadAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post("/users/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static getNavigationMenus() {
    return api.get("/menus/navigation");
  }
}
