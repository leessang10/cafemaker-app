module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@api': './src/api',
            '@types': './src/types',
            '@utils': './src/utils',
            '@navigation': './src/navigation',
          },
        },
      ],
      'react-native-reanimated/plugin', // This must be last
    ],
  };
};