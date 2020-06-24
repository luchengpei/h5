import moment from "moment";
class Filter {
  constructor(Vue) {
    if (Vue.name !== "Vue") {
      //return;
    }
    this.Vue = Vue;
    this.init();
  }
  init() {
    if (!this.Vue) return;
    // 时间格式过滤器
    this.Vue.filter("dateFmt", (input, formatStr, emptyR) => {
      if (!input) return emptyR || "";
      return moment(input).format(formatStr);
    });
    //
  }
}
export default Filter;
