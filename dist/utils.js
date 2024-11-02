import { babelPlugins } from './plugins/babel.js';
import { basePlugins } from './plugins/base.js';
import { reactPlugins } from './plugins/react.js';
import { testPlugins } from './plugins/test.js';
import { tsPlugins } from './plugins/ts.js';
const pluginsByName = {
    babel: babelPlugins,
    react: reactPlugins,
    test : testPlugins,
    ts   : tsPlugins,
};

export const createEslintAlias = (/** @type {} */ { basePath, name, config, }) => {
    return Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));
};
export const createEslintConfig = (/** @type {{ [x: 'babel' | 'react' | 'test' | 'ts']: boolean; }} */ config = {}) => {
    const plugins = [...basePlugins];

    Object.entries(pluginsByName).forEach(([key, list]) => {
        if(config[key]) {
            plugins.push(...list);
        }
    });
    return plugins;
};
