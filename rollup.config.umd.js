import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/accounting.umd.js';
config.moduleName = 'accounting';

export default config;
