import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import {Message} from 'view-design'
import config from '../vue.config.js';

Message.config({
  top: 80
})

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$Message = Message
Vue.prototype.fileService = config.fileService


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
