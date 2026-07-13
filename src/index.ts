import { baseConfig } from './plugins/base.js';
import { reactConfig } from './plugins/react.js';
import { strictConfig, strictReactConfig, strictTsConfig } from './plugins/strict.js';
import { tsConfig } from './plugins/ts.js';
import { createEslintAlias } from './utils.js';

const configs = {
    'js'          : baseConfig,
    'ts'          : tsConfig,
    'react'       : reactConfig,
    'strict'      : strictConfig,
    'strict-ts'   : strictTsConfig,
    'strict-react': strictReactConfig,
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
