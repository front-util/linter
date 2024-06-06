const BASE_FOLDERS = {
    assets    : 'src/infrastructure/assets',
    constants : 'src/infrastructure/constants',
    domain    : 'src/domain',
    pages     : 'src/application/pages',
    hooks     : 'src/infrastructure/hooks',
    repository: 'src/infrastructure/repository',
    src       : 'src',
    ui        : 'src/ui',
    styles    : 'src/infrastructure/styles',
    types     : 'src/infrastructure/types',
    utils     : 'src/infrastructure/utils',
    theme     : 'src/infrastructure/theme',
    services  : 'src/infrastructure/services',
    store     : 'src/infrastructure/store',
};

const CM_FOLDERS = {
    utils     : 'src/utils',
    services  : 'src/services',
    constants : 'src/constants',
    theme     : 'src/theme',
    config    : 'src/app_config',
    app_config: 'src/app_config',
    hooks     : 'src/hooks',
    store     : 'src/store',
    styles    : 'src/styles',
    components: 'src/components',
    assets    : 'src/assets',
    types     : 'src/types',
    repository: 'src/repository',
};
const API_FOLDERS = {
    application: 'src/application',
    domain     : 'src/domain',
    data       : 'src/data',
};

export const createEslintAlias = ({ basePath, name, }) => {
    let config = BASE_FOLDERS;

    if(name === 'cm') {
        config = CM_FOLDERS;
    }
    if(name === 'api') {
        config = API_FOLDERS;
    }

    return Object.entries(config).map(([key, value]) => ([`@${name}/${key}`, `${basePath}/${value}`]));
};

export const fullEslintAliases = [
    ['@pkg/common', '@vtb-personal-area/common/src'],
    ['@pkg/tests', '@vtb-personal-area/tests'],
    ...createEslintAlias({ name: 'cms', basePath: '.', }),
    ...createEslintAlias({ name: 'gm', basePath: '.', }),
    ...createEslintAlias({ name: 'api', basePath: '.', }),
    ...createEslintAlias({ name: 'cm', basePath: '@vtb-personal-area/common', })
];
