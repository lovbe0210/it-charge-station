import Vue from 'vue'
import axios from 'axios';
import vuex from '@/store/index';

// 创建axios实例
const http = axios.create({
  baseURL: '/api',
  timeout: 30000,
  // 跨域请求是否提供凭证 TODO 生产环境需要改为true。如果withCredentials为true，则要求解决跨域时的Origin设置为具体的域名，不能为*
  withCredentials: false
});

// axios拦截器
http.interceptors.request.use(
  (config) => {
    let token = vuex.state.userInfo.token;
    if (token) {
      config.headers.token = "7a1421007337453da5df9fb348fb605f";
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

http.interceptors.response.use(
  // http接口成功回调
  response => {
    let status = response.status;
    let data = response.data;
    if (status === 200 && data !== null) {
      // http请求成功，获取server返回的数据
      if (data.result) {
        return Promise.resolve(data);
      }
      // 401 actoken过期
      if (data.code === 401) {
        // 使用rftoken去刷新 TODO
        console.log("actoken过期了。。。")


      } else if (data.code === 402) {
        // 如果rftoken也过期，那就直接重新登录了
        console.log("rftoken过期了。。。")
        Vue.$Message.error({
          content: '登陆信息已过期，请重新登陆！'
        });
        // 本地登出操作
        setTimeout(() => {
          vuex.dispatch('clearUserInfo');
          Vue.$router.push('/login');
        })
      } else {
        // 业务系统错误
        return Promise.reject(data);
      }
    } else {
      // http请求错误或服务器返回空
      return Promise.reject(response);
    }
  },
  // http接口失败回调
  error => {
    return Promise.reject(error);
  }
);

export default http;
