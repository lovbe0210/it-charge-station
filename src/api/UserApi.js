export default {
  /**
   * 获取用户信息
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async getUserInfo(_this, userId) {
    let jsonData = {
      userId: userId
    }
    return await _this.$request({
      url: "/user/getUserInfo",
      method: 'POST',
      data: jsonData
    });
  }
}




