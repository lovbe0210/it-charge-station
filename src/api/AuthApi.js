import {v4 as uuid} from 'uuid';
import base64 from 'base-64';

export default {
  /**
   * 手机号+密码登录
   * @param _this
   * @returns {Promise<[]>}
   */
  async payloadLogin(_this) {
    let payloadType = _this.account.indexOf("@");
    let jsonData = {
      password: this.encodeSign(_this.password)
    };
    if (payloadType === -1) {
      jsonData.mobile = _this.account;
    } else {
      jsonData.email = _this.account;
    }

    return await _this.$request({
      url: "/auth/mobile/login",
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
    if (payloadType === -1) {
      jsonData.mobile = _this.account;
    } else {
      jsonData.email = _this.account;
    }

    return await _this.$request({
      url: "/auth/sms/login",
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
    let sign = this.encodeSign(requestStr);
    let jsonData = {
      sign: sign,
      xt: uuid(),
      efy: Date.now()
    };

    return await _this.$request({
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
    let sign = this.encodeSign(signStr);
    let jsonData = {
      sign: sign,
      scene: svScene
    };
    let requestUri = "/auth/mobile/code";
    if (_this.account.indexOf('@') !== -1) {
      // 发送邮箱验证码
      jsonData.email = _this.account;
      requestUri = "/auth/email/code";
    } else {
      // 发送短信验证码
      jsonData.mobile = _this.account;
    }

    return await _this.$request({
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

    let jsonData = {
      rfToken: userInfo.rfToken
    }
    let requestUri = "/auth/logout";
    return await _this.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },

  /**
   * 忘记密码/密码重置
   * @param _this
   * @returns {Promise<[]>}
   */
  async resetPassword(_this) {
    let jsonData = {
      password: this.encodeSign(_this.password),
      verifyCode: _this.verifyCode
    }
    if (_this.account.indexOf("@") !== -1) {
      jsonData.email = _this.account;
      jsonData.scene = 1;
    } else {
      jsonData.mobile = _this.account;
      jsonData.scene = 1;
    }

    let requestUri = "/user/reset/password";
    return await _this.$request({
      url: requestUri,
      method: 'POST',
      data: jsonData
    });
  },





  /**
   * 判断字符为字母或数字
   * @param code
   * @returns {boolean}
   */
  isLetterOrDigit(code) {
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
  },

  /**
   * 制作简易签名
   * @param requestObj
   * @returns {string}
   */
  encodeSign(requestStr) {
    let encodeStr = base64.encode(requestStr);
    let charArr = Array.from(encodeStr);
    // 简单转码
    for (let i = 0; i < charArr.length; i++) {
      let uniCode = charArr[i].charCodeAt(0);
      let newChar = uniCode ^ 1;
      if (this.isLetterOrDigit(newChar)) {
        charArr[i] = String.fromCharCode(newChar);
      }
    }
    let sign = charArr.join('');
    return sign;
  }
}




