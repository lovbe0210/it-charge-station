<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import infiniteScroll from 'vue-infinite-scroll'
  // 引入bootstrap所需
  import { BootstrapVue, IconsPlugin, BIcon } from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
  // 引入ViewUI样式和组件
  import ViewUI from 'view-design'
  // import { Menu, MenuItem, Submenu, List, ListItem, ListItemMeta } from 'view-design';
  import 'view-design/dist/styles/iview.css'

  // 安装bootstrap和图标库
  Vue.use(BootstrapVue).use(IconsPlugin).use(ViewUI).use(infiniteScroll)
  Vue.component('BIcon', BIcon)
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
    },

    mounted () {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.addEventListener('unload', e => this.unloadHandler(e))
    },
    destroyed () {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.removeEventListener('unload', e => this.unloadHandler(e))
    },
    methods: {
      beforeunloadHandler () {
        this._beforeUnload_time = new Date().getTime()
      },
      unloadHandler (e) {
        this._gap_time = new Date().getTime() - this._beforeUnload_time
        debugger
        //判断是窗口关闭还是刷新
        if (this._gap_time <= 5) {
          //如果是登录状态，关闭窗口前，移除用户
          if (!this.showLoginButton) {
            // 1. 退出登录
            // 2. 数据持久化
          }
        }
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

  [class*="col-"] {
    position: relative;
    min-height: 1px;
    padding-right: 10px;
    padding-left: 15px;
  }

  body {
    //font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    font-family: "PingFang SC", Microsoft YaHei, Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
    background-color: #F4F5F7;
  }

</style>
