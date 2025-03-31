import axios from 'axios';
import vuex from '@/store/index';
import router from '@/router'
import AuthApi from "@/api/AuthApi";
import {Message} from 'view-design'

let isRefreshing = false; // 是否正在刷新 Token
let waitingQueue = []; // 请求队列，存储因 Token 过期而暂停的请求

// 执行队列中的请求
const processQueue = (error) => {
  waitingQueue.forEach(({config, resolve, reject}) => {
    if (error) {
      reject(error);
    } else {
      // 直接重试请求，不需要手动设置token，因为已经在cookie中了
      resolve(http(config));
    }
  });
  // 清空队列
  waitingQueue = [];
};

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
    if (config.method.toUpperCase() !== 'POST' || config?.data instanceof FormData) {
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
        return Promise.resolve(data);
      }
      // TODO 外部接口没有result
      if (data.result === undefined) {
        return Promise.resolve(data);
      }

      // 401 actoken过期
      if (data.code === 401) {
        const config = response.config;
        if (!isRefreshing) {
          isRefreshing = true;
          // 使用rftoken去刷新
          let userInfo = vuex.state.userInfo;
          if (!userInfo || !userInfo.rfToken) {
            Message.error('登陆信息已过期，请重新登陆！');
          }

          // 调用刷新token的接口
          return AuthApi.refreshToken(userInfo.rfToken)
            .then(() => {
              // 刷新token成功，此时新的token已经在cookie中了
              // 执行队列中的请求
              processQueue(null);
              // 重试当前请求
              return http(config);
            })
            .catch(err => {
              // refreshToken失败，可能是refreshToken过期
              if (err.response?.data?.code === 403) {
                Message.error('登陆信息已过期，请重新登陆！');
                vuex.commit('clearUserInfo');
                router.replace('/');
              }
              processQueue(err);
              return Promise.reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        } else {
          // 返回一个pending状态的Promise，加入队列
          return new Promise((resolve, reject) => {
            waitingQueue.push({
              config,
              resolve,
              reject
            });
          });
        }
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
