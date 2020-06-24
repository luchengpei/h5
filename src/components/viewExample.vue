<template>
  <div>
    <van-dialog :title="title" v-model="show" :show-confirm-button="false">
      <div ref="wrap" class="img-box">
        <img :src="img" :style="{ height: height + 'px' }" />
      </div>
      <div class="close" @click="close">关闭</div>
    </van-dialog>
  </div>
</template>

<script>
/**
 * 使用方法
 *  <viewExample v-model="isShow" title="查看示例" :height="500" img="https://img.yzcdn.cn/vant/apple-3.jpg"/>
 */
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.name]: Dialog,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    height: {
      //图片高度
      type: Number,
      default: 1900,
    },
    img: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    }, //标题
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    value(val) {
      this.show = val;
      if (!val) this.$refs.wrap.scrollTop = 0;
    },
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("input", this.show);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-box {
  max-height: 500px;
  overflow-y: scroll;
}

img {
  width: 100%;
}

/deep/ .van-dialog {
  border-radius: 9px;
}

.close {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  color: black;
  text-align: center;
  // background: #999;
  // border-radius: 50%;
}
</style>
