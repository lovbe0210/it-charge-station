<template>
  <div class="customer-set">
    <div class="title">
      <span class="iconfont custome-theme">
      </span>
      <span>
        个人偏好
      </span>
    </div>
    <div class="theme-color settings">
      <div class="context">
        主题设置
      </div>
      <ColorPicker v-model="customerSet.themeColor" alpha size="small"/>
    </div>
    <div class="bacc-color settings">
      <div class="context">
        背景设置
      </div>
      <i-switch v-model="gradientColor" class="switch-btn" size="large"
                true-color="`linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)`">
        <span slot="open">Color</span>
        <span slot="close">Color</span>
      </i-switch>
      <Upload v-show="!gradientColor"
              action="/api/st/upload" :show-upload-list="false"
              :format="['jpg','jpeg','png']" :max-size="10240" :on-progress="uploading"
              accept="image/png, image/jpeg" :disabled="uploadStatus === 1"
              :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError"
              :on-success="handleServerSuccess" :on-error="handleServerError">
        <div class="upload-icon align-items-center">
          <span v-show="uploadStatus !== 1" class="iconfont upload-img"></span>
      <!--    <Icon :type="uploadIcon" size="24" :color="uploadStatus===3?'#00AE9D':uploadStatus===2?'red': ''"
                v-show="uploadStatus !== 1 && uploadStatus !== 0"/>-->
          <b-spinner style="width: 1.1rem; height: 1.1rem;color: #00AE9D;" v-show="uploadStatus === 1"/>
        </div>
      </Upload>
      <div class="gradient-color" v-show="gradientColor">
        <div class="colors">
          <ColorPicker v-model="editColors.firstColor" size="small" v-show="editColors.firstColor !== null"/>
          <ColorPicker v-model="editColors.secondColor" size="small" v-show="editColors.secondColor !== null"/>
          <ColorPicker v-model="editColors.thirdColor" size="small" v-show="editColors.thirdColor !== null"/>
        </div>
        <Button type="text" class="edit-color-btn" @click="changeGradientColor(true)"
                :disabled="editColors.firstColor !== null && editColors.secondColor !== null && editColors.thirdColor !== null">
                  <span class="iconfont i-add"
                        style="font-size: 1.1rem;line-height: 1.4rem;margin-left: 5px;"></span>
        </Button>
        <Button type="text" class="edit-color-btn" @click="changeGradientColor(false)"
                :disabled="editColors.thirdColor == null && editColors.secondColor == null">
                  <span class="iconfont delete" style="font-size: 1.1rem;line-height: 1.4rem;margin-left: 5px;"></span>
        </Button>
      </div>
    </div>
    <div class="quick-setting settings">
      <Button @click="changeThem(0)" size="small">恢复默认</Button>
      <Button @click="changeThem(1)" size="small">预设一</Button>
      <Button @click="changeThem(2)" size="small">预设二</Button>
      <Button @click="changeThem(3)" size="small">预设三</Button>
    </div>
  </div>
</template>

