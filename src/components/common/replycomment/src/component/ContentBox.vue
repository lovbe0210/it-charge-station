<template>
  <div class="comment" :class="{ reply: reply }">
    <div class="comment-sub">
      <UserCard :uid="safeStr(data.uid)">
        <!-- avatar -->
        <a
          :href="data.user.homeLink"
          :target="contentBoxParam.aTarget"
          :class="{ 'pointer-events-none': !contentBoxParam.showHomeLink }"
          class="no-underline"
          style="display: block"
        >

          <b-avatar :src="data.user.avatar" variant="light" to="/settings" size="6rem">
            <span v-if="data.user.avatar">{{ data.user.username }}</span>
            <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </b-avatar>
        </a>
      </UserCard>
    </div>
    <div class="comment-primary">
      <div class="comment-main">
        <div class="user-info">
          <UserCard :uid="safeStr(data.uid)">
            <a
              :href="data.user.homeLink"
              :target="contentBoxParam.aTarget"
              :class="{ 'pointer-events-none': !contentBoxParam.showHomeLink }"
              class="no-underline"
              style="display: block"
            >
              <div class="username">
                <span class="name" style="max-width: 10em">{{ data.user.username }}</span>
                <!-- level -->
                <span v-if="contentBoxParam.showLevel" blank="true" class="rank">
                  <span>level ?</span>
                  <!--                  <u-icon size="24" v-html="useLevel(data.user.level || 1)"></u-icon>-->
                </span>
              </div>
            </a>
          </UserCard>
          <!-- <span class="author-badge-text">（作者）</span> -->
          <span v-if="contentBoxParam.showAddress" class="address" style="color: #939393; font-size: 12px">
            &nbsp;&nbsp;{{ data.address }}
          </span>
<!--          <template v-if="slots.info">-->
            <!--            <Info />-->
            这是啥
<!--          </template>-->
          <time class="time">{{ contentBoxParam.relativeTime ? nowDateTime(data.createTime) : data.createTime }}</time>
        </div>
        <div class="content">
          <u-fold unfold>
            <div v-html="contents"></div>
            <div class="imgbox" style="display: flex">
              <template v-for="(url, index) in imgList">
                <b-img :src="url" :key="index"
                       style="height: 72px; padding: 8px 4px"
                       lazy
                       :preview-src-list="imgList"
                       :initial-index="index"></b-img>
              </template>
            </div>
          </u-fold>
        </div>
        <div class="action-box select-none">
          <!-- 点赞 -->
          <div v-if="contentBoxParam.showLikes" class="item" @click="contentBoxParam.like(str(data.id))">
            <span>图标 ？</span>
            <span>图标 ？</span>
            <span v-if="data.likes != 0">{{ data.likes }}</span>
          </div>
          <!-- 回复 -->
          <div v-if="contentBoxParam.showReply" ref="btnRef" class="item" :class="{ active: state.active }" @click="reply">
            <span>图标 ？</span>
            <span>{{ state.active ? $u('comment.cancelReply') : $u('comment.reply') }}</span>
          </div>
          <!-- 操作栏 -->
          <Operate/>
        </div>
        <div v-if="state.active">
          <InputBox
            ref="commentRef"
            :parent-id="str(id)"
            :placeholder="`${$u('comment.placeholder2')}@${data.user.username}...`"
            :reply="data"
            :content-btn="$u('comment.contentBtn2')"
            style="margin-top: 12px"
            @hide="hide"
            @close="state.active = false"
          />
        </div>
      </div>
      <!-- 回复列表 -->
<!--      <slot></slot>-->
    </div>
  </div>
</template>

<script>
  import { str, isEmpty } from '@/utils/emoji';
  import { useEmojiParsey } from '@/utils/hooks';
  import { allEmoji } from '@/assets/emoji/emoji.js';
  import { dayjs } from 'dayjs';
  // import { computed, inject, nextTick, ref, reactive, h } from 'vue'
  import InputBox from './InputBox';
  import Operate from './Operate';
  import UFold from './Fold';
  // import { EmojiApi, InjectionEmojiApi, UFold, UIcon, CommentApi } from '~/components'
  // import type { InputBoxApi } from './tools/input-box.vue'
  // import { ElAvatar } from '~/element'
  // import { useEmojiParse, useLevel } from '~/hooks'
  // import UserCard from './tools/user-card.vue'
  // import { InjectContentBox, InjectContentBoxApi, InjectSlots } from '../key'
  // import ReplyBox from "./ReplyBox";

  export default {
    name: 'ContentBox',
    data() {
      return {
        state: {
          active: false
        }
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
      imgList() {
        let temp = this.data.contentImg
        if (isEmpty(temp)) return []
        return temp?.split('||')
      },
      contents() {
        return useEmojiParsey(allEmoji, this.data.content);
      },
      nowDateTime(dateTime) {
        return dayjs(dateTime).fromNow();
      }
    },
    components: {
      InputBox,
      Operate,
      UFold
    },
    methods: {
      //点击回复按钮打开输入框
      reply1() {
        this.state.active = !this.state.active
        if (this.state.active) {
          this.$nextTick(() => {
            this.$refs.commentRef?.focus()
          })
        }
      },

      // 提交评论关闭输入框
      hide(event) {
        const target = event.target;

        if (!this.$refs.btnRef?.contains(target)) {
          this.state.active = false
        }
      },
      safeStr(id) {
        return str(id)
      }
    }
  }

  // const { allEmoji } = inject(InjectionEmojiApi) as EmojiApi
  // const { like, user, relativeTime, aTarget, showLevel, showLikes, showAddress, showHomeLink, showReply } = inject(
  //   InjectContentBox
  // ) as InjectContentBoxApi


  //工具slots
  // const slots = inject(InjectSlots) as any
  // 信息卡槽
  // const Info = () => h('div', slots.info(props.data))

  //操作栏卡槽
  // const Operate = () => h('div', slots.operate(props.data))

  // const contents = computed(() => )
</script>

<style lang="less" scoped>
  @import '../style/content-box.less';
</style>
