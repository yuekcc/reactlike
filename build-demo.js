const { build } = require('esbuild');
const fs = require('node:fs/promises');
const { constants } = require('node:fs');
const path = require('node:path');

const isExists = async x => {
  try {
    await fs.access(x, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const extensions = ['js', 'jsx', 'ts', 'tsx', 'cjs', 'mjs', 'cjsx', 'mjsx'];

const aliasPlugin = () => {
  return {
    name: 'aliasPlugin',
    setup(build) {
      build.onResolve({ filter: /^@\// }, async args => {
        let actualPath = path.normalize(args.path.replaceAll(/^@/g, path.resolve(__dirname, 'lib')));

        const stat = await fs.stat(actualPath);
        if (stat.isDirectory()) {
          const testPath = path.join(actualPath, 'index.js');
          if (isExists(testPath)) {
            actualPath = testPath;
          }
        } else {
          for (const ext of extensions) {
            const testPath = actualPath + '.' + ext;
            if (isExists(testPath)) {
              actualPath = testPath;
              break;
            }
          }
        }

        return {
          path: actualPath,
        };
      });
    },
  };
};

build({
  entryPoints: ['demo/index.js'],
  outdir: 'dist',
  jsxFactory: 'h',
  target: 'chrome63',
  format: 'esm',
  bundle: true,
  plugins: [aliasPlugin()],
});
