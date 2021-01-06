import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import threadLoader from 'thread-loader';

threadLoader.warmup({}, ['ts-loader', 'style-loader', 'css-loader']);

module.exports = (rootDir) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                            compilerOptions: {
                                rootDir
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    stats: {
        warningsFilter: /export .* was not found in/
    }
});
