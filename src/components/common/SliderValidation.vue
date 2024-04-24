<template>
  <div class="drag-verify un-select">
    <div class="spout" ref="spout">
      <div :class="['slidingBlock', releaseMouse ? 'transition': '', place < distance ? 'unfinished' : 'complete']"
           id="sliderValidationBox"
           @mousedown="handleMouseDown"
           ref="slidingBlock" :style="{ left: `${place}%` }">
        <span id="sliderValidationIcon"
              :class="['iconfont', verifyResult ? 'icon-exp-complete' : 'double-right']">
        </span>
      </div>
      <span v-show="!verifyResult" class="tip-text">请按住滑块，拖动到最右边</span>
      <span class="hight-light"></span>
      <div class="succeedBox" :class="[verifyResult ? 'succeedText' : '', releaseMouse ? 'transition': '']"
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
          isDown: false,
          X: 0 // 初始X值
        },
        moveX: 0, // 移动X值
        spoutW: 0,
        slidingBlockW: 0,
        distance: 1, // 要移动的距离
        // 滑块验证结果
        verifyResult: false,
        // 松开鼠标
        releaseMouse: false
      }
    },
    methods: {
      handleMouseDown(event) {
        this.releaseMouse = true;
        if (this.place < this.distance) {
          this.sliding.isDown = true;
          // 计算百分比
          this.spoutW = this.$refs.spout.offsetWidth;
          this.slidingBlockW = this.$refs.slidingBlock.offsetWidth;
          this.distance = 100 - (this.slidingBlockW / this.spoutW) * 100;
        }
        this.sliding.X = event.x;
      },
      handleMouseMove(event) {
        if (this.sliding.isDown) {
          this.releaseMouse = false;
          this.moveX = event.x;
          if (this.place >= this.distance) {
            this.place = this.distance;
          } else if (this.place >= 0 && this.place < this.distance) {
            this.place = ((this.moveX - this.sliding.X) / this.spoutW) * 100
          }
          if (this.place <= 0) {
            this.place = 0
          }
        }
      },
      handleMouseUp() {
        if (this.verifyResult) {
          return;
        }
        this.releaseMouse = true;
        if (this.place === this.distance) {
          this.verifyResult = true;
          setTimeout(() => {
            this.$emit('validate');
          }, 300)
        } else {
          this.sliding.isDown = false;
          this.place = 0
        }
      }
    },
    mounted() {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    },
    beforeDestroy() {
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
    }
  }
</script>

<style scoped>
  .drag-verify {
    border: 1px solid #e1e1e1;
    height: 40px;
    background: #E7E9E8;
    border-radius: 4px;
    width: 100%;
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
    font-size: 14px;
    text-align: center;
    position: absolute;
    z-index: 9;
  }

  .hight-light {
    background: -webkit-gradient(linear,left top,right top,color-stop(0,#E7E9E8),color-stop(.4,#E7E9E8),color-stop(.5,#fff),color-stop(.6,#E7E9E8),color-stop(1,#E7E9E8));
    -webkit-text-fill-color: transparent;
    -webkit-animation: highlight-animation 8s infinite;
    -webkit-text-size-adjust: none;
    right: 0;
    width: 40%;
    height: 38px;
    border-radius: 5px;
    position: absolute;
    display: inline-block;
    color: transparent;
    z-index: 8;
  }

  @keyframes highlight-animation {
    0% {
      left: 6%;
    }
    100% {
      left: 53%;
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
