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
   * 文档信息更新（不含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleInfo(_this, articleInfo) {
    return await _this.$request({
      url: "/contentProd/article/simpleUpdate",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文档信息更新（包含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleCover(_this, formData) {
    return await _this.$request.put("/contentProd/article/update", formData);
  },

  /**
   * 文档内容更新
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
  },

  /**
   * 获取文档正文
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getArticleContent(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/content/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 获取文档列表
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getMyArticleList(_this, requestEntity) {
    return await _this.$request({
      url: "/contentProd/articleList",
      method: 'POST',
      data: requestEntity
    });
  },

  /**
   * 获取菜单列表
   * @param _this
   * @returns {Promise<void>}
   */
  async getMenuList(_this) {
    return await _this.$request({
      url: "/contentProd/menu",
      method: 'POST'
    });
  },

  /**
   * 文章置顶/取消置顶
   * @param _this
   * @returns {Promise<void>}
   */
  async updateArticleTop(_this, articleInfo) {
    return await _this.$request({
      url: "/contentProd/article/setTop",
      method: 'POST',
      data: articleInfo
    });
  }
}




