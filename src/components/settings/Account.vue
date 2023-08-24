<template>
  <div class="layout-module_account" ref="menuContainer">
    <h1 class="setting-title">账户管理</h1>
    <h2 class="setting-subtitle">账户绑定</h2>
    <div class="settings-form">
      <div class="mobile-setting-form form-item">
        <span class="iconfont icon-account-completed"></span>
        <div class="form-content">
          <p>手机号码</p>
          <p class="tip">153******57</p>
        </div>
        <button type="button" class="control-button" @click="showModal = true">
          <span>更改</span>
        </button>
      </div>
      <div class="email-setting-form form-item">
        <span class="iconfont icon-account-unComplete"></span>
        <div class="form-content">
          <p>邮箱</p>
          <p class="tip">未绑定，绑定后当你手机号不可用时，可通过邮箱验证更换手机号</p>
        </div>
        <button type="button" class="control-button">
          <span>绑定</span>
        </button>
      </div>
      <div class="password-setting-form form-item">
        <span class="iconfont icon-account-completed"></span>
        <div class="form-content">
          <p>账户密码</p>
          <p class="tip">已设置，可通过账户密码登录</p>
        </div>
        <button type="button" class="control-button">
          <span>更改</span>
        </button>
      </div>
      <div class="domain-setting-form form-item">
        <span class="iconfont icon-account-completed"></span>
        <div class="form-content">
          <p>个人路径</p>
          <p class="tip">https://www.yuque.com/lovbe0210</p>
        </div>
        <button type="button" class="control-button">
          <span>更改</span>
        </button>
      </div>
      <div class="thirdAccount-setting-form">
        <h2 class="setting-subtitle">绑定第三方账户</h2>
        <span class="subtitle-tip">绑定后通过第三方应用快速扫码登录</span>
        <div class="third-binding-list">
          <div class="third-binding-item">
                <span class="bind-text">
                  <span class="iconfont icon-qq"></span>
                  QQ
                </span>
            <a class="bind-btn">绑定</a>
          </div>
          <div class="third-binding-item">
                <span class="bind-text">
                  <span class="iconfont icon-wechat"></span>
                  微信
                </span>
            <a class="bind-btn">绑定</a>
          </div>
          <div class="third-binding-item">
                <span class="bind-text">
                  <span class="iconfont icon-zhifubao"></span>
                  支付宝
                </span>
            <a class="bind-btn">解绑</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal">
      <Modal v-model="showModal" width="400" :lock-scroll="false"
             :footer-hide="true" :mask-closable="false"
             class-name="account-set-modal">
        <div class="header">
          <span>身份验证</span>
        </div>
        <p class="warn">
          <span>为了你的账户安全，请先验证身份。</span>
        </p>
        <a-select class="select-option"
                  size="large"
                  :dropdownMatchSelectWidth="true"
                  :defaultActiveFirstOption="false"
                  :bordered="false"
                  style="min-width: 350px"
                  :getPopupContainer="getContainer"
                  :default-value="options[0].key"
                  :options="options"
                  @select="onSelect">
        </a-select>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data() {
      return {
        showModal: false,
        userInfo: {
          avatar: require('@/assets/avatar/01.jpg'),
          avatarFile: null,
          nickname: 'HappyDragon1994',
          Profile: '我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑',
          address: '四川省成都市成华区',
          profession: '新时代『农民工』'
        },
        options: [
          {
            key: 0,
            title: '使用手机 153******57 验证',
            class: 'option-item'
          },
          {
            key: 1,
            title: '使用邮箱 lov******@163.com 验证',
            class: 'option-item'
          }
        ],
        selectOption: 0,
        menuContainer: null
      }
    },
    methods: {
      getContainer() {
        return this.menuContainer;
      },
      onSelect(value) {
        console.log(value)
      }
    },
    mounted() {
      if (this.menuContainer == null) {
        this.menuContainer = this.$ref.menuContainer;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/account.less';
</style>
