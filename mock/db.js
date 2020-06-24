var Mock = require("mockjs");

module.exports = {
  project_comments: Mock.mock({
    data: {
      mobile: "admin",
      token: "af6146b61eff44748d294002d70b20a5",
    },
    errcode: 200,
    errmsg: "ok",
    // "error": 0,
    // "message": "success",
    // "result|40": [{
    //   "author": "@name",
    //   "comment": "@cparagraph",
    //   "date": "@datetime"
    // }]
  }),
  push_comment: Mock.mock({
    data: {
      "items|5-20": [
        {
          id: "@integer(60, 10000)",
          name: "@cname",
          spId: 3073,
          spType: 2,
          moneyUseto: '@date("yy")',
          sex: "1",
          belongsDealer: "张三阿萨德",
          datetime: '@datetime("T")',
          province: "@province()",
          city: "@city()",
          county: "@county()",
        },
      ],
      page: {
        currentPage: 1,
        totalPage: 10,
        totalCount: 77,
      },
      errcode: 200,
      errmsg: "ok",
    },
  }),
};
// mock 语法参考 http://mockjs.com/examples.html
// 固定格式
// data: {
//   xx: "admin",
//   yy: "af6146b61eff44748d294002d70b20a5"
// },
// errcode: 200,
// errmsg: "ok"

// table
// data: {
//   "items|5-20": [{
//     id: "@integer(60, 10000)",
//     name: "@cname",
//     spId: 3073,
//     spType: 2,
//     moneyUseto: '@date("yy")',
//     sex: "1",
//     belongsDealer: "张三阿萨德",
//     datetime:'@datetime("T")',
//     province:'@province()',
//     city:'@city()',
//     county:'@county()',

//   }],
//   page: {
//     currentPage: 1,
//     totalPage: 10,
//     totalCount: 77
//   },
//   errcode: 200,
//   errmsg: "ok"
// }
