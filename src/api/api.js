import request from "@/utils/request";

/**
 * 品牌列表
 * @param {object} data
 */
export function carBrands(data) {
  return request({
    url: "/java2/cardealer/jdsale/public/valuation/brands",
    method: "post",
    data,
  });
}
/**
 * 车系列表
 * @param {object} data
 */

export function carSeries(data) {
  return request({
    url: "/java2/cardealer/jdsale/public/valuation/series",
    method: "post",
    data,
  });
}
/**
 * 车型列表
 * @param {object} data
 */
export function carModels(data) {
  return request({
    url: "/java2/cardealer/jdsale/public/valuation/cars",
    method: "post",
    data,
  });
}

/**
 * 估价
 * @param {object} data
 */
export function carValuation(data) {
  return request({
    url: "/java2/cardealer/jdsale/public/valuation/valuation",
    method: "post",
    data,
  });
}
/**
 * 登记电话
 * @param {object} data
 */
export function registration(data) {
  return request({
    url: "/java2/cardealer/jdsale/public/valuation/sale-leads",
    method: "post",
    data,
  });
}
/**
 * 登记买车信息
 * @param {object} data
 */
export function buyInfo(data) {
  return request({
    url: "/public/valuation/buy-leads",
    method: "post",
    data,
  });
}

/**
 * 获取短信盐
 * @param {object} data
 */
export function getSalt(data) {
  return request({
    url: "/public/salt",
    method: "post",
    data,
  });
}

/**
 *  发送短信
 * @param {object} data
 */
export function sendSms(data) {
  return request({
    url: "/public/get-sms",
    method: "post",
    data,
  });
}

/**
 * 图片上传
 */

export function uploadImg(data) {
  return request({
    url: "/cardealer/files/public",
    method: "post",
    data,
  });
}
//分期申请  java接口
export function fqSubmit(data) {
  return request({
    url: "/java2/cardealer/jdsale/apply-submit",
    method: "post",
    data,
  });
}
