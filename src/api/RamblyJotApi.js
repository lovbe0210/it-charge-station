import Vue from 'vue'

export default {
  /**
   * 创建随笔信息
   * @param userId
   * @returns {Promise<void>}
   */
  async saveRamblyJot(ramblyJotInfo) {
    return await Vue.prototype.$request({
      url: "/cpt/ramblyjot/create",
      method: 'POST',
      data: ramblyJotInfo
    });
  },

  /**
   * 获取随笔内容
   * @param userId
   * @returns {Promise<void>}
   */
  async getRamblyJotInfo(ramblyJotId) {
    return await Vue.prototype.$request({
      url: "/cps/ramblyjot/" + ramblyJotId,
      method: 'GET'
    });
  },

  /**
   * 获取随笔列表
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getMyRamblyJotList() {
    return await Vue.prototype.$request({
      url: "/cpt/ramblyjot/list",
      method: 'POST'
    });
  },

  /**
   * 获取公开随笔列表
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getPublicRamblyJotList(essayListRequest) {
    return await Vue.prototype.$request({
      url: "/cps/ramblyjot/list",
      method: 'POST',
      data: essayListRequest
    });
  },

  /**
   * 随笔删除
   * @returns {Promise<void>}
   */
  async deleteRamblyJot(ramblyJotId) {
    return await Vue.prototype.$request({
      url: "/cpt/ramblyjot/delete/" + ramblyJotId,
      method: 'POST'
    });
  },

  /**
   * 随笔信息更新 只允许修改可见范围
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateRamblyJot(ramblyJot) {
    return await Vue.prototype.$request({
      url: "/cpt/ramblyjot/update",
      method: 'POST',
      data: ramblyJot
    });
  }

}




