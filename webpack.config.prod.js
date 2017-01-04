import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    // Entry point for app - also good way to inject middleware for things like hot reloading
    // *************** App's actual entry point has to be last *******************
    entry: './src/index',
    // Can replace 'web' to 'node' to have webpack bundle code for Node
    target: 'web',
    // Where it should create web bundle that it serves to the browser - does not actual write any files
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    // Where our code exists
    devServer: {
        contentBase: './dist'
    },
    // HotModuleReplacementPlugin: replace modules w/o full browser refresh
    // webpack.NoErrorsPlugin(): keep errors from breaking hot reload
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // optimizes order of files bundled in for minification
        new webpack.DefinePlugin(GLOBALS), // define var and made available to libraries Webpack is bundling
        new ExtractTextPlugin('styles.css'), // extract CSS into a separate file - need to ref this file in prod ver of HTML
        new webpack.optimize.DedupePlugin(), // eliminates duplicate packages in final bundle to reduce file size
        new webpack.optimize.UglifyJsPlugin() // minifies JS
    ],
    // Types of files we want handled
    // Last 4: bootstrap for fonts
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    }
};
