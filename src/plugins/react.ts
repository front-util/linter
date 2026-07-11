import reactX from 'eslint-plugin-react-x';
import { defineConfig } from 'eslint/config';

import { customRulesMap } from '../custom_rules.config.js';
import { tsConfig } from './ts.js';

const customReactConfig = defineConfig({
    settings: {
        'react-x': {
            // Указываем версию React для правил, зависящих от версии
            version: '19.0.0',
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
