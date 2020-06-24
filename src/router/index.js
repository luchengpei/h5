import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
// import Layout from "../views/layout/Layout";

export const constantRouterMap = [
  {
    path: "",
    redirect: "/evaluation",
  },
  {
    path: "/evaluation",
    name: "车辆估值",
    component: (resolve) => require(["@/views/evaluation/index"], resolve),
    meta: {
      title: "车辆估值",
      // permissions: ["workbench"]
    },
  },
  {
    path: "/report",
    name: "估值详情",
    component: (resolve) => require(["@/views/report/index"], resolve),
    meta: {
      title: "估值详情",
      // permissions: ["workbench"]
    },
  },
  {
    path: "/stages",
    name: "车辆分期",
    component: (resolve) => require(["@/views/stages/index"], resolve),
    meta: {
      title: "车辆分期",
      // permissions: ["workbench"]
    },
  },

  {
    path: "/entry",
    name: "身份证件上传",
    component: (resolve) => require(["@/views/entry/index"], resolve),
    meta: {
      title: "身份证件上传",
    },
  },
  {
    path: "/uploadCart",
    name: "车辆上传",
    component: (resolve) => require(["@/views/uploadCart/index"], resolve),
    meta: {
      title: "车辆上传",
    },
  },
  {
    path: "/BuyaPrice",
    name: "买个好价钱",
    component: (resolve) => require(["@/views/BuyaPrice/index"], resolve),
    meta: {
      title: "买个好价钱",
    },
  },
  {
    path: "/fetchGoodPrice",
    name: "卖个好价",
    component: (resolve) => require(["@/views/fetchGoodPrice/index"], resolve),
    meta: {
      title: "卖个好价",
    },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

/**
 * 需要判断权限的路由
 */
export const asyncRouterMap = [];

export default new Router({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});
