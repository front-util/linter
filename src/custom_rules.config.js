export const customRules = {
    'no-mixed-operators'             : 'off',
    'guard-for-in'                   : 'off',
    'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*', },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'], }
    ],
    'valid-jsdoc': ['error', {
        matchDescription        : '.+',
        requireParamDescription : false,
        requireReturnDescription: false,
        requireReturn           : false,
        prefer                  : {
            return: 'returns',
        },
        preferType: {
            boolean  : 'Boolean',
            number   : 'Number',
            object   : 'Object',
            string   : 'String',
            symbol   : 'Symbol',
            null     : 'Null',
            undefined: 'Undefined',
            function : 'Function',
            array    : 'Array',
            promise  : 'Promise',
            set      : 'Set',
            weakSet  : 'WeakSet',
            map      : 'Map',
            weakMap  : 'WeakMap',
        },
    }],
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
    'arrow-body-style'            : ['off', 'as-needed'],
    'arrow-parens'                : ['warn', 'always'],
    'global-require'              : 'off',
    'no-restricted-globals'       : 'off',
    'prefer-promise-reject-errors': 'off',
    'no-unused-expressions'       : 'off',
    'no-underscore-dangle'        : 'off',
    'no-plusplus'                 : 'off',
    'max-len'                     : ['warn', 250, 4, {}],
    'no-use-before-define'        : 'off',
    'linebreak-style'             : 'off',
    'no-shadow'                   : 'off',
    'no-multiple-empty-lines'     : ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0, }],
    'no-nested-ternary'           : ['error'],
    "semi"                        : ["error", "always"],
    "no-var"                      : 'error',
    "prefer-const"                : 'error',
};

export const onlyTSRules = {
    'no-unused-vars': "off",
};

export const onlyJSRules = {
    'no-unused-vars'     : "error",
    "react/jsx-uses-vars": "error",
};