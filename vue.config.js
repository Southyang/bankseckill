module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
  devServer: {
    proxy: 'http://code.southyang.cn:8080',
  },
  //开启代理服务器（方式二）
  /* devServer: {
    proxy: {
      '/user': {
        target: 'http://code.southyang.cn:8080',
        pathRewrite: { '^/user': '' },
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
      '/manage': {
        target: 'http://code.southyang.cn:8080',
        pathRewrite: { '^/manage': '' },
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  }, */
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
}