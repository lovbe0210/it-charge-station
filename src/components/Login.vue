<template>
  <div class="fullscreen-wrapper">
    <b-container>
      <div class="form-box" ref="formBox">
        <b-row class="logo">
          <span class="iconfont icon-logo"></span>
        </b-row>
        <b-row :class="['login-box', hidden ? 'hidden' : '']">
          <Tabs :animated="false">
            <TabPane label="密码登录">
              <Form :model="formdata" :rules="ruleValidate">
                <FormItem prop="username">
                  <Input type="text" size="large" style="width: 300px;box-shadow: none;" placeholder="请输入用户名" v-model="formdata.username" ref="inputWrapp1"></Input>
                </FormItem>
                <FormItem prop="passwd">
                  <Input type="password" size="large" style="width: 300px" placeholder="请输入密码" v-model="formdata.passwd" ref="inputWrapp2"></Input>
                </FormItem>
                <FormItem>
                  <Button type="success" size="large" style="width: 300px;" @click="loginSubmit(1)">登陆</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="免密登陆">
              <Form :model="formdata" :rules="ruleValidate">
                <FormItem prop="phoneNum">
                  <Input type="text" style="width: 300px" size="large" placeholder="请输入手机号码" v-model="formdata.phoneNum" ref="inputWrapp3"></Input>
                </FormItem>
                <FormItem prop="verifyCode">
                  <Row>
                    <Col>
                    <Input type="text" style="width: 135px;" size="large" placeholder="6位短信验证码" v-model="formdata.verifyCode" ref="inputWrapp4"></Input>
                    </Col>
                    <Col offset="4">
                    <Button size="large" @click="getVerifyCode">获取验证码</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem class="login-btn">
                  <Button type="success" size="large" style="width: 300px;" @click="loginSubmit(0)">登陆</Button>
                </FormItem>
              </Form>
            </TabPane>
            <b-row class="login-foot">
              <div class="aggregate-login">
                <span class="iconfont icon-qq"></span>
                <span class="iconfont icon-wechat"></span>
                <span class="iconfont icon-github"></span>
              </div>
              <div class="forget">
                <b-link>
                  忘记密码
                </b-link>
                <b-link>
                  无法验证
                </b-link>
              </div>
            </b-row>
          </Tabs>
        </b-row>
        <b-row :class="['register-box', hidden ? '' : 'hidden']">
          <Form :model="formdata" :rules="ruleValidate">
            <FormItem>
              <div class="quick-register">快速注册</div>
            </FormItem>
            <FormItem prop="registerFlag">
              <Input type="text" size="large" style="width: 300px;box-shadow: none;" placeholder="手机号/用户名" v-model="formdata.registerFlag" required ref="inputWrapp1"></Input>
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" size="large" style="width: 300px" placeholder="请输入密码" v-model="formdata.passwd" ref="inputWrapp2"></Input>
            </FormItem>
            <FormItem prop="confirmPasswd">
              <Input type="password" size="large" style="width: 300px" placeholder="请确认密码" v-model="formdata.confirmPasswd" ref="inputWrapp2"></Input>
            </FormItem>
            <FormItem>
              <Button type="success" size="large" style="width: 300px;" @click="registerSubmit">注册</Button>
            </FormItem>
          </Form>
        </b-row>
      </div>
      <div :class="['con-box', 'left', hidden ? 'hidden' : '']">

        <div class="logo-title">欢迎来到it充电站</div>
        <div class="blessL">——工作不息，充电不止</div>
        <div class="btn-foot">
          <span>没有账号？</span>
          <button @click="toRegister">快速注册</button>
        </div>
      </div>
      <div :class="['con-box', 'right', hidden ? '' : 'hidden']">
        <div class="logo-title">欢迎来到it充电站</div>
        <div class="blessR">——永远电量满满，永远激情澎湃</div>
        <div class="btn-foot">
          <span>已有账号？</span>
          <button @click="toLogin">去登录</button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LoginOrRegister',
  data() {
    return {
      hidden: false,
      formdata: {
        username: '',
        passwd: '',
        confirmPasswd: '',
        // 手机号登陆
        phoneNum: '',
        // 短信验证码
        verifyCode: '',
        // 注册标识，可能为手机号也可能为邮箱，也可能为其他用户名
        registerFlag: ''
      },
      // 验证规则
      ruleValidate: {
        username: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9]{4,16}$/,
            message: ' ',
            trigger: 'change'
          }
        ],
        passwd: [
          {
            required: true,
            message: ' ',
            trigger: 'change'
          }
        ],
        phoneNum: [
          {
            required: true,
            message: ' ',
            trigger: 'change',
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          }
        ],
        verifyCode: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        interest: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: 'Choose at least one hobby',
            trigger: 'change'
          },
          {
            type: 'array',
            max: 2,
            message: 'Choose two hobbies at best',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date',
            trigger: 'change'
          }
        ],
        time: [
          {
            required: true,
            type: 'string',
            message: 'Please select time',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    register() {
      // 注册
    },
    login() {
      // 登陆
    },
    toLogin() {
      this.hidden = false;
      this.$refs.formBox.style.setProperty('--translateX', 'translateX(0)');
    },
    toRegister() {
      this.hidden = true;
      this.$refs.formBox.style.setProperty('--translateX', 'translateX(-110%)');
    },
    loginSubmit(flag) {
      if (flag) {
        this.$Message.success('用户名登陆成功!');
      } else {
        this.$Message.success('手机号登陆成功!');
      }
    },
    registerSubmit() {
      this.$Message.success('注册成功!');
    },
    getVerifyCode() {
      this.$Message.success('验证码发送成功!');
    }
  },
  mounted() {
    // 去掉input输入框focus下的阴影
    let elArray = this.$refs;
    for (let key in elArray) {
      if (key.indexOf('inputWrapp') !== -1) {
        elArray[key].$el.children[1].style.setProperty('box-shadow', 'none');
      }
      if (key.indexOf('quickRegister')) {
        console.log(elArray[key]);
      }
    }
  }
};
</script>

<style scoped lang="less">
@import './css/common-var.less';
@import './css/login-register.less';
</style>
