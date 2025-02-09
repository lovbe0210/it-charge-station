import Vue from 'vue'

export default {

  /**
   * 获取偏好设置
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async getPreferenceSetting() {
    return await Vue.prototype.$request({
      url: "/in/preference/settings",
      method: 'GET'
    });
  },

  /**
   * 修改偏好设置
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async updatePreferenceSetting(preferenceSetting) {
    return await Vue.prototype.$request({
      url: "/in/preference/update",
      method: 'POST',
      data: preferenceSetting
    });
  }

}




