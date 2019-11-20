const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
module.exports = merge(baseConfig, {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/](vue|vuex|)/,
                    chunks: "initial",
                }
            }
        }
    }
});