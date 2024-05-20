/*
 * @Description: webpack公共配置文件
 * @Author: 5t5
 * @Time: 2024/5/17 17:03
 */
/**
 * 引入Node.js的path模块
 * 该模块提供了一系列处理文件路径的函数。
 */
const path = require('path')

// Vue-loader配置
const { VueLoaderPlugin } = require('vue-loader')
// Html模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 配置模块解析规则
    resolve: {
        // 后缀名自动补全，当引入模块时，可以不写具体的后缀名，这里指定了可用的后缀名列表
        extensions: [
            '.js', 'ts', 'json', '.vue', '.css', 'less'
        ],
        // 配置别名，方便在import时使用简写，提高编码效率
        alias: {
            // 使用'@'作为简写，指向项目的src目录
            '@': path.resolve(__dirname, '../src'),
            // '@cmp'别名指向组件目录，方便直接引入组件
            '@cmp': path.resolve(__dirname, '../src/components'),
            // '@api'别名指向API接口目录，便于调用接口
            '@api': path.resolve(__dirname, '../src/api')
        }
    },
    // 配置入口文件
    entry: path.resolve(__dirname, '../src/main.js'),
    // 配置输出选项
    output: {
        // 指定输出的文件名，[chunkhash:8]表示使用8位的块哈希值作为文件名的一部分
        filename: '[name].[chunkhash:8].js',
        // 指定输出文件的路径
        path: path.resolve(__dirname, '../dist'),
        // 启用异步块加载
        asyncChunks: true,
        // 设置资源的公共路径，对于在页面中引用的静态资源，都将以此路径为基础
        publicPath: '/',
        // 清除上一次打包构建出来的文件
        clean: true
    },
    // 定义模块的规则配置
    module: {
        rules: [
            // 这里是模块规则的数组，用于配置不同类型的文件如何被处理
            // 每个规则包括测试表达式（test）、加载器（loader）和选项（options）等
            {
                // 匹配.vue文件
                test: /\.vue$/,
                // 使用vue-loader处理
                loader: 'vue-loader'
            },
        ]
    },
    // 插件配置数组
    plugins: [
        // 这里放置项目使用的插件列表
        // 插件可以执行各种任务，如自动优化和压缩代码、注入环境变量等
        
        // VueLoaderPlugin是一个Vue.js的加载器插件，它自动处理Vue组件的加载
        new VueLoaderPlugin(),

        // 用于在生成的HTML文件中注入Webpack打包后的JS文件和CSS文件等资源
        new HtmlWebpackPlugin({
            template: './index.html', // 指定项目中的index.html作为模板
            filename: './index.html', // 生成的HTML文件路径
            title: 'Vue3 + webpack -> Web App', // 设置HTML文档的标题
            minify: { // HTML压缩配置，仅在生产环境下启用
                collapseWhitespace: true, // 去掉空格
                removeComments: true // 去掉注释
            }
        }),
    ]

}