const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add .cjs extension to support Firebase modules
defaultConfig.resolver.sourceExts.push('cjs');

// Disable package exports to avoid Firebase module loading issues
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig; 