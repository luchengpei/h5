import router from "./router";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

// permission judge function
// function hasPermission(permissions, permissionRoles) {
//   if (!permissionRoles) return true;
//   return permissions.some(
//     permission => permissionRoles.indexOf(permission) >= 0
//   );
// }

const whiteList = ["/evaluation", "/report"]; // no redirect whitelist 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // start progress bar
  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
