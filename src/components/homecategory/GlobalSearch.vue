<template>
  <div class="layout-module_GlobalSearch adjust" ref="popoverContainer">
    <p class="search-result-title">
      <span>相关用户</span>
      <span class="search-result-extend">查看全部</span>
    </p>
    <div class="search-result-suggestions">
      <div class="suggestions-item-user" v-for="item in suggestUsers" :key="item.userId">
        <user-card class="item-avatar"
                   :userInfo="item"
                   :popoverContainer="popoverContainer">
          <slot>
            <b-avatar
              :src="item.avatar"
              size="2.8rem"
              class="avatar"
              :to="'/' + item.domain">
              <span v-if="!item.avatar">{{item.username}}</span>
            </b-avatar>
          </slot>
        </user-card>
        <div class="item-userInfo">
          <user-card :userInfo="item" :popoverContainer="popoverContainer">
            <slot>
              <a class="item-userName" :href="'/' + item.domain" target="_blank">
                <span v-html="item.usernameShow"></span>
              </a>
            </slot>
          </user-card>
          <div class="item-social">
                <span class="index-module_meta">
                  <span class="iconfont location"></span>
                  <span>{{item.location ? item.location : '未填写'}}</span>
                </span>
            <span class="index-module_meta">
                  <span class="iconfont industry"></span>
                  <span>{{item.industry ? item.industry : '未填写'}}</span>
                </span>
          </div>
        </div>
      </div>
    </div>
    <p class="search-result-title">
      <span>相关专栏</span>
      <span class="search-result-extend">查看全部</span>
    </p>
    <div class="search-result-suggestions">
      <div class="suggestions-item-column" v-for="item in suggestColumns" :key="item.userId">
        <span class="iconfont series-column"></span>
        <div class="item-columnInfo">
          <h3 class="item-title">
            <a :href="'/column/' + item.uid" target="_blank" :title="item.titleShow">
              <span v-html="item.title"></span>
            </a>
          </h3>
          <p class="item-abstract">{{item.describe}}</p>
          <b-link :to="'/' + item.userInfo.domain" class="item-belong">
            {{item.userInfo.username}}
          </b-link>
        </div>
      </div>
    </div>
    <p class="search-result-title">相关内容</p>
    <div class="suggestions-article-list">
      <div class="suggestions-article-item" v-for="item in suggestArticles" :key="item.id">
        <div class="article-loading">
          <div class="article-item-container">
            <span class="iconfont article"/>
            <div class="article-item-info">
              <h3 class="article-item-title">
                <a :href="(item.columnId ? ('/column/' + item.columnId + '/') : '/article/') + item.id"
                   v-html="item.title"
                   target="_blank">
                </a>
              </h3>
              <p class="article-item-abstract" v-html="item.abstract">
              </p>
              <p class="article-item-belongInfo">
                <b-link :to="'/' + item.domain">
                  我爱吃麻辣锅
                </b-link>
                <span>
                  <span> / </span>
                  <a target="_blank" href="/yuqueyonghueinxs9/eecol8">小说词语积累库</a>
                </span>
                <span class="article-item-date">2024-02-12 13:21:45</span>
              </p>
            </div>
          </div>
        </div>
        <div class="article-footer">
          <div class="Pagination-module_wrapper_uz+DL">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from "@/components/common/UserCard.vue";

  export default {
    name: "GlobalSearch",
    data() {
      return {
        keywords: '',
        popoverContainer: null,
        // 搜索结果-用户
        suggestUsers: [
          {
            userId: 112,
            usernameShow: '闪魔亮<span style="color: red;">晶晶</span>',
            username: '闪魔亮晶晶',
            avatar: require('@/assets/avatar/16.png'),
            domain: 'lovbe0210',
            location: '四川成都',
            industry: '新时代农民工'
          },
          {
            userId: 113,
            usernameShow: '山野寻<span style="color: red;">雾灯</span>',
            username: '山野寻雾灯',
            avatar: require('@/assets/avatar/15.jpg'),
            domain: 'lovbe0211',
            location: '四川成都',
            industry: '新时代农民工'
          },
          {
            userId: 114,
            usernameShow: 'AbnerPei',
            username: 'AbnerPei',
            avatar: require('@/assets/avatar/14.jpg'),
            domain: 'lovbe0212',
            location: '',
            industry: ''
          }
        ],
        // 搜索结果-专栏
        suggestColumns: [
          {
            uid: "001",
            titleShow: 'Java开发技术手册',
            title: 'Java<span style="color: red;">开发</span>技术手册',
            describe: "个人学习、工作常用知识或工作遇到问题的小记",
            userInfo: {
              userId: 112,
              domain: 'lovesdfsd',
              username: '闪魔亮晶晶'
            }
          },
          {
            uid: "002",
            titleShow: '开发精品文章',
            title: '开发精品<span style="color: red;">文章</span>',
            describe: "该知识库用于收藏平常遇到过的一些关于技术的文章（涵盖前端与后端）",
            userInfo: {
              userId: 113,
              domain: 'lovesdfsd',
              username: 'whalexplorer'
            }
          },
          {
            uid: "003",
            title: "Linux 系统环境部署大飒飒大啊实打实多",
            describe: "讲解 Linux 系统部署 Java 项目需要的环境",
            userInfo: {
              userId: 114,
              domain: 'lovesdfsd',
              username: 'whalexplorer'
            }
          }
        ],
        // 搜索结果-文章
        suggestArticles: [
          {
            "id": 81952157,
            "title": '<span style="color: red;">花</span>的<span style="color: red;">花</span>语',
            "abstract": '玫瑰：爱情 含笑：矜持、含蓄、美丽、庄重、纯洁、高洁、端庄 红色的鸢尾花：热情 黄色的鸢尾花：友谊 蓝色的鸢尾花：赞美他人素雅大气 紫色的鸢尾花：爱意与吉祥 喷雪花：纯洁、祝福、坚定和友谊 木棉花：珍惜眼前、英雄、火红的爱情 二月兰：无私奉献、谦虚礼让和纯真质朴 连翘：预言 禾雀<span style="color: red;">花</span>：欢乐、欢快、脱俗的爱 合欢花：永远恩爱 山茱萸：报答、感谢，彼此相爱 白玉兰：高尚、纯洁和感恩 西府海棠：单恋、美丽、娴静 四照<span style="color: red;">花</span>：永恒，请接收我的思念，回礼 六出花：喜悦 山茶花：谦让 山楂<span style="color: red;">花</span>：守护唯一的爱 泡桐：永远的守候 苦棟<span style="color: red;">花</span>：温暖的笑容 美女樱：相守、和睦家庭，锦上添花 波斯菊：纯洁的心、多情、坚强 乒乓菊',
            "columnName": "小说词语积累库",
            "username": "我爱吃麻辣锅",
            "uid": 81952157,
            "columnId": "qax6ib",
            "domain": "/yuqueyonghueinxs9"
          },
          {
            "abstract": '没有就点添加去关联（小程序管理员微信扫码） 23 微信提现，要运营账户有钱才行，基础账户有钱不行 24 <span style="color: red;">花</span>推推 所有订单相关的全部都是展示的近6个月的，包括 后台显示，前端显示以及自定义时间去搜索的话，都是只能看到近6个月的订单 25 会员有了订单或粉丝或上级的情况下，就无法再更改上级了',
            "columnName": "问题统计",
            "username": "挖券wqwq",
            "id": 90662351,
            "uid": 1,
            "columnId": "nugmp6",
            "title": '<span style="color: red;">花</span>推推',
            "domain": "/waquanwqwq"
          },
          {
            "abstract": '（难以准确定位） 正是因为这两种反汇编的规格和缺陷机制，所以才导致了会有<span style="color: red;">花</span>指令的诞生。 ida是线性扫描，动调的时候能f4跳过循环就是这个道理，正是因为线性导致程序结构混乱的时候会无法反编译 <span style="color: red;">花</span>指令简单的说就是在代码中混入一些垃圾数据阻碍你的静态分析 要么可执行不改变值，要么反汇编后为jumpout(xxxxx)，需要在上面用跳转跳过这些<span style="color: red;">花</span>指令才能保证程序的正常运行。 经验总结 无法反编译一方面是因为结构过于复杂，一方面是由于<span style="color: red;">花</span>指令。',
            "columnName": "CTF知识库",
            "username": "j1ya",
            "id": 132900118,
            "uid": 1,
            "columnId": "lspbgps3p8sns0az",
            "title": '<span style="color: red;">花</span>指令',
            "type": "Doc",
            "domain": "/u34082223"
          },
          {
            "abstract": '<span style="color: red;">花</span> 梅花 无<em>花柄</em>、<span style="color: red;">花</span>圆形、<span style="color: red;">花</span>落后长叶 桃花 短<em>花柄</em>、<span style="color: red;">花</span>尖形 杏花 短<em>花柄</em>、萼后翻 樱花 长<em>花柄</em>、<span style="color: red;">花</span>心形 李<span style="color: red;">花</span> 长<em>花柄</em>、<span style="color: red;">花</span>小叶子小、<em>花瓣</em>之间有缝、李药黄 梨花 长<em>花柄</em>、<span style="color: red;">花</span>大叶子大、梨药红 参考： https://www.gzstv.com/a/7aba1e16526640c59214c5b56873483c https://www.xiaohongshu.com/explore/65f03c100000000012037977',
            "columnName": "花窝",
            "username": "花似",
            "id": 164383941,
            "uid": 1,
            "columnId": "rhiohkt7du7h0vgq",
            "title": '<span style="color: red;">花</span>',
            "type": "Doc",
            "domain": "/emanon"
          },
          {
            "abstract": 'B站视频的跟练 【<em>花瓣</em>很多看起来很复杂的<span style="color: red;">花</span>怎么画，试试这个方法吧-哔哩哔哩】 https://b23.tv/djPArfv 看视频的时候没觉得有什么特别不合理的，结果画完了感觉有的像树莓哇… 这类画风其实还算比较好把握的，关键是得会调画笔会阿尔法锁定，这样可以规避相当多的运笔问题。',
            "columnName": "🏝️ slhmy 的花园",
            "username": "slhmy",
            "id": 165617376,
            "uid": 1,
            "columnId": "dybbr7w6uugt1gqu",
            "title": '画了一簇<span style="color: red;">花</span>？',
            "type": "Doc",
            "domain": "/slhmy-zzy"
          },
          {
            "abstract": '<span style="color: red;">花</span>的艺术，人说，那种<em>花瓣</em>的脉络，那种线条纹路，是<span style="color: red;">花</span>的生命线，是给<span style="color: red;">花</span>输送营养水分的管道，<span style="color: red;">花</span>的鲜艳和饱满，正是通过这些脉络得以生长和维持，这些脉络，正是美的支持者，也是记录者，<span style="color: red;">花</span>的美也是通过脉络得以呈现。没有这些管道，也就没有<span style="color: red;">花</span>的最美时刻。当然还有枝干、叶子，是整体，孕育了<span style="color: red;">花</span>的美，这是<span style="color: red;">花</span>的艺术。 这类材料艺术，也有人用叶子去做，也有人用火药做烟火，也有别的，靠人去发现创建。 过去很多是复刻，是印刷，是摄影，是事物的投射，其实材料本身就是记录，材料本身就是艺术。人也是嘛，人也很美的，发展出了直立形体与美观，而且有文明性，有人的设计之美，打扮嘛，不只是自然之美。',
            "columnName": "文集",
            "username": "百一",
            "id": 142569045,
            "uid": 1,
            "columnId": "hmzvaag5u8u6btri",
            "title": '<span style="color: red;">花</span>的艺术',
            "type": "Doc",
            "domain": "/lianmt"
          },
          {
            "abstract": '（<em>花名册</em>的人员必须要录进系统，不然后期在系统中给每个工人记工是无法选择到人员的） 1. 操作流程 1. 新增 进入“劳务管理”-“<em>花名册</em>”，点击右上角的“新增<em>花名册</em>”按钮，创建人员（如下图）； 点击‘新增班组’，创建每个项目上面的班组，并且给每个人员编辑班组。 1.1 新增<em>花名册</em> 填写完<em>花名册</em>人员基本信息即可直接点击右上角‘保存’。 保存后的人员可以在<em>花名册</em>报表里面查看 注意：<em>花名册</em>里面的人员在系统中存在工时和账款的往来是无法进行删除 1.3 新增班组 点击‘新增班组’可以进行人员分组。',
            "columnName": "匠员外 - 操作手册",
            "username": "无欲则刚",
            "id": 51602177,
            "uid": 1,
            "columnId": "wc4z0n",
            "title": '<span style="color: red;">花</span>名册',
            "type": "Doc",
            "domain": "/wuyuzegang-uksyn"
          },
          {
            "abstract": '各位小伙伴好， 【<em>花名册</em>】模块已上线，底层数据为EHR中的职员信息，但与EHR查询/显示界面不同。 <em>花名册</em>模块各项功能将在未来逐步上线，替换现有EHR的所有使用功能，查询更加快速便捷，数据展示合理，操作简单直观，敬请期待！ 目前<em>花名册</em>模块的功能还仅限于查询和导出职员信息，如需相关人事操作（入离调转、修改职员信息）仍需在EHR中实现。 一、筛选 <em>花名册</em>首页如图所示，下面将逐个按钮向大家说明使用方式及功能。 【显示表头配置】此处编辑的为<em>花名册</em>模块中显示的表头，此处无论选择什么表头，导出都是完整的职员信息。',
            "columnName": "人力资源中心知识文档",
            "username": "祭司",
            "id": 133498953,
            "uid": 1,
            "columnId": "cy8rxx2dlzdlqrf3",
            "title": '<span style="color: red;">花</span>名册使用说明',
            "type": "Doc",
            "domain": "/u1171822"
          },
          {
            "abstract": '（添加<span style="color: red;">花</span>字只针对于非自己上传封面的情况。） 步骤一 首先进入到视频发布页面，找到“编辑封面”的按钮点进去。 步骤二 进入编辑封面的页面，我们可以先在自定义选图或智能选图中选择出色的一帧作为封面图。选完了之后，就可以在封面上添加<span style="color: red;">花</span>字啦。 步骤三 如上图所示，我们在添加<span style="color: red;">花</span>字这一栏中可任意选择<span style="color: red;">花</span>字样式，左键点击，输入内容即可在封面上显示。 <span style="color: red;">花</span>字的大小、位置均可调节。 取消/更换<span style="color: red;">花</span>字 想取消<span style="color: red;">花</span>字时，点击这个“禁符号”，所选<span style="color: red;">花</span>字就会取消。 更换<span style="color: red;">花</span>字只需左键点击其他<span style="color: red;">花</span>字即可。 另外，<span style="color: red;">花</span>字只能添加一个，再选择其他款式时原有的<span style="color: red;">花</span>字就会被替代。',
            "columnName": "工业视频商家白皮书",
            "username": "1688工业品商家白皮书",
            "id": 133653814,
            "uid": 1,
            "columnId": "bz0pdprikrtgpbry",
            "title": '<span style="color: red;">花</span>字教程',
            "type": "Doc",
            "domain": "/fbv3ue"
          },
          {
            "abstract": '📎04d5b860ab102a1a1a01f4dbcd3bf609.mp4📎c683b4ce473862e285294034feb87dfe.mp4',
            "columnName": "副业搞钱 好玩的、杂七杂八",
            "username": "小可耐教你学RPA",
            "id": 135722690,
            "uid": 1,
            "columnId": "du6g1g83468933dk",
            "title": '<span style="color: red;">花</span>小鸽',
            "type": "Doc",
            "domain": "/pengzhiqiang999"
          },
          {
            "abstract": '以下是脱不<span style="color: red;">花</span>亲测有效的合规礼物清单，供沟通训练营同学们根据自己的业务和客户情况选择： 一份合规的商务礼品价格应该在200元以内。超过此金额，对客户和咱们本人都有风险，谨慎决策。更何况，预算太高，难以承受。 如果咱们自己的公司有一定的行业影响力，最佳送礼方案是把送礼变成颁奖。比如，到年底给客户颁发一个“年度最佳合作伙伴奖”。一个奖杯、一本证书，<em>花钱</em>不多但也是个荣誉。客户拿回自己单位，也是个成绩。 现在最受欢迎的礼物是消耗品，比如办公室一定用得上的茶叶、咖啡等等。但是这类礼物最好能和你的特长结合起来，给人留下不一样的印象。',
            "columnName": "📒徐不凡的笔记",
            "username": "徐不凡",
            "id": 97109166,
            "uid": 1,
            "columnId": "goxvxg",
            "title": '脱不<span style="color: red;">花</span>：适合送给客户的合规礼物清单',
            "type": "Doc",
            "domain": "/tinanie"
          },
          {
            "abstract": '2023/12月份、2024/1月份「🌼总有一些想写下来的，每一段经历都有它存在的意义。」2023-12-31 周日早上七点半起床，跟杨红杰哥集合，准备好各种物资后就出发~小小梧桐山拿捏🤏，没记错的话路线是：登云梯~电视塔~大梧桐~秀桐道下山。2023的最后一天圆满爬完大小梧桐给今年画上了...',
            "columnName": "📝新✨记",
            "username": "Ah新",
            "id": 157642138,
            "uid": 1,
            "columnId": "afoz1nmkxm8uenq4",
            "title": '没有一朵<span style="color: red;">花</span> 一开始就是<span style="color: red;">花</span>｜2024年1月小结',
            "type": "Doc",
            "domain": "/ahxin"
          },
          {
            "abstract": '1.1新增 进入App点击<em>花名册</em>，点击右上角‘新增’。填好编码，姓名，班组即可（*号为必填项），填写完成后提交即可。',
            "columnName": "匠员外 - 操作手册",
            "username": "无欲则刚",
            "id": 85050255,
            "uid": 1,
            "columnId": "pgol00",
            "title": '<span style="color: red;">花</span>名册',
            "type": "Doc",
            "domain": "/wuyuzegang-uksyn"
          },
          {
            "abstract": '下方附有 软件下载链接 和 注册 续费步骤 新手注意 仔细 观看 注册方式 续费方式------------------------------------------------ 小雪<span style="color: red;">花</span>下载地址 抖音/快手 https://wwnw.lanzouo.com/b03q0wupc 教程地址 https://www.yuque.com/ygo9bf/fv8bbg/abc 视频号版本下载地址 https://wwnw.lanzouo.com/b03q17bdc 教程地址 https://www.yuque.com/ygo9bf/rg10ri/sp',
            "columnName": "店小龙科技软件使用大全",
            "username": "店小龙店群软件",
            "id": 149647234,
            "uid": 1,
            "columnId": "pck19utsko1tb7cs",
            "title": '【小雪<span style="color: red;">花</span>新手操作步骤】',
            "type": "Doc",
            "domain": "/dianshangquanyazilong-mmojc"
          },
          {
            "abstract": '<em>花名册</em>列表 问题描述 备注 1. 提示条上下间距调整为：24px 2. 列表中，姓名和标签的间距调整为：8px 3. Tab切换下面多了一条线 <em>花名册</em>-导入 问题描述 备注 1. 导入模版和导入按钮移到右上角 2. 提示条上下左右的间距调整为：24px，并加上提示icon，参考备注 <em>花名册</em>-详情 问题描述 备注 1. 基础信息、银行卡信息、合同信息内容文字颜色：字段：000000，65%，内容：000000，85%（左侧为字段，右侧为内容） 新增证书 问题描述 备注 1. 内容居中 用公信用评价 问题描述 备注 1.',
            "columnName": "链建",
            "username": "宁佳佳",
            "id": 137210800,
            "uid": 1,
            "columnId": "kon4k3ob2wu8glce",
            "title": '<span style="color: red;">花</span>名册',
            "type": "Doc",
            "domain": "/ningjiajia"
          },
          {
            "abstract": '“翠雀鸟挂在枝头便成了翠雀<span style="color: red;">花</span>，蓝色翠雀<span style="color: red;">花</span>的<em>花语</em>是犹豫不决。你蓝色的外表，似乎成了你踌躇不前的借口，但这并不是她为你取为翠雀的理由。清静、轻盈、正义和自由。这是你所拥有的，也是她所想让你铭记的。” 翠雀没有说话，只是淡淡的蓝色光芒自她身上开始发出，一点一点，慢慢的，荧火成为了火种，火种成为了火苗，然后成为了光，驱散了整片空间的黑暗。 “蓝色是幸运色，这是翠雀<span style="color: red;">花</span>最美丽的颜色，她始终被飞鸟们所围绕。这是她予以你的祝福。” “请不要再停留了，稍作休息即可 现在该是你飞翔的时候了，翠雀！” 光芒亮而不刺眼，温暖而舒适，平和而清净，就如同翠雀于人的感受一般 。',
            "columnName": "下班魔WIKI及同人中心页",
            "username": "Miamasvin",
            "id": 171763548,
            "uid": 1,
            "columnId": "dgkglx969tchp7q7",
            "title": '【未知标题-翠雀】-<span style="color: red;">花</span>哓',
            "type": "Doc",
            "domain": "/morunshi"
          },
          {
            "abstract": '他带我走进充满苦难的天地，拨开赤贫中长大的孩子敏感又懂事的内心，看那因贫穷而被伤害的自尊，因亲情而满怀感恩的善良，因阅读和学习而冲破狭隘的强大...我为书中真实的苦难落泪，更为苦难中开出的生命之<span style="color: red;">花</span>而震撼。 之前在大象放映室看过一期介绍路遥的视频，印象非常深刻。也正是那期视频推着我赶紧把《平凡的世界》补起来。 为了写好这部书，他前期的准备与体验工作就持续了三年。之后把自己关起来制定了苛刻的写作时间表，以自杀式的计划用健康或者可以说是生命完成了这部作品。读到很多作者对不同季节地里山上的细致描绘时我都会感叹他的准备和观察是多么的投入和细致。 但作第一部问世后却反响不好。',
            "columnName": "写写",
            "username": "大哥",
            "id": 146172616,
            "uid": 1,
            "columnId": "yk496ymxvr1u5hl9",
            "title": '平凡世界开出美丽的<span style="color: red;">花</span>',
            "type": "Doc",
            "domain": "/zeroneon"
          },
          {
            "abstract": '刷视频的时候看到了一些公共的玫瑰<span style="color: red;">花</span>盒子，有些艺术家把玫瑰<span style="color: red;">花</span>封在盒子中，需要时候可以拿出来。突然想在有一天给自己买一束<span style="color: red;">花</span>。',
            "columnName": "王淳彧的花园篝火会",
            "username": "王淳彧",
            "id": 134909776,
            "uid": 1,
            "columnId": "vgwbxcov512agg3v",
            "title": '2022.12.04｜给自己买束<span style="color: red;">花</span>',
            "type": "Doc",
            "domain": "/epeiuss"
          }
        ]
      }
    },
    components: {
      UserCard
    },
    created() {
      this.keywords = this.$route.query.k;
    },
    methods: {},
    watch: {
      // 监听路由变化
      $route(to) {
        this.keywords = to.query.k;
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    }
  }
</script>

<style scoped lang="less">
  @import "../css/common-var.less";
  @import "../css/homecategory/global-search.less";
</style>
