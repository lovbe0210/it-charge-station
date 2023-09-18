<template>
  <div class="layout-module_SeriesColumn" ref="TooltipContainer">
    <div class="column-home-header">
      <h2 class="title">个人专栏</h2>
      <hr class="separator-line">
      <div class="operation">
        <div class="action">
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                新建专栏
              </template>
              <span class="iconfont add"></span>
            </a-tooltip>
          </div>
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                详情展示
              </template>
              <span class="iconfont list" @click="columnShowType = 2"></span>
            </a-tooltip>
          </div>
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                图文展示
              </template>
              <span class="iconfont detail" @click="columnShowType = 1"></span>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="column-home-list">
      <div class="column-list-item" v-for="columnItem in seriesColumnList" :key="columnItem.id">
        <div class="column-card-body">
          <div class="column-cover" v-show="columnShowType == 1">
            <a class="cover-box" href="/lovbe0210/nhagpt">
              <img :src="columnItem.coverImg" alt="啊实打实">
            </a>
          </div>
          <div class="column-meta">
            <div class="meta-icon">
              <span class="iconfont icon-article"></span>
            </div>
            <div class="meta-content">
              <div class="meta-title">
                <a :href="columnItem.columnHome" class="column-link" target="_self">
                  <span class="column-title">
                    <span v-if="!editColumnName" class="column-name">
                      <span class="column-name-text" :title="columnItem.columnName">{{columnItem.columnName}}</span>
                      <span :class="['iconfont', columnItem.isPublic === 1 ? 'public' : 'icon-lock']"></span>
                    </span>
                    <span v-else class="column-name">
                      <Input/>
                    </span>
                  </span>
                </a>
                <div class="meta-menu">
                  <Dropdown trigger="hover" placement="bottom-end" @on-click="routeNavigate">
                    <a href="javascript:void(0)">
                      <span class="icon-box">
                        <span class="iconfont icon-nav-menu"></span>
                      </span>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem name="scope">
                        <span class="iconfont permissions"></span>权限
                      </DropdownItem>
                      <DropdownItem name="rename">
                        <span class="iconfont rename"></span>重命名
                      </DropdownItem>
                      <DropdownItem name="setting">
                        <span class="iconfont icon-editor-setting"></span>更多设置
                      </DropdownItem>
                      <DropdownItem name="delete">
                        <span class="iconfont delete"></span>删除
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div class="meta-description">
                <span class="columns-description" :title="columnItem.desc">{{columnItem.desc}}</span>
              </div>
            </div>
          </div>
          <div v-show="columnShowType == 2" class="column-article">
            <div class="empty-li" v-if="columnItem.articleList == null || columnItem.articleList.length === 0">
              <span>专栏暂无内容</span>
            </div>
            <div v-else>
              <ul>
                <li v-for="articleItem in columnItem.articleList" :key="articleItem.articleId">
                  <a target="_blank" :href="'/domain/columnId/' + articleItem.articleId"
                     :title="articleItem.articleName"
                     class="columnsummary-module_item">
                    <span class="columnsummary-module_itemText">{{articleItem.articleName}}</span>
                    <span class="columnsummary-module_itemTime">{{articleItem.updateTime}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box">
      <Modal
        v-model="showModal"
        :title="changePermission ? '权限编辑' : deleteColumn ? '删除专栏' : ''"
        :mask-closable="false"
        :lock-scroll="false"
        :footer-hide="true">
        <div v-if="changePermission">
          <div class="modal-title">
            <span>公开性</span>
          </div>
          <RadioGroup v-model="isPublic" vertical>
            <Radio label="0">
              <span>仅作者可访问</span>
            </Radio>
            <Radio label="1">
              <span>互联网所有人可访问</span>
            </Radio>
          </RadioGroup>
        </div>
        <div v-if="deleteColumn">
          删除专栏
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SeriesColumn',
    data() {
      return {
        // 专栏展示方式 1图文模式，2列表模式
        columnShowType: 2,
        // 控制专栏名称编辑或显示
        editColumnName: false,
        // 控制权限和删除页面模态框的显示
        changePermission: false,
        deleteColumn: false,
        seriesColumnList: [
          {
            id: '1231asdasdad',
            columnName: '从头开始知识库',
            columnHome: '/lovbe0210/sd45454',
            coverImg: require('@/assets/cover/cover1.png'),
            isPublic: 0,
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            articleList: [
              {
                articleId: 'asdad2234234',
                articleName: '非常长的标题，标题很长很长非常长的标题，标题很长很长非常长的标题，标题很长很长',
                updateTime: '08-14 14:10'
              },
              {
                articleId: 'asdad22222111234234',
                articleName: 'it充电站系统架构图',
                updateTime: '08-14 14:10'
              },
              {
                articleId: 'asdad2234ssd234',
                articleName: 'it充电站系统架构图',
                updateTime: '08-14 14:10'
              }
            ],
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '233424dfgdgd',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '76558fghfghfccbc',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover3.png'),
            desc: null,
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'ddfgdfgd23424242',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 0,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '5657656585fghfghf',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 0,
            coverImg: require('@/assets/cover/cover1.png'),
            desc: null,
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'sdadsa2323',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '333323243234234234',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover3.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '66767dfgdfgdfgd',
            coverImg: require('@/assets/cover/cover1.png'),
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            isPublic: 1,
            columnHome: '/lovbe0210/sd45454',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '1112121212',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          }
        ],
        isPublic: 0
      }
    },
    computed: {
      showModal: {
        get() {
          return this.changePermission || this.deleteColumn;
        },
        set(value) {
          this.changePermission = value;
          this.deleteColumn = value;
        }
      }
    },
    methods: {
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      },
      routeNavigate(itemName) {
        switch (itemName) {
          case "scope":
            // 权限编辑，使用模态框显示
            this.changePermission = true;
            break;
          case "rename":
            this.editColumnName = true;
            break;
          case "setting":
            this.$router.push({})
            break;
          case "delete":
            this.deleteColumn = true;
            break;
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/seriesColumn.less';
</style>
