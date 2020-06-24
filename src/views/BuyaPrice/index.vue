<template>
  <div class="page">
    <div class="tip">
      根据您提供的资料，平台将在1个工作日内完成审核并上传至“个人车源”频道，请确保资料真实、准确、完整，且处于待售状态，如已通过其它形式卖出，请及时联系客服下架，避免产生纠纷！
    </div>
    <div class="tab">
      <div class="image-box">
        <div class="outside">
          <titleTip title="外观照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
          <div class="img">
            <uploadImg v-for="(item, index) in outsizeImg" :string-img="item.title" :key="index" class="img-item"></uploadImg>
          </div>
        </div>
      </div>
      <!-- 内饰照片 -->
      <div class="image-box">
        <div class="outside">
          <titleTip title="内饰照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
          <div class="img">
            <uploadImg v-for="(item, index) in interior" :string-img="item.title" :key="index" class="img-item"></uploadImg>
          </div>
        </div>
      </div>

      <!-- 卖点照片 -->
      <div class="image-box">
        <div class="outside">
          <titleTip title="卖点照片" img="https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/kudai/loandemo.jpg" />
          <div class="img">
            <uploadImg v-for="(item, index) in sellImg" :string-img="item.title" :key="index" class="img-item"></uploadImg>
          </div>
        </div>
      </div>
    </div>
    <carModel :show-car-model="isShowCarModel" @sendCarModel="getCarModel" @tellParentChangeModel="getChildChangeModel"></carModel>
    <div class="btn">
      <van-button>提交</van-button>
    </div>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import carModel from "@/components/carModel";
import viewExample from "@/components/viewExample";
import titleTip from "../uploadCart/components/titleTIp";
import uploadImg from "@/components/uploadingImg";
import { Tab, Tabs, CellGroup, Row, Col, Cell, Area, Popup, Field, Button, DatetimePicker } from "vant";
export default {
  components: {
    carModel,
    titleTip,
    viewExample,
    uploadImg,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Area.name]: Area,
    [Row.name]: Row,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      isShow: false,
      form: {
        model: null,
        city: null,
        year: null,
        month: null,
        mileage: null,
        price: null,
        img: null,
        emission_standard: null,
        showName: null,
        cityName: null,
        dw: null,
        moblie: null,
      },
      areaList: {},
      showDatePicker: false,
      active: 0,
      currentDate: new Date(),
      minDate: new Date(1999, 12, 31),
      maxDate: new Date(),
      showArea: false,
      isShowCarModel: false,
      carModelValue: "请选择车型",
      areaValue: "请选择城市",
      dateValue: "请选择首次上牌日期",
      outsizeImg: [
        {
          title: "车头",
        },
        {
          title: "车尾",
        },
        {
          title: "车辆左侧",
        },
        {
          title: "车辆左侧",
        },
      ],
      interior: [
        {
          title: "*前排座椅",
        },
        {
          title: "*中控台",
        },
        {
          title: "*后排座椅",
        },
      ],
      sellImg: [
        {
          title: "*卖点照片1",
        },
        {
          title: "*卖点照片2",
        },
      ],
    };
  },
  mounted() {
    this.areaList = areaList;
    this.form = {
      model: null,
      city: "110100",
      year: null,
      month: null,
      mileage: null,
      price: null,
      img: null,
      emission_standard: null,
      showName: null,
      cityName: null,
    };
  },
  methods: {
    open() {
      this.isShow = true;
    },
    onAreaConfirm(e) {
      if (e.length == 2) {
        this.areaValue = e[1].name;
        this.form.cityName = e[1].name;
        this.form.city = e[1].code;
      }
      this.showArea = false;
    },
    datePickerFormatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    onDatePickerConfirm(e) {
      this.form.year = e.getFullYear();
      this.form.month = e.getMonth() + 1;
      this.dateValue = this.form.year + "-" + this.form.month;
      this.showDatePicker = false;
    },
    getCarModel(e) {
      //获取车型
      this.isShowCarModel = false;
      this.carModelValue = e.series_name + " " + e.car_name;
      this.form.showName = e.series_name + " " + e.car_name;
      this.form.model = e.id;
      this.form.price = e.price;
      this.form.emission_standard = e.emission_standard;
      this.form.img = e.series_img;
    },
    getChildChangeModel() {
      this.isShowCarModel = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: rgb(242, 242, 242);

  .tip {
    box-sizing: border-box;
    height: 80px;
    padding: 20px 10px 0 10px;
    font-size: 12px;
    color: rgb(245, 154, 35);
    background: white;
  }

  .tab {
    // height: 100vh;
    flex: 1;
    margin-top: 10px;
    background: white;
  }
  //   /deep/ .van-tabs__line {
  //     width: 200px !important;
  //     background-color: rgb(121, 121, 121);
  //   }
  //   /deep/ .van-tab__text--ellipsis {
  //     color: #000;
  //   }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;

    /deep/ .van-button--normal {
      width: 100%;
      color: white;
      background: rgb(22, 155, 213);
    }
  }
}

.image-box {
  box-sizing: border-box;
  padding: 0 10px;

  .img {
    display: flex;
    flex-wrap: wrap;

    .img-item {
      width: 30%;
      height: 100px;
      margin-right: 10px;
    }
  }
}
</style>
