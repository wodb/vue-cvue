const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool:'cheap-module-eval-source-map',
    entry:{
        app:['webpack-hot-middleware/client','./src/app'],
        vendor: ['vue', 'vuex','vue-router']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/',
        filename:'[name]-bundle.js',
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    module:{
        rules:[{
                test:/\.js$/,
                exclude:/node_modules/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        "presets":['es2015','stage-0']
                    }
                }],// 其它的loader
            }, {
                test:/\.vue$/,
                exclude:/node_modules/,
                use:[{
                    loader: "vue-loader",
                }] // 要写成vue-loader 不能vue(......)
            }, {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }, {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'less-loader']
                })
            }, {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                use: ["file-loader"]
            },{
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 8192,
                            name:'images/[hash:8].[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        // 文件别名
        alias: {
            vue:'vue/dist/vue.js',
            '@src':path.resolve(__dirname, 'src/'), //常用工具方法
			'@static':path.resolve(__dirname, 'static/'), //常用工具方法
        },
        extensions:['.js','.vue']
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify("development")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 指定一个希望作为公共包的入口
        }),
        new webpack.HotModuleReplacementPlugin(),// 模块热替换
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve('./src/template/index.html'),
            hash:true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
    ]
}