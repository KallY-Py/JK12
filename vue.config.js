const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/JK12/',
  outputDir: 'docs',

  productionSourceMap: false
})