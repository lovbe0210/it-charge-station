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
    name: "Middleware",
    data() {
      return {
        tagList: [
          {
            id: 121,
            name: '全部',
            sort: 1
          },
          {
            id: 122,
            name: 'Nginx',
            sort: 2
          },
          {
            id: 123,
            name: 'Tomcat',
            sort: 3
          },
          {
            id: 126,
            name: 'Redis',
            sort: 4
          },
          {
            id: 124,
            name: 'RabbitMQ',
            sort: 4
          },
          {
            id: 125,
            name: 'Kafka',
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
  .layout-module_Arithmetic {

    .arithmetic-module_header {
      font-size: 14px;
      height: 32px;
      line-height: 32px;

      .tag-menu {
        display: inline-block;
        max-width: 99px;
        line-height: 14px;
        border-radius: 4px;
        padding: 8px 10px;
        margin-right: 16px;

        span{
          cursor: pointer;
          color: #585A5A;

          &:hover {
            color: #262626;
          }
        }
      }

      .active {
        background-color: #E7E9E8;
      }
    }

    .arithmetic-module_list {
      margin-top: 30px;
    }
  }
</style>
