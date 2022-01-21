<template>
  <div class="fullscreen-wrapper">
    <b-container>
      <div class="form-box" ref="formBox">
        <div :class="['register-box', hidden ? 'hidden' : '']">
          <h1>注册账号</h1>
          <input type="text" placeholder="用户名">
          <input type="email" placeholder="邮箱">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
          <button @click="register">注册</button>
        </div>
        <div :class="['login-box', hidden ? '' : 'hidden']">
          <h1>账号登陆</h1>
          <input type="text" placeholder="请输入用户名" maxlength="250">
          <input type="password" placeholder="请输入密码" maxlength="250">
          <button @click="login">登陆</button>
          <button >忘记密码</button>
        </div>
      </div>
      <div class="con-box left">
        <span class="iconfont icon-logo"></span>
        <div class="logo-title">
          欢迎来到it充电站
        </div>
        <div class="bless">——永远电量满满，才能走的更远</div>
        <div>
          <span>已有账号？</span>
          <button @click="toLogin">去登陆</button>
        </div>
      </div>
      <div class="con-box right">
        <span class="iconfont icon-logo"></span>
        <div class="logo-title">
          欢迎来到it充电站
        </div>
        <div class="bless">——永远电量满满，才能走的更远</div>
        <div>
          <span>没有账号？</span>
          <button @click="toRegister">快速注册</button>
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
        hidden: true
      }
    },
    methods: {
      register() {
        // 注册
      },
      login() {
        // 登陆
      },
      toLogin() {
        this.hidden = true
        this.$refs.formBox.style.setProperty("--translateX", "translateX(0%)")
      },
      toRegister() {
        this.hidden = false
        this.$refs.formBox.style.setProperty("--translateX", "translateX(105%)")
      }
    }
  }
</script>

<style scoped lang="less">
  @import './css/common-var.less';
  @import "./css/login-register.less";
</style>
