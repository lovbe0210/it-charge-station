<template>
  <b-container fluid>
    <div class="amEditorVue2">
      <am-loading :loading="loading">
        <am-toolbar v-if="engine" :engine="engine" :items="items" />
        <div :class="['editor-wrapper', { 'editor-mobile': mobile }]">
          <div class="editor-container">
            <div class="editor-content">
              <div ref="container"></div>
            </div>
          </div>
        </div>
      </am-loading>
      <map-modal
        v-if="engine"
        :engine="engine"
        :visible="mapModalVisible"
        :onVisibleChange="handleMapModalVisibleChange"
      />
    </div>
  </b-container>
</template>

<script>
  import Engine from "@aomao/engine";
  import AmToolbar, { ToolbarPlugin, ToolbarComponent } from "am-editor-toolbar-vue2";
  import Codeblock, { CodeBlockComponent } from 'am-editor-codeblock-vue2'
  import Bold from '@aomao/plugin-bold'
  import Heading from '@aomao/plugin-heading'

  export default {
    name: 'Editor',
    data() {
      return {
        engine: null,
        items: [['collapse'], ['heading', 'bold']]
      }
    },
    methods: {},
    components: {
      // AmLoading,
      AmToolbar
      // MapModal
    },
    mounted() {
      const engine = new Engine(
        this.$refs.container,
        {
          cards: [
            ToolbarComponent,
            CodeBlockComponent
          ],
          plugins: [
            Heading,
            ToolbarPlugin,
            Codeblock,
            Bold
          ]
        }
      );
      console.log(engine)
      this.engine = engine;
    }
  }
</script>

<style scoped lang="less">
</style>
