<template>
  <div class="top-setting">
    <div class="back-top" v-show="backTopShow" @click="backTop">
      <span class="iconfont icon-top"/>
    </div>
    <div class="setting" v-show="backTopShow" v-b-tooltip.hover.leftbottom.v-secondary :title="title"
         @click="showCustomer()">
      <span class="iconfont icon-setting"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'backTop',
    data() {
      return {
        scrollTop: '',
        backTopShow: false,
        title: '点我看看 (๑•̀ㅂ•́)و✧'
      }
    },
    props: {
      customHeight: {
        type: Number,
        default: 550 // 单位默认px
      }
    },
    watch: {
      scrollTop(val) {
        if (this.scrollTop > this.customHeight) {
          this.backTopShow = true
        } else {
          this.backTopShow = false
        }
      }
    },
    methods: {
      handleScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (this.scrollTop > this.customHeight) {
          this.backTopShow = true
        }
      },
      backTop() {
        let timer = null;
        const varThis = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          if (varThis.scrollTop > 0) {
            varThis.scrollTop -= 50;
            document.body.scrollTop = document.documentElement.scrollTop =
              varThis.scrollTop;
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
            varThis.goTopShow = false;
          }
        });
      },
      showCustomer() {
        this.$store.commit('showCustomer', true)
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import '../css/common-var.less';

  .top-setting {
    position: fixed;
    right: 40px;
    bottom: 80px;

    .back-top {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);

      span {
        border-radius: 50%;
        margin-left: 7.5px;
        font-size: 32px;
      }
    }

    .back-top:hover {
      background: @background-color-base;
    }

    .setting {
      width: 48px;
      height: 48px;

      span {
        border-radius: 50%;
        font-size: 44px;
      }
    }
  }

</style>
