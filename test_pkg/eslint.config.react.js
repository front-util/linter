import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { configs } from '../dist/index.js';

export default defineConfig([
    {
        extends       : configs.react,
        files         : ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parserOptions: {
                // Для тестового стенда отключаем projectService — типизированный линтинг
                // требует, чтобы файлы были частью TS-проекта
                project        : null,
                projectService : false,
            },
        },
        rules: {
            'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
        },
    },
    // Отключаем правила, требующие информации о типах (recommendedTypeChecked),
    // т.к. test_pkg не является полноценным TS-проектом
    tseslint.configs.disableTypeChecked,
]);
