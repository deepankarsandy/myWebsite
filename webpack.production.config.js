import path, { dirname } from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode:    'production',
  context: __dirname,
  entry:   {
    home:     ['@babel/polyfill', './js/index.jsx'],
    home_css: ['./css/home.scss'],
  },

  output:  {
    path:       path.join(__dirname, 'dist', 'js'),
    filename:   '[name].js',
    publicPath:  path.join('dist', 'js/')
  },

  resolve: {
    // extensions that require will resolve.
    extensions:         ['.js', '.jsx', '.js.jsx'],
    // directories to search in for files to resolve.
    modules:            ['node_modules'],
    alias:              {}
  },

  externals: {},

  plugins: [
    new webpack.DefinePlugin({
      __DEV__:  false,
      __dirname,
      NODE_ENV: 'production',
      env:      'production',
    })
  ],

  module: {
    rules: [
      {
        test:    /\.m?js/,
        resolve: {
          fullySpecified: false
        },
        exclude: /(node_modules)/,
      },
      {
        test:    /\.jsx?$/,
        use:     'babel-loader',
        exclude: /(node_modules)/
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
          {
            loader:  'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              }
            },
          },
          'sass-loader',
        ],
      },
    ]
  }
};
