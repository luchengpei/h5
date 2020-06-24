const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  chainWebpack: (config) => {
    // const svgRule = config.module.rule("svg");

    // // clear all existing loaders.
    // // if you don't do this, the loader below will be appended to
    // // existing loaders of the rule.
    // svgRule.uses.clear();

    // // add replacement loader(s)
    // svgRule
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/icons"))
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]"
    //   });
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  devServer: {
    //原理：通过伪造请求使得http请求为同源的，然后将同源的请求发送到反向代理服务器上，
    //由反向代理服务器去请求真正的url，这样就绕过直接请求真正的url导致跨域问题。
    proxy: {
      "/api/": {
        target: "http://localhost:3000", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "", //相当于是替代‘/api’，如果接口中是没有api的，那就直接置空，就像我截图的一样，
          //如果接口中有api，那就得写成{‘^/api’:‘/api’}，可以理解为一个重定向或者重新赋值的功能
        },
      },
    },
  },
};
