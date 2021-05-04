import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import assets from 'postcss-assets';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.jsx', '.js', '.tsx', '.ts'];
export default [
    {
        preserveModules: true,
        input: pkg.source,
        output: {
            dir: 'dist/',
            format: 'cjs',
            exports: 'named'
        },
        external: [
            'react',
            'react-dom',
            'react-router-dom',
            '@equinor/echo-core',
            '@equinor/echo-base',
            '@equinor/echo-components',
            '@equinor/echo-utils',
            '@equinor/eds-core-react',
            'styled-components'
        ],
        plugins: [
            del({ targets: 'dist/*', runOnce: true }),
            json(),
            typescript(),
            postcss({
                modules: true,
                minimize: true,
                exclude: 'src/theme/theme.css',
                plugins: [
                    assets({
                        loadPaths: ['**']
                    })
                ]
            }),
            postcss({
                extract: true,
                modules: false,
                minimize: true,
                include: 'src/theme/theme.css',
                exclude: /\.module\.css$/
            }),
            babel({
                babelrc: false,
                presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
                extensions,
                exclude: './node_modules/**'
            }),
            url(),
            image(),
            nodeResolve(),
            commonjs()
        ]
    }
];
