<template>
  <div ref="TooltipContainer">
    <div class="title" v-if="editTitle">
      <div class="label">
        <div class="label-text"><span style="color: red">* </span>标题</div>
      </div>
      <Input type="text"
             :class="['desc-input form-input', articleInfo.title?.length > 0 ? '' : 'error']"
             maxlength="30"
             placeholder="请输入文档标题"
             v-model="articleInfo.title"/>
    </div>
    <div class="permission" v-if="changePermission">
      <div class="label">
        <span class="required">* </span>
        <span class="label-text">权限</span>
      </div>
      <div class="permission-input">
        <Poptip class="un-select"
                confirm
                placement="right-start"
                :width="editTitle ? 300 : 190"
                @on-ok="articleInfo.isPublic = 1"
                @on-cancel="articleInfo.isPublic = 0">
          <div class="public-radio">
            <input type="radio"
                   value="1"
                   :class="articleInfo.isPublic ? 'checked' : ''"
                   @click="readPublicPermission"/>
            <span class="permission-label un-select">互联网可访问</span>
          </div>
          <div slot="title">
            <span>
              开启后，互联网所有获得链接的人皆可访问文档内容。你需对其合法合规性负责，遵守相关法律法规及it充电站
            </span>
            <a class="color: #43C8EC" href="/">服务协议</a>
            <span>
              约定，违规内容可能无法被查看。
            </span>
          </div>
        </Poptip>
        <div class="private-radio" @click="articleInfo.isPublic = 0">
          <input type="radio"
                 id="initPrivate"
                 value="0"
                 :class="articleInfo.isPublic ? '' : 'checked'"/>
          <span class="permission-label un-select" for="initPrivate">仅作者可访问</span>
        </div>
      </div>
    </div>
    <div class="cover">
      <div class="label">
        <span class="label-text">封面</span>
      </div>
      <div :class="['cover-input', editTitle ? 'show-preview' : '']">
        <vueCropper
          :class="['crop-box', coverOriginalFile ? '' : 'cover-placeholder']"
          ref="cropper"
          :img="coverOriginalFile"
          :autoCrop="true"
          :fixedBox="false"
          :centerBox="true"
          :fixed="true"
          :fixedNumber="[1.61, 1]"
          :canMove="false"
          :canScale="false"
          :maxImgSize="400"
          :info="true"
          @cropMoving="cropMoving"
          @imgLoad="imgLoadOver">
        </vueCropper>
        <div class="preview-operate">
          <img v-if="editTitle && articleInfo.coverPreview" :src="articleInfo.coverPreview" class="img" alt="预览">
          <div class="space" v-if="editTitle"></div>
          <div class="cover-upload-select">
            <Upload action="/"
                    :format="['jpg','jpeg','png']"
                    :max-size="5120"
                    accept="image/*"
                    :show-upload-list="false"
                    :before-upload="fileHandle">
              <Button :class="['cover-upload-btn', docStyle.asyncTheme ? 'ghost-btn' : '']">
                <span v-if="!coverOriginalFile">上传图片</span>
                <span v-else>重新上传</span>
              </Button>
            </Upload>
            <div class="clear-cover-btn">
              <span :style="{visibility: articleInfo.coverPreview ? 'visible' : 'hidden'}" class="un-select"
                    @click="clearCoverPreview">
                <span class="iconfont delete"></span>
                清除
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="label">
        <div class="label-text">摘要</div>
        <div>{{ articleInfo.summary?.length ? articleInfo.summary?.length : 0 }}/150</div>
      </div>
      <Input type="textarea"
             class="desc-input form-input"
             :rows="4"
             maxlength="150"
             placeholder="文档摘要"
             v-model="articleInfo.summary"/>
    </div>
    <div class="category">
      <div class="label">
        <div class="label-text">分类</div>
        <div class="label-tip">合理分类，搜索更快捷</div>
      </div>
      <div class="category-group">
        <Select v-model="articleInfo.firstLevel"
                placeholder="选择一级分类"
                class="first-level">
          <Option v-for="item in firstLevelList"
                  :value="item.code"
                  :key="item.uid">
            {{ item.menuName }}
          </Option>
        </Select>
        <Select v-model="articleInfo.secondLevel"
                :disabled="!articleInfo.firstLevel"
                placeholder="选择二级分类"
                class="second-level">
          <Option v-for="item in secondLevelList"
                  :value="item.code"
                  :key="item.uid">
            {{ item.menuName }}
          </Option>
        </Select>
      </div>
    </div>
    <div class="tags">
      <div class="label">
        <div class="label-text">标签</div>
        <div class="label-tip">添加标签，搜索更精确</div>
      </div>
      <div class="tag-add-control">
        <div v-for="(tag, index) in articleInfo.tags" :key="index" class="tag-wrap">
          <a-tooltip overlayClassName="tag-color-tooltip"
                     :getPopupContainer="getTooltipContainer">
            <template slot="title">
              <div :style="{background: tag.color}" @click="changeTagColor(tag)" class="tag-color-btn">
                <div class="hazy">
                  <span class="iconfont random"></span>
                </div>
              </div>
            </template>
            <a-tag :color=tag.color closable @close="() => handleClose(tag)">
              {{ tag.content }}
            </a-tag>
          </a-tooltip>
        </div>
        <span v-if="articleInfo.tags && articleInfo.tags.length < 3">
                <Input class="tag-input" v-if="inputVisible" ref="input" type="text" size="small" maxlength="10"
                       :style="{ width: '180px' }" v-model="inputValue"
                       @on-blur="handleInputConfirm"
                       @on-enter="handleInputConfirm"/>
                <a-tag v-else class="empty-to-add" @click="showInput">
                  <span class="iconfont add" style="font-size: 12px"></span>
                  添加标签
                </a-tag>
              </span>
      </div>
    </div>
    <Button type="success"
            :disabled="(editTitle && articleInfo.title.length === 0) || !(articleInfo.coverPreview || articleInfo.summary || (articleInfo.firstLevel && articleInfo.secondLevel) || articleInfo.tags?.length > 0)"
            @click="submitUpdate">
      <span>&nbsp;确定&nbsp;</span>
    </Button>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { formatTime, cloneDeep } from '@/utils/emoji'
