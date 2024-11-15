import {$, isMobile, Position} from '@aomao/engine';
import Vue from "vue";
import LinkEditor from './Editor.vue';
import LinkPreview from './Preview.vue';

class Toolbar {
  engine;
  root;
  target;
  options;
  mouseInContainer = false;
  vm;
  position;

  constructor(engine, options) {
    this.engine = engine;
    const { change } = this.engine;
    this.options = options;
    this.position = new Position(this.engine);
    change.event.onWindow("mousedown", (event) => {
      if (!event.target) return;
      const target = $(event.target);
      const container = target.closest(".data-link-wrap");
      this.mouseInContainer = container && container.length > 0;
      if (!target.inEditor() && !this.mouseInContainer) this.hide();
    });
    change.event.onDocument("keydown", (event) => {
      if (event.key === 'Escape') {
        if (!event.target) return;
        const { change } = this.engine;
        const range = change.range.get();
        this.engine.inline.repairCursor(this.target);
        range.setStart(this.target.next(), 1);
        range.setEnd(this.target.next(), 1);
        change.apply(range);
        this.mouseInContainer = false;
        this.hide();
      }
    })
  }

  create() {
    if (!this.target) return;
    let root = $(".data-link-wrap");
    if (root.length === 0) {
      root = $(
        `<div class="data-link-wrap${
          isMobile ? " data-link-wrap-mobile" : ""
        }"></div>`
      );
    }
    this.root = root;
    const rect = this.target.get()?.getBoundingClientRect();
    if (!rect) return;
    this.root.css({
      top: `${window.pageYOffset + rect.bottom + 40}px`,
      left: `${window.pageXOffset}px`,
      position: "fixed",
      "z-index": 125
    });
  }

  async onOk(text, link) {
    if (!this.target) return;
    const { change } = this.engine;
    const range = change.range.get();
    if (!change.rangePathBeforeCommand) {
      if (!range.startNode.inEditor()) {
        range.select(this.target, true);
        change.range.select(range);
      }
      change.cacheRangeBeforeCommand();
    }
    const { onConfirm } = this.options || {};
    if (onConfirm) {
      const result = await onConfirm(text, link);
      text = result.text;
      link = result.link;
    }
    this.target.attributes("href", link);
    text = text.trim() === "" ? link : text;
    const oldText = this.target.text();
    if (oldText !== text) {
      const children = this.target.children();
      // 左右两侧有零宽字符
      if (children.length < 3) {
        this.target.text(text);
      } else if (children.length === 3 && children.eq(1)?.isText()) {
        // 中间节点是文本字符
        this.target.text(text);
      } else if (children.length === 3) {
        // 中间节点是非文本节点
        let element = children.eq(1);
        while (element) {
          const child = element.children();
          // 有多个子节点就直接设置文本，覆盖里面的mark样式
          if (child.length > 1 || child.length === 0) {
            element.text(text);
            break;
          } else if (child.eq(0)?.isText()) {
            // 里面的子节点是文本就设置文本
            element.text(text);
            break;
          } else {
            // 里面的子节点非文本节点就继续循环
            element = child;
          }
        }
      } else {
        // 多个其它节点
        this.target.text(text);
      }
    }
    this.engine.inline.repairCursor(this.target);
    range.setStart(this.target.next(), 1);
    range.setEnd(this.target.next(), 1);
    change.apply(range);
    this.mouseInContainer = false;
    this.hide();
  }

  editor(text, href, callback) {
    const vm = new Vue({
      render: (h) => {
        return h(LinkEditor, {
          props: {
            language: this.engine.language,
            defaultText: text,
            defaultLink: href,
            onLoad: () => {
              this.mouseInContainer = true;
              // 此处的callback方法实为updatePosition发放，会造成div跳跃
              // if (callback) callback();
            },
            onOk: (text, link) => this.onOk(text, link)
          }
        });
      }
    });
    return vm;
  }

  preview(href, callback) {
    const { change, inline, language } = this.engine;
    const vm = new Vue({
      render: (h) => {
        return h(LinkPreview, {
          props: {
            language,
            href,
            readonly: this.engine.readonly,
            onLoad: () => {
              if (callback) callback();
            },
            onEdit: () => {
              if (!this.target) return;
              this.mouseInContainer = false;
              this.hide(undefined, false);
              this.show(this.target, true);
            },
            onRemove: () => {
              if (!this.target) return;
              const range = change.range.get();
              range.select(this.target, true);
              inline.repairRange(range);
              change.range.select(range);
              change.cacheRangeBeforeCommand();
              inline.unwrap();
              this.mouseInContainer = false;
              this.target = undefined;
              this.hide();
            }
          }
        });
      }
    });
    return vm;
  }

  show(target, forceEdit) {
    if (this.target?.equal(target) && !!this.root?.parent()?.length) return;
    this.target = target;
    this.create();
    const text = target.text().replace(/\u200B/g, "");
    const href = target.attributes("href");
    const container = this.root.get();

    const name =
      (!href || forceEdit) && !this.engine.readonly
        ? "data-link-editor"
        : "data-link-preview";

    if (this.vm && $(this.vm.$el).hasClass(name)) {
      if (!this.root || !this.target) return;
      this.position?.destroy();
      this.position?.bind(this.root, this.target);
      return;
    } else if (this.vm) {
      this.vm.$destroy();
      this.vm = undefined;
      this.position?.destroy();
    }

    setTimeout(() => {
      this.position?.destroy();
      this.position?.bind(this.root, this.target);
      this.vm = (!href || forceEdit) && !this.engine.readonly
          ? this.editor(text, href, () => this.position?.update())
          : this.preview(href, () => this.position?.update());
      container.append(this.vm.$mount().$el);
    }, 20);
  }

  hide(target, clearTarget) {
    if (target && this.target && target.equal(this.target)) return;
    const element = this.root?.get();
    if (element && !this.mouseInContainer) {
      if (this.vm) {
        this.vm.$destroy();
        this.vm = undefined;
        this.position?.destroy();
      }
      this.root = undefined;
      if (this.target && !this.target.attributes("href")) {
        const { change, inline } = this.engine;
        const range = change.range.get();
        range.select(this.target, true);
        inline.unwrap(range);
        change.apply(range.collapse(true));
      }
      if (clearTarget !== false) this.target = undefined;
    }
  }
}

export default Toolbar;
