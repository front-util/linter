import { defineConfig } from 'eslint/config';

import { configs } from '../dist/index.js';

export default defineConfig({
    extends: configs.js,
    files  : ['js_test.js'],
    rules  : {
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});
