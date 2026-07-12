import { defineConfig } from 'eslint/config';

import { configs } from '../dist/index.js';

export default defineConfig({
    extends: configs.js,
    files  : ['jsTest.js'],
    rules  : {
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});
