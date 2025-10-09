import { describe, expect, it } from "bun:test";
import { ESLint } from "eslint";

describe('eslint.config.react.js', () => {
    let eslint: ESLint;

    it('should load React configuration without errors', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const isPathIgnored = await eslint.isPathIgnored('test_pkg/react_test.tsx');

        expect(isPathIgnored).toBe(false);
    });

    it('should lint React file without errors', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const results = await eslint.lintFiles(['test_pkg/react_test.tsx']);

        // Проверяем, что нет ошибок линтинга
        const hasErrors = results.some((result) =>
            result.messages.some((message) => message.severity === 2)
        );

        expect(hasErrors).toBe(false);
    });

    it('should have correct React configuration structure', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const config = await eslint.calculateConfigForFile('test_pkg/react_test.tsx');

        // Проверяем, что конфигурация загрузилась и имеет ожидаемую структуру
        expect(config).toBeDefined();
        // В новых конфигурациях структура может быть другой
        expect(config.rules || config.extends).toBeDefined();
    });

    it('should handle JSX syntax correctly', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.react.js',
        });

        const results = await eslint.lintFiles(['test_pkg/react_test.tsx']);

        // Проверяем, что JSX синтаксис распознается корректно
        const hasJsxErrors = results.some((result) =>
            result.messages.some((message) =>
                message.ruleId === 'react/jsx-uses-react' ||
                message.ruleId === 'react/jsx-uses-vars'
            )
        );

        // JSX ошибки не должны присутствовать в корректной конфигурации
        expect(hasJsxErrors).toBe(false);
    });
});
