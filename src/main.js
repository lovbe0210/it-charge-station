import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import {Message} from 'view-design'

Message.config({
  top: 80,
  duration: 2
})

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$Message = Message
let fileService = 'http://10.2.2.15:9000'
// let fileService = 'http://[2409:8a62:4f5:6f91:20c:29ff:fe29:775f]:9000'
Vue.prototype.fileService = fileService;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
