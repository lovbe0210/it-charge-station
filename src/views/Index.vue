<template>
  <b-container class="index">
    <b-row>
      <Header/>
    </b-row>
    <b-row v-if="!showContext">
      <Body :activeName="activeName" @onSelect="onSelect"/>
    </b-row>
    <b-row v-if="!showContext">
      我是foot
    </b-row>
  </b-container>
</template>

<script>
  import Header from '@/components/Header'
  import Body from '@/components/Body'

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
      Body
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
