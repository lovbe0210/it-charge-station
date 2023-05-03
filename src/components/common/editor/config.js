/**
 * 工具栏配置
 */
// import { PluginEntry, CardEntry, PluginOptions, NodeInterface, EngineInterface } from '@aomao/engine'
//引入插件 begin
import Redo from '@aomao/plugin-redo'
import Undo from '@aomao/plugin-undo'
import Bold from '@aomao/plugin-bold'
import Code from '@aomao/plugin-code'
import Backcolor from '@aomao/plugin-backcolor'
import Fontcolor from '@aomao/plugin-fontcolor'
import Fontsize from '@aomao/plugin-fontsize'
import Italic from '@aomao/plugin-italic'
import Underline from '@aomao/plugin-underline'
import Hr, { HrComponent } from '@aomao/plugin-hr'
import Tasklist, { CheckboxComponent } from '@aomao/plugin-tasklist'
import Orderedlist from '@aomao/plugin-orderedlist'
import Unorderedlist from '@aomao/plugin-unorderedlist'
import Indent from '@aomao/plugin-indent'
import Heading from '@aomao/plugin-heading'
import Strikethrough from '@aomao/plugin-strikethrough'
import Sub from '@aomao/plugin-sub'
import Sup from '@aomao/plugin-sup'
import Alignment from '@aomao/plugin-alignment'
import Quote from '@aomao/plugin-quote'
import PaintFormat from '@aomao/plugin-paintformat'
import RemoveFormat from '@aomao/plugin-removeformat'
import SelectAll from '@aomao/plugin-selectall'
import Image, { ImageComponent, ImageUploader } from '@aomao/plugin-image'
import Table, { TableComponent } from '@aomao/plugin-table'
import File, { FileComponent, FileUploader } from '@aomao/plugin-file'
import Video, { VideoComponent, VideoUploader } from '@aomao/plugin-video'
import Math, { MathComponent } from '@aomao/plugin-math'
import Fontfamily from '@aomao/plugin-fontfamily'
import Status, { StatusComponent } from '@aomao/plugin-status'
import LineHeight from '@aomao/plugin-line-height'
import Mention, { MentionComponent } from '@aomao/plugin-mention'
// import { fontFamilyDefaultData, ToolbarPlugin, ToolbarComponent } from './packages/toolbar/src/index.js'
// import { ToolbarComponent } from './packages/toolbar/src/index.js'
// import Link from './packages/link/src/index.js'
// import CodeBlock, { CodeBlockComponent } from './packages/codeblock/src/index.js'
// import MapPlugin, { MapComponent } from './packages/map/src/index.js'
// import Audio, { AudioComponent, AudioUploader } from './packages/audio/src/index.js'

const DOMAIN = 'http://localhost:7001'

export let plugins = [
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
  // Link,
  // CodeBlock,
  // ToolbarPlugin,
  // MapPlugin,
  Audio
  // AudioUploader,
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
  MentionComponent
  // CodeBlockComponent,
  // ToolbarComponent,
  // MapComponent,
  // AudioComponent,
]

export const pluginConfig = {
  [Italic.pluginName]: {
    // 默认为 _ 下划线，这里修改为单个 * 号
    markdown: '*'
  },
  [Image.pluginName]: {
    onBeforeRender: (status, url) => {
      if (url.startsWith('data:image/')) return url
      return url + `?token=12323`
    }
  },
  [ImageUploader.pluginName]: {
    file: {
      action: `${DOMAIN}/upload/image`, //图片上传
      headers: { Authorization: 213434 }
    },
    remote: {
      action: `${DOMAIN}/upload/image` //添加外网图片连接上传,上后端下载图片，并返回一个本地连接,比如图片复制
    },
    isRemote: (src) => src.indexOf(DOMAIN) < 0
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
  // [AudioUploader.pluginName]: {
  //   action: `${DOMAIN}/upload/video`,
  //   limitSize: 1024 * 1024 * 50,
  // },
  [Math.pluginName]: {
    action: `https://g.yanmao.cc/latex`,
    parse: (res) => {
      if (res.success) {
        return {
          result: true,
          data: res.svg
        }
      }
      return { result: false }
    }
  },
  [Mention.pluginName]: {
    action: `${DOMAIN}/user/search`,
    onLoading: (root) => {
      //const vm = createApp(Loading);
      //vm.mount(root.get<HTMLElement>()!);
    },
    onEmpty: (root) => {
      //const vm = createApp(Empty);
      //vm.mount(root.get<HTMLElement>()!);
    },
    onClick: (
      root,
      { key, name }
    ) => {
      console.log('mention click:', key, '-', name)
    },
    onMouseEnter: (
      layout,
      { name }
    ) => {
      //const vm = createApp(MentionPopover, {
      //   name,
      //});
      //vm.mount(layout.get<HTMLElement>()!);
    }
  },
  [Fontsize.pluginName]: {
    //配置粘贴后需要过滤的字体大小
    filter: (fontSize) => {
      return (
        ['12px',
          '13px',
          '14px',
          '15px',
          '16px',
          '19px',
          '22px',
          '24px',
          '29px',
          '32px',
          '40px',
          '48px'
        ].indexOf(fontSize) > -1
      )
    }
  },
  // [Fontfamily.pluginName]: {
  //   //配置粘贴后需要过滤的字体
  //   filter: (fontfamily) => {
  //     const item = fontFamilyDefaultData.find((item) =>
  //       fontfamily
  //         .split(',')
  //         .some(
  //           (name) =>
  //             item.value
  //               .toLowerCase()
  //               .indexOf(name.replace(/"/, '').toLowerCase()) > -1
  //         )
  //     )
  //     return item ? item.value : false
  //   },
  // },
  [LineHeight.pluginName]: {
    //配置粘贴后需要过滤的行高
    filter: (lineHeight) => {
      if (lineHeight === '14px') return '1'
      if (lineHeight === '16px') return '1.15'
      if (lineHeight === '21px') return '1.5'
      if (lineHeight === '28px') return '2'
      if (lineHeight === '35px') return '2.5'
      if (lineHeight === '42px') return '3'
      // 不满足条件就移除掉
      return ['1', '1.15', '1.5', '2', '2.5', '3'].indexOf(lineHeight) > -1
    }
  }
  // toolbar: {
  //   popup: {
  //     items: [
  //       ['bold', 'strikethrough', 'fontcolor'],
  //       {
  //         icon: 'text',
  //         items: ['italic', 'underline', 'backcolor', 'moremark']
  //       },
  //       [
  //         {
  //           type: 'button',
  //           name: 'image-uploader',
  //           icon: 'image'
  //         },
  //         'link',
  //         'tasklist',
  //         'heading'
  //       ],
  //       {
  //         icon: 'more',
  //         items: [
  //           {
  //             type: 'button',
  //             name: 'video-uploader',
  //             icon: 'video'
  //           },
  //           {
  //             type: 'button',
  //             name: 'file-uploader',
  //             icon: 'attachment'
  //           },
  //           {
  //             type: 'button',
  //             name: 'math',
  //             icon: 'math'
  //           },
  //           {
  //             type: 'button',
  //             name: 'codeblock',
  //             icon: 'codeblock'
  //           },
  //           {
  //             type: 'button',
  //             name: 'orderedlist',
  //             icon: 'ordered-list'
  //           },
  //           {
  //             type: 'button',
  //             name: 'unorderedlist',
  //             icon: 'unordered-list'
  //           },
  //           {
  //             type: 'button',
  //             name: 'hr',
  //             icon: 'hr'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }
}
