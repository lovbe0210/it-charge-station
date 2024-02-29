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
  import {BootstrapVue} from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  // 引入ViewUI样式和组件
  // import ViewUI from 'view-design'
  import {
    Dropdown, DropdownMenu, DropdownItem, Badge, Drawer, ColorPicker, Switch, Upload, Icon,
    Menu, MenuItem, Button, Input, Divider, Tree, List, Modal, Tabs, TabPane
  } from 'view-design'
  import 'view-design/dist/styles/iview.css'
  import {
    Tooltip, Card, Popover, Pagination, Tag, Select, Checkbox, Table, Radio, Popconfirm,
    Skeleton, Empty
  } from 'ant-design-vue'
  import commonUtil from "@/utils/common"
  // 引入弹幕模块
  import {vueBaberrage} from 'vue-baberrage'

  // 安装bootstrap和图标库
  Vue.use(BootstrapVue).use(infiniteScroll).use(vueBaberrage);
  Vue.component('Dropdown', Dropdown);
  Vue.component('DropdownMenu', DropdownMenu);
  Vue.component('DropdownItem', DropdownItem);
  Vue.component('Badge', Badge);
  Vue.component('Drawer', Drawer);
  Vue.component('ColorPicker', ColorPicker);
  Vue.component('i-switch', Switch);
  Vue.component('Upload', Upload);
  Vue.component('Icon', Icon);
  Vue.component('Menu', Menu);
  Vue.component('MenuItem', MenuItem);
  Vue.component('Input', Input);
  Vue.component('Button', Button);
  Vue.component('Divider', Divider);
  Vue.component('Tree', Tree);
  Vue.component('List', List);
  Vue.component('Modal', Modal);
  Vue.component('ListItem', List.Item);
  Vue.component('ListItemMeta', List.Item.Meta);
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  Vue.component('a-radio-group', Radio.Group);
  Vue.component('a-radio', Radio);
  Vue.component('a-tooltip', Tooltip);
  Vue.component('a-card', Card);
  Vue.component('a-card-meta', Card.Meta);
  Vue.component('a-popover', Popover);
  Vue.component('a-pagination', Pagination);
  Vue.component('a-tag', Tag);
  Vue.component('a-select', Select);
  Vue.component('a-select-option', Select.Option);
  Vue.component('a-checkbox', Checkbox);
  Vue.component('a-table', Table);
  Vue.component('a-popconfirm', Popconfirm);
  Vue.component('a-skeleton', Skeleton);
  Vue.component('a-empty', Empty);

  export default {
    name: 'App',
    data() {
      return {}
    },

    computed: {
      // 通过计算属性获取用户自定义设置主题
      customerSet: function () {
        return this.$store.state.customerSet
      }
    },
    created() {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.addEventListener('unload', e => this.unloadHandler(e))
      document.addEventListener('visibilitychange', e => this.handleVisibilityChange(e))
      // 在页面加载时读取localStorage里的状态信息加载到vuex中
      if (localStorage.getItem('store')) {
        // 删除空对象，避免覆盖默数据
        let storeData = JSON.parse(localStorage.getItem('store'));
        Object.keys(storeData).forEach(item => {
          if (storeData[item] === '' || storeData[item] === undefined || storeData[item] === null) {
            storeData.delete(storeData[item])
          }
          return storeData;
        })

        // 自定义主题状态初始化
        storeData.showCustomer = false;

        // 页面状态初始化
        // storeData.pageState = "init";

        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            storeData
          )
        )
      }

      this.$store.commit("updatePageState", "init");

      // 判断是手机页面还是pc页面
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        // 手机端
        this.$store.commit('isPhone', true)
      } else {
        // pc页面
        this.$store.commit('isPhone', false)
      }

    },
    watch: {
      // 开启深度监视，然后实时刷新自定义主题
      customerSet: {
        handler() {
          this.flushCustomerSet();
        },
        deep: true
      }
    },

    mounted() {
      // 加载背景
      commonUtil.flushCustomerSet(this.customerSet);

    },

    destroyed() {
      // 页面关闭时销毁监听
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.removeEventListener('unload', e => this.unloadHandler(e))
      document.removeEventListener('visibilitychange', e => this.handleVisibilityChange(e))
    },
    methods: {
      beforeunloadHandler() {
        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        // 兼容edge、chrome、firefox
        this.$store.commit("updatePageState", "flush");
        localStorage.setItem('store', JSON.stringify(this.$store.state))
        this._beforeUnload_time = new Date().getTime()
      },
      unloadHandler() {
        this.$store.commit("updatePageState", "close");
        // 火狐浏览器关闭时只会触发unload事件
        if (commonUtil.getBrowerAgent() === "Firefox") {
          this.$store.commit("updateBackgroundPlay", false);
          this.$store.commit("updateMusicInfo", {isPlay: false});
          localStorage.setItem('store', JSON.stringify(this.$store.state))
          return;
        }

        // 兼容edge、chrome，关闭时beforeunload和unload时间差较小，刷新时时间差较大
        this._gap_time = new Date().getTime() - this._beforeUnload_time
        //判断是窗口关闭还是刷新
        if (this._gap_time <= 5) {
          // 关闭窗口，将flag信息保存到localStorage中
          this.$store.commit("updatePageState", "close");
          this.$store.commit("updateBackgroundPlay", false);
          this.$store.commit("updateMusicInfo", {isPlay: false});
          localStorage.setItem('store', JSON.stringify(this.$store.state))
        }
      },

      flushCustomerSet() {
        commonUtil.flushCustomerSet(this.customerSet);
      },

      handleVisibilityChange() {
        let pageState = this.$store.state.pageState;
        if (document.visibilityState === "hidden" && pageState !== "flush") {
          // 如果是刷新后的回调事件，则不在进行操作
          this.$store.commit("updatePageState", "hidden");
          // 如果当前有音乐播放，则修改后台播放状态
          if (this.$store.state.musicInfo.isPlay) {
            this.$store.commit("updateBackgroundPlay", true);
          }
          // 页面变为后台状态，保存vuex中的数据，除过播放状态和自定义设置主题卡片状态
          // 注意此处为深拷贝，要不会改变store的状态
          let state = JSON.parse(JSON.stringify(this.$store.state));
          delete state.showCustomer;
          delete state.musicInfo;
          localStorage.setItem('store', JSON.stringify(state))
        } else if (document.visibilityState === "visible") {
          // 页面变为前台状态，从本地更新数据
          if (localStorage.getItem('store')) {
            // 删除空对象，避免覆盖默数据
            let storeData = JSON.parse(localStorage.getItem('store'));
            Object.keys(storeData).forEach(item => {
              // 保留自定义设置状态和音乐播放状态
              if (item === 'showCustomer' || item === 'musicInfo' ||
                storeData[item] === '' || storeData[item] === undefined || storeData[item] === null) {
                delete storeData[item];
              }
              return storeData;
            })
            this.$store.replaceState(
              Object.assign(
                {},
                this.$store.state,
                storeData
              )
            )
          }
          this.$store.commit("updatePageState", "show");
        }
      }
    }
  }
