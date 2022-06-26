import inquirer from 'inquirer';
import {
  createBuildQuestionCollections,
  execSyncInherit,
  uncapitalized,
  platformBuildTypes,
  commands,
} from './utils.mjs';

const buildVariantPrefix = {
  APK: 'assemble',
  ABB: 'bundle',
};

const suffixAppId = {
  Development: '.dev',
  Staging: '.stag',
  Production: '',
};

(async () => {
  const { env, buildType } = await inquirer.prompt(createBuildQuestionCollections('android'));
  if (platformBuildTypes.android.includes(buildType)) {
    execSyncInherit(commands.generateAndroidFile(`${buildVariantPrefix[buildType]}${env}Release`));
  } else {
    execSyncInherit(commands.runAndroid(uncapitalized(`${env}${buildType}`), suffixAppId[env]));
  }
})();
