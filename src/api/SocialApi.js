import Vue from 'vue'

export default {


  /**
   * 添加收藏/修改收藏分组
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async collectMark(collectTarget) {
    return await Vue.prototype.$request({
      url: "/cps/collect/mark",
      method: 'POST',
      data: collectTarget
    });
  },

  /**
   * 取消收藏
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async collectUnMark(collectTarget) {
    return await Vue.prototype.$request({
      url: "/cps/collect/unmark",
      method: 'POST',
      data: collectTarget
    });
  },

  /**
   * 内容点赞/取消点赞
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async contentLikeMark(likeAction) {
    return await Vue.prototype.$request({
      url: "/sl/content/like",
      method: 'POST',
      data: likeAction
    });
  },

  /**
   * 获取评论列表
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async getCommentList(targetCommentInfo) {
    return await Vue.prototype.$request({
      url: "/sl/target/comments",
      method: 'POST',
      data: targetCommentInfo
    });
  },

  /**
   * 获取回复列表
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async getReplyList(targetCommentInfo) {
    return await Vue.prototype.$request({
      url: "/sl/comment/replies",
      method: 'POST',
      data: targetCommentInfo
    });
  },

  /**
   * 评论/回复
   * @param collectTarget
   * @returns {Promise<*>}
   */
  async replyComment(formData) {
    return await Vue.prototype.$request.put("/sl/target/comment", formData);
  },

  /**
   * 删除评论
   * @param targetId
   * @returns {Promise<void>}
   */
  async deleteCommentReply(targetId) {
    return await Vue.prototype.$request({
      url: "/sl/comment/delete/" + targetId,
      method: 'POST'
    });
  },

  /**
   * 关注/取消关注
   * @param targetId
   * @returns {Promise<void>}
   */
  async followAction(followRequest) {
    return await Vue.prototype.$request({
      url: "/sl/user/action/follow",
      method: 'POST',
      data: followRequest
    });
  },

  /**
   * 获取关注记录
   * @param targetId
   * @returns {Promise<void>}
   */
  async getFollowAction(targetUserId) {
    return await Vue.prototype.$request({
      url: "/sl/user/follow/" + targetUserId,
      method: 'GET'
    });
  },

  /**
   * 获取粉丝关注数
   * @param targetId
   * @returns {Promise<void>}
   */
  async getRelationshipCount(userId) {
    return await Vue.prototype.$request({
      url: "/sl/user/relationship/count/" + userId,
      method: 'GET'
    });
  },

  /**
   * 获取粉丝关注列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getRelationshipList(ship, pageInfo) {
    return await Vue.prototype.$request({
      url: "/sl/user/relationship/" + ship,
      method: 'POST',
      data: pageInfo
    });
  },

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
  }

}




