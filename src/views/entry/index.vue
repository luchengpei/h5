<template>
  <div class="entry">
    <van-nav-bar left-text="返回" left-arrow title="库袋助手" @click-left="onClickLeft" />
    <div class="card">
      <div class="card-title">
        <span class="card-title-title">身份证照片</span>
        <span class="card-title-example check-example" @click="isShow = true">查看示例</span>
      </div>
      <div class="card-id">
        <div class="imgUploading"><uploading :imgport="imgport" :string-img="stringImg" :port-img="portimg"></uploading></div>
        <div class="imgUploading"><uploading :imgport="imgport" :string-img="stringImg1" :port-img="portimg"></uploading></div>
      </div>
    </div>
    <div class="drive">
      <div class="drive-title">
        <span class="drive-title-title">驾驶证照片(科二/科三成绩单或截图，配</span>
        <span class="drive-title-example check-example" @click="isShow = true">查看示例</span>
        <div>偶或直亲属驾驶证)</div>
      </div>
      <div class="drive-id">
        <div class="imgUploading"><uploading :imgport="imgport" :string-img="stringImg2" :port-img="portimg"></uploading></div>
      </div>
    </div>
    <div class="bank">
      <div class="bank-title">
        <span class="bank-title-title">银行卡照片及申请人正面照(银行卡个人</span>
        <span class="bank-title-example check-example" @click="isShow = true">查看示例</span>
        <div>信息与申请人身份证一致)</div>
      </div>
      <div class="bank-id">
        <div class="imgUploading"><uploading :imgport="imgport" :string-img="stringImg3" :port-img="portimg"></uploading></div>
        <div class="imgUploading"><uploading :imgport="imgport" :string-img="stringImg4" :port-img="portimg"></uploading></div>
      </div>
    </div>
    <viewExample v-model="isShow" :height="500" title="查看示例" img="https://img.yzcdn.cn/vant/apple-3.jpg" />
    <div class="paddingBox"><van-button size="large" color="#fea116" class="putBtn" @click="onSubmit">提交</van-button></div>
  </div>
</template>
<script>
import { Button, Field, NavBar, Icon, Toast, Dialog, Uploader } from "vant";
import viewExample from "@/components/viewExample";
import uploading from "../../components/uploadingImg/index";
// import { stagesInfo, getSalt, sendSms } from '@/api/api'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    viewExample,
    uploading,
  },
  data() {
    return {
      upList: [],
      downList: [],
      isShow: false,
      bankList: [],
      driveList: [],
      applyList: [],
      form: {
        upList: [],
        downList: [],
        driveList: [],
        bankList: [],
        applyList: [],
      },
      stringImg: "身份证正面",
      stringImg1: "身份证反面",
      stringImg2: "驾驶证正面",
      stringImg3: "银行卡正面",
      stringImg4: "申请人正面照",
      portimg: "",
      imgport: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3252521864,872614242&fm=26&gp=0.jpg",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/evaluation",
        // query: this.form,
      });
    },
    onSubmit() {
      if (!this.form.upList) {
        Toast("请上传身份证正面");
        return;
      }
      if (!this.form.downList) {
        Toast("请上传身份证反面");
        return;
      }
      if (!this.form.driveList) {
        Toast("请上传科二/科三成绩单或截图，配偶或直亲属驾驶证");
        return;
      }
      if (!this.form.bankList) {
        Toast("请上传银行卡正面");
        return;
      }
      if (!this.form.applyList) {
        Toast("请上传申请人正面");
        return;
      }

      Dialog.confirm({
        title: "温馨提示",
        message: "请确认资料填写是否正确",
      })
        .then(() => {
          // stagesInfo(this.form)
          console.log("提交的信息", this.form);
          stagesInfo(this.form)
            .then(() => {
              Toast("提交申请成功,请等待回复");
              // this.areaValue = "";
              this.form = {
                upList: null,
                downList: null,
                driveList: null,
                bankList: null,
                applyList: null,
              };
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
/* 改动不大，样式合并 */
.entry {
  box-sizing: border-box;
  max-width: 700px;
  height: 100%;
  background-color: #fff;

  .card {
    padding: 15px 15px 0 15px;
    font-size: 14px;

    &-title {
      margin-bottom: 10px;

      .check-example {
        color: aqua;
      }

      &-title {
        padding: 0 20px 5px 0;
      }

      &-example {
        // padding: 0px -20px 5px 0px;
      }
    }

    &-id {
      display: flex;
      // flex-wrap: wrap;
      .imgUploading {
        width: 32%;
        margin-right: 10px;
        // flex: 1;
      }
      // &-up{
      // 		background-color: #F0F0F0;
      // 		height: 100px;
      // 		width: 100px;
      // 		display: flex;
      // 		justify-content: center;
      // 		align-items: center;
      // 		margin: 0px 10px 5px 0px;
      // 		.word{
      // 			// display: flex;
      // 			justify-content: center;
      // 			align-items: center;
      // 			.tag{
      // 				 display: flex;
      // 				justify-content: center;
      // 				align-items: center;
      // 			}
      // 		}
      // }
      // &-down{
      // 	  // background-color: #ddd;
      // 	  height: 100px;
      // 	  width: 100px;
      // 	  display: flex;
      // 	  justify-content: center;
      // 	  align-items: center;
      // 	  margin: 0px 0px 5px 10px;
      // }
    }
  }

  .drive {
    padding: 15px 15px 0 15px;
    font-size: 14px;

    &-title {
      margin-bottom: 10px;

      .check-example {
        color: aqua;
      }

      &-title {
        padding: 0 20px 5px 0;
      }

      &-example {
        // padding: 0px -20px 5px 0px;
      }
    }

    &-id {
      display: flex;

      .imgUploading {
        width: 32%;
        margin-right: 10px;
        // flex: 1;
      }
    }
  }

  .bank {
    padding: 15px 15px 0 15px;
    font-size: 14px;

    &-title {
      margin-bottom: 10px;

      .check-example {
        color: aqua;
      }

      &-title {
        padding: 0 20px 5px 0;
      }

      &-example {
        // padding: 0px -20px 5px 0px;
      }
    }

    &-id {
      display: flex;

      .imgUploading {
        width: 32%;
        margin-right: 10px;
        // flex: 1;
      }
    }
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
