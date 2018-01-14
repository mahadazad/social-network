const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const sassThreadLoader = require('thread-loader');

sassThreadLoader.warmup({ workerParallelJobs: 2 }, [
  'sass-loader',
  'postcss-loader',
  'css-loader',
  'style-loader',
  'babel-loader',
]);

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const sourcePath = path.join(__dirname, './src');
const buildDirectory = path.join(__dirname, './build');

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const serviceWorkerBuild = env && env.sw;

  const htmlTemplate = isProd ? 'index.ejs' : 'index.dev.ejs';

  let cssLoader;

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    }),

    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),

    // create index.html
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true,
      production: isProd,
      preload: ['*.css'],
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // make sure script tags are async to avoid blocking html render
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ];

  if (isProd) {
    plugins.push(
      // create css bundle
      new ExtractTextPlugin('style-[contenthash:8].css'),
      // minify remove some of the dead code
      new UglifyJSPlugin()
    );

    cssLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'cache-loader',
        {
          loader: 'thread-loader',
          options: {
            workerParallelJobs: 2,
          },
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'collapsed',
            sourceMap: true,
            includePaths: [sourcePath],
          },
        },
      ],
    });
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin(),
    );

    cssLoader = [
      // cache css output for faster rebuilds
      'cache-loader',
      {
        // build css/sass in threads (faster)
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 2,
        },
      },
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: false,
          includePaths: [sourcePath],
        },
      },
    ];
  }

  if (serviceWorkerBuild) {
    plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'social-app',
        filename: 'sw.js',
        maximumFileSizeToCacheInBytes: 800000,
        mergeStaticsConfig: true,
        minify: true,
        runtimeCaching: [
          {
            handler: 'cacheFirst',
            urlPattern: /(.*?)/,
          },
        ],
      })
    );
  }

  const entryPoint = isProd
    ? './index.js'
    : [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      `webpack-dev-server/client?http://${host}:${port}`,

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of our app
      './index.js',
    ];

  return {
    devtool: isProd ? 'cheap-source-map' : 'eval-cheap-module-source-map',
    context: sourcePath,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      // Computing hashes is expensive and we don't need them in development
      filename: isProd ? '[name]-[hash:8].js' : '[name].js',
      chunkFilename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|gif|png|ttf|eot|woff2?)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: isProd ? 'static/[name]-[hash:8].[ext]' : 'static/[name].[ext]',
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: cssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workerParallelJobs: 2,
              },
            },
            'babel-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.scss', '.css'],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
      symlinks: false,
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: './src',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
    },
  };
};
