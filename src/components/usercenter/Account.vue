<template>
  <div class="layout-module_account">
    <h1 class="setting-title">账号管理</h1>
    <h2 class="setting-subtitle">账号绑定</h2>
    <div class="settings-form">
      <div class="mobile-setting-form form-item">
        <span :class="['iconfont', bindingSettings.mobile ? 'account-complete' : 'account-unComplete']"/>
        <div class="form-content">
          <p>手机号码</p>
          <p class="tip">{{ bindingSettings.mobile ? bindingSettings.mobile : '未绑定，绑定后当邮箱不可用时，可通过手机验证更换邮箱' }}</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(1)">
          <span>{{ bindingSettings.mobile ? '更改' : '绑定' }}</span>
        </button>
      </div>
      <div class="email-setting-form form-item">
        <span :class="['iconfont', bindingSettings.email ? 'account-complete' : 'account-unComplete']"/>
        <div class="form-content">
          <p>邮箱</p>
          <p class="tip">{{ bindingSettings.email ? bindingSettings.email : '未绑定，绑定后当手机号不可用时，可通过邮箱验证更换手机号' }}</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(2)">
          <span>{{ bindingSettings.email ? '更改' : '绑定' }}</span>
        </button>
      </div>
      <div class="password-setting-form form-item">
        <span :class="['iconfont', bindingSettings.password ? 'account-complete' : 'account-unComplete']"/>
        <div class="form-content">
          <p>账号密码</p>
          <p class="tip">{{ bindingSettings.password ? '已设置，可通过账号密码登录' : '未设置，设置后可通过账号密码登录' }}</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(3)">
          <span>{{ bindingSettings.password ? '更改' : '设置' }}</span>
        </button>
      </div>
      <div class="domain-setting-form form-item">
        <span :class="['iconfont', bindingSettings.domain ? 'account-complete' : 'account-unComplete']"/>
        <div class="form-content">
          <p>个人主页路径</p>
          <p class="tip">{{ bindingSettings.domain }}</p>
        </div>
        <button type="button" class="control-button" @click="showChangeModal(4.1)">
          <span>{{ bindingSettings.domain ? '更改' : '绑定' }}</span>
        </button>
      </div>
      <div class="thirdAccount-setting-form">
        <h2 class="setting-subtitle">绑定第三方账号</h2>
        <span class="subtitle-tip">绑定后通过第三方应用快速扫码登录</span>
        <div class="third-binding-list">
          <div class="third-binding-item">
                <span class="bind-text">
                  <span class="iconfont qq"></span>
                  QQ
                </span>
            <a class="bind-btn">绑定</a>
          </div>
          <div class="third-binding-item">
                <span class="bind-text">
                  <span class="iconfont wechat"></span>
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
      <Modal id="verify" v-model="showModal" :width="modalWidth" :lock-scroll="true"
             :footer-hide="true" :mask-closable="false"
             @on-visible-change="modalStatusChange"
             class-name="account-set-modal">
        <div class="step-1" v-if="step == 1" id="appendDomContainer">
          <div class="header">
            <span>身份验证</span>
          </div>
          <p class="warn">
            <span>
              为了您的账号安全，请先验证身份。
              <b-link class="un-enable-tips"
                      to="/icharge/02JBwY"
                      target="_blank">
                {{bindingSettings.mobile && bindingSettings.email ? '手机邮箱均' : bindingSettings.mobile ? '手机号' : '邮箱号'}}不可用？
              </b-link>
            </span>
          </p>
          <Select v-model="selectOption" class="verify-type-select">
            <Option v-for="item in bindOptions" :value="item.key" :key="item.key">
              {{ item.title }}
            </Option>
          </Select>
          <div v-if="showModal" class="validation">
            <slider-validation @validate="validate"></slider-validation>
            <div class="slider-valid-tip">
              <p v-show="sliderVerifyTipString !== null && sliderVerifyTipString" class="error-tip">
                {{ sliderVerifyTipString }}
              </p>
            </div>
          </div>
          <div class="check-code">
            <Input autocomplete="off"
                   :class="['check-code-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   :placeholder="'6 位' + (selectOption == 0 ? '手机' : selectOption == 1 ? '邮箱' : '') + '验证码'"
                   @on-change="checkCodeChange" v-model="checkCode"
                   type="text" maxlength="6"/>
            <Button ghost class="check-code-btn" @click="sendCheckCode" :disabled="sendCodeSuccess">
              {{ btnValue }}
            </Button>
          </div>
          <div class="check-code-tip">
            <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
              {{ tipString }}
            </p>
            <p v-show="sendCodeSuccess" class="success-tip">
              {{ sendCodeString }}
            </p>
          </div>
          <div class="action">
            <Button ghost class="cancel-btn ghost-btn" @click="showModal = false">
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
              <span>{{this.bindingSettings.mobile ? '更改' : '绑定'}}手机号</span>
            </div>
            <p class="warn">
              <span>请选择新手机号进行绑定。</span>
            </p>
            <Input autocomplete="off"
                   :class="['change-item-input', checkNewValueResult !== null && !checkNewValueResult ? 'error-code-input' : '']"
                   placeholder="输入新手机"
                   @on-change="checkNewValueChange()"
                   v-model="newValue"
                   type="text"
                   maxlength="20">
            </Input>
          </div>
          <div v-if="changeItemType == 2">
            <div class="header">
              <span>{{this.bindingSettings.mobile ? '更改' : '绑定'}}邮箱号</span>
            </div>
            <p class="warn">
              <span>请选择新邮箱号进行绑定。</span>
            </p>
            <Input autocomplete="off" id="emailChange"
                   :class="['change-item-input', checkNewValueResult !== null && !checkNewValueResult ? 'error-code-input' : '']"
                   placeholder="输入新邮箱" @on-change="checkNewValueChange()" v-model="newValue" type="text"
                   maxlength="50"/>
          </div>
          <div class="new-value-tip" v-if="changeItemType <= 2">
            <p v-show="checkNewValueResult !== null && !checkNewValueResult" class="error-tip">
              {{newValueTipString}}
            </p>
          </div>
          <div class="check-code" v-if="changeItemType <= 2">
            <Input autocomplete="off"
                   :class="['check-code-input', checkCodeResult !== null && !checkCodeResult ? 'error-code-input' : '']"
                   :placeholder="'6 位' + (changeItemType == 1 ? '手机' : changeItemType == 2 ? '邮箱' : '') + '验证码'"
                   @on-change="checkCodeChange" v-model="checkCode"
                   type="text" maxlength="6"/>
            <Button class="check-code-btn" @click="sendCheckCode" :disabled="sendCodeSuccess">
              {{ btnValue }}
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
                   :class="['change-item-input', checkNewValueResult !== null && !checkNewValueResult ? 'error-code-input' : '']"
                   placeholder="输入新密码" @on-change="checkNewValueChange()" v-model="newValue" type="password"
                   maxlength="512"/>
            <div class="new-value-tip">
              <p v-show="checkNewValueResult !== null && !checkNewValueResult" class="error-tip">
                {{newValueTipString}}
              </p>
            </div>
            <Input autocomplete="off"
                   :class="['change-item-input', checkConfirmValueResult !== null && !checkConfirmValueResult ? 'error-code-input' : '']"
                   placeholder="请再次确认新密码" @on-change="checkNewValueChange(confirmValue)" v-model="confirmValue"
                   type="password"
                   maxlength="512"/>
            <div class="confirm-value-tip">
              <p v-show="checkConfirmValueResult !== null && !checkConfirmValueResult" class="error-tip">
                {{ tipString }}
              </p>
            </div>
          </div>
          <div class="check-code-tip" v-if="changeItemType <= 2">
            <p v-show="checkCodeResult !== null && !checkCodeResult" class="error-tip">
              {{ tipString }}
            </p>
            <p v-show="sendCodeSuccess" class="success-tip">
              {{ sendCodeString }}
            </p>
          </div>
          <div class="action" v-if="changeItemType <= 3">
            <Button class="cancel-btn ghost-btn" @click="showModal = false">
              取消
            </Button>
            <Button class="next-btn" @click="confirmChange">
              {{ changeItemType == 3 ? '更新密码' : '确认' }}
            </Button>
          </div>
          <div v-if="changeItemType == 4.1 || changeItemType == 4.2">
            <div v-if="changeItemType == 4.1">
              <div class="header">
                <span>更改个人主页路径</span>
              </div>
              <div class="warning-prompt">
                <span class="tip">更改个人主页路径后会发生以下事情，请知晓。</span>
                <ul class="matters">
                  <li>更改个人主页路径以后，原个人主页路径将不归属于你。</li>
                  <li>原个人主页路径将无法访问，且不会进行跳转到新的个人主页路径。</li>
                </ul>
              </div>
              <div class="action">
                <Button class="confirm-btn" @click="changeItemType = 4.2">
                  确认更改
                </Button>
              </div>
            </div>
            <div v-if="changeItemType == 4.2">
              <div class="header">
                <span>输入一个新的路径</span>
              </div>
              <Input autocomplete="off"
                     :class="['domain-suffix', 'change-item-input', checkNewValueResult !== null && !checkNewValueResult ? 'error-code-input' : '']"
                     @on-change="checkNewValueChange()" v-model="newValue" type="text" maxlength="30">
                <span slot="prepend">http://www.icharge.com/</span>
              </Input>
              <div class="new-value-tip">
                <p v-show="checkNewValueResult !== null && !checkNewValueResult" class="error-tip">
                  {{ newValueTipString }}
                </p>
              </div>
              <div class="action">
                <Button class="next-btn" @click="confirmChange">
                  更新路径
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import SliderValidation from "@/components/common/SliderValidation";
import {verifyTelLawful, emailRegex, domainRegex} from "@/utils/utils";
import userApi from "@/api/UserApi";
import authApi from "../../api/AuthApi";

