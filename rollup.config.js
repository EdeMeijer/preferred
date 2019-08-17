import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

const plugins = [
    babel(),
    terser({ ecma: 5 })
];

export default {
    input: 'src/main.js',
    output: [
        {
            file: './dist/preferred.js',
            format: 'umd',
            name: 'preferred'
        }
    ],
    plugins
};
