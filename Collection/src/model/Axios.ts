import axios from "../../node_modules/axios/index.js";
// 超时时间是5秒
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = true;
// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 基础url
// axios.defaults.baseURL = 后台接口地址;
axios.defaults.baseURL = "http://172.21.212.48:7777";

/**
 * 封装get方法
 */
export function get(url:string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

/**
 * 封装post方法
 */
export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
