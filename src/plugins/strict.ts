import { defineConfig } from 'eslint/config';

import { baseConfig } from './base.js';
import { reactConfig } from './react.js';
import { tsConfig } from './ts.js';

const strictRules = defineConfig({
    rules: {
        // Перенесено из base — style/preference правила, слишком агрессивные для default
        'no-nested-ternary'             : ['error'],
        'prefer-template'               : 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-regex-literals'         : ['error', { disallowRedundantWrapping: true, }],
        'no-useless-rename'             : 'error',
        'object-shorthand'              : 'error',
        'prefer-destructuring'          : ['error', { object: true, array: false, }],

        // Unicorn — включаем правила, отключённые в base
        'unicorn/prefer-spread'                : 'error',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-top-level-await'       : 'warn',

        // SonarJS — включаем правила, отключённые в base
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/prefer-nullish-coalescing'  : 'error',
    },
});

const strictTsRules = defineConfig({
    rules: {
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-shadow'           : 'error',
    },
});

export const strictConfig = defineConfig([
    ...baseConfig,
    strictRules
]);

export const strictTsConfig = defineConfig([
    ...tsConfig,
    strictRules,
    strictTsRules
]);

export const strictReactConfig = defineConfig([
    ...reactConfig,
    strictRules,
    strictTsRules
]);
