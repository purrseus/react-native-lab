import {
  commands,
  createQuestions,
  envs,
  execScriptSync,
  withENV,
  uncapitalize,
} from './utils.mjs';

(async () => {
  const { os, env } = await createQuestions([
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

  const androidCommand = withENV(
    uncapitalize(env),
    commands.codePush('🤖 Android', env, '$ANDROID_VERSION_NAME'),
  );

  const iosCommand = withENV(uncapitalize(env), commands.codePush('🍎 iOS', env, '$IOS_VERSION'));

  if (os === 'Both') {
    execScriptSync(`${androidCommand} && ${iosCommand}`);
    return;
  }

  execScriptSync(os === '🤖 Android' ? androidCommand : iosCommand);
})();
