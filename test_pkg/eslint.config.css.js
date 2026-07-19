import { defineConfig } from 'eslint/config';

import { configs, constants } from '../dist/index.js';

export default defineConfig({
    extends: configs.css,
    files  : constants.cssFiles,
});
