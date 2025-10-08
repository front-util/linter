export interface CreateAliasConfig { 
    basePath: string; 
    name: string; 
    config: Record<string, string>;
}

export const createEslintAlias = ({ basePath, name, config, }: CreateAliasConfig) => Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));