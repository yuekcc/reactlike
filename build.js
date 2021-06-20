const { build } = require('esbuild');

build({
  entryPoints: ['main.js'],
  outdir: 'dist',
  jsxFactory: 'h',
  target: 'chrome63',
  format: 'esm',
  bundle: true,
});
