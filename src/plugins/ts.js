import tseslint from 'typescript-eslint';

import { basePlugins } from './base.js';
import { customRulesMap } from '../custom_rules.config.js';
import {
    tsFiles
} from '../constants.js';

const tsPluginConfig = {
    files  : tsFiles,
    plugins: {
        '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
        parser       : tseslint.parser,
        parserOptions: {
            project: [
                './tsconfig.json', 
                './packages/*/tsconfig.json', 
                './apps/*/tsconfig.json'
            ],
            tsconfigRootDir: import.meta.dirname, 
        },
    },
    rules: customRulesMap.tsEslint,
};

const customPluginConfigTS = {
    files: tsFiles,
    rules: customRulesMap.onlyTS,
};

export const tsPlugins = [
    ...tseslint.configs.recommended,
    ...basePlugins,
    tsPluginConfig,
    customPluginConfigTS
];