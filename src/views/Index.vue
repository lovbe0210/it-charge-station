<template>
  <b-container class="index">
      <Header/>
      <router-view class="show"></router-view>
  </b-container>
</template>

<script>
  import Header from '@/components/Header'

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
      Header
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
