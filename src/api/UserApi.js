import Vue from 'vue'
import {v4 as uuid} from "uuid";
import {encodeSign} from "@/utils/common"

export default {
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
  },

  /**
   * 获取账号绑定状态
   * @param userId
   * @returns {Promise<void>}
   */
  async getAccountSettings() {
    return await Vue.prototype.$request({
      url: "/user/account/settings",
      method: 'GET'
    });
  },

  /**
   * 发送短信/邮箱验证码
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async sendPayloadCode(_this, svScene, codeScene, svToken, payload) {
    let uniqueId = _this.$store.state.uniqueId;
    if (!uniqueId) {
      uniqueId = uuid();
      _this.$store.commit('setUniqueId', uniqueId);
    }
    let signObj = {
      sv_scene: svScene,
      unique_id: uniqueId,
      tn: svToken
    }
    let signStr = JSON.stringify(signObj);
    let sign = encodeSign(signStr);
    let jsonData = {
      sign: sign,
      scene: codeScene
    };
    let requestUri = "/user/mobile/code";
    if (payload.indexOf('@') !== -1) {
      // 发送邮箱验证码
      jsonData.email = payload;
      requestUri = "/user/email/code";
    } else {
      // 发送短信验证码
      jsonData.mobile = payload;
    }

    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 通过绑定邮箱或手机发送验证码
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async sendBindingPayloadCode(_this, svScene, codeScene, svToken) {
    let uniqueId = _this.$store.state.uniqueId;
    if (!uniqueId) {
      uniqueId = uuid();
      _this.$store.commit('setUniqueId', uniqueId);
    }
    let signObj = {
      sv_scene: svScene,
      unique_id: uniqueId,
      tn: svToken
    }
    let signStr = JSON.stringify(signObj);
    let sign = encodeSign(signStr);
    let jsonData = {
      sign: sign,
      scene: codeScene
    };
    return await Vue.prototype.$request({
      url: "/user/binding/code",
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 验证码使用
   * @param simpleCodeVerifyReq
   * @returns {Promise<*>}
   */
  async useVerifyCode(simpleCodeVerifyReq) {
    return await Vue.prototype.$request({
      url: "/user/code/verify",
      method: 'POST',
      data: simpleCodeVerifyReq
    });
  },

  /**
   * 修改账号信息
   * @param scene
   * @param newValue
   * @returns {Promise<*>}
   */
  async updateAccount(scene, newValue) {
    let sign = encodeSign(newValue);
    let updateAccountReq = {
      scene: scene,
      sign
    }
    return await Vue.prototype.$request({
      url: "/user/account/update",
      method: 'POST',
      data: updateAccountReq
    })
  },

  /**
   * 获取个人主页内容
   * @param contentId
   * @returns {Promise<*>}
   */
  async getDomainContent(contentId) {
    return await Vue.prototype.$request({
      url: "/user/dmcontent/" + contentId,
      method: 'GET'
    });
  },

  /**
   * 个人主页
   * @param domainContent
   * @returns {Promise<*>}
   */
  async updateDomainContent(domainContent) {
    return await Vue.prototype.$request({
      url: "/user/dmcontent/update",
      method: 'POST',
      data: domainContent
    })
  },

  async deleteDomainContent(contentId) {
    return await Vue.prototype.$request({
      url: "/user/dmcontent/delete",
      method: 'POST',
      data: { contentId }
    })
  }
}




