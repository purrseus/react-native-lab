module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@core': './src/core',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@layouts': './src/layouts',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utilities': './src/utilities',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
