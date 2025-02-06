<template>
  <a-tooltip
    :placement="placement || 'bottom'"
    :visible="(!!title || !!hotkeyText) && !isMobile ? visible : false"
  >
    <template #title>
      <div v-if="!!title" class="toolbar-tooltip-title">{{ title }}</div>
      <div
        v-if="!!hotkeyText"
        class="toolbar-tooltip-hotkey"
        v-html="hotkeyText"
      ></div>
    </template>
    <button
      ref="element"
      :class="[
        'toolbar-button',
        className,
        {
          'toolbar-button-active': active,
          'toolbar-button-disabled': disabled,
        },
      ]"
      @click="triggerClick"
      @mousedown="triggerMouseDown"
      @mouseenter="triggerMouseEnter"
      @mouseleave="triggerMouseLeave"
    >
      <slot name="icon">
        <span v-if="iconIsHtml" v-html="icon"></span>
        <span
          v-if="!iconIsHtml && icon"
          :class="`data-icon data-icon-${icon}`"
        />
      </slot>
      <slot>{{ typeof content === "function" ? content() : content }}</slot>
    </button>
  </a-tooltip>
</template>

<script>
  import { formatHotkey, isMobile } from "@aomao/engine";
  import { autoGetHotkey } from "../utils";

  export default {
    props: {
      engine: Object,
      name: {
        type: String,
        required: true
      },
      icon: String,
      content: [String, Function],
      title: String,
      placement: String,
      hotkey: [Boolean, String],
      command: Object,
      autoExecute: {
        type: [Boolean, Object],
        default: undefined
      },
      className: {
        type: String
      },
      active: {
        type: [Boolean, Object],
        default: undefined
      },
      disabled: {
        type: [Boolean, Object],
        default: undefined
      },
      onClick: Function,
      onMouseDown: Function,
      onMouseEnter: Function,
      onMouseLevel: Function
    },
    data() {
      return {
        visible: false,
        iconIsHtml: false,
        isMobile: false,
        hotkeyText: ""
      };
    },
    mounted() {
      this.iconIsHtml = /^<.*>/.test(this.icon ? this.icon.trim() : "");
      let hotkeyText;
      //默认获取插件的热键
      if (this.engine && (this.hotkey === true || this.hotkey === undefined)) {
        hotkeyText = autoGetHotkey(
          this.engine,
          this.command && !Array.isArray(this.command)
            ? this.command.name
            : this.name
        );
      }
      if (typeof this.hotkey === "string" && this.hotkey !== "") {
        hotkeyText = formatHotkey(this.hotkey);
      }
      this.isMobile = isMobile;
      this.hotkeyText = hotkeyText || "";
    },
    methods: {
      triggerMouseDown(event) {
        event.preventDefault();
        if (this.disabled) return;
        if (this.onMouseDown) this.onMouseDown(event, this.engine);
        this.visible = false;
      },
      triggerMouseEnter(event) {
        if (this.onMouseEnter) this.onMouseEnter(event, this.engine);
        this.visible = true;
      },
      triggerMouseLeave(event) {
        if (this.onMouseLevel) this.onMouseLevel(event, this.engine);
        this.visible = false;
      },
      triggerClick(event) {
        const nodeName = (event.target).nodeName;
        if (nodeName !== "INPUT" && nodeName !== "TEXTAREA") event.preventDefault();
        if (this.disabled) return;
        if (this.onClick && this.onClick(event, this.engine) === false) return;
        if (this.autoExecute !== false) {
          let commandName = this.name;
          let commandArgs = [];
          if (this.command) {
            if (!Array.isArray(this.command)) {
              commandName = this.command.name;
              commandArgs = this.command.args;
            } else {
              commandArgs = this.command;
            }
          }
          if (this.engine) this.engine.command.execute(commandName, ...commandArgs);
        }
      }
    }
  };
</script>
<style>
.editor-toolbar .toolbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 32px;
  margin: 0;
  text-align: center;
  padding: 0 7px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 3px 3px;
  font-size: 16px;
  cursor: pointer;
  color: #595959;
  outline: none;
}
.editor-toolbar.editor-toolbar-popup .toolbar-button {
  min-width: 24px;
  line-height: 24px;
  border-radius: 4px;
}
.editor-toolbar:not(.editor-toolbar-mobile) .toolbar-button {
  padding: 0 4px;
}

.editor-toolbar:not(.editor-toolbar-mobile) .toolbar-button:hover {
  border: 1px solid transparent;
  background-color: #f5f5f5;
}

.editor-toolbar:not(.editor-toolbar-mobile) .toolbar-button:active,
.editor-toolbar .toolbar-button-active,
.editor-toolbar:not(.editor-toolbar-mobile) .toolbar-button-active:hover {
  background-color: #e8e8e8;
  border: 1px solid transparent;
}

.editor-toolbar .toolbar-button-disabled,
.editor-toolbar:not(.editor-toolbar-mobile) .toolbar-button-disabled:hover {
  background-color: transparent;
  border: 1px solid transparent;
  box-shadow: none;
  color: #000000;
  opacity: 0.25;
  cursor: not-allowed;
}

.toolbar-tooltip-title {
  font-size: 12px;
  line-height: 20px;
}
</style>
