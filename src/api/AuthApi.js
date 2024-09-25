import { v4 as uuid } from 'uuid';
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
    let jsonData = {
      sign: _this.password,
      xa: uuid(),
      xt: uuid(),
      efy: Date.now()
    };

    return await _this.$request({
      url: "/auth/svcookie",
      method: 'POST',
      data: jsonData
    });
  }
}




