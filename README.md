# it充电站
### 介绍
#### it充电站，可以是你的私人博客，用来记录你从0到1的过程，也可以是一个知识社区，共同见证你我的成长，还可以是你生活的一角，记你所想，随笔一生，记录生活的点点滴滴！
#### 在这里，没有CSDN那样烦人的广告，也没有掘金那样的包揽万象，但却有着语雀一样简约大方，有着博客园一样的高质量，同时还可以沉浸式满足你的专注写作，也可以自定义主题满足你的天马行空！
See [Configuration Reference](https://cli.vuejs.org/config/).

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


#### 规划和进度
1. 一期完成前段页面，由于技术较菜，使用了多个框架，bootstrap-vue，iView、写作中心使用am-editor插件(内部使用ant-design-vue1.x)
    <br>进度：90%
2. 二期完成后端接口设计
4. 三期完成前段页面改造，使用vue3.0，框架整合，使用ant-design-vue3.x
3. 四期完成music接口改造，可以使用登录用户的网易云cookie加载个性化播放列表

#### npm下载问题
1. 对于image-webpack-loader引起的下载失败，hosts文件配置  151.101.72.133 raw.githubusercontent.com  

#### 探索到的新大陆
1. 动态修改style中的参数
    在css中使用transform: var(--translateX);表示transform属性使用名为--translateX的变量进行赋值，
    在js中，使用ref="refsDom"标记元素，然后使用this.$refs.refsDom.style.setProperty("--translateX", "translateX(80%)")为变量赋值，
    背景色的动态切换分渐变色和图片，其中图片需加上url参数如下：
        渐变色变量 background: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'； 
        图片变量 background: 'url(https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg)'；
2. iconfont字体中的Unicode值可以自定义修改，当同时引入多个css图标文件时如果有些图标失效不起作用，检查是不是Unicode值重复了；
3. 使用promise可以轻松的等待异步任务执行完成再继续执行后面的代码；
4. 使用/deep/属性来强制覆盖某些插件中的样式。
##### 首页完工图：
![输入图片说明](%E9%A6%96%E9%A1%B5%E5%AE%8C%E5%B7%A5%E5%9B%BE.png)
##### 自定义主题：
![输入图片说明](%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98.png)
