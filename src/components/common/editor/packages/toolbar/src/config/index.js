import Vue from "vue";
import TableSelector from "../components/table.vue";
import fontfamily, {defaultData as fontFamilyDefaultData} from "./fontfamily";
import "./index.css";

export {fontfamily, fontFamilyDefaultData}

export const getToolbarDefaultConfig = (engine) => {
  const language = engine.language.get("toolbar");
  return [
    {
      type: "collapse",
      header: language.collapse.title,
      icon: "collapse",
      groups: [
        {
          items: [
            {
              name: "image-uploader",
              icon: `<span class="iconfont upload-image"></span>`,
              title: language.image.title,
              search: "图片,tupian,image,img"
            },
            {
              name: "codeblock",
              icon: `<span class="iconfont code-block"></span>`,
              title: language.codeblock.title,
              search: "代码块,daimakuai,code"
            },
            {
              name: "table",
              command: {name: "table", args: [3, 3]},
              placement: "rightTop",
              onDisabled: () => {
                // 有激活卡片 或者没有启用插件
                return (
                  !!engine.card.active || !engine.command.queryEnabled("table")
                );
              },
              prompt: !!engine.card.active || !engine.command.queryEnabled("table")
                ? undefined : (props) => {
                  return new Vue().$createElement(TableSelector, {
                    props: {
                      onSelect: (event, rows, cols) => {
                        if (props.onClick) props.onClick(event, 'table');
                        engine.command.execute("table", rows, cols);
                      }
                    }
                  });
                },
              icon: `<span class="iconfont i-table"></span>`,
              title: language.table.title,
              search: "biaoge,table"
            },
            {
              name: "status",
              icon: `<span class="iconfont i-status"></span>`,
              title: language.status.title,
              search: "status,label,状态"
            },
            {
              name: "lightblock",
              icon: `<span class="iconfont high-light"></span>`,
              title: language.lightblock?.title || '高亮块',
              search: "highLight,highlight,light,高亮块"
            },
            {
              name: "file-uploader",
              icon: `<span class="iconfont attachment"></span>`,
              title: language.file.title,
              search: "附件,文件,fujian,wenjian,file"
            },
            {
              name: "video-uploader",
              icon: `<span class="iconfont media"></span>`,
              title: language.video.title,
              search: "视频,MP4,shipin,video"
            },
            {
              name: "math",
              icon: `<span class="iconfont formula"></span>`,
              title: language.math.title,
              search: "公式,数学公式,gongshi,formula,math,latex"
            }

          ]
        }
      ]
    },
    {
      type: "button",
      name: "undo",
      icon: "undo",
      title: language.undo.title,
      onDisabled: () => {
        return (
          !engine.command.queryState("undo") ||
          !engine.command.queryEnabled("undo")
        );
      },
      onActive: () => false
    },
    {
      type: "button",
      name: "redo",
      icon: "redo",
      title: language.redo.title,
      onDisabled: () => {
        return (
          !engine.command.queryState("redo") ||
          !engine.command.queryEnabled("redo")
        );
      },
      onActive: () => false
    },
    {
      type: "button",
      name: "paintformat",
      icon: "paintformat",
      title: language.paintformat.title
    },
    {
      type: "button",
      name: "removeformat",
      icon: "clean",
      title: language.removeformat.title
    },
    {
      type: "dropdown",
      name: "heading",
      className: "toolbar-dropdown-heading",
      title: language.heading.title,
      items: [
        {
          key: "p",
          className: "heading-item-p",
          content: language.heading.p
        },
        {
          key: "h1",
          className: "heading-item-h1",
          content: language.heading.h1
        },
        {
          key: "h2",
          className: "heading-item-h2",
          content: language.heading.h2
        },
        {
          key: "h3",
          className: "heading-item-h3",
          content: language.heading.h3
        },
        {
          key: "h4",
          className: "heading-item-h4",
          content: language.heading.h4
        },
        {
          key: "h5",
          className: "heading-item-h5",
          content: language.heading.h5
        },
        {
          key: "h6",
          className: "heading-item-h6",
          content: language.heading.h6
        }
      ]
    },
    {
      type: "dropdown",
      name: "fontsize",
      className: "toolbar-dropdown-fontsize",
      title: language.fontsize.title,
      items: [
        {key: "12px", content: "12px", hotkey: false},
        {key: "13px", content: "13px", hotkey: false},
        {key: "14px", content: "14px", hotkey: false},
        {key: "15px", content: "15px", hotkey: false},
        {key: "16px", content: "16px", hotkey: false},
        {key: "19px", content: "19px", hotkey: false},
        {key: "22px", content: "22px", hotkey: false},
        {key: "24px", content: "24px", hotkey: false},
        {key: "29px", content: "29px", hotkey: false},
        {key: "32px", content: "32px", hotkey: false},
        {key: "40px", content: "40px", hotkey: false},
        {key: "48px", content: "48px", hotkey: false}
      ].map((item) =>
        item.key === engine.container.css("font-size")
          ? {...item, isDefault: true}
          : item
      ),
      onDisabled: () => {
        const tag = engine.command.queryState("heading") || "p";
        return /^h\d$/.test(tag) || !engine.command.queryEnabled("fontsize");
      }
    },
    {
      type: "dropdown",
      name: "fontfamily",
      className: "toolbar-dropdown-fontfamily",
      title: language.fontfamily.title,
      items: fontfamily(fontFamilyDefaultData, {
        ...(language.fontfamily.items),
        notInstalled: language.fontfamily.notInstalled
      }),
      onActive: (items) => {
        const values = engine.command.queryState("fontfamily");
        if (!values || !Array.isArray(values) || values.length === 0) return "";
        const familys = values[0]
          .split(",")
          .map((name) => name.replace(/"/g, "").trim().toLowerCase());
        return (items.find((item) =>
          familys.indexOf((item).faimlyName.trim().toLowerCase()) > -1)?.key || "");
      }
    },
    {
      type: "button",
      name: "bold",
      icon: "bold",
      title: language.bold.title,
      onDisabled: () => {
        const tag = engine.command.queryState("heading") || "p";
        return /^h\d$/.test(tag) || !engine.command.queryEnabled("bold");
      }
    },
    {
      type: "button",
      name: "italic",
      icon: "italic",
      title: language.italic.title
    },
    {
      type: "button",
      name: "strikethrough",
      icon: "strikethrough",
      title: language.strikethrough.title
    },
    {
      type: "button",
      name: "underline",
      icon: "underline",
      title: language.underline.title
    },
    {
      type: "dropdown",
      name: "moremark",
      icon: "moremark",
      single: false,
      title: language.moremark.title,
      items: [
        {
          key: "sup",
          icon: "sup",
          content: language.moremark.sup,
          disabled: !engine.command.queryEnabled("sup"),
          command: {name: "sup", args: []}
        },
        {
          key: "sub",
          icon: "sub",
          disabled: !engine.command.queryEnabled("sub"),
          content: language.moremark.sub,
          command: {name: "sub", args: []}
        },
        {
          key: "code",
          icon: "code",
          disabled: !engine.command.queryEnabled("code"),
          content: language.moremark.code,
          command: {name: "code", args: []}
        }
      ],
      onDisabled: () => {
        const plugins = [];
        if (engine.command.queryEnabled("sup") === true) plugins.push("sup");
        if (engine.command.queryEnabled("sub") === true) plugins.push("sub");
        if (engine.command.queryEnabled("code") === true) plugins.push("code");
        return plugins.length === 0;
      },
      onActive: () => {
        const plugins = [];
        if (engine.command.queryState("sup") === true) plugins.push("sup");
        if (engine.command.queryState("sub") === true) plugins.push("sub");
        if (engine.command.queryState("code") === true) plugins.push("code");
        return plugins;
      }
    },
    {
      type: "color",
      name: "fontcolor",
      defaultColor: "#262626",
      defaultActiveColor: "#F5222D",
      buttonTitle: language.fontcolor.title,
      dropdownTitle: language.fontcolor.more,
      content: (color, stroke, disabled) => {
        if (disabled === true) {
          color = "#BFBFBF";
          stroke = "#BFBFBF";
        }
        return `<svg width="17px" height="16px" viewBox="0 0 16 16">
                    <title>color-font</title>
                    <desc>Created with Sketch.</desc>
                    <g id="color-font" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect id="Rectangle-55" stroke=${stroke} stroke-width="0.5" fill=${color} x="2" y="12.75" width="12" height="2.2" rx="0.125"/>
                      <path id="fontcolor-icon" d="M5.29102819,11.25 L3.96365715,11.25 C3.87952002,11.25 3.8113134,11.1817934 3.8113134,11.0976562 C3.8113134,11.08076 3.81412419,11.0639814 3.81963067,11.0480076 L7.0756112,1.60269506 C7.09679504,1.5412426 7.15463644,1.5 7.21963767,1.5 L8.81868806,1.5 C8.883726,1.5 8.94159158,1.54128846 8.96274706,1.60278951 L12.2118,11.048102 C12.239168,11.1276636 12.1968568,11.2143472 12.1172952,11.2417152 C12.1013495,11.2472004 12.0846037,11.25 12.067741,11.25 L10.6761419,11.25 C10.6099165,11.25 10.5512771,11.2072154 10.531066,11.1441494 L9.69970662,8.55 L6.27433466,8.55 L5.43599205,11.1444975 C5.41567115,11.2073865 5.35711879,11.25 5.29102819,11.25 Z M8.02635163,3.18571429 L7.96199183,3.18571429 L6.63904023,7.30714286 L9.33500105,7.30714286 L8.02635163,3.18571429 Z"
                            id="A" fill="#595959"/>
                    </g>
                </svg>`;
      }
    },
    {
      type: "color",
      name: "backcolor",
      defaultColor: "transparent",
      defaultActiveColor: "#FADB14",
      buttonTitle: language.backcolor.title,
      dropdownTitle: language.backcolor.more,
      content: (color, stroke, disabled) => {
        if (disabled === true) {
          color = "#BFBFBF";
          stroke = "#BFBFBF";
        }
        return `<svg width="17px" height="17px" viewBox="0 0 16 16">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect stroke="${stroke}" stroke-width="0.5" fill="${color}" x="2" y="12.75" width="12" height="2.2" rx="0.125"></rect>
                      <g transform="translate(2.781250, 1.375000)" fill-rule="nonzero">
                      <path id="backcolor-icon" fill="#595959" d="M2.86079849,6.64817222 L2.05713835,5.84451208 C2.00832281,5.79569655 2.00832281,5.71655092 2.05713835,5.66773539 L3.61029491,4.11457882 L3.11963835,3.62392225 C3.07082281,3.57510672 3.07082281,3.49596109 3.11963835,3.44714556 L6.47839556,0.0883883476 C6.52721109,0.0395728112 6.60635672,0.0395728112 6.65517225,0.0883883476 L11.5165314,4.94974747 C11.5653469,4.998563 11.5653469,5.07770863 11.5165314,5.12652416 L8.15777416,8.48528137 C8.10895863,8.53409691 8.029813,8.53409691 7.98099747,8.48528137 L7.38889678,7.89318068 L5.83574021,9.44633725 C5.78692467,9.49515278 5.70777905,9.49515278 5.65896351,9.44633725 L5.0267407,8.81411444 L4.48856529,9.35326519 C4.39477378,9.44720966 4.26747335,9.5 4.13472392,9.5 L0.608857988,9.5 C0.470786801,9.5 0.358857988,9.38807119 0.358857988,9.25 C0.358857988,9.18363253 0.385247413,9.11998865 0.432210608,9.07309408 L2.86079849,6.64817222 Z M6.56678391,1.67937861 L4.71062861,3.53553391 L8.06938582,6.89429112 L9.92554112,5.03813582 L6.56678391,1.67937861 Z M3.64812861,5.75612373 L5.74735186,7.85534699 L6.54284699,7.05985186 L4.44362373,4.96062861 L3.64812861,5.75612373 Z" id="Combined-Shape"></path></g></g>
                </svg>`;
      }
    },
    {
      type: "dropdown",
      name:
        "alignment",
      title:
      language.alignment.title,
      items:
        [
          {
            key: "left",
            icon: "align-left",
            content: language.alignment.left
          },
          {
            key: "center",
            icon: "align-center",
            content: language.alignment.center
          },
          {
            key: "right",
            icon: "align-right",
            content: language.alignment.right
          },
          {
            key: "justify",
            icon: "align-justify",
            content: language.alignment.justify
          }
        ]
    },
    {
      type: "button",
      name:
        "unorderedlist",
      icon:
        "unordered-list",
      title:
      language.unorderedlist.title
    },
    {
      type: "button",
      name:
        "orderedlist",
      icon:
        "ordered-list",
      title:
      language.orderedlist.title
    },
    {
      type: "button",
      name:
        "tasklist",
      icon:
        "task-list",
      title:
      language.tasklist.title
    },
    {
      type: "dropdown",
      name:
        "indent",
      icon:
        "indent",
      hasDot:
        false,
      title:
      language.indent.title,
      items:
        [
          {
            key: "in",
            icon: "indent",
            content: language.indent.in
          },
          {
            key: "out",
            icon: "outdent",
            content: language.indent.out
          }
        ]
    },
    {
      type: "dropdown",
      name:
        "line-height",
      content:
        () => `<span class="data-icon data-icon-line-height"></span>`,
      title:
      language["line-height"].title,
      items:
        [
          {
            key: "default",
            content: language["line-height"].default
          },
          {
            key: "1",
            content: "1"
          },
          {
            key: "1.15",
            content: "1.15"
          },
          {
            key: "1.5",
            content: "1.5"
          },
          {
            key: "2",
            content: "2"
          },
          {
            key: "2.5",
            content: "2.5"
          },
          {
            key: "3",
            content: "3"
          }
        ]
    },
    {
      type: "button",
      name:
        "link",
      icon:
        "link",
      command:
        {
          name: "link",
          args:
            ["_blank"]
        },
      title: language.link.title,
      onDisabled:
        () => {
          const {change, card} = engine;
          const range = change.range.get();
          const cardComponent = card.find(range.startNode);
          return (
            (!!cardComponent && !cardComponent.isCursor(range.startNode)) ||
            range.containsCard() ||
            !engine.command.queryEnabled("link")
          );
        }
    },
    {
      type: "button",
      name:
        "quote",
      icon:
        "quote",
      title:
      language.quote.title
    },
    {
      type: "button",
      name:
        "hr",
      icon:
        "hr",
      title:
      language.hr.title
    }
  ];
};
