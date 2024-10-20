export default {
  /**
   * 创建空白文档
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async createBlankDoc(_this) {
    return await _this.$request({
      url: "/contentProd/createBlankDoc",
      method: 'POST'
    });
  },

  /**
   * 创建空白文档
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleForEdit(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文档信息更新
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleInfo(_this, articleInfo) {
    return await _this.$request({
      url: "/contentProd/article/update",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文档信息更新
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleContent(_this, contentInfo) {
    return await _this.$request({
      url: "/contentProd/article/content",
      method: 'POST',
      data: contentInfo
    });
  }
}




