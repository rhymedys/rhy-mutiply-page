const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const CompressionAssetByBrotliWebpackPlugin = require('compression-asset-by-brotli-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')



const baseEncodeConfig = {
    test: /\.(js|css|svg)$/,
    threshold: 3000,
    minRatio: 0.8
}


baseConfig
    .plugins
    .push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            ...baseEncodeConfig
        }),
        new CompressionAssetByBrotliWebpackPlugin({
            asset: '[path].br[query]',
            ...baseEncodeConfig
        }),

    )


module.exports = merge(baseConfig, {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    filename: 'common/vue-vendor.[chunkhash].js',
                    test: /[\\/]node_modules[\\/](vue|vuex|axios)/,
                    chunks: "initial",
                    reuseExistingChunk: true
                }
            }
        }
    }
});