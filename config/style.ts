const cssModuleRegex = /\.module\.css$/;
const cssRegex = /\.css$/;

const styles = {
    module: {
        rules: [
            {
                test: cssRegex,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/
            },
            {
                test: cssModuleRegex,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true
                            }
                        }
                    }
                    // {
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     loader: 'css-modules-typescript-loader'
                    // }
                ]
            }
        ]
    }
};

export default styles;
