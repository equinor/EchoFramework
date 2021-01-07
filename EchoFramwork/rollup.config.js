import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import dt from 'rollup-plugin-dts';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import ts2 from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.jsx', '.js', '.tsx', '.ts'];
export default [
    {
        preserveModules: true,
        input: pkg.source,
        output: {
            dir: "dist/",
            format: 'cjs',
            exports: 'named'
        },
        external: ['react', 'react-dom', '@equinor/echo-core', '@equinor/eds-core-react', 'styled-components' ],
        plugins: [
            del({ targets: 'dist/*', runOnce: true }),
            ts2(),
            typescriptPaths(),
            babel({
                babelrc: false,
                presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
                extensions,
                exclude: 'node_modules/**'
            }),
            commonjs({}),
            url(),
            svgr(),
            postcss({
                plugins: [autoprefixer()],
                sourceMap: true,
                extract: true,
                minimize: true
            }),
            resolve()
       
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
        plugins: [dt()]
    },

];
