import Vue from "vue";
import Vuelidate from "vuelidate";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import App from "./App";
import router from "./router";
import store from "./store";
import utils from "./utils/utils";
import utilsIndex from "./utils/index";
// import Vue from 'vue';
import "vant/lib/index.css";

import filter from "./utils/filter";
import VueScroller from "vue-scroller";
// import BScroll from "better-scroll";
import "./rem";
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)

import VueImageSwipe from "vue-image-swipe";
import "vue-image-swipe/dist/vue-image-swipe.css";
Vue.use(VueImageSwipe);

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/asset/style/common.css";
import VueClipboard from "vue-clipboard2";
import { Dialog } from "vant";
Vue.use(Dialog); //全局可用
Vue.use(Vuelidate);
Vue.use(VueScroller);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(require("vue-wechat-title"));
new filter(Vue);
Vue.prototype.utils = utils;
//合并到组件methods中，组件中存在同名方法，取组件对象的同名方法
Vue.mixin({
  methods: { ...utilsIndex },
});
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
