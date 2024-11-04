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
   * 获取文档用于编辑
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
  },

  /**
   * 文章发布
   * @param _this
   * @returns {Promise<void>}
   */
  async publishArticle(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/publish/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文章删除
   * @param _this
   * @returns {Promise<void>}
   */
  async deleteArticle(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/delete/" + articleId,
      method: 'POST'
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                                      专栏
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /**
   * 获取专栏列表
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnList(_this) {
    return await _this.$request({
      url: "/contentProd/columnList",
      method: 'POST'
    });
  },

  /**
   * 新建专栏
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async createColumn(_this, columnInfo) {
    return await _this.$request({
      url: "/contentProd/column/create",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 删除专栏
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async deleteColumn(_this, columnInfo) {
    return await _this.$request({
      url: "/contentProd/column/delete",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 获取专栏信息
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnInfo(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/" + columnId,
      method: 'POST'
    });
  },

  /**
   * 文档信息更新（包含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnInfo(_this, formData) {
    return await _this.$request.put("/contentProd/column/update", formData);
  }
}




