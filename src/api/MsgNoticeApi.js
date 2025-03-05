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
  },

  /**
   * 获取点赞消息通知
   * @param targetId
   * @returns {Promise<void>}
   */
  async getLikeNotice(pageInfo) {
    return await Vue.prototype.$request({
      url: "/sl/notice/likes",
      method: 'POST',
      data: pageInfo
    });
  },

  /**
   * 获取关注消息通知
   * @param targetId
   * @returns {Promise<void>}
   */
  async getFollowNotice(pageInfo) {
    return await Vue.prototype.$request({
      url: "/sl/notice/follows",
      method: 'POST',
      data: pageInfo
    });
  },

  /**
   * 开始新的私聊会话
   * @param targetId
   * @returns {Promise<void>}
   */
  async startMessageSession(sessionInfo) {
    return await Vue.prototype.$request({
      url: "/sl/chat/session/new",
      method: 'POST',
      data: sessionInfo
    });
  },

  /**
   * 获取会话列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getMsgSessionList() {
    return await Vue.prototype.$request({
      url: "/sl/chat/session/list",
      method: 'GET'
    });
  },

  /**
   * 上传聊天图片
   * @param targetId
   * @returns {Promise<void>}
   */
  async uploadFile(file64) {
    return await Vue.prototype.$request({
      url: "/st/upload",
      method: 'POST',
      data: file64
    });
  }
}




