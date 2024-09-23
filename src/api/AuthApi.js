export default {
  /**
   * 手机号+密码登录
   * @param _this
   * @param id
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

    let requestBody = {
      data: jsonData,
      version: 1.0
    }
    return await _this.$request({
      url: "/auth/mobile/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestBody)
    });
  }
}

