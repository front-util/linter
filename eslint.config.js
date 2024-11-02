import { createEslintConfig } from './src/utils.js';

export default [
    ...createEslintConfig().map((val) => ({
        ...val,
        ignores: ["**/*" ,"!src/**/*"]
    }))
];
