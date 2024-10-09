export default {
  /**
   * 创建空白文档
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async createBlankDoc(_this) {
    return await _this.$request({
      url: "/user/getUserInfo",
      method: 'POST',
      data: jsonData
    });
  }
}




