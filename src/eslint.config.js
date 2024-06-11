import tseslint from 'typescript-eslint';

import { 
    pluginsConfigsList, 
    testPluginsConfigsList, 
    pluginsConfigsMap 
} from './plugins.config.js';

export const simpleEslintConfig = [
    ...tseslint.configs.recommended,
    pluginsConfigsMap.airbnb,
    pluginsConfigsMap.compat,
    pluginsConfigsMap.import,
    pluginsConfigsMap.filenames,
    pluginsConfigsMap.promise,
    pluginsConfigsMap.sonar,
    pluginsConfigsMap.regex,
    pluginsConfigsMap.custom.all
];

export const baseMonorepoEslintConfig = [
    ...pluginsConfigsList,
    ...testPluginsConfigsList
];
