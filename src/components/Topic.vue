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
      <a-card hoverable style="width: 225px" v-for="item in topicList" :key="item.uid" size="small" class="topic-card">
        <img slot="cover" alt="example" :src="item.coverUrl"/>
        <a-card-meta :title="item.title" :description="item.describe">
          <b-avatar :src="item.avatar" variant="light" :to="'/some-link' + item.id" slot="avatar">
            <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
          </b-avatar>
        </a-card-meta>
      </a-card>
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
            describe: "水电费师傅是",
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47gm06y9j20m80rsq8t.jpg'
          }, {
            uid: "002",
            title: "我是第2个",
            coverUrl: require('@/assets/img/2.jpg'),
            describe: "水电费师傅是",
            avatar: 'https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg'
          }, {
            uid: "003",
            title: "我是第3个",
            coverUrl: require('@/assets/img/3.jpg'),
            describe: "水电费师傅是",
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gxzk3fro87j20nc0ncq3z.jpg'
          }, {
            uid: "004",
            title: "我是第4个",
            coverUrl: require('@/assets/img/4.jpg'),
            avatar: 'https://tvax2.sinaimg.cn/large/718153f4gy1gy47gj6p22j20xc0p0n1v.jpg',
            describe: "水电费师傅是"
          }, {
            uid: "005",
            title: "我是第5个",
            coverUrl: require('@/assets/img/5.jpg'),
            avatar: 'https://tva3.sinaimg.cn/large/718153f4gy1gy47gg8nutj20m80m8te2.jpg',
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
