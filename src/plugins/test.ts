// @ts-ignore
import testingLibraryPlugin from 'eslint-plugin-testing-library';
// @ts-ignore
import jestDomPlugin from 'eslint-plugin-jest-dom';
import globals from 'globals';
import { defineConfig } from "eslint/config";

import {
    testFiles 
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';

const testLibPluginConfig = defineConfig({
    files  : testFiles,
    plugins: {
        'testing-library': testingLibraryPlugin,
    },
    rules          : customRulesMap.test,
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
        },
    },
});

const jestPluginConfig = defineConfig({
    files  : testFiles,
    plugins: {
        jest: jestDomPlugin,
    },
});

export const testPlugins = defineConfig([
    jestPluginConfig,
    testLibPluginConfig
]);