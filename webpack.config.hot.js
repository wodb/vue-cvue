const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool:'cheap-module-eval-source-map',
    entry:{
        app:['webpack-hot-middleware/client','./src/app']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist',
        filename:'bundle.js'
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
                    options:{
                        loaders:{
                            // 坑阿！！
                            css: ExtractTextPlugin.extract({
                                fallback: "vue-style-loader",
                                use: ["css-loader"]
                            })
                        }
                    }
                }], // 要写成vue-loader 不能vue(......)
            }, {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }, {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                use: ["file-loader"]
            },{
                test: /\.(png|jpg|gif|svg)$/,
                use: ['url-loader?limit=8192name=images/[hash:8].[name].[ext]']
            }
        ]
    },
    resolve:{
        // 文件别名
        alias: {
            vue:'vue/dist/vue.js'
        },
        extensions:['.js','.vue','.css']
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify("development")
        }),
        new webpack.HotModuleReplacementPlugin(),// 模块热替换
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/template/index.html',
            hash:true
        }),

        new ExtractTextPlugin("styles.css"),
    ]
}