/* eslint-disable @typescript-eslint/no-var-requires */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import resolve from './config/resolve';
import styles from './config/style';
import svg from './config/svg';
import typescript from './config/typescript';

const env = process.env;

const config = merge<Configuration>(resolve, typescript, styles, svg, {
    entry: './src/index.tsx',
    ...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js'
    },
    // resolve: {
    //     alias: {
    //         react: path.resolve(__dirname, 'node_modules', 'react')
    //     }
    // },
    optimization: {
        runtimeChunk: 'single'
        // splitChunks: {
        //     chunks: 'all'
        //   maxInitialRequests: Infinity,
        //   minSize: 0,
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name(module) {
        //         // get the name. E.g. node_modules/packageName/not/this/part.js
        //         // or node_modules/packageName
        //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

        //         // npm package names are URL-safe, but some servers don't like @ symbols
        //         return `npm.${packageName.replace('@', '')}`;
        //       },
        //     },
        //   },
        // }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': env.production || !env.development,
            'process.env.NAME': JSON.stringify(require('./package.json').name),
            'process.env.VERSION': JSON.stringify(require('./package.json').version)
        })
    ]
});

export default config;
