<template>
  <div class="fullscreen-wrapper">
    <b-container>
      <div class="form-box" ref="formBox">
        <div :class="['register-box', hidden ? 'hidden' : '']">
          <h1>register</h1>
          <input type="text" placeholder="用户名">
          <input type="email" placeholder="邮箱">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
          <button @click="register">注册</button>
        </div>
        <div :class="['login-box', hidden ? '' : 'hidden']">
          <h1>login</h1>
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="密码">
          <button @click="login">登陆</button>
        </div>
      </div>
      <div class="con-box left">
        <span class="iconfont icon-logo"></span>
        <h2>欢饮来到it充电站</h2>
        <img src="../assets/img/1.jpg" alt="">
        <p>已有账号</p>
        <button @click="toLogin">去登陆</button>
      </div>
      <div class="con-box right">
        <span class="iconfont icon-logo"></span>
        <h2>不停的充电，才能走的更远</h2>
        <img src="../assets/img/2.jpg" alt="">
        <p>没有账号？</p>
        <button @click="toRegister">去注册</button>
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
        this.$refs.formBox.style.setProperty("--translateX", "translateX(80%)")
      }
    }
  }
</script>

<style scoped lang="less">
  @import './css/common-var.less';
  @import "./css/login-register.less";
</style>
