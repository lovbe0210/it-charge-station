<template>
  <div class="layout-module_grade" ref="tooltipContainer">
    <h1 class="setting-title">成长等级</h1>
    <div class="layout-module_level layout-module_item">
      <div class="level-module_nickName">
        <span class="nick-name">布衣草人</span>
      </div>
      <div class="level-module_experienceBar">
              <span class="experience-bar-body">
                  <div class="progressBar">
                    <span class="experience-bar-level">LV5</span>
                    <span data-v-852cd7a8="" class="experience-bar-progress">
                      进度条
                      <span data-v-852cd7a8="" class="experience-bar-upgo" style="width: 55.41%;"></span>
                    </span>
                  </div>
                  <span class="experience-bar-level-number">
                    <i class="now-num">15947</i>
                    <i class="num-icon">/</i>
                    <i class="max-num">28800</i>
                  </span>
              </span>
      </div>
    </div>
    <h1 class="setting-title">每日奖励</h1>
    <div class="layout-module_dailyReward layout-module_item">
      <div class="dailyReward-module_exp">
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span class="iconfont icon-exp-complete"></span>
            <p class="daily-exp-info">每日登录</p>
            <p class="daily-exp-getexp">5经验值到手</p>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span class="iconfont icon-exp-complete"></span>
            <p class="daily-exp-info">每日浏览文章</p>
            <p class="daily-exp-getexp">5经验值到手</p>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span class="iconfont icon-wait-complete"></span>
            <p class="daily-exp-info">每日写作</p>
            <p class="daily-exp-none">已获得0/10</p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="setting-title">充电激励</h1>
    <div class="layout-module_chargeIncentive layout-module_item">
      <div class="chargeIncentive-module_wrapper">
        <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/charge.jpg" class="charge-incentive-left-img">
        <div class="charge-incentive-content">
          <p class="charge-incentive-title">
            已获得
            <span class="charge-incentive-count">142</span>
            节电池
          </p>
          <p class="charge-incentive-tip">
            电池可通过收获文档点赞等方式获得，积累电池可兑换相应权益
          </p>
        </div>
      </div>
    </div>
    <h1 class="setting-title">获取规则</h1>
    <div class="layout-module_acquireRule">
      <ul class="acquire-rule-wrapper">
        <li class="acquire-rule-wrapper-item-wrapper">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">发表 1 篇文档</span>
            <span class="acquire-rule-count">
                      电池 +3 <span class="iconfont icon-battery"/>
                    </span>
          </div>
        </li>
        <li class="acquire-rule-wrapper-item-wrapper">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">内容获得 1 个点赞</span>
            <span class="acquire-rule-count">
                      电池 +2 <span class="iconfont icon-battery"/>
                    </span>
          </div>
        </li>
        <li class="acquire-rule-wrapper-item-wrapper">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">文档获得 1 次精选</span>
            <span class="acquire-rule-count">
                      电池 +5 <span class="iconfont icon-battery"/>
                    </span>
          </div>
        </li>
        <li class="acquire-rule-wrapper-item-wrapper">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">内容获得 1 条评论</span>
            <span class="acquire-rule-count">
                      电池 +1 <span class="iconfont icon-battery"/>
                    </span>
          </div>
        </li>
        <li class="acquire-rule-wrapper-item-wrapper">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">新增 1 个粉丝</span>
            <span class="acquire-rule-count">
                      电池 +3 <span class="iconfont icon-battery"/>
                    </span>
          </div>
        </li>
      </ul>
    </div>
    <h1 class="setting-title points">积分权益</h1>
    <Tabs class="layout-module_pointsHistory layout-module_item" value="">
      <TabPane label="积分记录" name="pointsHistory">
        <div class="points-history">
          <div class="history-list-header">
            <div class="list-row">
              <div class="list-col list-col-14">操作</div>
              <div class="list-col list-col-6">时间</div>
              <div class="list-col list-col-3 list-module_tr">电池数</div>
            </div>
          </div>
          <div class="history-list-container">
            <ul class="history-list-items">
              <li class="history-list-item" v-for="pointsGetItem in pointsHistory.list" :key="pointsGetItem.id">
                <div class="list-row">
                  <div class="list-col list-col-14">
                    <p class="list-module_operate">
                      {{
                      pointsGetItem.operateType === 1 ? '创建了文档' :
                      pointsGetItem.operateType === 2 ? '关注了' :
                      pointsGetItem.operateType === 3 ? '获得一个赞' :
                      pointsGetItem.operateType === 4 ? '获得一条评论' :
                      pointsGetItem.operateType === 5 ? '入选精选推荐' : ''
                      }}
                      <span class="list-module_content">
                                <span v-if="pointsGetItem.operateType === 2">
                                  <a :href="'/' + pointsGetItem.userDomain" target="_blank" class="doc-link"
                                     :title="pointsGetItem.content">
                                    {{pointsGetItem.content}}
                                  </a>
                                </span>
                              <span v-else>
                                  《
                                  <a :href="'/readCenter/doc/' + pointsGetItem.docId" target="_blank" class="doc-link">
                                    <span class="doc-title" :title="pointsGetItem.content">{{pointsGetItem.content}}</span>
                                  </a>
                                  》
                                </span>
                              </span>
                    </p>
                  </div>
                  <div class="list-col list-col-6">
                    2023-08-09 09:29
                  </div>
                  <div class="list-col list-col-3">
                    <p class="list-module_tr">
                      +3<span class="iconfont icon-battery"></span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="history-list-pagination un-select">
            <div class="pagination-prefix">
              <span>总共{{pageHolder.total}}条</span>
            </div>
            <b-pagination
              v-model="pageHolder.current"
              :total-rows="pageHolder.total"
              :per-page="pageHolder.pageSize"
              first-number
              last-number>
              <template #prev-text>
                <span class="iconfont return"></span>
              </template>
              <template #next-text>
                <span class="iconfont to-right"></span>
              </template>
              <template #ellipsis-text>
                <span class="iconfont operate-standard"></span>
              </template>
            </b-pagination>
            <div class="pagination-suffix">
              <Dropdown placement="top"
                        trigger="click"
                        transfer-class-name="dropdown-background dropdown-item-all-hover"
                        @on-visible-change="visibleChange"
                        @on-click="changePageSize">
            <span class="pageSize-select">
              {{pageHolder.pageSize}}条/页
              <span :class="['iconfont', 'expand', showSelection ? 'rotate' : '']"></span>
            </span>
                <DropdownMenu slot="list">
                  <DropdownItem name="15" :selected="pageSize == 15">15条/页</DropdownItem>
                  <DropdownItem name="30" :selected="pageSize == 30">30条/页</DropdownItem>
                  <DropdownItem name="50" :selected="pageSize == 50">50条/页</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="权益兑换" name="pointsRedemption">
        <div class="points-redemption">
          <span>敬请期待</span>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  export default {
    name: 'Grade',
    data() {
      return {
        showSelection: false,
        pageHolder: {
          pageSizeOptions: ['15', '30', '50'],
          current: 1,
          pageSize: 15,
          total: 520
        },
        pointsHistory: {
          total: 52,
          list: [
            {
              id: 1234435364646,
              operateType: 1,
              content: '我的标题呢',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234431364646,
              operateType: 2,
              content: '小黑bu惑',
              userDomain: 'lovbe0210',
              points: 1
            },
            {
              id: 1234435364616,
              operateType: 2,
              content: '安木夕',
              userDomain: 'lovbe0210',
              points: 1
            },
            {
              id: 1234435364642,
              operateType: 1,
              content: 'canal数据同步',
              docId: 'asdasdasdas',
              points: 1
            },
            {
              id: 1274435364646,
              operateType: 1,
              content: 'es安装启动问题',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364648,
              operateType: 1,
              content: '常用SQL语法',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364606,
              operateType: 3,
              content: '3. linux系统软件安装',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364640,
              operateType: 3,
              content: 'Redission',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364546,
              operateType: 3,
              content: '浅谈Redis分布式锁(上)',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364653,
              operateType: 4,
              content: '决策指挥大屏系统V4.30数据同步',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435364813,
              operateType: 4,
              docId: 'asdasdasdas',
              content: '2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序',
              points: 3
            },
            {
              id: 1234435364610,
              operateType: 5,
              docId: 'asdasdasdas',
              content: '2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序',
              points: 3
            },
            {
              id: 1234435361653,
              operateType: 4,
              content: '决策指挥大屏系统V4.30数据同步',
              docId: 'asdasdasdas',
              points: 3
            },
            {
              id: 1234435360813,
              operateType: 4,
              docId: 'asdasdasdas',
              content: '2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序',
              points: 3
            },
            {
              id: 1234435364690,
              operateType: 5,
              docId: 'asdasdasdas',
              content: '2. Spring中bean的初始化过程以及在Springboot中定制化的执行顺序',
              points: 3
            }
          ]
        }
      }
    },
    methods: {
      onShowSizeChange(current, pageSize) {
        this.pageHolder.pageSize = pageSize;
        this.pageHolder.current = current;
        this.onChange(current);
      },
      onChange(pageNumber) {
        console.log('Page: ', pageNumber, 'Size: ', this.pageHolder.pageSize);
      },
      changePageSize(selectPageSize) {
        this.pageHolder.pageSize = selectPageSize;
      },
      visibleChange(visible) {
        this.showSelection = visible;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/grade.less';
</style>
