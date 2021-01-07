const svg = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader']
            }
        ]
    }
};

export default svg;
