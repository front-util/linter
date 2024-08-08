export const createEslintAlias = ({ basePath, name, config, }) => {
    return Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));
};
