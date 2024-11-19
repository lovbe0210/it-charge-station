import Vue from 'vue'

export default {
  /**
   * 获取用户信息
   * @param userId
   * @returns {Promise<void>}
   */
  async getUserInfo(userId) {
    let jsonData = {
      userId: userId
    }
    return await Vue.prototype.$request({
      url: "/user/userInfo",
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 更新用户信息
   * @param userId
   * @returns {Promise<void>}
   */
  async updateUserInfo(formData) {
    return await Vue.prototype.$request.put("/user/userInfo/update", formData);
  }
}




