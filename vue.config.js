module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/scss/config.scss";'
      }
    }
  },
  outputDir: 'C:\\soft\\tomcat\\webapps\\ROOT'
}
