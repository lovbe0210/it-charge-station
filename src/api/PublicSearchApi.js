import Vue from 'vue'

export default {

  /**
   * 获取范围搜索文章
   * @param targetId
   * @returns {Promise<void>}
   */
  async getScopeSearchResult(scopeSearchRequest) {
    return await Vue.prototype.$request({
      url: "/cps/search/scope",
      method: 'POST',
      data: scopeSearchRequest
    });
  },

  /**
   * 获取全局搜索
   * @param targetId
   * @returns {Promise<void>}
   */
  async getGlobalSearchResult(globalSearchRequest) {
    return await Vue.prototype.$request({
      url: "/cps/search/global",
      method: 'POST',
      data: globalSearchRequest
    });
  },

  /**
   * 获取用户搜索列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getGlobalSearchUserList(globalSearchRequest) {
    return await Vue.prototype.$request({
      url: "/cps/search/global/user",
      method: 'POST',
      data: globalSearchRequest
    });
  },

  /**
   * 获取专栏搜索列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getGlobalSearchColumnList(globalSearchRequest) {
    return await Vue.prototype.$request({
      url: "/cps/search/global/column",
      method: 'POST',
      data: globalSearchRequest
    });
  },

  /**
   * 获取用户搜索列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getGlobalSearchArticleList(globalSearchRequest) {
    return await Vue.prototype.$request({
      url: "/cps/search/global/article",
      method: 'POST',
      data: globalSearchRequest
    });
  }

}




