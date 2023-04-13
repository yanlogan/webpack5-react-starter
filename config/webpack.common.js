const { srcPath, buildPath, publicPath } = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
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
        type: "javascript/auto",
        use: [
          {
            // To generate webp use `?format=webp`
            loader: "responsive-loader",
            options: {
              sizes: [430, 600, 900, 1280, 1920],
              quality: 100,
              placeholder: true,
              placeholderSize: 20,
              name: "assets/images/[hash]-[width].[ext]",
            },
          },
        ],
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
