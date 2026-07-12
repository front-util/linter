import { Linter } from 'eslint';

const customRules = {
    'no-mixed-operators'             : 'off',
    'guard-for-in'                   : 'off',
    'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*', },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'], }
    ],
    'no-param-reassign': 'off',
    'getter-return'    : 'off',
    'no-console'       : 'off',
    'accessor-pairs'   : ['warn', {
        setWithoutGet: true,
        getWithoutSet: false,
    }],
    'class-methods-use-this': 'off',
    'complexity'            : ['off', {
        max: 8,
    }],
    'consistent-return': ['off', {
        treatUndefinedAsUnspecified: true,
    }],
    'default-case'                           : 'off',
    'dot-notation'                           : 'off',
    'no-case-declarations'                   : 'off',
    'no-restricted-syntax'                   : ['off', 'FunctionExpression', 'WithStatement'],
    'global-require'                         : 'off',
    'no-restricted-globals'                  : 'off',
    'prefer-promise-reject-errors'           : 'off',
    'no-unused-expressions'                  : 'off',
    'no-underscore-dangle'                   : 'off',
    'no-plusplus'                            : 'off',
    'no-use-before-define'                   : 'off',
    'linebreak-style'                        : 'off',
    'no-shadow'                              : 'off',
    'no-nested-ternary'                      : ['error'],
    'no-var'                                 : 'error',
    'prefer-const'                           : 'error',
    // Современные правила из лучших практик
    'prefer-arrow-callback'                  : 'error',
    'prefer-template'                        : 'error',
    'prefer-exponentiation-operator'         : 'error',
    'prefer-object-has-own'                  : 'error',
    'prefer-regex-literals'                  : ['error', { disallowRedundantWrapping: true, }],
    'no-useless-rename'                      : 'error',
    'object-shorthand'                       : 'error',
    'prefer-destructuring'                   : ['error', { object: true, array: false, }],
    'security/detect-object-injection'       : 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'unicorn/expiring-todo-comments'         : 'off',
    'unicorn/import-style'                   : 'off',
    // unicorn 70 добавил name-replacements — слишком агрессивное, отключаем
    'unicorn/name-replacements'              : 'off',
    // filename-case перенесён в check-file/filename-naming-convention (более гибкий)
    'unicorn/filename-case'                  : 'off',
    'unicorn/no-array-sort'                  : 'off',
    'perfectionist/sort-imports'             : ['warn', {
        internalPattern: ['^#.+', '^@/.+'],
    }],
    'arrow-body-style'                  : 'off',
    'unicorn/prefer-global-this'        : 'off',
    'unicorn/prefer-array-some'         : 'off',
    'unicorn/no-new-array'              : 'off',
    'unicorn/prefer-query-selector'     : 'off',
    'unicorn/prefer-string-slice'       : 'off',
    'unicorn/no-array-reverse'          : 'off',
    'unicorn/prefer-add-event-listener' : 'off',
    'security/detect-non-literal-regexp': 'off',
    'logical-assignment-operators'      : 'off',
    'unicorn/prefer-at'                 : 'off',
    'eqeqeq'                            : ['error', 'always'],
} satisfies Linter.RulesRecord;

const onlyTSRules = {
    'no-unused-vars': 'off',
} satisfies Linter.RulesRecord;

const tsCommonRules = {
    '@typescript-eslint/no-unused-vars': ['error', {
        vars                     : 'all',
        args                     : 'after-used',
        ignoreRestSiblings       : false,
        varsIgnorePattern        : 'React',
        argsIgnorePattern        : '^_',
        caughtErrorsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-ts-comment'      : 0,
    '@typescript-eslint/no-shadow'           : 'error',
} satisfies Linter.RulesRecord;

const allyRules = {
    'jsx-a11y/anchor-is-valid'                       : 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/interactive-supports-focus'            : 'off',
    'jsx-a11y/click-events-have-key-events'          : 'off',
    'jsx-a11y/control-has-associated-label'          : 'off',
} satisfies Linter.RulesRecord;

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
} satisfies Linter.RulesRecord;

const reactRules = {
    // eslint-plugin-react-x заменил eslint-plugin-react (несовместим с ESLint 10).
    // Имена правил: react/* → react-x/* (без префикса jsx-, т.к. стилистика в @stylistic).
    'react-x/no-access-state-in-setstate'      : 'off',
    'react-x/no-array-index-key'               : 'off',
    'react-x/no-children-prop'                 : 'off',
    'react-x/no-danger'                        : 'off',
    'react-x/no-missing-component-display-name': 'off',
    'react-x/rules-of-hooks'                   : 'error',
    'react-x/exhaustive-deps'                  : 'warn',
    // Стилизация JSX (indent, tag-spacing и т.п.) перенесена в @stylistic
} satisfies Linter.RulesRecord;

const sonarRules = {
    'sonarjs/no-nested-template-literals': 0,
    'sonarjs/no-duplicate-string'        : 0,
    'sonarjs/deprecation'                : 'off',
    'sonarjs/function-return-type'       : 'off',
    'sonarjs/todo-tag'                   : 'off',
    'sonarjs/no-array-index-key'         : 'off',
    'sonarjs/no-ignored-exceptions'      : 'off',
    'sonarjs/pseudo-random'              : 'off',
    'sonarjs/no-clear-text-protocols'    : 'off',
    'sonarjs/prefer-nullish-coalescing'  : 'off',
    'sonarjs/new-cap'                    : 'off',
} satisfies Linter.RulesRecord;

const stylisticRules = {
    '@stylistic/indent': ['warn', 4, {
        SwitchCase: 1,
    }],
    '@stylistic/jsx-indent-props': ['warn', 4],
    '@stylistic/comma-dangle'    : ['warn', {
        objects: 'always',
        exports: 'always',
    }],
    '@stylistic/key-spacing': ['warn', {
        singleLine: {
            beforeColon: false,
            afterColon : true,
        },
        multiLine: {
            afterColon: true,
            align     : 'colon',
        },
    }],
    '@stylistic/keyword-spacing': ['warn', {
        overrides: {
            if    : { after: false, },
            for   : { after: false, },
            while : { after: false, },
            catch : { after: false, },
            switch: { after: false, },
            return: { after: true, },
        },
    }],
    '@stylistic/padded-blocks': ['warn', {
        blocks  : 'never',
        classes : 'always',
        switches: 'never',
    }],
    '@stylistic/arrow-parens'           : ['warn', 'always'],
    '@stylistic/max-len'                : ['warn', 250, 4, {}],
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0, }],
    '@stylistic/semi'                   : ['error', 'always'],
    '@stylistic/object-curly-newline'   : ['off', {
        ObjectExpression: {
            minProperties: 1,
            multiline    : true,
        },
        ObjectPattern: 'never',
    }],
    '@stylistic/type-annotation-spacing'    : 'off',
    '@stylistic/no-multi-spaces'            : 'off',
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/space-before-function-paren': ['error', 'never'],
    '@stylistic/member-delimiter-style'     : ['warn', {
        multiline: {
            delimiter  : 'semi',
            requireLast: true,
        },
        singleline: {
            delimiter  : 'semi',
            requireLast: true,
        },
        multilineDetection: 'brackets',
    }],
    '@stylistic/indent-binary-ops': ['error', 4],
} satisfies Linter.RulesRecord;

export const customRulesMap = {
    base     : customRules,
    onlyTS   : onlyTSRules,
    tsEslint : tsCommonRules,
    react    : reactRules,
    jsxA11y  : allyRules,
    import   : importRules,
    sonar    : sonarRules,
    stylistic: stylisticRules,
};
