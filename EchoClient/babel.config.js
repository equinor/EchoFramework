module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {'runtime': 'automatic'}]],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        'react-hot-loader/babel',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};