import Vue from "vue";
import Vuex from "vuex";
import errorLog from "./modules/errorLog";
import permission from "./modules/permission";
import tagsView from "./modules/tagsView";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    errorLog,
    permission,
    tagsView,
  },
  getters,
});

export default store;
