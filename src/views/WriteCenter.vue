<template>
  <div class="editor-center">
    <b-row class="editor-header">
      <div class="left-dropdown-wrapp">
        <Dropdown trigger="click" placement="bottom-start">
          <div class="menu-icon">
            <span class="iconfont icon-menu-dots"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem>
              <div>
                <span class="iconfont icon-home"/>
                首页
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-like"/>
              收藏
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-new-doc"/>
              新建
            </DropdownItem>
            <DropdownItem>
              <span class="iconfont icon-collapse"/>
              专题
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <b-list-group class="title-info" flush>
        <b-list-group-item class="title">
          {{doc.title === null || doc.title.length === 0 ? '无标题文档' : doc.title}}
        </b-list-group-item>
        <b-list-group-item class="author-info">
          <a href="">@福</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">/</span>
          <a href="">从头开始</a>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">|</span>
          <a href="" class="update-time">最后更新于今天 12:23<span class="iconfont icon-cloud"/></a>
        </b-list-group-item>
      </b-list-group>
      <div class="editor-setting">
        <b-button class="update-btn" variant="outline-*" size="sm" @click="updateDocConten" id="update-btn">
          更新
        </b-button>
        <Dropdown placement="bottom-end" trigger="click">
          <div class="setting-icon">
            <span class="iconfont icon-edit-more"/>
          </div>
          <DropdownMenu slot="list">
            <Dropdown placement="left-start" class="doc-set-style-wrapp" trigger="click">
              <DropdownItem>
                <div class="editor-set doc-set-style">
                  <span class="editor-icon iconfont icon-editor-style"/>
                  <div>
                    <span>文档样式</span>
                    <span class="iconfont icon-editor-more"></span>
                    <br>
                    <span style="color: #8c8c8c; font-size: 12px;">设置正文大小、段间距、超宽…</span>
                  </div>
                </div>
              </DropdownItem>
              <DropdownMenu slot="list">
                <div class="font-size">
                  <div class="Slider-module_slideTitle">
                    <san>正文大小</san>
                  </div>
                  <div class="Slider-module_slideContainer">
                    <div class="ant-slider ant-slider-with-marks classic">
                      <div class="ant-slider-rail"></div>
                      <div class="ant-slider-step">
                        <div v-for="(item,index) in fontSizeRange" :key="index" @click="changeFontSise(item)" class="slider-dot-wrapp"
                             :style="'left: '+ index * 100/(fontSizeRange.length-1) + '%;'">
                          <span class="ant-slider-dot" :style="'left: '+ index * 100/(fontSizeRange.length-1) + '%;'"/>
                        </div>
                      </div>
                      <div class="ant-slider-handle" :style="'left: ' + currentFontIndex * 100/(fontSizeRange.length-1) + '%;'">
                      </div>
                    </div>
                  </div>
                  <div>{{docFontSize}}px</div>
                </div>
                <div>段间距</div>
                <div>保存为默认设置</div>
                <Divider/>
                <div>
                  页面尺寸
                </div>
              </DropdownMenu>
            </Dropdown>
            <Divider/>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-editor-setting"></span>
                <span>文档设置</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-history"></span>
                <span>查看历史版本</span>
              </div>
            </DropdownItem>
            <DropdownItem>
              <span class="editor-set for-version">保存为版本</span>
            </DropdownItem>
            <Divider/>
            <DropdownItem>
              <div class="editor-set">
                <span class="editor-icon iconfont icon-editor-del"></span>
                <span>删除</span>
              </div>
            </DropdownItem>
            <Divider/>
            <div class="doc-info">
              <div>字数统计：0</div>
              <div>创建于：03-15</div>
              <div>最后编辑于：昨天 11:20</div>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    </b-row>
    <b-row>
      <editor @updateTitle="updateTitle" :title="doc.title"></editor>
    </b-row>

    <b-tooltip target="update-btn" placement="bottomright" delay="250" triggers="hover" variant="dark"
               container="update-btn">
      <div style="width: 120px; color: #FFFFFF; font-size: 12px;">
        已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新
      </div>
    </b-tooltip>
  </div>
</template>

<script>
  import Editor from '@/components/common/editor/Editor'

  export default {
    name: 'Follow',
    data() {
      return {
        doc: {
          title: '我是标题'
        },
        quickStart: [
          {
            uid: '234sdf',
            title: '小红书',
            type: '1'
          },
          {
            uid: 'sd12',
            title: '如何牢记Linux指令',
            type: '2'
          },
          {
            uid: 'asfdsf44',
            title: 'JVM调优指南',
            type: '2'
          }
        ],
        // 默认字体大小
        fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19],
        docFontSize: 15
      }
    },
    computed: {
      currentFontIndex() {
        return this.fontSizeRange.findIndex(
          (item) => item === this.docFontSize
        );
      }
    },
    methods: {
      /**
       * 手动更新文档内容
       */
      updateDocConten() {

      },
      /**
       * 为子组件定义的事件方法
       */
      updateTitle(titleValue) {
        this.doc.title = titleValue;
      },
      changeFontSise(value) {
        this.docFontSize = value;
      }
    },
    components: {
      Editor
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/write-center.less';
</style>
