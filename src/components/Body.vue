<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="8">
          <!--主体页面选择-->
          <div class="top-show">
            <Menu mode="horizontal" :active-name="activeName" @on-select="onSelect" class="top">
              <MenuItem name="follow" class="route" to="/follow" :on-select="onSelect">
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


  </div>
</template>

<script>
  export default {
    name: 'Body',
    data () {
      return {}
    },
    props: ['activeName'],
    computed: {
      /*activeName() {
        return this.$store.state.activeName;
      }*/
    },
    beforeRouteEnter (to, from, next) {
      console.log(to + '--' + from + '--' + next)
      next();
    },
    methods: {
      /**
       * 当切
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
