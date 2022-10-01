import inquirer from 'inquirer';
import {
  commands,
  createBuildQuestionCollections,
  ensureGitBranch,
  execScriptSync,
  platformBuildTypes,
  uncapitalized,
} from './utils.mjs';

(async () => {
  const buildVariantPrefix = {
    APK: 'assemble',
    AAB: 'bundle',
  };

  const suffixAppId = {
    Development: '.dev',
    Staging: '.stag',
    Production: '',
  };

  const { env, buildType } = await inquirer.prompt(createBuildQuestionCollections('android'));

  ensureGitBranch(env);

  if (platformBuildTypes.android.includes(buildType)) {
    execScriptSync(commands.generateAndroidFile(`${buildVariantPrefix[buildType]}${env}Release`));
  } else {
    execScriptSync(commands.runAndroid(uncapitalized(`${env}${buildType}`), suffixAppId[env]));
  }
})();
