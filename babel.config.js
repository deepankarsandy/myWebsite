module.exports = {
  presets: [
    ['@babel/env', { modules: 'commonjs' }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',

    // REF: https://www.npmjs.com/package/babel-plugin-transform-imports
    ['@babel/plugin-transform-runtime', { sourceType: 'ambiguous' }],
    ['transform-imports',
      {
        lodash: {
          transform:         'lodash/${member}',
          preventFullImport: true
        },
        'ramda-adjunct': {
          transform:         'ramda-adjunct/es/${member}',
          preventFullImport: true
        },
        'ramda-extension': {
          transform:         'ramda-extension/es/${member}',
          preventFullImport: true
        },
      }
    ],

    ['ramda', { useES: true }],
    'add-module-exports',
    '@babel/transform-react-jsx-source',

    // REF: https://www.npmjs.com/package/babel-plugin-root-import
    ['babel-plugin-root-import', {
      rootPathSuffix: 'js'
    }],
  ]
};

