<template>
  <div class="u-fold">
    <!-- over-hidden -->
    <div ref="textBox" class="txt-box" :class="{ 'over-hidden': fold }">
      <div ref="divBox">
        <slot></slot>
      </div>
    </div>
    <div class="action-box select-none">
      <div v-if="isOver && unfold" class="expand-btn" @click="fold = !fold">{{ fold ? $u('fold.unfold') : $u('fold.fold') }}</div>
    </div>
  </div>
</template>

<script>
  import {dayjs} from "dayjs";

  export default {
    name: 'UFold',
    data() {
      return {
        // 文本是否是展开状态 默认为收起
        fold: true,
        //文本是否超出五行，默认否
        isOver: false,
        observer: null
      }
    },
    props: {
      line: {
        type: Number,
        default: 5
      },
      unfold: {
        type: Boolean
      }
    },
    computed: {
      nowDateTime(dateTime) {
        return dayjs(dateTime).fromNow();
      },
      c_line() {
        let _line = Math.trunc(Number(this.line))
        return _line > 0 ? _line : 1
      }
    },
    components: {
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
      }
    },
    mounted() {
      this.observer = new ResizeObserver(entry => {
        if (this.fold && this.$refs.divBox && this.$refs.textBox) {
          //offsetHeight：包括内容可见部分的高度，border，可见的padding，水平方向的scrollbar（如果存在）；不包括margin。
          // clientHeight：包括内容可见部分的高度，可见的padding；不包括border，水平方向的scrollbar，margin。
          //scrollHeight：包括内容的高度（可见与不可见），padding（可见与不可见）；不包括border，margin。
          // isOver.value = divBox.value.offsetHeight < divBox.value.scrollHeight
          //兼容火狐
          this.isOver = this.$refs.textBox.clientHeight < this.$refs.divBox.scrollHeight
        }
      })
      this.observer.observe(this.$refs.divBox)
    },
    beforeDestroy() {
      this.observer?.disconnect()
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/fold.less';
</style>
