const customRules = {
    'no-mixed-operators'             : 'off',
    'guard-for-in'                   : 'off',
    'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*', },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'], }
    ],
    'no-param-reassign': 'off',
    indent             : ['warn', 4, {
        SwitchCase: 1,
    }],
    'getter-return' : 'off',
    'no-console'    : 'off',
    'accessor-pairs': ['warn', {
        setWithoutGet: true,
        getWithoutSet: false,
    }],
    'class-methods-use-this': 'off',
    complexity              : ['off', {
        max: 8,
    }],
    'consistent-return': ['off', {
        treatUndefinedAsUnspecified: true,
    }],
    'default-case'        : 'off',
    'dot-notation'        : 'off',
    'no-case-declarations': 'off',
    'no-multi-spaces'     : ['warn', {
        exceptions: {
            VariableDeclarator: true,
        },
        ignoreEOLComments: true,
    }],
    'comma-dangle': ['warn', {
        objects: 'always',
        exports: 'always',
    }],
    'key-spacing': ['warn', {
        singleLine: {
            beforeColon: false,
            afterColon : true,
        },
        multiLine: {
            afterColon: true,
            align     : 'colon',
        },
    }],
    'keyword-spacing': ['warn', {
        overrides: {
            if: {
                after: false,
            },
            for: {
                after: false,
            },
            while: {
                after: false,
            },
            catch: {
                after: false,
            },
            switch: {
                after: false,
            },
            return: {
                after: true,
            },
        },
    }],
    'no-restricted-syntax': ['off', 'FunctionExpression', 'WithStatement'],
    'object-curly-newline': ['off', {
        ObjectExpression: {
            minProperties: 1,
            multiline    : true,
        },
        ObjectPattern: 'never',
    }],
    'padded-blocks': ['warn', {
        blocks  : 'never',
        classes : 'always',
        switches: 'never',
    }],
    'arrow-body-style'                 : ['off', 'as-needed'],
    'arrow-parens'                     : ['warn', 'always'],
    'global-require'                   : 'off',
    'no-restricted-globals'            : 'off',
    'prefer-promise-reject-errors'     : 'off',
    'no-unused-expressions'            : 'off',
    'no-underscore-dangle'             : 'off',
    'no-plusplus'                      : 'off',
    'max-len'                          : ['warn', 250, 4, {}],
    'no-use-before-define'             : 'off',
    'linebreak-style'                  : 'off',
    'no-shadow'                        : 'off',
    'no-multiple-empty-lines'          : ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0, }],
    'no-nested-ternary'                : ['error'],
    "semi"                             : ["error", "always"],
    "no-var"                           : 'error',
    "prefer-const"                     : 'error',
    "sonarjs/deprecation"              : 'off',
    'sonarjs/function-return-type'     : 'off',
    'sonarjs/todo-tag'                 : 'off',
    'sonarjs/no-array-index-key'       : 'off',
    'sonarjs/no-ignored-exceptions'    : 'off',
    'sonarjs/pseudo-random'            : 'off',
    'sonarjs/no-clear-text-protocols'  : 'off',
    'sonarjs/prefer-nullish-coalescing': 'off',
};

const onlyTSRules = {
    'no-unused-vars': "off",
};

const tsCommonRules = {
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
};

const onlyJSRules = {
    'no-unused-vars': "error",
};

const allyRules = {
    'jsx-a11y/anchor-is-valid'                       : 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/interactive-supports-focus'            : 'off',
    'jsx-a11y/click-events-have-key-events'          : 'off',
    'jsx-a11y/control-has-associated-label'          : 'off',
};

const importRules = {
    'import/no-extraneous-dependencies': [
        'error',
        {
            peerDependencies    : true,
            optionalDependencies: true,
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
};

const reactRules = {
    "react/jsx-uses-vars": "error",
    'react/sort-comp'    : [1, {
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
};

const reactHookRules = {
    'react-hooks/rules-of-hooks' : 'error',
    'react-hooks/exhaustive-deps': 'warn',
};

const sonarRules = {
    'sonarjs/no-nested-template-literals': 0,
    'sonarjs/no-duplicate-string'        : 0,
};

const testLibRules = {
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
};

export const customRulesMap = {
    base      : customRules,
    onlyTS    : onlyTSRules,
    onlyJS    : onlyJSRules,
    tsEslint  : tsCommonRules,
    react     : reactRules,
    reactHooks: reactHookRules,
    jsxA11y   : allyRules,
    import    : importRules,
    sonar     : sonarRules,
    test      : testLibRules,
};