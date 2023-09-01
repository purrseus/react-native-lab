import {
  commands,
  createBuildQuestionCollections,
  createQuestions,
  execScriptSync,
  platformInfo,
  uncapitalize,
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

  const { env, buildType } = await createQuestions(createBuildQuestionCollections('android'));

  if (platformInfo.buildTypes.android.includes(buildType)) {
    execScriptSync(commands.generateAndroidFile(`${buildVariantPrefix[buildType]}${env}Release`));
  } else {
    execScriptSync(commands.runAndroid(uncapitalize(`${env}${buildType}`), suffixAppId[env]));
  }
})();
