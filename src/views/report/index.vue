<template>
  <div class="container">
    <van-nav-bar left-text="返回" left-arrow title="车辆估价报告" @click-left="onClickLeft" />
    <img width="100%" src="@/imgs/bannner.png" />
    <div class="paddingBox">
      <van-cell-group :border="false">
        <!-- <van-card
        :desc="`${formData.year}年${formData.month}月上牌|${formData.mileage}万公里|${formData.cityName}|${formData.emission_standard}`"
        :title="`${formData.showName}`"
        :thumb="`${formData.img}`"
      >
        <div slot="tags">
          <div class="van-card__desc van-ellipsis">新车指导价：{{formData.price}}万元</div>
        </div>
        </van-card>-->
        <van-row gutter="6">
          <van-col span="6" style="align-items: center;">
            <img :src="`${formData.img}`" style="max-width: 100%; max-height: 100%; padding-top: 20px; border: 0;" />
          </van-col>
          <van-col span="18">
            <p class="title">{{ formData.showName }}</p>
            <p class="info">
              {{ `${formData.year}年${formData.month}月上牌 ${formData.mileage}万公里 ${formData.cityName} ${formData.emission_standard}` }}
            </p>
            <p class="info">新车指导价: {{ formData.price }}万元</p>
          </van-col>
        </van-row>
      </van-cell-group>
    </div>
    <div class="line"></div>
    <div class="paddingBox">
      <p class="title">价格分布图</p>
      <van-tabs v-model="activeName" :border="false" title-active-color="#fe7853" line-height="0" style="text-align: center;">
        <van-tab title="车况优秀" name="a">
          <div class="imgs">
            <img src="@/imgs/juxing.png" alt />
          </div>
          <div v-if="excellent" class="pricebox">
            <div>{{ excellent }}</div>
          </div>
          <p class="info">注: 地区、车况、需求等因素会影响价格上下浮动偏差</p>
        </van-tab>
        <van-tab title="车况良好" name="b">
          <div class="imags">
            <img src="@/imgs/juxing.png" alt />
          </div>
          <div style="min-height: 60px;">
            <div v-if="good" class="pricebox">
              <div class="divrice">{{ good }}</div>
            </div>
            <p class="info">注: 地区、车况、需求等因素会影响价格上下浮动偏差</p>
          </div>
        </van-tab>
        <van-tab title="车况一般" name="c">
          <div class="imagss">
            <img src="@/imgs/juxing.png" alt />
          </div>
          <div style="min-height: 60px;">
            <div v-if="fair" class="pricebox">
              <div class="price">{{ fair }}</div>
            </div>
            <p class="info">注: 地区、车况、需求等因素会影响价格上下浮动偏差</p>
          </div>
        </van-tab>
      </van-tabs>
      <van-cell-group>
        <van-field v-model="price" type="number" center label="价位/万元" clearable input-align="right" placeholder="请输入心理价位"></van-field>
        <van-field v-model="mobile" :maxlength="11" label="联系电话" input-align="right" center clearable placeholder="请输入联系电话"></van-field>
      </van-cell-group>
    </div>
    <div class="line"></div>
    <div class="paddingBox">
      <div class="serviceBox">
        <div class="serviceIndex">
          <div class="serviceImg">
            <img src="@/imgs/fuwufeijianmian.png" alt />
          </div>
          <div class="serviceText">零服务费</div>
          <div class="service">价格您来谈</div>
          <div class="service">我们只送信</div>
        </div>
        <div class="serviceIndex">
          <div class="serviceImg">
            <img src="@/imgs/fuwutongzhi.png" alt />
          </div>
          <div class="serviceText">增值服务</div>
          <div class="service">置换-检测-物流-金融</div>
          <div class="service">随你选</div>
        </div>
        <div class="serviceIndex">
          <div class="serviceImg">
            <img src="@/imgs/baozhengdanbao.png" alt />
          </div>
          <div class="serviceText">省心省事</div>
          <div class="service">我来找车</div>
          <div class="service">你慢慢选</div>
        </div>
      </div>
      <div class="phoneBox">
        <div class="phoneSize">
          *我们会即时服务您,即刻享受安全、舒适代购服务,在“京东汽车拍卖频道”购买任何一辆车,都可以享受我们的引导及增值服务,我们会帮你把控好购车每一关
        </div>
        <div class="phone">服务保障热线: 0755-82556579</div>
      </div>
    </div>
    <div class="paddingBox">
      <van-row gutter="20" style="padding-top: 10px; padding-bottom: 10px;">
        <van-col span="12">
          <van-button
            :disabled="registed"
            size="large"
            color="#ffa415"
            style="height: 1.2rem; line-height: 1.1rem; border-radius: 4px;"
            @click="registration(1)"
            >卖&nbsp;个&nbsp;好&nbsp;价</van-button
          >
        </van-col>
        <van-col span="12">
          <van-button
            :disabled="buyRegisted"
            size="large"
            color="#ff4512"
            style="height: 1.2rem; line-height: 1.1rem; border-radius: 4px;"
            @click="registration(2)"
            >买&nbsp;个&nbsp;好&nbsp;车</van-button
          >
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { carValuation, registration, buyInfo } from "@/api/api";
import { Popup, Button, Cell, NavBar, Field, CellGroup, Row, Col, Card, Tab, Tabs, Toast, Dialog } from "vant";

