<template>
  <div class="layout-module_column-setting adjust">
    <div class="setting-header" @click="$router.go(-1)">
      <span class="iconfont return"></span>
      <span>返回</span>
    </div>
    <div class="settings-wrap">
      <div class="setting-items">
        <div :class="['setting-item', activeItem === 'base' ? 'active' : '']">
          <span class="setting-label" @click="activeItem = 'base'">
            <span class="iconfont read"/>专栏信息
          </span>
        </div>
        <div :class="['setting-item', activeItem === 'dir' ? 'active' : '']">
          <span class="setting-label" @click="activeItem = 'dir'">
            <span class="iconfont nav-tree"/>目录管理
          </span>
        </div>
        <div :class="['setting-item', activeItem === 'article' ? 'active' : '']">
          <span class="setting-label" @click="activeItem = 'article'">
            <span class="iconfont article"/>文章管理
          </span>
        </div>
        <div :class="['setting-item', activeItem === 'more' ? 'active' : '']">
          <span class="setting-label" @click="activeItem = 'more'">
            <span class="iconfont setting-c"/>更多设置
          </span>
        </div>
      </div>
      <div class="setting-content">
        <div v-if="activeItem === 'base'" class="base-info">
          <div class="index-area">
            <h4>专栏信息</h4>
          </div>
          <form class="base-info-form">
            <div class="name form-item">
              <div class="label">
                <span class="required">*</span>
                <span class="label-text">名称</span>
              </div>
              <Input type="text"
                     :class="['name-input', 'form-input', showColumnNameError ? 'empty-input' : '']"
                     maxlength="30"
                     placeholder="专栏名称"
                     @on-change="showColumnNameError = baseInfo.title?.length === 0"
                     v-model="baseInfo.title"/>
              <span v-if="showColumnNameError" class="error-tip">请输入专栏名称</span>
            </div>
            <div class="desc form-item">
              <div class="label">
                <div class="label-text">简介</div>
                <div>{{ baseInfo.synopsis?.length ? baseInfo.synopsis?.length : 0 }} / 150</div>
              </div>
              <Input type="textarea"
                     class="desc-input form-input"
                     :rows="5"
                     maxlength="150"
                     placeholder="专栏简介（选填）"
                     v-model="baseInfo.synopsis"/>
            </div>
            <div class="permission form-item">
              <div class="label">
                <span class="required">*</span>
                <span class="label-text">权限</span>
              </div>
              <div class="permission-input form-input">
                <div class="private-radio" @click="baseInfo.isPublic = 0">
                  <input type="radio"
                         id="initPrivate"
                         value="0"
                         :class="baseInfo.isPublic ? '' : 'checked'"/>
                  <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
                </div>
                <Poptip class="un-select"
                        confirm
                        placement="right"
                        @on-ok="baseInfo.isPublic = 1"
                        @on-cancel="baseInfo.isPublic = 0">
                  <div class="public-radio">
                    <input type="radio"
                           value="1"
                           :class="baseInfo.isPublic ? 'checked' : ''"
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
            <div class="cover form-item">
              <div class="label">
                <span class="label-text">封面</span>
              </div>
              <div class="cover-input form-input">
                <vueCropper
                  :class="['crop-box', coverOriginalFile ? '' : 'cover-placeholder']"
                  ref="cropper"
                  :img="coverOriginalFile"
                  :autoCrop="true"
                  :fixedBox="false"
                  :centerBox="true"
                  :fixed="true"
                  :autoCropWidth="300"
                  :autoCropHeight="150"
                  :fixedNumber="[2, 1]"
                  :canMove="false"
                  :canScale="false"
                  :maxImgSize="400"
                  :info="true"
                  @cropMoving="cropMoving"
                  @imgLoad="imgLoadOver">
                </vueCropper>
                <div class="cover-preview">
                  <div>
                    <img v-if="coverPreview || coverOriginalFile" :src="coverPreview || coverOriginalFile" class="img"
                         alt="预览">
                    <div class="cover-upload-select">
                      <Upload action="/"
                              :format="['jpg','jpeg','png']"
                              :max-size="5120"
                              accept="image/*"
                              :show-upload-list="false"
                              :before-upload="fileHandle">
                        <Button class="cover-upload-btn">
                          <span v-if="!coverOriginalFile"><span class="iconfont upload"/>上传图片</span>
                          <span v-else>重新上传</span>
                        </Button>
                      </Upload>
                      <div class="clear-cover-btn">
                      <span v-show="coverPreview" class="un-select" @click="clearCoverPreview">
                        <span class="iconfont delete"></span>
                        清除
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="action">
              <Button type="primary" @click="updateColumnInfo">更新信息</Button>
            </div>
          </form>
        </div>
        <div v-if="activeItem === 'dir'">
          <div class="index-area">
            <h4>目录管理</h4>
            <div class="action-wrapper">
              <Input placeholder="请输入标题进行搜索"
                     class="search-input"
                     v-model="searchKeywords"
                     maxlength="30">
                <span class="iconfont i-search" slot="prefix"/>
              </Input>
              <Dropdown placement="bottom"
                        transfer-class-name="dropdown-background dropdown-item-all-hover">
                <Button type="success">新建</Button>
                <DropdownMenu slot="list">
                  <DropdownItem>
                  <span class="action-item" @click="treeParamBox.createNode(null, 1)">
                    <span class="iconfont article"></span>
                    文档
                  </span>
                  </DropdownItem>
                  <DropdownItem>
                  <span class="action-item" @click="treeParamBox.createNode(null, 2)">
                    <span class="iconfont dir-fold"></span>
                    新建分组
                  </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <drag-tree :columnInfo="baseInfo"
                     :filterKeywords="searchKeywords"
                     @updateDirContentId="updateDirContentId"
                     @reportParamBox="reportParamBox"/>
        </div>
        <div v-if="activeItem === 'article'">
          <div class="index-area">
            <h4>文章管理</h4>
            <div class="action-wrapper">
              <Input placeholder="请输入标题进行搜索"
                     class="search-input"
                     v-model="searchKeywords"
                     maxlength="30">
                <span class="iconfont i-search" slot="prefix"/>
              </Input>
              <Button type="success" @click="createArticle">新建</Button>
            </div>
          </div>
          <div class="article-list un-select">
            <div class="article-header-wrapper">
              <div class="header-left-checkbox">
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                </a-checkbox>
              </div>
              <div class="item-checked" v-if="checkedList.length > 0 || showCheckToolBar">
                <span>
                  共选择了{{ checkedList.length }}篇文章
                </span>
                <Button type="text" ghost @click="cancelCheck">
                  取消选择
                </Button>
              </div>
              <div class="table-header" v-if="!showCheckToolBar">
                <div class="article-name">文档名称</div>
                <div class="status">状态</div>
                <div class="create-time">创建时间</div>
                <div class="update-time">更新时间</div>
              </div>
              <div class="right-action" v-if="checkedList.length > 0 || showCheckToolBar">
                <Button type="text" ghost @click="confirmDelete('deleteA')">批量删除</Button>
                <Button type="text" ghost @click="batchOperate('3')">批量导出</Button>
                <Button type="text" ghost @click="batchOperate('2')">移出专栏</Button>
                <Button type="text" ghost @click="batchOperate('1')">批量发布</Button>
              </div>
            </div>
            <div class="article-list-wrapper beauty-scroll">
              <div class="note-list-item" v-for="noteItem in searchArticleList" :key="noteItem.uid">
                <div class="left-checkbox">
                  <a-checkbox :class="showCheckToolBar ? '' : 'check-show'" :checked="isCheck(noteItem.uid)"
                              @change="onCheckChange(noteItem.uid, $event)">
                  </a-checkbox>
                </div>
                <div class="center-table-view">
                  <div class="article-name" :title="noteItem.title" @click="articleAction(noteItem,'read')">
                    <span>
                      {{ noteItem.title }}
                    </span>
                  </div>
                  <div class="status">
                    <span>
                      {{
                        noteItem.publishStatus === 0 ? '未发布' :
                          noteItem.publishStatus === 1 ? '审核中' :
                            noteItem.publishStatus === 2 ? '发布失败' : '已发布'
                      }}
                    </span>
                  </div>
                  <div class="create-time">
                    <span>
                      {{ formatTime2H(noteItem.createTime) }}
                    </span>
                  </div>
                  <div class="update-time">
                    <span>
                      {{ formatTime2H(noteItem.updateTime) }}
                    </span>
                  </div>
                </div>
                <div class="right-action">
                  <Dropdown placement="bottom-end"
                            transfer-class-name="dropdown-background dropdown-item-all-hover"
                            trigger="click">
                    <a href="javascript:void(0)">
                      <div class="menu-btn">
                        <span class="iconfont operate"></span>
                      </div>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'edit')" class="action-item">
                         <span class="iconfont bianji"/> 编辑
                        </span>
                      </DropdownItem>
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'publish')" class="action-item">
                          <span class="iconfont publish"/> 发布
                        </span>
                      </DropdownItem>
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'setting')" class="action-item">
                          <span class="iconfont article-setting"/> 文档设置
                        </span>
                      </DropdownItem>
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'remove')" class="action-item">
                          <span class="iconfont remove-from-column"/> 移出专栏
                        </span>
                      </DropdownItem>
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'export')" class="action-item">
                          <span class="iconfont export"/> 导出
                        </span>
                      </DropdownItem>
                      <DropdownItem>
                        <span @click="articleAction(noteItem,'delete')" class="action-item">
                         <span class="iconfont delete"/> 删除
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeItem === 'more'">
          <div class="index-area">
            <h4>更多设置</h4>
          </div>
          <div class="more-setting">
            <div class="more-setting-item">
              <div class="setting-enable-comment">
                <a-checkbox v-model="baseInfo.enableComment">
                  <span class="checkbox-label">开启评论功能</span>
                </a-checkbox>
                <div class="setting-tips un-select">
                  <p class="setting-tips-content">专栏默认开启评论功能，取消勾选后所有用户都无法评论。</p>
                </div>
              </div>
              <div class="setting-auto-publish">
                <a-checkbox v-model="baseInfo.autoPublish">
                  <span class="checkbox-label">开启自动发布</span>
                </a-checkbox>
                <div class="setting-tips un-select">
                  <p class="setting-tips-content">
                    文档保存时，自动将内容更新至阅读页。自动发布不会发送动态或消息。注意：打开开关并不会发布已有的文档，文档发布后需要审核通过后才会被公开访问。
                  </p>
                </div>
              </div>
            </div>
            <div class="more-setting-item">
              <div class="setting-action-area">
                <div>
                  <p class="setting-action-title">导入文档</p>
                  <p class="setting-tips-content">
                    支持导入Markdown格式的文件，单次导入一个Markdown文件，为单个文档，默认位于专栏根目录下，如需导入多个文件，可将文件压缩为zip包导入，最多支持五层目录。</p>
                </div>
                <Button type="text" ghost size="small" @click="exportOrImport('1')">
                  <span>导入</span>
                </Button>
              </div>
              <div class="setting-action-area">
                <div>
                  <p class="setting-action-title">导出专栏</p>
                  <p class="setting-tips-content">
                    可将专栏内容按照目录层级导出，当专栏内文档数量较大时，耗时可能增加或失败，如果导出超时，可在文档管理页面进行分批导出。</p>
                </div>
                <Button type="text" ghost size="small" @click="exportOrImport('2')">
                  <span>导出</span>
                </Button>
              </div>
              <div class="setting-action-area">
                <div>
                  <p class="setting-action-title">删除专栏 </p>
                  <p class="setting-tips-content">将这个专栏彻底删除，专栏下的所有数据将会删除</p>
                </div>
                <Button type="error" size="small" @click="confirmDelete('delete')">
                  <span>删除</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box">
      <Modal
        v-model="showModal"
        :transfer="false"
        :title="actionType === 'setting' ? '文档设置'
              : actionType === 'export' ? '导出'
              : actionType === 'delete' ? '删除专栏'
              : actionType === 'deleteA' ? '删除' : ''"
        @on-ok="deleteArticle"
        :footer-hide="actionType !== 'deleteA'">
        <div v-if="actionType === 'setting'" class="modal-setting-item">
          <article-setting :currentArticle="currentOperateArticle" :editTitle="true"/>
        </div>
        <div v-if="actionType === 'export'">
          <div class="export-content un-select">
            暂未开放，敬请期待！
          </div>
        </div>
        <div v-if="actionType === 'delete'">
          <div class="delete-warn">
            <div class="warn-content un-select">
              <span class="iconfont i-warn"></span>
              <span>
                正在删除专栏
                <span class="column-name">
                  {{ baseInfo.uri }}
                </span>
                ，该操作不可逆，一旦操作成功，专栏下的所有内容将会删除。请输入下面内容再次确认操作。
              </span>
            </div>
            <div class="warn-confirm">
              <span>请在下方输入框中输入 “{{ baseInfo.uri }}” 以确认操作</span>
              <Input type="text"
                     :class="['confirm-input', cannotDelete ? 'cannot-delete' : '']"
                     @on-change="cannotDelete = false"
                     :clearable="cannotDelete"
                     v-model="tmpValue"/>
              <span v-if="cannotDelete" class="tips">请按提示重新输入</span>
            </div>
            <div>
              <Button type="error" class="warn-btn" @click="columnDelete">
                <span class="column-name">确定删除 {{ baseInfo.title }}</span>
              </Button>
            </div>
          </div>
        </div>
        <div v-if="actionType === 'deleteA'">
          <div class="delete-warn">
            <span>
              确定删除所选文章？
            </span>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
