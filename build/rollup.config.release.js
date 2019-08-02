import json from 'rollup-plugin-json';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copyright from '../src/copyrightHeader';

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
    json(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env']],
    }),
    terser(),
  ],
};
