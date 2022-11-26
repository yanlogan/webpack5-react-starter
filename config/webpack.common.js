const { srcPath, buildPath } = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: buildPath,
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: srcPath + "/assets",
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
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
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
