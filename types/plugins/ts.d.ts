export const tsPlugins: ({
    files: string[];
    plugins: {
        import: any;
    };
    settings: any;
    rules: any;
} | {
    files: string[];
    plugins: {
        '@typescript-eslint': import("@typescript-eslint/utils/dist/ts-eslint/Config.js").FlatConfig.Plugin;
    };
    languageOptions: {
        parser: {
            meta?: { [K in keyof import("@typescript-eslint/utils/dist/ts-eslint/Parser.js").Parser.ParserMeta]?: import("@typescript-eslint/utils/dist/ts-eslint/Parser.js").Parser.ParserMeta[K] | undefined; };
            parseForESLint(text: string, options?: unknown): { [k in keyof import("@typescript-eslint/utils/dist/ts-eslint/Parser.js").Parser.ParseResult]: unknown; };
        };
        parserOptions: {
            project: string[];
            projectService: boolean;
            tsconfigRootDir: any;
        };
    };
    rules: {
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
} | {
    files: string[];
    rules: {
        'no-unused-vars': string;
    };
} | import("@typescript-eslint/utils/dist/ts-eslint/Config.js").FlatConfig.Config)[];
//# sourceMappingURL=ts.d.ts.map