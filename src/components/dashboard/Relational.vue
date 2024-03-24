<template>
  <div class="layout-module_relational" ref="popoverContainer">
    <div class="relational-header">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title">
          <div>
            <ul
              class="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-light NavTitle-module_menu_ENB53"
              role="menu" tabindex="0" data-menu-list="true">
              <li
                class="ant-menu-overflow-item ant-menu-item ant-menu-item-selected ant-menu-item-only-child"
                role="menuitem" tabindex="-1" data-menu-id="rc-menu-uuid-12448-2-User"
                style="opacity: 1; order: 0;"><a
                href="/explore/follows?type=User&amp;userId=21362681">关注</a></li>
              <li class="ant-menu-overflow-item ant-menu-item ant-menu-item-only-child" role="menuitem"
                  tabindex="-1" data-menu-id="rc-menu-uuid-12448-2-Fans" style="opacity: 1; order: 1;"><a
                href="/explore/follows?type=Fans&amp;userId=21362681">粉丝</a></li>
              <li
                class="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal ant-menu-submenu-disabled"
                aria-hidden="true" role="none"
                style="opacity: 0; height: 0px; overflow-y: hidden; order: 2147483647; pointer-events: none; position: absolute;">
                <div role="menuitem" class="ant-menu-submenu-title" title="..." aria-expanded="false"
                     aria-haspopup="true" data-menu-id="rc-menu-uuid-12448-2-rc-menu-more"
                     aria-controls="rc-menu-uuid-12448-2-rc-menu-more-popup" aria-disabled="true">...<i
                  class="ant-menu-submenu-arrow"></i></div>
              </li>
            </ul>
            <div aria-hidden="true" style="display: none;"></div>
          </div>
        </div>
        <div class="ant-card-extra"><span class="ant-input-affix-wrapper larkui-input-search"><span
          class="ant-input-prefix"><span role="img" aria-label="search" class="anticon anticon-search"><svg
          viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em"
          fill="currentColor" aria-hidden="true"><path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span></span><input
          autocomplete="off" placeholder="搜索" spellcheck="true" class="ant-input" type="text"
          value=""></span></div>
      </div>
    </div>
    <div class="relational-body">
      <Table :columns="tableHeader"
             :data="relationanList"
             no-data-text="空空如也，快去首页看看吧">
        <template slot-scope="{ row }" slot="userName">
          <user-card :userInfo="row" :popoverContainer="popoverContainer">
            <slot>
              {{ row.username }}
            </slot>
          </user-card>

        </template>
        <template slot-scope="{ row }" slot="status">
            <span>
              {{ row.iFollow + '' + row.followMe }}
            </span>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  import UserCard from "@/components/common/UserCard.vue";
  export default {
    name: 'Relational',
    data() {
      return {
        tableHeader: [
          {
            title: '名称',
            slot: 'userName',
            width: 200
          },
          {
            title: '简介',
            key: 'introduction',
            width: 300
          },
          {
            title: ' ',
            slot: 'status',
            width: 170
          }
        ],
        // iFollow/followMe: 0 没有任何关系 1 已关注/关注我的
        relationanList: [
          {
            id: 121112,
            username: '安沐夕',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
            introduction: '追求卓越，学无止境！程序猿，键盘艺术家，运动（间歇性）爱好者',
            domain: 'asd34dsff',
            iFollow: 0,
            followMe: 1
          },
          {
            id: 2235663,
            username: 'HappyDragon1994',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho0pjm24n7j30m80rsn0a.jpg',
            introduction: 'work hard,play hard',
            domain: 'asd34dsasdff',
            iFollow: 1,
            followMe: 0
          },
          {
            id: 11553436,
            username: 'bravo1988',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjmc45ij30m80rlgp3.jpg',
            introduction: '书写是思维的缓存',
            domain: '23dfsssgg55',
            iFollow: 1,
            followMe: 0
          },
          {
            id: 33442222,
            username: '咔咔',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
            introduction: 'PHP的一个小青年',
            domain: 'sasdasdas',
            iFollow: 1,
            followMe: 1
          },
          {
            id: 1214424,
            username: '白白bai',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
            introduction: '好白好白就是好白',
            domain: 'sasdasdas',
            iFollow: 0,
            followMe: 1
          },
          {
            id: 754345353,
            username: 'IT\'S ME!',
            avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
            introduction: '这就是我',
            domain: 'ssds2323',
            iFollow: 1,
            followMe: 1
          }
        ],
        popoverContainer: null
      }
    },
    props: ['relational'],
    methods: {},
    components: {
      UserCard
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    }
  }
