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
      <div class="column-list-item" v-for="columnItem in seriesColumnList" :key="columnItem.uid">
        <div class="column-cover" v-if="columnShowType == 1">
          <a class="cover-box" href="/lovbe0210/nhagpt">
            <img :src="fileUrl(columnItem.coverUrl)"
                 :alt="columnItem.title">
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
              <span class="book-name" v-show="currentColumn.uid !== columnItem.uid">
                <a :href="'/' + userInfo.domain + '/' + columnItem.uri" class="book-link" target="_blank">
                  <span class="book-name-text" :title="columnItem.title">{{ columnItem.title }}</span>
                </a>
                <span class="book-name-scope">
                  <span :class="['iconfont', columnItem.isPublic ? 'public' : 'lock']"
                        :title="columnItem.isPublic ? '互联网可访问' : '仅作者自己访问'"/>
                </span>
              </span>
              <div v-if="currentColumn.uid === columnItem.uid" class="book-rename">
                <Input type="text"
                       ref="renameInput"
                       v-model="currentColumn.title"
                       :placeholder="columnItem.title"
                       maxlength="30"
                       @on-enter="columnTitleRename"
                       @on-blur="columnTitleRename"
                />
              </div>
            </div>
            <div class="card-meta-description">
              <span class="columns-module_description">{{ columnItem.synopsis }}</span>
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
              <li v-for="article in showArticleList(columnItem.articleList)" :key="article.uid">
                <a target="_blank"
                   :href="'/' + userInfo.domain + '/' + columnItem.uri + '/' + article.uri"
                   :title="article.title"
                   class="column-summary-item">
                  <span class="column-summary-itemText">{{ article.title }}</span>
                  <span class="column-summary-itemTime">
                  <span>{{ formatTime(article.updateTime) }}</span>
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
            <div class="private-radio" @click="changeColumnPermission(0)">
              <input type="radio"
                     id="private"
                     value="0"
                     :class="currentColumn.isPublic ? '' : 'checked'"/>
              <label class="permission-label un-select" for="private">仅作者可访问</label>
            </div>
            <Poptip class="un-select"
                    confirm
                    placement="right"
                    @on-ok="changeColumnPermission(1)"
                    @on-cancel="changeColumnPermission(0)">
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
                {{ currentColumn.title }}
              </span>
              ，该操作不可逆，一旦操作成功，专栏下的所有内容将会删除。请输入下面内容再次确认操作。
            </span>
          </div>
          <div class="warn-confirm">
            <span>请在下方输入框中输入 “{{ currentColumn.uri }}” 以确认操作</span>
            <Input type="text"
                   :class="['confirm-input', cannotDelete ? 'cannot-delete' : '']"
                   @on-change="cannotDelete = false"
                   :clearable="cannotDelete"
                   v-model="tmpValue"/>
            <span v-if="cannotDelete" class="tips">请按提示重新输入</span>
          </div>
          <div>
            <Button type="error" class="warn-btn" @click="columnDelete">
              <span class="column-name">确定删除 {{ currentColumn.title }}</span>
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
                   v-model="currentColumn.title"/>
            <Input type="textarea"
                   class="desc"
                   :rows="4"
                   maxlength="255"
                   placeholder="专栏简介（选填）"
                   v-model="currentColumn.synopsis"/>
          </div>
          <span class="label">访问权限</span>
          <div class="permission-radio">
            <div class="private-radio" @click="changeColumnPermission(0)">
              <input type="radio"
                     id="initPrivate"
                     value="0"
                     :class="currentColumn.isPublic ? '' : 'checked'"/>
              <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
            </div>
            <Poptip class="un-select"
                    confirm
                    placement="right"
                    @on-ok="changeColumnPermission(1)"
                    @on-cancel="changeColumnPermission(0)">
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
          <Button type="success" class="create-btn" :disabled="!currentColumn?.title" @click="createColumn">
            <span>新建</span>
          </Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import WriteCenterApi from "@/api/WriteCenterApi";
