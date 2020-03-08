const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode:    'development',
  devtool: 'inline-source-map',
  context: __dirname,
  entry:   {
    home:        ['@babel/polyfill', './ui/js/pages/home.jsx'],
    about:       ['@babel/polyfill', './ui/js/pages/about.jsx'],
  },

  output:  {
    path:       path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename:   '[name]_bundle.js',
    publicPath: '/assets',
  },

  resolve: {
    // extensions that require will resolve.
    extensions: ['.js', '.jsx', '.js.jsx'],
    // directories to search in for files to resolve.
    modules:    ['node_modules'],
    alias:      {
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

  // plugins: [
  //   new webpack.ProvidePlugin({
  //     Router:    '../utils/router',
  //   })
  // ],

  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        use:     'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test:   /\.modernizrrc$/,
        use:    'modernizr-loader'
      },
      {
        test: /\.css$/,
        use:  ['style-loader', 'css-loader']
      }
    ]
  }
};
