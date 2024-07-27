<template>
  <div
    ref="toolbarRef"
    :class="[
      'editor-toolbar',
      className,
      {
        'editor-toolbar-mobile': isMobile && !popup,
        'editor-toolbar-popup': popup,
      },
    ]"
    :style="isMobile ? { top: `${mobileView.top}px` } : {}"
    data-element="ui"
    @mouseover="triggerMouseOver"
    @mousemove="triggerMouseMove"
    @contextmenu="triggerContextMenu"
  >
    <div class="editor-toolbar-content">
      <am-group
        v-for="(group, index) in groupValue"
        :key="index"
        :engine="engine"
        :popup="popup"
        v-bind="group"
      />
    </div>
  </div>
</template>

<script>
import {merge, omit} from "lodash";
import {isMobile, removeUnit} from "@aomao/engine";
import AmGroup from "./group.vue";
import locales from "../locales";
import {
  getToolbarDefaultConfig,
  fontFamilyDefaultData,
  fontfamily
} from "../config";

export default {
  components: {
    AmGroup
  },
  props: {
    engine: {type: Object, required: true},
    items: {type: Array, default: () => []},
    className: String,
    popup: {type: Boolean, default: false}
  },
  data() {
    return {
      groupValue: [],
      isMobile: false,
      caluTimeoutRef: null,
      updateTimer: null,
      scrollTimer: null,
      mobileView: {top: 0}
    }
  },
  mounted() {
    this.engine.language.add(locales);
    this.engine.on("select", this.updateByTimeout);
    this.engine.on("change", this.updateByTimeout);
    this.engine.on("blur", this.updateByTimeout);
    this.engine.on("focus", this.updateByTimeout);
    if (isMobile) {
      if (!this.engine.isFocus()) this.hideMobileToolbar();
      this.engine.on("readonly", this.handleReadonly);
      this.engine.on("blur", this.hideMobileToolbar);
      document.addEventListener("scroll", this.calcuMobileView);
      visualViewport.addEventListener("resize", this.calcuMobileView);
      visualViewport.addEventListener("scroll", this.calcuMobileView);
    } else {
      this.engine.on("readonly", this.updateByTimeout);
    }
    this.updateByTimeout();
    this.isMobile = isMobile;
  },
  unmounted() {
    this.engine.off("select", this.updateByTimeout);
    this.engine.off("change", this.updateByTimeout);
    this.engine.off("readonly", this.updateByTimeout);
    this.engine.off("blur", this.updateByTimeout);
    this.engine.off("focus", this.updateByTimeout);
    if (isMobile) {
      this.engine.off("readonly", this.handleReadonly);
      this.engine.off("blur", this.hideMobileToolbar);
      document.removeEventListener("scroll", this.calcuMobileView);
      visualViewport.removeEventListener("resize", this.calcuMobileView);
      visualViewport.removeEventListener("scroll", this.calcuMobileView);
    } else {
      this.engine.off("readonly", this.updateByTimeout);
    }
  },
  methods: {
    hideMobileToolbar() {
      this.mobileView = {top: -120};
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.calcuMobileView();
      }, 200);
    },
    handleReadonly() {
      if (this.engine.readonly) {
        this.hideMobileToolbar();
      } else {
        this.calcuMobileView();
      }
    },
    updateByTimeout() {
      if (this.updateTimer) clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(() => {
        this.update();
      }, 100);
    },

    //计算移动浏览器的视图变化
    calcuMobileView() {
      if (!this.engine.isFocus() || this.engine.readonly) return;

      if (this.caluTimeoutRef) clearTimeout(this.caluTimeoutRef);
      this.caluTimeoutRef = setTimeout(() => {
        const element = this.$refs.toolbarRef;
        const rect = element.getBoundingClientRect();
        const borderTop = removeUnit(getComputedStyle(element).borderTopWidth);
        const borderBottom = removeUnit(
          getComputedStyle(element).borderBottomWidth
        );
        const height = rect.height || 0;

        this.mobileView.top =
          global.Math.max(
            document.body.scrollTop,
            document.documentElement.scrollTop
          ) +
          (window.visualViewport.height || 0) -
          height +
          borderTop +
          borderBottom;
      }, 100);
    },
    update() {
      if (isMobile) this.calcuMobileView();
      const data = [];
      const defaultConfig = getToolbarDefaultConfig(this.engine);

      this.items.forEach((group) => {
        const dataGroup = {items: []};
        if (!Array.isArray(group)) {
          dataGroup.icon = group.icon;
          dataGroup.content = group.content;

          group = group.items;
        }
        group.forEach((item) => {
          let customItem;
          if (typeof item === "string") {
            const defaultItem = defaultConfig.find((config) =>
              item === "collapse"
                ? config.type === item
                : config.type !== "collapse" && config.name === item
            );
            if (defaultItem) customItem = defaultItem;
          } else {
            const defaultItem = defaultConfig.find((config) =>
              item.type === "collapse"
                ? config.type === item.type
                : config.type !== "collapse" && config.name === item.name
            );
            // 解析collapse item 为字符串时
            if (item.type === "collapse") {
              const customCollapse = {
                ...merge(
                  omit({...defaultItem}, "groups"),
                  omit({...item}, "groups")
                ),
                groups: []
              };
              item.groups.forEach((group) => {
                const items = [];
                group.items.forEach((cItem) => {
                  let targetItem;
                  defaultItem.groups.some((g) =>
                    g.items.some((i) => {
                      const isEqual =
                        i.name ===
                        (typeof cItem === "string" ? cItem : cItem.name);
                      if (isEqual) {
                        targetItem = {
                          ...i,
                          ...(typeof cItem === "string" ? {} : cItem)
                        };
                      }
                      return isEqual;
                    })
                  );
                  if (targetItem) items.push(targetItem);
                  else if (typeof cItem === "object") items.push(cItem);
                });
                if (items.length > 0) {
                  customCollapse.groups.push({...omit(group, "itmes"), items});
                }
              });
              customItem =
                customCollapse.groups.length > 0 ? customCollapse : undefined;
            } else if (item.type === "dropdown") {
              customItem = defaultItem
                ? merge(defaultItem, omit({...item}, "type", "items"))
                : {...item};
              customItem.items = item.items;
            } else {
              customItem = defaultItem
                ? merge(defaultItem, omit({...item}, "type"))
                : {...item};
            }
          }
          if (customItem) {
            if (customItem.type === "button") {
              if (customItem.onActive) customItem.active = customItem.onActive();
              else if (this.engine.command.queryEnabled(customItem.name)) {
                customItem.active = this.engine.command.queryState(customItem.name);
              }
            } else if (customItem.type === "dropdown") {
              if (customItem.onActive) customItem.values = customItem.onActive(customItem.items);
              else customItem.values = this.engine.command.queryState(customItem.name);
            }
            if (customItem.type !== "collapse") {
              customItem.disabled = customItem.onDisabled
                ? customItem.onDisabled() : !this.engine.command.queryEnabled(customItem.name);
            } else {
              customItem.groups.forEach((group) =>
                group.items.forEach((item) => {
                  item.disabled = item.onDisabled
                    ? item.onDisabled()
                    : !this.engine.command.queryEnabled(item.name);
                })
              );
              customItem.disabled = !customItem.groups.some((g) =>
                g.items.some((item) => !item.disabled)
              );
            }
            dataGroup.items.push(customItem);
          }
        });
        if (dataGroup.items.length > 0) data.push(dataGroup);
      });
      this.groupValue = data;
    },

    preventDefault(event) {
      event.preventDefault();
    },
    triggerMouseOver(event) {
      this.preventDefault(event);
    },
    triggerMouseMove(event) {
      this.preventDefault(event);
    },
    triggerContextMenu(event) {
      this.preventDefault(event);
    }
  }
};

export {getToolbarDefaultConfig, fontFamilyDefaultData, fontfamily};
</script>
