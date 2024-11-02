export const babelPlugins: {
    files: string[];
    languageOptions: {
        ecmaVersion: string;
        parser: typeof babelParser;
        parserOptions: {
            requireConfigFile: boolean;
            sourceType: string;
            allowImportExportEverywhere: boolean;
            babelOptions: {
                babelrc: boolean;
                configFile: boolean;
                rootMode: string;
                plugins: string[];
            };
        };
    };
    rules: {
        'no-unused-vars': string;
    };
}[];
import babelParser from "@babel/eslint-parser";
//# sourceMappingURL=babel.d.ts.map