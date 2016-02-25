import { readFileSync } from 'fs';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

export default {
  entry: pkg['jsnext:main'],
  sourceMap: true,
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
