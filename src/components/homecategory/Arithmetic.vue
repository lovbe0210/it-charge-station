<template>
  <div class="layout-module_Arithmetic category">
    <div class="arithmetic-module_header">
      <div v-for="menuTag in tagList"
           :key="menuTag.id"
           @click="activeTag = menuTag.id"
           :class="['tag-menu', 'un-select', menuTag.id === activeTag ? 'active' : '']">
        <span>{{menuTag.name}}</span>
      </div>
    </div>
    <div class="arithmetic-module_list">
      <CategoryContainer></CategoryContainer>
    </div>
  </div>
</template>

<script>
  import CategoryContainer from "../CategoryContainer";

  export default {
    name: "Arithmetic",
    data() {
      return {
        tagList: [
          {
            id: 121,
            name: '推荐',
            sort: 1
          },
          {
            id: 122,
            name: '数据结构',
            sort: 2
          },
          {
            id: 123,
            name: '算法思想',
            sort: 3
          },
          {
            id: 124,
            name: '力扣题解',
            sort: 4
          },
          {
            id: 125,
            name: '其他',
            sort: 5
          }
        ],
        activeTag: 121
      }
    },
    components: {
      CategoryContainer
    },
    watch: {
      activeTag(newValue) {
        console.log('该更新数据了')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/homecategory/arithmetic.less";
</style>
