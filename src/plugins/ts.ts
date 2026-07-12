import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { customRulesMap } from '../custom_rules.config.js';
import { baseConfig } from './base.js';

const tsImportPluginConfig = defineConfig({
    settings: {

        ...(importPlugin.configs.typescript.settings as Record<string, unknown>),
        'import/resolver': {

            ...(importPlugin.configs.typescript.settings?.['import/resolver'] as Record<string, unknown>),
            typescript: {
                alwaysTryTypes: true,
                project       : null,
            },
            node: {
                project: null,
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
            // projectService — современный подход вместо устаревшего parserOptions.project.
            // Автоматически находит tsconfig.json в рабочей директории и выше,
            // синхронизирует типы с редактором (VS Code и др.)
            // defaultProject используется как fallback для файлов вне любого tsconfig
            // (например, eslint.config.ts, временные файлы и т.п.)
            projectService: {
                defaultProject: 'tsconfig.json',
            },
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
    // recommendedTypeChecked — правила, требующие информации о типах TS
    // (no-floating-promises, no-misused-promises, no-unnecessary-type-assertion и др.)
    tseslint.configs['recommendedTypeChecked'],
    importPlugin.flatConfigs.typescript,
    tsImportPluginConfig,
    tsPluginConfig,
    customPluginConfigTS
]);
