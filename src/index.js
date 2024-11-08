import * as utils from './utils.js';

const configs = {
    standart: utils.createEslintConfig(),
    test    : utils.createEslintConfig({types: ['test'],}),
    ts      : utils.createEslintConfig({types: ['ts'],}),
    react   : utils.createEslintConfig({types: ['ts', 'react'],}),
    monorepo: utils.createEslintConfig({types: ['test', 'babel', 'ts', 'react'],}),
};

export {
    utils,
    configs,
};