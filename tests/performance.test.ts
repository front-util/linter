import { describe, expect, it } from 'bun:test';
import { ESLint } from 'eslint';

const MAX_LINT_TIME_MS = 30_000;

describe('linting performance', () => {
    it('should lint jsTest.js within time limit', async() => {
        const eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.js',
        });

        const start = Date.now();

        await eslint.lintFiles(['test_pkg/jsTest.js']);
        const elapsed = Date.now() - start;

        console.log(`jsTest.js: ${elapsed}ms`);
        expect(elapsed).toBeLessThan(MAX_LINT_TIME_MS);
    });

    it('should lint tsTest.ts within time limit', async() => {
        const eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const start = Date.now();

        await eslint.lintFiles(['test_pkg/tsTest.ts']);
        const elapsed = Date.now() - start;

        console.log(`tsTest.ts: ${elapsed}ms`);
        expect(elapsed).toBeLessThan(MAX_LINT_TIME_MS);
    });

    it('should lint reactTest.tsx within time limit', async() => {
        const eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const start = Date.now();

        await eslint.lintFiles(['test_pkg/reactTest.tsx']);
        const elapsed = Date.now() - start;

        console.log(`reactTest.tsx: ${elapsed}ms`);
        expect(elapsed).toBeLessThan(MAX_LINT_TIME_MS);
    });

    it('should lint performanceTest.tsx within time limit', async() => {
        const eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const start = Date.now();
        const results = await eslint.lintFiles(['test_pkg/performanceTest.tsx']);
        const elapsed = Date.now() - start;

        console.log(`performanceTest.tsx (${results[0]?.filePath}): ${elapsed}ms`);
        expect(elapsed).toBeLessThan(MAX_LINT_TIME_MS);
    });
});
