<template>
  <div class="host-container">
    <Menu mode="horizontal" :active-name="activeName" @on-select="onSelect" class="top">
      <MenuItem name="follow" to="/follow" :on-select="onSelect">
        关注
      </MenuItem>
      <MenuItem name="recommend" to="/recommend" :on-select="onSelect">
        推荐
      </MenuItem>
      <MenuItem name="hot" to="/topic" :on-select="onSelect">
        专栏
      </MenuItem>
    </Menu>
    <router-view class="show"></router-view>
  </div>
</template>

<script>
    export default {
        name: "HostContainer",
        data() {
            return {}
        },
      computed: {
        // 从vuex中获取上一次的选中菜单项
        activeName() {
          return this.$store.state.activeName
        }
      },
      methods: {
        /**
         * 当前选择的显示项
         * @param activeName
         */
        onSelect(activeName) {
          this.$store.commit('changeActiveRoute', activeName)
        }
      }
    }
</script>

<style scoped lang="less">
  @import './css/common-var.less';

  .ivu-menu-light {
    background-color: transparent;
  }
  // 左侧div
  .host-container {
    .top {
      border-radius: 3px;
      margin-bottom: 30px;
      margin-left: 20px;
    }

    ul > a {
      color: var(--font-color) !important;;
      font-size: 14px !important;;
    }

    ul > a:hover {
      color: var(--title-color) !important;
      border-bottom: 0px solid #e5e5e5 !important;
    }

    ul > a.ivu-menu-item-active {
      color: var(--title-color) !important;;
      font-weight: 900 !important;
      border-bottom: 2px solid var(--title-color) !important;;
    }

  }
</style>
