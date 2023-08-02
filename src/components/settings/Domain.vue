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
            <div v-show="readmeEmpty" class="readme-module_empty" @click="readmeEmpty = false">
              <p class="readme-module_emptyTitle">
                <span class="iconfont icon-music-add"></span>
                添加自定义介绍
              </p>
              <p class="readme-module_emptyDesc">
                可以参考
                <a href="https://www.yuque.com/yuque/mgcsc6/obl3qs" target="_blank">案例</a>
              </p>
              <p class="Readme-module_emptyDesc">没有自定义介绍时，访客视角没有这个模块</p>
            </div>
            <div v-show="!readmeEmpty" class="readme-module_editor">
              <div class="editorBase-module_editor">
                <div>
                  <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="toolbarUI()"/>
                </div>
                <div class="readme-editor" ref="container"></div>
              </div>
              <div class="readme-module_action">
                <button type="button" class="readme-module_submitBtn" :disabled="editorValue == null">
                  <span>确定</span>
                </button>
                <a class="readme-module_cancel">取消</a></div>
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
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  import Toolbar from 'am-editor-toolbar-vue2'
  import {plugins, cards, pluginConfig} from "@/components/common/editor/config"
  import {belongToc, getParentNode} from "../common/editor/utils";

  export default {
    name: 'Domain',
    data() {
      return {
        userInfo: {
          nickname: '布衣草人',
          level: 6,
          follow: true
        },
        engine: null,
        // 工具栏内容：下拉面板、
        items: [
          [
            {
              icon: '<span class="iconfont icon-editor-toolbar-add" style="font-size: 18px;"></span>',
              type: 'collapse',
              groups: [
                {
                  items: [
                    'image-uploader',
                    'codeblock',
                    'table',
                    'file-uploader',
                    'video-uploader',
                    'math',
                    'status'
                    /*{
                      name: "audio-uploader",
                      icon: '<span style="width:23px;height:23px;display: inline-block;border:1px solid #E8E8E8;"><svg style="top: 2px;position: relative;" t="1636128560405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28042" width="16" height="16"><path d="M877.854 269.225l-56.805-56.806-121.726-123.079c-24.345-21.64-41.928-27.050-68.978-27.050h-451.737c-31.108 0-55.453 24.345-55.453 55.453v789.865c0 29.755 24.345 54.1 55.453 54.1h666.787c31.108 0 55.453-24.345 55.453-54.1v-584.284c0-24.345-8.115-35.165-22.993-54.1v0zM830.516 289.513h-156.891v-156.891l156.891 156.891zM856.213 907.609c0 5.409-4.057 10.821-10.821 10.821h-666.787c-6.762 0-12.172-5.409-12.172-10.821v-789.865c0-6.762 5.409-12.172 12.172-12.172 0 0 451.737 0 451.737 0v205.582c0 12.173 9.468 21.64 21.64 21.64h204.229v574.816zM723.668 413.943c-117.668-1.353-246.157 22.993-363.825 59.511-9.468 4.058-10.821 5.409-10.821 14.877v210.991c-12.172-5.409-27.050-6.762-41.927-5.409-45.985 1.353-82.503 29.755-82.503 60.862 0 31.108 36.517 55.453 82.503 52.748 45.985-2.706 82.503-29.755 82.503-60.863v-193.409c109.553-25.698 209.638-43.28 312.429-51.395v150.128c-12.173-5.409-25.698-6.762-40.576-6.762-45.985 2.706-82.503 29.755-82.503 62.215 0 31.108 36.517 55.453 82.503 52.748 44.632-2.706 82.503-29.755 82.503-60.863v-267.797c0-13.525-6.762-16.23-20.287-17.583z" p-id="28043"></path></svg><span>',
                      title: "音频",
                      search: "音频,audio"
                    }*/
                  ]
                }
              ]
            }
          ],
          ['heading', 'bold', 'orderedlist', 'unorderedlist', 'link']
        ],
        editorValue: null,
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
        readmeEmpty: true
      }
    },
    components: {
        Toolbar
      },
    methods: {
      getTooltipContainer() {
        return this.tooltipContainer;
      },
      toolbarUI() {
        // 选色器
        // let colorPicker
        // setTimeout(() => {
        //   new Promise(function (resolve, reject) {
        //     let interval = setInterval(() => {
        //       colorPicker = document.getElementById('toolbar').children[0].childNodes[4]
        //       if (colorPicker !== null && colorPicker !== undefined) {
        //         clearInterval(interval)
        //         resolve()
        //       }
        //     }, 10)
        //   }).then(() => {
        //     colorPicker.childNodes.forEach(s => {
        //       s.childNodes.forEach(ss => {
        //         ss.childNodes.forEach(sss => {
        //           if (sss.hasChildNodes()) {
        //             sss.childNodes.forEach(ssss => {
        //               if (ssss.hasChildNodes()) {
        //                 ssss.children[0].setAttribute('width', '20px');
        //                 ssss.children[0].setAttribute('height', '20px');
        //               }
        //             })
        //           }
        //         })
        //       })
        //     })
        //   })
        // }, 100)
      }
    },
    mounted() {
      if (this.tooltipContainer == null) {
        this.tooltipContainer = this.$refs.tooltipContainer;
      }
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          autoPrepend: false,
          // 文档提示语
          placeholder: '输入 / 唤起更多'
        });
        // 设置显示成功消息UI，默认使用 console.log
        engine.messageSuccess = (msg) => {
          console.log(msg);
        };
        // 设置显示错误消息UI，默认使用 console.error
        engine.messageError = (error) => {
          console.log(error);
        };
        //卡片最大化时设置编辑页面样式
        engine.on("card:maximize", () => {
          $(".editor-toolbar").css("z-index", "9999").css("top", "0");
          $(".card-maximize-header").css("height", "60px");
          // $(".editor-toolbar").css("z-index", "9999");
        });
        engine.on("card:minimize", () => {
          $(".editor-toolbar").css("z-index", "").css("top", "");
        });

        // 监听编辑器值改变事件
        engine.on("change", () => {
          let range = engine.change.range.get();
          let collapsed = range?.collapsed;
          let startNode = collapsed ? range.startNode : range.endNode;
          let parentNode = getParentNode(startNode);
          // 1. 更新标题(单行节点)
          let nodeName = parentNode?.name;
          if (belongToc(nodeName)) {
            this.renderTocData(engine);
          } else {
            // 2. 处理status影响其他文字
            let children = parentNode?.children("span[data-card-key=\"status\"]");
            if (children !== undefined && children.length !== 0) {
              // 给当前节点去掉样式
              startNode.removeAttributes('style')
              startNode.allChildren().forEach(child => child?.removeAttributes('style'))
            }
          }
        });

        if (this.editorValue && this.editorValue.length > 0) {
          engine.setJsonValue(JSON.parse(this.editorValue))
          const pattern = /h[1-6]/;
          let match = this.editorValue.match(pattern);
          if (match) {
            this.renderTocData(engine);
          }
        }

        this.engine = engine;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/domain.less';
</style>
