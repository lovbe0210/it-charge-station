import {v4 as uuid} from 'uuid';
import {encodeSign} from "@/utils/common"
import Vue from "vue";

export default {
  /**
   * 手机号+密码登录
   * @param _this
   * @returns {Promise<[]>}
   */
  async payloadLogin(_this) {
    let payloadType = _this.account.indexOf("@");
    let requestUri = "/auth/mobile/login";
      let jsonData = {
      password: encodeSign(_this.password)
    };
    if (payloadType === -1) {
      jsonData.mobile = _this.account;
    } else {
      requestUri = "/auth/email/login";
      jsonData.email = _this.account;
    }

    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },
  /**
   * 手机号/邮箱+验证码
   * @param _this
   * @returns {Promise<[]>}
   */
  async verifyCodeLogin(_this) {
    let payloadType = _this.account.indexOf("@");
    let jsonData = {
      code: _this.verifyCode
    };
    let requestUri = "/auth/sms/login";
    if (payloadType === -1) {
      jsonData.mobile = _this.account;
    } else {
      requestUri = "/auth/email-code/login";
      jsonData.email = _this.account;
    }

    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 获取验证码cookie
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async getSvCookie(_this, svScene) {
    let uniqueId = _this.$store.state.uniqueId;
    if (!uniqueId) {
      uniqueId = uuid();
      _this.$store.commit('setUniqueId', uniqueId);
    }
    let requestObj = {
      sv_scene: svScene,
      xa: uuid(),
      unique_id: uniqueId,
      timestamp: Date.now()
    }
    let requestStr = JSON.stringify(requestObj);
    let sign = encodeSign(requestStr);
    let jsonData = {
      sign: sign,
      xt: uuid(),
      efy: Date.now()
    };

    return await Vue.prototype.$request({
      url: "/auth/svcookie",
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 发送短信/邮箱验证码
   * @param _this
   * @param id
   * @returns {Promise<[]>}
   */
  async sendPayloadCode(_this, svScene, svToken) {
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
      scene: svScene
    };
    let requestUri = "/user/mobile/code";
    if (_this.account.indexOf('@') !== -1) {
      // 发送邮箱验证码
      jsonData.email = _this.account;
      requestUri = "/user/email/code";
    } else {
      // 发送短信验证码
      jsonData.mobile = _this.account;
    }

    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 退出登录状态
   * @param _this
   * @returns {Promise<[]>}
   */
  async logout(_this) {
    let userInfo = _this.$store.state.userInfo;
    let requestUri = "/auth/logout";
    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      headers: {
        "icharge-rt": userInfo.rfToken
      }
    });
  },

  /**
   * 忘记密码/密码重置
   * @param _this
   * @returns {Promise<[]>}
   */
  async resetPassword(_this) {
    let jsonData = {
      password: encodeSign(_this.password),
      verifyCode: _this.verifyCode
    }
    if (_this.account.indexOf("@") !== -1) {
      jsonData.email = _this.account;
      jsonData.scene = 10;
    } else {
      jsonData.mobile = _this.account;
      jsonData.scene = 9;
    }
    let requestUri = "/user/reset/password";
    return await Vue.prototype.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 刷新token
   * @param rfToken
   * @returns {Promise<void>}
   */
  async refreshToken(rfToken) {
    return await Vue.prototype.$request({
      url: "/auth/t/refresh",
      method: "POST",
      headers: {
        "icharge-rt": rfToken
      }
    });
  }
}




