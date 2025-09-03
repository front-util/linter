import { defineConfig } from "eslint/config";
import pluginJs from "@eslint/js";
import ally11Plugin from 'eslint-plugin-jsx-a11y';
import compatPlugin from 'eslint-plugin-compat';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
// @ts-ignore
import filenamesPlugin from 'eslint-plugin-filenames';
// @ts-ignore
import promisePlugin from 'eslint-plugin-promise';
import sonarPlugin from 'eslint-plugin-sonarjs';
// @ts-ignore
import regexPlugin from 'eslint-plugin-optimize-regex';
import globals from 'globals';
import pluginSecurity from 'eslint-plugin-security';

import { customRulesMap } from '../custom_rules.config.js';
import {
    files,
    ignores
} from '../constants.js';

const baseConfig = defineConfig({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType : "module",
        globals    : {
            ...globals.browser,
            ...globals.node,
        },
    },
});

const allyPluginConfig = defineConfig({
    files,
    plugins: {
        'jsx-a11y': ally11Plugin,
    },
    rules: customRulesMap.jsxA11y,
});

const compatPluginConfig = defineConfig({
    files,
    plugins: {
        compat: compatPlugin,
    },
    rules: compatPlugin.configs.recommended.rules,
});

const importPluginConfig = defineConfig({
    files,
    plugins: {
        import: importPlugin,
    },
    rules: {
        ...importPlugin.configs.recommended.rules,
        ...importPlugin.configs.react.rules,
        ...customRulesMap.import,
    },
});

const filenamesPluginConfig = defineConfig({
    files,
    plugins: {
        filenames: filenamesPlugin,
    },
});

const promisePluginConfig = defineConfig({
    files,
    plugins: {
        promise: promisePlugin,
    },
    rules: promisePlugin.configs.recommended.rules,
});

const sonarPluginConfig = defineConfig({
    files,
    plugins: {
        sonarjs: sonarPlugin,
    },
    rules: {
        ...sonarPlugin.configs.recommended.rules,
        ...customRulesMap.sonar,
    },
});

const regexPluginConfig = defineConfig({
    files,
    plugins: {
        'optimize-regex': regexPlugin,
    },
    rules: regexPlugin.configs.recommended.rules,
});

const customPluginConfig = defineConfig({
    ignores,
    files,
    rules        : customRulesMap.base,
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
});

export const basePlugins = defineConfig([
    defineConfig(pluginSecurity.configs.recommended),
    defineConfig(pluginJs.configs.recommended),
    allyPluginConfig,
    compatPluginConfig,
    importPluginConfig,
    filenamesPluginConfig,
    promisePluginConfig,
    sonarPluginConfig,
    regexPluginConfig,
    customPluginConfig,
    baseConfig
]);