export const testPlugins: ({
    files: string[];
    plugins: {
        'testing-library': any;
    };
    rules: {
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
} | {
    files: string[];
    plugins: {
        jest: any;
    };
})[];
//# sourceMappingURL=test.d.ts.map