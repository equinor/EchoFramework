import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const typescript = {
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
                            happyPackMode: true
                        }
                    }
                ],
                exclude: /dist/
            }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}'
            }
        })
    ],

    stats: {
        warningsFilter: /export .* was not found in/
    }
};

export default typescript;
