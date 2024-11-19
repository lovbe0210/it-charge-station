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
  }
}




