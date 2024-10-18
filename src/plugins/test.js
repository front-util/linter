import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';

import {
    testFiles 
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';

const testLibPluginConfig = {
    files  : testFiles,
    plugins: {
        'testing-library': testingLibraryPlugin,
    },
    rules: customRulesMap.test,
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