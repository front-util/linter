import babelParser from "@babel/eslint-parser";
import tsParser from '@typescript-eslint/parser';

import {customRules, onlyTSRules, onlyJSRules} from './custom_rules.config.js';
import { pluginsConfigsList, testPluginsConfigsList } from './plugins.config.js';
import {files, ignores, tsFiles, jsFiles} from './constants.js';

export default [
    ...pluginsConfigsList,
    ...testPluginsConfigsList,
    {
        ignores,
        files,
        rules        : customRules,
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    {
        files          : tsFiles,
        languageOptions: {
            parser       : tsParser,
            sourceType   : "module",
            ecmaVersion  : 'latest',
            parserOptions: {
                ecmaVersion: 'latest',
                project    : './tsconfig.json',
                sourceType : "module",
            },
        },
        rules: onlyTSRules,
    },
    {
        files          : jsFiles,
        languageOptions: {
            ecmaVersion  : 'latest',
            parser       : babelParser,
            parserOptions: {
                requireConfigFile          : false,
                sourceType                 : "module",
                allowImportExportEverywhere: true,
                babelOptions               : {
                    babelrc   : false,
                    configFile: false,
                    rootMode  : "upward",
                    plugins   : [
                        "@babel/plugin-syntax-import-assertions", 
                        "@babel/plugin-syntax-jsx"
                    ],
                },
            },
        },
        rules: onlyJSRules,
    }
];
