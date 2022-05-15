const { execSync } = require('child_process');

const execSyncInherit = command => execSync(command, { stdio: 'inherit' });

const commands = {
  androidClean: 'cd android && ./gradlew clean && cd ..',
  iosClean: 'cd ios && xcodebuild clean -scheme ReactNativeLab && cd ..',
  androidLog: 'react-native log-android',
  iosLog: 'react-native log-ios',
};

module.exports = { execSyncInherit, commands };
