<template>
  <div class="comment-box" v-click-outside="onClickOutside">
    <div class="u-editor" :class="{ active: active }">
      <div ref="editorRef" id="expectRange"
           class="rich-input"
           contenteditable
           :placeholder="placeholder"
           @focus="focus"
           @input="onInput"
           @blur="onBlur"
           @keydown.enter="keyDown"
           @paste="pasteFn"
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
    </div>
    <MentionList v-show="isShowMention"
                 :position="mentionPosition"
                 :list="mentionList"
                 @insert="insertUser"
    ></MentionList>
    <div v-if="action" class="action-box">
      <div class="u-emoji">
        <a-popover trigger="click">
          <div slot="content" class="settings emoji-popover" @mouseenter="onBefore">
            <div class="face-tooltip-head select-none">
              <label
                v-for="(item, index) in c_emoji.faceList"
                :key="index"
                :class="activeIndex == index ? 'active' : ''"
                @click="changeEmoji(index)"
              >
                <img :src="item" alt=""/>
              </label>
            </div>
            <div class="emoji-body select-none">
              <div class="emjio-container" :style="{ transform: `translateX(${offsetX}%)` }">
                <div v-for="(list, index) in emojis" :key="index" class="emoji-wrapper">
                  <div style="padding: 0 5px">
                  <span v-for="(value, key) in list"
                        :key="key"
                        class="emoji-item"
                        @click="addText(key)">
                <b-img class="emoji" style="width: 24px; height: 24px; margin: 5px" right fluid rounded :src="value"
                       :alt="String(key)"/>
              </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="emoji-btn select-none">
            </div>
          </div>
          <div>
            <span class="iconfont emoji"/>
            <span>表情</span>
          </div>
        </a-popover>
      </div>

      <Upload class="picture"
              action="//jsonplaceholder.typicode.com/posts/" :show-upload-list="false"
              :format="['jpg','jpeg','png']" :max-size="10240"
              accept="image/png, image/jpeg"
              :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError"
              :on-success="handleServerSuccess" :on-error="handleServerError">
        <div>
          <span class="iconfont image"/>
          <span>图片</span>
        </div>
      </Upload>

      <div class="btn-box">
        <button :disabled="disabled" @click="onSubmit">
          {{ contentBtn }}
        </button>
        <button v-if="cancelBtn" @click="resetComment">
          {{ cancelBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {isNull, isEmpty, isImage, createObjectURL, cloneDeep} from '@/utils/emoji'
  import emoji from '@/assets/emoji/emoji.js';
  import MentionList from './MentionList.vue'

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
        isShowMention: false,
        // 评论框是否激活
        active: false,
        // 操作栏是否激活（评论框有内容时一直为true）
        action: false,
        mentionPosition: {
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
        scHeight: 0,
        activeIndex: 0,
        offsetX: 0,
        emojis: new Array(2),
        content: '',
        searchStr: '',
        mentionList: [],
        range: null,
        disabled: true,
        imgList: [],
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
      MentionList
    },
    methods: {
      // 提交评论的数据
      onSubmit() {
        let htmlStr = this.reply && this.parentId !== this.reply.id
          ? `回复 <span style="color: #6f42c1;">@${this.reply.user.username}:</span> ${this.content}` : this.content
        let comment = {
          id: ++this.tempId + '',
          parentId: this.parentId,
          address: null,
          content: htmlStr,
          likes: 0,
          createTime: Date.now(),
          file: this.files,
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
        this.imgList.length = 0
        //清空图片列表
        this.files = []
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
        } else if (e.key === 'Enter' && this.isShowMention) {
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
        this.isShowMention = isShow;
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

          this.content = this.editorRef?.innerHTML || ''
        }
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
      handleMaxSize() {
        this.$Message.warning('文件大小不得超过10MB！');
      },
      handleFormatError() {
        this.$Message.warning('文件格式错误，请上传正确的图片');
      },
      handleServerSuccess() {
        // 清空上一次的图片展示
        this.$Message.success('替换图片表情成功');
      },
      handleServerError() {
        this.$Message.error('网络错误，请稍后重试！');
      },
      // 移除图片
      removeImg(val) {
        this.imgList?.splice(val, 1);
        cloneDeep(this.imgList)
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
      onBefore() {
        this.emojis[0] = this.c_emoji.emojiList[0]
      },
      changeEmoji(val) {
        this.activeIndex = val;
        switch (val) {
          case 0:
            this.offsetX = 0
            break
          case 1:
            this.offsetX = -50
            this.emojis[1] = this.c_emoji.emojiList[1]
            break
        }
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
        this.disabled = isEmpty(this.content.replace(/&nbsp;|<br>| /g, ""));
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
        // 评论框有内容情况下不执行操作
        if (isEmpty(this.content) && !this.file && this.initState > 0) {
          this.action = false;
          this.$emit('hide')
          return;
        }
        this.initState = ++this.initState;
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
        if (this.isShowMention && newVal.slice(-6) !== '&nbsp;') {
          this.searchStr = newVal.split('@').pop() || ''
          // 替换掉里面所有的单引号分隔符
          this.searchStr = this.searchStr.replace(`'`, '')
          this.mentionSearch(this.searchStr)
        } else if (this.isShowMention && newVal.slice(-6) === '&nbsp;') {
          this.changeMentionShow(false)
        }
      },
      "scHeight"(newVal, oldVal) {
        if (newVal === oldVal) return;
        if (!this.isShowMention) return;
        let rect = this.range?.getBoundingClientRect()
        if (rect) {
          this.mentionPosition = {
            left: rect.left,
            top: rect.top + rect.height + 10
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
  @import '../style/emoji';

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

    .emoji-popover {
      padding: 12px 0 !important;
    }
  }
</style>
