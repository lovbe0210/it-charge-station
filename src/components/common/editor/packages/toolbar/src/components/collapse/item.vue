<template>
  <a-popover
    :placement="placement || 'right'"
    :content="typeof prompt === 'function' ? prompt($props) : prompt"
    :overlayClassName="prompt ? '' : 'prompt-popover-hide'"
  >
    <div
      :class="[
        'toolbar-collapse-item',
        { 'toolbar-collapse-item-active': active },
        { 'toolbar-collapse-item-disabled': disabled },
        className,
      ]"
      @mouseenter="triggerMouseEnter"
      @mouseleave="triggerMouseLeave"
      @click="handleClick"
      @mousedown="handleMouseDown"
    >
      <slot name="icon">
        <span v-if="iconIsHtml" v-html="icon"></span>
        <span
          v-if="!iconIsHtml && icon"
          :class="`data-icon data-icon-${icon}`"
        />
      </slot>
      <div v-if="title" class="toolbar-collapse-item-text">
        <div class="toolbar-collapse-item-title">
          {{ title }}
        </div>
        <div v-if="description" class="toolbar-collapse-item-description">
          {{ description }}
        </div>
      </div>
    </div>
  </a-popover>
</template>

<script>
  import { Popover } from "ant-design-vue";

  export default {
    name: "CollapseItem",
    components: {
      "a-popover": Popover
    },
    props: {
      engine: Object,
      name: {
        type: String,
        required: true
      },
      icon: String,
      search: String,
      description: [String, Function],
      title: String,
      placement: String,
      command: Object,
      autoExecute: {
        type: [Boolean, Object],
        default: undefined
      },
      className: String,
      disabled: {
        type: [Boolean, Object],
        default: undefined
      },
      prompt: [String, Function],
      onClick: Function,
      onMouseDown: Function
    },
    data() {
      return {
        iconIsHtml: false,
        active: false
      };
    },
    mounted() {
      this.iconIsHtml = /^<.*>$/.test(this.icon || "");
    },
    methods: {
      handleMouseDown(event) {
        event.preventDefault();
        if (typeof this.onMouseDown === 'function') {
          this.onMouseDown(event);
        }
      },
      handleClick(event) {
        if (this.disabled) return;

        const nodeName = event.target.nodeName;
        if (nodeName !== "INPUT" && nodeName !== "TEXTAREA") event.preventDefault();

        if (typeof this.onClick === 'function' && this.onClick(event, this.name, this.engine) === false) {
          return;
        }
        if (this.autoExecute !== false) {
          let commandName = this.name;
          let commandArgs = [];
          if (this.command) {
            if (!Array.isArray(this.command)) {
              commandName = this.command.name;
              commandArgs = this.command.args || [];
            } else {
              commandArgs = this.command;
            }
          }
          if (this.engine && typeof this.engine.command.execute === 'function') {
            this.engine.command.execute(commandName, ...commandArgs);
          }
        }
      },
      triggerMouseEnter() {
        this.active = !this.disabled;
      },
      triggerMouseLeave() {
        this.active = false;
      }
    }
  };
</script>
<style>
.prompt-popover-hide {
  display: none;
}
</style>
