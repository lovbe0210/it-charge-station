import Vue from 'vue'

export default {

  /**
   * 获取消息设置
   * @param targetId
   * @returns {Promise<void>}
   */
  async getNoticeSetting() {
    return await Vue.prototype.$request({
      url: "/sl/notice/setting",
      method: 'GET'
    });
  },

  /**
   * 消息设置改动
   * @param targetId
   * @returns {Promise<void>}
   */
  async updateNoticeSetting(noticeConfig) {
    return await Vue.prototype.$request({
      url: "/sl/notice/setting/update",
      method: 'POST',
      data: noticeConfig
    });
  },

  /**
   * 获取未读消息统计
   * @param targetId
   * @returns {Promise<void>}
   */
  async getUnreadStatistic() {
    return await Vue.prototype.$request({
      url: "/sl/notice/unread/statistic",
      method: 'GET'
    });
  },

  /**
   * 获取评论回复通知
   * @param targetId
   * @returns {Promise<void>}
   */
  async getCommentNotice(pageInfo) {
    return await Vue.prototype.$request({
      url: "/sl/notice/comments",
      method: 'POST',
      data: pageInfo
    });
  }

}




