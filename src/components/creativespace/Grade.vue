<template>
  <div class="layout-module_grade" ref="tooltipContainer">
    <h1 class="setting-title">成长等级</h1>
    <div class="layout-module_level layout-module_item">
      <div class="level-module_nickName">
        <span class="nick-name">{{ userInfo?.username }}</span>
      </div>
      <div class="level-module_experienceBar">
              <span class="experience-bar-body">
                  <div class="progressBar">
                    <span class="experience-bar-level">LV{{ userInfo?.level }}</span>
                    <span data-v-852cd7a8="" class="experience-bar-progress">
                      进度条
                      <span data-v-852cd7a8="" class="experience-bar-upgo" :style="{width: expPercent}"></span>
                    </span>
                  </div>
              </span>
        <span class="experience-bar-level-number">
                <i class="now-num">{{ userInfo?.growthValue }}</i>
                <i class="num-icon">/</i>
                <i class="max-num">{{ nextLevelExp }}</i>
              </span>
      </div>
    </div>
    <h1 class="setting-title">每日奖励</h1>
    <div class="layout-module_dailyReward layout-module_item">
      <div class="dailyReward-module_exp">
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span :class="['iconfont', dailyEncourage.hasLogin ? 'completed' : 'un-complete']"></span>
            <p class="daily-exp-info">每日登录</p>
            <p :class="dailyEncourage.hasLogin ? 'daily-exp-getexp' : 'daily-exp-none'">
              {{ dailyEncourage.loginExp }}经验值到手
            </p>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span
              :class="['iconfont', dailyEncourage.readSize === 0 ? 'un-complete' : dailyEncourage.readSize === dailyEncourage.maxRead ? 'completed' : 'completing']"></span>
            <p class="daily-exp-info">每日浏览文章</p>
            <p :class="dailyEncourage.readSize === 0 ? 'daily-exp-none' : 'daily-exp-getexp'">
              已获得{{
                dailyEncourage.readSize * dailyEncourage.readExp + '/' + dailyEncourage.readExp * dailyEncourage.maxRead
              }}
            </p>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="daily-exp-item">
          <div class="daily-exp-box">
            <span :class="['iconfont', dailyEncourage.hasWrite ? 'completed' : 'un-complete']"></span>
            <p class="daily-exp-info">每日写作</p>
            <p :class="dailyEncourage.hasLogin ? 'daily-exp-getexp' : 'daily-exp-none'">
              {{ dailyEncourage.writeExp }}经验值到手
            </p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="setting-title">充电激励</h1>
    <div class="layout-module_chargeIncentive layout-module_item">
      <div class="chargeIncentive-module_wrapper">
        <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/charge.jpg"
             class="charge-incentive-left-img">
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
        <li class="acquire-rule-wrapper-item-wrapper" v-for="(rule, index) in encourageRule" :key="index">
          <div class="acquire-rule-item">
            <span class="acquire-rule-text">{{ rule.behaviorType }}</span>
            <span class="acquire-rule-count">
                      电池 +{{ rule.encourageScore }} <span class="iconfont icon-battery"/>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <h1 class="setting-title points">激励权益</h1>
    <Tabs class="layout-module_pointsHistory layout-module_item" value="">
      <TabPane label="激励明细" name="pointsHistory">
        <div class="points-history">
          <div class="history-list-header">
            <div class="list-row">
              <div class="list-col list-col-behavior">操作</div>
              <div class="list-col list-col-time">时间</div>
              <div class="list-col list-col-score list-module_tr">电池数</div>
            </div>
          </div>
          <div class="history-list-container">
            <ul class="history-list-items">
              <li class="history-list-item" v-for="encourageLog in encourageLogList" :key="encourageLog.uid">
                <div class="list-row">
                  <div class="list-col list-col-behavior">
                    <p class="list-module_operate">
                      <span class="encourage-log-mark">
                        {{ encourageLog.behaviorMark }}
                      </span>

                      <span :class="['encourage-log-title', encourageLog.behaviorType === 5 ? 'log-fans' : encourageLog.behaviorType === 4 ? 'log-comment' : '', ]"
                            :title="encourageLog.targetName">
                        {{ encourageLog.targetName }}
                      </span>
                    </p>
                  </div>
                  <div class="list-col list-col-time">
                    {{ formatTime2H(encourageLog.createTime) }}
                  </div>
                  <div class="list-col list-col-score">
                    <p class="list-module_tr">
                      +{{ encourageLog.encourageScore }}<span class="iconfont icon-battery"></span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="history-list-pagination un-select">
            <div class="pagination-prefix">
              <span>总共{{ pageHolder.total }}条</span>
            </div>
            <b-pagination
              v-model="pageHolder.current"
              :total-rows="pageHolder.total"
              :per-page="pageHolder.pageSize"
              @change="onChange"
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
              {{ pageHolder.pageSize }}条/页
              <span :class="['iconfont', 'expand', showSelection ? 'rotate' : '']"></span>
            </span>
                <DropdownMenu slot="list">
                  <DropdownItem name="15" :selected="pageHolder.pageSize == 15">15条/页</DropdownItem>
                  <DropdownItem name="30" :selected="pageHolder.pageSize == 30">30条/页</DropdownItem>
                  <DropdownItem name="50" :selected="pageHolder.pageSize == 50">50条/页</DropdownItem>
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
import userApi from "@/api/UserApi";
import {formatTime2H} from "@/utils"

