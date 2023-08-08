<template>
  <div class="layout-module_account">
    <div id="main-right-content" class="layout-module_MainContent">
      <div class="layout-module_MainContentChildren">
        <div class="main-container account-setting">
          <h1 class="setting-title">账户管理</h1>
          <h2 class="setting-subtitle">账户绑定</h2>
          <div class="settings-form">
            <div class="mobile-setting-form form-item">
              <span class="iconfont icon-account-completed"></span>
              <div class="form-content">
                <p>手机号码</p>
                <span class="tip">153******57</span>
              </div>
              <button type="button" class="control-button">
                <span>更改</span>
              </button>
            </div>
            <div class="email-setting-form form-item">
              <div class="empty-email form-split">
                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                     class="larkui-icon larkui-icon-exclamationcirclefilled setting-warning-form-icon">
                  <path
                    d="M128 16c61.856 0 112 50.144 112 112s-50.144 112-112 112S16 189.856 16 128 66.144 16 128 16Zm0 154c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12Zm0-100c-5.523 0-10 4.477-10 10v64c0 5.523 4.477 10 10 10s10-4.477 10-10V80c0-5.523-4.477-10-10-10Z"
                    fill="currentColor" fill-rule="nonzero"></path>
                </svg>
                <div class="form-content"><p>邮箱</p>
                  <p class="tip">未绑定，绑定后当你手机号不可用时，可通过邮箱验证更换手机号</p></div>
              </div>
              <button type="button" class="ant-btn ant-btn-default ant-btn-sm control-button"
                      ant-click-animating-without-extra-node="false"><span>绑定</span></button>
            </div>
            <div class="password-setting-form form-item">
              <svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                   class="larkui-icon larkui-icon-icon-introductioncheck setting-check-form-icon">
                <g stroke-width="IconIntroductioncheck-1" fill="none" fill-rule="evenodd">
                  <path d="M0 0h16v16H0z"></path>
                  <path
                    d="M3.111 7.899c.474-.532.944-.624 1.412-.279.613.453 1.493 1.667 2.64 3.64C9.61 6.726 10.97 4.276 11.241 3.91c.215-.292.701-.428 1.458-.407a.4.4 0 0 1 .34.59c-2.612 4.867-4.13 7.586-4.556 8.16-.66.892-2.143 1.049-2.802.617-.408-.266-1.3-1.529-2.677-3.787h-.001a1 1 0 0 1 .107-1.184Z"
                    fill="currentColor"></path>
                </g>
              </svg>
              <div class="form-content"><p>账户密码</p>
                <p class="tip">已设置，可通过账户密码登录</p></div>
              <button type="button" class="ant-btn ant-btn-default ant-btn-sm control-button"
                      ant-click-animating-without-extra-node="false"><span>更改</span></button>
            </div>
            <div class="domain-setting-form form-item">
              <svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                   class="larkui-icon larkui-icon-icon-introductioncheck setting-check-form-icon">
                <g stroke-width="IconIntroductioncheck-1" fill="none" fill-rule="evenodd">
                  <path d="M0 0h16v16H0z"></path>
                  <path
                    d="M3.111 7.899c.474-.532.944-.624 1.412-.279.613.453 1.493 1.667 2.64 3.64C9.61 6.726 10.97 4.276 11.241 3.91c.215-.292.701-.428 1.458-.407a.4.4 0 0 1 .34.59c-2.612 4.867-4.13 7.586-4.556 8.16-.66.892-2.143 1.049-2.802.617-.408-.266-1.3-1.529-2.677-3.787h-.001a1 1 0 0 1 .107-1.184Z"
                    fill="currentColor"></path>
                </g>
              </svg>
              <div class="form-content"><p>个人路径</p>
                <p class="tip">https://www.yuque.com/lovbe0210</p>
                <button type="button" class="ant-btn ant-btn-default ant-btn-sm control-button"
                        ant-click-animating-without-extra-node="false"><span>更改</span></button>
              </div>
            </div>
            <div class="thirdAccount-setting-form">
              <h2 class="index-module_inherit_TQ-oW setting-subtitle" style="margin: 0px 0px 6px;">
                绑定第三方账户
              </h2>
              <span class="ThirdAccount-module_tip_BBol+">绑定后通过第三方应用快速扫码登录</span>
              <div class="ThirdAccount-module_thirdAccountList_tbw-B third-binding">
                <div class="ThirdAccount-module_thirdAccountListItem_cWNIP"><span
                  class="ThirdAccount-module_bindText_XibFA"><span class="icon dingtalk"></span>钉钉</span><a
                  class="ThirdAccount-module_bindButton_9Qu2v">绑定</a></div>
                <div class="ThirdAccount-module_thirdAccountListItem_cWNIP"><span
                  class="ThirdAccount-module_bindText_XibFA"><span class="icon alipay"></span>支付宝</span><a
                  class="ThirdAccount-module_bindButton_9Qu2v">绑定</a></div>
                <div class="ThirdAccount-module_thirdAccountListItem_cWNIP"><span
                  class="ThirdAccount-module_bindText_XibFA"><span class="icon wechat"></span>@福</span><a
                  class="ThirdAccount-module_bindButton_9Qu2v">解绑</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data() {
      return {
        userInfo: {
          avatar: require('@/assets/avatar/01.jpg'),
          avatarFile: null,
          nickname: 'HappyDragon1994',
          Profile: '我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑',
          address: '四川省成都市成华区',
          profession: '新时代『农民工』'
        }
      }
    },
    methods: {
      isHover(position, flag) {
        if (position === 'left') {
          this.leftHoverClass = flag;
        } else {
          this.rightHoverClass = flag;
        }
      },
      previous() {
        console.log('previous page')
      },
      next() {
        console.log('next page')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/account.less';
</style>
