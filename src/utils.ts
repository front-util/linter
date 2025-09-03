import { defineConfig } from 'eslint/config';
import {basePlugins} from './plugins/base.js';
import {reactPlugins} from './plugins/react.js';
import {testPlugins} from './plugins/test.js';
import {tsPlugins} from './plugins/ts.js';
import { type CustomTypes, type LinterConfig } from './types.js';

export interface CustomConfig extends LinterConfig {
    types?: CustomTypes[];
}

export interface CreateAliasConfig { 
    basePath: string; 
    name: string; 
    config: Record<string, string>;
}

export type CreateEslintConfigFn = (config?: CustomConfig) => LinterConfig[]

const pluginsByName = {
    react: reactPlugins,
    test : testPlugins,
    ts   : tsPlugins,
} as Record<CustomTypes, LinterConfig[]>;

export const createEslintAlias = ({ basePath, name, config, }: CreateAliasConfig) => {
    return Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));
};

export const createEslintConfig: CreateEslintConfigFn = (config = {}) => {
    const {types = [], ...baseConfig} = config;
    const plugins = [...basePlugins] as LinterConfig[];

    Object.entries(pluginsByName).forEach(([key, list]) => {
        if(types.includes(key as CustomTypes)) {
            plugins.push(...list);
        }
    });

    if(baseConfig.files) {
        return defineConfig([
            {
                ...baseConfig,
                extends: plugins,
            }
        ]);
    }
    
    return defineConfig([
        plugins,
        baseConfig
    ]);
};