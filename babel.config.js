/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@core': './src/core',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@libs': './src/libs',
          '@layouts': './src/layouts',
          '@navigators': './src/navigators',
          '@providers': './src/providers',
          '@services': './src/services',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
