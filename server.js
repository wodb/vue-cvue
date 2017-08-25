const webpack = require('webpack')
const webpakConfigHot = require('./webpack.config.hot')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const express = require('express')

let app = express()
let compiler = webpack(webpakConfigHot)

app.use(webpackDevMiddleWare(compiler,{
    publicPath:webpakConfigHot.output.publicPath,
    progress:true,
    hot:true,
    inline:true,
    stats:{
        colors:true
    }
}))

app.use(webpackHotMiddleWare(compiler))

app.listen('3000',(err) => {
    if (err) throw err
    console.log(`server is port:3000`)
})