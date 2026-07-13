import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import checkFilePlugin from 'eslint-plugin-check-file';
import compatPlugin from 'eslint-plugin-compat';
import { importX as importPlugin } from 'eslint-plugin-import-x';
import ally11Plugin from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error - ESLint plugin types
import promisePlugin from 'eslint-plugin-promise';
import pluginSecurity from 'eslint-plugin-security';
import sonarPlugin from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import {
    ignores
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';

const config = defineConfig({
    plugins: {
        'jsx-a11y'  : ally11Plugin,
        'check-file': checkFilePlugin,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType : 'module',
        globals    : {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
        },
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    ignores,
    linterOptions: {
        reportUnusedDisableDirectives: 'error',
    },
    rules: {
        ...customRulesMap.base,
        ...customRulesMap.sonar,
        ...customRulesMap.import,
        ...customRulesMap.jsxA11y,
        ...customRulesMap.stylistic,
        // check-file заменяет заброшенный eslint-plugin-filenames.
        // Конфигурационные файлы (eslint.config.*, *.config.ts) и тесты (*.test.*)
        // используют dot.notation/snake_case по конвенции — проверяются отдельным
        // блоком ниже (configFilesIgnored), где правило отключено.
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.{ts,tsx}': 'CAMEL_CASE',
                '**/*.{js,jsx}': 'CAMEL_CASE',
            }
        ],
    },
});

// Конфиги и тесты освобождены от проверки имён: они используют dot.notation
const configFilesIgnored = defineConfig({
    files: [
        '**/*.config.{ts,js}',
        '**/eslint.config.*',
        '**/*.test.{ts,tsx,js,jsx}'
    ],
    rules: {
        'check-file/filename-naming-convention': 'off',
    },
});

const modernPluginsConfig = defineConfig({
    plugins: {
        unicorn,
        perfectionist,
    },
    rules: {
        ...unicorn.configs.recommended.rules,
        // Отключаем некоторые слишком строгие правила unicorn для совместимости
        'unicorn/no-array-callback-reference'  : 'off',
        'unicorn/prefer-spread'                : 'off',
        'unicorn/no-null'                      : 'off',
        'unicorn/prefer-optional-catch-binding': 'off',
        'unicorn/prefer-top-level-await'       : 'off',
        'unicorn/prevent-abbreviations'        : 'off',
        // Настраиваем perfectionist для алфавитной сортировки
        'perfectionist/sort-imports'           : ['error', {
            type           : 'alphabetical',
            order          : 'asc',
            newlinesBetween: 'always',
            groups         : [
                'type',
                ['builtin', 'external'],
                'internal',
                ['parent', 'sibling', 'index'],
                'unknown'
            ],
        }],
        'perfectionist/sort-named-imports': 'error',
        'perfectionist/sort-named-exports': 'error',
    },
});

export const baseConfig = defineConfig([
    js.configs.recommended,
    compatPlugin.configs['flat/recommended'],
    importPlugin.flatConfigs.recommended,
    promisePlugin.configs['flat/recommended'],
    sonarPlugin.configs?.recommended,
    pluginSecurity.configs.recommended,
    // stylistic.configs.recommended ДО custom-правил, чтобы наши переопределения имели приоритет
    stylistic.configs.recommended,
    stylistic.configs['disable-legacy'],
    modernPluginsConfig,
    config,
    configFilesIgnored
]);
