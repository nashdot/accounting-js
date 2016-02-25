import { readFileSync } from 'fs';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
import config from './rollup.config';

config.plugins.unshift(nodeResolve({
  jsnext: true,
  main: true,
  browser: true,
  extensions: ['.js']
}));

config.format = 'umd';
config.dest = pkg.main;
config.moduleName = 'accounting';

export default config;
