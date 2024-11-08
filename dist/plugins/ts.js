import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

import { basePlugins } from './base.js';
import { customRulesMap } from '../custom_rules.config.js';
import { tsFiles } from '../constants.js';

const tsImportPluginConfig = {
    files  : tsFiles,
    plugins: {
        import: importPlugin,
    },
    settings: {
        ...importPlugin.configs.typescript.settings,
        'import/resolver': {
            ...importPlugin.configs.typescript.settings['import/resolver'],
            typescript: {
                alwaysTryTypes: true,
                project       : ['./tsconfig.json'],
            },
            node: {
                project: [
                    './tsconfig.json',
                    '**/tsconfig.json',
                    '**/*/tsconfig.json'
                ],
            },
        },
    },
    rules: {
        ...importPlugin.configs.recommended.rules,
        ...importPlugin.configs.typescript.rules,
        ...importPlugin.configs.react.rules,
        ...customRulesMap.import,
    },
};
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
                './**/tsconfig.json',
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
    tsImportPluginConfig,
    ...tseslint.configs.recommended,
    ...basePlugins,
    tsPluginConfig,
    customPluginConfigTS
];
