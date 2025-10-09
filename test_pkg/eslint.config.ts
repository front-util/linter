import { defineConfig } from 'eslint/config';

import { configs } from '../dist/index.js';

export default defineConfig({
    extends        : configs.ts,
    files          : ['**/*.{ts,tsx}'],
    languageOptions: {
        parserOptions: {
            project: null,
        },
    },
    rules: {
        'import/no-unresolved'                            : ['error', { ignore: ['^bun:', '^node:'], }],
        // Отключаем строгие правила для тестовых файлов
        '@typescript-eslint/no-explicit-any'              : 'off',
        '@typescript-eslint/no-unused-vars'               : 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
    },
});
