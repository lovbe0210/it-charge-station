import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 首页显示激活的菜单项
    activeName: 'recommend',
    // 手机页面的菜单栏的状态，true为打开，false为关闭，默认关闭
    showContext: false,
    // 自适应页面宽度
    isPhone: false
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
    }

  },

  // 间接操作state中的数据(dispatch)
  actions: {},
  modules: {}
})
