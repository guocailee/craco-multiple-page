import { whenDev } from '@craco/craco'
import getOptions from './utils/options'
import removePlugin from './utils/removePlugin'
import getPagesInfo from './utils/getPagesInfo'
import getPagesReg from './utils/getPagesRegexp'
import getWebpackConfig from './utils/getWebpackConfig'
import getIndexPage from './indexpage/index'

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { paths } }) => {
    const options = getOptions(paths, pluginOptions)
    const pagesRegexp = getPagesReg(options)

    const { HtmlWebpackPlugin, ManifestPlugin } = removePlugin(webpackConfig)
    const pages = getPagesInfo({ pagesRegexp, paths, options }, paths.appSrc)
    if (pages.length === 0) {
      console.error('没有找到任何入口！(Can`t find any entry!)')
      process.exit(1)
    }
    const { plugins, entry } = getWebpackConfig(pages, HtmlWebpackPlugin, ManifestPlugin, options)
    webpackConfig.entry = entry
    webpackConfig.plugins.unshift(...plugins)
    paths.appIndexJs = pages[0].entry
    whenDev(() => {
      webpackConfig.output.filename = 'static/js/[name].bundle.js'
      webpackConfig.plugins.unshift(getIndexPage(HtmlWebpackPlugin, plugins))
    })

    return webpackConfig
  },
}
