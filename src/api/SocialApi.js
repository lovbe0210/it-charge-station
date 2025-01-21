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
   * 获取点赞列表
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
  async focusAttention(attentionRequest) {
    return await Vue.prototype.$request({
      url: "/sl/user/action/follow",
      method: 'POST',
      data: attentionRequest
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
  }

}




