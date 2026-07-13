import type { Linter } from 'eslint';

import { importX as importPlugin } from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { customRulesMap } from '../custom_rules.config.js';
import { baseConfig } from './base.js';

const tsImportPluginConfig = defineConfig({
    settings: {

        ...(importPlugin.configs.typescript.settings as Record<string, unknown>),
        'import-x/resolver': {

            ...(importPlugin.configs.typescript.settings?.['import-x/resolver'] as Record<string, unknown>),
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

// Конфиги и test_pkg-файлы не являются частью TS-проекта —
// отключаем projectService и правила, требующие информации о типах.
// disableTypeChecked содержит все type-checked правила — извлекаем их для применения
// только к конфиг-файлам (а не ко всем файлам как в test_pkg).
const { rules: typeCheckedOffRules, } = tseslint.configs.disableTypeChecked;
const configFilesOverride = defineConfig({
    files          : ['**/*.config.{ts,js}', '**/eslint.config.*'],
    rules          : typeCheckedOffRules as Linter.RulesRecord,
    languageOptions: {
        parserOptions: {
            projectService: false,
            project       : null,
        },
    },
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
    customPluginConfigTS,
    configFilesOverride
]);
