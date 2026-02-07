const path = require('path');

const resolvePackageDir = (packageName) => {
  const entryPath = require.resolve(packageName, {
    paths: [process.cwd()],
  });

  // Most workspace packages resolve to something like <pkg>/dist/index.js.
  // Convert that entrypoint back to the package root.
  return path.resolve(path.dirname(entryPath), '..');
};

const rncDir = resolvePackageDir('@foundry/react-native-components');

module.exports = [
  path.join(rncDir, 'src', '**/*.{js,jsx,ts,tsx}'),
  path.join(rncDir, 'dist', '**/*.{js,jsx,ts,tsx}'),
];
