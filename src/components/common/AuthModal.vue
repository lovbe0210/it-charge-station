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
                       class="account"
                       placeholder="请输入邮箱/手机号（国际号码加区号如+86）"
                       @on-change="checkAccount('account')"
                       maxlength="20"/>
                <div class="error-text account-error">{{accountError ? '请输入正确的手机号或邮箱' : ''}}</div>
                <Input v-model="password"
                       maxlength="30"
                       type="password"
                       placeholder="请输入密码">
                  <span slot="suffix" @click="forgotPwd">忘记密码</span>
                </Input>
                <div class="error-text"></div>
              </div>
              <div class="button-group">
                <Button type="primary" size="large">
                  登录
                </Button>
                <Button size="large" @click="changeLoginType">
                  注册
                </Button>
              </div>
            </div>
            <div class="panel-verify" v-if="loginType === 2">
              <div class="verify-input-group">
                <Input v-model="account"
                       placeholder="请输入邮箱/手机号（国际号码加区号如+86）">
                </Input>
                <div class="error-text account-error">{{accountError ? '请输入正确的手机号或邮箱' : ''}}</div>
                <Input v-model="verifyCode"
                       placeholder="请输入验证码">
                  <span slot="suffix" @click="getVerifyCode">获取验证码</span>
                </Input>
                <div class="error-text">{{verifyCodeError ? '请输入正确的验证码' : ''}}</div>
              </div>
              <Button size="large" type="primary" @click="login">
                登录 / 注册
              </Button>
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
    <Modal v-model="showSliderValidate"
           :lock-scroll="true"
           :footer-hide="true"
           :mask-closable="false"
           :width="650"
           :styles="{top: '20%'}"
           class-name="login-box">
      <div style="height: 350px;">
        <span>请先完成滑块验证</span>
        <slider-validation @validate="validate"></slider-validation>
      </div>
    </Modal>
  </div>
</template>

<script>
  import SliderValidation from "@/components/common/SliderValidation";

  export default {
    name: "AuthModal",
    data() {
      return {
        showLogin: false,
        showSliderValidate: false,
        // 登录类型：1 密码登录， 2 验证码登录
        loginType: 1,
        // 行为类型 1注册 2登录
        actionType: 1,
        accountError: false,
        verifyCodeError: false,
        // 国家区号
        account: null,
        password: null,
        verifyCode: null,
        sliderValidateResult: false
      }
    },
    components: {
      SliderValidation
    },
    methods: {
      forgotPwd() {
        console.log('忘记密码了啊咋办呢')
      },
      changeLoginType() {
        this.loginType = this.loginType === 1 ? 2 : 1;
      },
      validate() {
        this.sliderValidateResult = true;
        this.showSliderValidate = false;
      },
      getVerifyCode() {
        /*if (!this.sliderValidateResult) {
          this.$Message.error("请先完成滑块验证")
        }*/
        this.showSliderValidate = true;
      },
      login() {
        if (this.loginType === 1) {
          this.$Message.success('手机号/邮箱登陆成功!')
        } else {
          this.$Message.success('验证码登陆成功!')
        }
        // 保存token到store中
        let userInfo = {
          token: 'FKDMDK34D34DFGDFG45DE32DGH4G61AS',
          uid: 0,
          username: '张三'
        }

        // 延时关闭登录窗口
        setTimeout(() => {
          this.showLogin = false;
          this.$store.commit('login', userInfo)
        }, 1000)
      },
      checkAccount() {
        // 校验为邮箱和国际手机号码

      }
    }
  }
</script>

<style scoped lang="less">
  .auth-body {
    color: #262626;
    height: 340px;
    max-width: 100%;
    font-size: 14px;
    padding: 0 15px;
    margin: 5px 0;
    box-sizing: border-box;

    .login-body {
      display: flex;
      flex-direction: row;

      .site-flag {
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
            font-size: 18px;
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
        padding: 8px 10px 0 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          color: #262626;
          font-size: 17px;
          font-weight: 500;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        /deep/ .ivu-input {
          height: 40px;
        }

        .drag-verify {
          margin-bottom: 20px;
        }

        .panel-pwd, .panel-verify {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .pwd-input-group, .verify-input-group {

          .ivu-input-wrapper {
            margin-bottom: 5px;
          }

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
            margin-bottom: 10px;
            text-align: left;
            padding: 0 10px;
          }
        }

        .button-group {
          width: 100%;
          display: flex;
          flex-direction: row;

          button {
            width: 45%;
          }

          button:first-child {
            margin-right: 10%;
          }
        }

        .other-login-box {
          width: 100%;
          margin-top: 5px;
          display: flex;
          line-height: 30px;
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
      margin-top: 15px;
    }
  }
</style>