import DragTree from "@/components/common/dragtree/DragTree";
import ArticleSetting from "@/components/common/ArticleSetting"
import WriteCenterApi from "@/api/WriteCenterApi";
import {dataURLtoFile, formatTime2H} from "@/utils";

export default {
  name: 'SeriesColumnSetting',
  data() {
    return {
      activeItem: 'base',
      baseInfo: {},
      coverOriginalFile: null,
      coverPreview: null,
      coverInitialize: false,
      currentOperateArticle: null,
      showColumnNameError: false,
      cropInfo: {
        height: 0,
        width: 0,
        flushPreview: null
      },
      searchKeywords: '',
      checkedList: [],
      showCheckToolBar: false,
      showModal: false,
      // setting 文档设置； export 导出, delete 删除专栏
      actionType: '',
      cannotDelete: false,
      tmpValue: '',
      treeParamBox: null
    }
  },
  props: ['columnId'],
  computed: {
    checkAll() {
      return this.checkedList.length > 0 && this.checkedList.length === this.baseInfo.articleList?.length;
    },
    indeterminate() {
      return this.checkedList.length > 0 && this.checkedList.length !== this.baseInfo.articleList?.length
    },
    searchArticleList() {
      return this.searchKeywords?.trim()
        ? this.baseInfo.articleList.filter(article => article.title.indexOf(this.searchKeywords.trim()) !== -1)
        : this.baseInfo.articleList;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  components: {
    VueCropper,
    DragTree,
    ArticleSetting
  },
  methods: {
    readPublicPermission(event) {
      event.preventDefault();
    },
    updateColumnInfo() {
      if (this.baseInfo.title?.length === 0) {
        this.showColumnNameError = true;
        return;
      }
      this.callbackUpdate();
    },
    callbackUpdate() {
      let columnInfo = new FormData();
      columnInfo.append('uid', this.baseInfo.uid);
      columnInfo.append('title', this.baseInfo.title);
      if (this.coverPreview) {
        columnInfo.append('coverFile', dataURLtoFile(this.coverPreview, "cover.jpg"));
      } else if (this.baseInfo.coverUrl != null) {
        columnInfo.append('coverUrl', this.baseInfo.coverUrl);
      }
      columnInfo.append('isPublic', this.baseInfo.isPublic);
      columnInfo.append('synopsis', this.baseInfo.synopsis);
      columnInfo.append('enableComment', this.baseInfo.enableComment ? 1 : 0);
      columnInfo.append('autoPublish', this.baseInfo.autoPublish ? 1 : 0);
      WriteCenterApi.updateColumnInfo(columnInfo).then(data => {
        if (data?.result) {
          this.$Message.success('更新成功');
        }
      })
    },
    fileHandle(file) {
      if (file?.size > 5120 * 1024) {
        this.$Message.error('文件大小不得超过5M')
        return false;
      }
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        _this.coverOriginalFile = this.result;
      }
      return false;
    },
    /**
     * 处理截图框移动事件
     * @param data
     */
    cropMoving(data) {
      if (!data?.moving) {
        // 移动停止，获取截图框内图片
        this.getNewCropImage();
      }
    },
    getNewCropImage() {
      this.$refs.cropper.getCropData(data => {
        if (this.baseInfo.coverUrl && !this.coverInitialize) {
          this.coverInitialize = true;
          return;
        }
        this.coverPreview = data;
      })
    },
    imgLoadOver(data) {
      if (data) {
        this.$nextTick(() => {
          this.getNewCropImage();
          this.cropInfo.height = this.$refs.cropper.cropH;
          this.cropInfo.width = this.$refs.cropper.cropW;
          if (this.cropInfo.flushPreview != null) {
            clearInterval(this.cropInfo.flushPreview);
          }
          this.cropInfo.flushPreview = setInterval(() => {
            if (!this.coverOriginalFile) {
              clearInterval(this.cropInfo.flushPreview);
              this.cropInfo.flushPreview = null;
              return;
            }
            let cropH = this.$refs.cropper?.cropH;
            let cropW = this.$refs.cropper?.cropW;
            if (cropH === undefined || cropW === undefined) {
              clearInterval(this.cropInfo.flushPreview);
              this.cropInfo.flushPreview = null;
              return;
            }
            if (this.cropInfo.height !== cropH || this.cropInfo.width !== cropW) {
              this.cropInfo.height = cropH;
              this.cropInfo.width = cropW;
              this.getNewCropImage();
            }
          }, 1000)
        })
      }
    },
    clearCoverPreview() {
      this.coverPreview = null;
      this.coverOriginalFile = null;
      this.baseInfo.coverUrl = "";
    },
    articleAction(row, action) {
      switch (action) {
        case 'edit':
          let editUrl = this.$router.resolve({
            path: '/editor/' + row.uri
          })
          window.open(editUrl.href, '_blank')
          break;
        case 'read':
          let readUrl = this.$router.resolve({
            path: '/' + this.userInfo.domain + '/' + this.baseInfo.uri + '/' + row.uri
          })
          window.open(readUrl.href, '_blank')
          break;
        case 'publish':
          WriteCenterApi.publishArticle(row.uid).then(data => {
            if (data?.result) {
              this.$Message.success('发布成功，审核通过后将会同步到阅读页')
            }
          })
          break;
        case 'setting':
          this.currentOperateArticle = row;
          this.showModal = true;
          this.actionType = 'setting';
          break;
        case 'export':
          this.showModal = true;
          this.actionType = 'export';
          break;
        case 'delete':
          this.currentOperateArticle = row;
          this.confirmDelete('deleteA');
          break;
      }
    },
    onCheckAllChange(e) {
      if (this.searchArticleList.length === 0) {
        return;
      }
      this.showCheckToolBar = true;
      this.checkedList = e.target.checked ? this.searchArticleList.map(note => note.uid) : [];
    },
    cancelCheck() {
      this.showCheckToolBar = false;
      this.checkedList = [];
    },
    isCheck(noteId) {
      return this.checkedList.indexOf(noteId) !== -1;
    },
    onCheckChange(noteId, e) {
      this.showCheckToolBar = true;
      if (e.target.checked) {
        this.checkedList.push(noteId);
      } else {
        this.checkedList = this.checkedList.filter(nid => nid !== noteId);
      }
    },
    exportOrImport(action) {
      this.$Message.warning('暂未开放，敬请期待！')
    },
    columnDelete() {
      if (this.tmpValue !== this.baseInfo.uri) {
        this.cannotDelete = true;
      } else {
        WriteCenterApi.deleteColumn({uid: this.columnId}).then(data => {
          if (data?.result) {
            this.showModal = false;
            this.$Message.success('删除成功');
            this.$router.push({path: "/creative/seriesColumn"})
          }
        })
      }
    },
    confirmDelete(action) {
      if (action === 'deleteA' && (this.currentOperateArticle == null && this.checkedList.length === 0)) {
        return;
      }
      this.actionType = action;
      this.showModal = true;
    },
    deleteArticle() {
      if (this.currentOperateArticle != null) {
        // 单个删除
        let uid = this.currentOperateArticle.uid;
        WriteCenterApi.deleteArticle(uid).then(data => {
          if (data?.result) {
            this.$Message.success("删除成功");
            let articleList = this.baseInfo.articleList?.filter(article => uid !== article.uid);
            this.baseInfo.articleList = articleList || [];
          }
        })
        return;
      }
      if (this.checkedList.length !== 0) {
        // 批量删除
        this.batchOperate('5');
      }
    },
    updateDirContentId(dirContentId) {
      this.baseInfo.dirContentId = dirContentId;
    },
    batchOperate(operate) {
      if (this.checkedList.length === 0) {
        return;
      }
      if (operate === '3') {
        // 导出
        this.$Message.info("敬请期待");
        return;
      }
      let operateInfo = {
        columnId: this.baseInfo.uid,
        operateType: operate,
        articleList: this.checkedList
      }
      WriteCenterApi.columnBatchOperate(operateInfo).then(data => {
        if (data?.result) {
          this.$Message.success(operate === '1' ? "发布成功" : operate === '2' ? "操作成功" : "删除成功");
        } else {
          return;
        }
        switch (operate) {
          case "1": // 发布
            this.baseInfo.articleList.forEach(article => {
              if (article.publishStatus !== 3 && this.checkedList.includes(article.uid)) {
                article.publishStatus = 1;
              }
            })
            break;
          case "2": // 移出专栏
          case "5": // 删除
            let articleList = this.baseInfo.articleList?.filter(article => !this.checkedList.includes(article.uid));
            this.baseInfo.articleList = articleList || [];
            this.checkedList = [];
            break;
        }
      })
    },
    formatTime2H,
    reportParamBox(treeParamBox) {
      this.treeParamBox = treeParamBox;
    },
    createArticle() {
      WriteCenterApi.createArticle(this.baseInfo.uid).then(data => {
        if (data?.result) {
          this.baseInfo.articleList?.unshift(data.data)
        }
      })
    }
  },
  watch: {
    "showModal"(val) {
      if (!val) {
        this.actionType = '';
        this.baseInfo.title = '';
        this.baseInfo.synopsis = '';
        this.tmpValue = '';
        this.cannotDelete = false;
        this.currentOperateArticle = null;
        this.clearCoverPreview();
      }
    },
    "baseInfo.enableComment"(newVal, oldVal) {
      if (oldVal === undefined) {
        return;
      }
      this.callbackUpdate();
    },
    "baseInfo.autoPublish"(newVal, oldVal) {
      if (oldVal === undefined) {
        return;
      }
      this.callbackUpdate();
    },
    activeItem(newVal, oldVal) {
      if (oldVal === 'dir' && newVal === 'article') {
        WriteCenterApi.getColumnArticle(this.baseInfo.uid).then(data => {
          if (data?.result) {
            this.baseInfo.articleList = data.data;
          }
        })
      }
    }
  },
  created() {
    WriteCenterApi.getColumnInfo(this.columnId).then(data => {
      if (data?.result) {
        data.data.enableComment = !!data.data.enableComment;
        data.data.autoPublish = !!data.data.autoPublish;
        this.baseInfo = data.data;
        if (data.data.coverUrl) {
          this.coverOriginalFile = this.fileService + data.data.coverUrl;
        }
      }
    })
  },
  destroyed() {
    if (this.cropInfo.flushPreview) {
      clearInterval(this.cropInfo.flushPreview);
      this.cropInfo.flushPreview = null;
    }
  }
}
</script>

<style scoped lang="less">
@import '../css/creativespace/seriesColumnSetting.less';
</style>
