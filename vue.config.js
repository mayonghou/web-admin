module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://sm.chengdecanyin.com/',
        target: 'http://192.168.0.200:7070/',
        // target: 'https://api.gzwjfh.com/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}