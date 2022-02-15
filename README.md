# answer-blog

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
#### 介绍
你身边的知识库，开发思路：模式抄袭CSDN，布局抄袭语雀

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)

#### 为了全局主题对源码CSS做了微调（其实是我菜不知道怎么覆盖这些第三方的CSSヽ(ﾟ∀ﾟ*)ﾉ━ｩ♪）
1. 改动bootstrap.css中的list-group-item组件的背景色，注释掉5568和5585行；
2. 改动viewui.css中的ivu-menu-item组件背景色，由于viewui.css已经做了mini处理，因此全局查找.ivu-menu-light直接删掉即可；
3. 改动bootstrap-vue.css中的tip指令组件背景色，修改字体颜色和背景色2315行、2318行、2323、2324；
4. 改动bootstrap.css中的按钮聚焦是的轮廓，直接注释掉那个边框颜色2548行,修改2547行的outline为none，注释掉2528行的按钮padding设置；
5. 改动bootstrap.css中的按钮组中的padding边框设计，注释掉3137行；
6. 改动bootstrap.css中的dropMenu，这个发现可以直接在index.html中覆盖
7. 改动bootstrap.css中的card背景色和边框，直接注释4776和4778行
8. 改动viewui.css中的组件tabs间距，全局查找.ivu-tabs-nav .ivu-tabs-tab然后删除margin-right: 16px;修改padding: 8px 16px为padding:8px 5px;
9. 改动viewui.css中的组件tabs下划线，直接去掉，全局查找.ivu-tabs-ink-bar然后删除background-color:#2d8cf0;全局查找.ivu-tabs-bar然后删除border-bottom:1px solid #dcdee2;
10. 改动viewui.css中的组件tabs标签字体hover效果，直接删掉.ivu-tabs-nav .ivu-tabs-tab:hover{color:#515A6E}
11. 改动viewui.css中的组件tabs标签字体active效果，改变.ivu-tabs-nav .ivu-tabs-tab-active{color:#2d8cf0}中的属性为：{color:#515a6e;font-size: 14px;font-weight: 600} 

#### npm下载问题
1. 对于image-webpack-loader引起的下载失败，hosts文件配置  151.101.72.133 raw.githubusercontent.com  

#### 探索到的新大陆
1. 动态修改style中的参数
    在css中使用transform: var(--translateX);表示transform属性使用名为--translateX的变量进行复制
    在js中，使用ref="refsDom"标记元素，然后使用this.$refs.refsDom.style.setProperty("--translateX", "translateX(80%)")为变量赋值
    背景色的动态切换分渐变色和图片，其中图片需加上url参数：如下
        渐变色变量 background: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)' 
        图片变量 background: 'url(https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg)'
##### 首页完工图：
![输入图片说明](%E9%A6%96%E9%A1%B5%E5%AE%8C%E5%B7%A5%E5%9B%BE.png)
##### 自定义主题：
![输入图片说明](%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98.png)
