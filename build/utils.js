'use strict'

const os = require('os')
// 获取本地IP地址
exports.getLocalIP = () => {
  let IPv4, items
  if (/windows/i.test(process.env.OS)) {
    items = os.networkInterfaces() && os.networkInterfaces().WLAN
  } else {
    items = os.networkInterfaces() && os.networkInterfaces().en0
  }
  items && items.forEach(item => {
    item.family === 'IPv4' && (IPv4 = item.address)
  })
  return IPv4
}

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || ''
    })
  }
}

// 获取多页面入口js文件
exports.getMultiEntry = () => {
  let entries = {}, tmp, pathname
  glob.sync('./src/multi-page/**/index.{js,jsx}').forEach(entry => {
    tmp = entry.split('/').splice(-3)
    pathname = tmp.splice(1, 1).toString().toLowerCase()
    entries[pathname] = entry
  })
  return entries
}

// 获取多页面html模板
exports.getMultiPages = () => {
  let plugins = [], tmp, pathname
  glob.sync('./src/multi-page/**/index.html').forEach(entry => {
    tmp = entry.split('/').splice(-3)
    pathname = tmp.splice(1, 1).toString().toLowerCase()

    plugins.push(new HtmlWebpackPlugin({
      filename: pathname + '.html',
      template: entry,
      inject: true,
      chunks: ['manifest', 'vendor', pathname],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: './src/assets/favicon.ico'
    }))
  })
  return plugins
}
