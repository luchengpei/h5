<template>
  <div>
    <div class="warp">
      <h5>*{{ title }}</h5>
      <div class="tip" @click="checkView">查看示例图</div>
    </div>
    <viewExample v-model="isShow" :img="img" :height="474" title="查看示例" />
  </div>
</template>

<script>
import viewExample from "@/components/viewExample";
export default {
  components: {
    viewExample,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    checkView() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.warp {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tip {
    font-size: 12px;
    color: skyblue;
  }
}
</style>
