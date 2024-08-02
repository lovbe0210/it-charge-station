<template>
  <div ref="TooltipContainer">
    <div class="title" v-if="editTitle">
      <div class="label">
        <div class="label-text">标题</div>
      </div>
      <Input type="text"
             class="desc-input form-input"
             maxlength="15"
             placeholder="文档标题"
             v-model="docInfo.title"/>
    </div>
    <div class="cover">
      <div class="label">
        <span class="label-text">封面</span>
      </div>
      <div class="cover-input">
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
        <div class="cover-upload-select">
          <Upload action="/"
                  :format="['jpg','jpeg','png']"
                  :max-size="5120"
                  accept="image/*"
                  :show-upload-list="false"
                  :before-upload="fileHandle">
            <Button :class="['cover-upload-btn', docStyle.customerTheme ? 'ghost-btn' : '']">
                      <span v-if="!coverOriginalFile">
                        <span class="iconfont upload"/>上传图片</span>
              <span v-else>重新上传</span>
            </Button>
          </Upload>
          <div class="clear-cover-btn">
            <span v-show="docInfo.coverPreview" class="un-select" @click="clearCoverPreview">
              <span class="iconfont delete"></span>
              清除
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="label">
        <div class="label-text">摘要</div>
        <div>{{ docInfo.summary?.length ? docInfo.summary?.length : 0 }}/150</div>
      </div>
      <Input type="textarea"
             class="desc-input form-input"
             :rows="4"
             maxlength="150"
             placeholder="文档摘要"
             v-model="docInfo.summary"/>
    </div>
    <div class="category">
      <div class="label">
        <div class="label-text">分类</div>
        <div class="label-tip">合理分类，搜索更快捷</div>
      </div>
      <div class="category-group">
        <Select v-model="docInfo.firstLevel"
                placeholder="选择一级分类"
                class="first-level">
          <Option v-for="item in firstLevelList"
                  :value="item.code"
                  :key="item.uid">
            {{ item.menuName }}
          </Option>
        </Select>
        <Select v-model="docInfo.secondLevel"
                :disabled="!docInfo.firstLevel"
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
        <div v-for="(tag, index) in docInfo.tags" :key="index" class="tag-wrap">
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
        <span v-if="docInfo.tags && docInfo.tags.length < 3">
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
            :disabled="(editTitle && docInfo.title.length === 0) || !(docInfo.coverPreview || docInfo.summary || (docInfo.firstLevel && docInfo.secondLevel) || docInfo.tags?.length > 0)"
            @click="submitDocSetting">
      <span>&nbsp;确定&nbsp;</span>
    </Button>
  </div>
</template>
<script>
import {VueCropper} from 'vue-cropper'
import {formatTime} from '@/utils/emoji'
import {getRandomColor} from '@/utils/utils'

export default {
  name: 'ArticleSetting',
  data() {
    return {
      docInfo: {
        title: 'lovbe0210',
        coverPreview: null,
        summary: '',
        firstLevel: null,
        secondLevel: null,
        tags: [
          {content: 'SpringBoot', color: 'blue'},
          {content: 'JAVA', color: 'red'},
          {content: '调优', color: 'green'}
        ]
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
  props: ['articleId', 'editTitle'],
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
      this.docInfo.title = titleValue;
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
        this.docInfo.coverPreview = data;
      })
    },
    imgLoadOver(data) {
      if (data) {
        this.$nextTick(() => {
          this.getNewCropImage();
          this.cropInfo.height = this.$refs.cropper.cropH;
          this.cropInfo.width = this.$refs.cropper.cropW;
          this.cropInfo.flushPreview = setInterval(() => {
            if (!this.baseInfo.coverOriginalFile) {
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
      this.docInfo.coverPreview = null;
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
      this.docInfo.tags = this.docInfo.tags.filter(tag => tag !== removedTag);
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
      let tags = this.docInfo.tags;
      if (tag.content && tags.indexOf(tag) === -1) {
        this.docInfo.tags = [...tags, tag];
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 提交文档设置
    submitDocSetting() {
      this.$Message.success("保存成功！")
    },
    formatTime
  },
  components: {
    VueCropper
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
      color: @dark-font-color;
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
        justify-content: space-between;
        align-items: center;

        .cover-upload-btn {
          font-weight: 500;
          color: @dark-font-color;
          border-color: @border-color_normal;
          padding: 0 13px;

          &:hover {
            color: @primary-color;
            border-color: @primary-color;
          }
        }

        .clear-cover-btn {
          cursor: pointer;

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
          bottom: 25px;
        }

        &::after {
          content: '';
          z-index: 8;
          position: relative;
          display: flex;
          width: 300px;
          height: 240px;
          background: url("../../assets/column-placeholder-cover.png");
        }
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
