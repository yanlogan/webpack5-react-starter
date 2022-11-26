const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  devtool: false,

  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: false },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-gifsicle"],
              ["imagemin-mozjpeg"],
              ["imagemin-pngquant"],
              "imagemin-svgo",
            ],
          },
        },
        generator: [
          {
            // You can apply generator using `?as=webp`
            preset: "webp",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [["imagemin-webp", { quality: 100 }]],
            },
          },
        ],
      }),
    ],
  },
});
