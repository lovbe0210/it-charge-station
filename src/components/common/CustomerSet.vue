<template>
  <div class="customer-set">
    <div class="title">
      🎨 个人偏好
    </div>
    <div class="theme-color setting">
      <div class="context">
        主题设置
      </div>
      <ColorPicker v-model="customerSet.themeColor" alpha size="small"/>
    </div>
    <div class="bacc-color setting">
      <div class="context">
        背景设置
      </div>
      <i-switch v-model="gradientColor" class="switch-btn" size="large"
                true-color="`linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)`">
        <span slot="open">Color</span>
        <span slot="close">Color</span>
      </i-switch>
      <Upload v-show="!gradientColor"
              action="//jsonplaceholder.typicode.com/posts/" :show-upload-list="false"
              :format="['jpg','jpeg','png']" :max-size="10240" :on-progress="uploading"
              accept="image/png, image/jpeg" :disabled="uploadStatus === 1"
              :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError"
              :on-success="handleServerSuccess" :on-error="handleServerError">
        <div class="upload-icon align-items-center">
          <span v-show="uploadStatus == 0" class="iconfont icon-upload-img" style="font-size: 24px;"></span>
          <Icon :type="uploadIcon" size="24" :color="uploadStatus===3?'#00AE9D':uploadStatus===2?'red': ''"
                v-show="uploadStatus !== 1 && uploadStatus !== 0"/>
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
                  <span class="iconfont icon-add"
                        style="font-size: 1.1rem;line-height: 1.4rem;margin-left: 5px;"></span>
        </Button>
        <Button type="text" class="edit-color-btn" @click="changeGradientColor(false)"
                :disabled="editColors.thirdColor == null && editColors.secondColor == null">
                  <span class="iconfont delete"
                        style="font-size: 1.2rem;line-height: 1.4rem;margin-left: 5px;color: #A3A3A3;"></span>
        </Button>
      </div>
    </div>
    <div class="quick-setting setting">
      <Button @click="changeThem(0)" size="small">恢复默认</Button>
      <Button @click="changeThem(1)" size="small">预设一</Button>
      <Button @click="changeThem(2)" size="small">预设二</Button>
      <Button @click="changeThem(3)" size="small">预设三</Button>
    </div>
  </div>
</template>

<script>
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
        this.$Notice.warning({
          title: '文件大小不得超过10MB！'
        });
      },
      handleFormatError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Notice.warning({
          title: '文件格式错误，请上传正确的图片'
        });
      },
      handleServerSuccess() {
        this.uploadIcon = 'md-cloud-done';
        this.uploadStatus = 3;
        let tmp = Math.ceil(Math.random() * 10);
        console.log(tmp)
        let baccObj;
        switch (tmp) {
          case 1:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/23451916UME.jpg)'}
            break;
          case 2:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'}
            break;
          case 3:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/%E6%97%A0%E6%A0%87%E9%A2%98.png)'}
            break;
          case 4:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/b9eb713f63.jpg)'}
            break;
          case 5:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/23451916UME.jpg)'}
            break;
          case 6:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'}
            break;
          case 7:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/%E6%97%A0%E6%A0%87%E9%A2%98.png)'}
            break;
          case 8:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/b9eb713f63.jpg)'}
            break;
          case 9:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/t01948ff2341a5d1ac3.jpg)'}
            break;
        }
        this.$store.commit('customerSet', baccObj)
      },
      handleServerError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Notice.warning({
          title: '网络错误，请稍后重试！'
        });
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
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #F4F5F7 0%, #F4F5F7 100%)'
            }
            break;
          case 1:
            customerSet = {
              themeColor: 'rgba(18,18,18,1)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #0D0D0D 0%, #0D0D0D 100%)'
            }
            break;
          case 2:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.90)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'
            }
            break;
          case 3:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.89)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'
            }
            break;
        }
        this.$store.commit('customerSet', customerSet)
      }
    },
    watch: {
      customerSet: {
        immediate: true,
        deep: true,
        handler() {
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
