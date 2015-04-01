var paths           = require('./')
var webpack         = require('webpack')
var webpackManifest = require('../lib/webpackManifest')

module.exports = function(env) {

  var jsSrc = paths.sourceAssets + '/javascripts/'
  var jsDest = paths.publicAssets + '/javascripts/'
  var publicPath = 'assets/javascripts/'

  var webpackConfig = {
    entry: {
      app: [jsSrc + 'app.js']
    },

    output: {
      path: jsDest,
      filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      publicPath: publicPath
    },

    plugins: [],

    resolve: {
      extensions: ['', '.js']
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?experimental',
          exclude: /node_modules/
        }
      ]
    }
  }

  if(env !== 'test') {
    // Factor out common dependencies into a shared.js
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        filename: env === 'production' ? '[name]-[hash].js' : '[name].js'
      })
    )
  }

  if(env === 'development') {
    webpackConfig.devtool = 'sourcemap'
    webpack.debug = true
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, 'public'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return webpackConfig
}
