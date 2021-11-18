const path = require('path');
module.exports = {
  entry: {
    main: './src/cmd/main.ts',
    fsstat: './src/cmd/fsstat.ts',
  },
  mode: 'development',
  target: 'node',
  output: {
    filename: 'cmd/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /src\/main/,
      },
      {
        test: /\.tsx?$/,
        exclude: /src\/renderer/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};