export namespace customRulesMap {
    export { customRules as base };
    export { onlyTSRules as onlyTS };
    export { onlyJSRules as onlyJS };
    export { tsCommonRules as tsEslint };
    export { reactRules as react };
    export { reactHookRules as reactHooks };
    export { allyRules as jsxA11y };
    export { importRules as import };
    export { sonarRules as sonar };
    export { testLibRules as test };
}
declare const customRules: {
    'no-mixed-operators': string;
    'guard-for-in': string;
    'padding-line-between-statements': (string | {
        blankLine: string;
        prev: string[];
        next: string;
    } | {
        blankLine: string;
        prev: string[];
        next: string[];
    })[];
    'no-param-reassign': string;
    indent: (string | number | {
        SwitchCase: number;
    })[];
    'getter-return': string;
    'no-console': string;
    'accessor-pairs': (string | {
        setWithoutGet: boolean;
        getWithoutSet: boolean;
    })[];
    'class-methods-use-this': string;
    complexity: (string | {
        max: number;
    })[];
    'consistent-return': (string | {
        treatUndefinedAsUnspecified: boolean;
    })[];
    'default-case': string;
    'dot-notation': string;
    'no-case-declarations': string;
    'no-multi-spaces': (string | {
        exceptions: {
            VariableDeclarator: boolean;
        };
        ignoreEOLComments: boolean;
    })[];
    'comma-dangle': (string | {
        objects: string;
        exports: string;
    })[];
    'key-spacing': (string | {
        singleLine: {
            beforeColon: boolean;
            afterColon: boolean;
        };
        multiLine: {
            afterColon: boolean;
            align: string;
        };
    })[];
    'keyword-spacing': (string | {
        overrides: {
            if: {
                after: boolean;
            };
            for: {
                after: boolean;
            };
            while: {
                after: boolean;
            };
            catch: {
                after: boolean;
            };
            switch: {
                after: boolean;
            };
            return: {
                after: boolean;
            };
        };
    })[];
    'no-restricted-syntax': string[];
    'object-curly-newline': (string | {
        ObjectExpression: {
            minProperties: number;
            multiline: boolean;
        };
        ObjectPattern: string;
    })[];
    'padded-blocks': (string | {
        blocks: string;
        classes: string;
        switches: string;
    })[];
    'arrow-body-style': string[];
    'arrow-parens': string[];
    'global-require': string;
    'no-restricted-globals': string;
    'prefer-promise-reject-errors': string;
    'no-unused-expressions': string;
    'no-underscore-dangle': string;
    'no-plusplus': string;
    'max-len': {}[];
    'no-use-before-define': string;
    'linebreak-style': string;
    'no-shadow': string;
    'no-multiple-empty-lines': (string | {
        max: number;
        maxEOF: number;
        maxBOF: number;
    })[];
    'no-nested-ternary': string[];
    semi: string[];
    "no-var": string;
    "prefer-const": string;
};
declare const onlyTSRules: {
    'no-unused-vars': string;
};
declare const onlyJSRules: {
    'no-unused-vars': string;
};
declare const tsCommonRules: {
    '@typescript-eslint/no-unused-vars': (string | {
        vars: string;
        args: string;
        ignoreRestSiblings: boolean;
        varsIgnorePattern: string;
    })[];
    '@typescript-eslint/no-use-before-define': string[];
    '@typescript-eslint/ban-ts-comment': number;
    '@typescript-eslint/no-shadow': string;
    '@typescript-eslint/ban-types': number;
};
declare const reactRules: {
    "react/jsx-uses-vars": string;
    'react/sort-comp': (number | {
        order: string[];
    })[];
    'react/jsx-uses-react': number[];
    'react/jsx-props-no-spreading': string;
    'react/static-property-placement': string;
    'react/state-in-constructor': string;
    'react/jsx-fragments': string;
    'react/no-access-state-in-setstate': string;
    'react/destructuring-assignment': string;
    'react-hooks/rules-of-hooks': string;
    'react-hooks/exhaustive-deps': string;
    'react/forbid-prop-types': (string | {
        forbid: string[];
        checkContextTypes: boolean;
        checkChildContextTypes: boolean;
    })[];
    'react/no-array-index-key': string;
    'react/no-children-prop': string;
    'react/no-danger': string;
    'react/require-default-props': (string | {
        forbidDefaultForRequired: boolean;
    })[];
    'react/jsx-indent': (string | number)[];
    'react/jsx-indent-props': (string | number)[];
    'react/jsx-max-props-per-line': (string | {
        maximum: number;
    })[];
    'react/jsx-one-expression-per-line': string;
    'react/jsx-tag-spacing': (string | {
        closingSlash: string;
        beforeSelfClosing: string;
        afterOpening: string;
    })[];
    'react/jsx-filename-extension': (string | {
        extensions: string[];
    })[];
    'react/function-component-definition': (number | {
        namedComponents: string;
    })[];
};
declare const reactHookRules: {
    'react-hooks/rules-of-hooks': string;
    'react-hooks/exhaustive-deps': string;
};
declare const allyRules: {
    'jsx-a11y/anchor-is-valid': string;
    'jsx-a11y/no-noninteractive-element-interactions': string;
    'jsx-a11y/interactive-supports-focus': string;
    'jsx-a11y/click-events-have-key-events': string;
    'jsx-a11y/control-has-associated-label': string;
};
declare const importRules: {
    'import/no-extraneous-dependencies': (string | {
        peerDependencies: boolean;
        optionalDependencies: boolean;
    })[];
    'import/prefer-default-export': number;
    'import/no-named-as-default': string;
    'import/no-dynamic-require': string;
    'import/no-named-as-default-member': string;
    'import/extensions': string;
    'import/namespace': string;
    'import/default': string;
    'import/export': string;
};
declare const sonarRules: {
    'sonarjs/no-nested-template-literals': number;
    'sonarjs/no-duplicate-string': number;
};
declare const testLibRules: {
    'testing-library/await-async-query': string;
    'testing-library/await-async-utils': string;
    'testing-library/no-await-sync-query': string;
    'testing-library/no-container': string;
    'testing-library/no-debugging-utils': string;
    'testing-library/no-dom-import': string[];
    'testing-library/no-node-access': string;
    'testing-library/no-promise-in-fire-event': string;
    'testing-library/no-render-in-setup': string;
    'testing-library/no-unnecessary-act': string;
    'testing-library/no-wait-for-empty-callback': string;
    'testing-library/no-wait-for-multiple-assertions': string;
    'testing-library/no-wait-for-side-effects': string;
    'testing-library/no-wait-for-snapshot': string;
    'testing-library/prefer-find-by': string;
    'testing-library/prefer-presence-queries': string;
    'testing-library/prefer-query-by-disappearance': string;
    'testing-library/prefer-screen-queries': string;
    'testing-library/render-result-naming-convention': string;
};
export {};
//# sourceMappingURL=custom_rules.config.d.ts.map