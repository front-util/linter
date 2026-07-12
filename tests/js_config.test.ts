import { describe, expect, it } from 'bun:test';
import { ESLint } from 'eslint';

describe('eslint.config.js', () => {
    let eslint: ESLint;

    it('should load JavaScript configuration without errors', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.js',
        });

        const isPathIgnored = await eslint.isPathIgnored('test_pkg/jsTest.js');

        expect(isPathIgnored).toBe(false);
    });

    it('should lint JavaScript file without errors', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.js',
        });

        const results = await eslint.lintFiles(['test_pkg/jsTest.js']);

        // Проверяем, что нет ошибок линтинга
        const hasErrors = results.some((result) =>
            result.messages.some((message) => message.severity === 2)
        );

        expect(hasErrors).toBe(false);
    });

    it('should have correct configuration structure', async() => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.js',
        });

        const config = await eslint.calculateConfigForFile('test_pkg/jsTest.js');

        // Проверяем, что конфигурация загрузилась и имеет ожидаемую структуру
        expect(config).toBeDefined();
        // В новых конфигурациях структура может быть другой, проверяем наличие основных свойств
        expect(config.rules || config.extends || config.languageOptions).toBeDefined();
    });
});
