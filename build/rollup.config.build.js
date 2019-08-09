import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import copyright from '../src/copyrightHeader';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/comAnimate.js',
    name: 'comAnimate',
    format: 'umd',
    sourcemap: 'inline',
    globals: {
      $: '$',
    },
    banner: copyright,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
  ],
};
