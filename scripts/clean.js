const readlineSync = require('readline-sync');
const { execSyncInherit, commands } = require('./index');

const options = ['Clean all', 'Android clean', 'iOS clean'];
const optionCommands = {
  'Android clean': commands.androidClean,
  'iOS clean': commands.iosClean,
  'Clean all': `${commands.androidClean} && ${commands.iosClean}`,
};

const index = readlineSync.keyInSelect(options, 'Choose an option:');
execSyncInherit(optionCommands[options[index]]);
