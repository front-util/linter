import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import globals from 'globals';

import {
    testFiles 
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';

const testLibPluginConfig = {
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
};

const jestPluginConfig = {
    files  : testFiles,
    plugins: {
        jest: jestDomPlugin,
    },
};

export const testPlugins = [
    jestPluginConfig,
    testLibPluginConfig
];