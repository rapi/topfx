const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//this is config webpack for Rapi
module.exports = {
  entry: './resources/assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'app.js',

  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'resources', 'assets', 'js', 'components'),
      path.resolve(__dirname, 'resources', 'assets', 'js'),
      path.resolve(__dirname, 'resources', 'assets', 'scss'),
    ],
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
       test: /\.(png|jpg|jpeg|gif|woff2)$/,
       use: [
         {
           loader: 'url-loader',
           options: {
             // publicPath: 'public/'
           }
         }
       ]
     },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0']
          }
        }
      }, {
        test: /\.(sass|scss)/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          {
         loader: "sass-loader", options: {
           sourceMap: true,
           data:
           '@import "~bootstrap/scss/functions";'+
           '@import "resources/assets/scss/variables";'+
           '@import "~bootstrap/scss/variables";'+
           '@import "~bootstrap/scss/mixins";'
         }
       } // compiles Sass to CSS, using Node Sass by default
        ]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'resources/views/OHLC.blade.php' //relative to root of the application
    }),
    // new Dotenv()

  ],
  devServer: {
    historyApiFallback: true,
    watchContentBase: true,
    contentBase: [path.join(__dirname, 'public')],
   //  proxy: {
   //   '/api': 'http://localhost:3000'
   // }
  }
}
