<template>
    <b-container class="container">
      <b-row>
        <b-col :cols="AdaptiveCols">
          <!--主体页面选择-->
          <div class="top-show">
            <Menu mode="horizontal" :active-name="activeName" @on-select="onSelect" class="top">
              <MenuItem name="follow" to="/follow" :on-select="onSelect">
                关注
              </MenuItem>
              <MenuItem name="recommend" to="/recommend" :on-select="onSelect">
                推荐
              </MenuItem>
              <MenuItem name="hot" to="/hot" :on-select="onSelect">
                热榜
              </MenuItem>
            </Menu>

            <!--            <hr size="1px" noshade=true style="background-color: #F5F5F5"/>-->

            <router-view class="show"></router-view>
          </div>
        </b-col>
        <b-col cols="4">

        </b-col>
      </b-row>
    </b-container>


    <!-- 推荐和个人收藏 -->


</template>

<script>
  export default {
    name: 'Body',
    data () {
      return {}
    },
    computed: {
      // 从vuex中获取上一次的选中菜单项
      activeName () {
        return this.$store.state.activeName
      },
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      AdaptiveCols () {
        // flag值其实表的是
        return this.$store.state.isPhone ? 12 : 8
      }
    },
    methods: {
      /**
       * 当前选择的显示项
       * @param activeName
       */
      onSelect (activeName) {
        this.$store.commit('changeActiveRoute', activeName)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/body.less";
</style>
