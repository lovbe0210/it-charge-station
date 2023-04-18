/**
 * vue.config.js
 * 作为一个可选配置，配置vue脚手架中的一些公共配置
 * 配置项地址见：https://cli.vuejs.org/zh/config/#pages
 */
module.exports = {
  // 根路径  @ is an alias to /src
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 是否打包.map文件，在运行报错时可输出代码定位
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://www.codeman.store',
        target: 'http://www.codeman.ink:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      'm7': {
        target: 'http://m7.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m7': ''
        }
      },
      'm701': {
        target: 'http://m701.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m701': ''
        }
      },
      'm8': {
        target: 'http://m8.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m8': ''
        }
      },
      'm801': {
        target: 'http://m801.music.126.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/m801': ''
        }
      }
    }
  }
}
