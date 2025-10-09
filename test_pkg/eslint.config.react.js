import { defineConfig } from 'eslint/config';

import { configs } from '../dist/index.js';

export default defineConfig({
    extends        : configs.react,
    files          : ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
        parserOptions: {
            project: null,
        },
    },
    rules: {
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});
