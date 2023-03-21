import Vue from 'vue'
import axios from 'axios';
import vuex from '@/store/index';

// 创建axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  // 跨域请求是否提供凭证
  withCredentials: true
});

// axios拦截器
instance.interceptors.request.use(
  (config) => {
    let token = vuex.state.userInfo.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  // http接口成功回调
  response => {
    let result = response.data;
    if (result.code !== 200) {
      // 401 未授权
      if (result.code === 302) {
        // 本地登出操作
        Vue.$Message.error({
          content: '登陆信息已过期，请重新登陆！'
        });
        setTimeout(() => {
          vuex.dispatch('clearUserInfo');
          Vue.$router.push('/login');
        })
      } else if (result.code === 400) {
        Vue.$Message.error({
          content: result.msg
        });
      } else {
        return Promise.reject(result);
      }
    } else {
      return result;
    }
  },
  // http接口失败回调
  error => {
    return Promise.reject(error);
  }
);


export default instance;
