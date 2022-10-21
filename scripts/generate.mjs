import { execScriptSync, getArguments } from './utils.mjs';

(() => {
  const folderNames = ['components', 'containers', 'screens', 'utilities'];
  const [featureFolderName, _targetDir = '.'] = getArguments();
  if (!featureFolderName) throw new SyntaxError('Missing folder name!');
  const targetDir = _targetDir.replace(/\/+$/g, '');

  execScriptSync(
    folderNames.reduce((command, folderName, index) => {
      const dirPath = `${targetDir}/${featureFolderName}/${folderName}`;
      const filePath = `${dirPath}/.gitkeep`;

      return (
        command +
        `${
          !index ? `mkdir -p ${targetDir}/${featureFolderName} && ` : ' && '
        }mkdir ${dirPath} && touch ${filePath}`
      );
    }, ''),
  );
})();
