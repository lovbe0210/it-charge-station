<template>
  <div
    :class="['toolbar-dropdown toolbar-collapse', {'toolbar-dropdown-right': isRight},className]"
    ref="collapse"
  >
    <am-button
      v-if="!isCustomize"
      name="collapse"
      :icon="icon"
      :content="content"
      :on-click="triggerClick"
      :active="visible"
      :disabled="disabled"
    />
    <div v-if="visible" class="toolbar-dropdown-list" data-element="ui">
      <slot name="header">
        <div v-if="header" class="toolbar-collapse-header" v-html="header"/>
      </slot>
      <div class="toolbar-collapse-content">
        <am-collapse-group
          v-for="(group,index) in groups"
          :key="index"
          :engine="engine"
          v-bind="group"
          :on-select="triggerSelect"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import {isMobile} from "@aomao/engine";
  import AmButton from '../button.vue';
  import AmCollapseGroup from './group.vue';

  export default {
    name: "AmCollapse",
    data() {
      return {
        isCustomize: false,
        visible: false,
        isRight: false
      }
    },
    components: {
      AmButton,
      AmCollapseGroup
    },
    props: {
      engine: {
        type: Object
      },
      header: {
        type: String
      },
      groups: {
        type: Array
      },
      disabled: {
        type: [Boolean, Object],
        default: undefined
      },
      className: {
        type: String
      },
      icon: {
        type: String,
        default: undefined
      },
      content: {
        type: [String, Function],
        default: undefined
      },
      onSelect: {
        type: Function
      }
    },
    methods: {
      triggerClick() {
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },

      triggerSelect(event, name) {
        this.hide()
        if (this.onSelect) {
          this.onSelect(event, name)
        }
      },
      show() {
        this.visible = true;
        setTimeout(() => {
          document.addEventListener('click', this.hide);
        }, 10);
      },

      hide(event) {
        if (event) {
          // let node = event.target;
          // while (node) {
          //     if (node === collapse.value) {
          //         return;
          //     }
          //     node = (node as Element).parentNode;
          // }
        }
        document.removeEventListener('click', this.hide);
        this.visible = false
      }
    },

    mounted() {
      this.isCustomize = !(this.icon || this.content);
      this.visible = this.isCustomize
      if (this.$refs.collapse && isMobile) {
        const rect = this.$refs.collapse.getBoundingClientRect();
        this.isRight = rect.left > window.visualViewport.width / 2;
      }
    },

    unmounted() {
      if (this.isCustomize) document.removeEventListener('click', this.hide);
    }
  }
</script>
<style scoped lang="less">
  .toolbar-collapse-header {
    color: #8c8c8c;
    margin: 4px 0 8px;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    padding: 0 12px 12px;
    border-bottom: 1px solid #e8e8e8;
  }

  .toolbar-collapse-header code {
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 2px;
    border: 1px solid #d9d9d9;
  }

  .toolbar-collapse-content {
    min-width: 200px
  }

  .toolbar-collapse-group-title {
    padding: 2px 16px;
    text-align: left;
    color: #8c8c8c;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
  }

  .toolbar-collapse-item-active {
    background-color: #f4f4f4;
  }

  .editor-toolbar .toolbar-collapse-item-disabled, .data-toolbar-component-list .toolbar-collapse-item-disabled, .editor-toolbar:not(.editor-toolbar-mobile) .toolbar-collapse-item-disabled:hover, .data-toolbar-component-list .toolbar-collapse-item-disabled:hover {
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
    color: #000000;
    opacity: 0.25;
    cursor: not-allowed;
  }

  .toolbar-collapse-item .toolbar-collapse-item-text {
    display: block;
    text-align: left;
    margin-left: 20px;
  }

  .toolbar-collapse-item .toolbar-collapse-item-title {
    display: block;
    color: #595959;
    line-height: 24px;
    font-size: 14px;
    font-weight: normal;
  }

  .toolbar-collapse-item .toolbar-collapse-item-description {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, .45);
  }

</style>
