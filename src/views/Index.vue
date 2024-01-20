<template>
  <b-container class="index">
      <Header/>
      <router-view class="show"></router-view>
      <back-top></back-top>
  </b-container>
</template>

<script>
  import Header from '@/components/Header'
  import BackTop from '@/components/common/BackTop';

  export default {
    name: 'Index',
    data () {
      return {
        activeName: 'recommend'
      }
    },
    computed: {
      showContext () {
        return this.$store.state.showContext
      }
    },
    mounted () {
      // 重新进入页面是需要重置菜单页的显示
      this.$store.commit('changeShowContext', false)
    },
    components: {
      Header,
      BackTop
    },
    methods: {
      onSelect (value) {
        this.activeName = value
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
