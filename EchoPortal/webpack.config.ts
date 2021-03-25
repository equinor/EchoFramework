/* eslint-disable @typescript-eslint/no-var-requires */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
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
    mode: env.production ? 'production' : 'development',
    module: {
        rules: []
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
            'process.env.VERSION': JSON.stringify(require('./package.json').version),
            'process.env.REACT_APP_API_URL': 'https://dt-echopedia-api-dev.azurewebsites.net',
            'process.env.REACT_APP_AZURE_AD_TENNANT': 'StatoilSRM.onmicrosoft.com',
            'process.env.REACT_APP_AZURE_AD_TENNANT_ID': '3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
            'process.env.REACT_APP_AZURE_AD_CLIENT_ID': '751d2504-0b66-4b78-9807-4b60525a14c6'
        }),
        new Dotenv({
            path: './.env'
        })
    ]
});

export default config;
