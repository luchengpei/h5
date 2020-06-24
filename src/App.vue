<template>
  <div id="app">
    <router-view> </router-view>
    <!-- <button @click="testMock">测试mock</button> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {},
  methods: {
    testMock() {
      axios.post(`api/project`, {}).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
}

body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

#app {
  height: 100%;
}
</style>
