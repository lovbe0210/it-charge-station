import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      token: '06ba1e5d8dcd4bf7b27ed10c6a202766'
    },
    // 首页显示激活的菜单项
    activeName: 'recommend',
    // 手机页面的菜单栏的状态，true为打开，false为关闭，默认关闭
    showContext: false,
    // 自适应页面宽度
    isPhone: false,
    // 首页的flag内容
    flagContent: {
      timestamp: new Date().getTime(),
      content: ''
    },
    customerSet: {
      // 主題色
      themeColor: 'rgba(255,255,255,0.89)',
      // 字体颜色
      fontColor: '#747474',
      // 标题颜色
      titleColor: '#343434',
      // 背景图(可以设置渐变色和图片两种，渐变色也可以设置纯色，只要起始色和结束色相同即可)
      // backgroundImg: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'
      backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'
    }
  },

  // 直接操作state中的数据(commit)
  mutations: {
    /**
     * 修改body页面激活的route
     * @param state
     * @param value
     */
    changeActiveRoute (state, value) {
      state.activeName = value
    },
    /**
     * 修改手机页面的菜单栏的状态
     * @param state
     * @param value
     */
    changeShowContext (state, value) {
      state.showContext = value
    },
    /**
     * 修改页面的显示效果，true表示为手机页面，false表示pc页面
     * @param state
     * @param value
     */
    isPhone (state, value) {
      state.isPhone = value
    },
    /**
     * 更新首页的flag内容
     * @param state
     * @param value
     */
    editFlagContent(state, value) {
      state.flagContent.content = value
    },
    /**
     * 退出登录
     * @param state
     * @param value
     */
    clearUserInfo (state, value) {
      state.userInfo = {}
    },
    /**
     * 登录，保存userinfo
     * @param state
     * @param value
     */
    login (state, value) {
      state.userInfo = value
    },
    /**
     * 自定义主题，注意这里的传参必须是一个对象
     * @param state
     * @param value
     */
    customerSet (state, value) {
      state.customerSet = Object.assign(state.customerSet, value);
    }
  }
})
