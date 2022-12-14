const { buildPath } = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  devtool: "source-map",

  devServer: {
    static: buildPath,
    hot: true,
  },
});
