<template>
  <div class="navbar-container">
    <div class="title">
      <div v-show="navBar_title != '我的车库'" class="back red" @click="onClickLeft"><van-icon name="arrow-left" class="icon-left" />&nbsp;返回</div>
      <span>{{ navBar_title }}</span>
      <span v-show="$store.getters.token" @click="openLoginOut">
        <svg-icon class="tuichu" icon-class="tuichu" />
      </span>
    </div>
    <van-dialog
      v-model="logout_show"
      :close-on-click-overlay="true"
      show-cancel-button
      cancel-button-text="取消"
      show-confirm-button
      confirm-button-text="确认"
      @confirm="loginOut"
    >
      <div class="logout-dialog">是否退出？</div>
    </van-dialog>
  </div>
</template>

<script>
import { Icon } from "vant";
// import { logout } from "@/api/login";
export default {
  name: "NavBar",
  components: {
    [Icon.name]: Icon,
  },
  // props:[navBar_title,route]
  props: {
    navBar_title: {
      type: String,
      default: "",
    },
    route: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      logout_show: false,
    };
  },
  mounted() {
    console.log(this.$store.getters.token, "store");
  },
  methods: {
    onClickLeft() {
      console.log(this.route, "route");
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        path: this.route.path,
        query: {
          curr_active: this.route.curr_active,
          tel: this.route.tel,
          id: this.route.id,
        },
      });
    },
    openLoginOut() {
      this.logout_show = true;
    },
    loginOut() {
      this.loading = true;
      this.$store
        .dispatch("user/LogOut")
        .then(() => {
          this.loading = false;
          this.logout_show = false;
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.loading = false;
          this.logout_show = false;
        });
    },
  },
};
</script>

<style lang="scss">
.navbar-container {
  .title {
    position: relative;
    height: 50px;
    padding-top: 10px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;

    .back {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 14px;

      .icon-left {
        float: left;
        margin-top: 18px;
      }
    }

    .tuichu {
      position: absolute;
      top: 25px;
      right: 15px;
      font-size: 20px;
    }
  }

  .logout-dialog {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
