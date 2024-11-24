import Vue from 'vue'

export default {

  /**
   * 获取文档信息
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleInfo(uri) {
    return await Vue.prototype.$request({
      url: "/cps/article/" + uri,
      method: 'GET'
    });
  },

  /**
   * 获取所有公开文章信息（如果是作者获取所有状态，包括未发布的）
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleList(authorId) {
    return await Vue.prototype.$request({
      url: "/cps/article/list/" + authorId,
      method: 'GET'
    });
  },

  /**
   * 获取专栏下所有公开文章信息（如果是作者获取所有状态，包括未发布的）
   * @param userId
   * @returns {Promise<void>}
   */
  async getColumnDir(uri) {
    return await Vue.prototype.$request({
      url: "/cps/column/dir/" + uri,
      method: 'GET'
    });
  }
}




