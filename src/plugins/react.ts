// @ts-ignore
import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from "eslint/config";

import { customRulesMap } from '../custom_rules.config.js';
import {
    files
} from '../constants.js';

const reactPluginConfig = defineConfig({
    files,
    ...reactPluginRecommended,
    languageOptions: {
        ...reactPluginRecommended.languageOptions,
        globals: {
            ...globals.browser,
            jest: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: customRulesMap.react,
});

const reactHooksPluginConfig = defineConfig({
    files,
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        ...reactHooksPlugin.configs.recommended.rules,
        ...customRulesMap.reactHooks,
    },
});

export const reactPlugins = defineConfig([
    reactPluginConfig,
    reactHooksPluginConfig
]);