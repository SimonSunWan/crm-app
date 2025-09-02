import { userStore } from "@/store/userStore.js";
import { UserService } from "@/api/userApi.js";
import { HttpError } from "@/utils/api.js";

export class UserInfoManager {
  static async refreshUserInfo() {
    try {
      const data = await UserService.getUserInfo();
      if (data) {
        userStore.setUserInfo(data);
        return data;
      }
    } catch (error) {
      if (error instanceof HttpError) {
        uni.showToast({
          title: error.message || "获取用户信息失败",
          icon: "none",
        });
      } else {
        uni.showToast({
          title: "获取用户信息失败",
          icon: "none",
        });
      }
      throw error;
    }
  }

  static async updateUserInfo(userData) {
    try {
      await UserService.updateCurrentUser(userData);
      await this.refreshUserInfo();
      return true;
    } catch (error) {
      if (error instanceof HttpError) {
        uni.showToast({
          title: error.message || "更新用户信息失败",
          icon: "none",
        });
      }
      throw error;
    }
  }

  static async changePassword(currentPassword, newPassword) {
    try {
      await UserService.changePassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      if (error instanceof HttpError) {
        uni.showToast({
          title: error.message || "修改密码失败",
          icon: "none",
        });
      }
      throw error;
    }
  }
}
