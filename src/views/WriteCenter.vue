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
            <b-list-group-item to="/" style="display: flex;align-items: center;">
              <span class="iconfont icon-home" style="margin-right: 10px;font-size: 18px;"></span>
              <span>首页</span>
            </b-list-group-item>
            <b-list-group-item style="display: flex;align-items: center;">
              <span class="iconfont icon-quick-start" style="margin-right: 10px;font-size: 18px;"></span>
              <Dropdown trigger="hover" :transfer="false" @on-click="sortBy" placement="right-start" transfer-class-name="quick-start">
                <span>快捷入口<span class="iconfont icon-more" style="margin-left: 40px;"></span></span>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="item in quickStart" :key="item.uid" :name="item.title">{{item.title}}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </b-list-group-item>
            <b-list-group-item style="display: flex;align-items: center;">
              <span class="iconfont icon-like" style="margin-right: 10px;font-size: 18px;"></span>
              <span>收藏<span class="iconfont icon-more" style="margin-left: 68px;"></span></span>
            </b-list-group-item>
            <b-list-group-item to="some-link" style="display: flex;align-items: center;">
              <span class="iconfont icon-new-doc" style="margin-right: 10px;font-size: 18px;"></span>
              <span>新建</span>
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
        quickStart: [
          {
            uid: "sd12",
            title: "小红书",
            type: "1"
          },
          {
            uid: "sd12",
            title: "如何牢记Linux指令",
            type: "2"
          },
          {
            uid: "asfdsf44",
            title: "JVM调优指南",
            type: "2"
          }
        ],
        display: false,
        quickDisplay: true
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
        if (this.quickDisplay) {
          bvEvent.preventDefault();
        }

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
