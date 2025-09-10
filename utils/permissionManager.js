import { userStore } from "@/store/userStore.js";

export class PermissionManager {
  // 检查特定页面的权限
  static hasPagePermission(pagePath, authMark) {
    const menuPermissions = userStore.menuPermissions;
    if (!menuPermissions?.length) return false;
    
    const findMenuByPath = (menus, targetPath) => {
      for (const menu of menus) {
        if (menu.path === targetPath) return menu;
        if (menu.children?.length) {
          const found = findMenuByPath(menu.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };
    
    const menu = findMenuByPath(menuPermissions, pagePath);
    return menu?.meta?.authList?.some(auth => auth.authMark === authMark) || false;
  }
}
