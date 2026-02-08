const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Expo SDK 52+ automatically configures Metro for monorepos.
// Avoid overriding resolver options like extraNodeModules/nodeModulesPaths.
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
