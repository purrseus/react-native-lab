import { execSyncInherit, getArguments } from './utils.mjs';

(() => {
  let command = '';
  const folderNames = ['components', 'hooks', 'screens', 'styles', 'utilities'];
  const [featureFolderName, _targetDir = ''] = getArguments();
  if (!featureFolderName) throw new SyntaxError('Missing folder name!');
  const targetDir = _targetDir.replace(/\/+$/g, '');

  folderNames.forEach((folderName, index) => {
    const dirPath = `${targetDir}/${featureFolderName}/${folderName}`;
    const filePath = `${dirPath}/index.ts`;

    command += `${
      !index ? `mkdir -p ${targetDir}/${featureFolderName} && ` : ' && '
    }mkdir ${dirPath} && touch ${filePath} && echo "export {};" > ${filePath}`;
  });

  execSyncInherit(command);
})();
