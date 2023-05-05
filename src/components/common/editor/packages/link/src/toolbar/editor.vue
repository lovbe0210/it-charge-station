<template>
  <a-config-provider :auto-insert-space-in-button="false">
    <div data-element="ui" :class="['data-link-editor', className]">
      <p>{{ textTitle }}</p>
      <p>
        <a-input
          class="data-link-input"
          :value="text"
          :placeholder="textPlaceholder"
          @change="onTextChange($event.target.value)"
        />
      </p>
      <p>{{ linkTitle }}</p>

      <p>
        <a-input
          ref="linkRef"
          class="data-link-input"
          :value="link"
          :placeholder="linkPlaceholder"
          @change="onLinkChange($event.target.value)"
        />
      </p>
      <p>
        <a-button
          class="data-link-button"
          @click="onOk ? onOk(text, link) : () => {}"
          :disabled="link.trim() === ''"
        >
          {{ buttonTitle }}
        </a-button>
      </p>
    </div>
  </a-config-provider>
</template>
<script>
  import {ConfigProvider, Input, Button} from "ant-design-vue";

  export default {
    name: "LinkEditor",
    data() {
      return {
        text: "",
        link: "",
        textTitle: "",
        textPlaceholder: "",
        linkTitle: "",
        linkPlaceholder: "",
        buttonTitle: ""
      }
    },
    components: {
      "a-config-provider": ConfigProvider,
      "a-input": Input,
      "a-button": Button
    },
    props: ['language', 'defaultText', 'defaultLink', 'className', 'onLoad', 'onOk'],
    mounted() {
      this.text = this.defaultText || "";
      this.link = this.defaultLink || "";
      this.textTitle = this.language.get("link", "text");
      this.textPlaceholder = this.language.get(
        "link",
        "text_placeholder"
      );
      this.linkTitle = this.language.get("link", "link");
      this.linkPlaceholder = this.language.get(
        "link",
        "link_placeholder"
      );
      this.buttonTitle = this.language.get("link", "ok_button");

      setTimeout(() => {
        const linkRef = this.$refs.linkRef;
        if (linkRef) linkRef.focus();
        if (this.onLoad) this.onLoad();
      }, 200);
    },
    methods: {
      onTextChange(value) {
        this.text = value;
      },
      onLinkChange(value) {
        this.link = value;
      }
    }

  }
</script>
