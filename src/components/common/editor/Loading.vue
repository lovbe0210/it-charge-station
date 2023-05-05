<template>
  <div
    :class="['loading', { active: loading }]"
    :tip="text"
    :spinning="loading"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "am-loading",
  props: {
    text: String,
    loading: Boolean,
  },
};
</script>
<style>
.loading.active {
  padding: 20px;
  display: block;
}
</style>
