import { v4 as uuid } from 'uuid';
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
  async getSvCookie(_this) {
    let uniqueId = _this.$store.state.uniqueId;
    let requestObj = {
      timestamp: Date.now(),
      unique_id: uniqueId
    }
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
    console.log(sign);

    let jsonData = {
      sign: sign,
      xa: uuid(),
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
   * 判断字符为字母或数字
   * @param code
   * @returns {boolean}
   */
  isLetterOrDigit(code) {
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
  }
}




