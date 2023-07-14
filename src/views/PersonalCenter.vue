<template>
  <div class="personal-center" ref="tooltipContainer">
    <header class="layout-module_head">
      <div class="layout-header-left">
        <a href="/" target="_blank">
          <div class="charge-station-logo">
            <span class="iconfont icon-logo"></span>
          </div>
        </a>
      </div>
      <div class="layout-header-center"/>
      <div class="layout-header-right"/>
    </header>
    <div class="layout-main_wrapper">
      <div id="main-right-content" class="layout-module_MainContent">
        <div class="layout-module_MainContentChildren">
          <div class="main-container user-homepage">
            <div class="userInfo-module_userWrapper">
              <div class="userInfo-module_avatarWrapper">
                <div class="ant-image">
                  <img alt="小黑bu惑" class="userInfo-module_avatar"
                       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                </div>
              </div>
              <div class="userInfo-module_info">
                <div class="userInfo-module_name">
                  <div>
                    <span class="userInfo-module_nickname" title="布衣草人">
                      布衣草人
                    </span>
                  </div>
                  <div class="userInfo-module_level">
                    <span :class="'iconfont icon-level' + 6"></span>
                  </div>
                  <div class="userInfo-module_action">
                    <button :class="['userInfo-module_followBtn', userInfo.follow ? 'default_followBtn' : '']"
                            @click="userInfo.follow = !userInfo.follow">
                      <span>已关注</span>
                    </button>
                  </div>
                </div>
                <div class="userInfo-module_description">我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑</div>
                <div class="userInfo-module_detail">
                  <span class="index-module_meta">
                    <span class="iconfont icon-location"></span>
                    <span>天下为公</span>
                  </span>
                  <span class="index-module_meta">
                    <span class="iconfont icon-industry"></span>
                    <span>新时代『农民工』</span>
                </span>
                </div>
                <div class="userInfo-module_followInfo">
                  <a href="/explore/follows?type=User&userId=27044221" class="userInfo-module_followItem"
                     target="_blank">
                    <p class="userInfo-module_count">18</p>
                    <p class="userInfo-module_label">
                      <span>关注</span>
                    </p>
                  </a>
                  <a href="/explore/follows?type=Fans&userId=27044221" class="userInfo-module_followItem"
                     target="_blank">
                    <p class="userInfo-module_count">211</p>
                    <p class="userInfo-module_label">
                      <span>粉丝</span>
                    </p>
                  </a>
                  <div></div>
                  <div class="userInfo-module_followingFollowers">
                    <div class="FollowingFollowers-module_followItemLine"></div>
                    <p class="FollowingFollowers-module_info_lD4gv">
                      <a class="FollowingFollowers-module_users_jY6FN" href="/kanding" target="_blank">
                        <img loading="lazy" data-testid="img-avatar" src="" class="img" alt=""
                             style="width: 18px; min-width: 18px; height: 18px; border-radius: 9px;">
                        <span>njnj</span>
                      </a>
                      <span class="FollowingFollowers-module_text">
                        等<b class="larkui-popover-trigger">1</b>人也关注了他
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="readme-module_userBoardParent">
              <div class="readme-module_userBoard">
                <div ref="viewContainer"></div>
              </div>
            </div>
            <div class="personalBooks-module_pbContainer">
              <div class="bookStack-module_stack">
                <div class="bookStack-module_header">
                  <span class="homepage-header">知识库</span>
                </div>
              </div>
              <div class="personalBooks-module_pbContent">
                <div class="larkui-sortable">
                  <div class="personalBooks-module_pbContentItem">
                    <div class="personalBooks-module_pbContentItemTop">
                      <img :src="require('@/assets/img/2.jpg')" alt="">
                    </div>
                    <div class="personalBooks-module_pbContentItemBot">
                      <p class="personalBooks-module_pbContentItemBotTitle">Java开发技术手册</p>
                      <p class="personalBooks-module_pbContentItemBotDesc">个人学习、工作常用知识或工作遇到问题的小记</p>
                      <p class="personalBooks-module_pbContentItemBotViewCount">
                        <span>14784</span> 次看过
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hotmap-module_hotmap">
              <div class="hotmap-module_title">
                <span class="hotmap-module_label">创作指数</span>
                <div class="hotmap-module_exhibition">
                  <span class="hotmap-module_exhibitionDesc">不活跃</span>
                  <div class="hotmap-module_exhibitionBlock">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <span class="hotmap-module_exhibitionDesc">活跃</span>
                </div>
              </div>
              <div class="hotmap">
                <svg width="998.14" height="158.84000000000003" class="hotmap-module_hotmapSvg hotmap-svg">
                  <g :transform="'translate(' + (4+index*19.14) + ')'" v-for="(dayItem,index) in hotMap.dayBox" :key="index">
                    <a-tooltip overlayClassName="personal-center-tooltip" v-for="(item,index) in dayItem" :key="index"
                               :getPopupContainer="getTooltipContainer">
                      <template slot="title">
                        {{item.day + ' ' + item.week}}
                      </template>
                      <rect class="hotmapRender-module_dayBox" width="14" height="14" rx="2" ry="2"
                            x="0" :y="index * 19.14" :data-level="item.level" >
                      </rect>
                    </a-tooltip>
                  </g>
                  <g transform="translate(4, 136.84)" height="16">
                    <text v-for="(item,index) in hotMap.monthLabel" :key="index" class="hotmapRender-module_monthLabel"
                          :x="19.14 * item.firstDayByWeek" y="0">
                      {{item.month}}
                    </text>
                  </g>
                </svg>
              </div>
            </div>
            <p class="homepage-header" style="margin-bottom: 20px; margin-top: 96px;">更新</p>
            <div class="leastUpdate-module_cardList">
              <a-timeline>
                <a-timeline-item >Create a services site 2015-09-01</a-timeline-item>
                <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
                <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
                <a-timeline-item>宇宙有起点，更新也是</a-timeline-item>
              </a-timeline>
              <div class="leastUpdate-module_end">宇宙有起点，更新也是</div>
            </div>
          </div>
        </div>
        <div>
          <div id="footer" class="footer" data-testid="footer">
            <div class="footer-container">
              <div class="footer-container-sitemap">
                <div class="slogan" data-testid="slogan"><img
                  src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*IVdnTJqUp6gAAAAAAAAAAAAADvuFAQ/original"
                  alt="语雀" class="theme-image" style="height: 24px;"></div>
                <span class="split"></span>
                <div class="links" data-testid="links"><a href="/help/about" target="_blank"
                                                          data-desktoptarget="_browser" class="">关于语雀</a><a href="/help"
                                                                                                            target="_blank"
                                                                                                            data-desktoptarget="_browser"
                                                                                                            class="">使用帮助</a><a
                  href="/about/security" target="_blank" data-desktoptarget="_browser" class="">数据安全</a><a href="/terms"
                                                                                                           target="_blank"
                                                                                                           data-desktoptarget="_browser"
                                                                                                           class="">服务协议</a><span
                  class="split"></span><a href="?language=en-us" target="_self" data-desktoptarget="_browser" class="">English</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PersonCenter',
    data() {
      return {
        tooltipContainer: null,
        userInfo: {
          nickname: '布衣草人',
          level: 6,
          follow: true
        },
        hotMap: {
          monthLabel: [
            {
              month: '8月',
              firstDayByWeek: 2
            }, {
              month: '9月',
              firstDayByWeek: 6
            }, {
              month: '10月',
              firstDayByWeek: 10
            }, {
              month: '11月',
              firstDayByWeek: 15
            }, {
              month: '12月',
              firstDayByWeek: 19
            }, {
              month: '1月',
              firstDayByWeek: 24
            }, {
              month: '2月',
              firstDayByWeek: 28
            }, {
              month: '3月',
              firstDayByWeek: 32
            }, {
              month: '4月',
              firstDayByWeek: 36
            }, {
              month: '5月',
              firstDayByWeek: 41
            }, {
              month: '6月',
              firstDayByWeek: 45
            }, {
              month: '7月',
              firstDayByWeek: 49
            }
          ],
          dayBox: [
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: 4
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: 1
              }
            ],
            [
              {
                day: '2022-07-11',
                week: '周一',
                level: 1
              },
              {
                day: '2022-07-12',
                week: '周二',
                level: 3
              },
              {
                day: '2022-07-13',
                week: '周三',
                level: 0
              },
              {
                day: '2022-07-14',
                week: '周四',
                level: 5
              },
              {
                day: '2022-07-15',
                week: '周五',
                level: 0
              },
              {
                day: '2022-07-16',
                week: '周六',
                level: -1
              },
              {
                day: '2022-07-17',
                week: '周日',
                level: -1
              }
            ]
          ]
        },
        leastUpdateList: [
          {
            articleId: 'asada23sdfsf',
            time: '07-04 15:23',
            title: 'Nginx ——— 深入浅出',
            summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
            cover: require('@/assets/cover/cover1.png'),
            simplifyLikeCount: 233
          },
          {
            articleId: 'asada23sdfsf',
            time: '07-04 15:23',
            title: 'Nginx ——— 深入浅出',
            summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
            cover: '',
            simplifyLikeCount: 233
          },
          {
            articleId: 'asada23sdfsf',
            time: '07-04 15:23',
            title: 'Nginx ——— 深入浅出',
            summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
            cover: require('@/assets/cover/cover2.png'),
            simplifyLikeCount: 233
          }
        ]
      }
    },
    computed: {
      currentFontIndex() {
        return this.docStyle.fontSizeRange.findIndex(
          (item) => item === this.docStyle.docFontSize
        );
      }
    },
    methods: {
      getTooltipContainer() {
        return this.tooltipContainer;
      }
    },
    mounted() {
      if (this.tooltipContainer == null) {
        this.tooltipContainer = this.$refs.tooltipContainer;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/personal-center.less';
</style>
