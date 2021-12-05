import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeName: 'recommend'
  },

  // 直接操作state中的数据(commit)
  mutations: {
    /**
     * 修改body页面激活的route
     * @param state
     * @param value
     * @constructor
     */
    changeActiveRoute(state, value) {
      state.activeName = value
    }
  },

  // 间接操作state中的数据(dispatch)
  actions: {
  },
  modules: {
  }
})
