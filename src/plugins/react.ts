import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from "eslint/config";
import globals from 'globals';

import { customRulesMap } from '../custom_rules.config.js';
import { tsConfig } from './ts.js';

const reactHooksConfig = defineConfig({
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: customRulesMap.reactHooks,
});

const customReactConfig = defineConfig({
    plugins: {
        react: reactPlugin,
    },
    languageOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions,
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

export const reactConfig = defineConfig([
    ...tsConfig,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    customReactConfig,
    reactHooksConfig
]);
