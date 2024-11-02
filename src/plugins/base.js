import pluginJs from "@eslint/js";
import ally11Plugin from 'eslint-plugin-jsx-a11y';
import compatPlugin from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import filenamesPlugin from 'eslint-plugin-filenames';
import promisePlugin from 'eslint-plugin-promise';
import sonarPlugin from 'eslint-plugin-sonarjs';
import regexPlugin from 'eslint-plugin-optimize-regex';
import globals from 'globals';

import { customRulesMap } from '../custom_rules.config.js';
import {
    files,
    ignores
} from '../constants.js';

const baseConfig = {
    languageOptions: {
        ecmaVersion: 2022,
        sourceType : "module",
        globals    : {
            ...globals.browser,
            ...globals.node,
        },
    },
};

const allyPluginConfig = {
    files,
    plugins: {
        'jsx-a11y': ally11Plugin,
    },
    rules: customRulesMap.jsxA11y,
};

const compatPluginConfig = {
    files,
    plugins: {
        compat: compatPlugin,
    },
    rules: compatPlugin.configs.recommended.rules,
};

const importPluginConfig = {
    files,
    plugins: {
        import: importPlugin,
    },
    rules: {
        ...importPlugin.configs.recommended.rules,
        ...importPlugin.configs.react.rules,
        ...customRulesMap.import,
    },
};

const filenamesPluginConfig = {
    files,
    plugins: {
        filenames: filenamesPlugin,
    },
};

const promisePluginConfig = {
    files,
    plugins: {
        promise: promisePlugin,
    },
    rules: promisePlugin.configs.recommended.rules,
};

const sonarPluginConfig = {
    files,
    plugins: {
        sonarjs: sonarPlugin,
    },
    rules: {
        ...sonarPlugin.configs.recommended.rules,
        ...customRulesMap.sonar,
    },
};

const regexPluginConfig = {
    files,
    plugins: {
        'optimize-regex': regexPlugin,
    },
    rules: regexPlugin.configs.recommended.rules,
};

const customPluginConfig = {
    ignores,
    files,
    rules        : customRulesMap.base,
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
};

export const basePlugins = [
    pluginJs.configs.recommended,
    allyPluginConfig,
    compatPluginConfig,
    importPluginConfig,
    filenamesPluginConfig,
    promisePluginConfig,
    sonarPluginConfig,
    regexPluginConfig,
    customPluginConfig,
    baseConfig
];