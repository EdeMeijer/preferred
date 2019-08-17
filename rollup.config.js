import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

const plugins = [terser()];

export default {
    input: 'src/main.js',

    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: pkg.browser,
            format: 'iife',
            name: 'Preferred'
        }
    ],
    plugins
};
