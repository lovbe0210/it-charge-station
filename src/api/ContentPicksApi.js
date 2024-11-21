import Vue from 'vue'

export default {

  /**
   * 获取文档信息
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleInfo(articleUri) {
    return await Vue.prototype.$request({
      url: "/cps/article/" + articleUri,
      method: 'GET'
    });
  },

  /**
   * 获取所有公开文章信息（如果是作者获取所有状态，包括未发布的）
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleList(domain) {
    return await Vue.prototype.$request({
      url: "/cps/article/list/" + domain,
      method: 'GET'
    });
  }
}




