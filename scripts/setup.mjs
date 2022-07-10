import { writeFileSync } from 'fs';
import { execSyncInherit } from './utils.mjs';

const androidAppSecret = '';
const iosAppSecret = '';

const json = JSON.stringify({ app_secret: androidAppSecret }, null, 2);

const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>AppSecret</key>
    <string>${iosAppSecret}</string>
  </dict>
</plist>
`;

(async () => {
  writeFileSync('android/app/src/main/assets/appcenter-config.json', json);
  writeFileSync('ios/AppCenter-Config.plist', plist);
  console.log('AppCenter done! ✨✨✨');
  execSyncInherit('yarn prepare');
  execSyncInherit('yarn postinstall');
})();
