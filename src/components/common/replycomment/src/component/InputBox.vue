<template>
  <div class="comment-box" v-click-outside="onClickOutside" ref="popoverContainer">
    <div class="u-editor" :class="{ active: active }">
      <div ref="editorRef" id="expectRange"
           class="rich-input"
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
    </div>
    <mention-list v-show="showMention"
                  :style="`left: ${mentionPosition.left}px; top: ${mentionPosition.top}px`"
                  :list="mentionList"
                  @insert="insertUser"/>
    <emoji-selector v-show="showEmojiSelector"
                    @addText="addText"
                    :style="`left: ${EmojiSelectorPosition.left}px; top: ${EmojiSelectorPosition.top}px`"/>

    <div v-if="action" class="action-box">
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
        <Button :disabled="disabled" type="primary" @click="onSubmit">
          {{ contentBtn }}
        </Button>
        <Button v-if="cancelBtn" @click="resetComment">
          {{ cancelBtn }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import { isEmpty } from '@/utils/emoji'
  import emoji from '@/assets/emoji/emoji.js';
  import MentionList from './MentionList'
  import EmojiSelector from "./EmojiSelector";

  const baseUserArr = [
    {
      userId: 1,
      userName: '张三',
      userAvatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
    },
    {
      userId: 2,
      userName: '李四',
      userAvatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
    },
    {
      userId: 3,
      userName: '王五',
      userAvatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
    },
    {
      userId: 4,
      userName: '赵六',
      userAvatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
    },
    {
      userId: 5,
      userName: '孙七',
      userAvatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
    },
    {
      userId: 6,
      userName: '周八',
      userAvatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
    },
    {
      userId: 7,
      userName: '吴九',
      userAvatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
    },
    {
      userId: 8,
      userName: '郑十',
      userAvatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
    },
    {
      userId: 9,
      userName: '王富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
    },
    {
      userId: 10,
      userName: '赵富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
    }
  ];

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
        mentionConfig: {
          // @提及 功能开关
          functionStatus: true,
          // @提及 渲染的颜色
          mentionColor: '#409eff'
        },
        // 记录滚动条变动值
        scHeight: 0,
        content: '',
        searchStr: '',
        mentionList: [],
        range: null,
        disabled: true,
        previewUrl: null,
        file: null,
        tempId: 1001
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '输入评论（Enter换行，Ctrl + Enter发送）'
      },
      contentBtn: {
        type: String
      },
      cancelBtn: {
        type: String
      },
      parentId: {
        type: String
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
        let htmlStr = this.reply && this.parentId !== this.reply.id
          ? `回复 <span style="color: #008Ac5;">@${this.reply.user.username}:</span> ${this.content}` : this.content
        let comment = {
          id: ++this.tempId + '',
          parentId: this.parentId,
          address: null,
          content: htmlStr,
          likes: 0,
          createTime: Date.now(),
          file: this.file,
          user: {
            username: this.userInfo.username,
            avatar: this.userInfo.avatar,
            level: this.userInfo.level,
            homeLink: this.userInfo.domain
          },
          reply: null
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
        if (e.ctrlKey && e.key === 'Enter') {
          //用户点击了ctrl+enter触发
          if (isEmpty(this.content.replace(/&nbsp;|<br>| /g, ''))) {
            this.$Message.info('内容不能为空');
          } else {
            this.onSubmit();
          }
        } else if (e.key === 'Enter' && this.showMention) {
          // TODO 插入用户操作
          /*e.preventDefault()
          const currentUser = this.enterConfirm()
          this.insertUser(currentUser)*/
        } else {
          console.log(e.key)
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

          if (this.c_emoji.allEmoji[val]) {
            // 当前输入对象为表情
            this.showEmojiSelector = false;
          }
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
        // 生成base64格式进行显示
        const reader = new FileReader(); // 创建FileReader对象
        reader.onload = () => {
          // 读取文件完成后将结果设置为预览图URL
          this.previewUrl = reader.result;
          this.file = file;
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
      createSvgUrl(user) {
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
          let img = this.createSvgUrl(user)
          this.addText(`${img}\u2008`, true)
        }
        this.changeMentionShow(false)
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
        if (!this.mentionConfig.functionStatus) return

        // 移除 "br"
        newVal = newVal.replace(/<br>/g, '')
        oldVal = oldVal.replace(/<br>/g, '')
        if ((oldVal.length >= newVal.length && oldVal.slice(-1) === '@') || newVal.slice(-7) === '@&nbsp;') {
          // 隐藏提及组件
          this.changeMentionShow(false)
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
      elementById.addEventListener('scroll', this.changeMentionPosition, true);

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
      elementById.removeEventListener('scroll', this.changeMentionPosition);
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
