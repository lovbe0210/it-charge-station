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
           :styles="{top: '20%'}"
           class-name="login-box">
      <div class="auth-body">
        <div class="login-body">
          <div class="site-flag">
            <div class="site-tips">
              <span class="t1">
                欢迎来到it充电站
              </span>
              <span class="t2" v-if="actionType === 2">
                —— 工作不息，充电不止
              </span>
              <span class="t3" v-if="actionType === 1">
                —— 永远电量满满，永远激情澎湃
              </span>
            </div>
            <img :src="require('@/assets/cy2.png')" alt="">
          </div>
          <div class="login-main">
            <h1 class="title" v-if="loginType === 1">账号密码登录</h1>
            <h1 class="title" v-if="loginType === 2">验证码登录 / 注册</h1>
            <div class="panel-pwd" v-if="loginType === 1">
              <div class="pwd-input-group">
                <Input v-model="account"
                       placeholder="请输入账号"
                       maxlength="20"
                       size="large"/>
                <div class="error-text">ssd</div>
                <Input v-model="password"
                       maxlength="30"
                       size="large"
                       type="password"
                       placeholder="请输入密码">
                  <span slot="suffix" @click="forgotPwd">忘记密码</span>
                </Input>
                <div class="error-text">sdsd</div>
              </div>
              <div class="button-group">
                <Button type="primary" size="large">
                  登录
                </Button>
                <Button size="large">
                  注册
                </Button>
              </div>
            </div>
            <div class="panel-verify" v-if="loginType === 2">
              <div class="verify-input-group">
                <Input v-model="account">
                  <Select v-model="countryCode"
                          slot="prepend"
                          placeholder="请输入邮箱或手机号"
                          style="width: 80px">
                    <Option value="+86">中国      +86</Option>
                    <Option value="+853">中国澳门    +853</Option>
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
              <div class="oauth-box">
                <span>其它登录：</span>
                <div class="oauth">
                  <div class="oauth-bg">
                    <span class="iconfont qq"></span>
                    <span class="iconfont wechat"></span>
                    <span class="iconfont github"></span>
                  </div>
                </div>
              </div>
              <span class="clickable" @click="changeLoginType">
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
        // 行为类型 1注册 2登录
        actionType: 1,
        // 国家区号
        countryCode: '+86',
        account: null,
        password: null
      }
    },
    methods: {
      forgotPwd() {
        console.log('忘记密码了啊咋办呢')
      },
      changeLoginType() {
        this.loginType = this.loginType === 1 ? 2 : 1;
      }
    }
  }
</script>

<style scoped lang="less">
  .auth-body {
    color: #262626;
    height: 380px;
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
        align-items: center;

        .site-tips {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          margin-bottom: 10px;

          .t1 {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .t2 {
            margin-left: 30px;
            color: #585A5A;
          }

          .t3 {
            margin-left: 5px;
            color: #585A5A;
          }
        }

        img {
          max-width: 100%;
          border-radius: 6px;
        }
      }

      .login-main {
        width: 60%;
        padding: 10px 10px 10px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          color: #262626;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .panel-pwd, .panel-verify {
          margin-bottom: 20px;
          height: 70%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .pwd-input-group, .verify-input-group {

          /deep/ .ivu-input-suffix {
            width: unset;
            display: flex;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
          }

          .error-text {
            color: #F44336;
            font-size: 12px;
            line-height: 20px;
            min-height: 20px;
            text-align: left;
            padding: 0 10px;
          }
        }

        .button-group {
          width: 100%;
          display: flex;
          flex-direction: row;

          button {
            width: 40%;
          }

          button:first-child {
            margin-right: 20%;
          }
        }

        .other-login-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          .oauth-box {
            display: flex;
            flex-direction: row;
            align-items: center;

            .oauth-bg {
              display: flex;
              align-items: center;

              .iconfont {
                font-size: 22px;
                line-height: 22px;
                margin-right: 5px;
              }
            }
          }

          .clickable {
            cursor: pointer;
          }
        }
      }
    }

    .agreement-box {
      text-align: center;
    }
  }
</style>
