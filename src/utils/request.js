import Vue from 'vue'
import axios from 'axios';
import vuex from '@/store/index';
import router from '@/router'
import AuthApi from "@/api/AuthApi";
import {Message} from 'view-design'

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
    // let token = vuex.state.userInfo.token;
    // if (token) {
    //   config.headers.token = "7a1421007337453da5df9fb348fb605f";
    // }

    if (config.method.toUpperCase() !== 'POST') {
      return config;
    }
    config.headers['Content-Type'] = 'application/json';
    let requestData = config.data;
    if (requestData) {
      config.data = {
        data: requestData,
        version: "1.0"
      }
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
        return Promise.resolve(data.data);
      }
      // 401 actoken过期
      if (data.code === 401) {
        // 使用rftoken去刷新
        let userInfo = vuex.state.userInfo;
        if (!userInfo || !userInfo.rfToken) {
          Message.error('登陆信息已过期，请重新登陆！');
        }
        AuthApi.refreshToken(new Vue(), userInfo.rfToken);
      } else if (data.code === 403) {
        // 如果rftoken也过期，那就直接重新登录了
        Message.error('登陆信息已过期，请重新登陆！');
        // 本地登出操作
        setTimeout(() => {
          vuex.commit('clearUserInfo');
          router.replace('/');
        })
      } else {
        // 业务系统错误
        Message.error(data.message);
      }
    } else {
      // http请求错误或服务器返回空
      Message.error('系统错误，请稍后再试');
    }
  },
  // http接口失败回调
  () => {
    // return Promise.reject(error);
    Message.error('网络连接错误，请稍后再试');
  }
);

export default http;
