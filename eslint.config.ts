import { defineConfig } from 'eslint/config';

import { configs } from './src/index.js';

export default defineConfig({
    extends: configs.ts,
    files  : ['src/**/*.{ts,tsx,js}', 'eslint.config.ts', 'tests/*'],
    rules  : {
        'import-x/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
    ignores: ['test_pkg/', 'dist/'],
}, {
    // Конфигурационные файлы плагинов используют untyped API (plugin.configs.xxx)
    // — ослабляем типизированные правила
    files: [
        'src/plugins/*.ts'
    ],
    rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment'   : 'off',
    },
}, {
    // Тесты используют any-возвраты ESLint API (calculateConfigForFile и др.) —
    // ослабляем типизированные правила для тестовых файлов
    files: ['tests/**/*.ts'],
    rules: {
        '@typescript-eslint/no-unsafe-assignment'   : 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call'         : 'off',
        'sonarjs/prefer-specific-assertions'        : 'off',
    },
});
