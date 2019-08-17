import minify from 'rollup-plugin-babel-minify';

const name = 'preferred';
const min = process.env.MINIFY || false;

const plugins = [];
const file = `dist/${name}${min ? '.min' : ''}.js`;

if (min) {
    plugins.push(minify({ comments: false }));
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
