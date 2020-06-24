const getters = {
  token: (state) => state.user.token,
  permissions: (state) => state.user.permissions,
  userInfo: (state) => state.user.userInfo,
  func_permissions: (state) => state.user.funcPermissions,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  errorLogs: (state) => state.errorLog.logs,
};
export default getters;
