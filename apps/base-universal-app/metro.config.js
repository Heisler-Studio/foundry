// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require('expo/metro-config');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withNativeWind } = require('nativewind/metro');

// Expo SDK 52+ automatically configures Metro for monorepos.
// Avoid overriding resolver options like extraNodeModules/nodeModulesPaths.
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
