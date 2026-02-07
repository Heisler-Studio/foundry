// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require('expo/metro-config');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withNativeWind } = require('nativewind/metro');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const config = getDefaultConfig(__dirname);

// Resolve workspace packages from both app and monorepo root
// Prevents duplicate React when importing from workspace packages
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];

// Force single instance of React to prevent "Invalid hook call" errors
config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, '../../node_modules/react'),
  'react-native': path.resolve(__dirname, '../../node_modules/react-native'),
};

module.exports = withNativeWind(config, { input: './global.css' });
