<template>
  <div class="layout-module_Category adjust">
    <div class="arithmetic-module_header">
      <div v-for="menuTag in categoryMenu"
           :key="menuTag.id"
           @click="activeTag = menuTag.id"
           :class="['tag-menu', 'un-select', menuTag.id === activeTag ? 'active' : '']">
        <span>{{menuTag.name}}</span>
      </div>
    </div>
    <div class="arithmetic-module_list">
      <b-container fluid>
        <recommend></recommend>
      </b-container>
    </div>
  </div>
</template>

<script>
  import Recommend from "./Recommend.vue";
    export default {
      name: "CategoryContainer",
      components: {Recommend},
      data() {
          return {
            categoryType: 'computenetwork',
            tagList: [
              {
                id: 121,
                name: '全部',
                sort: 1
              },
              {
                id: 122,
                name: '计算机基础',
                sort: 2
              },
              {
                id: 123,
                name: '操作系统',
                sort: 3
              },
              {
                id: 126,
                name: '网络安全',
                sort: 4
              }
            ],
            activeTag: 121,
            loading: false,
            showImg: true,
            data: [
              {
                id: '001',
                title: '臻默：整理100+语雀小技巧之后，我们开始了知识管理的大航海大巷哈',
                description: 'https://juejin.cn/post/7343441462644195362 缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了',
                preview: require('@/assets/img/01.jpg'),
                content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                id: '002',
                title: '工作中的23个设计模式',
                description: '从基础的角度看，设计模式是研究类本身或者类与类之间的协作模式，是进行抽象归纳的一个很好的速成思路。后面阅读设计模式后，为了加深理解，对相关图片进行了描绘和微调。从技术的角度已经有很多好的总结，本文会换一种角度思考，既然设计模式研究的是类与类的关系，作为工作的个体，一些工作中的策略是不是也可以进行类比，可以更好地去思考这些模式？答案是肯定的。',
                preview: null,
                content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                id: '003',
                title: '如何正确的提问？',
                description: '上一篇我们提到了为什么问题比答案重要，这一篇我们来说说如何正确的提问。',
                preview: require('@/assets/img/3.jpg'),
                content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                id: '004',
                title: '写作｜《认知觉醒》',
                description: '如果让我用一句话来总结自己快速成长的“秘诀”，那就是：盯着改变去学习。这的确是我这些年快速蜕变的心法，也是我回答很多读者的答案。因为他们常问：你书中提到的那些书，其实很多我都读过，但为什么我读过之后就仅仅是读过，而你不仅能在这么短的时间里发生蜕变，还能写出这样两本书呢',
                preview: require('@/assets/img/04.jpg'),
                content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                id: '005',
                title: '结构性思维——解构问题的基础',
                description: '表达一个态度：思维只是一种思考角度或工具，不要过度解读和神话，一切是为了找到遇到问题更优的解法',
                preview: require('@/assets/img/05.jpg'),
                content: 'This is the content, this is the content, this is the content, this is the content.'
              },
              {
                id: '006',
                title: 'This is title 6',
                description: 'This is description, this is description, this is description.',
                preview: require('@/assets/img/6.jpg'),
                content: 'This is the content, this is the content, this is the content, this is the content.'
              }
            ],
            count: 0
          }
      },
      computed: {
        categoryMenu() {
          switch (this.categoryType) {
            case "computenetwork":
              return [
                {
                  id: 121,
                  name: '全部',
                  sort: 1
                },
                {
                  id: 122,
                  name: '计算机基础',
                  sort: 2
                },
                {
                  id: 123,
                  name: '操作系统',
                  sort: 3
                },
                {
                  id: 126,
                  name: '网络安全',
                  sort: 4
                }
              ];
            case "language":
              return [
                {
                  id: 121,
                  name: '全部',
                  sort: 1
                },
                {
                  id: 122,
                  name: 'C/C++',
                  sort: 2
                },
                {
                  id: 123,
                  name: 'Java',
                  sort: 3
                },
                {
                  id: 126,
                  name: 'Javascript',
                  sort: 4
                },
                {
                  id: 124,
                  name: 'Python',
                  sort: 4
                },
                {
                  id: 125,
                  name: 'Golang',
                  sort: 5
                }
              ];
            case "database":
              return [
                {
                  id: 121,
                  name: '全部',
                  sort: 1
                },
                {
                  id: 122,
                  name: 'Mysql',
                  sort: 2
                },
                {
                  id: 123,
                  name: 'Oracle',
                  sort: 3
                },
                {
                  id: 124,
                  name: 'HBase',
                  sort: 4
                },
                {
                  id: 125,
                  name: 'Mongodb',
                  sort: 5
                },
                {
                  id: 126,
                  name: 'Redis',
                  sort: 6
                },
                {
                  id: 127,
                  name: 'SQLite',
                  sort: 7
                },
                {
                  id: 128,
                  name: 'Elasticsearch',
                  sort: 8
                }
              ];
            case "middleware":
              return [
                {
                  id: 121,
                  name: '全部',
                  sort: 1
                },
                {
                  id: 122,
                  name: 'Nginx',
                  sort: 2
                },
                {
                  id: 123,
                  name: 'Tomcat',
                  sort: 3
                },
                {
                  id: 126,
                  name: 'Redis',
                  sort: 4
                },
                {
                  id: 124,
                  name: 'RabbitMQ',
                  sort: 4
                },
                {
                  id: 125,
                  name: 'Kafka',
                  sort: 5
                }
              ];
            case "arithmetic":
              return [
                {
                  id: 121,
                  name: '全部',
                  sort: 1
                },
                {
                  id: 122,
                  name: '数据结构',
                  sort: 2
                },
                {
                  id: 123,
                  name: '算法思想',
                  sort: 3
                },
                {
                  id: 124,
                  name: '力扣题解',
                  sort: 4
                },
                {
                  id: 125,
                  name: '剑指offer',
                  sort: 5
                }
              ];
            default:
                return [
                  {
                    id: 121,
                    name: '全部',
                    sort: 1
                  }
                ];
          }
        }
      },
      methods: {
        loadMore() {
          for (let i = 0, j = 10; i < j; i++) {
            this.data.push(
              {
                id: '00' + (this.data.length + 1),
                title: 'This is title ' + '00' + this.data.length,
                description: this.data.length % 2 === 0 ? '我是偶数title @~@' : '我是奇数title @…@',
                preview: require('@/assets/img/' + Math.ceil(Math.random() * 31) + '.jpg'),
                content: this.data.length % 2 === 0 ? '我是偶数content @~@' : '我是偶数content @…@'
              }
            );
            this.count++;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../css/common-var.less";

  .layout-module_Category {

    .arithmetic-module_header {
      font-size: 14px;
      height: 32px;
      padding: 0 7px;
      line-height: 32px;

      .tag-menu {
        display: inline-block;
        max-width: 99px;
        line-height: 14px;
        border-radius: 4px;
        padding: 8px 10px;
        margin-right: 16px;

        span{
          cursor: pointer;
          color: var(--font-color);

          &:hover {
            font-weight: 600;
            color: var(--title-color);
          }
        }
      }

      .active {
        font-weight: 600;
        background-color: var(--dropdown-bg-color);
      }
    }

    .arithmetic-module_list {
      margin-top: 30px;
    }
  }

  // 定义行高
  @line-height: 127.61px;
  .container {
    .list-group {
      .row {
        margin: 0;
      }

      .item {
        margin-bottom: 25px;

        height: @line-height;

        .text {
          width: auto;
          padding: 0 15px 0 12px;
        }

        .preview-image {
          padding: 0 5px 0 10px;

          .img-fluid {
            width: 100%;
            height: auto;
            height: @line-height;
            overflow: hidden;
            transform: translateY(0);
            border-radius: 16px;
          }
        }

        .title {
          margin-bottom: 14px;

          :hover {
            color: var(--title-color);
          }

          span {
            color: var(--font-color);
            font-weight: 600;
            font-size: 16px;
            line-height: 25px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .description {
          width: auto;
          height: 45px;
          margin-bottom: 5px;

          span {
            color: var(--title-color);
            margin-top: 8px;
            display: -webkit-box;
            max-height: 44px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 22px;
            height: 44px;
          }
        }

        .item-icons {
          margin: 0;
          font-size: 13px;
          color: var(--font-color);
          display: flex;
          align-items: center;

          .from {
            position: absolute;
            right:0;
            padding-top: 2px;
            padding-right: 17px;
            :hover {
              color: var(--font-color);
            }
            span {
              color: var(--font-color);
              font-size: 13px;
            }
          }

          div {
            margin-right: 8px;
          }

        }
      }
    }
  }

</style>
