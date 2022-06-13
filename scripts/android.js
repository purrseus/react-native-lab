const inquirer = require('inquirer');
const {
  createBuildQuestionCollections,
  execSyncInherit,
  uncapitalized,
  platformBuildTypes,
  commands,
} = require('./utils');

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
