<template>
  <div class="layout-module_RamblyJot">
    <div class="rambly-module_editor">
      <div class="scrollbar-visible">
        <div class="layout-mode-fixed">
          <div class="editor-body">
            <div class="editor-wrap" ref="scrollbarContext" >
              <div class="editor-wrap-content">
                <div class="editor-outer-wrap-box">
                  <div class="editor-wrap-box">
                    <div class="content-box">
                      <div class="engine-box">
                        <div class="engine">
                          <div ref="container"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rambly-module_action">
        <div class="toolbar-ui">
          <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="toolbarUI()"/>
          <div class="rambly-module_button">
            <button disabled="" type="button" class="ant-btn ant-btn-default">
              <span>小记一下</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="rambly-module_list">
      <div class="rambly-jot-wrap">
        <div class="menos-item">
          <a href="/post/2229" class="">
            <div class="post-time"><span>Post 2天前 <span> · Views 207</span><span>· Comments 11</span></span></div>
            <div class="post-content"><p>
              经过数天的排查，一直在探究博客新框架为何正常模式浏览会变慢。无痕模式一点问题都没有，最终经过小关[@951008.com](https://951008.com)的判断禁用了扩展之后，原来是去广告插件Adblock
              Plus的问题。在此我郑重向谷爹浏览器说句抱歉，错怪谷歌爹了。</p></div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://static.199508.com/upload/static/1/image/73340279ac11336bac6189a60a5aa177.png?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 21:29:16" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://static.199508.com/upload/static/1/image/73340279ac11336bac6189a60a5aa177.png?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 21:29:16" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="menos-item">
          <a href="/post/2228" class="">
            <div class="post-time"><span>Post 2天前 <span> · Views 121</span><span>· Comments 4</span></span></div>

            <div class="post-content"><p>这一年下晚班的时候，已经记不清楚多少次在地铁座椅上睡着了。</p></div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://static.199508.com/upload/static/1/image/db5dc1b3f2394106e535a935fe4808e5.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 18:42:17" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://static.199508.com/upload/static/1/image/db5dc1b3f2394106e535a935fe4808e5.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 18:42:17" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2227" class="">
            <div class="post-time"><span>Post 4天前 <span> · Views 215</span><span>· Comments 1</span></span></div>

            <div class="post-content"><p>这世间所有的一切都有取舍，正因为有了取舍，所有的一切都在有条不紊的进行着。</p></div>
          </a>
        </div>
        <div class="menos-item">
          <a href="/post/2226" class="">
            <div class="post-time"><span>Post 6天前 <span> · Views 205</span></span></div>
            <div class="post-tile"><h4>Go 语言数组作为参数传递时为什么要用值传递？</h4></div>
            <div class="post-content"><p>值传递（Pass by Value）和引用传递（Pass by
              Reference）是编程语言中两种主要的参数传递方式，决定了函数调用过程中实参（实际参数）如何影响形参（形式参数）以及函数内部对形参的</p></div>
          </a>
          <div class="post-tag"><span><a href="/search/golang" class="" title="golang"> #golang</a></span><span><a
            href="/search/数组" class="" title="数组"> #数组</a></span><span><a href="/search/传递" class=""
                                                                          title="传递"> #传递</a></span><span><a
            href="/search/值传递" class="" title="值传递"> #值传递</a></span></div>
        </div>
        <div class="menos-item">
          <a href="/post/2225" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 193</span><span>· Comments 2</span></span></div>

            <div class="post-content"><p>连续熬了一个星期凌晨三四点睡，照镜子发现眼球有些许突出了，不知道是不是错觉。😵</p></div>
          </a>
        </div>
        <div class="menos-item">
          <a href="/post/2224" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 231</span><span>· Comments 5</span></span></div>

            <div class="post-content"><p>能够在自己喜欢的领域认真做自己喜欢的事情，本身就是一件很酷的事情！😁</p></div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2223" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 182</span><span>· Comments 6</span></span></div>

            <div class="post-content"><p>
              我不明白谷歌是更新了什么，我费劲心思用Nuxt3.js做一个不使用任何组件和任何前端框架的博客，就是为了优化那几ms的加载速度，这直接给我整废了，加载页面速度奇慢无比，但是奇怪的是切换无痕模式或者换别的浏览器一点事情都没有？？难道是在偷偷采集什么数据上传吗？</p>
            </div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://static.199508.com/upload/static/1/image/63a54accf439c05783812e53bc9a7ce3.jpg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-12 02:00:14" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://static.199508.com/upload/static/1/image/63a54accf439c05783812e53bc9a7ce3.jpg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-12 02:00:14" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="post-tag"><span><a href="/search/Nuxt3.js" class="" title="Nuxt3.js"> #Nuxt3.js</a></span>
          </div>
        </div>
        <div class="menos-item">
          <a href="/post/2222" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 259</span><span>· Comments 3</span></span></div>
            <div class="post-tile"><h4>响应式布局——页面适配各种终端尺寸</h4></div>
            <div class="post-content"><p>Media
              Queries能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。其原理就是允许添加表达式用以媒体查询（包括媒体类型和媒体特性），以此来选择不同的样式表，从而自动适</p>
            </div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2221" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 112</span><span>· Comments 3</span></span></div>

            <div class="post-content"><p>404开启美好的一天🥹</p></div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://static.199508.com/upload/static/1/image/de350dcf98009181de087339ef4cbb9a.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-11 12:31:18" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://static.199508.com/upload/static/1/image/de350dcf98009181de087339ef4cbb9a.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-11 12:31:18" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2220" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 178</span><span>· Comments 3</span></span></div>

            <div class="post-content"><p>熬夜的后果，坐地铁打瞌睡坐过站啦！🥹</p></div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2219" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 181</span></span></div>
            <div class="post-tile"><h4>backdrop-filter: blur() safari 浏览器 无效 解决</h4></div>
            <div class="post-content"><p>遇到的问题：设置 backdrop-filter，Safari
              浏览器首次加载没效果，通过ajax请求数据翻页之后，会出现部分高斯模糊效果无效，但是windows正常。</p></div>
          </a>
          <div class="post-tag"><span><a href="/search/backdrop-filter" class=""
                                         title="backdrop-filter"> #backdrop-filter</a></span><span><a
            href="/search/safari" class="" title="safari"> #safari</a></span><span><a href="/search/浏览器" class=""
                                                                                      title="浏览器"> #浏览器</a></span>
          </div>
        </div>
        <div class="menos-item">
          <a href="/post/2218" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 115</span></span></div>
            <div class="post-content"><p>凉风吹散了落叶🍂，一轮明月照亮了前行的路。</p></div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://static.199508.com/upload/static/1/image/bf0a40c689b582927ee90c45a2a713f8.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-10 19:02:57" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://static.199508.com/upload/static/1/image/bf0a40c689b582927ee90c45a2a713f8.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-10 19:02:57" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a></div>
        <div class="menos-item">
          <a href="/post/2217" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 273</span><span>· Comments 14</span></span></div>

            <div class="post-content"><p>哈哈哈，一直init了大半年基于golang+nuxt3的博客终于上线啦，发条动态庆祝一下！</p></div>
          </a>
        </div>
        <div class="menos-item">
          <a href="/post/2216" class="">
            <div class="post-time">
                  <span>
                    Post 1个星期前
                    <span> · Views 226</span>
                    <span>· Comments 4</span>
                  </span>
            </div>

            <div class="post-content">
              <p>岁寒，然后知松柏之后凋也。</p>
            </div>
            <div class="post-content photo-content p-3">
              <div class="more-images">
                <div class="photo"
                     style="background-image: url('https://static.199508.com/upload/static/1/image/e590253a5bf5ca8c9d32d8852f60c802.jpeg?imageView2/2/w/720');"></div>
                <div class="photo"
                     style="background-image: url('https://static.199508.com/upload/static/1/image/e72882daaa17307456ab5b4c8401e50c.jpeg?imageView2/2/w/720');"></div>
                <div class="photo"
                     style="background-image: url('https://static.199508.com/upload/static/1/image/763c5d0c3b139430d5c4dd949bd6116e.jpeg?imageView2/2/w/720');"></div>
              </div>
            </div>
          </a>
          <div class="post-tag"><span><a href="/search/摄影" class="" title="摄影"> #摄影</a></span><span><a
            href="/search/灵感" class="" title="灵感"> #灵感</a></span><span><a href="/search/时刻" class=""
                                                                          title="时刻"> #时刻</a></span><span><a
            href="/search/岁寒" class="" title="岁寒"> #岁寒</a></span><span><a href="/search/松柏" class=""
                                                                          title="松柏"> #松柏</a></span></div>
        </div>
        <div class="menos-item">
          <a href="/post/2214" class="">
            <div class="post-time"><span>Post 1个星期前 <span> · Views 824</span><span>· Comments 3</span></span></div>
            <div class="post-tile"><h4>CentOS7.9中的Glibc2.17源码编译升级到Glibc2.31</h4></div>
            <div class="post-content"><p>一、引言
              在Liunx系统CentOS7.9的中部署项目遇到了Glibc版本过低的问题，使用yum安装最高只能安装Glibc2.17并不能满足要求，本文介绍了如何用源码编译的方法升级Glibc的版本。
              二、准备工作
              1、配置yum阿里镜像源
              查看yum当前配置的仓库，如果yum配置的不是阿里云源，请配置阿里云源。
              yum repolist all
              验证是否能ping通阿里云
              # 如果不能ping通可能是DNS没有配置
              ping </p></div>
          </a>
          <div class="post-tag"><span><a href="/search/CentOS" class="" title="CentOS"> #CentOS</a></span><span><a
            href="/search/源码" class="" title="源码"> #源码</a></span><span><a href="/search/编译" class=""
                                                                          title="编译"> #编译</a></span><span><a
            href="/search/升级" class="" title="升级"> #升级</a></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  import Toolbar from 'am-editor-toolbar-vue2'
  import {ramblyPlugins, cards, pluginConfig} from "@/components/common/editor/config"
  import {getParentNode} from "../common/editor/utils";

  export default {
    name: 'RamblyJot',
    data() {
      return {
        engine: null,
        // 工具栏内容：下拉面板、
        items: [
          [
            {
              type: "button",
              name: "image-uploader",
              icon: `<span class="toolbar-icon iconfont pic-upload"/><span class="toolbar-title">图片</span>`
            },
            {
              name: "tasklist",
              icon: `<span class="toolbar-icon iconfont task-list"/><span class="toolbar-title">任务</span>`,
              title: ''
            },
            {
              name: "link",
              icon: `<span class="toolbar-icon iconfont link"/><span class="toolbar-title">链接</span>`,
              title: ''
            },
            {
              type: "button",
              name: "file-uploader",
              icon: `<span class="toolbar-icon iconfont attachment"/><span class="toolbar-title">附件</span>`
            }
          ]
        ],
        editorValueIsEmpty: true,
        readmeEmpty: true
      }
    },
    methods: {
      toolbarUI() {
      }
    },
    components: {
      Toolbar
    },
    mounted() {
      pluginConfig.link = {hotkey: { key: ""}};
      pluginConfig.tasklist = {hotkey: { key: ""}};
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins: ramblyPlugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          autoPrepend: false,
          markdown: false,
          // 文档提示语
          placeholder: '记你想记'
        });
        // 设置显示成功消息UI，默认使用 console.log
        engine.messageSuccess = (msg) => {
          console.log(msg);
        };
        // 设置显示错误消息UI，默认使用 console.error
        engine.messageError = (error) => {
          console.log(error);
        };
        //卡片最大化时设置编辑页面样式
        engine.on("card:maximize", () => {
          $(".editor-toolbar").css("z-index", "9999").css("top", "0");
          $(".card-maximize-header").css("height", "60px");
          // $(".editor-toolbar").css("z-index", "9999");
        });
        engine.on("card:minimize", () => {
          $(".editor-toolbar").css("z-index", "").css("top", "");
        });

        // 监听编辑器值改变事件
        engine.on("change", () => {
          let range = engine.change.range.get();
          let collapsed = range?.collapsed;
          let startNode = collapsed ? range.startNode : range.endNode;
          let parentNode = getParentNode(startNode);
          // 处理status影响其他文字
          let children = parentNode?.children("span[data-card-key=\"status\"]");
          if (children !== undefined && children.length !== 0) {
            // 给当前节点去掉样式
            startNode.removeAttributes('style')
            startNode.allChildren().forEach(child => child?.removeAttributes('style'))
          }

          this.editorValueIsEmpty = engine.isEmpty();
        });

        if (this.editorValue && this.editorValue.length > 0) {
          engine.setJsonValue(JSON.parse(this.editorValue))
        }

        this.engine = engine;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/dashboard/ramblyJot.less";
</style>
