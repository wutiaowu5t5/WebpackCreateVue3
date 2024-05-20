/*
 * @Description: webpack生产环境配置文件
 * @Author: 5t5
 * @Time: 2024/5/17 17:03
 */
//const { merge } = require("webpack-merge")
//const base = require("./webpack.common.js")
//const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//
//const path = require('path')
//
//
//module.exports = merge(base, {
//    mode: 'production',
//    plugins: [
//        new CleanWebpackPlugin({
//            cleanStaleWebpackAssets: true,
//            cleanOnceBeforeBuildPatterns: [ path.resolve(__dirname, "../dist") ]
//        })
//    ]
//})