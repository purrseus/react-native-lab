const { execSync } = require('child_process');

const execSyncInherit = command => execSync(command, { stdio: 'inherit' });

module.exports = { execSyncInherit };
