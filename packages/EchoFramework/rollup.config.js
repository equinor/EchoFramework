import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import assets from 'postcss-assets';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const peerDeps = Object.keys(pkg.peerDependencies || {});
const extensions = ['.jsx', '.js', '.tsx', '.ts'];
export default [
    {
        preserveModules: true,
        input: pkg.source,
        output: {
            dir: 'dist/',
            format: 'cjs',
            exports: 'named',
            plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
        },
        external: peerDeps,
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
                presets: ['@babel/preset-react'],
                extensions,
                babelHelpers: 'bundled',
                exclude: './node_modules/**'
            }),
            url(),
            image(),
            nodeResolve(),
            commonjs()
        ]
    }
];
