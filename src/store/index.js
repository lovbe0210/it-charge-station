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
    }
  }
})
