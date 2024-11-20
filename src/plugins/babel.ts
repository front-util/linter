import babelParser from "@babel/eslint-parser";

import {
    jsFiles
} from '../constants.js';
import { customRulesMap } from '../custom_rules.config.js';
import { type LinterConfig } from "../types.js";

const babelUpwardJsPluginConfig = {
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
    rules: customRulesMap.onlyJS,
};

export const babelPlugins = [
    babelUpwardJsPluginConfig
] as LinterConfig[];