<template>
  <div class="u-comment-scroll">
    <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="2">
      <slot></slot>
      <div class="scroll-btn">
        <el-link v-if="!active" type="primary" :underline="false" @click="active = !active">加载更多</el-link>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { debounce } from '@/utils/emoji'

  export default {
    name: 'UCommentScroll',
    data() {
      return {
        // 是否开启加载
        loading: false,
        // 是否使用
        active: false

      }
    },
    props: {
      // 声明一个名为 loading 的 prop，并指定其类型为 Boolean
      disable: {
        type: Boolean,
        // 设置默认值为 false
        default: false
      }
    },
    computed: {
      noMore() {
        return this.active && this.disable;
      },
      disabled() {
        return !this.active.value || this.loading.value || this.noMore
      }
    },
    methods: {
      _debounce () {
        debounce(() => {
          this.$emit('more');
          this.loading.value = false;
        }, 500)
      },

      load () {
        this.loading.value = true;
        this._debounce();
      }
    }
  }

</script>

<style lang="less" scoped>
.u-comment-scroll {
  position: relative;
  font-size: 10px;
  .scroll-btn {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 10px;
  }
}
</style>
