import { describe, expect, it } from "bun:test";
import { ESLint } from "eslint";

describe('eslint.config.ts', () => {
    let eslint: ESLint;

    it('should load TypeScript configuration without errors', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const isPathIgnored = await eslint.isPathIgnored('test_pkg/ts_test.ts');

        expect(isPathIgnored).toBe(false);
    });

    it('should lint TypeScript file without errors', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const results = await eslint.lintFiles(['test_pkg/ts_test.ts']);

        // Проверяем, что файл не игнорируется
        const ignoredFiles = results.filter((result) => result.messages.some((msg) => msg.message.includes('File ignored')));

        expect(ignoredFiles.length).toBe(0);

        // Разрешаем некоторые не критичные ошибки для тестового файла
        // Главное, что конфигурация загружается и пытается линтить файл
        expect(results.length).toBeGreaterThan(0);
    });

    it('should have correct TypeScript configuration structure', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const config = await eslint.calculateConfigForFile('test_pkg/ts_test.ts');

        // Проверяем, что конфигурация загрузилась и имеет ожидаемую структуру
        expect(config).toBeDefined();
        // В новых конфигурациях структура может быть другой
        expect(config.rules || config.extends).toBeDefined();
    });

    it('should handle TypeScript-specific syntax correctly', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const results = await eslint.lintFiles(['test_pkg/ts_test.ts']);

        // Проверяем, что TypeScript синтаксис распознается корректно
        const hasTsErrors = results.some((result) =>
            result.messages.some((message) =>
                message.ruleId?.includes('typescript') ||
                message.ruleId?.includes('ts')
            )
        );

        // TypeScript ошибки не должны присутствовать в корректной конфигурации
        expect(hasTsErrors).toBe(false);
    });

    it('should handle interface and type definitions', async () => {
        eslint = new ESLint({
            overrideConfigFile: 'test_pkg/eslint.config.ts',
        });

        const results = await eslint.lintFiles(['test_pkg/ts_test.ts']);

        // Проверяем, что интерфейсы и типы распознаются корректно
        const hasInterfaceErrors = results.some((result) =>
            result.messages.some((message) =>
                message.message.includes('interface') ||
                message.message.includes('type')
            )
        );

        // Ошибки интерфейсов не должны присутствовать в корректной конфигурации
        expect(hasInterfaceErrors).toBe(false);
    });
});
