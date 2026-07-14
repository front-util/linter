import cssPlugin from '@eslint/css';
import { defineConfig } from 'eslint/config';

import { customRulesMap } from '../custom_rules.config.js';

export const cssConfig = defineConfig([
    // Базовый конфиг: recommended-правила + language + files
    {
        ...cssPlugin.configs.recommended,
        files   : ['**/*.css'],
        plugins : { css: cssPlugin, },
        language: 'css/css',
    },
    // Пользовательские переопределения
    {
        files   : ['**/*.css'],
        plugins : { css: cssPlugin, },
        language: 'css/css',
        rules   : customRulesMap.css,
    }
]);
