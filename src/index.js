import { createEslintAlias } from './aliases.js';
import { 
    baseMonorepoEslintConfig, 
    simpleEslintConfig 
} from './eslint.config.js';
import {
    customRules, 
    onlyJSRules, 
    onlyTSRules
} from './custom_rules.config.js';
import {
    pluginsConfigsMap
} from './plugins.config.js';
import * as files from './constants.js';

export default {
    createEslintAlias,
    baseMonorepoEslintConfig,
    simpleEslintConfig,
    files,
    pluginsConfigs: pluginsConfigsMap,
    customRules   : {
        all: customRules,
        js : onlyJSRules,
        ts : onlyTSRules,
    },
};
