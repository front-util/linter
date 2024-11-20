// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

import { customRulesMap } from '../custom_rules.config.js';
import {
    tsFiles,
    files
} from '../constants.js';
import { type LinterConfig } from "../types.js";

const tsImportPluginConfig = {
    files,
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
                './packages/*/tsconfig.json', 
                './apps/*/tsconfig.json'
            ],
            projectService : true,
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
    tsImportPluginConfig,
    tsPluginConfig,
    customPluginConfigTS
] as LinterConfig[];