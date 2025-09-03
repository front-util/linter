import { createEslintConfig } from './src/utils';

export default createEslintConfig({
    types: ['ts'],
    files: ['src/**/*.{ts,tsx,js}', 'tests/*.test.ts', 'eslint.config.ts'],
    rules: {
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});