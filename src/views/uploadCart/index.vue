<template>
  <div class="page">
    <div class="tip">
      根据您提供的资料，平台将在1个工作日内完成审核并上传至“个人车源”频道，请确保资料真实、准确、完整，且处于待售状态，如已通过其它形式卖出，请及时联系客服下架，避免产生纠纷！
    </div>
    <div class="tab">
      <van-tabs v-model="active">
        <van-tab title="基本信息">
          <van-form>
            <van-cell-group :border="false">
              <van-cell :value="carModelValue" style="text-overflow: ellipsis;" title="*车辆型号" is-link @click="isShowCarModel = true" />
              <van-cell :value="areaValue" title="*所在城市" is-link @click="showArea = true" />
              <van-popup v-model="showArea" position="bottom">
                <van-area :area-list="areaList" :columns-num="2" :value="form.city" title="请选择城市" @cancel="showArea = false" @confirm="onAreaConfirm" />
              </van-popup>
              <van-cell :value="dateValue" title="*首次上牌" is-link @click="showDatePicker = true" />
              <van-popup v-model="showDatePicker" position="bottom">
                <van-datetime-picker
                  v-model="currentDate"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :formatter="datePickerFormatter"
                  type="year-month"
                  @cancel="showDatePicker = false"
                  @confirm="onDatePickerConfirm"
                />
              </van-popup>
              <van-row>
                <van-col style="width: 100%;">
                  <van-field
                    v-model="form.mileage"
                    :rules="[{ required: true, message: '行驶里程必填' }]"
                    label-width="4rem"
                    input-align="right"
                    label="*行驶里程(万公里)"
                    placeholder="请输入"
                  />
                </van-col>
              </van-row>
              <van-row>
                <van-col style="width: 100%;">
                  <van-field
                    v-model="expectPrice"
                    :rules="[{ required: true, message: '价格必填' }]"
                    label-width="4rem"
                    input-align="right"
                    label="*单位/万元"
                    type="number"
                    placeholder="请输入"
                  />
                </van-col>
              </van-row>
              <van-row>
                <van-col style="width: 100%;">
                  <van-field
                    v-model="mobile"
                    :rules="[{ required: true, message: '联系电话必填' }]"
                    label-width="4rem"
                    input-align="right"
                    label="*联系电话"
                    placeholder="请输入"
                    type="tel"
                  />
                </van-col>
              </van-row>
            </van-cell-group>
          </van-form>
        </van-tab>
        <van-tab title="车辆图片">
          <!-- 外观照片 -->
          <div class="image-box">
            <div class="outside">
              <titleTip :img="exteriorImage" title="外观照片" />
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
              <titleTip :img="interiorImage" title="内饰照片" />
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
              <titleTip :img="sellingImage" title="卖点照片" />
              <div class="img">
                <uploadImg
                  v-for="(item, index) in sellingImages"
                  :string-img="item.title"
                  :key="index"
                  :index="index"
                  :port-img="'/java2/cardealer/jdsale/public'"
                  :list="sellingImages"
                  class="img-item"
                  @echoLink="getSellImg"
                  @deleteImg="sellDelete(index)"
                ></uploadImg>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <carModel :show-car-model="isShowCarModel" @sendCarModel="getCarModel" @tellParentChangeModel="getChildChangeModel"></carModel>
    <div class="btn">
      <van-button v-if="!sureShow" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import carModel from "@/components/carModel";
import viewExample from "@/components/viewExample";
import titleTip from "./components/titleTIp";
import uploadImg from "@/components/uploadingImg";
import { registration } from "@/api/api";
import { Tab, Tabs, CellGroup, Row, Col, Cell, Area, Popup, Field, Button, Form, DatetimePicker, Dialog, Toast } from "vant";
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
    [Form.name]: Form,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
  },
  data() {
    return {
      exteriorImage: require("../../imgs/exteriorImage.jpg"),
      interiorImage: require("../../imgs/interiorImage.jpg"),
      sellingImage: require("../../imgs/sellingImage.jpg"),
      isShow: false,
      sureShow: false,
      form: {
        model: null,
        city: "110100",
        year: null,
        month: null,
        mileage: null,
        img: null,
        emission_standard: null,
        showName: null,
        cityName: null,
        provice: null,
        proviceName: null,
      },
      mobile: null,
      expectPrice: null,
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
  mounted() {
    this.areaList = areaList;
    this.form = {
      model: null,
      city: "110100",
      year: null,
      month: null,
      mileage: null,
      img: null,
      emission_standard: null,
      showName: null,
      cityName: null,
      provice: null,
      proviceName: null,
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
    //处理图片
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
      if (this.form.mileage > 999) {
        Toast("行驶里程单位为万公里，请检查里程");
        return;
      }
      if (!this.mobile) {
        Toast("请完善基本信息");
        this.active = 0;
        return false;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)) {
        this.active = 0;
        Toast("请输入正确的手机号码");
        return;
      }
      if (!this.expectPrice) {
        this.active = 0;
        Toast("请完善基本信息");
        return;
      }
      try {
        Object.values(this.form).forEach((row) => {
          if (!row) {
            this.active = 0;
            Toast.fail("请完善基本信息");
            throw Error("请完善基本信息");
          }
        });
      } catch (error) {
        return false;
      }
      console.log(464444);
      try {
        Object.keys(exteriorImages).forEach((row, index) => {
          if (!exteriorImages[row]) {
            Toast.fail(`${this.exteriorImages[index].title}图片不能为空`);
            this.active = 1;
            throw Error("请完善资料");
          }
        });
      } catch (error) {
        return false;
      }
      //内饰图片不能为空
      try {
        Object.keys(interiorImages).forEach((row, index) => {
          if (!interiorImages[row]) {
            Toast.fail(`${this.interiorImages[index].title}图片不能为空`);
            this.active = 1;
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
            this.active = 1;
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
      let carInfo = { ...this.form };
      let params = { ...{ carInfo }, ...imgObj };
      params.type = 1;
      params.expectPrice = this.expectPrice;
      params.mobile = this.mobile;
      console.log("submit", this.params);
      Dialog.confirm({
        title: "温馨提醒",
        message: "请确认资料是否正确",
      })
        .then(() => {
          registration(params).then((res) => {
            Toast.success("提交成功");
            this.sureShow = true;
          });
          console.log("sure");
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    onAreaConfirm(e) {
      if (e.length == 2) {
        this.areaValue = e[1].name;
        this.form.cityName = e[1].name;
        this.form.city = e[1].code;
        this.form.provice = e[0].code;
        this.form.proviceName = e[0].name;
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
    max-height: 140px;
    padding: 20px 10px 20px 10px;
    font-size: 13px;
    line-height: 20px;
    color: rgb(245, 154, 35);
    background: white;
  }

  .tab {
    // height: 100vh;
    flex: 1;
    margin-top: 10px;
    background: white;
  }

  /deep/ .van-tabs__line {
    width: 200px !important;
    height: 2px;
    background: rgb(255, 97, 0) !important;
  }

  /deep/ .van-tab__text--ellipsis {
    color: #000;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;

    /deep/ .van-button--normal {
      width: 100%;
      color: white;
      background: rgb(255, 97, 0);
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
      width: 31.4%;
      margin-right: 10px;
    }

    .img-item:nth-child(3) {
      margin-right: 0;
    }
  }
}
</style>
