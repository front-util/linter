// @ts-ignore
import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
// @ts-ignore
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import { customRulesMap } from '../custom_rules.config.js';
import {
    files
} from '../constants.js';
import { type LinterConfig } from "../types.js";

const reactPluginConfig = {
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
};

const reactHooksPluginConfig = {
    files,
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        ...reactHooksPlugin.configs.recommended.rules,
        ...customRulesMap.reactHooks,
    },
};

export const reactPlugins = [
    reactPluginConfig,
    reactHooksPluginConfig
] as LinterConfig[];