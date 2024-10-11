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
      url: "/contentProd/articleInfo/" + articleId,
      method: 'POST'
    });
  }
}




