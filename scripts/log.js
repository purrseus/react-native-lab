const readlineSync = require('readline-sync');
const { execSyncInherit, commands } = require('./index');

const options = ['Android log', 'iOS log'];
const optionCommands = {
  'Android log': commands.androidLog,
  'iOS log': commands.iosLog,
};

const index = readlineSync.keyInSelect(options, 'Choose an option:');
execSyncInherit(optionCommands[options[index]]);
