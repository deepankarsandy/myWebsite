import path, { dirname } from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode:    'development',
  devtool: 'eval-source-map',
  context: __dirname,

  entry:   {
    home:     ['@babel/polyfill', './ui/index.jsx'],
    home_css: ['./css/home.scss'],
  },

  output:  {
    path:       path.join(__dirname, 'dist', 'js'),
    filename:   '[name].js',
    publicPath:  path.join('dist', 'js/')
  },

  resolve: {
    // extensions that require will resolve.
    extensions: ['.js', '.jsx', 'ts', 'tsx'],
    // directories to search in for files to resolve.
    modules:    ['node_modules'],
    alias:      {}
  },

  externals: {},

  plugins: [
    new webpack.DefinePlugin({
      __DEV__:  true,
      __dirname,
      NODE_ENV: 'development',
      env:      'development',
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
        test:    /\.tsx?$/,
        use:     'babel-loader',
        exclude: /node_modules/,
      },
      {
        test:    /\.jsx?$/,
        use:     'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use:  ['style-loader', 'css-loader']
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
              sourceMap: true
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
