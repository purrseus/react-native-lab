#!/usr/bin/env node

const fs = require('fs');
const { PLACEHOLDER_NAME, ENVIRONMENTS } = require('./index');

try {
  ENVIRONMENTS.forEach((env, i, arr) => {
    const envData = fs.readFileSync(`environments/.env.${env}`, 'utf8');
    const { name: packageName } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const content = envData
      .replaceAll(PLACEHOLDER_NAME, packageName)
      .replaceAll(PLACEHOLDER_NAME.toLowerCase(), packageName.toLowerCase());
    fs.writeFileSync(`environments/.env.${env}`, content);
    if (i === arr.length - 1) {
      const indexData = fs.readFileSync('scripts/index.js', 'utf8');
      const indexContent = indexData.replaceAll(PLACEHOLDER_NAME, packageName);
      fs.writeFileSync('scripts/index.js', indexContent);
    }
  });
} catch (err) {
  console.error(err);
}
