<template>
  <div class="container">
    <van-popup v-model="showCarModel" :overlay="true" position="bottom" @close="onClose">
      <div class="car_wrapper">
        <div class="comfire_box">
          <van-row>
            <van-col span="4">
              <div class="titles_list" @click="onClose">取消</div>
            </van-col>
            <van-col span="4" offset="16">
              <div :class="{ has_list: hasList }" class="titles_list" @click="isOk">
                确认
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="comfire_text">
          已选: {{ carModel.licensePlate }} {{ carModel.carSystem }}
          {{ carModel.model }}
        </div>

        <div class="list_box">
          <van-tabs :active="activeNum" @change="changeIndex" @disabled="onClickTabsDisble">
            <van-tab :disabled="pinpai" title="品牌" data-xyp="1">
              <div class="inner_box">
                <div class="box_l">
                  <van-index-bar :sticky="false">
                    <div v-show="licensePlateData.length <= 0" style="margin-top: 10px; text-align: center;">
                      <van-loading type="spinner" size="25px" />
                    </div>
                    <div v-for="(item, index) in licensePlateData" :key="index">
                      <van-index-anchor :index="item.letter" class="ressetvan-index-anchor" />
                      <div v-for="(every, i) in item.list" :key="i" class="item_list" @click="itemCP(every, i)">
                        <img :src="every.logoImg" class="car_img" alt />
                        {{ every.name }}
                      </div>
                    </div>
                  </van-index-bar>
                </div>
              </div>
            </van-tab>
            <van-tab :disabled="chexi" title="车系" data-xyp="2">
              <div class="inner_box">
                <div class="box_l">
                  <div v-show="!hasCX" style="margin-top: 10px; text-align: center;">
                    <van-loading type="spinner" size="25px" />
                  </div>
                  <p v-show="carSystemData.length == 0 && hasCX" style="margin-top: 10px; font-size: 12px; color: #999; text-align: center;">
                    暂无车系,请选择其他品牌
                  </p>

                  <div v-for="(item, index) in carSystemData" :key="index" class="item_list" @click="itemCX(item, index)">
                    <img :src="item.logoImg" class="car_img car_img_chexi" @error="errorImg(item)" />
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab :disabled="chexian" title="车型">
              <div class="inner_box">
                <div class="box_l">
                  <div v-show="hasCXH" style="margin-top: 10px; text-align: center;">
                    <van-loading type="spinner" size="25px" />
                  </div>
                  <div v-show="modelData.length <= 0 && !hasCXH" style="margin-top: 10px; font-size: 12px; color: #999; text-align: center;">
                    暂无车型,请选择其他型号
                  </div>
                  <div
                    v-for="(item, index) in modelData"
                    :class="{ is_active: index == nowIndex3 }"
                    :key="index"
                    class="item_list"
                    @click="itemCXL(item, index)"
                  >
                    {{ item.detailModel }}
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { carBrands, carSeries, carModels } from "@/api/api";
import util from "@/utils/utils";
import { Popup, Row, Col, Toast, Tabs, Tab, Loading, IndexBar, IndexAnchor } from "vant";

