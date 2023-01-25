const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rulesForJS = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  options: { // configurar
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react',
        {
          runtime: 'automatic' // 'classic' or 'automatic'
        }
      ]
    ]
  }
}

/* const rulesForStyles = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
 */
const rulesForTS = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  use: [
    {
      loader: require.resolve('babel-loader')
    }
  ]
}

const rulesForAssets = {
  type: 'asset/resource',
  test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/
}

// const rules = [rulesForTS, rulesForJS, rulesForStyles];

module.exports = (env, arg) => {
  const { mode } = arg
  const isProduction = mode === 'production'
  return {
    // entry: './src/index.js',
    entry: './src/index.tsx',
    output: {
      // filename: 'main.js',
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [
        rulesForTS,
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']

        },
        rulesForAssets
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'build')
      },
      open: true, // open browser
      port: 3000,
      compress: true,
      historyApiFallback: true,
      client: {
        overlay: true // show errors in browser
      }
    },
    devtool: isProduction ? undefined : 'source-map'
  }
}
