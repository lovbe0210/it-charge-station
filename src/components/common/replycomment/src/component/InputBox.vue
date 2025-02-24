<template>
  <div class="comment-box" v-click-outside="onClickOutside" ref="popoverContainer">
    <div class="u-editor" :class="{ active: active }">
      <div ref="editorRef" id="expectRange"
           class="rich-input beauty-scroll"
           contenteditable
           :placeholder="placeholder"
           @focus="focus"
           @input="onInput"
           @blur="onBlur"
           @keydown.enter="keyDown"
           @paste="pasteFn">
      </div>
      <div class="image-preview-box" v-if="previewUrl">
        <div class="image-preview">
          <img :src="previewUrl" alt=""/>
          <div class="clean-btn" @click="removeImg">
            <span class="iconfont remove"></span>
          </div>
        </div>
      </div>
    </div>
    <mention-list v-show="showMention"
                  :style="`left: ${mentionPosition.left}px; top: ${mentionPosition.top}px`"
                  :list="mentionList"
                  @insert="insertUser"/>
    <emoji-selector v-show="showEmojiSelector"
                    @addText="insertEmoji"
                    :style="`left: ${EmojiSelectorPosition.left}px; top: ${EmojiSelectorPosition.top}px`"/>

    <div v-if="scene === 'message' || action" class="action-box">
      <div class="action-emoji">
        <div class="emoji-content" @click="showEmoji" ref="emojiSelectorBtn">
          <span class="iconfont emoji"/>
          <span>表情</span>
        </div>
      </div>
      <Upload class="action-picture"
              action=""
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              accept="image/png, image/jpeg"
              :before-upload="addImage">
        <div class="picture-content">
          <span class="iconfont image"/>
          <span>图片</span>
        </div>
      </Upload>
      <div class="btn-box">
        <Button
          :disabled="disabled"
          type="primary"
          @click="onSubmit"
          title="Enter发送，Shift + Enter换行">
          {{ contentBtn }}
        </Button>
        <Button type="text" v-if="cancelBtn" @click="resetComment">
          {{ cancelBtn }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {isEmpty} from '@/utils/emoji'
  import emoji from '@/assets/emoji/emoji.js';
  import MentionList from './MentionList'
  import EmojiSelector from "./EmojiSelector";

  const baseUserArr = [];

  export default {
    name: 'InputBox',
    data() {
      return {
        // 是否显示提及框
        showMention: false,
        // 是否显示表情选择器
        showEmojiSelector: false,
        // 评论框是否激活
        active: false,
        // 操作栏是否激活（评论框有内容时一直为true）
        action: false,
        mentionPosition: {
          left: 0,
          top: 0
        },
        EmojiSelectorPosition: {
          left: 0,
          top: 0
        },
        // 初始化状态
        initState: 0,
        // 记录滚动条变动值
        scHeight: 0,
        content: '',
        searchStr: '',
        mentionList: [],
        range: null,
        disabled: true,
        previewUrl: null,
        file: null
      }
    },
    props: {
      scene: {
        // 业务场景 '评论comment'、消息盒子message
        type: String
      },
      placeholder: {
        type: String,
        default: '输入评论（Enter发送，Shift + Enter换行）'
      },
      mentionConfig: {
        type: Object,
        default() {
          return {
            // @提及 功能开关
            functionStatus: false,
            // @提及 渲染的颜色
            mentionColor: '#409eff'
          }
        }
      },
      contentBtn: {
        type: String
      },
      cancelBtn: {
        type: String
      },
      parentId: {
        type: Number
      },
      reply: {
        type: Object
      }
    },
    computed: {
      c_emoji() {
        return emoji;
      },
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    components: {
      MentionList,
      EmojiSelector
    },
    methods: {
      // 提交评论的数据
      onSubmit() {
        let comment = {
          parentId: this.parentId,
          address: null,
          content: this.content,
          replyUserId: (this.reply && this.parentId !== this.reply.uid) ? this.reply.userInfo.uid : null,
          createTime: Date.now(),
          contentImgFile: this.file
        }

        this.$emit('submit', comment, () => {
          //清理输入框提交的数据
          this.resetComment()
        });
        this.$emit('hide');
      },
      // 重置评论
      resetComment() {
        // 清空评论框内容
        if (this.editorRef) {
          this.editorRef.innerHTML = '';
          this.content = '';
          this.active = false;
          this.action = false;
        }
        //清空图片列表
        this.file = null;
        this.previewUrl = null;
        //提交按钮禁用
        this.disabled = true
        // 删除光标
        this.range = null;
        // 强制编辑器失去焦点
        if (this.editorRef) {
          this.editorRef.blur();
        }
      },
      focus() {
        this.action = true;
        this.active = true
      },
      onBlur() {
        // 记录光标
        try {
          this.range = window.getSelection()?.getRangeAt(0)
        } catch (error) {
          console.log(error)
        }
        if (!this.editorRef?.innerHTML) {
          this.active = false;
        }
      },
      keyDown(e) {
        // 评论区时阻止通过快捷键发送
        if (e.shiftKey && e.key === 'Enter') {
          //用户点击了shift + enter触发Enter的换行
        } else if (e.ctrlKey && e.key === 'Enter') {
          // ctrl+enter直接跳过
          e.preventDefault()
        } else if (e.key === 'Enter' && this.showMention) {
          // TODO 插入用户操作
          /*e.preventDefault()
          const currentUser = this.enterConfirm()
          this.insertUser(currentUser)*/
        } else if (e.key === 'Enter') {
          // 阻止原生的enter换行
          e.preventDefault()
          if (isEmpty(this.content.replace(/&nbsp;|<br>| /g, ''))) {
            this.$Message.warning('内容不能为空');
          } else {
            this.onSubmit();
          }
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
            // 此处不允许粘贴文件，只能通过按钮选择上传图片
            console.log(file)
            event.preventDefault() // 阻止默认的粘贴行为
          }
        }
      },
      // 修改提及框显示的方法
      changeMentionShow(isShow) {
        this.showMention = isShow;
        if (!isShow) {
          this.searchStr = ''
        }
      },
      addText(val, isPop) {
        let selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          // 为空初始化光标
          if (!this.range) {
            this.editorRef?.focus()
            this.range = selection.getRangeAt(0)
          }

          // 如果isPop为true 删除@字符
          if (isPop && !this.searchStr) {
            if (this.range.startOffset > 0) {
              this.range.setStart(this.range.startContainer, this.range.startOffset - 1)
              this.range.deleteContents()
            }
          } else if (isPop && this.searchStr) {
            // 删除掉@符号以及searchStr
            let deleteLength = this.searchStr.length + 1 // +1 for @ symbol
            let actualStartOffset = this.range.startContainer.data.lastIndexOf('@' + this.searchStr)
            if (actualStartOffset !== -1) {
              this.range.setStart(this.range.startContainer, actualStartOffset)
              this.range.setEnd(this.range.startContainer, actualStartOffset + deleteLength)
              this.range.deleteContents()
            }
          }
          // 删除选中内容
          this.range.deleteContents()
          // 添加内容
          this.range.insertNode(this.range.createContextualFragment(val))
          this.range.collapse(false)
          selection.addRange(this.range)

          this.content = this.editorRef?.innerHTML || '';
        }
      },
      addImage(file) {
        // 图片大小限制10MB
        if (file?.size > 10 * 1024 * 1024) {
          this.$Message.error('图片大小不得超过10MB！');
          return false;
        }
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg') {
          this.$Message.error('请选择正确的图片格式！');
          return false;
        }
        // 如果是消息盒子，直接返回文件
        if (this.scene === 'message') {
          this.$emit('uploadImage', file);
          return false;
        }
        // 生成base64格式进行显示
        const reader = new FileReader(); // 创建FileReader对象
        reader.onload = () => {
          // 读取文件完成后将结果设置为预览图URL
          this.previewUrl = reader.result;
          this.file = file;
          // 如果是用于聊天消息，主动发起一次
        };
        // 读取文件内容，这里使用DataURL格式
        reader.readAsDataURL(file);
        return false;
      },
      // 移除图片
      removeImg() {
        this.previewUrl = null;
        this.file = null;
      },
      //创建@标签
      createSvgAtUser(user) {
        // 创建一个不可见的SVG元素用于测量文本宽度
        const svgForMeasure = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                              <style>
                                .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
                              </style>
                              <text x="0" y="15" class="mention-text">@${user.userName}</text>
                            </svg>`

        // 将SVG添加到DOM中以测量文本
        const container = document.createElement('div')
        container.style.visibility = 'hidden' // 隐藏容器
        container.innerHTML = svgForMeasure
        document.body.appendChild(container)

        // 测量文本宽度
        const textElement = container.querySelector('text')
        let textWidth = 200 // 默认宽度
        if (textElement) {
          textWidth = textElement.getComputedTextLength()
        }

        // 移除用于测量的SVG
        document.body.removeChild(container)

        // 创建最终的SVG元素
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${textWidth}" height="20">
                      <style>
                        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${this.mentionConfig.mentionColor}; }
                      </style>
                      <text x="0" y="15" class="mention-text">@${user.userName}</text>
                    </svg>`

        // 编码SVG以便作为URL使用
        const encodedSvg = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')

        const url = `data:image/svg+xml,${encodedSvg}`

        // 返回img标签
        return `<img src="${url}"
                    alt="@${user.userName}"
                    style="width:${textWidth}px;height:20px;user-select: none; vertical-align: sub;"
                    data-userName="${user.userName}"
                    data-id="${user.userId}"
                    draggable="false">`
      },
      //@用户插入操作
      insertUser(user) {
        if (user) {
          let img = this.createSvgAtUser(user)
          this.addText(`${img}\u2008`, true)
        }
        this.changeMentionShow(false)
      },
      // 表情插入操作
      insertEmoji(emojiVal) {
        let emoji;
        let emojiPath = this.c_emoji.allEmoji[emojiVal];
        console.log(emojiVal, emojiPath)
        if (emojiPath) {
          // 当前输入对象为表情
          emoji = [
            '<img src="',
            emojiPath,
            '" width="18" height="18" alt="',
            emojiVal,
            '" title="',
            emojiVal,
            '" style="margin: 0 1px; vertical-align: text-bottom"',
            '/>'
          ].join('');
          this.showEmojiSelector = false;
        } else {
          emoji = emojiVal;
        }
        this.addText(emoji);
      },
      // 输入框事件
      onInput(event) {
        const {innerHTML} = event.target;
        if (this.mentionConfig.functionStatus && event.data === '@') {
          // 获取用户列表
          // 记录光标
          try {
            this.range = window.getSelection()?.getRangeAt(0)
          } catch (error) {
            console.log(error)
          }

          let rect = this.range?.getBoundingClientRect()
          // 获取预置数据
          if (this.mentionList?.length === 0) {
            this.mentionList = baseUserArr;
          }
          // 显示提及组件
          this.changeMentionShow(true)
          if (rect) {
            this.mentionPosition = {
              left: rect.left,
              top: rect.top + rect.height + 10
            }
          }
        }

        this.content = innerHTML;
        this.onEditorSelectionChange()
      },
      //光标位置监听
      onEditorSelectionChange() {
        //实时保存光标位置
        if (this.editorRef) {
          this.range = this.editorRef?.ownerDocument.getSelection()?.getRangeAt(0)
        }
      },
      changeMentionPosition() {
        let scrollBox = document.getElementById("contentWrapper");
        if (!scrollBox) {
          scrollBox = document.scrollingElement;
        }
        this.scHeight = scrollBox?.scrollTop;
      },
      mentionSearch(searchStr) {
        // 模拟请求延时
        setTimeout(() => {
          if (this.mentionConfig) {
            this.mentionList = baseUserArr.filter(e => {
              if (searchStr) {
                return e.userName.includes(searchStr);
              } else {
                return true;
              }
            });
            if (this.mentionList?.length === 0) {
              this.mentionList = baseUserArr;
            }
          }
        }, 1000)
      },
      findExpectRange(node) {
        while (node) {
          let id = node.id;
          if (id === 'expectRange') {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      },
      // 点击评论框外关闭操作栏和失去评论框焦点
      onClickOutside() {
        if (this.showEmojiSelector) {
          this.showEmojiSelector = false;
          return;
        }
        // 评论框有内容情况下不执行操作
        if (isEmpty(this.content) && !this.file && this.initState > 0) {
          this.action = false;
          this.$emit('hide')
          return;
        }
        this.initState = ++this.initState;
      },
      showEmoji() {
        let emojiRect = this.$refs.emojiSelectorBtn?.getBoundingClientRect();
        if (emojiRect) {
          this.EmojiSelectorPosition = {
            left: emojiRect.left,
            top: emojiRect.top + emojiRect.height + 10
          }
        }
        this.showEmojiSelector = true;
      }
    },
    watch: {
      "content"(newVal, oldVal) {
        if (!this.mentionConfig.functionStatus) {
          // 更新disabled
          this.disabled = isEmpty(this.content.replace(/&nbsp;|<br>| /g, ""));
          return;
        }
        // 移除 "br"
        newVal = newVal.replace(/<br>/g, '')
        oldVal = oldVal.replace(/<br>/g, '')
        if ((oldVal.length >= newVal.length && oldVal.slice(-1) === '@') || newVal.slice(-7) === '@&nbsp;') {
          // 隐藏提及组件
          this.changeMentionShow(false)
          this.disabled = isEmpty(this.content.replace(/&nbsp;|<br>| /g, ""));
          return;
        }
        // 搜索词
        if (this.showMention && newVal.slice(-6) !== '&nbsp;') {
          this.searchStr = newVal.split('@').pop() || ''
          // 替换掉里面所有的单引号分隔符
          this.searchStr = this.searchStr.replace(`'`, '')
          this.mentionSearch(this.searchStr)
        } else if (this.showMention && newVal.slice(-6) === '&nbsp;') {
          this.changeMentionShow(false)
        }
        // 更新disabled
        this.disabled = isEmpty(this.content.replace(/&nbsp;|<br>| /g, ""));
      },
      "scHeight"(newVal, oldVal) {
        if (newVal === oldVal) return;
        if (!this.showMention && !this.showEmojiSelector) return;
        let rangeRect = this.range?.getBoundingClientRect()
        if (rangeRect) {
          this.mentionPosition = {
            left: rangeRect.left,
            top: rangeRect.top + rangeRect.height + 10
          }
        }
        let emojiRect = this.$refs.emojiSelectorBtn?.getBoundingClientRect();
        if (emojiRect) {
          this.EmojiSelectorPosition = {
            left: emojiRect.left,
            top: emojiRect.top + emojiRect.height + 10
          }
        }
      },
      "range"(newVal, oldValue) {
        if (!newVal) return;
        let node;
        let expectRange = newVal.commonAncestorContainer;
        if (expectRange instanceof Element) {
          node = expectRange;
        } else if (expectRange instanceof Text) {
          node = expectRange.parentNode;
        } else {
          this.range = oldValue;
          return;
        }
        let changeRange = this.findExpectRange(node);
        this.range = changeRange ? newVal : oldValue;
      }
    },
    mounted() {
      this.editorRef = this.$refs.editorRef;
      let elementById = document.getElementById("contentWrapper");
      if (elementById) {
        elementById.addEventListener('scroll', this.changeMentionPosition, true);
      } else {
        document.addEventListener('scroll', this.changeMentionPosition, true);
      }

      if (!this.cancelBtn) {
        // 楼中楼
        this.$emit('exposeEditor', this.editorRef)
      } else {
        // 评论框
        this.initState = 1;
      }
    },
    beforeDestroy() {
      let elementById = document.getElementById("contentWrapper");
      if (elementById) {
        elementById.removeEventListener('scroll', this.changeMentionPosition);
      } else {
        document.removeEventListener('scroll', this.changeMentionPosition);
      }
    },
    directives: {
      'click-outside': {
        bind(el, binding, vnode) {
          el.clickOutsideEvent = function (event) {
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
  @import "../style/editor.less";
  /*@import '../style/emoji';*/
</style>
