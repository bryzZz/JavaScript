const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  plugins: [
    new HTMLPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist/index.html"),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};