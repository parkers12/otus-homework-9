const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    new CleanWebpackPlugin(),
  ],
  stats: {
    children: true,
  },
};
