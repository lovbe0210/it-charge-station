<template>
  <div class="data-link-preview" data-element="ui">
    <a-tooltip :title="openTitle">
      <a
        class="data-icon data-icon-link data-link-preview-open"
        :href="href"
        target="_blank"
      >
        {{ href }}
      </a>
    </a-tooltip>
    <div class="data-link-op" v-if="!readonly">
      <a-tooltip :title="editTitle">
        <a class="data-icon data-icon-edit" @click="onEdit" />
      </a-tooltip>
      <a-tooltip :title="removeTitle">
        <a class="data-icon data-icon-unlink" @click="onRemove" />
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { Tooltip } from "ant-design-vue";

export default {
  name: 'am-link-preview',
  components: {
    ATooltip: Tooltip
  },
  props: {
    language: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean
    },
    href: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    onEdit: {
      type: Function,
      default: () => {
      }
    },
    onRemove: {
      type: Function,
      default: () => {
      }
    },
    onLoad: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      openTitle: '',
      editTitle: '',
      removeTitle: ''
    };
  },
  mounted() {
    this.openTitle = this.language.get("link", "link_open");
    this.editTitle = this.language.get("link", "link_edit");
    this.removeTitle = this.language.get("link", "link_remove");

    if (this.onLoad) this.onLoad();
  }
};
</script>
