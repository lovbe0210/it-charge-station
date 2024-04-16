<template>
  <div>
    <!-- 未登录状态载体 -->
    <div @click="showLogin = true">
      <slot>Login</slot>
    </div>
    <Modal v-model="showLogin"
           :lock-scroll="true"
           :footer-hide="true"
           :mask-closable="false"
           :width="650"
           class-name="login-box">
      <div class="auth-body">
        <div class="login-body">
          <div class="site-flag">
            <div class="site-tips">
              <span>
                欢迎来到it充电站
              </span>
              <span>
                ——工作不息，充电不止
              </span>
              <span>
                ——永远电量满满，永远激情澎湃
              </span>
            </div>
            <img :src="require('@/assets/login_bacc.png')" alt="">
          </div>
          <div class="login-main">
            <div class="panel-pwd" v-if="loginType === 1">
              <h1 class="title">账号密码登录</h1>
              <div class="input-group">
                <Input v-model="account"
                       placeholder="请输入账号"
                       maxlength="20"
                       style="width: 250px" />
                <div class="error-text"></div>
                <Input v-model="password"
                       maxlength="50"
                       type="password"
                       password
                       placeholder="请输入密码"
                       style="width: 250px"/>
                <span>忘记密码</span>
                <div class="error-text"></div>
              </div>
              <div class="button-group">
                <Button type="primary">
                  登录
                </Button>
                <Button>
                  注册
                </Button>
              </div>
            </div>
            <div class="panel-verify" v-if="loginType === 2">
              <h1 class="title">验证码登录 / 注册</h1>
              <div class="input-group">
                <Input v-model="account">
                  <Select v-model="select1" slot="prepend" style="width: 80px">
                    <Option value="http">http://</Option>
                    <Option value="https">https://</Option>
                  </Select>
                </Input>
                <div class="error-text"></div>
                <div class="input-box">
                  <input autocomplete="off"
                                              name="registerSmsCode" maxlength="4"
                                              placeholder="请输入验证码" class="input">
                  <button class="send-vcode-btn">
                    获取验证码
                  </button>
                </div>
                <div class="error-text"></div>
              </div>
              <button class="btn">
                登录 / 注册
              </button>
            </div>
            <div class="other-login-box">
              <div class="oauth-box"><span>其它登录：</span>
                <div class="oauth">
                  <div class="oauth-bg">
                    QQ 微信 Github
                  </div>
                </div>
              </div>
              <span class="clickable">
              验证码登录
              </span>
            </div>
          </div>
        </div>
        <div class="agreement-box">
          注册登录即表示同意
          <a href="/terms" target="_blank">用户协议</a>
          和
          <a href="/privacy" target="_blank">隐私政策</a>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "AuthModal",
    data() {
      return {
        showLogin: false,
        // 登录类型：1 密码登录， 2 验证码登录
        loginType: 1,
        account: null,
        password: null
      }
    }
  }
</script>

<style scoped lang="less">
  .auth-body {
    height: 450px;
    max-width: 100%;
    font-size: 14px;
    padding: 10px 15px;
    box-sizing: border-box;

    .login-body {
      display: flex;
      flex-direction: row;
      height: 95%;

      .site-flag {
        height: 100%;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .site-tips {
          display: flex;
          flex-direction: column;
        }

        img {
          max-width: 100%;
        }
      }

      .login-main {
        width: 60%;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #262626;
          margin: 0 0 1.33rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    .agreement-box {
      color: var(--juejin-font-3);
      text-align: center;
    }
  }
</style>
