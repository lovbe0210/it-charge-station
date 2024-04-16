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
            <div class="panel">
              <h1 class="title">密码登录</h1>
              <div class="input-group">
                <div class="input-box">
                  <input name="loginPhoneOrEmail"
                         autocomplete="off"
                         placeholder="请输入邮箱/手机号（国际号码加区号）"
                         class="input account-input" maxlength="64">
                </div>
                <div class="error-text"></div>
                <div class="input-box">
                  <input name="loginPassword"
                         autocomplete="off"
                         type="password"
                         maxlength="64"
                         placeholder="请输入密码"
                         class="input login-password">
                  <span class="clickable find-password">
                  忘记密码
                </span>
                </div>
                <div class="error-text"></div>
              </div>
              <div class="button-group">
                <button type="button" class="btn btn-register">
                  注册
                </button>
                <button class="btn btn-login">
                  登录
                </button>
              </div>
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
        showLogin: false
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

        .site-tips {
          display: flex;
          flex-direction: column;
        }

        img  {
          max-width: 100%;
        }
      }
    }

    .agreement-box {
      color: var(--juejin-font-3);
      text-align: center;
    }
  }
</style>
