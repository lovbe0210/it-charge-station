import Vue from 'vue'

export default {
  /**
   * 获取用户信息
   * @param userId
   * @returns {Promise<void>}
   */
  /**
   * 获取用户信息
   * @param userId
   * @returns {Promise<void>}
   */
  async getUserInfo(userId) {
    return await Vue.prototype.$request({
      url: "/user/id/" + userId,
      method: 'GET'
    });
  },
  async getUserInfoByDomain(domain) {
    return await Vue.prototype.$request({
      url: "/user/domain/" + domain,
      method: 'GET'
    });
  },

  /**
   * 更新用户信息
   * @param userId
   * @returns {Promise<void>}
   */
  async updateUserInfo(formData) {
    return await Vue.prototype.$request.put("/user/update", formData);
  }
}




