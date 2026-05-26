const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/KJ12/',

  outputDir: 'docs'
})