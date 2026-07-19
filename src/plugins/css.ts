import cssPlugin from '@eslint/css';
import { defineConfig } from 'eslint/config';

import { cssFiles } from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';

export const cssConfig = defineConfig([
    // Базовый конфиг: recommended-правила + language + files
    {
        ...cssPlugin.configs.recommended,
        files   : cssFiles,
        plugins : { css: cssPlugin, },
        language: 'css/css',
    },
    // Пользовательские переопределения
    {
        files   : cssFiles,
        plugins : { css: cssPlugin, },
        language: 'css/css',
        rules   : customRulesMap.css,
    }
]);
