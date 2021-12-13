<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 引入bootstrap所需
  import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  // 引入ViewUI样式和组件
  import ViewUI from 'view-design'
  // import { Menu, MenuItem, Submenu, List, ListItem, ListItemMeta } from 'view-design';
  import 'view-design/dist/styles/iview.css'

  // 安装bootstrap和图标库
  Vue.use(BootstrapVue).use(IconsPlugin).use(ViewUI)

  export default {
    name: 'App',
    created () {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem('store'))
          )
        )
      }
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
      // 判断是手机页面还是pc页面
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        // 手机端
        this.$store.commit('isPhone', true)
      } else {
        // pc页面
        this.$store.commit('isPhone', false)
      }
    }
  }
</script>

<style lang="less">
  // 全局css
  // 为了支持在CSS中能调整大小，将box-sizing 中的 content-box 属性替换为 border-box，这样可以确保填充padding不会影响到元素的最终宽度计算，
  // 但会导致某些第三方软件（如 Google Maps 、 Google Custom Search Engine）出现问题。
  .selector-for-some-widget {
    box-sizing: content-box;
  }
</style>
