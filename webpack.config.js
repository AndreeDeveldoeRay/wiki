/**
* @Author: Andreee "DevelDoe" Ray <andreeray>
* @Date:   2017-02-20T13:54:23+01:00
* @Email:  me@andreeray.se
* @Filename: webpack.config.js
 * @Last modified by:   develdoe
 * @Last modified time: 2017-08-14T15:06:26+02:00
*/



var webpack = require('webpack')
var path    = require('path')
var envFile = require('node-env-file')

/**
 * To optimize for production run: NODE_ENV=production webpack -p
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

try { envFile(path.join(__dirname, 'environments/' + process.env.NODE_ENV + '.env')) }
catch (e) { console.log("enfFile error:",e) }

console.log("========== ENVIRONMENT CONFIGURATION =================")
console.log("Environment:",process.env.NODE_ENV)
console.log("======================================================")

module.exports = {
    entry: [
        './src/entry'
    ],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                TEST: JSON.stringify(process.env.TEST)
            }
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules',
            './src/components/',
            './src/layout'
        ],
        alias: {
            src: 'src',
            actions: 'src/redux/actions',
            reducers: 'src/redux/reducers',
            store: 'src/redux/store'
        },
        extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2015','stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheep-module-eval-source-map'
}
