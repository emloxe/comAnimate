import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copyright from './copyrightHeader';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/comAnimate.min.js',
      name: 'comAnimate',
      format: 'umd',
      globals: {
        $: '$',
      },
      banner: copyright,
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
    json(),
  ],
};
