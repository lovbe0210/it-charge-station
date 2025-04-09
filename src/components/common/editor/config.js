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
import Image, {ImageComponent, ImageUploader} from "./packages/image/src"
// import Image, {ImageComponent, ImageUploader} from "@aomao/plugin-image"
// import Table, {TableComponent} from "@aomao/plugin-table"
import Table, {TableComponent} from "./packages/table"
import File, {FileComponent, FileUploader} from "@aomao/plugin-file"
// import File, {FileComponent, FileUploader} from "./packages/file/src/index"
import Video, {VideoComponent, VideoUploader} from "@aomao/plugin-video"
// import Video, {VideoComponent, VideoUploader} from "./packages/video/src/index"
// import Math, {MathComponent} from "@aomao/plugin-math"
import Math, {MathComponent} from "./packages/math/src"
import Fontfamily from "@aomao/plugin-fontfamily"
import Status, {StatusComponent} from "@aomao/plugin-status"
import LineHeight from "@aomao/plugin-line-height"
// import Mention, {MentionComponent} from "@aomao/plugin-mention"
import {fontFamilyDefaultData, ToolbarPlugin, ToolbarComponent} from "./packages/toolbar/src"
import Link from "./packages/link/index"
// import CodeBlock, {CodeBlockComponent} from "./packages/codeblock/src"
import CodeBlock, { CodeBlockComponent } from "am-editor-codeblock-vue2";
import Lightblock, {LightblockComponent} from "./packages/lightblock/src";

const FILE_PREFIX = "/oss";
const FILE_SERVICE = "https://www.10020210.xyz";

const DOMAIN = "/api/cpt";

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
  Tasklist
]

export const domainPlugins = [
  Fontsize,
  Bold,
  Redo,
  Undo,
  Image,
  ImageUploader,
  Table,
  Status,
  Backcolor,
  Fontcolor,
  Link,
  Indent,
  Alignment,
  Tasklist,
  Orderedlist,
  Unorderedlist,
  Lightblock
]

export const ramblyCards = [
  CheckboxComponent,
  ImageComponent,
  FileComponent,
  StatusComponent,
  ToolbarComponent
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
  CodeBlockComponent,
  ToolbarComponent,
  LightblockComponent
]

export const pluginConfig = {

  [Italic.pluginName]: {
    // 默认为 _ 下划线，这里修改为单个 * 号
    markdown: "*"
  },
  [Table.pluginName]: {
    enableScroll: true
  },
  [Image.pluginName]: {
    // maxHeight: 300
  },
  [ImageUploader.pluginName]: {
    //图片上传
    file: {
      action: `${DOMAIN}/content/upload/file`
    },
    //添加外网图片连接上传,上后端下载图片，并返回一个本地连接,比如图片复制
    remote: {
      action: `${DOMAIN}/content/upload/url`
    },
    isRemote: src => src.indexOf(DOMAIN) < 0,
    parse: response => {
      return {
        result: response.result,
        data: response.result ? (FILE_PREFIX + response.data) : response.message
      }
    }
  },
  [FileUploader.pluginName]: {
    action: `${DOMAIN}/content/upload/file`,
    limitSize: 1024 * 1024 * 20,
    //添加外网图片连接上传,上后端下载图片，并返回一个本地连接,比如图片复制
    remote: {
      action: `${DOMAIN}/content/upload/url`
    },
    isRemote: src => src.indexOf(DOMAIN) < 0,
    parse: response => {
      return {
        result: response.result,
        data: {
          url: FILE_PREFIX + response.data,
          preview: FILE_SERVICE + FILE_PREFIX + response.data,
          download: FILE_SERVICE + FILE_PREFIX + response.data
        }
      }
    }
  },
  [VideoUploader.pluginName]: {
    action: `${DOMAIN}/content/upload/file`,
    limitSize: 1024 * 1024 * 50,
    //添加外网图片连接上传,上后端下载图片，并返回一个本地连接,比如图片复制
    remote: {
      action: `${DOMAIN}/content/upload/url`
    },
    isRemote: src => src.indexOf(DOMAIN) < 0,
    parse: response => {
      return {
        result: response.result,
        data: {
          url: FILE_SERVICE + FILE_PREFIX + response.data
        }
      }
    }
  },
  [Math.pluginName]: {
    action: `${DOMAIN}/content/math`,
    parse: response => {
      return {
        result: response.result,
        data: response.result ? response.data : response.message
      }
    }
  },
  [Fontsize.pluginName]: {
    //配置粘贴后需要过滤的字体大小
    defaultSize: '15px',
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
