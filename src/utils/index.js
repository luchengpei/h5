/**
 * Created by jiachenpan on 16/11/18.
 */

// 格式化url query 为对象
function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/***
 * 说明：该方法用于检测一个字符串是否匹配某个模式。如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
 *
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQuery(list, keyWord) {
  var reg = new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i].imei)) {
      arr.push(list[i]);
    }
  }
  console.log(arr, list, "arr");
  return arr;
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
function deepClone(source) {
  //深克隆
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

//数组去重
function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

function clearNullString(data) {
  //请求接口传参时先遍历对象属性中的空字符串"" 设置为undefined
  for (let key in data) {
    if (!data[key]) {
      data[key] = undefined;
    }
  }
  return data;
}

function allSetUndefined(obj, arr) {
  //除去数组中的属性，所有对象的属性值设置为undefined
  for (let key in obj) {
    if (arr) {
      if (arr.indexOf(key) == -1) {
        obj[key] = undefined;
      }
    } else {
      obj[key] = undefined;
    }
  }
  return obj;
}

function isWechat() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

//导出
export default {
  utilFuzzyQuery: fuzzyQuery,
  utilUniqueArr: uniqueArr,
  utilDeepClone: deepClone,
  utilGetQueryObject: getQueryObject,
  utilClearNullString: clearNullString,
  utilAllSetUndefined: allSetUndefined,
  utilIsWechat: isWechat,
};
