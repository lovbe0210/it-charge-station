<template>
  <div class="comment-list">
    <div v-for="comment in data" :key="comment.id">
      <ContentBox :data="comment"
                  :parent-id="comment.id"
                  :contentBoxParam="contentBoxParam"/>
      <!-- 回复列表 -->
      <ReplyBox v-if="comment.reply?.total > 0"
                :parentId="safeStr(comment.id)"
                :data="comment.reply"
                :contentBoxParam="contentBoxParam"/>
    </div>

  </div>
</template>

<script>
  import {str} from '@/utils/emoji'
  import ContentBox from './ContentBox.vue'
  import ReplyBox from './ReplyBox.vue'

  export default {
    name: 'CommentList',
    data() {
      return {
      }
    },
    props: {
      data: {
        type: Array
      },
      contentBoxParam: {
        // submit、delete
        type: Object
      }
    },
    computed: {

    },
    components: {
      ContentBox,
      ReplyBox
    },
    methods: {
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
      },
      safeStr(id) {
        return str(id)
      }
    }
  }

</script>

<style lang="less" scoped>
  .comment-list > .comment > .comment-primary > .comment-main {
    margin-right: 12px;
  }
</style>
