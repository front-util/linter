import reactX from 'eslint-plugin-react-x';
import { defineConfig } from 'eslint/config';

import { customRulesMap } from '../custom_rules.config.js';
import { tsConfig } from './ts.js';

const customReactConfig = defineConfig({
    settings: {
        'react-x': {
            // Автоопределение версии React из node_modules потребителя.
            // Поддерживает любую установленную версию (17, 18, 19 и т.д.)
            version: 'detect',
        },
    },
    rules: customRulesMap.react,
});

export const reactConfig = defineConfig([
    ...tsConfig,
    // Базовый recommended-набор react-x (rules-of-hooks, exhaustive-deps, no-array-index-key и др.)
    // Определяет плагин 'react-x' и включает recommended-правила
    reactX.configs.recommended,
    // Пользовательские переопределения (включая отключение/настройку отдельных правил)
    customReactConfig
]);
