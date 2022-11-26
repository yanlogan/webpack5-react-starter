const { srcPath, buildPath, publicPath } = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  output: {
    path: buildPath,
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicPath,
          to: buildPath,
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: srcPath + "/logo.svg",
      favicons: {
        appName: "Webpack 5 React Starter",
        appDescription: "Webpack 5 React Starter",
        theme_color: "#000",
      },
    }),
    new HtmlWebpackPlugin({
      title: "Webpack 5 React Starter",
      template: srcPath + "/index.html",
      inject: "body",
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
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        include: /icons/,
        use: [{ loader: "svg-sprite-loader" }, "svgo-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
