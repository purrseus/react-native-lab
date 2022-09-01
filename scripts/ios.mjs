import inquirer from 'inquirer';
import {
  createBuildQuestionCollections,
  execSyncInherit,
  platformBuildTypes,
  commands,
  uncapitalized,
  getArguments,
} from './utils.mjs';

(async () => {
  const environment = {
    Development: 'dev',
    Staging: 'stag',
    Production: 'prod',
  };

  const [arg] = getArguments();
  const openXCode = () => execSyncInherit(commands.openXcode());

  if (arg === 'xcode') {
    openXCode();
    return;
  }

  const { env, buildType } = await inquirer.prompt(createBuildQuestionCollections('ios'));
  if (platformBuildTypes.ios.includes(buildType)) {
    openXCode();
  } else {
    execSyncInherit(commands.runIos(uncapitalized(env), buildType, environment[env]));
  }
})();
