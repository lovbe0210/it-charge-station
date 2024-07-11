<template>
  <div class="top-setting">
    <div class="back-top" v-show="backTopShow" @click="backTop">
      <span class="iconfont to-top"/>
    </div>
    <div class="settings" v-show="immediate || backTopShow" v-b-tooltip.hover.leftbottom.v-secondary :title="title"
         @click="$store.commit('showCustomer', true)">
      <span class="iconfont icon-colorful-setting"/>
    </div>
    <!-- surprise -->
    <Drawer placement="right" v-model="showCustomer" :closable="false"
            width="18" :lock-scroll="false" class-name="customer un-select">
      <div class="theme">
        <customer-set></customer-set>
      </div>
      <div class="music">
        <music-index></music-index>
      </div>
      <div class="other">
        <vue-baberrage :isShow="false"
                       :barrageList="barrageList"
                       :lanes-count="4"
                       :message-height="10"
                       :loop="true">
        </vue-baberrage>
      </div>
    </Drawer>
  </div>
</template>
<script>
  import CustomerSet from "@/components/common/CustomerSet";
  import MusicIndex from "@/components/common/music/MusicIndex";

  export default {
    name: 'backTop',
    data() {
      return {
        scrollTop: '',
        backTopShow: false,
        title: '点我看看 (๑•̀ㅂ•́)و✧',
        barrageList: []
      }
    },
    props: {
      // 自定义滚动的高度
      customHeight: {
        type: Number,
        default: 550 // 单位默认px
      },
      // 即刻显示
      immediate: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      showCustomer: {
        get() {
          return this.$store.state.showCustomer;
        },
        set(value) {
          this.$store.commit('showCustomer', value);
        }
      }
    },
    components: {
      CustomerSet,
      MusicIndex
    },
    watch: {
      scrollTop() {
        if (this.scrollTop > this.customHeight) {
          this.backTopShow = true
        } else {
          this.backTopShow = false
        }
      },
      showCustomer() {
        if (this.showCustomer) {
          // 禁止滚轮滚动
          document.body.addEventListener('wheel', this.tempFunction, {passive: false});
        } else {
          // 解除阻止
          document.body.removeEventListener('wheel', this.tempFunction)
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
      /**
       * 阻止事件发生
       * @param e
       */
      tempFunction(e) {
        e.preventDefault()
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
      background: var(--theme-color);
      cursor: pointer;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);

      span {
        border-radius: 50%;
        margin-left: 7.5px;
        font-size: 32px;
      }
    }

    .back-top:hover {
      //background: @background-color-base;
    }

    .settings {
      width: 48px;
      height: 48px;

      span {
        border-radius: 50%;
        font-size: 44px;
      }
    }
  }

  // 底部自定义主题栏
  /deep/ .customer {
    color: @light-font-color;

    .ivu-drawer {
      height: 45%;
      top: 55%;

      .ivu-drawer-content {
        background-color: transparent !important;

        .ivu-drawer-body {
          // 隐藏滚动条，否则音乐模块下滑就会出现滚动条
          overflow: hidden;
          border-radius: 5px;
          width: 99.5%;
          padding: 0;

          > div {
            width: 100%;
            border-radius: 6px;
            color: var(--font-color);
            background-color: var(--dropdown-bg-color);
            border-left: 1px solid rgba(255,255,255, 0.2);
            border-right: 1px solid rgba(255,255,255, 0.2);
          }

          .theme {
            height: 100/2%;
            border-top: 1px solid rgba(255,255,255, 0.2);
          }

          .music {
            height: 100/2%;
            border-bottom: 1px solid rgba(255,255,255, 0.2);
          }

          .other {
            height: 0;
            background-image: url("../../assets/other_bacc.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;

            .baberrage-stage {
              width: 100% !important;
            }
          }
        }
      }
    }
  }

</style>
