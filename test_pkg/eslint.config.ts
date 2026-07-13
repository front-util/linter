import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { configs } from '../dist/index.js';

export default defineConfig([
    {
        extends        : configs.ts,
        files          : ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                // Для тестового стенда отключаем projectService — типизированный линтинг
                // требует, чтобы файлы были частью TS-проекта
                project       : null,
                projectService: false,
            },
        },
        rules: {
            'import-x/no-unresolved'                          : ['error', { ignore: ['^bun:', '^node:'], }],
            // Отключаем строгие правила для тестовых файлов
            '@typescript-eslint/no-explicit-any'              : 'off',
            '@typescript-eslint/no-unused-vars'               : 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
    {
        files: ['helpers/**'],
        rules: {
            'check-file/filename-naming-convention': 'off',
        },
    },
    // Отключаем правила, требующие информации о типах (recommendedTypeChecked),
    // т.к. test_pkg не является полноценным TS-проектом
    tseslint.configs.disableTypeChecked
]);
