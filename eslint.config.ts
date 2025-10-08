import { defineConfig } from 'eslint/config';

import { configs } from './src/index';

export default defineConfig({
    extends: configs.ts,
    files  : ['src/**/*.{ts,tsx,js}', 'eslint.config.ts', 'tests/utils.test.ts'],
    rules  : {
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});
