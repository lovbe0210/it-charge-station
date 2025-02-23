// const FileManagerPlugin = require("filemanager-webpack-plugin");
/**
 * vue.config.js
 * 作为一个可选配置，配置vue脚手架中的一些公共配置
 * 配置项地址见：https://cli.vuejs.org/zh/config/#pages
 */
// const FileManagerPlugin = require('filemanager-webpack-plugin') //引入插件
//捕获未捕捉的异常，避免Node进程退出。
process.on('uncaughtException', function (err) {
  console.log('Caught Exception:' + err);
});
module.exports = {
  // 根路径  @ is an alias to /src
  publicPath: '/',
  // 是否打包.map文件，在运行报错时可输出代码定位
  productionSourceMap: false,
  parallel: false,
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    devtool: "source map",
    plugins: [
      /*new FileManagerPlugin({
        events: {
          onEnd: {
            delete: ['./dist.zip'],
            archive: [{source: './dist', destination: './dist.zip'}]
          }
        }
      })*/
    ]
  },
  devServer: {
    // ipv6支持
    host: '::',
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/oss': {
        target: 'http://10.2.2.13:1380',
        changeOrigin: true
      },
      '/api/music': {
        target: 'http://www.codeman.ink:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api/music': ''
        }
      },
      '/socket': {
        target: 'http://10.2.2.13:1380',
        changeOrigin: true,
        ws: true
      },
      '/api': {
        // target: 'https://www.10020210.xyz',
        target: 'http://10.2.2.13:1380',
        ws: false
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
      },
      '/yuque': {
        target: 'https://cdn.nlark.com',
        changeOrigin: true,
        ws: true
      },
      '/math': {
        target: 'https://editor.aomao.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/math': '/api/latex'
        }
      },
      '/latex': {
        target: 'https://g.yanmao.cc',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/math': '/api/latex'
        }
      }
    }
  }
}
