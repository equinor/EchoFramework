import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const webpackConfig = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.tsx'],
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'assets/echo.bundle.js',
        // chunkFilename: 'assets/[name].[contenthash].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: 'echo-[folder]__[local]-[hash:base64:5]'
                            }
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader']
            }
        ]
    },
    devServer: {
        contentBase: [path.join(__dirname, 'build'), path.join(__dirname, 'public')],
        compress: true,
        port: 8080,
        // historyApiFallback: true,
        http2: true
        // overlay: {
        //   warnings: true,
        //   errors: true,
        // },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            ignoreStub: false,
            expand: true,
            systemvars: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
    // optimization: {
    // splitChunks: {
    //     chunks: 'all'
    // },
    //     minimize: true
    // }
};

export default webpackConfig;
