import { describe, expect, it } from 'bun:test';
import { ESLint } from 'eslint';

describe('eslint.config.css.js', () => {
    let eslint: ESLint;

    it('should load CSS configuration without errors', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.css.js',
        });

        const isPathIgnored = await eslint.isPathIgnored('test_pkg/cssTest.css');

        expect(isPathIgnored).toBe(false);
    });

    it('should lint CSS file without errors', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.css.js',
        });

        const results = await eslint.lintFiles(['test_pkg/cssTest.css']);

        // Проверяем, что нет ошибок линтинга
        const hasErrors = results.some((result) =>
            result.messages.some((message) => message.severity === 2)
        );

        expect(hasErrors).toBe(false);
    });

    it('should have correct configuration structure', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.css.js',
        });

        const config = await eslint.calculateConfigForFile('test_pkg/cssTest.css');

        // Проверяем, что конфигурация загрузилась и имеет ожидаемую структуру
        expect(config).toBeDefined();
        // CSS-конфиг должен содержать language и rules
        expect(config.rules || config.language || config.plugins).toBeDefined();
    });

    it('should detect empty blocks in CSS', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.css.js',
        });

        const results = await eslint.lintText('.empty { }', { filePath: 'test_pkg/empty.css', });

        // Должны получить ошибку css/no-empty-blocks
        const emptyBlockError = results[0].messages.find(
            (m) => m.ruleId === 'css/no-empty-blocks'
        );

        expect(emptyBlockError).toBeDefined();
    });

    it('should detect !important in CSS', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.css.js',
        });

        const results = await eslint.lintText('.btn { color: red !important; }', { filePath: 'test_pkg/important.css', });

        // Должны получить предупреждение css/no-important
        const importantWarning = results[0].messages.find(
            (m) => m.ruleId === 'css/no-important'
        );

        expect(importantWarning).toBeDefined();
    });
});
