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

  static changePassword(currentPassword, newPassword) {
    return api.put("/users/me/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
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
}
