import Vue from 'vue'
import commonUtil from "@/utils/common"
import {v4 as uuid} from "uuid";

export default {

  /**
   * 获取文档信息
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleInfo(uri) {
    return await Vue.prototype.$request({
      url: "/cps/article/" + uri,
      method: 'GET'
    });
  },

  /**
   * 阅读记录上报
   * @param _this
   * @param scrollTop
   * @param canScrollHeight
   * @param scrollHeight
   * @returns {Promise<*>}
   */
  async reportView(_this, scrollTop, canScrollHeight, scrollHeight) {
    let uniqueId = _this.$store.state.uniqueId;
    if (!uniqueId) {
      uniqueId = uuid();
      _this.$store.commit('setUniqueId', uniqueId);
    }
    // 计算简单签名
    let sourceData = {
      st: scrollTop,
      csh: canScrollHeight,
      sh: scrollHeight,
      targetId: _this.articleInfo.uid,
      unique_id: uniqueId
    }
    let encodeStr = commonUtil.encodeSign(JSON.stringify(sourceData));
    return await Vue.prototype.$request({
      url: "/cps/article/view?st=" + scrollTop + "&csh=" + canScrollHeight + "&sh=" + scrollHeight,
      method: 'GET',
      headers: {
        sign: encodeStr
      }
    })
  },

  /**
   * 获取所有公开文章信息（如果是作者获取所有状态，包括未发布的）
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleList(authorId) {
    return await Vue.prototype.$request({
      url: "/cps/article/list/" + authorId,
      method: 'GET'
    });
  },

  /**
   * 获取首页分类文章列表
   * @param categoryRequest
   * @returns {Promise<void>}
   */
  async getCategoryArticleList(categoryRequest) {
    return await Vue.prototype.$request({
      url: "/cps/article/category",
      method: 'POST',
      data: categoryRequest
    });
  },

  /**
   * 获取推荐列表
   * @param targetId
   * @returns {Promise<void>}
   */
  async getRecommendArticleList(recommendRequest) {
    return await Vue.prototype.$request({
      url: "/cps/article/recommend",
      method: 'POST',
      data: recommendRequest
    });
  },

  /**
   * 获取首页精选文章
   * @param targetId
   * @returns {Promise<void>}
   */
  async getRankArticle(recommendRequest) {
    return await Vue.prototype.$request({
      url: "/cps/article/rank",
      method: 'POST',
      data: recommendRequest
    });
  },

  /**
   * 获取首页精选文章(排行榜前3）
   * @param targetId
   * @returns {Promise<void>}
   */
  async getFeaturedArticle() {
    return await Vue.prototype.$request({
      url: "/cps/article/featured",
      method: 'GET'
    });
  },

  /**
   * 获取专栏下所有公开文章信息（如果是作者获取所有状态，包括未发布的）
   * @param userId
   * @returns {Promise<void>}
   */
  async getColumnDir(uri) {
    return await Vue.prototype.$request({
      url: "/cps/column/dir/" + uri,
      method: 'GET'
    });
  },

  /**
   * 获取首页精选专栏(排行榜前3）
   * @param targetId
   * @returns {Promise<void>}
   */
  async getFeaturedColumn() {
    return await Vue.prototype.$request({
      url: "/cps/column/featured",
      method: 'GET'
    });
  },

  /**
   * 获取个人主页公开专栏
   * @param userId
   * @returns {Promise<*>}
   */
  async getDomainPublicColumn(userId) {
    return await Vue.prototype.$request({
      url: "/cps/column/domain",
      method: 'POST',
      data: { userId }
    });
  },

  /**
   * 获取专栏排行榜
   * @returns {Promise<void>}
   */
  async getRankColumn(recommendRequest) {
    return await Vue.prototype.$request({
      url: "/cps/column/rank",
      method: 'POST',
      data: recommendRequest
    });
  },

  /**
   * 获取专栏排行榜
   * @returns {Promise<void>}
   */
  async getPublicColumn(recommendRequest) {
    return await Vue.prototype.$request({
      url: "/cps/column/public",
      method: 'POST',
      data: recommendRequest
    });
  },

  /**
   * 获取创作者排行榜
   * @returns {Promise<void>}
   */
  async getRankAuthor(recommendRequest) {
    return await Vue.prototype.$request({
      url: "/cps/author/rank",
      method: 'POST',
      data: recommendRequest
    });
  },

  /**
   * 获取首页优秀创作者(排行榜前3）
   * @param targetId
   * @returns {Promise<void>}
   */
  async getExcellentAuthor() {
    return await Vue.prototype.$request({
      url: "/cps/author/excellent",
      method: 'GET'
    });
  },

  /**
   * 获取收藏分组标签(带统计)
   * @returns {Promise<void>}
   */
  async getCollectTagCount() {
    return await Vue.prototype.$request({
      url: "/cps/collect/tags/count",
      method: 'GET'
    });
  },

  /**
   * 获取收藏分组标签(纯展示)
   * @returns {Promise<void>}
   */
  async getCollectTagList() {
    return await Vue.prototype.$request({
      url: "/cps/collect/tags/list",
      method: 'GET'
    });
  },

  /**
   * 收藏分组编辑
   * @returns {Promise<void>}
   */
  async createCollectTag(tagInfo) {
    return await Vue.prototype.$request({
      url: "/cps/collect/tag/edit",
      method: 'POST',
      data: tagInfo
    });
  },

  /**
   * 获取收藏分组标签
   * @returns {Promise<void>}
   */
  async deleteCollectTag(tagInfo) {
    return await Vue.prototype.$request({
      url: "/cps/collect/tag/delete",
      method: 'POST',
      data: tagInfo
    });
  },

  /**
   * 获取收藏内容列表
   * @returns {Promise<void>}
   */
  async getCollectList(queryMeta) {
    return await Vue.prototype.$request({
      url: "/cps/collect/list",
      method: 'POST',
      data: queryMeta
    });
  },

  /**
   * 获取收藏详情
   * @returns {Promise<void>}
   */
  async getCollectInfo(collectId) {
    return await Vue.prototype.$request({
      url: "/cps/collect/info/" + collectId,
      method: 'GET'
    });
  },

  /**
   * 获取浏览历史
   * @param targetId
   * @returns {Promise<void>}
   */
  async getBrowseHistoryList(browseHistoryPage) {
    return await Vue.prototype.$request({
      url: "/cps/history",
      method: 'POST',
      data: browseHistoryPage
    });
  }

}




