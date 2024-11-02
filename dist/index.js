import * as utils from './utils.js';
const configs = {
    standart: utils.createEslintConfig(),
    test    : utils.createEslintConfig({ test: true, }),
    ts      : utils.createEslintConfig({ ts: true, }),
    react   : utils.createEslintConfig({ ts: true, react: true, }),
    monorepo: utils.createEslintConfig({ ts: true, react: true, babel: true, test: true, }),
};

export { utils, configs, };
