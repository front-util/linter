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
            '@typescript-eslint/explicit-function-return-type': 'off',
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
    }
]);
