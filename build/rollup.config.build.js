import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import copyright from './copyrightHeader';

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
    resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    json(),
  ],
};