import { getRandomColor, dataURLtoFile } from '@/utils/utils'
import WriteCenterApi from "@/api/WriteCenterApi";

export default {
  name: 'ArticleSetting',
  data() {
    return {
      articleInfo: {
        /*title: 'lovbe0210',
        coverPreview: null,
        isPublic: 1,
        summary: '',
        firstLevel: null,
        secondLevel: null,
        tags: [
          {content: 'SpringBoot', color: 'blue'},
          {content: 'JAVA', color: 'red'},
          {content: '调优', color: 'green'}
        ]*/
      },
      cropInfo: {
        height: 0,
        width: 0,
        flushPreview: null
      },
      coverOriginalFile: null,
      inputVisible: false,
      inputValue: '',
      // 一级分类
      firstLevelList: [
        {
          uid: 'sdfsf55',
          code: 'computenetwork',
          menuName: '计算机与网络'
        },
        {
          uid: 'asdas34213',
          menuName: '编程语言',
          code: 'language'
        },
        {
          uid: 'sdfs453',
          code: 'database',
          menuName: '数据库'
        },
        {
          uid: 'dfg345g',
          code: 'middleware',
          menuName: '中间件'
        },
        {
          uid: 'sgfg566',
          code: 'arithmetic',
          menuName: '算法'
        }
      ],
      secondLevelList: [
        {
          uid: 122,
          menuName: '计算机基础',
          code: 2
        },
        {
          uid: 123,
          menuName: '操作系统',
          code: 3
        },
        {
          uid: 126,
          menuName: '网络安全',
          code: 4
        }
      ]
    }
  },
  props: ['currentArticle', 'editTitle', 'changePermission'],
  computed: {
    docStyle() {
      return this.$store.state.docStyle;
    }
  },
  methods: {
    /**
     * 为子组件定义的事件方法
     */
    updateTitle(titleValue) {
      this.articleInfo.title = titleValue;
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
        this.articleInfo.coverPreview = data;
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
      this.articleInfo.coverPreview = null;
      this.coverOriginalFile = null;
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
    getTooltipContainer() {
      return this.$refs.TooltipContainer
    },
    changeTagColor(tag) {
      tag.color = getRandomColor();
    },
    // 标签移除
    handleClose(removedTag) {
      this.articleInfo.tags = this.articleInfo.tags.filter(tag => tag !== removedTag);
      // ant的这个关闭方法其实会将tag设置为display=none，而不是删除，所以需要阻止他的这个操作
      event.preventDefault();
    },
    // 展示添加新标签
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },
    // 标签添加完成
    handleInputConfirm() {
      const tag = {content: this.inputValue, color: getRandomColor()};
      let tags = this.articleInfo.tags;
      if (tag.content && tags.indexOf(tag) === -1) {
        this.articleInfo.tags = [...tags, tag];
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 提交文档设置
    submitUpdate() {
      let userInfo = new FormData();
      if (this.avatarPreview) {
        userInfo.append('coverFile', dataURLtoFile(this.avatarPreview, "preview.jpg"));
      }
      if (this.userInfo.username) {
        userInfo.append('username', this.userInfo.username);
      }
      if (this.userInfo.tags) {
        userInfo.append('tagArray', JSON.stringify(this.userInfo.tags));
      }
      if (this.userInfo.introduction) {
        userInfo.append('introduction', this.userInfo.introduction);
      }
      if (this.userInfo.location) {
        userInfo.append('location', this.userInfo.location);
      }
      if (this.userInfo.industry) {
        userInfo.append('industry', this.userInfo.industry);
      }
      WriteCenterApi.updateArticleCover(this, userInfo).then(() => {
        this.$Message.success("保存成功！");
        this.$emit("updateArticle", this.articleInfo);
      })
    },
    readPublicPermission(event) {
      event.preventDefault();
    },
    formatTime
  },
  created() {
    this.articleInfo = cloneDeep(this.currentArticle);
  },
  components: {
    VueCropper
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
@import "../css/common-var";

.title {
  margin-bottom: 20px;

  .label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .ivu-input {
    color: var(--font-color);
  }

  .error {
    /deep/ .ivu-input {
      border-color: red;
    }
  }
}

.permission {
  .label {
    margin-bottom: 10px;

    .required {
      color: red;
    }
  }

  .permission-input {
    display: flex;
    flex-direction: column;
    margin-left: 2px;

    .public-radio {
      //margin-right: 20px;
    }

    .private-radio, .public-radio {
      display: flex;
      margin-bottom: 13px;

      input {
        margin-right: 8px;
        cursor: pointer;

        &::before {
          position: relative;
          content: "";
          top: 3px;
          left: -1px;
          width: 16px;
          height: 16px;
          display: block;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid #00b96b;
          z-index: 5;
        }
      }

      .checked::after {
        position: relative;
        content: "";
        bottom: 9px;
        left: 3px;
        width: 8px;
        height: 8px;
        display: block;
        border-radius: 50%;
        visibility: visible;
        background-color: #00b96b;
        z-index: 6;
      }

      .permission-label {
        margin: 0;
        cursor: pointer;
      }

      .public-radio {
        margin-bottom: 10px;
      }
    }
  }

  /deep/.ivu-poptip-arrow {
    display: none;
  }

  /deep/.ivu-poptip-inner {
    border: 1px solid @border-color_normal;
    background: var(--modal-bg-color);

    .ivu-btn-text {
      background: unset;
    }
  }
}

.cover {
  .label {
    margin-bottom: 10px;
  }

  .cover-input {
    .crop-box {
      width: 100%;
      min-width: 100%;
      height: 175px;
      border-radius: 4px;
      overflow: hidden;
    }

    .cover-upload-select {
      margin-top: 15px;
      display: flex;
      align-items: center;

      .cover-upload-btn {
        font-weight: 500;
        color: @dark-font-color;
        border-color: @border-color_normal;
        padding: 0 13px;
      }

      .clear-cover-btn {
        cursor: pointer;
        margin-left: 20px;

        &:hover {
          color: @primary-color;
        }
      }

    }

    .cover-placeholder {
      &::before {
        width: 300px;
        display: flex;
        justify-content: center;
        content: '推荐尺寸360px*180px';
        color: #8a8f8d;
        position: absolute;
        z-index: 9;
        bottom: 20px;
      }

      &::after {
        content: '';
        z-index: 8;
        position: relative;
        display: flex;
        width: 300px;
        height: 240px;
        background-size: cover !important;
        background: url("../../assets/column-placeholder-cover.png");
      }
    }
  }
}

.show-preview {
  display: flex;
  justify-content: space-between;

  .crop-box {
    width: 238px !important;
    min-width: 238px !important;
    height: 146px !important;
    min-height: 146px !important;
  }

  .cover-placeholder::before {
    width: 238px !important;
    bottom: 18px !important;
  }

  .cover-placeholder::after {
    width: 238px !important;
    height: 146px !important;
  }

  .preview-operate {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 146px;

    .space {
      flex-grow: 1;
    }

    img {
      width: 153px;
      min-width: 153px;
      height: 95px;
      min-height: 95px;
      border-radius: 3px;
    }

    .cover-upload-select {
      min-width: 153px;
    }
  }
}

.summary {
  margin: 20px 0;

  .label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .ivu-input {
    color: @dark-font-color;
  }
}

.category {
  margin: 20px 0;

  .label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .label-tip {
      font-size: 12px;
      margin-left: 6px;
      color: @grey-white-font-color;
    }
  }

  .category-group {
    display: flex;

    .first-level, .second-level {
      width: 45%;
    }

    .second-level {
      margin-left: 15px;
    }
  }
}

.tags {
  margin: 20px 0;

  .label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .label-tip {
      font-size: 12px;
      margin-left: 6px;
      color: @grey-white-font-color;
    }
  }

  .tag-add-control {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    flex-direction: column;
    padding-bottom: 5px;

    .tag-wrap {
      margin-bottom: 7px;

      .ant-tag {
        display: flex;
        line-height: 24.5px;
        align-items: center;
        justify-content: center;
      }
    }

    .ivu-input {
      color: @dark-font-color;

      &:focus {
        border-color: @primary-color;
        outline: 0;
        box-shadow: none;
      }
    }

    .empty-to-add {
      background: @dropdown-background;
      border: 1px dashed @border-color_normal;
      color: @dark-font-color;

      &:hover {
        background: #fdfdfd;
        border-color: @primary-color;
      }
    }
  }
}
</style>
