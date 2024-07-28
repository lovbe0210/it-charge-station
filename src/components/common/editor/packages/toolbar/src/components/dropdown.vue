<template>
  <div
    :class="[
      'toolbar-dropdown',
      { 'toolbar-dropdown-right': isRight },
      className,
    ]"
    ref="buttonRef"
    @click="triggerClick"
    @mousedown="triggerMouseDown"
  >
    <div
      :class="[
        'toolbar-dropdown-trigger',
        {
          'toolbar-dropdown-trigger-active': visible,
          'toolbar-dropdown-trigger-arrow': hasArrow !== false,
        },
      ]"
    >
      <am-button
        :name="name"
        :placement="placement"
        :title="title"
        :active="visible"
        :disabled="disabled"
        ref="targetRef"
      >
        <template #default>
          <slot :item="content">
            <span v-if="buttonContent && buttonContent.icon"
                  :class="['data-icon', `data-icon-${buttonContent.icon}`]"/>
            <span v-if="buttonContent && !buttonContent.icon && buttonContent.content"
                  class="toolbar-dropdown-button-text"
                  v-html="buttonContent.content"/>
          </slot>
          <span v-if="hasArrow !== false" class="iconfont dir-open"/>
        </template>
      </am-button>
    </div>
    <am-dropdown-list
      v-if="visible"
      :hasDot="hasDot"
      :engine="engine"
      :direction="direction"
      :name="name"
      :items="items"
      :values="valuesVar"
      :on-select="triggerSelect"
    />
  </div>
</template>

<script>
  import AmDropdownList from "./dropdown-list.vue";
  import AmButton from "./button.vue";
  import {isMobile} from "@aomao/engine";

  export default {
    name: "Dropdown",
    components: {
      AmButton,
      AmDropdownList
    },
    props: {
      engine: Object,
      name: {
        type: String,
        required: true
      },
      values: {
        type: [String, Array, Number]
      },
      items: {
        type: Array,
        default: () => []
      },
      icon: String,
      content: [String, Function],
      title: String,
      disabled: {
        type: [Boolean, Object],
        default: undefined
      },
      single: {
        type: [Boolean, Object],
        default: undefined
      },
      className: String,
      direction: String,
      onSelect: Function,
      hasArrow: {
        type: [Boolean, Object],
        default: undefined
      },
      hasDot: {
        type: [Boolean, Object],
        default: undefined
      },
      placement: String
    },
    data() {
      return {
        valuesVar: "",
        buttonContent: { },
        isRight: false,
        visible: false
      };
    },
    mounted() {
      if (this.$refs.buttonRef && isMobile) {
        const rect = (this.$refs.buttonRef).getBoundingClientRect();
        this.isRight = rect.left > window.visualViewport.width / 2;
      }
    },
    watch: {
      "values": {
        immediate: true,
        deep: true,
        handler: function(values) {
          this.update(values);
        }
      },
      "visible": {
        immediate: true,
        deep: true,
        handler: function(value) {
          this.watch(value);
        }
      }
    },
    methods: {
      update(values) {
        if (this.single !== false) values = Array.isArray(values) && values.length > 0 ? values[0] : values;
        const item = this.items.find(
          (item) =>
            (typeof values === "string" && item.key === values) ||
            (Array.isArray(values) && values.indexOf(item.key) > -1)
        );
        const defaultItem =
          this.items.length > 0
            ? this.items.find((item) => item.isDefault === true) || this.items[0]
            : null;

        if (item) {
          if (this.$slots.default) {
            this.buttonContent = item;
          } else if (typeof this.content === "function") {
            this.buttonContent = { icon: this.icon, content: this.content() };
          } else if (Array.isArray(values) && values.length > 1) {
            this.buttonContent = { icon: this.icon, content: this.content };
          } else {
            this.buttonContent = {
              icon: item.icon,
              content: typeof item.content === "function" ? item.content() : item.content
            };
          }
        } else if (this.icon || this.content) {
          if (!Array.isArray(values) || values.length < 1) {
            this.buttonContent = {
              icon: this.icon,
              content:
                typeof this.content === "function" ? this.content() : this.content
            };
          }
        } else if (defaultItem) {
          this.buttonContent = {
            icon: defaultItem.icon,
            content:
              typeof defaultItem.content === "function"
                ? defaultItem.content()
                : defaultItem.content
          };
        }
        this.valuesVar = values ||
          (this.icon || this.content ? "" : defaultItem ? defaultItem.key : "");
      },
      watch(value) {
        if (value) document.addEventListener("click", this.hide);
        else document.removeEventListener("click", this.hide);
      },
      triggerMouseDown(event) {
        event.preventDefault();
      },

      triggerClick(event) {
        event.preventDefault();
        if (this.disabled) {
          return;
        }
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },

      show() {
        this.visible = true;
      },

      hide(event) {
        if (event && this.$refs.targetRef &&
          ((this.$refs.targetRef).$refs.element).contains(event.target)) return;
        this.visible = false;
      },

      triggerSelect(event, key) {
        this.hide();
        if (this.onSelect) this.onSelect(event, key);
      }
    }
  };