</script>

<style lang="less">
  // iconfont当前彩色图标单个文件只限制40个，因此需要分批引入
  @import './components/css/common-var.less';
  @import './assets/font_class/iconfont1.css';
  @import './assets/font_class/iconfont2.css';
  @import './assets/font_class/iconfont3.css';
  @import './assets/font_class/iconfont4.css';
  // 全局css
  // 为了支持在CSS中能调整大小，将box-sizing 中的 content-box 属性替换为 border-box，这样可以确保填充padding不会影响到元素的最终宽度计算，
  // 但会导致某些第三方软件（如 Google Maps 、 Google Custom Search Engine）出现问题。
  .selector-for-some-widget {
    box-sizing: content-box;
  }

  [class*="col"], [class*="row"], [class*="container"] {
    /*position: relative;*/
    min-height: 1px;
    padding-right: 0;
    padding-left: 0;
  }

  a.badge-secondary:focus, a.badge-info:focus, a.badge-light:focus {
    box-shadow: none;
  }

  .container {
    max-width: 1200px !important;
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
    /*font-family: "PingFang SC", Microsoft YaHei, Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;*/
    font-family: 'Chinese Quote', 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji';
    // 全局背景，可以是渐变色，可以是图片
    background: var(--background-color);
    background-image: var(--background-img);
    // 平铺占满全屏，效果取决于图片大小
    background-size: cover;
    // 固定在屏幕上，不随滚动轴滚动
    background-attachment: fixed;
  }

  // 全局css

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: @editor-button-color;
    background-color: @editor-button-color;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: @editor-button-color;
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: @editor-button-color;
  }
</style>
