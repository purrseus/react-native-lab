import { execSync } from 'child_process';
import inquirer from 'inquirer';

const PLACEHOLDER_NAME = 'ReactNativeLab';

const appCenter = {
  ownerName: '<Your_owner_name>',
  appName: {
    '🤖 Android': '<Your_Android_app_name>',
    '🍎 iOS': '<Your_iOS_app_name>',
  },
};

const gitBranches = {
  Development: 'develop',
  Staging: 'staging',
  Production: 'main',
};

export const platformInfo = {
  name: {
    android: '🤖 Android',
    ios: '🍎 iOS',
  },
  buildTypes: {
    android: ['APK', 'AAB'],
    ios: ['Archive'],
  },
};

const ensureGitBranch = env => {
  const currentBranchName = execSync('git branch --show-current', {
    encoding: 'utf-8',
  }).replace('\n', '');

  if (gitBranches[env] !== currentBranchName)
    throw new Error(
      `Incorrect branch!\nCurrent branch: ${currentBranchName} (this branch matches the ${
        Object.entries(gitBranches).find(el => el.includes(currentBranchName))[0]
      } environment)\nEnvironment selected: ${env}\n`,
    );
};

export const envs = ['Development', 'Staging', 'Production'];

export const execScriptSync = command => execSync(command, { stdio: 'inherit' });

export const createQuestions = async questions => {
  const answers = await inquirer.prompt(questions);
  const isCodePush = !answers.buildType && !!answers.env;
  const isReleaseBuildType = !!answers.buildType && answers.buildType !== 'Debug';
  if (isReleaseBuildType || isCodePush) ensureGitBranch(answers.env);
  return answers;
};

export const uncapitalize = text =>
  typeof text !== 'string' || !text.length ? '' : `${text[0].toLowerCase()}${text.slice(1)}`;

export const getArguments = () => process.argv.slice(2);

export const createBuildQuestionCollections = platform => [
  {
    type: 'list',
    name: 'env',
    message: `[${platform[platform]}] Select the environment you want to use:`,
    choices: envs,
  },
  {
    type: 'list',
    name: 'buildType',
    message: `[${platformInfo.name[platform]}] Select the build type you want to use:`,
    choices: ['Debug', 'Release'].concat(platformInfo.buildTypes[platform]),
  },
];

export const commands = {
  runAndroid: (buildVariant, suffixAppId) =>
    `yarn react-native run-android --mode ${buildVariant} --appId com.${PLACEHOLDER_NAME.toLowerCase()}${suffixAppId}`,

  generateAndroidFile: buildVariant =>
    `cd android && ./gradlew clean && ./gradlew ${buildVariant} && cd ..`,

  runIos: (env, buildType, envShort) =>
    `ENVFILE=environments/.env.${env} yarn react-native run-ios --configuration '${buildType} (${envShort})' --scheme '${PLACEHOLDER_NAME} (${envShort})'`,

  openXcode: () => 'xed -b ios',

  codePush: (os, env, version) =>
    `appcenter codepush release-react -a ${appCenter.ownerName}/${appCenter.appName[os]} -d ${env} -t ${version} -m`,
};

export const withENV = (envSuffix, command) =>
  `(source ./environments/.env.${envSuffix} && ${command})`;
