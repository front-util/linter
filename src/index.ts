import { baseConfig } from './plugins/base.js';
import { reactConfig } from './plugins/react.js';
import { tsConfig } from './plugins/ts.js';
import { createEslintAlias } from './utils.js';

const configs = {
    js   : baseConfig,
    ts   : tsConfig,
    react: reactConfig,
};

const utils = {
    createEslintAlias,
};

export type {
    CreateAliasConfig,
} from './utils.js';

export {
    configs,
    utils,
};
