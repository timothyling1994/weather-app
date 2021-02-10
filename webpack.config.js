 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
 module.exports = {
 	mode:'development',
  
  entry: './src/index.js',


	//links source code to compiled code to let you know which source file an error is occurring upon compilation
	devtool:'inline-source-map',
	devServer: {
    	contentBase: './dist',
  },
	//if you change name of entry files above, and call the outputted bundle files in your html, the below plugin will make that change automatically
	plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'development',
      }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
     }
    ],
  },
};