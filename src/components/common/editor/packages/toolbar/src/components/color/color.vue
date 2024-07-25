<template>
  <div
    :class="[
      'toolbar-dropdown',
      'colorpicker-button',
      { 'toolbar-dropdown-right': isRight },
    ]"
    ref="buttonRef"
  >
    <div
      :class="[
        'toolbar-dropdown-trigger colorpicker-button-group',
        { 'colorpicker-button-group-active': visible },
      ]"
    >
      <am-button
        class="colorpicker-button-text"
        :name="name"
        :title="buttonTitle"
        :on-click="triggerClick"
        :placement="placement"
        :disabled="disabled"
      >
        <span v-html="buttonContent"></span>
      </am-button>
      <am-button
        class="colorpicker-button-dropdown toolbar-dropdown-trigger-arrow"
        :name="name"
        :title="dropdownTitle"
        :on-click="toggleDropdown"
        :placement="placement"
        :disabled="disabled"
        ref="targetRef"
      >
        <template #icon>
          <span class="colorpicker-button-dropdown-empty"/>
        </template>
        <span class="data-icon data-icon-arrow"/>
      </am-button>
    </div>
    <div
      v-if="visible"
      ref="elementRef"
      :class="[
        'toolbar-dropdown-list',
        { [`toolbar-dropdown-placement-${listPlacement}`]: !!listPlacement },
      ]"
      data-element="ui"
    >
      <am-color-picker
        :engine="engine"
        :colors="colors"
        :default-active-color="currentColor"
        :default-color="defaultColor"
        :on-select="triggerSelect"
        :set-stroke="setStroke"
      />
    </div>
  </div>
</template>

<script>
  import {isMobile} from "@aomao/engine";
  import AmButton from "../button.vue";
  import AmColorPicker from "./picker/picker.vue";
  import Palette from "./picker/palette";

  export default {
    components: {
      AmButton,
      AmColorPicker
    },
    props: {
      engine: Object,
      name: {
        type: String,
        required: true
      },
      content: {
        type: [String, Function],
        required: true
      },
      buttonTitle: String,
      dropdownTitle: String,
      command: Object,
      autoExecute: {
        type: [Boolean, Object],
        default: undefined
      },
      disabled: {
        type: [Boolean, Object],
        default: undefined
      },
      colors: Array,
      defaultColor: {
        type: String,
        required: true
      },
      defaultActiveColor: {
        type: String,
        required: true
      },
      setStroke: {
        type: [Boolean, Object],
        default: undefined
      },
      onSelect: Function,
      placement: {
        type: String,
        default: undefined
      }
    },
    data() {
      return {
        visible: false,
        isRight: false,
        currentColor: "",
        buttonContent: "",
        listPlacement: ""
      };
    },
    mounted() {
      if (this.$refs.buttonRef && isMobile) {
        const rect = this.$refs.buttonRef.getBoundingClientRect();
        this.isRight = rect.left > window.visualViewport.width / 2;
      }
      this.currentColor = this.defaultActiveColor;
    },
    beforeDestroy() {
      document.removeEventListener("click", this.hideDropdown);
    },
    watch: {
      currentColor: {
        immediate: true,
        handler() {
          this.getContent();
        }
      },
      disabled: {
        immediate: true,
        handler() {
          this.getContent();
        }
      },
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            document.addEventListener("click", this.hideDropdown);
            this.$nextTick(() => {
              const current = this.$refs.elementRef;
              if (!current || !this.engine || !this.engine.scrollNode) return;
              const scrollElement = this.engine.scrollNode.get();
              if (!scrollElement) return;
              const rect = current.getBoundingClientRect();
              const scrollRect = scrollElement.getBoundingClientRect();
              if (rect.top < scrollRect.top) this.listPlacement = "bottom";
              if (rect.bottom > scrollRect.bottom) this.listPlacement = "top";
            });
          } else {
            document.removeEventListener("click", this.hideDropdown);
          }
        }
      }
    },
    methods: {
      getContent() {
        this.buttonContent =
          typeof this.content === "string"
            ? this.content
            : this.content(
            this.currentColor,
            Palette.getStroke(this.currentColor),
            this.disabled
            );
      },
      toggleDropdown(event) {
        event.preventDefault();
        if (this.visible) {
          this.hideDropdown();
        } else {
          this.showDropdown();
        }
      },
      showDropdown() {
        this.visible = true;
      },
      hideDropdown(event) {
        if (
          event &&
          this.$refs.targetRef &&
          this.$refs.targetRef.$refs.element.contains(event.target)
        ) return;
        this.visible = false;
      },
      triggerClick(event) {
        this.triggerSelect(this.currentColor, event);
      },
      triggerSelect(color, event) {
        this.hideDropdown();
        this.currentColor = color;
        this.buttonContent =
          typeof this.content === "string"
            ? this.content
            : this.content(color, Palette.getStroke(color), this.disabled);

        if (this.autoExecute !== false) {
          let commandName = this.name;
          let commandArgs = [color, this.defaultColor];
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
        if (this.onSelect) this.onSelect(color, event);
      }
    }
  };
</script>

<style>
  .editor-toolbar .colorpicker-button .colorpicker-button-group {
    padding: 0 2px;
  }

  .colorpicker-button-group .toolbar-button {
    padding: 0;
  }

  .colorpicker-button-group .colorpicker-button-text {
    margin-right: 0;
    min-width: 26px;
    border-radius: 3px 0 0 3px;
    display: block;
  }

  .editor-toolbar.editor-toolbar-popup
  .colorpicker-button-group
  .colorpicker-button-text {
    margin: 0;
    border-radius: 3px 0 0 3px;
  }

  .colorpicker-button-group .colorpicker-button-text:active {
    background-color: #e8e8e8;
  }

  .colorpicker-button-group .colorpicker-button-dropdown {
    margin-left: -1px;
    min-width: 17px;
    text-align: center;
    padding: 0 0;
    border-radius: 0 3px 3px 0;
    display: block;
  }

  .editor-toolbar.editor-toolbar-popup
  .colorpicker-button-group
  .colorpicker-button-dropdown {
    line-height: 24px;
    min-width: 17px;
    padding: 0 4px;
    margin: 0;
    margin-left: -1px;
    border-radius: 0 3px 3px 0;
  }

  .colorpicker-button-group .colorpicker-button-dropdown:hover,
  .colorpicker-button-group .colorpicker-button-dropdown:active {
    background-color: #e8e8e8;
  }

  .colorpicker-button-group
  .colorpicker-button-dropdown
  .colorpicker-button-dropdown-empty {
    display: inline-block;
  }

  .colorpicker-button-group:hover .toolbar-button {
    border: 1px solid #e8e8e8;
  }

  .colorpicker-button-group-active .toolbar-button,
  .colorpicker-button-group-active:hover .toolbar-button {
    border: 1px solid #e8e8e8;
  }
</style>
