import { whenDev } from '@craco/craco'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import removePlugin from './utils/removePlugin'

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    const pages: any[] = pluginOptions.pages || []

    removePlugin(webpackConfig)
    if (pages.length > 0) {
      webpackConfig.entry = {}
    }
    pages.forEach((page) => {
      webpackConfig.entry[page.name] = page.entry
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          title: page.title || 'Custom template',
          template: page.template || './public/index.html',
          chunks: [page.name],
        })
      )
    })

    whenDev(() => {
      webpackConfig.output.filename = 'static/js/[name].bundle.js'
    })

    return webpackConfig
  },
}
