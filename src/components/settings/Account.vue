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
        <button type="button" class="control-button" @click="showChangeModal(1)">
          <span>更改</span>
        </button>
      </div>
      <div class="email-setting-form form-item">
        <span class="iconfont icon-account-unComplete"></span>
        <div class="form-content">
          <p>邮箱</p>
          <p class="tip">未绑定，绑定后当你手机号不可用时，可通过邮箱验证更换手机号</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(2)">
          <span>绑定</span>
        </button>
      </div>
      <div class="password-setting-form form-item">
        <span class="iconfont icon-account-completed"></span>
        <div class="form-content">
          <p>账户密码</p>
          <p class="tip">已设置，可通过账户密码登录</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(3)">
          <span>更改</span>
        </button>
      </div>
      <div class="domain-setting-form form-item">
        <span class="iconfont icon-account-completed"></span>
        <div class="form-content">
          <p>个人路径</p>
          <p class="tip">https://www.yuque.com/lovbe0210</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(4.1)">
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
      <Modal id="verify" v-model="showModal" width="400" :lock-scroll="false"
             :footer-hide="true" :mask-closable="false"
             :on-visible-change="modalStatusChange()"
             class-name="account-set-modal">
        <div class="step-1" v-if="step == 1">
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
          <div v-if="showModal" class="validation">
            <slider-validation :verifyResult="verifyResult" @validate="validate"></slider-validation>
          </div>
          <div class="check-code">
            <Input autocomplete="off"
                   :class="['check-code-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   :placeholder="'6 位' + (selectOption == 0 ? '手机' : selectOption == 1 ? '邮箱' : '') + '验证码'"
                   @on-change="checkCodeChange" v-model="checkCode"
                   type="text" maxlength="6"/>
            <Button class="check-code-btn" @click="sendCheckCode" :disabled="sendCodeSuccess">
              {{btnValue}}
            </Button>
          </div>
          <div class="check-code-tip">
            <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
              {{tipString}}
            </p>
            <p v-show="sendCodeSuccess" class="success-tip">
              {{sendCodeString}}
            </p>
          </div>
          <div class="action">
            <Button class="cancel-btn" @click="showModal = false">
              取消
            </Button>
            <Button class="next-btn" @click="verifyNext">
              下一步
            </Button>
          </div>
        </div>
        <div class="step-2" v-if="step == 2">
          <div v-if="changeItemType == 1">
            <div class="header">
              <span>更改手机号码</span>
            </div>
            <p class="warn">
              <span>请选择新手机号进行绑定。</span>
            </p>
            <Input autocomplete="off"
                   :class="['change-item-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   placeholder="输入新手机" @on-change="checkNewValueChange" v-model="newValue" type="text" maxlength="15"/>
          </div>
          <div v-if="changeItemType == 2">
            <div class="header">
              <span>更改邮箱</span>
            </div>
            <p class="warn">
              <span>请选择新邮箱号进行绑定。</span>
            </p>
            <Input autocomplete="off"
                   :class="['change-item-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   placeholder="输入新邮箱" @on-change="checkCodeChange" v-model="newValue" type="text" maxlength="50"/>
          </div>
          <div class="check-code" v-if="changeItemType <= 2">
            <Input autocomplete="off"
                   :class="['check-code-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   :placeholder="'6 位' + (changeItemType == 1 ? '手机' : changeItemType == 2 ? '邮箱' : '') + '验证码'"
                   @on-change="checkCodeChange" v-model="checkCode"
                   type="text" maxlength="6"/>
            <Button class="check-code-btn" @click="sendCheckCode" :disabled="sendCodeSuccess">
              {{btnValue}}
            </Button>
          </div>
          <div v-if="changeItemType == 3">
            <div class="header">
              <span>更改密码</span>
            </div>
            <p class="warn">
              <span>请选择新密码进行设置。</span>
            </p>
            <Input autocomplete="off"
                   :class="['change-item-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   placeholder="输入新密码" @on-change="checkCodeChange" v-model="newValue" type="password" maxlength="512"/>
            <div class="check-code-tip">
              <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
                {{tipString}}
              </p>
            </div>
            <Input autocomplete="off"
                   :class="['change-item-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   placeholder="请重新输入新密码" @on-change="checkCodeChange" v-model="confirmValue" type="password" maxlength="512"/>
            <div class="check-code-tip">
              <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
                {{tipString}}
              </p>
            </div>
          </div>
          <div class="check-code-tip" v-if="changeItemType <= 2">
            <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
              {{tipString}}
            </p>
            <p v-show="sendCodeSuccess" class="success-tip">
              {{sendCodeString}}
            </p>
          </div>
          <div class="action" v-if="changeItemType <= 3">
            <Button class="cancel-btn" @click="showModal = false">
              取消
            </Button>
            <Button class="next-btn" @click="verifyNext">
              {{changeItemType == 3 ? '更新密码' : '确认'}}
            </Button>
          </div>
          <div v-if="changeItemType == 4.1 || changeItemType == 4.2">
            <div v-if="changeItemType == 4.1">
              <div class="header">
                <span>更改个人路径</span>
              </div>
              <div class="warn">
                <span>更改个人路径后会发生以下事情，请知晓。</span>
              </div>
              <ul>
                <li>更改个人路径以后，原个人路径将不归属于你。</li>
                <li>原个人路径链接将无法访问，且不会进行跳转到新的个人路径。</li>
              </ul>
              <Button class="confirm-btn" @click="changeItemType = 4.2">
                确认更改
              </Button>
            </div>
            <div v-if="changeItemType == 4.2">
              <div class="header">
                <span>输入一个新的路径</span>
              </div>
              <Input autocomplete="off"
                     :class="['change-item-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                     @on-change="checkCodeChange" v-model="newValue" type="text" maxlength="30">
                <span slot="prepend">http://www.icharge.com/</span>
              </Input>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import SliderValidation from "@/components/common/SliderValidation";

  export default {
    name: 'Account',
    data() {
      return {
        showModal: false,
        step: 1,
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
            title: '使用手机 153******57 验证'
          },
          {
            key: 1,
            title: '使用邮箱 lov******@163.com 验证'
          }
        ],
        selectOption: 0,
        changeItemType: 0,
        // 滑块验证结果
        verifyResult: false,
        // 验证码结果
        checkCodeResult: null,
        checkCode: '',
        tipString: '验证码错误',
        btnValue: '获取验证码',
        sendCodeString: '已发送短信验证码到绑定手机',
        sendCodeSuccess: false,
        sendCodeInterval: null,
        newValue: '',
        confirmValue: '',
        menuContainer: null
      }
    },
    computed: {},
    components: {
      SliderValidation
    },
    methods: {
      getContainer() {
        return this.menuContainer;
      },
      onSelect(value) {
        this.selectOption = value;
      },
      modalStatusChange() {
        if (!this.showModal) {
          // 恢复modal内的各种属性
          this.checkCodeResult = null;
          this.checkCode = '';
          this.tipString = '验证码错误';
          this.newValue = '';
          this.confirmValue = '';
        }
      },
      validate() {
        // 只在成功时回调
        this.verifyResult = true;
      },
      checkCodeChange() {
        if (!this.checkCode || this.checkCode.length === 0) {
          this.checkCodeResult = false;
          this.tipString = '验证码不能为空';
        } else {
          this.checkCodeResult = null;
          this.tipString = '';
        }
      },
      sendCheckCode() {
        if (!this.verifyResult) {
          this.$Message.error('请先完成滑块验证')
          return;
        }
        this.sendCodeSuccess = true;
        this.sendCodeString = '已发送短信验证码到绑定' + (this.selectOption === 0 ? '手机' : this.selectOption === 1 ? '邮箱' : '');
        let time = 60;
        this.btnValue = '重新获取（' + time + '）';
        this.sendCodeInterval = setInterval(() => {
          if (time > 0) {
            time = time - 1;
            this.btnValue = '重新获取（' + time + '）';
          } else {
            this.btnValue = '获取验证码';
            this.sendCodeSuccess = false;
            clearInterval(this.sendCodeInterval)
          }
        }, 1000)
      },
      verifyNext() {
        if (!this.verifyResult) {
          this.$Message.error('请先完成滑块验证')
          return;
        }
        if (this.checkCodeResult != null && !this.checkCodeResult) {
          return;
        } else {
          // 验证码一般校验
          if (!this.checkCode || this.checkCode.length === 0) {
            this.checkCodeResult = false;
            this.tipString = '验证码不能为空';
            return;
          } else if (this.checkCode.length < 6) {
            this.checkCodeResult = false;
            this.tipString = '验证码错误';
            return;
          }
        }
        // 请求接口验证
        setTimeout(() => {
          this.step = 2;
        }, 1500);
      },
      showChangeModal(type) {
        this.changeItemType = type;
        this.showModal = true;
      },
      checkNewValueChange() {
        if (this.changeItemType == 1) {

        }
      }
    },
    mounted() {
      if (this.menuContainer == null) {
        this.menuContainer = this.$refs.menuContainer;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/account.less';
</style>
