const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    // index: './src/renderer/public/index.js',
    main: './src/renderer/main.tsx',
  },
  devServer: {
    contentBase: path.join(__dirname, '/../dist/renderer'),
    compress: true,
    port: 9000,
  },
  // target: "electron-renderer",
  target: 'web',
  mode: 'development',
  output: {
    filename: 'renderer/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader',"less-loader"]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins:[
    //初始化插件
    new htmlWebpackPlugin({
      template: "src/renderer/public/index.html",
      filename: "index.html",
      inject: true,
      filename: './renderer/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
