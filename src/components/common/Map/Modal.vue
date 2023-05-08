<template>
  <modal
    :visible="visible"
    title="插入位置"
    ok-text="确认"
    cancel-text="取消"
    :ok-button-props="{ props: { disabled: item === null } }"
    @ok="handleOk"
    @cancel="handleClose"
    :width="964"
  >
    <map-content :onCahnge="handleChange"/>
  </modal>
</template>

<script>
  import {Modal} from "ant-design-vue";
  import MapContent from "../Map/Content.vue";

  export default {
    name: "MapModal",
    data() {
      return {
        item: null
      }
    },
    components: {
      MapContent,
      Modal
    },
    props: ['engine', 'visible'],
    methods: {
      handleChange(item) {
        this.item = item;
      },

      handleClose() {
        if (this.onVisibleChange) this.onVisibleChange(false);
      },

      handleOk() {
        this.engine.command.execute("map", this.item);
        this.handleClose();
      }
    }
  }
</script>
