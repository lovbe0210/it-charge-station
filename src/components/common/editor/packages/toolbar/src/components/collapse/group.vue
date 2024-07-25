<template>
  <div class="toolbar-collapse-group">
    <div v-if="title" class="toolbar-collapse-group-title">{{ title }}</div>
    <am-collapse-item
      v-for="item in items"
      :key="item.name"
      :engine="engine"
      v-bind="handleOmit(item, 'onClick', 'onDisabled')"
      :on-click="onClick"
    />
  </div>
</template>

<script>
  import { omit } from "lodash";
  import AmCollapseItem from "./item.vue";

  export default {
    name: "AmCollapseGroup",
    components: {
      AmCollapseItem
    },
    props: {
      engine: Object,
      title: String,
      items: {
        type: Array,
        required: true,
        default: () => []
      },
      onSelect: Function
    },
    methods: {
      handleOmit(item, ...args) {
        return omit(item, args);
      },
      onClick(event, name, engine) {
        let result;
        const item = this.items.find((item) => item.name === name);
        if (item && item.onClick) result = item.onClick(event, name, engine);
        if (this.onSelect) this.onSelect(event, name, engine);
        return result;
      }
    }
  };
</script>