import {formatTime} from '@/utils/emoji'

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
        uid: null,
        title: '',
        isPublic: 0,
        synopsis: ''
      },
      seriesColumnList: []
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
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    getTooltipContainer() {
      return this.$refs.TooltipContainer
    },
    createColumn() {
      WriteCenterApi.createColumn(this.currentColumn).then(data => {
        if (data?.result) {
          // 将最新创建的专栏放入顶部
          this.seriesColumnList.unshift(data.data);
          // 携带专栏信息跳转到设置页面
          this.$router.push({
            path: '/creative/column/setting/' + data.data.uid
          })
        }
      })
    },
    changeColumnPermission(permission) {
      if (this.currentColumn.isPublic === permission) {
        return;
      }
      // 更新文档权限信息
      let columnInfo = new FormData();
      columnInfo.append("uid", this.currentColumn.uid)
      columnInfo.append("isPublic", permission)
      WriteCenterApi.updateColumnInfo(columnInfo).then(data => {
        if (data?.result) {
          this.currentColumn.isPublic = permission;
          this.$Message.success("修改成功");
        }
      })
    },
    columnTitleRename() {
      // 比较标题是否有变化
      let title = this.currentColumn.title;
      if (this.currentColumn.uid === '' || !this.currentColumn.uid || !title) {
        this.initCurrentColumn();
        return;
      }
      let renameColumn = this.seriesColumnList.filter(column => column.uid === this.currentColumn.uid);
      if (!renameColumn || title === renameColumn[0].title) {
        this.initCurrentColumn();
        return;
      }
      let columnInfo = new FormData();
      columnInfo.append("uid", this.currentColumn.uid)
      columnInfo.append("title", title)
      WriteCenterApi.updateColumnInfo(columnInfo).then(data => {
        if (data?.result) {
          renameColumn[0].title = title;
          this.$Message.success('修改成功');
        }
      })
      this.initCurrentColumn();
    },
    routeNavigate(columnItem, itemName) {
      switch (itemName) {
        case "scope":
          // 权限编辑，使用模态框显示
          this.currentColumn = columnItem;
          this.changePermission = true;
          break;
        case "rename":
          this.currentColumn.uid = columnItem.uid;
          this.currentColumn.title = columnItem.title;
          this.$nextTick(() => {
            this.$refs.renameInput[0].focus({
              cursor: 'end'
            });
          })
          break;
        case "setting":
          this.$router.push({
            path: '/creative/column/setting/' + columnItem.uid
          })
          break;
        case "delete":
          this.currentColumn.uid = columnItem.uid;
          this.currentColumn.title = columnItem.title;
          this.currentColumn.uri = columnItem.uri;
          this.deleteColumn = true;
          break;
      }
    },
    columnDelete() {
      if (this.tmpValue !== this.currentColumn?.uri) {
        this.cannotDelete = true;
      } else {
        let columnInfo = { uid: this.currentColumn.uid }
        WriteCenterApi.deleteColumn(this, columnInfo).then(data => {
          if (data?.result) {
            this.deleteColumn = false;
            this.$Message.success('删除成功');
            WriteCenterApi.getColumnList().then(data => {
              if (data?.result) {
                this.seriesColumnList = data.data;
              }
            })
          }
        })
      }
    },
    readPublicPermission(event) {
      event.preventDefault();
    },
    fileUrl(path) {
      return this.fileService + path;
    },
    showArticleList(articleList) {
      if (articleList && articleList.length > 3) {
        return articleList.slice(0, 3);
      } else if (articleList) {
        return articleList;
      } else {
        return [];
      }
    },
    initCurrentColumn() {
      this.currentColumn = {
        uid: null,
        title: '',
        isPublic: 0,
        synopsis: '',
        uri: ''
      };
    },
    formatTime
  },
  watch: {
    "deleteColumn"(val) {
      if (!val) {
        this.cannotDelete = false;
        this.tmpValue = '';
        this.initCurrentColumn();
      }
    },
    "changePermission"(val) {
      if (!val) {
        this.initCurrentColumn();
      }
    },
    "createNewColumn"(val) {
      if (!val) {
        this.initCurrentColumn();
      }
    }
  },
  created() {
    WriteCenterApi.getColumnList().then(data => {
      if (data?.result) {
        this.seriesColumnList = data.data;
      }
    })
  }
}
</script>

<style scoped lang="less">
  @import '../css/creativespace/seriesColumn.less';
</style>
