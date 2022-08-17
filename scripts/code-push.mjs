import inquirer from 'inquirer';
import { commands, envs, execSyncInherit, loadEnvFile, uncapitalized } from './utils.mjs';

(async () => {
  const { os, env } = await inquirer.prompt([
    {
      type: 'list',
      name: 'os',
      message: 'Select the OS to release:',
      choices: ['🤖 Android', '🍎 iOS', 'Both'],
    },
    {
      type: 'list',
      name: 'env',
      message: 'Select the environment you want to release:',
      choices: envs,
    },
  ]);

  const { ANDROID_VERSION_NAME, IOS_VERSION } = loadEnvFile(uncapitalized(env));

  if (os === 'Both') {
    execSyncInherit(
      `${commands.codePush('🤖 Android', env, ANDROID_VERSION_NAME)} && ${commands.codePush(
        '🍎 iOS',
        env,
        IOS_VERSION,
      )}`,
    );
    return;
  }

  execSyncInherit(
    commands.codePush(os, env, os === '🤖 Android' ? ANDROID_VERSION_NAME : IOS_VERSION),
  );
})();
