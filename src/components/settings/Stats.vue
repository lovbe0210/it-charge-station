<template>
  <div>Stats</div>
</template>

<script>
  export default {
    name: 'Stats',
    data() {
      return {
        leftHoverClass: false,
        rightHoverClass: false
      }
    },
    methods: {
      isHover(position, flag) {
        if (position === 'left') {
          this.leftHoverClass = flag;
        } else {
          this.rightHoverClass = flag;
        }
      },
      previous() {
        console.log('previous page')
      },
      next() {
        console.log('next page')
      }
    }
  }
</script>

<style scoped lang="less">
</style>