<script>
  import {deepEqual} from "@/utils";
  import preferenceApi from "@/api/PreferenceApi";

  export default {
    name: "CustomerSet",
    data() {
      return {
        // 是否显示渐变色
        gradientColor: false,
        // 0 未上传 1上传中 2上传错误 3上传成功
        uploadStatus: 0,
        // 上传按钮图标
        uploadIcon: 'md-cloud-upload',
        // 背景色设置
        editColors: {
          firstColor: '#FFFFFF',
          secondColor: null,
          thirdColor: null
        }
      }
    },
    computed: {
      // 通过计算属性获取用户自定义设置主题
      customerSet: {
        get() {
          return this.$store.state.customerSet
        },
        set(value) {
          this.$store.commit('customerSet', value);
        }
      },
      showCustomer() {
        return this.$store.state.showCustomer;
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
      }
    },
    methods: {
      /**
       * 文件上传相关方法
       * -----------------------------------------------
       */
      uploading() {
        this.uploadStatus = 1;
        console.log('uploading...')
      },
      handleMaxSize() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Message.warning('文件大小不得超过10MB！');
      },
      handleFormatError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Message.warning('文件格式错误，请上传正确的图片');
      },
      handleServerSuccess(response) {
        if (response.result) {
          this.uploadStatus = 3;
          let baccObj = {
            backgroundImg: 'url(' + response.data + ')'
          }
          this.$store.commit('customerSet', baccObj)
        }
      },
      handleServerError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Message.warning('网络错误，请稍后重试！');
      },
      /**
       * -----------------------------------------------
       */

      // 控制增加删除按钮硬逻辑
      changeGradientColor(value) {
        // true 增加  false 删除
        if (value) {
          if (this.editColors.secondColor == null) {
            this.editColors.secondColor = '#FFFFFF';
          } else if (this.editColors.thirdColor == null) {
            this.editColors.thirdColor = '#FFFFFF';
          }
        } else {
          if (this.editColors.thirdColor !== null) {
            this.editColors.thirdColor = null;
          } else if (this.editColors.secondColor !== null) {
            this.editColors.secondColor = null;
          } else if (this.editColors.firstColor !== null) {
            this.editColors.firstColor = null;
          }
        }
      },
      // 主题预设快捷设置
      changeThem(value) {
        let customerSet = {};
        switch (value) {
          case 0:
            customerSet = {
              themeColor: 'rgba(255,255,255,1)',
              fontColor: '#262626',
              titleColor: '#585A5A',
              backgroundImg: 'linear-gradient(45deg, #F4F5F7 0%, #F4F5F7 100%)',
              borderColor: 'rgba(0,0,0,0.08)',
              dropdownBackgroundColor: '#FFFFFF',
              dropdownItemHover: '#EFF0F0',
              onThemeBackgroundColor: '#EFF0F0',
              ramblyJotEditorBackgroundColor: '#F2F3F5',
              modalBackgroundColor: '#FFFFFF'
            }
            break;
          case 1:
            customerSet = {
              themeColor: 'rgba(31,31,31,1)',
              fontColor: '#E2E2E2',
              titleColor: '#B3B3B3',
              backgroundImg: 'linear-gradient(45deg, #141414 0%, #141414 100%)',
              borderColor: 'hsla(0,0%,100%,0.08)',
              dropdownBackgroundColor: '#292929',
              dropdownItemHover: '#393939',
              onThemeBackgroundColor: '#292929',
              ramblyJotEditorBackgroundColor: '#393939',
              modalBackgroundColor: '#313131'
            }
            break;
          case 2:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.90)',
              fontColor: '#262626',
              titleColor: '#585A5A',
              backgroundImg: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
              borderColor: 'rgba(0,0,0,0.08)',
              dropdownBackgroundColor: 'rgba(255,248,248,0.98)',
              dropdownItemHover: '#edeaea',
              onThemeBackgroundColor: 'rgba(250,251,251,0.98)',
              ramblyJotEditorBackgroundColor: '#edeaea',
              modalBackgroundColor: 'rgba(250,251,251,0.98)'
            }
            break;
          case 3:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.89)',
              fontColor: '#262626',
              titleColor: '#585A5A',
              backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)',
              borderColor: 'rgba(0,0,0,0.08)',
              dropdownBackgroundColor: 'rgba(255,255,255,0.95)',
              dropdownItemHover: '#E9E9E9',
              onThemeBackgroundColor: 'rgba(250,251,251,0.95)',
              ramblyJotEditorBackgroundColor: '#F2F3F5',
              modalBackgroundColor: 'rgba(250,251,251,0.98)'
            }
            break;
        }
        this.$store.commit('customerSet', customerSet);
      }
    },
    watch: {
      customerSet: {
        immediate: true,
        deep: true,
        handler(value, old) {
          if (old === undefined || deepEqual(value, old)) {
            return;
          }
          if (this.loginStatus) {
            let preferenceSetting = {customTheme: value}
            preferenceApi.updatePreferenceSetting(preferenceSetting);
          }
          let backgroundImg = this.$store.state.customerSet.backgroundImg;
          this.gradientColor = backgroundImg.indexOf('linear-gradient') !== -1;
          // 如果当前是渐变色，则需要解析出渐变色中的颜色
          if (this.gradientColor) {
            this.editColors = {
              firstColor: '#FFFFFF',
              secondColor: null,
              thirdColor: null
            };
            let number = 0;
            for (let i = 0; i < backgroundImg.length; i++) {
              if (backgroundImg[i] === '#') {
                let color = backgroundImg.substring(i, i + 7);
                switch (number) {
                  case 0:
                    this.editColors.firstColor = color;
                    break;
                  case 1:
                    this.editColors.secondColor = color;
                    break;
                  case 2:
                    this.editColors.thirdColor = color;
                    break;
                  default:
                    break;
                }
                i += 6;
                number++;
              }
            }
            // 如果两个颜色一模一样只显示一个即可
            this.editColors.secondColor = this.editColors.firstColor === this.editColors.secondColor ? null : this.editColors.secondColor;
          }
        }
      },
      editColors: {
        immediate: false,
        deep: true,
        handler() {
          let backgroundImg = 'linear-gradient(45deg, ';
          if (this.editColors.secondColor === this.editColors.thirdColor && this.editColors.secondColor == null) {
            backgroundImg += this.editColors.firstColor + ' 0%, ';
            backgroundImg += this.editColors.firstColor + ' 100%)';
          } else {
            backgroundImg += this.editColors.firstColor + ' 0%, ';
            backgroundImg += this.editColors.secondColor + (this.editColors.thirdColor == null ? ' 100%)' : ' 46%, ');
            backgroundImg += this.editColors.thirdColor == null ? '' : this.editColors.thirdColor + ' 100%)';
          }
          this.$store.commit('customerSet', {backgroundImg: backgroundImg})
        }
      },
      showCustomer(flag) {
        if (!flag) {
          // 自定义主题关闭时恢复一些状态设置
          this.uploadStatus = 0;
          this.uploadIcon = 'md-cloud-upload';
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/customer-set.less";
</style>
