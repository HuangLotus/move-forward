const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    devtool:'source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ]

}