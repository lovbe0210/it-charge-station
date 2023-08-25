<template>
  <div class="dragVerify">
    <div class="spout" ref="spout">
      <div :class="['slidingBlock', releaseMouse ? 'transition': '', place < distance ? 'unfinished' : 'complete']"
           ref="slidingBlock" :style="{ left: `${place}%` }" @mousedown="mousedown($event)">
        <span :class="['iconfont', verifyStatus ? 'icon-exp-complete' : 'double-right']"></span>
      </div>
      <div class="tip-text">
        <span v-show="!verifyStatus">请按住滑块，拖动到最右边</span>
      </div>
      <span class="hight-light">11111111111111111111</span>
      <div class="succeedBox" :class="[verifyStatus ? 'succeedText' : '', releaseMouse ? 'transition': '']"
           :style="{ width: `${place}%` }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SliderValidation",
    data() {
      return {
        place: 0,
        sliding: {
          isDown: true,
          X: 0 // 初始X值
        },
        moveX: 0, // 移动X值
        spoutW: 0,
        slidingBlockW: 0,
        distance: 1, // 要移动的距离
        // 验证状态
        verifyStatus: false,
        // 松开鼠标
        releaseMouse: false
      }
    },
    methods: {
      // 鼠标事件
      mousedown(e) {
        if (this.place < this.distance) {
          this.sliding.isDown = true
          // 计算百分比
          this.spoutW = this.$refs.spout.offsetWidth
          this.slidingBlockW = this.$refs.slidingBlock.offsetWidth
          this.distance = 100 - (this.slidingBlockW / this.spoutW) * 100
        }
        this.sliding.X = e.x
        // 添加鼠标的移动事件
        document.addEventListener('mousemove', e => {
          if (this.sliding.isDown) {
            this.releaseMouse = false;
            this.moveX = e.x
            if (this.place >= this.distance) {
              this.place = this.distance
            } else if (this.place >= 0 && this.place < this.distance) {
              this.place = ((this.moveX - this.sliding.X) / this.spoutW) * 100
            }
            if (this.place <= 0) {
              this.place = 0
              document.removeEventListener('mousemove', null, false)
              return
            }
          }
          e.preventDefault()
        })
        // 松开鼠标
        document.onmouseup = e => {
          this.releaseMouse = true;
          if (this.place === this.distance) {
            this.verifyStatus = true;
            this.$emit('validate');
          } else {
            this.sliding.isDown = false;
            this.place = 0
          }
        }
      }
    }
  }
</script>

<style scoped>
  .dragVerify {
    border: 1px solid #e1e1e1;
    height: 40px;
    background: #E7E9E8;
    border-radius: 4px;
    width: 100%;
    -webkit-user-select: none; /* 禁止 DIV 中的文本被鼠标选中 */
    -moz-user-select: none; /* 禁止 DIV 中的文本被鼠标选中 */
    -ms-user-select: none; /* 禁止 DIV 中的文本被鼠标选中 */
    user-select: none;
  }

  .spout {
    line-height: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    z-index: 6;
  }

  .tip-text {
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    color: transparent;
    font-size: 14px;
    text-align: center;
    position: absolute;
    z-index: 8;
  }

  .hight-light {
    background: -webkit-gradient(linear,left top,right top,color-stop(0,#E7E9E8),color-stop(.4,#E7E9E8),color-stop(.5,#fff),color-stop(.6,#E7E9E8),color-stop(1,#E7E9E8));
    /*-webkit-background-clip: text;*/
    -webkit-text-fill-color: transparent;
    -webkit-animation: highlight-animation 10s infinite;
    -webkit-text-size-adjust: none;
    top: 10px;
    right: 0;
    width: 40px;
    height: 20px;
    border-radius: 5px;
    position: absolute;
    display: inline-block;
    color: transparent;
    z-index: 9;
    /*top: 13px;
    right: 0;
    bottom: 12px;
    width: 5px;
    height: 14px;
    border-radius: 5px;
    position: absolute;
    z-index: 7;
    !* 发光 *!
    !*background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 46%, rgba(255, 255, 255, 0.4) 100%);*!
    background: -webkit-gradient(linear,left top,right top,color-stop(0,rgba(255, 255, 255, 0.4)),color-stop(.4,rgba(255, 255, 255, 0.6)),color-stop(.5,rgba(255, 255, 255, 0.8)),color-stop(.6,rgba(255, 255, 255, 0.6)),color-stop(1,rgba(255, 255, 255, 0.4)));
    animation: highlight-animation 10s linear infinite;*/
  }

  @keyframes highlight-animation {
    0% {
      left: 21%;
    }
    100% {
      left: 68%;
    }
  }

  .succeedText::before {
    content: '验证通过';
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    color: #00B96B;
    background: #FFFFFF;
    font-size: 14px;
    text-align: center;
    position: absolute;
  }

  .succeedBox {
    color: #585A5A;
    background: #FFFFFF;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
  }

  .slidingBlock {
    width: 40px;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #e1e1e1;
    border-top: none;
    border-bottom: none;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    cursor: move;
    z-index: 10;
  }

  .transition {
    transition: 0.4s;
  }

  .double-right {
    color: #737383;
  }

  .slidingBlock::after {
    content: '';
  }

  .unfinished::after {
    background: #9e9d9d;
  }

  .complete::after {
    background: #FFFFFF;
  }
</style>
