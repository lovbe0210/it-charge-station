<template>
  <div class="editor-center">
    <b-row class="editor-header">
      <div class="editor-header-wrap">
        <div class="dropdown-wrap">
          <div :class="display ? 'start-dropdown mock-hover' : 'start-dropdown'" id="menu_tips">
            <span :class="display ? 'iconfont icon-menu-open' : 'iconfont icon-menu-close'"></span>
          </div>
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
          <Button id="editor-setting">
            <span class="iconfont icon-edit-more"/>
          </Button>
        </div>
      </div>
    </b-row>
    <b-row>
      <editor @updateTitle="updateTitle" :title="doc.title"></editor>
    </b-row>

    <b-tooltip target="menu_tips" placement="bottomright" delay="250" triggers="hover"
               variant="secondary" custom-class="menu-content" boundary-padding="55">
      <b-list-group class="tip-content" flush>
        <b-list-group-item to="/" style="display: flex;align-items: center;">
          <span class="iconfont icon-home" style="margin-right: 10px;font-size: 18px;"></span>
          <span>首页</span>
        </b-list-group-item>
        <b-list-group-item style="display: flex;align-items: center;" @mouseenter="isHover1(true)"
                           @mouseleave="isHover1(false)">
          <span class="iconfont icon-quick-start" style="margin-right: 10px;font-size: 18px;"></span>
          <Dropdown placement="right-start" trigger="custom" :visible="visible1">
            <span>快捷入口<span class="iconfont icon-more" style="margin-left: 40px;"></span></span>
            <DropdownMenu slot="list" ref="menuTip1">
              <DropdownItem v-for="item in quickStart" :key="item.uid" :name="item.title">{{item.title}}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </b-list-group-item>
        <b-list-group-item style="display: flex;align-items: center;" @mouseenter="isHover2(true)"
                           @mouseleave="isHover2(false)">
          <span class="iconfont icon-like" style="margin-right: 10px;font-size: 18px;"></span>
          <Dropdown :transfer="false" placement="right-start" trigger="custom" :visible="visible2">
            <span>收藏<span class="iconfont icon-more" style="margin-left: 68px;"></span></span>
            <DropdownMenu slot="list" ref="menuTip2">
              <DropdownItem v-for="item in quickStart" :key="item.uid" :name="item.title">{{item.title}}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </b-list-group-item>
        <b-list-group-item to="some-link" style="display: flex;align-items: center;">
          <span class="iconfont icon-new-doc" style="margin-right: 10px;font-size: 18px;"></span>
          <span>新建</span>
        </b-list-group-item>
      </b-list-group>
    </b-tooltip>
    <b-tooltip target="update-btn" placement="bottomright" delay="250" triggers="hover" variant="dark"
               container="update-btn">
      <div style="width: 120px; color: #FFFFFF; font-size: 12px;">
        已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新
      </div>
    </b-tooltip>
    <b-tooltip target="editor-setting" placement="bottomleft" delay="250" triggers="focus"
               variant="secondary" custom-class="setting-content" id="set-wrap" boundary-padding="55"
               style="width: 500px;">
      <b-list-group flush>
        <b-list-group-item to="/">
          <span class="iconfont icon-edit-setting" style="margin-right: 10px;font-size: 18px;"></span>
          <span>
            文档样式<span class="iconfont icon-more" style="margin-left: 100px;"></span>
            <br>
            <span style="color: #8c8c8c; font-size: 12px;">正文大小、超宽模式…</span>
          </span>
        </b-list-group-item>
        <b-list-group-item to="/">
          <span style="margin-left: 30px;">文档设置</span>
        </b-list-group-item>
        <b-list-group-item to="/">
          <span class="iconfont icon-history" style="margin-right: 10px;font-size: 18px;"></span>
          <span>查看历史版本</span>
        </b-list-group-item>
        <b-list-group-item to="/">
          <span style="margin-left: 30px;">保存为版本</span>
        </b-list-group-item>
        <b-list-group-item to="/" style="border-bottom: 1px solid #EEEEEE">
          <span style="margin-left: 30px;">删除</span>
        </b-list-group-item>
        <b-list-group-item style="color: #8c8c8c; font-size: 12px;display: block">
          <div style="margin: 0 0 10px 30px;">字数统计：0</div>
          <div style="margin: 0 0 10px 30px;">创建于：03-15</div>
          <div style="margin: 0 0 10px 30px;">最后编辑于：昨天 11:20</div>
        </b-list-group-item>
      </b-list-group>
    </b-tooltip>
  </div>
</template>

<script>
  import Editor from '@/components/common/editor/Editor'

  export default {
    name: 'Follow',
    data () {
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
        display: false,
        visible1: false,
        visible2: false
      }
    },
    methods: {
      isHover1 (flag) {
        this.visible1 = flag
        if (flag) {
          this.$refs.menuTip1.$el.parentElement.setAttribute('style', 'margin: -5px 0 0 16px;')
        }
      },
      isHover2 (flag) {
        this.visible2 = flag
        if (flag) {
          this.$refs.menuTip2.$el.parentElement.setAttribute('style', 'margin: -5px 0 0 16px;')
        }
      },
      /**
       * 手动更新文档内容
       */
      updateDocConten () {

      },
      /**
       * 为子组件定义的事件方法
       */
      updateTitle (titleValue) {
        this.doc.title = titleValue;
      }
    },
    components: {
      Editor
    },
    mounted () {
      this.$root.$on('bv::tooltip::show', bvEvent => {
        if (bvEvent.target.id === 'menu_tips') {
          // 切换图标显示
          this.display = true
        }
      })
      this.$root.$on('bv::tooltip::hide', bvEvent => {
        if (bvEvent.target.id === 'menu_tips') {
          // 切换图标显示
          this.display = false
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  @import '../components/css/write-center.less';
</style>
