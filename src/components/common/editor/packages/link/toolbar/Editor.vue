<template>
    <div data-element="ui" :class="['data-link-editor', className]">
      <p>{{ textTitle }}</p>
      <p>
        <Input
          class="data-link-input"
          v-model="text"
          :placeholder="textPlaceholder"
        />
      </p>
      <p>{{ linkTitle }}</p>

      <p>
        <Input
          ref="linkRef"
          class="data-link-input"
          v-model="link"
          :placeholder="linkPlaceholder"
        />
      </p>
      <p>
        <Button
          class="data-link-button"
          @click="onOk ? onOk(text, link) : () => {}"
          :disabled="link.trim() === ''">
          {{ buttonTitle }}
        </Button>
      </p>
    </div>
</template>

<script>

export default {
  name: 'Link-Editor',
  props: {
    language: {
      type: Object,
      required: true
    },
    defaultText: {
      type: String,
      default: ''
    },
    defaultLink: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    onLoad: Function,
    onOk: Function
  },
  data() {
    return {
      text: '',
      link: '',
      textTitle: '',
      textPlaceholder: '',
      linkTitle: '',
      linkPlaceholder: '',
      buttonTitle: ''
    };
  },
  mounted() {
    this.text = this.defaultText || "";
    this.link = this.defaultLink || "";
    this.textTitle = this.language.get("link", "text");
    this.textPlaceholder = this.language.get("link", "text_placeholder");
    this.linkTitle = this.language.get("link", "link");
    this.linkPlaceholder = this.language.get("link", "link_placeholder");
    this.buttonTitle = this.language.get("link", "ok_button");

    setTimeout(() => {
      const linkRef = this.$refs.linkRef;
      if (linkRef) linkRef.focus();
      if (this.onLoad) this.onLoad();
    }, 200);
  }
};
</script>
