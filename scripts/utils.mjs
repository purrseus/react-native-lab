import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

const PLACEHOLDER_NAME = 'ReactNativeLab';
const APP_CENTER_OWNER_NAME = '<Your_owner_name>';

const appCenterAppName = {
  '🤖 Android': '<Your_Android_app_name>',
  '🍎 iOS': '<Your_iOS_app_name>',
};

const platformName = {
  android: '🤖 Android',
  ios: '🍎 iOS',
};

export const platformBuildTypes = {
  android: ['APK', 'ABB'],
  ios: ['Archive'],
};

export const envs = ['Development', 'Staging', 'Production'];

export const execSyncInherit = command => execSync(command, { stdio: 'inherit' });

export const uncapitalized = text =>
  typeof text !== 'string' || !text.length ? '' : `${text[0].toLowerCase()}${text.slice(1)}`;

export const getArguments = () => process.argv.slice(2);

export const createBuildQuestionCollections = platform => [
  {
    type: 'list',
    name: 'env',
    message: `[${platformName[platform]}] Select the environment you want to use:`,
    choices: envs,
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
    `ENVFILE=environments/.env.${env} yarn react-native run-ios --configuration '${buildType} (${envShort})' --scheme '${PLACEHOLDER_NAME} (${envShort})'`,

  openXcode: () => `echo '\nOpening Xcode... 🔨\n' && open ios/${PLACEHOLDER_NAME}.xcworkspace`,

  codePush: (os, env, version) =>
    `appcenter codepush release-react -a ${APP_CENTER_OWNER_NAME}/${appCenterAppName[os]} -d ${env} -t ${version}`,
};

export const loadEnvFile = envSuffix => {
  const env = readFileSync(path.join(`environments/.env.${envSuffix}`), 'utf8');

  return Object.fromEntries(
    env
      .split('\n')
      .filter(line => !!line.length && !line.startsWith('#'))
      .map(line => {
        const firstEqualIndex = line.indexOf('=');
        if (firstEqualIndex < 0) throw new SyntaxError(`.env.${envSuffix}`);

        return [
          line.slice(0, firstEqualIndex),
          line.slice(firstEqualIndex + 1).replace(/(^"|"$)/g, ''),
        ];
      }),
  );
};
