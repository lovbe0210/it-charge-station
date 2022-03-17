<template>
  <div id="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 无限滚动
  import infiniteScroll from 'vue-infinite-scroll'
  // 引入bootstrap所需
  import { BootstrapVue } from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  // 引入ViewUI样式和组件
  import ViewUI from 'view-design'
  import 'view-design/dist/styles/iview.css'

  // 安装bootstrap和图标库
  Vue.use(BootstrapVue).use(ViewUI).use(infiniteScroll)
  export default {
    name: 'App',
    data() {
      return {
        // 主題色
        // themeColor: '#8EC5FC',
        themeColor: 'rgba(255,255,255,0.89)',
        // 字体颜色
        fontColor: '#747474',
        // 标题颜色
        titleColor: '#343434',
        // 背景色
        backgroundColor: '#000000',
        // 背景图
        // backgroundImg: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'
        backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'
      }
    },
    created() {
      // 在页面加载时读取localStorage里的状态信息加载到vuex中
      if (localStorage.getItem('store')) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(localStorage.getItem('store'))
          )
        )
      }

      // 判断是手机页面还是pc页面
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        // 手机端
        this.$store.commit('isPhone', true)
      } else {
        // pc页面
        this.$store.commit('isPhone', false)
      }

      // 配置全局消息发送
      this.$Message.config({
        top: 50,
        duration: 2
      })

      // TODO 后期作为点赞收藏图标变化效果
      //.iconfont:hover {
      //  font-size: 100px;
      //}
    },
    mounted() {
      // 加载背景
      this.$refs.app.style.setProperty("--background-img", this.backgroundImg);
      this.$refs.app.style.setProperty("--background-color", this.backgroundColor);
      this.$refs.app.style.setProperty("--theme-color", this.themeColor);
      this.$refs.app.style.setProperty("--font-color", this.fontColor);
      this.$refs.app.style.setProperty("--title-color", this.titleColor);

      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.addEventListener('unload', e => this.unloadHandler(e))
    },
    destroyed() {
      // 页面关闭时销毁监听
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.removeEventListener('unload', e => this.unloadHandler(e))
    },
    methods: {
      beforeunloadHandler() {
        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        localStorage.setItem('store', JSON.stringify(this.$store.state))
        this._beforeUnload_time = new Date().getTime()
      },
      unloadHandler(e) {
        this._gap_time = new Date().getTime() - this._beforeUnload_time
        //判断是窗口关闭还是刷新
        if (this._gap_time <= 5) {
          // 关闭窗口，将flag信息保存到localStorage中
          localStorage.setItem('store', JSON.stringify(this.$store.state))
        }
      }
    }
  }
</script>

<style lang="less">
  @import './components/css/common-var.less';
  // 全局css
  // 为了支持在CSS中能调整大小，将box-sizing 中的 content-box 属性替换为 border-box，这样可以确保填充padding不会影响到元素的最终宽度计算，
  // 但会导致某些第三方软件（如 Google Maps 、 Google Custom Search Engine）出现问题。
  .selector-for-some-widget {
    box-sizing: content-box;
  }

  [class*="col"], [class*="row"], [class*="container"] {
    position: relative;
    min-height: 1px;
    padding-right: 0;
    padding-left: 0;
  }

  [class*="container"] {
    max-width: 1200px;
  }

  .col {
    width: 12px;
    flex-grow: 0;
  }

  // 统一设置各个主题背景色和边框圆角
  .enable-background {
    background: var(--theme-color);
    border-radius: 5px;
  }

  #app {
    // 全局字体
    font-family: "PingFang SC", Microsoft YaHei, Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
    // 全局背景，可以是渐变色，可以是图片
    background: var(--background-color);
    background-image: var(--background-img);
    // 平铺
    background-repeat: no-repeat;
    background-size: 100% auto;
    // 固定在屏幕上，不随滚动轴滚动
    background-attachment: fixed;
  }
</style>
