var path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, './src/index.js')
  ,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(style.css|GLOBAL_CSS|node_modules)/,
        use: [{loader: "style-loader"},
            {
          loader: 'css-loader',
        }]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000000'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 8080,
    hot: true
  },

}
