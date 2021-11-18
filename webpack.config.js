const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Game of Life",
      template: "./index.html",
      filename: "index.html",
      meta: {
        charset: { charset: "utf-8" },
        viewport: "width=device-width, initial-scale=1, maximum-scale=1",
        "Content-Security-Policy": {
          "http-equiv": "X-UA-Compatible",
          content: "ie=edge",
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  stats: {
    children: true,
  },
};
