module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
/*   devServer: {
    proxy: 'http://code.southyang.cn:8080'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      '/user': {
        target: 'http://code.southyang.cn:8080',
        // pathRewrite: { '^/user': '' },
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
      // http://code.southyang.cn:8080/user/sendCode?phone=17873149260
      '/manager': {
        target: 'http://code.southyang.cn:8080',
        pathRewrite: { '^/manager': '' },
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
}