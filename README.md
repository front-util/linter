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
import {
    utils,
} from "@front-utils/linter";
import importPlugin from 'eslint-plugin-import';

export const fullEslintAliases = [
    ...utils.createEslintAlias({ name: 'pkg', basePath: '.', }),
    ...utils.createEslintAlias({ name: 'api', basePath: '.', }),
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
#### standart config without react, ts

```
npm install @front-utils/linter @eslint/js eslint-config-airbnb eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.standart;
```

#### includes standart config + ts rules
```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-config-airbnb eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.ts;
```

#### includes ts config + react rules
```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y globals --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.react;
```

#### only jest rules
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

#### includes all configs + monorepo babel settings
```
npm install @front-utils/linter @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb eslint-plugin-compat eslint-plugin-optimize-regex eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-filenames  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-plugin-jest-dom @babel/eslint-parser globals --save-dev
```

```js
// eslint.config.js
import {
    configs,
} from "@front-utils/linter";

export default configs.standart;
```

configured config for use in a monorepo (expects the presence of tsconfig.json, babel.config.js files in the project root, and uses react, typescript technologies)
