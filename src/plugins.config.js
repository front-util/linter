import airbnbPlugin from 'eslint-config-airbnb';
import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import compatPlugin from 'eslint-plugin-compat';
import regexPlugin from 'eslint-plugin-optimize-regex';
import promisePlugin from 'eslint-plugin-promise';
import sonarPlugin from 'eslint-plugin-sonarjs';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import filenamesPlugin from 'eslint-plugin-filenames';
import importPlugin from 'eslint-plugin-import';
import ally11Plugin from 'eslint-plugin-jsx-a11y';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import globals from 'globals';

import { fullEslintAliases } from './aliases.js';
import {files, testFiles, tsFiles} from './constants.js';

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
    rules: {
        'jsx-a11y/anchor-is-valid'                       : 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/interactive-supports-focus'            : 'off',
        'jsx-a11y/click-events-have-key-events'          : 'off',
        'jsx-a11y/control-has-associated-label'          : 'off',
    },
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
            alias: {
                map       : fullEslintAliases,
                extensions: ['.ts', '.tsx', '.json', '.js', 'jsx'],
            },
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
        'import/no-extraneous-dependencies': [
            'error',
            {
                peerDependencies: true,
            }
        ],
        'import/prefer-default-export'     : 0,
        'import/no-named-as-default'       : 'off',
        'import/no-dynamic-require'        : 'off',
        'import/no-named-as-default-member': 'off',
        'import/extensions'                : 'off',
        'import/namespace'                 : 'off',
        'import/default'                   : 'off',
        'import/export'                    : 'off',
    },
};

const filenamesPluginConfig = {
    files,
    plugins: {
        filenames: filenamesPlugin,
    },
    rules: {
        "filenames/match-exported": [ 2, [null, "camel", "pascal", "snake"] ],
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
    rules: {
        'react/sort-comp': [1, {
            order: [
                'static-variables',
                'static-methods',
                'instance-variables',
                'lifecycle',
                'everything-else',
                'render'
            ],
        }],
        'react/jsx-uses-react'             : [1],
        'react/jsx-props-no-spreading'     : 'off',
        'react/static-property-placement'  : 'off',
        'react/state-in-constructor'       : 'off',
        'react/jsx-fragments'              : 'off',
        'react/no-access-state-in-setstate': 'off',
        'react/destructuring-assignment'   : 'off',
        'react-hooks/rules-of-hooks'       : 'error',
        'react-hooks/exhaustive-deps'      : 'warn',
        'react/forbid-prop-types'          : ['warn', {
            forbid: [
                'any'
            ],
            checkContextTypes     : true,
            checkChildContextTypes: true,
        }],
        'react/no-array-index-key'   : 'off',
        'react/no-children-prop'     : 'off',
        'react/no-danger'            : 'off',
        'react/require-default-props': ['off', {
            forbidDefaultForRequired: true,
        }],
        'react/jsx-indent'            : ['warn', 4],
        'react/jsx-indent-props'      : ['warn', 4],
        'react/jsx-max-props-per-line': ['off', {
            maximum: 3,
        }],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-tag-spacing'            : ['error', {
            closingSlash     : 'never',
            beforeSelfClosing: 'always',
            afterOpening     : 'never',
        }],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ],
            }
        ],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function', }],
    },
};

const reactHooksPluginConfig = {
    files,
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        ...reactHooksPlugin.configs.recommended.rules,
        'react-hooks/rules-of-hooks' : 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};

const sonarPluginConfig = {
    files,
    plugins: {
        sonarjs: sonarPlugin,
    },
    rules: {
        ...sonarPlugin.configs.recommended.rules,
        'sonarjs/no-nested-template-literals': 0,
        'sonarjs/no-duplicate-string'        : 0,
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
        '@typescript-eslint': tsPlugin,
    },
    rules: {
        ...tsPlugin.configs.recommended.rules,
        '@typescript-eslint/no-unused-vars': ['error', {
            vars              : 'all',
            args              : 'after-used',
            ignoreRestSiblings: false,
            varsIgnorePattern : 'React',
        }],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/ban-ts-comment'      : 0,
        '@typescript-eslint/no-shadow'           : 'error',
        '@typescript-eslint/ban-types'           : 0,
    },
};

const testLibPluginConfig = {
    files  : testFiles,
    plugins: {
        'testing-library': testingLibraryPlugin,
    },
    rules: {
        'testing-library/await-async-query'              : 'error',
        'testing-library/await-async-utils'              : 'error',
        'testing-library/no-await-sync-query'            : 'error',
        'testing-library/no-container'                   : 'error',
        'testing-library/no-debugging-utils'             : 'error',
        'testing-library/no-dom-import'                  : ['error', 'react'],
        'testing-library/no-node-access'                 : 'error',
        'testing-library/no-promise-in-fire-event'       : 'error',
        'testing-library/no-render-in-setup'             : 'error',
        'testing-library/no-unnecessary-act'             : 'error',
        'testing-library/no-wait-for-empty-callback'     : 'error',
        'testing-library/no-wait-for-multiple-assertions': 'error',
        'testing-library/no-wait-for-side-effects'       : 'error',
        'testing-library/no-wait-for-snapshot'           : 'error',
        'testing-library/prefer-find-by'                 : 'error',
        'testing-library/prefer-presence-queries'        : 'error',
        'testing-library/prefer-query-by-disappearance'  : 'error',
        'testing-library/prefer-screen-queries'          : 'error',
        'testing-library/render-result-naming-convention': 'error',
    },
};

export const pluginsConfigs = {
    ts        : tsPluginConfig,
    react     : reactPluginConfig,
    airbnb    : airbnbPluginConfig,
    ally      : allyPluginConfig,
    compat    : compatPluginConfig,
    import    : importPluginConfig,
    filenames : filenamesPluginConfig,
    promise   : promisePluginConfig,
    reactHooks: reactHooksPluginConfig,
    sonar     : sonarPluginConfig,
    regex     : regexPluginConfig,
    jest      : jestPluginConfig,
    testLib   : testLibPluginConfig,
};

export const pluginsConfigsList = [
    tsPluginConfig,
    reactPluginConfig,
    airbnbPluginConfig,
    allyPluginConfig,
    compatPluginConfig,
    importPluginConfig,
    filenamesPluginConfig,
    promisePluginConfig,
    reactHooksPluginConfig,
    sonarPluginConfig,
    regexPluginConfig
];

export const testPluginsConfigsList = [
    jestPluginConfig,
    testLibPluginConfig
];