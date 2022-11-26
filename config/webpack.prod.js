const { buildPath } = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    path: buildPath,
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  },
  devtool: false,

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],

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
      new CssMinimizerPlugin(),
      new TerserPlugin(),
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
    runtimeChunk: {
      name: "runtime",
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
