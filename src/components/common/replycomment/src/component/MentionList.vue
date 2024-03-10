<template>
  <ul
    ref="mentionList"
    class="mention-list"
    tabindex="0"
    @keydown.up.prevent="moveSelection(-1)"
    @keydown.down.prevent="moveSelection(1)"
    @keydown.enter.prevent="printSelectedItem"
  >
    <div ref="scrollbarRef" style="padding: 10px" class="mention-list-scroll">
      <li v-for="(item, index) in list" :key="index" @click="clickSelectedItem(index)">
        <slot name="user" :item="item" :index="index">
          <div class="userInfo">
            <img :src="item.userAvatar" width="30" class="avatar"/>
            <span class="username">{{ item.userName }}</span>
          </div>
        </slot>
      </li>
      <div v-show="!list?.length" class="empty">
        <a-empty description="暂无匹配数据"/>
      </div>
    </div>
  </ul>
</template>

<script>
  export default {
    name: 'MentionList',
    data() {
      return {
        scrollbarRef: null,
        mentionList: null,
        selectedIndex: -1
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {},
    watch: {
      "isShow"(val) {
        if (val) {
          this.selectedIndex = 0
          // console.log('获取焦点', scrollbarRef.value)
          // 显示的时候，让滚动条滚到第一个
          this.$nextTick(() => {
            if (this.scrollbarRef) {
              this.scrollbarRef.setScrollTop(0)
            }
          })
        }
      }
    },
    methods: {
      moveSelection(step) {
        this.selectedIndex += step
        if (this.selectedIndex < 0) {
          this.selectedIndex = this.list.length - 1 // 如果超出上边界，跳到最后一个
        } else if (this.selectedIndex >= this.list.length) {
          this.selectedIndex = 0 // 如果超出下边界，跳到第一个
        }
        // 如果选中的图标不在当前的视口范围内 那么就滚动到选中的item的位置

        if (this.scrollbarRef) {
          const item = this.scrollbarRef.wrapRef.children[0].children[this.selectedIndex]
          if (item) {
            const h = this.scrollbarRef.wrapRef.offsetHeight || 0
            this.scrollbarRef?.setScrollTop((this.selectedIndex - h / item.offsetHeight + 1) * item.offsetHeight)
          }
        }
      },
      printSelectedItem() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.list.length) {
          return this.list[this.selectedIndex]
        }
      },
      clickSelectedItem(index) {
        this.selectedIndex = index
        this.$emit('insert', this.list[this.selectedIndex])
        this.$emit('changeShow', false)
      }
    },
    mounted() {
      this.mentionList?.focus()
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="less">
  .mention-list {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 150px;
    max-height: 200px;
    background-color: #fff;
    list-style: none;
    font-size: 14px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 99;
    overflow-y: auto;
    overflow-anchor: none;

    .empty {
      height: 150px;
      padding: 0;
    }


    &:focus {
      outline: none;
    }

    li {
      background-color: #ffffff;
      border-radius: 3px;
      line-height: 30px;

      &.hover {
        background-color: #f3f4f5;
      }

      &.active {
        background-color: #e6f7ff;
      }

      .userInfo {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #606266;

        .avatar {
          margin-right: 10px;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          object-fit: cover;
        }

        span {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }
  }

  .mention-list::-webkit-scrollbar-thumb {
    background-color: unset; /* 自定义滚动条滑块颜色 */
  }

  .mention-list::-webkit-scrollbar {
    width: 5px;
  }

  .mention-list:hover::-webkit-scrollbar {
    width: 5px;
  }

  .mention-list:hover::-webkit-scrollbar-thumb {
    background-color: #E7E9E8; /* 自定义滚动条滑块颜色 */
  }

</style>