export default {
  name: 'Grade',
  data() {
    return {
      showSelection: false,
      levelExp: {
        level1: 100,
        level2: 300,
        level3: 900,
        level4: 2800,
        level5: 9000,
        level6: 28800
      },
      dailyEncourage: {
        hasLogin: true,
        loginExp: 5,
        readSize: 0,
        maxRead: 5,
        readExp: 2,
        hasWrite: false,
        writeExp: 5
      },
      encourageRule: [],
      pageHolder: {
        pageSizeOptions: ['15', '30', '50'],
        current: 1,
        pageSize: 30,
        total: 0
      },
      encourageLogList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    nextLevelExp() {
      let level = 'level' + (this.userInfo?.level === 6 ? 6 : (this.userInfo?.level + 1));
      let willExp = this.levelExp[level];
      return willExp;
    },
    expPercent() {
      let growthValue = this.userInfo?.growthValue;
      if (!growthValue) {
        return '0%';
      }
      let level = 'level' + (this.userInfo?.level === 6 ? 6 : (this.userInfo?.level + 1));
      let willExp = this.levelExp[level];
      let percentage = growthValue / willExp * 100;
      return Math.floor(percentage) + '%';
    }
  },
  methods: {
    formatTime2H,
    onChange(pageNumber) {
      let queryPage = {
        offset: (pageNumber - 1) * this.pageHolder.pageSize,
        limit: this.pageHolder.pageSize
      };
      userApi.getEncourageLogList(queryPage).then(data => {
        if (data?.result) {
          this.pageHolder.total = data.data.total;
          this.encourageLogList = data.data.list;
        }
      })
    },
    changePageSize(selectPageSize) {
      this.pageHolder.pageSize = selectPageSize;
      this.pageHolder.current = 1;
      this.onChange(1);
    },
    visibleChange(visible) {
      this.showSelection = visible;
    }
  },
  created() {
    // 获取等级经验条
    userApi.getLevelExp().then(data => {
      if (data?.result) {
        this.levelExp = data.data;
      }
    })

    // 获取每日经验
    userApi.getDailyEncourage().then(data => {
      if (data?.result) {
        this.dailyEncourage = data.data;
      }
    })

    // 获取激励规则
    userApi.getEncourageRule().then(data => {
      if (data?.result) {
        this.encourageRule = data.data;
      }
    })

    // 获取激励明细
    this.onChange(this.pageHolder.current);
  }
}
</script>

<style scoped lang="less">
@import '../css/creativespace/grade.less';
</style>
