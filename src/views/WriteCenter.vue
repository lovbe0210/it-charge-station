<template>
  <div class="editor-wrapp">
    <b-row class="editor-header">
      <div class="dropdown-wrapp">
        <div :class="display ? 'start-dropdown mock-hover' : 'start-dropdown'" id="menu_tips">
          <span :class="display ? 'iconfont icon-menu-open' : 'iconfont icon-menu-close'"></span>
        </div>
      </div>

      <b-tooltip target="menu_tips" :show.sync="display" placement="bottomleft" triggers="click" delay="200"
                 variant="secondary" custom-class="tips-content">
          <b-list-group class="tip-content" flush>
            <b-list-group-item to="/">
              <span class="iconfont icon-home"></span>首页
            </b-list-group-item>
            <b-list-group-item to="some-link">
              <span class="iconfont icon-quick-start">快捷入口</span>
            </b-list-group-item>
            <b-list-group-item to="some-link">
              <span class="iconfont icon-like">收藏</span>
            </b-list-group-item>
            <b-list-group-item to="some-link">
              <span class="iconfont icon-new-doc">新建</span>
            </b-list-group-item>
          </b-list-group>


      </b-tooltip>

    </b-row>
    <b-row>
      <editor></editor>
    </b-row>
  </div>
</template>

<script>
  import Editor from '@/components/common/Editor'

  export default {
    name: 'Follow',
    data() {
      return {
        startMenuList: [
          {
            uid: "sd12",
            value: ""
          },
          {
            uid: "sd12",
            value: "首页首页首页"
          },
          {
            uid: "asfdsf44",
            value: "专题首页首页"
          },
          {
            uid: "sd1dfsf432",
            value: "最近首页首页"
          },
          {
            uid: "sd1213ds2",
            value: "收藏首页首页"
          },
          {
            uid: "sd1678ds2",
            value: "导入首页首页"
          }
        ],
        display: false,
        title: 'asdada'
      }
    },
    methods: {},
    components: {
      Editor
    },
    mounted() {
      this.$root.$on('bv::tooltip::show', bvEvent => {
        if (bvEvent.target.id === 'menu_tips') {
          // 切换图标显示
          this.display = false
        }
      })
      this.$root.$on('bv::tooltip::hide', bvEvent => {
        if (bvEvent.target.id === 'menu_tips') {
          // 切换图标显示
          this.display = true
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  @import '../components/css/editor.less';
</style>
