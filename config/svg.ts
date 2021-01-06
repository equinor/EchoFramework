const svg = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: { loader: 'svg-inline-loader' }
            }
        ]
    }
};

export default svg;
