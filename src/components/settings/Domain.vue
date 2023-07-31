<template>
  <div class="layout-module_domain" ref="tooltipContainer">
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
              <editor ref="editorContainer"></editor>
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
                <g :transform="'translate(' + (4+index*19.14) + ')'" v-for="(dayItem,index) in hotMap.dayBox"
                   :key="index">
                  <a-tooltip overlayClassName="personal-center-tooltip" v-for="(item,index) in dayItem" :key="index"
                             :getPopupContainer="getTooltipContainer">
                    <template slot="title">
                      {{item.day + ' ' + item.week}}
                    </template>
                    <rect class="hotmapRender-module_dayBox" width="14" height="14" rx="2" ry="2"
                          x="0" :y="index * 19.14" :data-level="item.level">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Editor from '@/components/common/editor/Editor'

  export default {
    name: 'Domain',
    data() {
      return {
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
        }
      }
    },
    components: {
      Editor
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
  @import '../css/setting/domain.less';
</style>