export default {
  name: "ReportPage",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data() {
    return {
      formData: {},
      price: null,
      mobile: null,
      activeName: "a",
      excellent: "",
      good: "",
      fair: "",
      registed: false,
      buyRegisted: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.formData = this.$route.query;
    if (
      this.formData.year == undefined ||
      this.formData.model == undefined ||
      this.formData.month == undefined ||
      this.formData.mileage == undefined ||
      this.formData.city == undefined ||
      this.formData.price == undefined ||
      this.formData.emission_standard == undefined ||
      this.formData.img == undefined ||
      this.formData.cityName == undefined ||
      this.formData.showName == undefined
    ) {
      Dialog.alert({
        title: "无估价信息",
        message: "请先填写估价信息",
      }).then(() => {
        // this.$router.push({
        //   path: "/evaluation",
        //   query: this.form,
        // });
      });
    }
    carValuation({
      carDetailId: this.formData.model,
      year: this.formData.year,
      month: this.formData.month,
      mile: this.formData.mileage,
      cityCode: this.formData.city,
    }).then((res) => {
      if (res.excellent == undefined) {
        Toast("估价出现异常，请重试");
      } else {
        this.excellent = `${(res.excellent.min / 10000).toFixed(2)}万~${(res.excellent.max / 10000).toFixed(2)}万`;
        this.good = `${(res.good.min / 10000).toFixed(2)}万~${(res.good.max / 10000).toFixed(2)}万`;
        this.fair = `${(res.fair.min / 10000).toFixed(2)}万~${(res.fair.max / 10000).toFixed(2)}万`;
      }
    });
  },
  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/evaluation",
        query: this.form,
      });
    },
    registration(type) {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)) {
        Toast("请输入正确的手机号码");
        return;
      }
      let carInfo = {};
      Object.assign(carInfo, this.formData);
      carInfo["price"] = {
        excellent: this.excellent,
        good: this.good,
        fair: this.fair,
      };
      registration({
        expectPrice: this.price ? this.price : 0,
        mobile: this.mobile,
        type: type,
        carInfo: carInfo,
      }).then((res) => {
        if (type === 1) {
          this.registed = true;
          this.$router.push({ path: "/fetchGoodPrice", query: { id: res } });
        } else {
          Toast.success("提交成功");
          this.buyRegisted = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  max-width: 700px;
  height: 100%;
  padding-top: constant(safe-area-inset-top);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  background-color: #fff;
}

.title {
  font-size: 16px;
  line-height: 16px;
}

.line {
  width: 100vw;
  height: 10px;
  max-height: 10px;
  background-color: #f5f8fb;
}

.paddingBox {
  padding: 0 14px;
  overflow: hidden;
  background-color: #fff;
}

.van-tab__pane {
  position: relative;
}

.imgs {
  position: absolute;
  top: -28px;
  left: 47px;
  width: 22px;
  height: 10px;

  img {
    width: 100%;
  }
}

.imags {
  position: absolute;
  top: -28px;
  left: 162px;
  width: 22px;
  height: 10px;

  img {
    width: 100%;
  }
}

.imagss {
  position: absolute;
  top: -28px;
  left: 279px;
  width: 22px;
  height: 10px;

  img {
    width: 100%;
  }
}

.info {
  font-size: 12px;
  line-height: 4px;
  color: gray;
}

.pricebox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background-color: #fff7f5;
  border: 1px solid #fe7853;
  border-radius: 10px;

  div {
    padding: 30px 0;
    font-size: 30px;
    line-height: 4px;
    color: #fe7853;
  }
}

.serviceBox {
  display: flex;
  justify-content: space-around;
  height: 140px;
  margin-top: 15px;
  background-color: #fff7ef;
  border-radius: 10px;

  .serviceIndex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .serviceImg {
      width: 35px;
      height: 35px;

      img {
        width: 100%;
      }
    }

    .serviceText {
      margin: 8px 0 12px;
      font-size: 18px;
      color: #d7a26a;
    }

    .service {
      font-size: 12px;
      color: #999;
    }
  }
}

.phoneBox {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff7ef;
  border-radius: 10px;

  .phoneSize {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .phone {
    font-size: 18px;
    font-weight: 500;
    color: #d7a26a;
    text-align: center;
  }
}
</style>
