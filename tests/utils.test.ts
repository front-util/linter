import { expect, it, describe, mock } from "bun:test";

import {
    createEslintAlias,
    createEslintConfig,
    CustomConfig
} from '../src/utils';
import { basePlugins } from "../src/plugins/base";
import { CustomTypes } from "../src/types";
import { babelPlugins } from "../src/plugins/babel";
import { reactPlugins } from "../src/plugins/react";
import { testPlugins } from "../src/plugins/test";

describe('[src/utils]', () => {
    describe('- createEslintAlias', () => {
    // Converts config entries to alias paths correctly
        it('should convert config entries to alias paths correctly when config is provided', () => {
            const config = {
                'module1': 'src/module1',
                'module2': 'src/module2',
            };
            const basePath = '/project';
            const name = 'alias';
            const expected = [
                ['@alias/module1', '/project/src/module1'],
                ['@alias/module2', '/project/src/module2']
            ];
  
            const result = createEslintAlias({ basePath, name, config, });
  
            expect(result).toEqual(expected);
        });

        // Handles empty config gracefully
        it('should return an empty array when config is empty', () => {
            const config = {};
            const basePath = '/project';
            const name = 'alias';
            const expected: string[][] = [];
  
            const result = createEslintAlias({ basePath, name, config, });
  
            expect(result).toEqual(expected);
        });

        // Handles multiple config entries efficiently
        it('should handle multiple config entries efficiently', () => {
            const config = {
                'entry1': 'path1',
                'entry2': 'path2',
                'entry3': 'path3',
            };
            const result = createEslintAlias({ basePath: '/base', name: 'alias', config, });

            expect(result).toEqual([
                ['@alias/entry1', '/base/path1'],
                ['@alias/entry2', '/base/path2'],
                ['@alias/entry3', '/base/path3']
            ]);
        });

        // Returns an array of alias mappings
        it('should return an array of alias mappings', () => {
            const config = {
                'key1': 'value1',
                'key2': 'value2',
            };
            const result = createEslintAlias({ basePath: '/root', name: 'pkg', config, });

            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([
                ['@pkg/key1', '/root/value1'],
                ['@pkg/key2', '/root/value2']
            ]);
        });

        // Manages special characters in config keys and values
        it('should manage special characters in config keys and values', () => {
            const config = {
                'key-special!@#': 'value-special!@#',
                'another$key'   : 'another$value',
            };
            const result = createEslintAlias({ basePath: '/special', name: 'special', config, });

            expect(result).toEqual([
                ['@special/key-special!@#', '/special/value-special!@#'],
                ['@special/another$key', '/special/another$value']
            ]);
        });
    });

    describe('code snippet', () => {
        // Generates a default ESLint configuration when no custom config is provided
        it('should generate default ESLint configuration when no custom config is provided', () => {
            const result = createEslintConfig();

            expect(result).toEqual(expect.arrayContaining(basePlugins));
        });

        // Handles an empty types array without errors
        it('should handle an empty types array without errors', () => {
            const config = { types: [], };
            const result = createEslintConfig(config);

            expect(result).toEqual(expect.arrayContaining(basePlugins));
        });

        // Correctly applies plugins based on specified types in the config
        it('should apply plugins based on specified types in config', () => {
            const config = { types: ['babel', 'react'] as CustomTypes[], };
            const result = createEslintConfig(config);

            expect(result).toEqual(expect.arrayContaining([...babelPlugins, ...reactPlugins]));
        });

        // Uses the typesAdapter function to modify plugins when provided
        it('should use typesAdapter to modify plugins when provided', () => {
            const typesAdapter = mock((_, config) => ({ ...config, modified: true, }));
            const config = { types: ['test'] as CustomTypes[], typesAdapter, };
            const result = createEslintConfig(config);

            expect(typesAdapter).toHaveBeenCalled();
            expect(result).toEqual(expect.arrayContaining(testPlugins.map((p) => ({ ...p, modified: true, }))));
        });

        // Merges baseConfig properties into each plugin when baseConfig is present
        it('should merge baseConfig properties into each plugin when baseConfig is present', () => {
            const baseConfig = { rules: { 'no-console': 'warn', } as CustomConfig['rules'], };
            const config = { ...baseConfig, };
            const result = createEslintConfig(config);

            result.forEach((plugin) => {
                expect(plugin).toMatchObject(baseConfig);
            });
        });
    });
});
