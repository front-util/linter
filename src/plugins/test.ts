// @ts-ignore
import testingLibraryPlugin from 'eslint-plugin-testing-library';
// @ts-ignore
import jestDomPlugin from 'eslint-plugin-jest-dom';
import globals from 'globals';

import {
    testFiles 
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';
import { type LinterConfig } from "../types.js";

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
] as LinterConfig[];