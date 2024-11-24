import Vue from 'vue'

export default {
  /**
   * 创建空白文档
   * @param userId
   * @returns {Promise<void>}
   */
  async createBlankDoc() {
    return await Vue.prototype.$request({
      url: "/cpt/createdoc",
      method: 'POST'
    });
  },

  /**
   * 获取文档用于编辑
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleForEdit(articleUri) {
    return await Vue.prototype.$request({
      url: "/cpt/article/" + articleUri,
      method: 'GET'
    });
  },

  /**
   * 文档信息更新（不含封面图片）
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleInfo(articleInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/article/update/simple",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文档信息更新（包含封面图片）
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleCover(formData) {
    return await Vue.prototype.$request.put("/cpt/article/update", formData);
  },

  /**
   * 文档内容更新
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleContent(contentInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/article/content/update",
      method: 'POST',
      data: contentInfo
    });
  },

  /**
   * 获取文档正文
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getArticleContent(articleId) {
    return await Vue.prototype.$request({
      url: "/cpt/article/content/" + articleId,
      method: 'GET'
    });
  },

  /**
   * 获取文档列表
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getMyArticleList(requestEntity) {
    return await Vue.prototype.$request({
      url: "/cpt/article/list",
      method: 'POST',
      data: requestEntity
    });
  },

  /**
   * 获取菜单列表
   * @returns {Promise<void>}
   */
  async getMenuList() {
    return await Vue.prototype.$request({
      url: "/cpt/menu",
      method: 'POST'
    });
  },

  /**
   * 文章置顶/取消置顶
   * @returns {Promise<void>}
   */
  async updateArticleTop(articleInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/article/setop",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文章发布
   * @returns {Promise<void>}
   */
  async publishArticle(articleId) {
    return await Vue.prototype.$request({
      url: "/cpt/article/publish/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文章删除
   * @returns {Promise<void>}
   */
  async deleteArticle(articleId) {
    return await Vue.prototype.$request({
      url: "/cpt/article/delete/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文章批量操作
   * @returns {Promise<void>}
   */
  async articleBatchOperate(operateInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/article/operate/batch",
      method: 'POST',
      data: operateInfo
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                                      专栏
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /**
   * 获取专栏列表
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnList() {
    return await Vue.prototype.$request({
      url: "/cpt/column/list",
      method: 'GET'
    });
  },

  /**
   * 新建专栏
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async createColumn(columnInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/column/create",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 专栏-创建文章
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async createArticle(columnId) {
    return await Vue.prototype.$request({
      url: "/cpt/column/article/create",
      method: 'POST',
      data: {uid: columnId}
    });
  },

  /**
   * 专栏-复制文章
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async copyArticle(columnId, articleList) {
    return await Vue.prototype.$request({
      url: "/cpt/column/article/copy",
      method: 'POST',
      data: {
        columnId: columnId,
        articleList: articleList
      }
    });
  },

  /**
   * 删除专栏
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async deleteColumn(columnInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/column/delete",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 获取专栏信息
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnInfo(columnId) {
    return await Vue.prototype.$request({
      url: "/cpt/column/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 专栏信息更新（包含封面图片）
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnInfo(formData) {
    return await Vue.prototype.$request.put("/cpt/column/update", formData);
  },

  /**
   * 专栏目录更新
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnDir(dirInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/column/dir/update",
      method: 'POST',
      data: dirInfo
    });
  },

  /**
   * 获取专栏目录
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnDir(columnId) {
    return await Vue.prototype.$request({
      url: "/cpt/column/dir/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 获取专栏目录
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnArticle(columnId) {
    return await Vue.prototype.$request({
      url: "/cpt/column/article/list/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 专栏内容批量操作
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async columnBatchOperate(operateInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/column/article/operate/batch",
      method: 'POST',
      data: operateInfo
    });
  }
}




