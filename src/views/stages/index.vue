<template>
  <div class="stages">
    <img class="img" src="@/imgs/stagesImg.png" alt />
    <div class="paddingBox">
      <div class="tittle">平台将严格保密用户资料，请放心提交</div>
      <div class="indexBox">
        <van-cell :value="areaValue" title="上牌城市" is-link @click="showArea = true" />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" :columns-num="2" value="110100" title="请选择城市" @cancel="showArea = false" @confirm="onAreaConfirm" />
        </van-popup>
        <van-field
          v-model="form.money"
          :maxlength="6"
          clearable
          input-align="right"
          type="number"
          center
          label="意向车价格(万)"
          label-width="3rem"
          placeholder="请输入意向车价格"
        ></van-field>
        <van-field v-model="form.name" clearable input-align="right" center label="姓名" placeholder="请输入姓名"></van-field>
        <van-field
          v-model="form.tel"
          :maxlength="11"
          clearable
          center
          type="number"
          label="联系电话"
          input-align="right"
          placeholder="请输入手机号"
        ></van-field>
        <van-field v-model="form.code" :maxlength="6" type="number" center label="短信验证码" placeholder="请输入短信验证码">
          <van-button v-if="codeShow" slot="button" size="small" style="color: #fea116; border: 1px solid #fea116; border-radius: 5px;" @click="getCode"
            >获取验证码</van-button
          >
          <van-button v-if="!codeShow" slot="button" size="small" disabled style="color: #fea116; border: 1px solid #fea116; border-radius: 5px;"
            >{{ codeSecong }}s</van-button
          >
        </van-field>
      </div>
      <van-button size="large" color="#fea116" class="putBtn" @click="onSubmit">提交申请</van-button>
      <div class="agree">
        <van-checkbox v-model="checked" icon-size="20px" checked-color="#fea116" @change="changText">
          <span :style="agreeText" style="margin-left: -5px;">我已同意并阅</span>
        </van-checkbox>
        <div class="agreement" @click="show = true">库袋隐私保护协议</div>
      </div>
      <div v-show="show" class="coverBox">
        <div class="cover" @click="show = false"></div>
        <div class="contenBox">
          <div class="btn">
            <div class="btnX" @click="show = false">x</div>
          </div>
          <div class="agreeFlow">
            <agreement></agreement>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Button, CellGroup, Picker, Field, Popup, Area, RadioGroup, Radio, Icon, Toast, Overlay, Dialog, Checkbox } from "vant";
import agreement from "@/components/agreement/index";
import { stagesInfo, getSalt, sendSms, fqSubmit } from "@/api/api";
import util from "@/utils/utils";

