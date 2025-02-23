import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import {Message} from 'view-design'

Message.config({
  top: 80,
  duration: 1.8
})

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$Message = Message
let fileService = '/oss'
Vue.prototype.fileService = fileService;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
