const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    main: './src/main/main.ts',
    preload: './src/main/preload.ts',
  },
  mode: 'development',
  target: 'electron-main',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/main/'),
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     // { from: path.join(__dirname,"..",'node_modules','sb-canvas','build','Release') , to: "canvas" },
    //     // { from: path.join(__dirname,"..",'node_modules','sb-canvas','build','Release') , to: "./" },
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
        options:{
          name: "canvas/[name].[ext]"
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
