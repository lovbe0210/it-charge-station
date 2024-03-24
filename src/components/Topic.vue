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
      <a-card hoverable v-for="item in topicList" :key="item.uid" size="small" class="topic-card">
        <img slot="cover" alt="example" :src="item.coverUrl"/>
        <a-card-meta>
          <template slot="description">
            <b-avatar :src="item.avatar" variant="light" :to="'/' + item.personalDomain" class="topic-avatar">
              <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
            </b-avatar>
            <div class="card-content-item">
              <p class="topic-title" :title="item.title">
                {{item.title}}
              </p>
              <p class="topic-description" :title="item.describe">
                {{item.describe}}
              </p>
              <p class="topic-viewCount">
                <span>{{item.viewCount}}</span>次看过
              </p>
            </div>
          </template>
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
            personalDomain: "lovbe0210",
            title: "Java开发技术手册",
            coverUrl: require('@/assets/img/1.jpg'),
            describe: "个人学习、工作常用知识或工作遇到问题的小记",
            viewCount: 1002,
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47gm06y9j20m80rsq8t.jpg'
          }, {
            uid: "002",
            personalDomain: "lzy8684",
            title: "开发精品文章",
            coverUrl: require('@/assets/img/2.jpg'),
            describe: "该知识库用于收藏平常遇到过的一些关于技术的文章（涵盖前端与后端）",
            viewCount: 4202,
            avatar: 'https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg'
          }, {
            uid: "003",
            personalDomain: "wuyiwa",
            title: "Linux 系统环境部署大飒飒大啊实打实多",
            coverUrl: require('@/assets/img/3.jpg'),
            describe: "讲解 Linux 系统部署 Java 项目需要的环境",
            viewCount: 502,
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gxzk3fro87j20nc0ncq3z.jpg'
          }, {
            uid: "004",
            personalDomain: "whalexplorer",
            title: "我是第4个",
            coverUrl: require('@/assets/img/4.jpg'),
            avatar: 'https://tvax2.sinaimg.cn/large/718153f4gy1gy47gj6p22j20xc0p0n1v.jpg',
            viewCount: 308,
            describe: "水电费师傅是"
          }, {
            uid: "005",
            personalDomain: "jiaowovitamin",
            title: "我是第5个",
            coverUrl: require('@/assets/img/5.jpg'),
            avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1hnp2j1mz4yj30k00tzdli.jpg',
            viewCount: 100,
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
