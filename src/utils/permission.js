import store from "@/store";

/**
 * 功能权限检验
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  // return true;
  if (value && value instanceof Array && value.length > 0) {
    //const permissions = store.getters && store.getters.permissions;
    const permissions = store.getters && store.getters.func_permissions;
    const permissionRoles = value;
    const hasPermission = permissions.some((permission) => {
      return permissionRoles.includes(permission);
    });
    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    console.error(`need permissions! Like v-permission="['admin','editor']"`);
    return false;
  }
}
