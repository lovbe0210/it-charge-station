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
  },

  /**
   * 获取收藏分组标签(带统计)
   * @returns {Promise<void>}
   */
  async getCollectTagCount() {
    return await Vue.prototype.$request({
      url: "/cps/collect/tags/count",
      method: 'GET'
    });
  },

  /**
   * 获取收藏分组标签(纯展示)
   * @returns {Promise<void>}
   */
  async getCollectTagList() {
    return await Vue.prototype.$request({
      url: "/cps/collect/tags/list",
      method: 'GET'
    });
  },

  /**
   * 收藏分组编辑
   * @returns {Promise<void>}
   */
  async createCollectTag(tagInfo) {
    return await Vue.prototype.$request({
      url: "/cps/collect/tag/edit",
      method: 'POST',
      data: tagInfo
    });
  },

  /**
   * 获取收藏分组标签
   * @returns {Promise<void>}
   */
  async deleteCollectTag(tagInfo) {
    return await Vue.prototype.$request({
      url: "/cps/collect/tag/delete",
      method: 'POST',
      data: tagInfo
    });
  },

  /**
   * 获取收藏内容列表
   * @returns {Promise<void>}
   */
  async getCollectList(queryMeta) {
    return await Vue.prototype.$request({
      url: "/cps/collect/list",
      method: 'POST',
      data: queryMeta
    });
  },

  /**
   * 添加收藏/修改收藏分组
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async collectMark(collectTarget) {
    return await Vue.prototype.$request({
      url: "/cps/collect/mark",
      method: 'POST',
      data: collectTarget
    });
  },

  /**
   * 取消收藏
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async collectUnMark(collectTarget) {
    return await Vue.prototype.$request({
      url: "/cps/collect/unmark",
      method: 'POST',
      data: collectTarget
    });
  }
}




