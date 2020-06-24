<template>
  <div class="complete">
    <div class="explainTxet">
      补充完整资料后即可进入额度审批,结果将在1个工作日内通过短信或者电话通知您.平台将严格保密用户资料,请放心提交!
    </div>
    <div class="personage">
      <div>
        <span>个人征信授权书照片</span>
        <span class="examineImg">查看示例</span>
      </div>
      <div class="impower">下载授权书</div>
    </div>
    <div class="certificate">
      <div class="imgUploading">
        <uploading :imgport="imgport" :string-img="stringImg" :port-img="portimg"></uploading>
      </div>
      <div class="imgUploading">
        <uploading :imgport="imgport" :string-img="stringImg2" :port-img="portimg"></uploading>
      </div>
      <div class="imgUploading">
        <uploading :imgport="imgport" :string-img="stringImg3" :port-img="portimg"></uploading>
      </div>
    </div>
    <!-- 输入任意文本 -->

    <div class="material">
      <span>上传担保人资料</span>
      <span>查看示例</span>
    </div>
    <div class="imgCard">
      <div>
        <van-uploader>
          <van-button icon="photo" type="primary">上传文件</van-button>
        </van-uploader>
      </div>
      <div>2</div>
      <div>3</div>
    </div>
    <div class="imgCard">
      <div>4</div>
      <div>5</div>
    </div>
    <div class="message"></div>
    <div class="message"></div>
  </div>
</template>
<script>
import { Uploader, Button, Field } from "vant";
import uploading from "../../components/uploadingImg/index";
// Vue.use(Uploader);
// Vue.use(Uploader);/
export default {
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Field.name]: Field,
    uploading,
  },
  data() {
    return {
      show: true,
      stringImg: "手持个人",
      stringImg2: "个人征信照",
      stringImg3: "正在签个",

      portimg: "",
      imgport: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3252521864,872614242&fm=26&gp=0.jpg",
    };
  },
  methods: {
    echoLink(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.complete {
  padding-right: 0.3125rem;
  padding-left: 0.3125rem;
}

.explainTxet {
  font-size: 0.375rem;
  color: wheat;
}

.personage {
  // padding-left: 10px;
  // padding-right: 10px;
  display: flex;
  justify-content: space-between;
  padding-top: 0.36rem;
  font-size: 0.375rem;

  .examineImg {
    padding-left: 0.3125rem;
    color: aqua;
  }

  .impower {
    color: aqua;
  }
}

.certificate {
  display: flex;

  .imgUploading {
    flex: 1;
    padding-right: 10px;
  }
}

.message1 {
  padding-top: 30px;
}
</style>
