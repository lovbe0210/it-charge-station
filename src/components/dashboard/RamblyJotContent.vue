<template>
  <div class="layout-module_RamblyJot">
    <div class="rambly-header">
      <span>
        <span class="iconfont icon-more" style="transform: scaleX(-1);"></span>
        返回
      </span>
    </div>
    <div class="rambly-info">
      <div class="content-title">
        <h4>{{rambly.title}}</h4>
      </div>
      <div class="post-info">
        撰写于: 2024-03-14 02:16:12
        浏览: 110
        喜欢: 1
      </div>
    </div>
    <div ref="view" class="rambly-content">
    </div>
  </div>
</template>

<script>
  import { View } from '@aomao/engine'
  import {ramblyPlugins, cards, pluginConfig} from "@/components/common/editor/config"

  export default {
    name: 'RamblyJotContent',
    data() {
      return {
        view: null,
        rambly: {
          title: '灵感时刻-2024-03-14 02:16:12',
          jsonValue: "<p data-id=\"p1dr9j7ls-a0voamj9hq000\">虽然你不知道</p><ul class=\"data-list data-list-task\" data-id=\"u3zhx2ezt-kt43uk8mss000\"><li class=\"data-list-item\" data-id=\"l2wwhsngu-suzca6pzqvk0\" checked=\"true\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22dg0G9%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" name=\"checkbox\" editable=\"false\" ></card>as大师</li><li class=\"data-list-item\" data-id=\"l2zs3wsdg-5ekja1v8xqs00\"><card type=\"inline\" value=\"data:%7B%22id%22%3A%22ccmcv%22%2C%22type%22%3A%22inline%22%7D\" name=\"checkbox\" editable=\"false\" ></card>阿萨德</li></ul>"
        }
      }
    },
    methods: {
    },
    mounted() {
      const container = this.$refs.view;
      if (container) {
        //实例化引擎
        const view = new View(container, {
          // 启用插件 TODO 注意插件的key必须是 plugins
          plugins: ramblyPlugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          readonly: true
        });
        if (this.rambly.jsonValue?.length !== 0) {
          view.render(this.rambly.jsonValue, true)
        }
        this.view = view;
      }
    }
  }
</script>

<style scoped lang="less">
  .layout-module_RamblyJot {
    width: 100%;
    height: 100%;
    padding: 0 40px 10px;

    .rambly-header {
      margin: 30px 30px 0;
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      font-style: normal;
    }

    .rambly-info {
      margin: 25px 50px 0;
      padding-bottom: 15px;
      position: relative;
      max-width: 100%;
    }

    .rambly-content {
      height: calc(~"75vh");
    }
  }

  // 第三方插件样式覆盖
  /deep/.am-engine>:not(p) {
    margin: 15px 0;
  }

  /deep/.am-engine>p {
    margin: 8px 0;
  }

  /deep/.am-engine>ul {
    margin: 8px 0;
    li {
      margin: 8px 0;
    }
    li:not(.data-list-item) {
      margin: 8px 0  8px 15px;
    }
  }

  /deep/.am-engine>ol {
    margin: 8px 0;
    li {
      margin: 8px 0 8px 25px;
    }
  }

</style>
