<template>
  <div class="index">
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row>
        <Header/>
      </b-row>
    </b-container>

    <!--分割线-->
    <hr class="line_01"/>

    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row>
        <Body :activeName="activeName" @onSelect="onSelect"/>
      </b-row>
      <b-row>
        我是foot
      </b-row>
    </b-container>


  </div>
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
    components: {
      Header,
      Body
    },
    methods: {
      onSelect(value) {
        this.activeName = value;
      }
    }
  }
</script>

<style lang="less" scoped>
  .line_01 {
    line-height: 1px;
    background-color: #DEE2E6;
  }
</style>