export default {
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Loading.name]: Loading,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
  },
  props: {
    showCarModel: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cityListId: "",
      hasList: false,
      modelShow: true,
      pinpai: false,
      chexi: true,
      currentChexi: {},
      chexian: true,
      activeNum: 0,
      carModel: {
        licensePlate: "", //车牌
        carSystem: "", //车系
        model: "", //型号
      },
      licensePlateData: [], //车牌
      carSystemData: [], //车系
      modelData: [], //型号
      nowIndex: null,
      nowIndex2: null,
      nowIndex3: null,
      hasCXH: false,
      hasCX: false,
      carInfo: {},
      showRightCity: true,
    };
  },
  watch: {
    activeNum(newVal, oldVal) {
      this.showRightCity = newVal == 0 ? true : false;
    },
  },
  created() {
    this.activeNum = 0;
    this.licensePlateData = [];
    this.carSystemData = [];
    this.modelData = [];
    this.getCarPP();
  },
  methods: {
    errorImg(item) {
      item.logo_img = "https://publickdloanhd1.oss-cn-hangzhou.aliyuncs.com/weixin/no.png";
    },
    changeIndex(e) {
      this.activeNum = e;
    },
    isOk() {
      //提交填写的车辆信息
      if (this.hasList) {
        Toast("暂无该车型,请重新选择!");
        return;
      }
      if (this.carModel.licensePlate.length <= 0 || this.carModel.carSystem.length <= 0 || this.carModel.model.length <= 0) {
        Toast("请选择完整辆型号");
        return;
      }
      this.activeNum = 0;
      this.nowIndex = null;
      this.nowIndex2 = null;
      this.nowIndex3 = null;
      this.chexi = true;
      this.chexian = true;

      this.$emit("sendCarModel", this.carInfo);
    },
    itemCP(item, index) {
      //点击品牌item
      this.showRightCity = false;
      this.hasCX = false;

      // console.log()
      this.nowIndex = index;

      this.carModel.carSystem = "";
      this.carModel.model = "";
      this.chexian = true;
      this.carSystemData = [];
      this.modelData = [];
      this.nowIndex2 = null;
      this.nowIndex3 = null;

      this.carModel.licensePlate = item.name;
      this.chexi = false;
      this.currentChexi = {};
      this.getSeriesCar(item.id);
    },
    itemCX(item, index) {
      //车系item
      this.showRightCity = false;

      this.nowIndex2 = index;
      this.nowIndex3 = null;
      this.modelData = [];
      this.carModel.model = "";

      this.carModel.carSystem = item.name;
      this.chexian = false;

      this.hasCXH = true;
      this.currentChexi = item;
      this.getCarsCar(item.id);
    },
    itemCXL(item, index) {
      //车型item
      this.nowIndex3 = index;
      this.carModel.model = item.detailModel;

      this.carInfo.brand_id = item.brandId; //品牌id
      this.carInfo.brands_name = this.carModel.licensePlate; //品牌名字
      this.carInfo.series_id = item.modelId; //车系id
      this.carInfo.series_name = this.carModel.carSystem; //车系名字
      this.carInfo.car_id = item.id; //车型id
      this.carInfo.car_name = this.carModel.model; //车型名字
      this.carInfo.id = item.id;
      this.carInfo.price = item.priceBn; //指导价
      this.carInfo.emission_standard = item.emissionStandard; //排放标准
      this.carInfo.series_img = this.currentChexi.logoImg;
    },
    onClickTabsDisble(e) {
      //点击禁用的标签时
      if (e == 1) {
        Toast("请先选择品牌");
      } else if (e == 2) {
        Toast("请先选择品牌或车系");
      }
    },
    onClose() {
      this.carInfo = {};
      this.carModel.licensePlate = "";
      this.carModel.carSystem = "";
      this.carModel.carModel = "";
      this.carSystemData = [];
      this.carSystemData = [];
      this.modelData = [];
      this.activeNum = 0;
      this.nowIndex = null;
      this.nowIndex2 = null;
      this.nowIndex3 = null;
      this.showCarModel = false;
      this.chexi = true;
      this.chexian = true;
      this.$emit("tellParentChangeModel", this.showCarModel);
    },
    getCarPP() {
      //品牌
      carBrands({ page: 1, count: 1000 }).then((res) => {
        this.licensePlateData = util.sortLetter(res.items);
      });
    },
    getSeriesCar(id) {
      //车系
      carSeries({ page: 1, count: 1000, brandId: id }).then((res) => {
        this.carSystemData = res.items;
        this.hasCX = true;
        this.activeNum = 1;
      });
    },
    getCarsCar(id) {
      //型号
      carModels({ page: 1, count: 1000, modelId: id }).then((res) => {
        this.modelData = res.items;
        this.hasCXH = false;
        this.hasList = this.modelData.length == 0 ? true : false;
        this.activeNum = 2;
      });
    },
  },
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  max-width: 700px;
  padding: 20px;
  padding-top: constant(safe-area-inset-top);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  background-color: #fff;
}

* {
  box-sizing: border-box;
}

.car_wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.comfire_box {
  /* position: absolute;
    top: 0vh;
    left: 0; */
  width: 100%;
  height: 10vh;

  /* z-index: 999; */
}

.comfire_text {
  /* position: absolute;
    top: 8vh;
    left: 0; */
  width: 100%;
  height: 5vh;
  font-size: 16px;
  line-height: 5vh;
  text-align: center;

  /* z-index: 999; */
  background: #f1f1f1;
}

.titles_list {
  height: 10vh;
  font-size: 15px;
  line-height: 10vh;
  color: #3277bf;
  text-align: center;
}

.list_box {
  /* position: absolute;
    top:13vh;
    left: 0; */
  width: 100%;
  height: 85vh;

  /* z-index: 999; */
  overflow: hidden;
}

.inner_box {
  width: 100%;
  height: 75vh;
  overflow: hidden;
}

.box_l {
  height: 100%;
  overflow-y: auto;
}

.item_list {
  padding: 15px 10px;

  /* font-size: 32px; */
  color: #333;
  border-bottom: 1px solid #f1f1f1;
}

.is_active {
  color: #3277bf;
}

.has_list {
  color: #ccc;
}

.pinpai_title {
  padding: 3px 10px;
  font-size: 36px;
  color: #3277bf;
  background: #f1f1f1;
}

.fast_entry {
  position: absolute;
  right: 0;
  bottom: 10px;
  z-index: 999;
  width: 65px;

  /* background: #fff; */
  overflow: hidden;
}

.fast_entry_item {
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  text-align: center;
}

.car_img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.car_img_chexi {
  width: 160px;
  height: 80px;
  border-radius: 4px;
}

.van-popup--safe {
  padding-bottom: 0 !important;
}

.ressetvan-index-anchor {
  background-color: #f1f1f1;
}
</style>
