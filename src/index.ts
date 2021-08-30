const { removePlugins, addPlugins, pluginByName } = require('@craco/craco')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    removePlugins(webpackConfig, pluginByName('HtmlWebpackPlugin'))
    removePlugins(webpackConfig, pluginByName('ManifestPlugin'))

    const pages = pluginOptions.pages || []
    const plugins: any = []
    const entry = {}
    pages.forEach((page) => {
      const isIndex = page.name === 'index'
      entry[page.name] = [isDevelopment && require.resolve('react-dev-utils/webpackHotDevClient') && path.resolve(page.entry)].filter(Boolean)
      plugins.push(
        new HtmlWebpackPlugin({
          title: page.title || 'Custom template',
          template: page.template || './public/index.html',
          filename: isIndex ? `${page.name}.html` : `${page.name}/index.html`,
          chunks: [page.name],
        })
      )
    })
    webpackConfig.entry = entry
    addPlugins(webpackConfig, plugins)
    return webpackConfig
  },
}
