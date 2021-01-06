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
        filename: 'build.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': env.production || !env.development,
            'process.env.NAME': JSON.stringify(require('./package.json').name),
            'process.env.VERSION': JSON.stringify(require('./package.json').version)
        })
    ]
});
// console.log(JSON.stringify(config, null, 1));
export default config;
