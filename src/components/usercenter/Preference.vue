<template>
  <div class="layout-module_preference">
    <h1 class="preference-setting-title">偏好设置</h1>
    <div class="general-setting preference-setting-item">
      <h2 class="setting-subtitle">通用设置</h2>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>配置更新规则</h4>
          <p>当云端配置项和本地配置项冲突时配置更新原则（包括自定义主题、音乐播放列表和文档专栏等配置项）</p>
        </div>
        <div class="setting-item-switch">
          <Select v-model="userConfigs.configFrom" @on-change="updateUserConfig">
            <Option v-for="item in configFromOptions" :value="item.key" :key="item.key">
              {{ item.title }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>访问权限</h4>
          <p>默认互联网可访问，新创建的文档、专栏和随笔默认生效，仍然可以在文档、专栏和随笔页面修改访问权限。</p>
        </div>
        <div class="setting-item-switch">
          <div class="permission-input">
            <Poptip class="un-select"
                    confirm
                    placement="right"
                    @on-ok="userConfigs.defaultPublic = 1"
                    @on-cancel="userConfigs.defaultPublic = 0">
              <div class="public-radio">
                <input type="radio"
                       value="1"
                       :class="userConfigs.defaultPublic ? 'checked' : ''"
                       @click="readPublicPermission"/>
                <span class="permission-label un-select">互联网可访问</span>
              </div>
              <div slot="title">
            <span>
              开启后，互联网所有获得链接的人皆可访问专栏内的全部内容。你需对其合法合规性负责，遵守相关法律法规及it充电站
            </span>
                <a class="color: #43C8EC" href="/">服务协议</a>
                <span>
              约定，违规内容可能无法被查看。
            </span>
              </div>
            </Poptip>
            <div class="private-radio" @click="userConfigs.defaultPublic = 0">
              <input type="radio"
                     id="initPrivate"
                     value="0"
                     :class="userConfigs.defaultPublic ? '' : 'checked'"/>
              <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
            </div>
          </div>
        </div>
      </div>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>主题同步</h4>
          <p>阅读写作页面是否同步自定义主题</p>
        </div>
        <div class="setting-item-switch">
          <i-switch v-model="userConfigs.asyncTheme"
                    :true-value="1"
                    @on-change="updateUserConfig">
          </i-switch>
        </div>
      </div>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>自动发布</h4>
          <p>文档保存时，自动将内容更新至阅读页。自动发布不会发送动态或消息。注意：打开开关并不会发布已有的文档，文档发布后需要审核通过后才会被公开访问。</p>
        </div>
        <div class="setting-item-switch">
          <i-switch v-model="userConfigs.autoPublish"
                    :true-value="1"
                    @on-change="updateUserConfig">
          </i-switch>
        </div>
      </div>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>评论功能</h4>
          <p>默认开启，关闭后所有用户都无法评论，专栏可单独开启评论功能</p>
        </div>
        <div class="setting-item-switch">
          <i-switch v-model="userConfigs.enableComment"
                    :true-value="1"
                    @on-change="updateUserConfig">
          </i-switch>
        </div>
      </div>
    </div>
    <div class="article-settings preference-setting-item">
      <h2 class="setting-subtitle">文档设置</h2>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>页面尺寸</h4>
          <p>阅读写作页面大小，设置为超宽模式后文档宽度将自适应屏幕大小</p>
        </div>
        <div class="setting-item-switch">
          <Select v-model="userConfigs.pageSize" @on-change="updateUserConfig">
            <Option v-for="item in pageSizeOptions" :value="item.key" :key="item.key">
              {{ item.title }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="settings-form-item">
        <div class="setting-item-label">
          <h4>正文大小</h4>
          <p>对新创建的文档默认生效，仍然可以在文档编辑器内设置中修改单篇文档正文大小</p>
        </div>
        <div class="setting-item-switch font-size-select">
          <span class="font-size-label">{{userConfigs.docFontSize + 'px'}}</span>
          <div class="slider-module_slideContainer un-select">
            <div class="ant-slider ant-slider-with-marks classic">
              <div class="ant-slider-rail"></div>
              <div class="ant-slider-step">
                <div v-for="(item,index) in fontSizeRange"
                     :key="index"
                     @click="updateUserConfig({docFontSize: item})"
                     class="slider-dot-wrapp"
                     :style="'left: '+ (index * 100/(fontSizeRange.length-1) - 3) + '%;'">
                  <span class="slider-dot"/>
                </div>
              </div>
              <div class="ant-slider-handle"
                   :style="'left: ' +
                            (currentFontIndex === 0 ? '1.5' : currentFontIndex === (fontSizeRange.length -1) ? '98.5' : (currentFontIndex * 100/(fontSizeRange.length-1))) +
                           '%;'">
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
  name: 'Preference',
  data() {
    return {
      userConfigs: {
        // 配置项更新原则：1云端 0本地
        configFrom: 1,
        // 阅读写作页面是否同步自定义主题
        asyncTheme: 1,
        // 阅读写作页面大小
        pageSize: 1,
        // 开启评论功能
        enableComment: 1,
        // 开启自动发布功能
        autoPublish: 1,
        // 正文大小
        docFontSize: 15,
        // 默认是否公开
        defaultPublic: 1
      },
      configFromOptions: [
        {
          key: 1,
          title: '云端数据'
        },
        {
          key: 0,
          title: '本地数据'
        }
      ],
      pageSizeOptions: [
        {
          key: 1,
          title: '超宽模式'
        },
        {
          key: 0,
          title: '标宽模式'
        }
      ],
      fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19]
    }
  },
  computed: {
    currentFontIndex() {
      return this.fontSizeRange.findIndex(
        (item) => item === this.userConfigs.docFontSize
      );
    }
  },
  methods: {
    readPublicPermission(event) {
      event.preventDefault();
    },
    updateUserConfig(config) {
      this.userConfigs = Object.assign({}, this.userConfigs, config);
      this.$Message.success('保存成功！')
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
@import '../css/usercenter/preference.less';
</style>
