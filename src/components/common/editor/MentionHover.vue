<template>
  <div class="memtion-hover-item">
    <div>{{ name }}</div>
    <p>配置 mention 插件的 onMouseEnter 方法</p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    name: String,
  },
};
</script>
<style scoped>
.memtion-hover-item {
  padding: 5px;
  font-size: 14px;
}
</style>
