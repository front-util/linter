import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import { customRulesMap } from '../custom_rules.config.js';
import {
    files
} from '../constants.js';

const reactPluginConfig = {
    files,
    ...reactPluginRecommended,
    languageOptions: {
        ...reactPluginRecommended.languageOptions,
        globals: {
            ...globals.browser,
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
];