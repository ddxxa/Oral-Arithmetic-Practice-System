import { message } from "antd";
import axios from "axios";
const request = axios.create({
  baseURL: "http://47.108.238.92:8084",
  timeout: 5000,
});
request.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token") || "";
    req.headers.token = token;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (res) => {
    console.log("全局res", res);
    if (res.status === 200) {
      if (res.data.code === 200) {
        console.log("res.data", res.data);
        return res.data;
      } else {
        message.error(res.data.msg);
      }
    }
  },
  (error) => {
    console.log("error", error);
    message.error(error);
    return Promise.reject(error);
  }
);
export default request;
