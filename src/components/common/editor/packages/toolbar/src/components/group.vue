<template>
  <div class="editor-toolbar-group">
    <a-popover
      :get-popup-container="getPopupContainer"
      overlay-class-name="editor-toolbar-popover"
      :arrow-point-at-center="true"
      :placement="isMobile ? 'topRight' : undefined"
      v-if="!!icon || !!content"
    >
      <template #content>
        <div
          :class="[
            'editor-toolbar',
            { 'editor-toolbar-mobile': isMobile && !popup, 'editor-toolbar-popup': popup },
          ]"
          data-element="ui"
        >
          <template v-for="(item, index) in items">
            <am-button
              v-if="item.type === 'button'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <am-dropdown
              v-if="item.type === 'dropdown'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <am-color
              v-if="item.type === 'color'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <am-collapse
              v-if="item.type === 'collapse'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
          </template>
        </div>
      </template>
      <am-button name="group-popover" :icon="icon" :content="content" />
    </a-popover>
    <template v-if="!icon && !content">
      <template v-for="(item, index) in items">
        <am-button v-if="item.type === 'button'" :key="index" v-bind="item" :engine="engine" />
        <am-dropdown v-if="item.type === 'dropdown'" :key="index" v-bind="item" :engine="engine" />
        <am-color v-if="item.type === 'color'" :key="index" v-bind="item" :engine="engine" />
        <am-collapse v-if="item.type === 'collapse'" :key="index" v-bind="item" :engine="engine" />
      </template>
    </template>
  </div>
</template>

<script>
  import { isMobile } from "@aomao/engine";
  import { Popover } from "ant-design-vue";
  import AmButton from "./button.vue";
  import AmDropdown from "./dropdown.vue";
  import AmColor from "./color/color.vue";
  import AmCollapse from "./collapse/collapse.vue";

  export default {
    components: {
      AmButton,
      AmCollapse,
      AmDropdown,
      AmColor,
      "a-popover": Popover
    },
    props: {
      engine: Object,
      items: {
        type: Array,
        default: () => []
      },
      icon: String,
      content: [String, Function],
      popup: Boolean
    },
    data() {
      return {
        isMobile: false
      };
    },
    mounted() {
      this.isMobile = isMobile;
    },
    methods: {
      getPopupContainer() {
        return (
          document.querySelector(".data-toolbar-popup-wrapper") ||
          document.querySelector(".editor-toolbar") ||
          document.body
        );
      }
    }
  };
</script>

<style>
.editor-toolbar-group {
    padding: 4px;
    width: auto;
    border-left: 1px solid #e8e8e8;
    display: flex;
    align-items: stretch;
}

.editor-toolbar .editor-toolbar-group:nth-child(1) {
    border-left: none;
}
</style>
