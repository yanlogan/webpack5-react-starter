const { srcPath } = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath + "/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          "postcss-loader",
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(ico|jpe?g|png|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
