import inquirer from 'inquirer';
import {
  createBuildQuestionCollections,
  execSyncInherit,
  platformBuildTypes,
  commands,
  uncapitalized,
} from './utils.mjs';

const environment = {
  Development: 'dev',
  Staging: 'stag',
  Production: 'prod',
};

(async () => {
  const _arguments = process.argv.slice(2);
  const openXCode = () => execSyncInherit(commands.openXcode());

  if (_arguments.includes('xcode')) {
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
