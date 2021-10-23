const { build } = require('esbuild');

build({
  entryPoints: ['src/index.js'],
  outdir: 'lib/reactlike',
  target: 'chrome63',
  format: 'esm',
  bundle: true,
});
