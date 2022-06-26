import { execSync } from 'child_process';

export const PLACEHOLDER_NAME = 'ReactNativeLab';

export const execSyncInherit = command => execSync(command, { stdio: 'inherit' });

export const uncapitalized = text =>
  typeof text !== 'string' || !text.length ? '' : `${text[0].toLowerCase()}${text.slice(1)}`;

export const platformBuildTypes = {
  android: ['APK', 'ABB'],
  ios: ['Archive'],
};

export const platformName = {
  android: 'Android',
  ios: 'iOS',
};

export const createBuildQuestionCollections = platform => [
  {
    type: 'list',
    name: 'env',
    message: `[${platformName[platform]}] Select the environment you want to use:`,
    choices: ['Development', 'Staging', 'Production'],
  },
  {
    type: 'list',
    name: 'buildType',
    message: `[${platformName[platform]}] Select the build type you want to use:`,
    choices: ['Debug', 'Release'].concat(platformBuildTypes[platform]),
  },
];

export const commands = {
  runAndroid: (buildVariant, suffixAppId) =>
    `yarn react-native run-android --variant ${buildVariant} --appId com.${PLACEHOLDER_NAME.toLowerCase()}${suffixAppId}`,

  generateAndroidFile: buildVariant =>
    `cd android && ./gradlew clean && ./gradlew ${buildVariant} && cd ..`,

  runIos: (env, buildType, envShort) =>
    `ENVFILE=environments/.env.${env} yarn react-native run-ios --configuration ${buildType} --scheme '${PLACEHOLDER_NAME} (${envShort})'`,

  openXcode: () => `echo 'Opening Xcode... 🔨' && open ios/${PLACEHOLDER_NAME}.xcworkspace`,
};
