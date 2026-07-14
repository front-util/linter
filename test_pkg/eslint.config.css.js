import { defineConfig } from 'eslint/config';

import { configs } from '../dist/index.js';

export default defineConfig({
    extends: configs.css,
    files  : ['**/*.css'],
});
