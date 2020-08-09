const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode:    'production',
  context: __dirname,
  entry:   {
    home:     ['@babel/polyfill', './js/index.jsx'],
    home_css: ['./css/home.scss'],
  },

  output:  {
    path:       path.join(__dirname, 'dist', 'js'),
    filename:   '[name].js',
  },

  resolve: {
    // extensions that require will resolve.
    extensions:         ['.js', '.jsx', '.js.jsx'],
    // directories to search in for files to resolve.
    modules:            ['node_modules'],
    alias:              {
      modernizr$: path.resolve(__dirname, '.modernizrrc')
    }
  },

  externals: {
    // $:         'jquery',
    // jQuery:    'jquery',
    // Modernizr: 'Modernizr',
    // History:   'History',
    // enquire:   'enquire',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
    }),
    // new MiniCssExtractPlugin({
    //   // filename: '/css/ui.css'
    // })
  ],

  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        use:     'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.modernizrrc$/,
        use:  'modernizr-loader'
      },
      {
        test: /\.scss$/i,
        use:  [
          {
            loader:  'file-loader',
            options: {
              name: '../css/[name].css'
            }
          },
          'extract-loader',
          {
            loader:  'css-loader',
            options: {
              sourceMap: false
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  }
};
