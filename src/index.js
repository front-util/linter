import { createEslintAlias } from './aliases.js';
import { baseMonorepoEslintConfig, simpleEslintConfig } from './eslint.config.js';
import * as customRules from './custom_rules.config.js';
import * as pluginConfigs from './plugins.config.js';
import * as files from './constants.js';

export default {
    createEslintAlias,
    baseMonorepoEslintConfig,
    simpleEslintConfig,
    files,
    pluginConfigs,
    customRules,
};