/**
 * vue.config.js
 * 作为一个可选配置，配置vue脚手架中的一些公共配置
 * 配置项地址见：https://cli.vuejs.org/zh/config/#pages
 */
module.exports = {
  // 根路径  @ is an alias to /src
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  }
}
