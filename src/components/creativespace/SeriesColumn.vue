<template>
  <div class="layout-module_SeriesColumn" ref="TooltipContainer">
    <div class="column-home-header">
      <h2 class="title">个人专栏</h2>
      <hr class="separator-line">
      <div class="operation">
        <div class="action">
          <div class="icon-box" @click="createNewColumn = true">
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
        <div class="column-cover" v-if="columnShowType == 1">
          <a class="cover-box" href="/lovbe0210/nhagpt">
            <img :src="columnItem.coverImg"
                 alt="啊实打实">
          </a>
          <a-tooltip :getPopupContainer="getTooltipContainer">
            <template slot="title">
              修改封面
            </template>
            <div class="cover-edit">
              <span class="iconfont bianji"></span>
            </div>
          </a-tooltip>
        </div>
        <div class="column-card-body"
             :style="columnShowType == 1 ? 'border-radius: 0 0 8px 8px;border-top: 0;' : 'border-radius: 8px;'">
          <div class="column-meta">
            <div class="card-meta-title">
              <span class="book-name" v-show="columnRenameId !== columnItem.id">
                <a href="/column/pb2d66" class="book-link" target="_self">
                  <span class="book-name-text" :title="columnItem.columnName">{{columnItem.columnName}}</span>
                </a>
                <span class="book-name-scope">
                  <span :class="['iconfont', columnItem.isPublic ? 'public' : 'lock']"
                        :title="columnItem.isPublic ? '互联网可访问' : '仅作者自己访问'"/>
                </span>
              </span>
              <div v-if="columnRenameId === columnItem.id" class="book-rename">
                <Input type="text"
                       ref="renameInput"
                       v-model="columnItem.columnName"
                       :placeholder="columnItem.columnName"
                       maxlength="30"
                       @on-enter="columnNameRename"
                       @on-blur="columnNameRename"
                       />
              </div>
            </div>
            <div class="card-meta-description">
              <span class="columns-module_description">forever study a little everyday</span>
            </div>
          </div>
          <span class="column-hover-show"
                :style="columnShowType == 1 ? 'bottom: 48px;' : 'top: 15px;'">
            <Dropdown placement="bottom-end"
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
                      trigger="click">
                <a href="javascript:void(0)">
                  <div class="menu-btn">
                    <span class="iconfont operate"></span>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="scope">
                    <span @click="routeNavigate(columnItem,'scope')">
                      <span class="iconfont permissions"/> 权限
                    </span>
                  </DropdownItem>
                  <DropdownItem name="rename">
                    <span @click="routeNavigate(columnItem,'rename')">
                      <span class="iconfont rename"/> 重命名
                    </span>
                  </DropdownItem>
                  <DropdownItem name="setting">
                    <span @click="routeNavigate(columnItem,'setting')">
                      <span class="iconfont setting"/> 专栏设置
                    </span>
                  </DropdownItem>
                  <DropdownItem class="line">
                    <span class="line-block">
                    </span>
                  </DropdownItem>
                  <DropdownItem name="delete">
                    <span @click="routeNavigate(columnItem,'delete')">
                      <span class="iconfont delete"/> 删除
                    </span>
                  </DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </span>
          <div v-if="columnShowType === 2 && (columnItem.articleList == null || columnItem.articleList.length === 0)">
            <ul class="column-article empty-li">
              <span>专栏暂无内容</span>
            </ul>
          </div>
          <div v-else>
            <ul class="column-article" v-if="columnShowType == 2">
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="it充电站系统架构图"
                   class="column-summary-item">
                  <span class="column-summary-itemText">it充电站系统架构图a架构图啊真的是吗</span>
                  <span class="column-summary-itemTime">
                  <span>08-14 14:10</span>
                </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="决策指挥大屏系统V4.30数据同步"
                   class="column-summary-item">
                  <span class="column-summary-itemText">决策指挥大屏系统V4.30数据同步</span>
                  <span class="column-summary-itemTime">
                    <span>08-08 14:09</span>
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="初识Vue"
                   class="column-summary-item">
                  <span class="column-summary-itemText">初识Vue</span>
                  <span class="column-summary-itemTime">
                  <span>06-27 16:17</span>
                </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box">
      <Modal
        v-model="showModal"
        :title="createNewColumn ? '新建专栏' : changePermission ? '权限编辑' : deleteColumn ? '删除专栏' : ''"
        :footer-hide="true">
        <div v-if="changePermission">
          <div class="modal-title">
            <span>公开性</span>
          </div>
          <div class="permission-radio">
            <div class="private-radio" @click="currentColumn.isPublic = 0">
              <input type="radio"
                     id="private"
                     value="0"
                     :class="currentColumn.isPublic ? '' : 'checked'"/>
              <label class="permission-label un-select" for="private">仅作者可访问</label>
            </div>
            <Poptip class="un-select"
                    confirm
                    placement="right"
                    @on-ok="currentColumn.isPublic = 1"
                    @on-cancel="currentColumn.isPublic = 0">
              <div class="public-radio">
                <input type="radio"
                       value="1"
                       :class="currentColumn.isPublic ? 'checked' : ''"
                       @click="readPublicPermission"/>
                <span class="permission-label un-select">互联网可访问</span>
              </div>
              <div slot="title">
                <span>
                  开启后，互联网所有获得链接的人皆可访问专栏内的全部内容。你需对其合法合规性负责，遵守相关法律法规及it充电站
                </span>
                <a class="color: #43C8EC" href="/">服务协议</a>
                <span>
                  约定，违规内容可能无法被查看。
                </span>
              </div>
            </Poptip>
          </div>
        </div>
        <div class="delete-warn" v-if="deleteColumn">
          <div class="warn-content un-select">
            <span class="iconfont i-warn"></span>
            <span>
              正在删除专栏
              <span class="column-name">
                {{currentColumn.columnName}}
              </span>
              ，该操作不可逆，一旦操作成功，专栏下的所有内容将会删除。请输入下面内容再次确认操作。
            </span>
          </div>
          <div class="warn-confirm">
            <span>请在下方输入框中输入 “{{currentColumn.id}}” 以确认操作</span>
            <Input type="text"
                   :class="['confirm-input', cannotDelete ? 'cannot-delete' : '']"
                   @on-change="cannotDelete = false"
                   :clearable="cannotDelete"
                   v-model="tmpValue"/>
            <span v-if="cannotDelete" class="tips">请按提示重新输入</span>
          </div>
          <div>
            <Button type="error" class="warn-btn" @click="columnDelete">
              <span class="column-name">确定删除 {{currentColumn.columnName}}</span>
            </Button>
          </div>
        </div>
        <div class="create-column" v-if="createNewColumn">
          <span class="label">基本信息</span>
          <div class="input-group">
            <Input type="text"
                   class="column-name"
                   maxlength="30"
                   placeholder="专栏名称"
                   v-model="currentColumn.columnName"/>
            <Input type="textarea"
                   class="desc"
                   :rows="4"
                   maxlength="255"
                   placeholder="专栏简介（选填）"
                   v-model="currentColumn.desc"/>
          </div>
          <span class="label">访问权限</span>
          <div class="permission-radio">
              <div class="private-radio" @click="currentColumn.isPublic = 0">
                <input type="radio"
                       id="initPrivate"
                       value="0"
                       :class="currentColumn.isPublic ? '' : 'checked'"/>
                <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
              </div>
              <Poptip class="un-select"
                      confirm
                      placement="right"
                      @on-ok="currentColumn.isPublic = 1"
                      @on-cancel="currentColumn.isPublic = 0">
                <div class="public-radio">
                  <input type="radio"
                         value="1"
                         :class="currentColumn.isPublic ? 'checked' : ''"
                         @click="readPublicPermission"/>
                  <span class="permission-label un-select">互联网可访问</span>
                </div>
                <div slot="title">
                <span>
                  开启后，互联网所有获得链接的人皆可访问专栏内的全部内容。你需对其合法合规性负责，遵守相关法律法规及it充电站
                </span>
                  <a class="color: #43C8EC" href="/">服务协议</a>
                  <span>
                  约定，违规内容可能无法被查看。
                </span>
                </div>
              </Poptip>
            </div>
          <Button type="success" class="create-btn" :disabled="!currentColumn?.columnName">
            <span>新建</span>
          </Button>
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
        columnRenameId: '',
        // 删除专栏时的确认输入内容
        tmpValue: '',
        cannotDelete: false,
        // 控制权限和删除页面模态框的显示
        changePermission: false,
        deleteColumn: false,
        createNewColumn: false,
        currentColumn: {
          columnName: '',
          isPublic: 0,
          desc: ''
        },
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
            coverImg: 'https://fc.sinaimg.cn/large/006BNqYCly1hk88v14absj32yo1o0x6p.jpg',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
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
            isPublic: 1,
            columnHome: '/lovbe0210/sd45454',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          }
        ]
      }
    },
    computed: {
      showModal: {
        get() {
          return this.createNewColumn || this.changePermission || this.deleteColumn;
        },
        set(value) {
          this.createNewColumn = value;
          this.changePermission = value;
          this.deleteColumn = value;
        }
      }
    },
    methods: {
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      },
      routeNavigate(columnItem, itemName) {
        this.currentColumn = columnItem;
        switch (itemName) {
          case "scope":
            // 权限编辑，使用模态框显示
            this.changePermission = true;
            break;
          case "rename":
            this.columnRenameId = columnItem.id;
            this.$nextTick(() => {
              this.$refs.renameInput[0].focus({
                cursor: 'end'
              });
            })
            break;
          case "setting":
            this.$router.push({
              path: '/creative/column/setting/' + columnItem.id
            })
            break;
          case "delete":
            this.deleteColumn = true;
            break;
        }
      },
      columnDelete() {
        if (this.tmpValue !== this.currentColumn?.id) {
          this.cannotDelete = true;
        } else {
          this.deleteColumn = false;
          this.$Message.success('删除成功')
        }
      },
      readPublicPermission(event) {
        event.preventDefault();
      },
      columnNameRename() {
        if (this.columnRenameId === '' || !this.columnRenameId) {
          return;
        }
        this.columnRenameId = '';
        this.$Message.success('修改成功')
      }
    },
    watch: {
      "deleteColumn"(val) {
        if (!val) {
          this.cannotDelete = false;
          this.tmpValue = '';
          this.currentColumn = {
            columnName: '',
            isPublic: 0,
            desc: ''
          };
        }
      },
      "changePermission"(val) {
        if (!val) {
          this.currentColumn = {
            columnName: '',
            isPublic: 0,
            desc: ''
          };
        }
      },
      "createNewColumn"(val) {
        if (!val) {
          this.currentColumn = {
            columnName: '',
            isPublic: 0,
            desc: ''
          };
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/seriesColumn.less';
</style>
