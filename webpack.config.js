const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Game of Life",
      template: "./index.html",
    }),
  ],
  stats: {
    children: true,
  },
};
