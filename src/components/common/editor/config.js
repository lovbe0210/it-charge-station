//引入插件 begin
import Redo from "@aomao/plugin-redo"
import Undo from "@aomao/plugin-undo"
import Bold from "@aomao/plugin-bold"
import Code from "@aomao/plugin-code"
import Backcolor from "@aomao/plugin-backcolor"
import Fontcolor from "@aomao/plugin-fontcolor"
import Fontsize from "@aomao/plugin-fontsize"
import Italic from "@aomao/plugin-italic"
import Underline from "@aomao/plugin-underline"
import Hr, {HrComponent} from "@aomao/plugin-hr"
import Tasklist, {CheckboxComponent} from "@aomao/plugin-tasklist"
import Orderedlist from "@aomao/plugin-orderedlist"
import Unorderedlist from "@aomao/plugin-unorderedlist"
import Indent from "@aomao/plugin-indent"
import Heading from "@aomao/plugin-heading"
import Strikethrough from "@aomao/plugin-strikethrough"
import Sub from "@aomao/plugin-sub"
import Sup from "@aomao/plugin-sup"
import Alignment from "@aomao/plugin-alignment"
import Quote from "@aomao/plugin-quote"
import PaintFormat from "@aomao/plugin-paintformat"
import RemoveFormat from "@aomao/plugin-removeformat"
import SelectAll from "@aomao/plugin-selectall"
// import Image, {ImageComponent, ImageUploader} from "@aomao/plugin-image"
import Image, {ImageComponent, ImageUploader} from "./packages/image/src"
import Table, {TableComponent} from "@aomao/plugin-table"
import File, {FileComponent, FileUploader} from "@aomao/plugin-file"
import Video, {VideoComponent, VideoUploader} from "@aomao/plugin-video"
import Math, {MathComponent} from "@aomao/plugin-math"
import Fontfamily from "@aomao/plugin-fontfamily"
import Status, {StatusComponent} from "@aomao/plugin-status"
import LineHeight from "@aomao/plugin-line-height"
import Mention, {MentionComponent} from "@aomao/plugin-mention"
import {fontFamilyDefaultData, ToolbarPlugin, ToolbarComponent} from "am-editor-toolbar-vue2"
import Link from "am-editor-link-vue2"
// import CodeBlock, {CodeBlockComponent} from "am-editor-codeblock-vue2"
import CodeBlock, {CodeBlockComponent} from "./packages/codeblock/src"
import MentionHover from "./MentionHover.vue"
import {creatComponent} from "./utils"
import AmLoading from "./Loading.vue"

import Lightblock, {LightblockComponent} from "./packages/lightblock/src";

const DOMAIN = "/icharge"

export const HightLightIcon = '<div class="hight-light-icon" style="display: flex; align-items: center; justify-content: center; width: 23px; height: 23px; border: 1px solid #e8e8e8;"><span class="iconfont icon-hight-light" style="font-size: 13px;line-height: 23px;color: #262626;font-weight: bold;"></span></div>';

export const plugins = [
  Redo,
  Undo,
  Bold,
  Code,
  Backcolor,
  Fontcolor,
  Fontsize,
  Italic,
  Underline,
  Hr,
  Tasklist,
  Orderedlist,
  Unorderedlist,
  Indent,
  Heading,
  Strikethrough,
  Sub,
  Sup,
  Alignment,
  Quote,
  PaintFormat,
  RemoveFormat,
  SelectAll,
  Image,
  ImageUploader,
  Table,
  File,
  FileUploader,
  Video,
  VideoUploader,
  Math,
  Fontfamily,
  Status,
  LineHeight,
  Mention,
  Link,
  CodeBlock,
  ToolbarPlugin,
  Lightblock
]

export const ramblyPlugins = [
  Undo,
  Image,
  ImageUploader,
  File,
  FileUploader,
  Link,
  Tasklist,
  ToolbarPlugin
]


export const cards = [
  HrComponent,
  CheckboxComponent,
  ImageComponent,
  TableComponent,
  FileComponent,
  VideoComponent,
  MathComponent,
  StatusComponent,
  MentionComponent,
  CodeBlockComponent,
  ToolbarComponent,
  LightblockComponent
]

export const pluginConfig = {
  [Italic.pluginName]: {
    // 默认为 _ 下划线，这里修改为单个 * 号
    markdown: "*"
  },
  [Image.pluginName]: {
    maxHeight: 300,
    onBeforeRender: (status, url) => {
      if (url.startsWith("data:image/")) return url
      return url
    }
  },
  [ImageUploader.pluginName]: {
    file: {
      action: `${DOMAIN}/common/upload`, //图片上传
      headers: {Authorization: 213434}
    },
    remote: {
      action: `${DOMAIN}/upload/image` //添加外网图片连接上传,上后端下载图片，并返回一个本地连接,比如图片复制
    },
    isRemote: src => src.indexOf(DOMAIN) < 0,
    parse: response => {
      return {
        result: response.result,
        data: response.data
      }
    }
  },
  [FileUploader.pluginName]: {
    action: `${DOMAIN}/upload/file`
  },
  [VideoUploader.pluginName]: {
    action: `${DOMAIN}/upload/video`,
    limitSize: 1024 * 1024 * 50
  },
  [Video.pluginName]: {
    onBeforeRender: (status, url) => {
      return url + `?token=12323`
    }
  },
  [Math.pluginName]: {
    action: `http://localhost:8080/math`,
    parse: res => {
      if (res.success) return {result: true, data: res.svg}
      return {result: false}
    }
  },
  [Mention.pluginName]: {
    // action: `${DOMAIN}/user/search`,
    onLoading: root => {
      creatComponent(AmLoading, root.get())
    },
    onEmpty: root => {
      // creatComponent(Empty, root.get<HTMLElement>()!);
    },
    onClick: (root, {key, name}) => {
      console.log("mention click:", key, "-", name)
    },
    onMouseEnter: (layout, {name}) => {
      creatComponent(MentionHover, layout.get(), {name})
    }
  },
  [Fontsize.pluginName]: {
    //配置粘贴后需要过滤的字体大小
    filter: fontSize => {
      return (
        [
          "12px",
          "13px",
          "14px",
          "15px",
          "16px",
          "19px",
          "22px",
          "24px",
          "29px",
          "32px",
          "40px",
          "48px"
        ].indexOf(fontSize) > -1
      )
    }
  },
  [Fontfamily.pluginName]: {
    //配置粘贴后需要过滤的字体
    filter: fontfamily => {
      const item = fontFamilyDefaultData.find(item =>
        fontfamily
          .split(",")
          .some(
            name =>
              item.value
                .toLowerCase()
                .indexOf(name.replace(/"/, "").toLowerCase()) > -1
          )
      )
      return item ? item.value : false
    }
  },
  [LineHeight.pluginName]: {
    //配置粘贴后需要过滤的行高
    filter: lineHeight => {
      if (lineHeight === "14px") return "1"
      if (lineHeight === "16px") return "1.15"
      if (lineHeight === "21px") return "1.5"
      if (lineHeight === "28px") return "2"
      if (lineHeight === "35px") return "2.5"
      if (lineHeight === "42px") return "3"
      // 不满足条件就移除掉
      return ["1", "1.15", "1.5", "2", "2.5", "3"].indexOf(lineHeight) > -1
    }
  }
}
