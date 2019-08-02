import json from 'rollup-plugin-json';
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
  plugins: [json()],
};
