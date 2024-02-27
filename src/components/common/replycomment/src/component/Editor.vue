<template>
  <div class="u-editor" :class="{ active: active }">
    <div
      ref="editorRef"
      class="rich-input"
      contenteditable
      :placeholder="placeholder"
      @focus="onFocus"
      @input="onInput"
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
</template>
<script>
  import {cloneDeep, isEmpty} from '@/utils/emoji'
  import MentionList from './MentionList.vue'

  export default {
    name: 'UEditor',
    data() {
      return {
        placeholder: '输入评论（Enter换行，Ctrl + Enter发送）',
        mentionPosition: {
          left: 0,
          top: 0
        },
        // 是否显示提及框
        isShowMention: false,
        searchStr: '',
        text: null,
        isLocked: false,
        active: false,
        range: null,
        editorRef: null,
        imageRef: null
      }
    },
    props: {
      modelValue: {
        type: String
      },
      minHeight: {
        type: Number,
        default: 30
      },
      imgList: {
        type: Array
      },
      mentionConfig: {
        type: Object
      }
    },
    computed: {
      c_minHeight() {
        return this.minHeight + 'px';
      },
      c_padding() {
        return this.minHeight === 30 ? '4px 10px' : '8px 12px';
      }
    },
    components: {
      MentionList
    },
    watch: {
      "modelValue"(newVal, oldVal) {
        if (!this.isLocked) this.text = newVal;
        if (!this.mentionConfig?.show) return;

        // 移除 "br"
        newVal = newVal.replace(/<br>/g, '')
        oldVal = oldVal.replace(/<br>/g, '')
        if ((oldVal.length >= newVal.length && oldVal.slice(-1) === '@') || newVal.slice(-7) === '@&nbsp;') {
          // 隐藏提及组件
          this.changeMentionShow(false)
        }
        // 搜索词
        if (this.isShowMention && newVal.slice(-6) !== '&nbsp;') {
          this.searchStr = newVal.split('@').pop() || ''
          // 替换掉里面所有的单引号分隔符
          this.searchStr = this.searchStr.replace(`'`, '')
          console.log(this.searchStr)
          this.mentionSearch(this.searchStr)
          if (this.metionList) {
            this.metionList.resetSelectIndex()
          }
        } else if (this.isShowMention && newVal.slice(-6) === '&nbsp;') {
          this.changeMentionShow(false)
        }
        // 提取出来newVal里面所有拥有自定义属性的img标签
        let imgTags = newVal.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g)
        if (imgTags) {
          let dataIds = imgTags.map(tag => {
            let match = tag.match(/data-id="([^"]*)"/)
            return match ? match[1] : null
          })
          // 从mentionConfig.value.userArr里面获取id相同的user
          let users = this.mentionConfig.userArr.filter((user) =>
            dataIds.includes(`${user[this.mentionConfig.userIdKey]}`)
          )
          this.changeMetionList(users)
        } else {
          this.changeMetionList([])
        }
      }
    },
    methods: {
      // 修改提及框显示的方法
      changeMentionShow(isShow) {
        this.isShowMention = isShow;
        if (!isShow) {
          this.searchStr = ''
        }
      },
      changeMentionPosition(position) {
        this.mentionPosition = position
      },
      //上下移动的方法
      moveOption(step) {
        if (this.metionList) {
          this.metionList.moveSelection(step)
        }
      },
      //回车确认关闭方法
      enterConfirm() {
        if (this.metionList) {
          return this.metionList.printSelectedItem()
        }
      },
      onFocus(event) {
        this.$emit('focus', event);
        this.isLocked = true;
        this.active = true
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

      moveSelectionFn(num) {
        this.moveOption(num)
      },

      // 输入框事件
      onInput(event) {
        const {innerHTML} = event.target;
        if (event.data === '@' && this.mentionConfig?.show) {
          // 获取用户列表
          // 记录光标
          try {
            this.range = window.getSelection()?.getRangeAt(0)
          } catch (error) {
            console.log(error)
          }

          let rect = this.range?.getBoundingClientRect()
          // 显示提及组件
          this.changeMentionShow(true)
          if (rect) {
            this.changeMentionPosition({
              left: rect.left,
              top: rect.top + rect.height + 10
            })
          }
        }

        this.$emit('update:modelValue', innerHTML)
        this.$emit('input', event)
        this.onEditorSelectionChange(event)
      },

      addText(val, isPop) {
        let selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          // 为空初始化光标
          if (!this.this.range) {
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

          this.$emit('update:modelValue', this.editorRef?.innerHTML || '')
          const event = this.editorRef
          this.$emit('input', event)
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

      clear() {
        if (this.editorRef) {
          this.editorRef.innerHTML = ''
          this.$emit('update:modelValue', this.editorRef.innerHTML)
          this.active.value = false;
        }
      },

      focus() {
        this.$nextTick(() => {
          this.editorRef?.focus()
        })
      },
      //@用户插入操作
      insertUser(user) {
        if (user) {
          let img = this.createSvgUrl(user)
          this.addText(`${img}\u2008`, true)
        }
      },
      //搜索事件
      mentionSearch(searchStr) {
        this.$emit('mentionSearch', searchStr)
      },
      // 修改提及列表的方法
      changeMetionList(users) {
        this.$emit('changeMetionList', users);
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
      // 移除图片
      removeImg(val) {
        this.imgList?.splice(val, 1);
        this.$emit('changeImgListFn', cloneDeep(this.imgList))
      },
      //光标位置监听
      onEditorSelectionChange(event) {
        //实时保存光标位置
        if (this.editorRef) {
          this.range = this.editorRef?.ownerDocument.getSelection()?.getRangeAt(0)
        }
      },
      //创建@标签
      createSvgUrl(user) {
        // 获取用户名和用户ID
        const userName = user[this.mentionConfig.userNameKey]
        const userId = user[this.mentionConfig.userIdKey]
        const mentionColor = this.mentionConfig.mentionColor || '#409eff'

        // 创建一个不可见的SVG元素用于测量文本宽度
        const svgForMeasure = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                              <style>
                                .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
                              </style>
                              <text x="0" y="15" class="mention-text">@${userName}</text>
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
                        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${mentionColor}; }
                      </style>
                      <text x="0" y="15" class="mention-text">@${userName}</text>
                    </svg>`

        // 编码SVG以便作为URL使用
        const encodedSvg = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')

        const url = `data:image/svg+xml,${encodedSvg}`

        // 返回img标签
        return `<img src="${url}"
                    alt="@${userName}"
                    style="width:${textWidth}px;height:20px;user-select: none; vertical-align: sub;"
                    data-userName="${userName}"
                    data-id="${userId}"
                    draggable="false">`
      }
    },
    mounted() {
      if (this.editorRef) {
        this.editorRef.addEventListener('mousemove', this.onEditorSelectionChange)
      }
    },
    beforeDestroy() {
      if (this.editorRef) {
        this.editorRef.removeEventListener('mousemove', this.onEditorSelectionChange)
      }
    }
  }

  // defineExpose({
  //   addText,
  //   clear,
  //   focus,
  //   imageRef,
  //   insertUser,
  //   changeMentionShow
  // })
</script>

<style lang="less" scoped>
  @import "../style/editor.less";
</style>
