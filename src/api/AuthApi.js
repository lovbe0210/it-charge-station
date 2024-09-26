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
      password: _this.password
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
    let sign = this.encodeSign(requestObj);
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
   * 获取验证码cookie
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
    let sign = this.encodeSign(signObj);
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
  encodeSign(requestObj) {
    let requestStr = JSON.stringify(requestObj);
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