export default {
  name: 'Account',
  data() {
    return {
      bindingSettings: {
        email: null,
        mobile: null,
        password: null,
        domain: null,
        githubOpenId: null,
        googleOpenId: null,
        qqOpenId: null,
        wechatOpenId: null
      },
      showModal: false,
      modalWidth: 400,
      step: 1,
      bindOptions: [],
      selectOption: 0,
      changeItemType: 0,
      // 滑块验证码埋点
      svToken: null,
      // 滑块验证结果
      verifyResult: false,
      sliderVerifyTipString: null,
      // 验证码结果
      checkCodeResult: null,
      checkNewValueResult: null,
      checkConfirmValueResult: null,
      checkCode: '',
      tipString: '验证码错误',
      newValueTipString: '',
      btnValue: '获取验证码',
      sendCodeString: '已发送短信验证码到绑定手机',
      sendCodeSuccess: false,
      sendCodeInterval: null,
      newValue: '',
      confirmValue: ''
    }
  },
  computed: {
    // 滑块验证码场景
    svScene() {
      if (this.changeItemType === 1) {
        if (this.bindingSettings.mobile) {
          return this.step === 1 ? (this.selectOption === 0 ? 5 : 51) : 31;
        } else {
          return this.step === 1 ? 3 : 31;
        }
      }
      if (this.changeItemType === 2) {
        if (this.bindingSettings.email) {
          return this.step === 1 ? (this.selectOption === 0 ? 6 : 61) : 41;
        } else {
          return this.step === 1 ? 4 : 41;
        }
      }
      if (this.changeItemType === 3) {
        return this.selectOption === 0 ? 7 : 8;
      }
      return 0;
    }
  },
  components: {
    SliderValidation
  },
  methods: {
    onSelect(value) {
      this.selectOption = value;
    },
    modalStatusChange() {
      if (!this.showModal) {
        // 恢复modal内的各种属性
        this.checkCodeResult = null;
        this.checkConfirmValueResult = null;
        this.checkCode = '';
        this.tipString = '验证码错误';
        this.newValue = '';
        this.newValueTipString = '';
        this.confirmValue = '';
        this.sliderVerifyTipString = null;
        // 关闭定时器，移除验证码发送信息
        this.btnValue = '获取验证码';
        this.sendCodeSuccess = false;
        clearInterval(this.sendCodeInterval)
      }
    },
    validate() {
      // 只在成功时回调
      authApi.getSvCookie(this, this.svScene).then(data => {
        if (!data?.result) {
          return;
        }
        this.verifyResult = true;
        this.sliderVerifyTipString = null;
        this.svToken = data.data.tn;
      })
    },
    checkCodeChange() {
      if (!this.checkCode || this.checkCode.length === 0) {
        this.checkCodeResult = false;
        this.tipString = '验证码不能为空';
      } else {
        this.checkCodeResult = null;
        this.tipString = '验证码错误';
      }
    },
    sendCheckCode() {
      // 第一步必须先完成滑块验证
      if (this.step === 1 && !this.verifyResult) {
        this.sliderVerifyTipString = "请先完成滑块验证";
        return;
      } else if (this.step === 2) {
        // 校验手机和邮箱是否正确
        if (this.changeItemType === 1) {
          if (!this.newValue) {
            this.checkNewValueResult = false;
            this.newValueTipString = '手机号不得为空';
            return;
          }
          let verifyResult = verifyTelLawful(this.newValue);
          if (!verifyResult) {
            this.checkNewValueResult = false;
            this.newValueTipString = '请输入正确的手机号码';
            return;
          }
        } else if (this.changeItemType === 2) {
          let verifyResult = emailRegex.test(this.newValue);
          if (!verifyResult) {
            this.checkNewValueResult = false;
            this.newValueTipString = '请输入正确的邮箱地址';
            return;
          }
        }
      }
      if (this.step === 1) {
        userApi.sendBindingPayloadCode(this, this.svScene, this.svToken).then(result => {
          if (!result?.result) {
            return;
          }
          // 短信发送成功
          this.sendCodeSuccess = true;
          let tmp = this.step === 1 ? (this.selectOption === 0 ? '手机' : this.selectOption === 1 ? '邮箱' : '') : this.step === 2 ? (this.changeItemType === 1 ? '手机' : this.changeItemType === 2 ? '邮箱' : '') : '';
          this.sendCodeString = '已发送验证码到指定' + tmp;
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
          }, 1000);
        })
      } else {
        // 第一步和第二部的验证码场景是不同的,而页面只需触发一次滑块验证，继续沿用上一次的滑块埋点，因此需要手动更改滑块的使用场景
        let svScene = 0;
        if (this.changeItemType === 1) {
          svScene = this.bindingSettings.mobile ? (this.selectOption === 0 ? 5 : 51) : 3;
        }
        if (this.changeItemType === 2) {
          svScene = this.bindingSettings.email ? (this.selectOption === 0 ? 6 : 61) : 4;
        }
        userApi.sendPayloadCode(this, svScene, this.svScene, this.svToken, this.newValue).then(result => {
          if (!result?.result) {
            return;
          }
          // 短信发送成功
          this.sendCodeSuccess = true;
          let tmp = this.step === 1 ? (this.selectOption === 0 ? '手机' : this.selectOption === 1 ? '邮箱' : '') : this.step === 2 ? (this.changeItemType === 1 ? '手机' : this.changeItemType === 2 ? '邮箱' : '') : '';
          this.sendCodeString = '已发送验证码到指定' + tmp;
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
          }, 1000);
        })
      }

    },
    verifyNext() {
      if (!this.verifyResult) {
        this.sliderVerifyTipString = "请先完成滑块验证";
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
      // 验证码正确性校验
      let simpleCodeVerifyReq = {
        scene: this.svScene,
        code: this.checkCode
      };
      userApi.useVerifyCode(simpleCodeVerifyReq).then(data => {
        if (data?.result) {
          // 初始化输入框填充值
          this.checkCode = '';
          this.checkCodeResult = null;
          this.tipString = '';
          this.confirmValue = '';
          // 关闭定时器，移除验证码发送信息
          this.btnValue = '获取验证码';
          this.sendCodeSuccess = false;
          clearInterval(this.sendCodeInterval)
          this.step = 2;
        }
      })
    },
    showChangeModal(type) {
      this.changeItemType = type;
      if (type === 4.1) {
        this.modalWidth = 520;
        this.step = 2;
      } else {
        this.modalWidth = 400;
        this.step = this.verifyResult ? 2 : 1;
      }
      this.showModal = true;
    },
    checkNewValueChange(confirmValue) {
      if (confirmValue !== undefined) {
        if (confirmValue !== this.newValue) {
          this.checkConfirmValueResult = false;
          this.tipString = '两次输入的密码不一致';
        } else {
          this.checkConfirmValueResult = true;
          this.tipString = '';
        }
      } else if (!this.newValue || this.newValue.length === 0) {
        this.checkNewValueResult = false;
        this.newValueTipString = this.changeItemType === 1 ? '手机号不能为空'
          : this.changeItemType === 2 ? '邮箱号不能为空'
            : this.changeItemType === 3 ? '新密码不能为空'
              : this.changeItemType === 4.2 ? '主页路径不能为空' : '';
      } else {
        this.checkNewValueResult = null;
        this.newValueTipString = '';
      }
    },
    confirmChange() {
      // 数据校验
      debugger
      this.checkNewValueChange()
      if (this.changeItemType === 3) {
        this.checkNewValueChange(this.confirmValue)
      }
      // 常规校验判断校验结果
      if ((this.checkNewValueResult != null && !this.checkNewValueResult) ||
        (this.checkConfirmValueResult != null && !this.checkConfirmValueResult)) {
        return;
      }
      // 合法性校验
      if (this.changeItemType === 4.2) {
        let regexResult = domainRegex.test(this.newValue);
        if (!regexResult) {
          this.checkNewValueResult = false;
          this.newValueTipString = '仅支持小写字母、数字、横线、下划线和点，至少 4 个字符';
          return;
        }
      } else if (this.changeItemType <= 2) {
        if (!this.checkCode || this.checkCode.length === 0) {
          this.checkCodeResult = false;
          this.tipString = '验证码不能为空';
          return;
        } else if (this.checkCode.length < 6) {
          this.checkCodeResult = false;
          this.tipString = '验证码错误';
          return;
        } else {
          // 验证码正确性校验
          let simpleCodeVerifyReq = {
            scene: this.svScene,
            code: this.checkCode
          };
          userApi.useVerifyCode(simpleCodeVerifyReq).then(data => {
            if (data?.result) {
              // 初始化输入框填充值
              this.checkCode = '';
              this.checkCodeResult = null;
              this.tipString = '';
              this.confirmValue = '';
              // 关闭定时器，移除验证码发送信息
              this.btnValue = '获取验证码';
              this.sendCodeSuccess = false;
              clearInterval(this.sendCodeInterval)
              this.step = 2;
            }
          })
        }
      } else {
        if (this.confirmValue.length < 8) {
          this.checkConfirmValueResult = false;
          this.tipString = '密码长度至少 8 位';
          return;
        }
      }
      setTimeout(() => {
        // TODO 更新数据库
        this.showModal = false;
        this.$Message.success('更新成功')
      }, 500);
    }
  },
  mounted() {
  },
  created() {
    // 获取账号绑定状态
    userApi.getAccountSettings().then(data => {
      if (!data?.result) {
        return;
      }
      this.bindingSettings = {...this.bindingSettings, ...data.data};
      if (data.data?.domain) {
        const origin = window.location.origin;
        this.bindingSettings.domain = origin + '/' + data.data.domain;
      }
      if (data.data?.mobile) {
        this.bindOptions.push({
          key: 0,
          title: '使用手机 ' + data.data.mobile + ' 验证'
        });
        this.selectOption = 0;
      }
      if (data.data?.email) {
        this.bindOptions.push({
          key: 1,
          title: '使用邮箱 ' + data.data.email + ' 验证'
        });
        this.selectOption = 1;
      }
    })
  }
}
</script>

<style scoped lang="less">
@import '../css/usercenter/account.less';
</style>
