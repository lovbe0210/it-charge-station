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
            <span class="iconfont article"/>文档管理
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
                     @on-change="showColumnNameError = columnInfo.columnName?.length === 0"
                     v-model="columnInfo.columnName"/>
              <span v-if="showColumnNameError" class="error-tip">请输入专栏名称</span>
            </div>
            <div class="desc form-item">
              <div class="label">
                <div class="label-text">简介</div>
                <div>{{columnInfo.desc?.length ? columnInfo.desc?.length : 0}} / 255</div>
              </div>
              <Input type="textarea"
                     class="desc-input form-input"
                     :rows="4"
                     maxlength="255"
                     placeholder="专栏简介（选填）"
                     v-model="columnInfo.desc"/>
            </div>
            <div class="permission form-item">
              <div class="label">
                <span class="required">*</span>
                <span class="label-text">权限</span>
              </div>
              <div class="permission-input form-input">
                <div class="private-radio" @click="columnInfo.isPublic = 0">
                  <input type="radio"
                         id="initPrivate"
                         value="0"
                         :class="columnInfo.isPublic ? '' : 'checked'"/>
                  <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
                </div>
                <Poptip class="un-select"
                        confirm
                        placement="right"
                        @on-ok="columnInfo.isPublic = 1"
                        @on-cancel="columnInfo.isPublic = 0">
                  <div class="public-radio">
                    <input type="radio"
                           value="1"
                           :class="columnInfo.isPublic ? 'checked' : ''"
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
                    <img v-if="coverPreview" :src="coverPreview" class="img" alt="预览">
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
        <div v-if="activeItem === 'permission'"></div>
        <div v-if="activeItem === 'dir'"></div>
        <div v-if="activeItem === 'article'"></div>
        <div v-if="activeItem === 'more'"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'

  export default {
    name: 'SeriesColumnSetting',
    data() {
      return {
        activeItem: 'base',
        columnInfo: {
          columnName: '',
          isPublic: 0,
          desc: '',
          cover: ''
        },
        showColumnNameError: false,
        coverOriginalFile: null,
        coverPreview: null,
        cropInfo: {
          height: 0,
          width: 0,
          flushPreview: null
        }
      }
    },
    components: {
      VueCropper
    },
    methods: {
      readPublicPermission(event) {
        event.preventDefault();
      },
      updateColumnInfo() {
        if (this.columnInfo?.columnName?.length === 0) {
          this.showColumnNameError = true;
          return;
        }
        this.$Message.success('更新成功')
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
          this.coverPreview = data;
        })
      },
      imgLoadOver(data) {
        if (data) {
          this.$nextTick(() => {
            this.getNewCropImage();
            this.cropInfo.height = this.$refs.cropper.cropH;
            this.cropInfo.width = this.$refs.cropper.cropW;
            this.cropInfo.flushPreview = setInterval(() => {
              if (!this.coverOriginalFile) {
                clearInterval(this.cropInfo.flushPreview);
                this.cropInfo.flushPreview = null;
                return;
              }
              let cropH = this.$refs.cropper.cropH;
              let cropW = this.$refs.cropper.cropW;
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
      }
    },
    props: ['columnId'],
    destroyed() {
      if (this.cropInfo.flushPreview) {
        clearInterval(this.cropInfo.flushPreview);
        this.cropInfo.flushPreview = null;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/seriesColumnSetting.less';
</style>
