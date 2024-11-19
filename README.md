# Front-utils/linter

The repository contains configuration files for setting up ESLint in the project.

**Note:** Only ftat eslint configutation

## Installation

You can install the package as follows:

```
npm install @front-utils/linter --save-dev

# or

yarn add @front-utils/linter -D

# or

bun add @front-utils/linter --dev
```

## Usage (ESM)

```js
import {
    utils, // utilities
    configs // preconfigured configs
} from "@front-utils/linter";

```

#### create alias

```js
import { utils } from "@front-utils/linter";
import importPlugin from 'eslint-plugin-import';

export const fullEslintAliases = [
    ...utils.createEslintAlias({ 
        name: 'pkg', 
        basePath: '.', 
        config: {
            utils: 'src/infrastructure/utils', // @alias: @pkg/utils -> src/infrastructure/utils
            models: 'src/data/models' // @alias: @pkg/models -> src/data/models
        } 
    }),
    ...utils.createEslintAlias({ name: 'api', basePath: '.', config: {} }),
];

const importPluginConfig = {
    plugins: {
        import: importPlugin,
    },
    settings: {
        'import/resolver': {
            alias: {
                map       : fullEslintAliases,
                extensions: ['.ts', '.tsx', '.json', '.js', 'jsx'],
            },
            ...
        },
    }
};
```

#### create eslint config
```js
import { utils } from "@front-utils/linter";

/** 
The config.types parameter is an array that can contain the following keys:
 - babel: include babel settings
 - react: indicates whether React support is enabled.
 - test: indicates whether testing support is enabled.
 - ts: indicates whether TypeScript support is enabled.
*/
const eslintConfig = utils.createEslintConfig({
    types: ['ts', 'babel', 'react', 'test'],
    ...{
        ignores: [],
        files: []
    } /** any eslint rule */
}),
```

| base rules            | included plugins                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| with any config.types | @eslint/js eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y |

add plugins with config.types

| config.types | included plugins                                     |
| ------------ | ---------------------------------------------------- |
| test         | eslint-plugin-testing-library eslint-plugin-jest-dom |
| ts           | typescript-eslint                                    |
| react        | eslint-plugin-react-hooks eslint-plugin-react        |
| babel        | @babel/eslint-parser                                 |


#### rewrite the rules in all plugins.
```js
import { utils } from '@front-utils/linter';

export default [
    ...utils.createEslintConfig({
        ignores: ["**/*" ,"!src/**/*"]
    })
]; 
```

| alias    | is equal                                                             |
| -------- | -------------------------------------------------------------------- |
| standart | utils.createEslintConfig()                                           |
| test     | utils.createEslintConfig({types: ['test'],})                         |
| ts       | utils.createEslintConfig({types: ['ts'],})                           |
| react    | utils.createEslintConfig({types: ['ts', 'react'],})                  |
| monorepo | utils.createEslintConfig({types: ['test', 'babel', 'ts', 'react'],}) |

#### standart config
 
_alias for utils.createEslintConfig()_

```
npm install @front-utils/linter @eslint/js eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.standart;
```

#### ts config

_alias for utils.createEslintConfig({types: ['ts'],})_

```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.ts;
```

#### react config 

_alias for utils.createEslintConfig({types: ['ts', 'react'],})_

```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y globals --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.react;
```

#### test config 

_alias for utils.createEslintConfig({types: ['test'],})_

```
npm install @front-utils/linter @eslint/js eslint-plugin-testing-library eslint-plugin-jest-dom --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.test;
```

#### monorepo config 

_alias for utils.createEslintConfig({types: ['test', 'babel', 'ts', 'react'],})_


```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-plugin-jest-dom @babel/eslint-parser globals --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.monorepo;
```

configured config for use in a monorepo (expects the presence of tsconfig.json, babel.config.js files in the project root, and uses react, typescript technologies)
