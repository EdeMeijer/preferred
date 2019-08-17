import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/preferred.js',
        format: 'umd',
        name: 'preferred'
    },
    plugins: [ uglify() ]
};
