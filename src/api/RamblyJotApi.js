export default {
  /**
   * 创建空白文档
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async saveRamblyJot(_this, ramblyJotInfo) {
    return await _this.$request({
      url: "/contentProd/ramblyjot/create",
      method: 'POST',
      data: ramblyJotInfo
    });
  },

  /**
   * 获取文档用于编辑
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async getRamblyJotInfo(_this, ramblyJotId) {
    return await _this.$request({
      url: "/contentProd/ramblyjot/" + ramblyJotId,
      method: 'POST'
    });
  },

  /**
   * 获取随笔列表
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getMyRamblyJotList(_this) {
    return await _this.$request({
      url: "/contentProd/ramblyjot/list",
      method: 'POST'
    });
  },

  /**
   * 随笔删除
   * @param _this
   * @returns {Promise<void>}
   */
  async deleteRamblyJot(_this, ramblyJotId) {
    return await _this.$request({
      url: "/contentProd/ramblyjot/delete/" + ramblyJotId,
      method: 'POST'
    });
  },

  /**
   * 随笔信息更新 只允许修改可见范围
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateRamblyJot(_this, ramblyJot) {
    return await _this.$request({
      url: "/contentProd/ramblyjot/update",
      method: 'POST',
      data: ramblyJot
    });
  },

  /**
   * 专栏目录更新
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnDir(_this, dirInfo) {
    return await _this.$request({
      url: "/contentProd/column/dir/update",
      method: 'POST',
      data: dirInfo
    });
  },

  /**
   * 获取专栏目录
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnDir(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/dir/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 获取专栏文章
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnArticle(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/articleList/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 专栏内容批量操作
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async columnBatchOperate(_this, operateInfo) {
    return await _this.$request({
      url: "/contentProd/column/batchOperate",
      method: 'POST',
      data: operateInfo
    });
  }
}




