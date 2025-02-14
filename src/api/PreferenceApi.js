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
  },

  /**
   * 更新音乐播放列表
   * @param musicList
   * @returns {Promise<*>}
   */
  async updateMusicPlayList(playList) {
    return await Vue.prototype.$request({
      url: "/in/music/list/update",
      method: 'POST',
      data: playList
    });
  },

  /**
   * 获取音乐播放列表
   * @param musicList
   * @returns {Promise<*>}
   */
  async getMusicPlayList() {
    return await Vue.prototype.$request({
      url: "/in/music/list/get",
      method: 'GET'
    });
  },

  /**
   * 添加音乐到播放列表
   * @param musicList
   * @returns {Promise<*>}
   */
  async addMusic2PlayList(playInfo) {
    return await Vue.prototype.$request({
      url: "/in/music/list/add",
      method: 'POST',
      data: playInfo
    });
  },

  /**
   * 删除音乐播放列表
   * @param musicList
   * @returns {Promise<*>}
   */
  async deleteMusicPlayList(playInfo) {
    return await Vue.prototype.$request({
      url: "/in/music/list/del",
      method: 'POST',
      data: playInfo
    });
  }

}