export default {
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
    [Overlay.name]: Overlay,
    [Checkbox.name]: Checkbox,
    agreement,
  },
  data() {
    return {
      agreeText: "color:#bababa",
      encode_data: "",
      rsaToken: "",
      codeShow: true,
      codeSecong: 60,
      show: false,
      showArea: false,
      areaValue: "请选择城市",
      checked: false,
      form: {
        name: null,
        tel: null,
        code: null,
        province: null,
        city: null,
        money: null,
      },
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "河北省",
          140000: "山西省",
          150000: "内蒙古自治区",
          210000: "辽宁省",
          220000: "吉林省",
          230000: "黑龙江省",
          310000: "上海市",
          320000: "江苏省",
          330000: "浙江省",
          340000: "安徽省",
          350000: "福建省",
          360000: "江西省",
          370000: "山东省",
          410000: "河南省",
          420000: "湖北省",
          430000: "湖南省",
          440000: "广东省",
          450000: "广西壮族自治区",
          460000: "海南省",
          500000: "重庆市",
          510000: "四川省",
          520000: "贵州省",
          530000: "云南省",
          540000: "西藏自治区",
          610000: "陕西省",
          620000: "甘肃省",
          630000: "青海省",
          640000: "宁夏回族自治区",
          650000: "新疆维吾尔自治区",
        },
        city_list: {
          110100: "北京",
          310100: "上海",
          120100: "天津",
          500100: "重庆",
          810100: "香港",
          820100: "澳门",
          710100: "台湾",
          130100: "石家庄",
          130600: "保定",
          130700: "张家口",
          130800: "承德",
          130200: "唐山",
          131000: "廊坊",
          130900: "沧州",
          131100: "衡水",
          130500: "邢台",
          130400: "邯郸",
          130300: "秦皇岛",
          140100: "太原",
          140200: "大同",
          140300: "阳泉",
          140700: "晋中",
          140400: "长治",
          140500: "晋城",
          141000: "临汾",
          141100: "吕梁",
          140800: "运城",
          140900: "忻州",
          140600: "朔州",
          150100: "呼和浩特",
          150200: "包头",
          150300: "乌海",
          150900: "乌兰察布",
          150500: "通辽",
          150400: "赤峰",
          150600: "鄂尔多斯",
          150800: "巴彦淖尔",
          152500: "锡林郭勒",
          150700: "呼伦贝尔",
          152200: "兴安",
          152900: "阿拉善",
          210100: "沈阳",
          210200: "大连",
          210300: "鞍山",
          210400: "抚顺",
          210500: "本溪",
          210600: "丹东",
          210700: "锦州",
          210800: "营口",
          210900: "阜新",
          211000: "辽阳",
          211200: "铁岭",
          211300: "朝阳",
          211100: "盘锦",
          211400: "葫芦岛",
          220100: "长春",
          220200: "吉林",
          222400: "延边",
          220300: "四平",
          220500: "通化",
          220800: "白城",
          220400: "辽源",
          220700: "松原",
          220600: "白山",
          230100: "哈尔滨",
          230200: "齐齐哈尔",
          231000: "牡丹江",
          230800: "佳木斯",
          231200: "绥化",
          231100: "黑河",
          232700: "大兴安岭",
          230700: "伊春",
          230600: "大庆",
          230900: "七台河",
          230300: "鸡西",
          230400: "鹤岗",
          230500: "双鸭山",
          320100: "南京",
          321100: "镇江",
          320500: "苏州",
          320600: "南通",
          321000: "扬州",
          320900: "盐城",
          320300: "徐州",
          320800: "淮安",
          320700: "连云港",
          320400: "常州",
          320200: "无锡",
          321200: "泰州",
          321300: "宿迁",
          330100: "杭州",
          330500: "湖州",
          330400: "嘉兴",
          330200: "宁波",
          330600: "绍兴",
          331000: "台州",
          330300: "温州",
          331100: "丽水",
          330700: "金华",
          330800: "衢州",
          330900: "舟山",
          340100: "合肥",
          340300: "蚌埠",
          340200: "芜湖",
          340400: "淮南",
          340500: "马鞍山",
          340800: "安庆",
          341300: "宿州",
          341200: "阜阳",
          341600: "亳州",
          341000: "黄山",
          341100: "滁州",
          340600: "淮北",
          340700: "铜陵",
          341800: "宣城",
          341500: "六安",
          342600: "巢湖",
          341700: "池州",
          350100: "福州",
          350200: "厦门",
          350900: "宁德",
          350300: "莆田",
          350500: "泉州",
          350600: "漳州",
          350800: "龙岩",
          350400: "三明",
          350700: "南平",
          360100: "南昌",
          360400: "九江",
          361100: "上饶",
          361000: "抚州",
          360900: "宜春",
          360800: "吉安",
          360700: "赣州",
          360200: "景德镇",
          360300: "萍乡",
          360500: "新余",
          360600: "鹰潭",
          370100: "济南",
          370200: "青岛",
          370300: "淄博",
          371400: "德州",
          370600: "烟台",
          370700: "潍坊",
          370800: "济宁",
          370900: "泰安",
          371300: "临沂",
          371700: "菏泽",
          371600: "滨州",
          370500: "东营",
          371000: "威海",
          370400: "枣庄",
          371100: "日照",
          371200: "莱芜",
          371500: "聊城",
          410100: "郑州",
          410500: "安阳",
          410700: "新乡",
          411000: "许昌",
          410400: "平顶山",
          411500: "信阳",
          411300: "南阳",
          410200: "开封",
          410300: "洛阳",
          411400: "商丘",
          410800: "焦作",
          410600: "鹤壁",
          410900: "濮阳",
          411600: "周口",
          411100: "漯河",
          411700: "驻马店",
          411200: "三门峡",
          420100: "武汉",
          420700: "鄂州",
          420900: "孝感",
          421100: "黄冈",
          420200: "黄石",
          421200: "咸宁",
          421000: "荆州",
          420500: "宜昌",
          422800: "恩施",
          420300: "十堰",
          421300: "随州",
          420800: "荆门",
          429004: "仙桃",
          429005: "潜江",
          429006: "天门",
          430100: "长沙",
          430300: "湘潭",
          430200: "株洲",
          430400: "衡阳",
          431000: "郴州",
          430700: "常德",
          430900: "益阳",
          431300: "娄底",
          430500: "邵阳",
          430600: "岳阳",
          433100: "湘西",
          430800: "张家界",
          431200: "怀化",
          431100: "永州",
          440100: "广州",
          440200: "韶关",
          441300: "惠州",
          441400: "梅州",
          440500: "汕头",
          440300: "深圳",
          440400: "珠海",
          440600: "佛山",
          441200: "肇庆",
          440800: "湛江",
          440700: "江门",
          441600: "河源",
          441800: "清远",
          445300: "云浮",
          445100: "潮州",
          441900: "东莞",
          442000: "中山",
          441500: "汕尾",
          441700: "阳江",
          445200: "揭阳",
          440900: "茂名",
          450100: "南宁",
          451400: "崇左",
          450200: "柳州",
          451300: "来宾",
          450300: "桂林",
          450400: "梧州",
          429021: "神农架",
          451100: "贺州",
          450900: "玉林",
          450800: "贵港",
          451000: "百色",
          450700: "钦州",
          451200: "河池",
          450500: "北海",
          450600: "防城港",
          460100: "海口",
          460200: "三亚",
          510100: "成都",
          510400: "攀枝花",
          510300: "自贡",
          510700: "绵阳",
          511300: "南充",
          511700: "达州",
          510900: "遂宁",
          511600: "广安",
          511900: "巴中",
          510500: "泸州",
          511500: "宜宾",
          511000: "内江",
          512000: "资阳",
          511100: "乐山",
          511400: "眉山",
          513400: "凉山",
          511800: "雅安",
          513300: "甘孜",
          513200: "阿坝",
          510600: "德阳",
          510800: "广元",
          520100: "贵阳",
          520300: "遵义",
          520400: "安顺",
          522700: "黔南",
          522600: "黔东南",
          520600: "铜仁",
          520500: "毕节",
          520200: "六盘水",
          522300: "黔西南",
          530100: "昆明",
          532900: "大理",
          532500: "红河",
          530300: "曲靖",
          530500: "保山",
          532600: "文山",
          530400: "玉溪",
          532301: "楚雄",
          530800: "普洱",
          530600: "昭通",
          532800: "西双版纳",
          533100: "德宏",
          530900: "临沧",
          533300: "怒江",
          533400: "迪庆",
          530700: "丽江",
          540100: "拉萨",
          542300: "日喀则",
          542200: "山南",
          542600: "林芝",
          542100: "昌都",
          542400: "那曲",
          542500: "阿里",
          610100: "西安",
          610400: "咸阳",
          610600: "延安",
          610800: "榆林",
          610500: "渭南",
          611000: "商洛",
          610900: "安康",
          610700: "汉中",
          610300: "宝鸡",
          610200: "铜川",
          620100: "兰州",
          621100: "定西",
          620800: "平凉",
          621000: "庆阳",
          620300: "金昌",
          620600: "武威",
          620700: "张掖",
          620200: "嘉峪关",
          620900: "酒泉",
          620500: "天水",
          621200: "陇南",
          622901: "临夏",
          623000: "甘南",
          620400: "白银",
          640100: "银川",
          640200: "石嘴山",
          640300: "吴忠",
          640400: "固原",
          640500: "中卫",
          630100: "西宁",
          630200: "海东",
          632300: "黄南",
          632500: "海南",
          632600: "果洛",
          632700: "玉树",
          632800: "海西",
          632200: "海北",
          650100: "乌鲁木齐",
          659001: "石河子",
          652300: "昌吉",
          659004: "五家渠",
          652100: "吐鲁番",
          652800: "巴音郭楞",
          652900: "阿克苏",
          659002: "阿拉尔",
          653100: "喀什",
          659003: "图木舒克",
          654100: "伊犁",
          650200: "克拉玛依",
          654200: "塔城",
          652200: "哈密",
          653200: "和田",
          654300: "阿勒泰",
          653000: "克孜勒苏",
          652700: "博尔塔拉",
          652801: "库尔勒",
          469001: "五指山",
          410881: "济源",
          420600: "襄阳",
          469002: "琼海",
        },
      },
    };
  },
  methods: {
    onAreaConfirm(e) {
      if (e.length == 2) {
        this.areaValue = e[0].name + e[1].name;
        this.form.city = e[1].name;
        this.form.province = e[0].name;
      }
      this.showArea = false;
    },
    async getCode() {
      if (!this.form.tel) {
        Toast("请输入手机号");
        return;
      }
      let params = {
        mobile: this.form.tel,
      };
      let sal = await getSalt();
      var textEncrypt = JSON.stringify(params);
      let pubKey = sal.publicKey;
      this.rsaToken = sal.token;
      this.encode_data = await util.getRsa(pubKey, textEncrypt); // 加密后数据
      await sendSms({
        token: this.rsaToken,
        encode_data: this.encode_data,
      });
      this.codeShow = false;
      this.timeOut();
    },
    onSubmit() {
      if (this.form.name) {
        this.form.name = this.form.name.trim();
      }
      if (!this.form.name) {
        Toast("请输入姓名");
        return;
      }
      if (!this.form.city || !this.form.province) {
        Toast("请选择所在城市");
        return;
      }
      if (!this.form.tel) {
        Toast("请输入手机号");
        return;
      }
      if (!this.form.code) {
        Toast("请输入验证码");
        return;
      }
      if (!this.form.money) {
        Toast("请输入意向车价格");
        return;
      }
      if (!this.checked) {
        Toast("请同意并阅读库袋隐私保护协议");
        return;
      }
      Dialog.confirm({
        title: "温馨提示",
        message: "请确认填写资料是否正确",
      })
        .then(() => {
          fqSubmit(this.form)
            .then(() => {
              Toast("提交申请成功,请等待回复");
              this.areaValue = "";
              this.form = {
                name: null,
                tel: null,
                code: null,
                province: null,
                city: null,
                money: null,
              };
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    timeOut() {
      let timeID = setInterval(() => {
        if (this.codeSecong !== 0) {
          this.codeSecong -= 1;
        } else {
          this.codeSecong = "60";
          this.codeShow = true;
          clearInterval(timeID);
        }
      }, 1000);
    },
    changText() {
      if (this.agreeText == "color:#bababa") {
        this.agreeText = "color:#333";
      } else {
        this.agreeText = "color:#bababa";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stages {
  box-sizing: border-box;
  max-width: 700px;
  height: 100%;
  background-color: #4057cd;

  .img {
    width: 100%;
  }

  .paddingBox {
    box-sizing: border-box;
    max-width: 700px;
    padding: 20px 20px 0;
    padding-top: constant(safe-area-inset-top);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-left: constant(safe-area-inset-left);
    background-color: #f6f5f8;
    border-radius: 10px;

    .indexBox {
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 10px;

      .van-cell {
        border-radius: 10px;
      }
    }

    .tittle {
      padding: 5px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #ccc;
      text-align: center;
      border-radius: 5px;
    }

    .agree {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 10px 0;
      font-size: 14px;

      div {
        margin-left: 5px;
      }

      .agreement {
        border-bottom: 1px solid #646464;
      }
    }

    .coverBox {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;

      .cover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 101;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .contenBox {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 102;
        width: 90%;
        background-color: #fff;
        border-radius: 5px;
        transform: translate(-50%, -50%);

        .btn {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 103;
          width: 100%;

          .btnX {
            padding: 10px 10px 0 0;
            text-align: right;
          }
        }

        .agreeFlow {
          height: 550px;
          max-height: 550px;
          overflow-y: scroll;
        }
      }
    }

    .putBtn {
      width: 100%;
      margin-bottom: 5px;
      font-weight: bold;
      color: #fff;
      text-align: center;
      border-radius: 48px;
    }
  }
}
</style>