</script>
<style>
.toolbar-dropdown {
    position: relative;
}

.toolbar-dropdown .toolbar-dropdown-trigger {
    display: flex;
    align-items: stretch;
    height: 100%;
}

.toolbar-dropdown .toolbar-dropdown-trigger .toolbar-button {
    margin: 0;
}

.toolbar-dropdown .toolbar-dropdown-trigger .toolbar-dropdown-button-text {
    font-size: 12px;
}

.toolbar-dropdown .toolbar-dropdown-trigger-arrow .toolbar-button{
    padding-right: 15px;
    margin: 0;
}

.toolbar-dropdown .toolbar-dropdown-trigger-arrow .dir-open {
    font-size: 11px;
    margin-left: 6px;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
}

.toolbar-dropdown-list {
    margin-top: 6px;
    position: absolute;
    top: 32px;
    font-size: 12px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    padding: 12px;
    height: auto;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
    z-index: 999;
    max-height: calc(80vh);
    overflow: auto;
}

.toolbar-dropdown.toolbar-dropdown-right:not(.toolbar-dropdown-right) .toolbar-dropdown-list{
    left: 0px;
}

.editor-toolbar-mobile .toolbar-dropdown .toolbar-dropdown-list, .editor-toolbar-popup .toolbar-dropdown .toolbar-dropdown-list:not(.toolbar-dropdown-placement-bottom) {
    bottom: 32px;
    top: auto;
    overflow: auto;
}

.editor-toolbar-mobile .toolbar-dropdown .toolbar-dropdown-list {
    max-height: calc(30vh);
}


.editor-toolbar-mobile .toolbar-dropdown.toolbar-dropdown-right .toolbar-dropdown-list,.editor-toolbar-popup .toolbar-dropdown.toolbar-dropdown-right .toolbar-dropdown-list{
    right: 0px;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item {
    padding: 2px 10px 2px 16px;
    line-height: 30px;
    color: #595959;
    text-align: left;
    position: relative;
    display: flex;
    white-space: nowrap;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item-disabled {
    color: rgba(17, 31, 44, 0.24);
    cursor: not-allowed;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item:not(.toolbar-dropdown-list-item-disabled):hover {
    color: #262626;
    background-color: #f5f5f5;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item .data-icon {
    margin-right: 8px;
}

.toolbar-dropdown .toolbar-dropdown-list.toolbar-dropdown-horizontal .toolbar-dropdown-list-item {
    display: inline-block;
}

.toolbar-dropdown .toolbar-dropdown-list.toolbar-dropdown-dot .toolbar-dropdown-list-item {
    padding-left: 30px;
    padding-right: 16px;
    white-space: nowrap;
}

.toolbar-dropdown .toolbar-dropdown-list .toolbar-dropdown-list-item .data-icon-dot
{
    position: absolute;
    top: 50%;
    left: 8px;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    display: block;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5VbnRpdGxlZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNDUiPgogICAgICAgIDxnIGlkPSJjaGVjayIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTIuNDY4NzUsMi41OTc2NTYyNSBMMTEuNTEzMDg1OSwyLjU5NzY1NjI1IEMxMS4zNzkxMDE2LDIuNTk3NjU2MjUgMTEuMjUxOTUzMSwyLjY1OTE3OTY5IDExLjE2OTkyMTksMi43NjQ0NTMxMiBMNS41MzMwMDc4MSw5LjkwNTI3MzQ0IEwyLjgzMDA3ODEyLDYuNDgwNDY4NzUgQzIuNzQ2Njc5NjksNi4zNzUxOTUzMSAyLjYyMDg5ODQ0LDYuMzEzNjcxODcgMi40ODY5MTQwNiw2LjMxMzY3MTg3IEwxLjUzMTI1LDYuMzEzNjcxODcgQzEuNDM5NjQ4NDQsNi4zMTM2NzE4NyAxLjM4OTA2MjUsNi40MTg5NDUzMSAxLjQ0NTExNzE5LDYuNDkwMDM5MDYgTDUuMTg5ODQzNzUsMTEuMjM0MTc5NyBDNS4zNjQ4NDM3NSwxMS40NTU2NjQxIDUuNzAxMTcxODcsMTEuNDU1NjY0MSA1Ljg3NzUzOTA2LDExLjIzNDE3OTcgTDEyLjU1NDg4MjgsMi43NzI2NTYyNSBDMTIuNjEwOTM3NSwyLjcwMjkyOTY5IDEyLjU2MDM1MTYsMi41OTc2NTYyNSAxMi40Njg3NSwyLjU5NzY1NjI1IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-repeat: no-repeat;
}
</style>
