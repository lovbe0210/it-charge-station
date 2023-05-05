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
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Popover } from "ant-design-vue";
import { VNode } from "vue";
import { EngineInterface, Placement } from "@aomao/engine";
import { Command } from "../../types";

@Component({
  components: {
    "a-popover": Popover,
  },
})
export default class CollapseItem extends Vue {
  @Prop({ type: Object }) engine?: EngineInterface;
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ type: String, default: undefined }) icon?: string;
  @Prop({ type: String }) search?: string;
  @Prop({ type: [String, Function] }) description?:
    | string
    | (() => string)
    | VNode;
  @Prop({ type: String }) title?: string;
  @Prop({ type: String }) placement?: Placement;
  @Prop({ type: Object }) command?: Command;
  @Prop({ type: [Boolean, Object], default: undefined }) autoExecute?: boolean;
  @Prop({ type: String }) className?: string;
  @Prop({ type: [Boolean, Object], default: undefined }) disabled?: boolean;
  @Prop({ type: [String, Function, Object] }) prompt?:
    | string
    | ((props: any) => string) | ((props: any) => VNode)
    | VNode;
  @Prop(Function) onClick?: (event: MouseEvent, name: string, engine?: EngineInterface) => void | boolean;
  @Prop(Function) onMouseDown?: (event: MouseEvent) => void | boolean;

  iconIsHtml = false;
  active = false;

  mounted() {
    this.iconIsHtml = /^<.*>/.test(this.icon ? this.icon.trim() : "");
  }

  handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (this.onMouseDown) this.onMouseDown(event);
  }

  handleClick(event: MouseEvent) {
    if (this.disabled) return;

    const nodeName = (event.target as Node).nodeName;
    if (nodeName !== "INPUT" && nodeName !== "TEXTAREA") event.preventDefault();

    if (this.onClick && this.onClick(event, this.name, this.engine) === false) {
      return;
    }
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

  triggerMouseEnter() {
    this.active = this.disabled ? false : true;
  }

  triggerMouseLeave() {
    this.active = false;
  }
}
</script>
<style>
.prompt-popover-hide {
  display: none;
}
</style>