</script>

<style scoped lang="less">
  .layout-module_relational {
    width: 100%;
    height: 100%;

    .relational-header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      font-style: normal;

      .title {
        width: auto;
        height: 32px;
        line-height: 32px;
        color: #262626;
        font-size: 20px;
        font-weight: 600;
      }

      .separator-line {
        width: calc(~"90% - 260px");
      }

      .operation {
        width: 280px;
        display: flex;
        flex-direction: row;
        padding-left: 10px;

        .search {
          width: 240px;
          height: 32px;
          position: relative;
          box-sizing: border-box;

          /deep/ * {
            height: 32px;
            line-height: 32px;
            background-color: unset;
          }

          /deep/ .ivu-input:hover, /deep/ .ivu-input:focus {
            //border-color: #00B96B;
            outline: 0;
            box-shadow: none;
          }
        }

        .action {
          display: flex;
          align-items: center;
          color: #262626;
          margin-left: 15px;

          .icon-box {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 1px solid #dbdada;
            background: #FFFFFF;
            border-radius: 5px;

            .filter {
              color: #262626;
            }
          }

          /deep/ .ivu-select-dropdown {
            margin-top: 10px;
          }

          .ivu-dropdown-menu {
            margin-bottom: 0;

            .ivu-dropdown-item {
              display: flex;
              justify-content: center;

              color: #262626;
              font-size: 14px !important;

              .iconfont {
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .relational-body {
      margin-bottom: 0 !important;
      padding: 20px 0 20px 10px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;

      /deep/ .ivu-table-header {
        table > thead > tr > th {
          background-color: #FAFAFA;

          .ivu-table-cell {
            span {
              color: #262626;
              font-weight: normal;
            }
          }
        }
      }

      /deep/ .ivu-table-body {
        overflow-x: hidden !important;

        table > tbody {
          tr {
            td {
              .ivu-table-cell {
                color: #585A5A;

                span {
                  display: block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }

            td:nth-child(1) {
              .ivu-table-cell {
                cursor: pointer;
              }
            }

            td:first-child {
              .ivu-table-cell {
                color: #262626;
              }
            }
          }

          .ivu-table-row-hover td {
            background-color: #FAFAFA;
          }

        }
      }

      /deep/ .ivu-table-tip {
        overflow-x: hidden;
        margin-top: 50px;

        table > tbody > tr > td {
          border: unset;

          span {
            color: #8A8F8D;
          }
        }
      }

      /deep/ .ivu-table:before {
        display: none;
      }
    }
  }

  // userCard
  .ant-popover-inner {
    width: 120px;
  }

  .ant-popover-inner:hover {
    background: #FAFAFA;
  }

  .ant-popover-arrow {
    display: none;
  }

  /deep/ .user-info-card-box {

    .ant-popover-arrow {
      display: none;
    }

    .user-info-card {
      display: flex;
      margin: 15px 10px;
      justify-content: space-around;

      .user-avatar {
        margin-right: 15px;
      }

      .user-content {
        font-size: 16px;

        a {
          color: #585A5A;
        }

        .user-info {
          margin-bottom: 10px;

          .name {
            margin-right: 5px;
          }

          .iconfont {
            font-size: 20px;
          }

        }

        .social-info {
          margin-bottom: 15px;
          font-size: 14px;

          a {
            color: #8A8F8D;
          }

          .attention, .follower {
            margin-right: 8px;
          }

        }

        .card-btn {

          button:first-child {
            margin-right: 12px;
          }

        }
      }
    }
  }
</style>
