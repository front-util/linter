import {babelPlugins} from './plugins/babel.js';
import {basePlugins} from './plugins/base.js';
import {reactPlugins} from './plugins/react.js';
import {testPlugins} from './plugins/test.js';
import {tsPlugins} from './plugins/ts.js';
import { type CustomTypes, type LinterConfig } from './types.js';

export interface CustomConfig extends LinterConfig {
    types?: CustomTypes[];
    /** additional config rules has priority! */
    typesAdapter?: (type: CustomTypes ,config: LinterConfig) => LinterConfig;
}

export interface CreateAliasConfig { 
    basePath: string; 
    name: string; 
    config: Record<string, string>;
}

export type CreateEslintConfigFn = (config?: CustomConfig) => LinterConfig[]

const pluginsByName = {
    babel: babelPlugins,
    react: reactPlugins,
    test : testPlugins,
    ts   : tsPlugins,
} as Record<CustomTypes, LinterConfig[]>;

export const createEslintAlias = ({ basePath, name, config, }: CreateAliasConfig) => {
    return Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));
};

export const createEslintConfig: CreateEslintConfigFn = (config = {}) => {
    const {types = [], typesAdapter, ...baseConfig} = config;
    const hasBaseConfig = !!Object.keys(baseConfig).length;
    const plugins = [...basePlugins] as LinterConfig[];

    Object.entries(pluginsByName).forEach(([key, list]) => {
        const typeName = key as CustomTypes;

        if(types.includes(typeName)) {
            if(typeof typesAdapter === 'function') {
                plugins.push(...list.map((c) => typesAdapter(typeName, c)));
            } else {
                plugins.push(...list);
            }
        }
    });
    
    return !hasBaseConfig ? plugins : plugins.map((p) => ({
        ...p,
        ...baseConfig,
    }));
};