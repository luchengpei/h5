import { isArray } from "util";
import OSS from "ali-oss";
const Encrypt = require("jsencrypt");

/**
 * Created by jiachenpan on 16/11/18.
 */
function getImgUrl(url) {
  if (url == undefined) {
    //TODO 默认图片（提示作用）
    return "";
  }
  const imgURL = this.$store.state.user.clientToken;
  //TODO 1.client 放到全局对象里面。2.获取URL要做异常处理（client会超时失效)
  const client = new OSS({
    region: imgURL.region,
    accessKeyId: imgURL.accessKeyId,
    accessKeySecret: imgURL.accessKeySecret,
    stsToken: imgURL.stsToken,
    bucket: imgURL.bucket,
  });
  let urls = client.signatureUrl(url);
  return urls;
}

/**
 * tree组件适用
 * 过滤半选状态的父节点key
 * @param {*} menuIds
 * @param {*} treeData
 */
function filterHaftParent(menuIds, treeData) {
  let retMenuIds = [];
  if (!isArray(menuIds)) return retMenuIds;
  function fun(value, data, arr) {
    if (!isArray(data)) return true;
    for (var i = 0; i < data.length; i++) {
      var mod = data[i];
      if (mod.id == value) {
        if ((isArray(mod.children) && mod.children.length == 0) || !isArray(mod.children)) {
          arr.push(mod.id);
          return true;
        }
        return true;
      } else {
        if (isArray(mod.children) && mod.children.length != 0) {
          fun(value, mod.children, arr);
        }
      }
    }
    return true;
  }

  for (var i = 0; i < menuIds.length; i++) {
    fun(menuIds[i], treeData, retMenuIds);
  }

  return retMenuIds;
}

function sortLetter(arrs) {
  //字母排序
  let newArr = [];
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
  for (let j = 0; j < letters.length; j++) {
    let objs = {};
    objs.letter = letters[j];
    objs.list = [];
    for (let i = 0; i < arrs.length; i++) {
      if (letters[j] == arrs[i].firstLetter) {
        objs.list.push(arrs[i]);
      }
    }
    newArr.push(objs);
  }
  return newArr;
}

function getRsa(pubKey, textEncrypt) {
  // var Encrypt = require('jsencrypt');

  console.log(Encrypt, "------------Encrypt");
  var crypt = new Encrypt.JSEncrypt();

  // pubKey = (pubKey.split('-----'))[2];
  // pubKey = pubKey.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s*/g, "");

  crypt.setPublicKey(pubKey);
  var encrypted = crypt.encrypt(textEncrypt); // 加密后数据
  return encrypted;
}

export default {
  getImgUrl,
  filterHaftParent,
  sortLetter,
  getRsa,
};
