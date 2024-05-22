import fs from 'fs-extra';

fs.copySync('./src/assets', './docs/src/assets', { overwrite: true });
fs.rmdirSync('./docs/src/assets/psds', { recursive: true });