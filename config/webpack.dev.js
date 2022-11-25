const { buildPath } = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  devServer: {
    static: buildPath,
  },
});
