import airbnbPlugin from 'eslint-config-airbnb';
import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import compatPlugin from 'eslint-plugin-compat';
import regexPlugin from 'eslint-plugin-optimize-regex';
import promisePlugin from 'eslint-plugin-promise';
import sonarPlugin from 'eslint-plugin-sonarjs';
import filenamesPlugin from 'eslint-plugin-filenames';
import importPlugin from 'eslint-plugin-import';
import ally11Plugin from 'eslint-plugin-jsx-a11y';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import babelParser from "@babel/eslint-parser";
import pluginJs from "@eslint/js";

import {
    files, 
    testFiles, 
    tsFiles,
    jsFiles,
    ignores
} from './constants.js';
import { customRulesMap } from './custom_rules.config.js';

/**
 * ------ plugins configuration ------
 */
const airbnbPluginConfig = {
    files,
    plugins: {
        arbnb: airbnbPlugin,
    },
};

const allyPluginConfig = {
    files,
    plugins: {
        'jsx-a11y': ally11Plugin,
    },
    rules: customRulesMap.jsxA11y,
};

const compatPluginConfig = {
    files,
    plugins: {
        compat: compatPlugin,
    },
    rules: compatPlugin.configs.recommended.rules,
};

const importPluginConfig = {
    files,
    plugins: {
        import: importPlugin,
    },
    settings: {
        ...importPlugin.configs.typescript.settings,
        'import/resolver': {
            ...importPlugin.configs.typescript.settings['import/resolver'],
            typescript: {
                alwaysTryTypes: true,
                project       : ['./tsconfig.json'],
            },
            node: {
                project: ['./tsconfig.json'],
            },
        },
    },
    rules: {
        ...importPlugin.configs.recommended.rules,
        ...importPlugin.configs.typescript.rules,
        ...importPlugin.configs.react.rules,
        ...customRulesMap.import,
    },
};

const filenamesPluginConfig = {
    files,
    plugins: {
        filenames: filenamesPlugin,
    },
};

const jestPluginConfig = {
    files  : testFiles,
    plugins: {
        jest: jestDomPlugin,
    },
};

const promisePluginConfig = {
    files,
    plugins: {
        promise: promisePlugin,
    },
    rules: promisePlugin.configs.recommended.rules,
};

const reactPluginConfig = {
    files,
    ...reactPluginRecommended,
    languageOptions: {
        ...reactPluginRecommended.languageOptions,
        globals: {
            ...globals.browser,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: customRulesMap.react,
};

const reactHooksPluginConfig = {
    files,
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        ...reactHooksPlugin.configs.recommended.rules,
        ...customRulesMap.reactHooks,
    },
};

const sonarPluginConfig = {
    files,
    plugins: {
        sonarjs: sonarPlugin,
    },
    rules: {
        ...sonarPlugin.configs.recommended.rules,
        ...customRulesMap.sonar,
    },
};

const regexPluginConfig = {
    files,
    plugins: {
        'optimize-regex': regexPlugin,
    },
    rules: regexPlugin.configs.recommended.rules,
};

const tsPluginConfig = {
    files  : tsFiles,
    plugins: {
        '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
        parser       : tseslint.parser,
        parserOptions: {
            project: [
                './tsconfig.eslint.json', 
                './packages/*/tsconfig.json', 
                './apps/*/tsconfig.json'
            ],
            tsconfigRootDir: import.meta.dirname, 
        },
    },
    rules: customRulesMap.tsEslint,
};

const testLibPluginConfig = {
    files  : testFiles,
    plugins: {
        'testing-library': testingLibraryPlugin,
    },
    rules: customRulesMap.test,
};

const customPluginConfig = {
    ignores,
    files,
    rules        : customRulesMap.base,
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
};

const customPluginConfigTS = {
    files: tsFiles,
    rules: customRulesMap.onlyTS,
};

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

/**
 * ------ sets of configuration ------
 */
/**
 * base rules
 */
const standartConfigList = [
    pluginJs.configs.recommended,
    airbnbPluginConfig,
    allyPluginConfig,
    compatPluginConfig,
    importPluginConfig,
    filenamesPluginConfig,
    promisePluginConfig,
    sonarPluginConfig,
    regexPluginConfig,
    customPluginConfig
];
/**
 * with ts rules
 */
const tsConfigList = [
    ...tseslint.configs.recommended,
    ...standartConfigList,
    tsPluginConfig,
    customPluginConfigTS
];
/**
 * .test file rules
 */
const testConfigList = [
    jestPluginConfig,
    testLibPluginConfig
];
/**
 * with react rules
 */
const reactConfigList = [
    ...tsConfigList,
    reactPluginConfig,
    reactHooksPluginConfig
];

export const configs = {
    standart: standartConfigList,
    ts      : tsConfigList,
    react   : reactConfigList,
    test    : testConfigList,
    monorepo: [
        ...reactConfigList,
        ...testConfigList,
        babelUpwardJsPluginConfig
    ],
};