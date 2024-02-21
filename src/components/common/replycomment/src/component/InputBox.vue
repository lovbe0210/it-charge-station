<template>
  <div v-click-outside="onClickOutside" class="comment-box">
    <!--<u-editor
      ref="editorRef"
      v-model="content"
      :class="{ 'input-active': action }"
      :placeholder="placeholder"
      :min-height="64"
      :img-list="imgList"
      :mentionConfig="mentionConfig"
      @click="() => (action = true)"
      @focus="onFocus"
      @input="input"
      @submit="onSubmit"
      @paste="change"
      @change-img-list-fn="changeFilesFn"
      @mentionSearch="mentionSearch"
    ></u-editor>-->
    <div class="u-editor" :class="{ active: active }">
      <div
        ref="editorRef"
        class="rich-input"
        contenteditable
        :placeholder="placeholder"
        @focus="onFocus"
        @input="input"
        @blur="onBlur"
        @keydown.enter="keyDown"
        @keydown.up.prevent="moveSelectionFn(-1)"
        @keydown.down.prevent="moveSelectionFn(1)"
        @paste="pasteFn"
        v-html="text"
      ></div>
      <div ref="imageRef" class="image-preview-box">
        <div v-for="(url, index) in imgList" :key="index" class="image-preview">
          <img :src="url" alt=""/>
          <div class="clean-btn" @click="removeImg(index)">
            <svg
              data-v-48a7e3c5=""
              data-v-7c7c7498=""
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="12" height="12" rx="2" fill="#86909C"></rect>
              <path
                data-v-48a7e3c5=""
                data-v-7c7c7498=""
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z"
                fill="white"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <MentionList
        ref="metionList"
        :is-show="isShowMention"
        :position="mentionPosition"
        :list="mentionConfig?.userArr"
        :show-avatar="mentionConfig?.showAvatar"
        @insert="insertUser"
        @change-show="changeMentionShow"
      ></MentionList>
    </div>
    <div v-if="action" class="action-box">
      <u-emoji :emoji="c_emoji" @add-emoji="(val) => $refs.editorRef?.addText(val)"></u-emoji>
      <div v-if="upload" class="picture" @click="$refs.inputRef?.click">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
          <path
            data-v-48a7e3c5=""
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
          ></path>
        </svg>
        <span>{{$u('comment.upload')}}</span>
        <input id="comment-upload" ref="inputRef" type="file" multiple @change="change" />
      </div>
      <!--<template v-if="slots.func">
        <Func />
      </template>-->
      <div>FuncXXX</div>
      <div class="btn-box">
        <button :disabled="disabled" @click="onSubmit">
          {{ contentBtn }}
        </button>
        <button v-if="cancelBtn" @click="onCancel">
          {{ cancelBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { isNull, isEmpty, isImage, createObjectURL } from '@/utils/emoji'
  // import UEditor from './Editor'
  import emoji from '@/assets/emoji/emoji.js';

// import { h, inject, nextTick, reactive, ref } from 'vue'
// import { InjectionEmojiApi, EditorInstance, UToast, UEmoji, UEditor, EmojiApi } from '~/index'
// import { ElButton } from '~/element'
// import { InjectInputBox, InjectInputBoxApi, InjectSlots } from '../../key'
  import UEmoji from './Emoji'

// export interface InputBoxApi {
//   focus(): void
// }

  export default {
    name: 'InputBox',
    data() {
      return {
        placeholder: '输入评论（Enter换行，Ctrl + Enter发送）',
        content: '',
        action: false,
        disabled: true,
        imgList: [],
        files2: [],
        state: {
          imgLength: 0
        }
      }
    },
    props: {
      contentBtn: {
        type: String
      },
      parentId: {
        type: String
      },
      reply: {
        type: Object
      },
      cancelBtn: {
        type: String
      },
      mentionConfig: {
        type: Object
      },
      // 定义upload prop，默认值为false
      upload: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      c_emoji() {
        return emoji;
      }
    },
    components: {
      // UEditor,
      UEmoji
    },
    methods: {
      changeFilesFn(arr) {
        this.files2.value = arr
      },
      input() {
        isEmpty(this.content.value.replace(/&nbsp;|<br>| /g, ""))
          ? (this.disabled.value = true)
          : (this.disabled.value = false)
      },
      // 提交评论的数据
      onSubmit() {
        this.$parent.submit({
          content:
            this.reply && this.parentId !== this.reply.id
              ? `回复 <span style="color: #6f42c1;">@${this.reply.user.username}:</span> ${this.content.value}`
              : this.content.value,
          parentId: isNull(this.parentId, null),
          reply: this.reply,
          files: this.files2.value,
          clear: () => {
            //清理输入框提交的数据
            this.clearData()
            // 关闭评论框事件
            this.$emit("close")
          }
        })
      },
      // 取消按钮的事件
      onCancel() {
        // 关闭评论框事件
        this.clearData()
        this.$emit("close")
        this.$parent.cancelFn()
      },
      //清理提交后输入框和图片列表数据
      clearData() {
        // 清空评论框内容
        this.$refs.editorRef.clear()
        this.imgList.length = 0
        //清空图片列表
        this.files2 = []
        //提交按钮禁用
        this.disabled = true
      },

      // 点击评论框外关闭操作栏和失去评论框焦点
      onClickOutside(event) {
    // const child = event.target as HTMLElement
    // const target = document.querySelector(".el-popper")
    // if (!target?.contains(child) && isEmpty(content.value)) {
    //   action.value = false
    // }

        // 评论框有内容情况下不执行操作
        if (isEmpty(this.content) && !this.state.imgLength) {
          this.action = false
          this.$emit("hide", event)
        }
      },

      onFocus() {
        this.action = true
        // 显示操作栏
        this.$nextTick(() => {
          // 所有以'el-popper-container'开头的id且被选中的元素
          this.$refs.popperRef = document.querySelector("div[id^='el-popper-container']")
        })
        // u-comment 评论框焦点事件
        this.$parent.focus()
      },
      AddMention() {
        console.log(this.$refs.editorRef.value)
      },
      focus() {
        this.$refs.editorRef.value?.focus();
      },
      onBlur(event) {
        // 记录光标
        try {
          this.range = window.getSelection()?.getRangeAt(0)
        } catch (error) {
          console.log(error)
        }
        this.$emit('blur', event)
        if (!this.editorRef?.innerHTML) this.active = false
        this.isLocked = false
      },
      keyDown(e) {
        if (e.ctrlKey && e.key === 'Enter') {
          //用户点击了ctrl+enter触发
          // console.log('ctrl+enter')
          if (isEmpty(this.modelValue.replace(/&nbsp;|<br>| /g, ''))) {
            this.$Message.info('内容不能为空')
          } else {
            this.$emit('submit')
          }
        } else if (e.key === 'Enter' && this.isShowMention) {
          // 插入用户操作
          e.preventDefault()
          const currentUser = this.enterConfirm()
          this.insertUser(currentUser)
          this.changeMentionShow(false)
        } else {
          //用户点击了enter触发
          console.log('enter')
        }
      },
      moveSelectionFn(num) {
        if (this.metionList) {
          this.metionList.moveSelection(num)
        }
      },
      pasteFn(event) {
        const clipboardData = event.clipboardData
        if (clipboardData) {
          const text = clipboardData.getData('text/plain')
          const file = clipboardData.items.length > 0 ? clipboardData.items[0].getAsFile() : null
          if (text) {
            event.preventDefault() // 阻止默认的粘贴行为
            document.execCommand('insertText', false, text) // 插入纯文本
          } else if (file) {
            console.log(file)
            event.preventDefault() // 阻止默认的粘贴行为
            // 处理粘贴的文件，例如上传到服务器
            this.$emit('paste', event, file)
          }
        }
      },
      changeMentionShow(isShow) {
        console.log('死循环了')
        this.$refs.editorRef.value?.changeMentionShow(isShow)
      },
      change(val, file) {
        if (!file) {
          this.imgList.value.length = 0 //清空上一次显示图片效果
          this.files2.value.length = 0
        }

        const files = file ? [file] : this.$refs.inputRef.value?.files //获取选中的文件对象
        this.state.imgLength = isNull(files?.length, 0)
        if (files) {
          for (let i = 0; i < files.length; i++) {
            let fileName = files[i].name //获取当-前文件的文件名
            let url = createObjectURL(files[i]) //获取当前文件对象的URL
            this.files2.value.push(files[i])
            //判断文件是否是图片类型
            if (isImage(fileName)) {
              this.imgList.value.push(url)
            } else {
              this.$Message.warn('请选择图片类型文件!')
            }
          }
        }
      },
      mentionSearch(searchStr) {
        this.$emit('mentionSearch', searchStr)
      },
      changeMetionList(users) {
        this.$emit('changeMetionList', users)
      }
    },
    directives: {
      'click-outside': {
        bind(el, binding, vnode) {
          el.clickOutsideEvent = function(event) {
            // 判断点击的元素是否在 el 内部
            if (!(el === event.target || el.contains(event.target))) {
              // 如果点击的不是 el 内部，则调用绑定的方法
              binding.value();
            }
          };
          document.addEventListener('click', el.clickOutsideEvent);
        },
        unbind(el) {
          document.removeEventListener('click', el.clickOutsideEvent);
        }
      }
    }
  }

</script>

<style lang="less" scoped>
.comment-box {
  width: 100%;
  position: relative;
  overflow: hidden;
  .action-box {
    display: flex;
    align-items: center;
    margin-top: 8px;

    & > div:not(.btn-box) {
      margin-right: 16px;
    }
    .btn-box {
      margin-left: auto;
    }

    .picture {
      font-size: 14px;
      color: var(--u-text-color-secondary);
      cursor: pointer;
      .icon {
        fill: var(--u-text-color-secondary);
        margin-right: 4px;
        margin-bottom: 1px;
      }
      #comment-upload {
        display: none;
      }
    }
  }
  .picture:hover {
    color: var(--u-color-primary);

    .icon {
      fill: var(--u-color-primary);
    }
  }
}
</style>
