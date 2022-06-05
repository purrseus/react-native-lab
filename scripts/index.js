const { execSync } = require('child_process');

const PLACEHOLDER_NAME = 'ReactNativeLab';
const ENVIRONMENTS = ['development', 'staging', 'production'];

const execSyncInherit = command => execSync(command, { stdio: 'inherit' });

module.exports = { execSyncInherit, PLACEHOLDER_NAME, ENVIRONMENTS };
