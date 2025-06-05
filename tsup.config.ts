import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  skipNodeModulesBundle: true,
  minify: true,
  sourcemap: true,
  outDir: 'dist',
  clean: true,
});
