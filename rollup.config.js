import { uglify } from 'rollup-plugin-uglify';

const name = 'preferred';
const min = process.env.MINIFY || false;

const plugins = [];
const file = `dist/${name}${min ? '.min' : ''}.js`;

if (min) {
    plugins.push(uglify());
}

export default {
    input: 'src/main.js',
    output: {
        file: file,
        format: 'umd',
        name
    },
    plugins
};
