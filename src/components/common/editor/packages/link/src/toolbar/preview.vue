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
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LanguageInterface } from "@aomao/engine";
import { Tooltip } from "ant-design-vue";

@Component({
  components: {
    "a-tooltip": Tooltip,
  },
})
export default class LinkPreview extends Vue {
  @Prop({ type: Object, required: true }) language!: LanguageInterface;
  @Prop(String) href?: string;
  @Prop(String) className?: string;
  @Prop(Function) onEdit?: (event: MouseEvent) => void;
  @Prop(Function) onRemove?: (event: MouseEvent) => void;
  @Prop(Function) onLoad?: () => void;
  @Prop(Boolean) readonly?: boolean;

  openTitle = "";
  editTitle = "";
  removeTitle = "";

  mounted() {
    this.openTitle = this.language.get<string>("link", "link_open");
    this.editTitle = this.language.get<string>("link", "link_edit");
    this.removeTitle = this.language.get<string>("link", "link_remove");

    if (this.onLoad) this.onLoad();
  }
}
</script>
