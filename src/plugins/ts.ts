import importPlugin from 'eslint-plugin-import';
import { defineConfig } from "eslint/config";
import tseslint from 'typescript-eslint';

import { customRulesMap } from '../custom_rules.config.js';
import { baseConfig } from './base.js';

const tsImportPluginConfig = defineConfig({
    settings: {
        ...importPlugin.configs.typescript.settings,
        'import/resolver': {
            ...importPlugin.configs.typescript.settings?.['import/resolver'],
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
        ...customRulesMap.import,
    },
});

const tsPluginConfig = defineConfig({
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
            projectService : false,
            tsconfigRootDir: process.cwd(), 
        },
    },
    rules: customRulesMap.tsEslint,
});

const customPluginConfigTS = defineConfig({
    rules: customRulesMap.onlyTS,
});

export const tsConfig = defineConfig([
    ...baseConfig,
    tseslint.configs.recommended,
    importPlugin.flatConfigs.typescript,
    tsImportPluginConfig,
    tsPluginConfig,
    customPluginConfigTS
]);
