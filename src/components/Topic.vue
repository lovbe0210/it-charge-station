<template>
  <b-container fluid>
    <b-row class="header-row">
      <Dropdown trigger="click" :transfer="true" @on-click="sortBy">
        <a href="javascript:void(0)">
          {{sortedValue.at(curSort).name}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="item in sortedValue" :key="item.value" :selected="curSort === item.value"
                        :name="item.value">{{item.name}}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </b-row>
    <b-row class="topic-row">
      <Card v-for="item in topicList" :key="item.uid" class="topic-card">
        <b-img :src="item.coverUrl" height="200px" width="230" :rounded="true"/>
        <p class="title">{{item.title}}</p>
        <p class="desc">{{item.describe}}</p>
      </Card>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Topic',
    data() {
      return {
        curSort: 0,
        sortedValue: [
          {
            value: 0,
            name: "最多收藏"
          },
          {
            value: 1,
            name: "最多浏览"
          },
          {
            value: 2,
            name: "最新发布"
          }
        ],
        topicList: [
          {
            uid: "001",
            title: "http://阿斯达四大",
            coverUrl: require('@/assets/img/1.jpg'),
            describe: "水电费师傅是"
          }, {
            uid: "002",
            title: "我是第2个",
            coverUrl: "http://阿斯达四大",
            describe: "水电费师傅是"
          }, {
            uid: "003",
            title: "我是第3个",
            coverUrl: "http://阿斯达四大",
            describe: "水电费师傅是"
          }, {
            uid: "004",
            title: "我是第4个",
            coverUrl: "http://阿斯达四大",
            describe: "水电费师傅是"
          }, {
            uid: "005",
            title: "我是第5个",
            coverUrl: "http://阿斯达四大",
            describe: "水电费师傅是"
          }
        ]
      }
    },
    methods: {
      sortBy(val) {
        if (val !== this.curSort) {
          // 条件发生变化，更新list
          this.curSort = val
          alert('list刷新')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/topic.less";
  @import "./css/common-var";
</style>
