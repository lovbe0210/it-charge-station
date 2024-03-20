<template>
  <div class="layout-module_RamblyJot">
    <div class="rambly-header" @click="$router.go(-1)">
      <span class="iconfont return"></span>
      <span>返回</span>
    </div>
    <div class="rambly-info">
      <div class="content-title">
        <span>{{rambly.title}}</span>
      </div>
      <div class="post-info">
        撰写于: 2024-03-14 02:16:12&nbsp;
        浏览: 110&nbsp;
        评论: 1
      </div>
    </div>
    <div ref="view" class="rambly-content">
    </div>
    <!-- 评论 -->
    <div class="">
      <reply-comment/>
    </div>
  </div>
</template>

<script>
  import { View } from '@aomao/engine'
  import {ramblyPlugins, cards, pluginConfig} from "@/components/common/editor/config"
  import ReplyComment from "@/components/common/replycomment/src/ReplyComment"

  export default {
    name: 'RamblyJotContent',
    data() {
      return {
        view: null,
        rambly: {
          title: '灵感时刻-2024-03-14 02:16:12',
          jsonValue: "<p data-id=\"p1dr9j7ls-2loqqjozpss00\">好烦哦，有没有了</p><p data-id=\"p1dr9j7ls-aqco4hwliw000\">每次都需要重新输入</p><p data-id=\"p1dr9j7ls-8q5hz8cini400\">虾米那列举一些任务：</p><p data-id=\"p1dr9j7ls-3mat4qui3t000\">    </p><ul class=\"data-list data-list-task\" data-id=\"u3zhx2ezt-e9cpfux491400\" style=\"list-style: none;\"><li class=\"data-list-item\" data-id=\"l2wwhsngu-ibu9zh6wr9c00\" checked=\"true\"><span data-card-value=\"data:%7B%22id%22%3A%22ZaDt3%22%2C%22type%22%3A%22inline%22%2C%22checked%22%3Atrue%7D\" data-card-type=\"inline\" data-card-key=\"checkbox\" contenteditable=\"false\" data-card-editable=\"false\"><span style=\"margin: 3px 0.5ex; vertical-align: middle; width: 16px; height: 16px; color: rgba(0, 0, 0, 0.65);\"><span style=\"background:#fff;width: 16px;height: 16px;display: inline-block;border: 1px solid #347eff;border-radius: 2px;transition: all 0.3s;border-collapse: separate;\"></span></span></span>1. 给老婆买蛋糕</li><li class=\"data-list-item\" data-id=\"l2wwhsngu-jn1lrplzisw00\"><span data-card-value=\"data:%7B%22id%22%3A%22qiTQx%22%2C%22type%22%3A%22inline%22%7D\" data-card-type=\"inline\" data-card-key=\"checkbox\" contenteditable=\"false\" data-card-editable=\"false\"><span style=\"margin: 3px 0.5ex; vertical-align: middle; width: 16px; height: 16px; color: rgba(0, 0, 0, 0.65);\"><span style=\"background:#fff;width: 16px;height: 16px;display: inline-block;border: 1px solid #347eff;border-radius: 2px;transition: all 0.3s;border-collapse: separate;\"></span></span></span>2. 给可乐讲故事</li><li class=\"data-list-item\" data-id=\"l2wwhsngu-9g13swv0vm800\"><span data-card-value=\"data:%7B%22id%22%3A%228xQbO%22%2C%22type%22%3A%22inline%22%7D\" data-card-type=\"inline\" data-card-key=\"checkbox\" contenteditable=\"false\" data-card-editable=\"false\"><span style=\"margin: 3px 0.5ex; vertical-align: middle; width: 16px; height: 16px; color: rgba(0, 0, 0, 0.65);\"><span style=\"background:#fff;width: 16px;height: 16px;display: inline-block;border: 1px solid #347eff;border-radius: 2px;transition: all 0.3s;border-collapse: separate;\"></span></span></span>看片<a target=\"_blank\" href=\"http:\" style=\"font-family: monospace; font-size: inherit; background-color: rgba(0, 0, 0, 0.06); padding: 0px 2px; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; line-height: inherit; overflow-wrap: break-word; text-indent: 0px;\">come on</a></li></ul>"
        }
      }
    },
    methods: {
    },
    components: {
      ReplyComment
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
    /*height: 100%;*/
    padding: 0 40px 5px;
    margin: 35px 30px 0;

    .rambly-header {
      width: 60px;
      margin-top: 30px;
      height: 32px;
      line-height: 16px;
      font-size: 15px;
      cursor: pointer;

      .iconfont {
        font-size: 15px;
        margin-right: 1px;
      }
    }

    .rambly-info {
      margin-top: 10px;
      padding-bottom: 10px;
      position: relative;
      max-width: 100%;

      .content-title {
        font-size: 1.5em;
        font-weight: bold;
      }

      .post-info {
        margin-top: 10px;
        color: #8A8F8D;
      }
    }

    .rambly-content {
      margin-top: 10px;
    }
  }

  // 第三方插件样式覆盖

  /deep/.am-engine-view>:not(p) {
    margin: 11px 0;
  }

  /deep/.am-engine-view>p {
    margin: 4px 0;
  }

  /deep/.am-engine-view>ul>li {
    margin-top: 4px;
    margin-bottom: 4px;
  }


</style>
