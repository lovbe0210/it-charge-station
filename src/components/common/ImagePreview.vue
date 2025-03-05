<!--
<template>
  &lt;!&ndash; 图片预览容器，仅在预览打开时显示 &ndash;&gt;
  <div class="image-preview" v-if="isPreviewOpen" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    &lt;!&ndash; 图片元素，点击切换全屏预览状态，并根据是否放大调整样式 &ndash;&gt;
    <img
      :src="src"
      :alt="alt"
      @click="toggleFullScreen"
      :style="{ transform: `scale(${zoomLevel})`, cursor: isZoomed ? 'move' : 'zoom-in' }"
    >
  </div>
</template>

<script>
  export default {
    name: "ImagePreview",
    data() {
      return {
        isZoomed: false, // 图片是否放大
        zoomLevel: 1, // 图片放大倍数
        initialPosition: { x: 0, y: 0 } // 图片初始位置
      };
    },
    props: {
      // 是否打开预览
      isPreviewOpen: Boolean,
      src: String,
      alt: String
    },
    methods: {
      // 切换全屏预览状态
      toggleFullScreen() {
        if (this.isPreviewOpen) {
          // 打开预览时禁用页面滚动，并监听按键事件
          document.body.style.overflow = 'hidden';
          window.addEventListener('keydown', this.handleKeyDown);
        } else {
          // 关闭预览时恢复页面滚动，并移除按键事件监听
          document.body.style.overflow = '';
          window.removeEventListener('keydown', this.handleKeyDown);
          this.resetZoom();
        }
      },
      // 重置图片放大状态
      resetZoom() {
        this.isZoomed = false;
        this.zoomLevel = 1;
      },
      // 处理鼠标移动事件，用于拖动图片
      handleMouseMove(event) {
        if (this.isZoomed) {
          const newX = this.initialPosition.x - event.movementX;
          const newY = this.initialPosition.y - event.movementY;
          this.initialPosition = { x: newX, y: newY };
        }
      },
      // 处理鼠标离开事件，重置图片位置
      handleMouseLeave() {
        this.resetPosition();
      },
      // 重置图片位置
      resetPosition() {
        this.initialPosition = { x: 0, y: 0 };
      },
      // 处理按键事件，用于退出预览
      handleKeyDown(event) {
        if (event.key === 'Escape') {
          this.$emit('toggleFullScreen')
        }
      }
    }
  };
</script>

<style>
  /* 样式 */
  .image-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: zoom-out;
  }
  .image-preview img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease;
  }

</style>
-->
