<template>
  <div>
    <div class="picture">
      <van-uploader v-if="inputName" :after-read="afterRead" class="uploadingMessage">
        <div class="tacitly">
          <img class="imgs" src="../../imgs/photo.png" alt="" />
        </div>
      </van-uploader>
      <div v-if="inputName" class="explainText">
        <span>{{ stringImg }}</span>
      </div>

      <div v-if="!inputName" @click="popup">
        <div class="uploading">
          <img :src="imgRear" class="main_img" alt="" />
        </div>
        <div class="explainText">{{ stringImg }}</div>
      </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import { Uploader, ActionSheet, Button, Toast } from "vant";
import request from "@/utils/request";
export default {
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    portImg: {
      type: String,
      required: true,
    }, //传进来的接口
    stringImg: {
      type: String,
      required: true,
    }, //传进来的图片说明
  },
  data() {
    return {
      show: false, //切换弹出框
      imgshow: false, //切换全屏展示图片
      inputName: true, //切换上传和图片
      actions: [{ name: "删除" }, { name: "全屏显示" }], //弹出框
      images: [], //全屏展示
      imgRear: "", //上传之后的图片
    };
  },
  mounted() {},
  methods: {
    //全屏展示的函数
    preview() {
      this.images[0] = this.imgRear;
      this.$imagePreview({
        images: this.images,
      });
    },
    afterRead(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      this.inputName = false;
      request({
        url: this.portImg,
        method: "post",
        data: formData,
      }).then((res) => {
        this.imgRear = res.url;
        this.$emit("echoLink", res.url, this.index);
        this.inputName = false;
      });
      return;
      // if (e) {
      //   axios请求
      //   request({
      //     url: this.portImg,
      //     methods: "post",
      //     data: e.content,
      //   }).then((res) => {
      //     this.imgRear = res.data;
      //     this.$emit("echoLink", res);
      //     this.inputName = false;
      //   });
      // }
    },
    //弹出框
    onSelect(item) {
      console.log(item);
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      //   Toast(item.name);
      if (item.name == "删除") {
        this.inputName = true;
        this.imgRear = "";
        this.$emit("deleteImg", "删除");
      }
      if (item.name == "全屏显示") {
        this.imgshow = true;
        this.preview();
      }
    },
    //点击图片显示弹出框
    popup() {
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.picture {
  width: 100%;
  height: 90px;
  margin-bottom: 10px;
  background: #f5f5f9;
  //   text-align: center;
  //   display: flex;
  //   align-items: center;
}

.tacitly {
  width: 100%;
  height: 100%;
}

.imgs {
  width: 50px;
  height: 40px;
}

.uploading {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
}

.main_img {
  width: 100%;
  height: 100%;
}

.explainText {
  z-index: 40;
  width: 100%;
  padding: 3px 0;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 5px 5px;
}

.uploadingMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;

  .explainText {
    z-index: 40;
    width: 100%;
    padding: 3px 0;
    font-size: 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0 0 5px 5px;
  }
}
</style>
