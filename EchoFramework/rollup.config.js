import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import dt from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.jsx', '.js', '.tsx', '.ts'];
export default [
    {
        preserveModules: true,
        input: pkg.source,
        output: {
            dir: "dist/",
            // file: "dist/index.js",
            format: 'cjs',
            exports: 'named'
        },
        external: ['react', 'react-dom', '@equinor/echo-core', '@equinor/eds-core-react', 'styled-components'],
        plugins: [
            del({ targets: 'dist/*', runOnce: true }),
            typescript(),
            typescriptPaths(),
            postcss({
                modules: true,
                minimize: true,
                exclude: 'src/theme/theme.css',
            }),
            postcss({
                extract: true,
                modules: false,
                minimize: true,
                include: 'src/theme/theme.css',
                exclude: ' /\.module\.css$/'
              }),
            babel({
                babelrc: false,
                presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
                extensions,
                exclude: './node_modules/**'
            }),
            url(),
            svgr(),
            nodeResolve(),
            commonjs(),
        ]
    },
    {
        input: pkg.source,
        output: [
            {
                file: pkg.types,
                format: 'es'
            }
        ],
        plugins: [
            dt(),             
            postcss({
                extract: true,
                modules: false,
                minimize: true,
                include: 'src/theme/theme.css',
                exclude: ' /\.module\.css$/'
              })
            ]
    },

];