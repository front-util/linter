import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

import { configs } from '../dist/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
    {
        extends        : configs.react,
        files          : ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parserOptions: {
                projectService: {
                    defaultProject: path.join(__dirname, 'tsconfig.json'),
                },
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            'import-x/no-unresolved'                          : ['error', { ignore: ['^bun:'], }],
            '@typescript-eslint/no-explicit-any'              : 'off',
            '@typescript-eslint/no-unused-vars'               : 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'sonarjs/different-types-comparison'              : 'off',
            'sonarjs/argument-type'                           : 'off',
            'accessor-pairs'                                  : 'off',
            // JS-хелперы не имеют типов → any-вывод неизбежен
            '@typescript-eslint/no-unsafe-assignment'         : 'off',
            '@typescript-eslint/no-unsafe-call'               : 'off',
            '@typescript-eslint/no-unsafe-member-access'      : 'off',
            '@typescript-eslint/no-unsafe-return'             : 'off',
            '@typescript-eslint/no-unsafe-argument'           : 'off',
        },
    },
    // Конфиги вне tsconfig — отключаем type-checked правила
    {
        files          : ['**/*.config.{ts,js}', '**/eslint.config.*'],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project       : null,
            },
        },
        rules: tseslint.configs.disableTypeChecked.rules,
    },
    // JS/JSX файлы не включены в tsconfig — отключаем type-checked правила
    {
        files          : ['**/*.{js,jsx}'],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project       : null,
            },
        },
        rules: {
            ...tseslint.configs.disableTypeChecked.rules,
            // Тестовые файлы содержат intentional-паттерны
            'unicorn/prefer-math-constants'              : 'off',
            'unicorn/class-reference-in-static-methods'  : 'off',
            'unicorn/consistent-class-member-order'      : 'off',
            'unicorn/no-top-level-assignment-in-function': 'off',
            'unicorn/prefer-await'                       : 'off',
            'sonarjs/publicly-writable-directories'      : 'off',
            'react-x/no-unnecessary-use-prefix'          : 'off',
            'react-x/rules-of-hooks'                     : 'off',
        },
    },
    // Хелперы: отключаем проверку имён и type-checked правила
    {
        files: ['helpers/**'],
        rules: {
            'check-file/filename-naming-convention': 'off',
            // Intentional React-паттерны в тестовых файлах
            'react-x/set-state-in-effect'          : 'off',
            'react-x/no-forward-ref'               : 'off',
            'react-x/no-use-context'               : 'off',
        },
    }
]);
