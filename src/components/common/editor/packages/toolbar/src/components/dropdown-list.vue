<template>
  <div
    ref="elementRef"
    :class="[
      'toolbar-dropdown-list',
      `toolbar-dropdown-${direction || 'vertical'}`,
      { [`toolbar-dropdown-placement-${placement}`]: !!placement },
      { 'toolbar-dropdown-dot': hasDot !== false },
      className,
    ]"
  >
    <a-tooltip
      v-for="{
        key,
        placement,
        title,
        content,
        className,
        icon,
        hotkey,
        disabled,
      } in items"
      :key="key"
      :placement="placement || 'right'"
    >
      <template #title v-if="(!!title || hotkey !== false) && !isMobile">
        <div v-if="!!title" class="toolbar-tooltip-title">{{ title }}</div>
        <div
          v-if="!!hotkeys[key]"
          class="toolbar-tooltip-hotkey"
          v-html="hotkeys[key]"
        ></div>
      </template>
      <a
        :class="[
          'toolbar-dropdown-list-item',
          className,
          { 'toolbar-dropdown-list-item-disabled': disabled },
        ]"
        @click="triggerSelect($event, key)"
      >
        <span
          v-if="
            ((typeof values === 'string' && values === key) ||
              (Array.isArray(values) && values.indexOf(key) > -1)) &&
            direction !== 'horizontal' &&
            hasDot !== false
          "
          class="data-icon data-icon-dot"
        ></span>
        <slot name="icon">
          <span v-if="icon" :class="['data-icon', `data-icon-${icon}`]" />
        </slot>
        <div v-html="typeof content === 'function' ? content() : content"></div>
      </a>
    </a-tooltip>
  </div>
</template>

<script>
  import { isMobile, formatHotkey } from "@aomao/engine";
  import { autoGetHotkey } from "../utils";

  export default {
    name: "DropdownList",
    props: {
      engine: Object,
      name: {
        type: String,
        required: true
      },
      values: [String, Array, Number],
      items: {
        type: Array,
        default: () => []
      },
      className: String,
      direction: String,
      onSelect: Function,
      hasDot: {
        type: [Boolean, Object],
        default: undefined
      }
    },
    data() {
      return {
        hotkeys: {},
        isMobile: false,
        placement: ""
      };
    },
    mounted() {
      this.items.forEach((item) => {
        this.hotkeys[item.key] = this.getHotkey(item);
      });
      this.isMobile = isMobile;

      const current = this.$refs.elementRef;
      if (!current || !this.engine || !this.engine.scrollNode) return;
      const scrollElement = this.engine.scrollNode.get();
      if (!scrollElement) return;
      const rect = current.getBoundingClientRect();
      const scrollRect = scrollElement.getBoundingClientRect();
      if (rect.top < scrollRect.top) this.placement = "bottom";
      if (rect.bottom > scrollRect.bottom) this.placement = "top";
    },
    methods: {
      getHotkey(item) {
        const { command, key } = item;
        let { hotkey } = item;
        // 默认获取插件的热键
        if (this.engine && (hotkey === true || hotkey === undefined)) {
          hotkey = autoGetHotkey(
            this.engine,
            command && !Array.isArray(command) ? command.name : this.name,
            key
          );
        }
        if (typeof hotkey === "string" && hotkey !== "") {
          hotkey = formatHotkey(hotkey);
        }
        return hotkey;
      },
      triggerSelect(event, key) {
        event.preventDefault();
        event.stopPropagation();
        const item = this.items.find((item) => item.key === key);
        if (!item || item.disabled) return;
        const { autoExecute, command } = item;
        if (this.onSelect && this.onSelect(event, key) === false) return;
        if (autoExecute !== false) {
          let commandName = this.name;
          let commandArgs = [key];
          if (command) {
            if (!Array.isArray(command)) {
              commandName = command.name;
              commandArgs = commandArgs.concat(command.args);
            } else {
              commandArgs = commandArgs.concat(command);
            }
          }
          if (this.engine) this.engine.command.execute(commandName, ...commandArgs);
        }
      }
    }
  };
</script>
