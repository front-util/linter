# Front-utils/linter

The repository contains configuration files for setting up ESLint in the project.

**Note:** Only ftat eslint configutation

## Installation

You can install the package as follows:

```
npm install @front-utils/linter --save-dev

# or

yarn add @front-utils/linter -D
```

## Usage (ESM)

The primary class in this package is `FlatCompat`, which is a utility to translate ESLintRC-style configs into flat configs. Here's how you use it inside of your `eslint.config.js` file:

```js
import {
    createEslintAlias, // creating aliases for the project (interface described below)
    baseMonorepoEslintConfig, // configured config for use in a monorepo (expects the presence of tsconfig.json, babel.config.js files in the project root, and uses react, typescript technologies)
    simpleEslintConfig, // simple config
    files, // constants with descriptions of file extensions used in plugins
    pluginConfigs, // sets of configured eslint configurations (interface described below)
    customRules // a set of custom rules that complement plugin rules
} from "@eslint/eslintrc";

```