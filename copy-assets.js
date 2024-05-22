import fs from 'fs-extra';

fs.copySync('./src/assets', './dist/src/assets', { overwrite: true });
fs.rmdirSync('./dist/src/assets/psds', { recursive: true });