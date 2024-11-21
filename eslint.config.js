import { createEslintConfig } from './dist/utils.js';

export default createEslintConfig({
    types: ['ts'],
    files: ['src/**/*.{ts,tsx,js}', 'tests/*.test.ts'],
});