<template>
    <span class="colorpicker-group">
        <am-color-picker-item v-for="color in colors"
                              :engine="engine"
                              :color="color.value"
                              :active="color.active"
                              :key="color.value"
                              :on-select="onSelect"
                              :set-stroke="setStroke"
        />
    </span>
</template>

<script>
  import AmColorPickerItem from './item.vue';

  export default {
    name: "AmColorGroup",
    components: {
      AmColorPickerItem
    },
    props: {
      engine: {
        type: Object,
        required: true
      },
      colors: {
        type: Array,
        default: () => []
      },
      setStroke: {
        type: [Boolean, Object],
        default: undefined
      },
      onSelect: {
        type: Function,
        default: undefined
      }
    }
  };
</script>
