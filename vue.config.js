const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/KJ12/',  // Replace KJ12 with your repo name
  outputDir: 'docs'      // Build to docs folder instead of dist
})