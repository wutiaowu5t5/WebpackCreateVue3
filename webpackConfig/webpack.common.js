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
const webpack = require("webpack")

// Vue-loader配置
const { VueLoaderPlugin } = require('vue-loader')
// Html模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Element Plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')
// Css提取分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 进度条美化
const WebpackBar = require('webpackbar')
// 是否开发环境
const IsDev = process.env.NODE_ENV === 'development'

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
            '@api': path.resolve(__dirname, '../src/api'),
            // '@utils'别名指向Utils接口目录，便于调用接口
            '@utils': path.resolve(__dirname, '../src/utils')
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
        clean: true,
        // 用于指定非入口(non-initial) chunk 文件的名称，这通常是用于懒加载模块时Webpack按需加载的块
        chunkFilename: '[name].js'
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
                loader: 'vue-loader',
                include: /src/
            },
            
            {
                // 匹配.css文件的规则配置
                test: /\.css$/,
                use: [
                    // 根据开发环境选择使用style-loader或将CSS提取到单独的文件中
                    IsDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // 对CSS文件进行处理，支持模块化、压缩等操作
                    "css-loader",
                    "postcss-loader"
                ],
            },
            
            {
                test: /\.js$/,
                use: [
                    'thread-loader', // 在这里添加`thread-loader`
                    'babel-loader'
                ],
                exclude: /node_modules/,
            },
            
            {
                // 匹配.less文件的规则配置
                test: /\.less$/,
                use: [
                    // 同上，根据开发环境选择合适的CSS加载器
                    IsDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // 处理CSS文件，支持模块化、压缩等
                    "css-loader",
                    "postcss-loader",
                    // 将LESS编译为CSS
                    "less-loader"
                ],
            },

            
            {
                // 处理图像文件的规则配置
                test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/, // 匹配多种图像文件格式
                type: "asset", // 将图像文件作为资产处理
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 图片大小小于10KB将会被转成base64
                    },
                },
                generator: {
                    filename: "static/images/[hash:8][ext]", // 输出文件的命名规则，在images目录下，使用8位哈希值加原始扩展名
                }
            },
            
            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/fonts/[hash:8][ext]', // 文件输出目录和命名
                },
            },
            
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/media/[hash:8][ext]', // 文件输出目录和命名
                },
            },
            

            
        ]
    },
    // 插件配置数组
    plugins: [
        // 这里放置项目使用的插件列表
        // 插件可以执行各种任务，如自动优化和压缩代码、注入环境变量等
        
        // VueLoaderPlugin是一个Vue.js的加载器插件，它自动处理Vue组件的加载
        new VueLoaderPlugin(),
        
        /**
         * 创建一个HtmlWebpackPlugin实例
         * 用于在生成的HTML文件中注入Webpack打包后的JS文件和CSS文件等资源
         *
         * @param {Object} 配置对象
         * @param {string} template 指定HTML模板文件的路径
         * @param {string} filename 指定生成的HTML文件的路径
         * @param {string} title 设置HTML文档的标题
         * @param {Object} minify HTML压缩配置，用于生产环境
         *        - collapseWhitespace: true, // 压缩HTML，去除多余的空格
         *        - removeComments: true // 移除HTML中的注释
         */
        new HtmlWebpackPlugin({
            template: './index.html', // 指定项目中的index.html作为模板
            filename: './index.html', // 生成的HTML文件路径
            title: 'Vue3 + webpack -> Web App', // 设置HTML文档的标题
            minify: { // HTML压缩配置，仅在生产环境下启用
                collapseWhitespace: true, // 去掉空格
                removeComments: true // 去掉注释
            }
        }),
        
        /**
         * 配置自动导入组件的功能
         * 使用ElementPlusResolver以便自动解析并导入Element Plus组件库中的组件。
         * 这样做旨在避免手动导入组件，从而提高开发效率。
         */
        AutoImport({
            resolvers: [
                ElementPlusResolver()
            ]
        }),
        /**
         * 注册组件的配置
         * 通过使用ElementPlusResolver，自动注册Element Plus组件库中的所有组件。
         * 使得这些组件在应用中可以直接使用，简化了组件注册流程。
         */
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    // 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
                    prefix: 'icon',
                    // 仅启用名为'ep'的图标集合
                    enabledCollections: ['ep'],
                })
            ]
        }),
        
        // 配置图标插件，自动安装所需的图标库
        Icons({
            autoInstall: true // 自动安装图标库
        }),
        
        // 进度条插件：用于显示webpack构建的进度
        new WebpackBar({
            color: "#85d",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile:false,  // 默认false，启用探查器。
        }),
        
        // CSS提取插件：将CSS从JS文件中分离出来，生成单独的CSS文件
        // filename格式：根据块的名称和哈希值生成CSS文件名，例如：name_chunkhash:8.css
        new MiniCssExtractPlugin({
            filename:'[name]_[chunkhash:8].css'
        }),
        
        // 定义插件：用于定义全局常量，影响代码的编译结果
        // - __VUE_OPTIONS_API__: 启用Vue的选项API
        // - __VUE_PROD_DEVTOOLS__: 在生产环境中禁用Vue的开发工具
        // - __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 在生产环境中禁用hydration不匹配的详细信息
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        })
        
    ],
    // 性能配置项,用于设置与应用性能相关的警报阈值
    performance: {
        /**
         * maxEntrypointSize - 入口文件大小警报阈值
         * 设置入口文件（例如，HTML、CSS、JavaScript）的大小警报阈值。
         * 当入口文件的大小超过此设置时，将触发性能警报。
         * 单位：字节。
         */
        maxEntrypointSize: 512000, // 0.5 MB
        
        /**
         * maxAssetSize - 单个资源体积
         * 设置单个资源（如图片、字体文件等）的大小警报阈值。
         * 当任何单个资源的大小超过此设置时，将触发性能警报。
         * 单位：字节。
         */
        maxAssetSize: 512000
    },
}