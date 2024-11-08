import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import { customRulesMap } from '../custom_rules.config.js';

const reactPluginConfig = {
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
