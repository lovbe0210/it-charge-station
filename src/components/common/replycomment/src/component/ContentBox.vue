<template>
  <div class="comment" :class="{ reply: reply }" ref="tooltipContainer">
    <div class="comment-sub">
      <a-popover placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer" overlayClassName="user-info-card">
        <template slot="content">
          <div>
            用户信息卡片
          </div>
        </template>
        <b-avatar :src="data.user.avatar" variant="light" :to="data.user.homeLink" size="2.5rem">
          <span v-if="data.user.avatar">{{ data.user.username }}</span>
          <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </b-avatar>
      </a-popover>
    </div>
    <div class="comment-primary">
      <div class="comment-main">
        <div class="user-info">
          <a-popover placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer"
                     overlayClassName="user-info-card">
            <template slot="content">
              <div>
                用户信息卡片
              </div>
            </template>
            <div class="username">
              <span class="name" style="max-width: 10em">{{ data.user.username }}</span>
              <!-- level -->
              <span blank="true" class="rank">
                  <span :class="['iconfont',  'icon-level' + data.user.level]"></span>
              </span>
            </div>
          </a-popover>

          <time class="time">{{ data.createTime }}</time>
        </div>
        <div class="content">
          <u-fold unfold>
            <div v-html="contents"></div>
            <div class="imgbox" v-if="data.contentImg" style="display: flex;">
              <b-img :src="data.contentImg" @click="imgPreview = true"
                     style="height: 72px; margin: 8px 4px; border-radius: 2px;"
                     lazy/>
              <image-preview :src="data.contentImg" :isPreviewOpen="imgPreview" @toggleFullScreen="imgPreview = false"/>
            </div>
          </u-fold>
        </div>
        <div class="action-box select-none">
          <!-- 点赞 -->
          <div class="item" @click="contentBoxParam.like(str(data.id))">
            <span class="iconfont like"></span>
            <span v-if="data.likes != 0">{{ data.likes }}</span>
          </div>
          <!-- 回复 -->
          <div ref="btnRef" class="item" :class="{ active }" @click="reply1">
            <span class="iconfont reply"></span>
            <span>{{ active ? '取消回复' : '回复' }}</span>
          </div>
          <!-- 操作栏 -->
          <Operate/>
        </div>
        <div v-if="active">
          <InputBox
            ref="commentRef"
            :parent-id="safeStr(id)"
            :placeholder="'回复@' + data.user.username"
            :reply="data"
            content-btn="发布"
            style="margin-top: 12px"
            @hide="hide"
            @exposeEditor="exposeEditor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {str} from '@/utils/emoji';
  import {useEmojiParse} from '@/utils/hooks';
  import emoji from '@/assets/emoji/emoji.js';
  import {dayjs} from 'dayjs';
  import InputBox from './InputBox';
  import Operate from './Operate';
  import UFold from './Fold';
  import ImagePreview from '@/components/common/ImagePreview'

  export default {
    name: 'ContentBox',
    data() {
      return {
        active: false,
        editorRef: null,
        imgPreview: false
      }
    },
    props: {
      reply: {
        type: Boolean
      },
      data: {
        type: Object
      },
      id: {
        type: String
      },
      contentBoxParam: {
        type: Object
      }
    },
    computed: {
      contents() {
        return useEmojiParse(emoji.allEmoji, this.data.content);
      }
    },
    components: {
      InputBox,
      Operate,
      UFold,
      ImagePreview
    },
    methods: {
      //点击回复按钮打开输入框
      reply1() {
        this.active = !this.active
        if (this.active) {
          this.$nextTick(() => {
            this.editorRef?.focus()
          })
        }
      },

      // 提交评论关闭输入框
      hide(event) {
        this.active = false
        /*const target = event.target;

        if (!this.$refs.btnRef?.contains(target)) {
          this.active = false
        }*/
      },
      safeStr(id) {
        return str(id)
      },
      nowDateTime(dateTime) {
        return dayjs.fromNow();
      },
      exposeEditor(editorRef) {
        this.editorRef = editorRef;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/content-box.less';
</style>
