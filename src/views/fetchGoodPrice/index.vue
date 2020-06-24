<template>
  <div class="page">
    <div class="tip">
      根据您提供的资料，平台将在1个工作日内完成审核并上传至“个人车源”频道，请确保资料真实、准确、完整，且处于待售状态，如已通过其它形式卖出，请及时联系客服下架，避免产生纠纷！
    </div>

    <!-- 外观照片 -->
    <div class="image-box">
      <div class="outside">
        <titleTip title="外观照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
        <div class="img">
          <uploadImg
            v-for="(item, index) in exteriorImages"
            :string-img="item.title"
            :key="index"
            :index="index"
            :port-img="'/java2/cardealer/jdsale/public'"
            class="img-item"
            @deleteImg="outSizeDelete(index)"
            @echoLink="getOutsizeImg"
          ></uploadImg>
        </div>
      </div>
    </div>
    <!-- 内饰照片 -->
    <div class="image-box">
      <div class="outside">
        <titleTip title="内饰照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
        <div class="img">
          <uploadImg
            v-for="(item, index) in interiorImages"
            :string-img="item.title"
            :key="index"
            :index="index"
            :port-img="'/java2/cardealer/jdsale/public'"
            class="img-item"
            @deleteImg="interiorDelete(index)"
            @echoLink="getInteriorImg"
          ></uploadImg>
        </div>
      </div>
    </div>

    <!-- 卖点照片 -->
    <div class="image-box">
      <div class="outside">
        <titleTip title="卖点照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
        <div class="img">
          <uploadImg
            v-for="(item, index) in sellingImages"
            :string-img="item.title"
            :key="index"
            :index="index"
            :list="sellingImages"
            :port-img="'/java2/cardealer/jdsale/public'"
            class="img-item"
            @echoLink="getSellImg"
            @deleteImg="sellDelete(index)"
          ></uploadImg>
        </div>
      </div>
    </div>
    <div class="btn">
      <van-button v-if="!isShow" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import viewExample from "@/components/viewExample";
import titleTip from "./components/titleTIp";
import uploadImg from "@/components/uploadingImg";
import { Button, Toast, Dialog } from "vant";
import { registration } from "@/api/api";
export default {
  components: {
    titleTip,
    viewExample,
    uploadImg,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      isShow: false,
      areaList: {},
      showDatePicker: false,
      exteriorImages: [
        {
          title: "车头",
          img: "",
          key: "vechielHead",
        },
        {
          title: "车尾",
          img: "",
          key: "vehicleTail",
        },
        {
          title: "车辆右侧",
          img: "",
          key: "right",
        },
        {
          title: "车辆左侧",
          img: "",
          key: "left",
        },
      ],
      interiorImages: [
        {
          title: "*前排座椅",
          img: "",
          key: "frontSeats",
        },
        {
          title: "*中控台",
          img: "",
          key: "console",
        },
        {
          title: "*后排座椅",
          img: "",
          key: "backSeats",
        },
      ],
      sellingImages: [
        {
          title: "*卖点照片1",
          img: "",
          key: "sellOne",
        },
        {
          title: "*卖点照片2",
          img: "",
          key: "sellTwo",
        },
      ],
    };
  },
  methods: {
    //外观图片删除
    outSizeDelete(index) {
      this.exteriorImages[index].img = "";
    },
    //内饰图片删除
    interiorDelete(index) {
      this.interiorImages[index].img = "";
    },
    //卖点图片删除
    sellDelete(index) {
      this.sellingImages[index].img = "";
    },
    //外观图片赋值
    getOutsizeImg(img, index) {
      this.exteriorImages[index].img = img;
      console.log(this.exteriorImages, "out");
    },
    //内饰图片赋值
    getInteriorImg(img, index) {
      this.interiorImages[index].img = img;
      console.log(this.interiorImages, "inside");
    },
    getSellImg(img, index) {
      this.sellingImages[index].img = img;
      console.log(this.sellingImages, "sell");
    },
    handleImg(list) {
      let obj = {};
      list.forEach((row) => {
        obj[row.key] = row.img;
      });
      return obj;
    },
    //提交
    submit() {
      let exteriorImages = this.handleImg(this.exteriorImages);
      let interiorImages = this.handleImg(this.interiorImages);
      let sellingImages = this.handleImg(this.sellingImages);
      try {
        Object.keys(exteriorImages).forEach((row, index) => {
          if (!exteriorImages[row]) {
            Toast.fail(`${this.exteriorImages[index].title}图片不能为空`);
            throw Error("请完善资料");
          }
        });
      } catch (error) {
        return false;
      }
      // this.handleError(exteriorImages, this.exteriorImages);
      //内饰图片不能为空
      try {
        Object.keys(interiorImages).forEach((row, index) => {
          if (!interiorImages[row]) {
            Toast.fail(`${this.interiorImages[index].title}图片不能为空`);
            throw Error("请完善资料");
          }
        });
      } catch (error) {
        return false;
      }
      //卖点图片不能为空
      try {
        Object.keys(sellingImages).forEach((row, index) => {
          if (!sellingImages[row]) {
            Toast.fail(`${this.sellingImages[index].title}图片不能为空`);
            throw Error("请完善资料");
          }
        });
      } catch (error) {
        return false;
      }
      let imgObj = {
        exteriorImages,
        interiorImages,
        sellingImages,
      };
      let params = { ...imgObj, ...{ id: this.$route.query.id } };
      Dialog.confirm({
        title: "温馨提醒",
        message: "请确认资料是否正确",
      })
        .then(() => {
          registration(params).then((res) => {
            this.isShow = true;
            Toast.success("提交成功");
          });
          console.log("sure");
        })
        .catch(() => {
          console.log("cancel");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: rgb(242, 242, 242);
}

.tip {
  box-sizing: border-box;
  max-height: 140px;
  padding: 20px 10px 10px 10px;
  font-size: 13px;
  line-height: 20px;
  color: rgb(245, 154, 35);
  background: white;
}

.image-box {
  box-sizing: border-box;
  padding: 0 10px;
  background: white;

  .img {
    display: flex;
    flex-wrap: wrap;

    .img-item {
      width: 31.4%;
      margin-right: 10px;
    }

    .img-item:nth-child(3) {
      margin-right: 0;
    }
  }
}

.btn {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100vw;

  /deep/ .van-button--normal {
    width: 100%;
    color: white;
    background: rgb(255, 97, 0);
  }
}
</style>
