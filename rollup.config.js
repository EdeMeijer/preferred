import pkg from './package.json';
import minify from "rollup-plugin-babel-minify";

const plugins = [minify({ comments: false })];

export default {
    input: 'src/main.js',

    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'esm'
        },
        {
            file: pkg.browser,
            format: 'iife',
            name: 'Preferred'
        }
    ],
    plugins
};
