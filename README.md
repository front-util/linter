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
    createEslintAlias, // creating aliases for the project (interface described below)
    baseMonorepoEslintConfig, // configured config for use in a monorepo (expects the presence of tsconfig.json, babel.config.js files in the project root, and uses react, typescript technologies)
    simpleEslintConfig, // simple config
    files, // constants with descriptions of file extensions used in plugins
    pluginsConfigs, // sets of configured eslint configurations (interface described below)
    customRules, // a set of custom rules that complement plugin rules
} from "@eslint/eslintrc";

```

#### createEslintAlias

```js
import {
    createEslintAlias, // creating aliases for the project (interface described below)
} from "@eslint/eslintrc";

```

#### baseMonorepoEslintConfig

> includes all plugins from './src/plugins.config.js'

configured config for use in a monorepo (expects the presence of tsconfig.json, babel.config.js files in the project root, and uses react, typescript technologies)
