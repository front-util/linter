# @front-utils/linter

ESLint 10 flat-config presets for JavaScript, TypeScript, and React projects.

Three composable presets (`js`, `ts`, `react`) with curated rules from 12+ plugins — ready to use, easy to extend.

## Installation

```bash
# bun (recommended)
bun add -D @front-utils/linter

# npm
npm install @front-utils/linter --save-dev
```

### Peer dependencies

Each preset requires its own set of peer dependencies. Install only what you need:

**JavaScript (`configs.js`)**
```bash
bun add -D @eslint/js eslint eslint-plugin-import eslint-plugin-promise \
  eslint-plugin-compat eslint-plugin-sonarjs eslint-plugin-security \
  eslint-plugin-unicorn eslint-plugin-perfectionist eslint-plugin-check-file \
  eslint-plugin-jsx-a11y @stylistic/eslint-plugin
```

**TypeScript (`configs.ts`)** — adds to the above:
```bash
bun add -D typescript-eslint eslint-import-resolver-typescript
```

**React (`configs.react`)** — adds to the above:
```bash
bun add -D eslint-plugin-react-x globals
```

## Quick start

```js
// eslint.config.js
import { configs } from "@front-utils/linter";

export default configs.js;
```

```ts
// eslint.config.ts
import { defineConfig } from "eslint/config";
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.ts,
    files: ["src/**/*.{ts,tsx}"],
});
```

Configs are composable — `configs.ts` extends `configs.js`, `configs.react` extends `configs.ts`. You can mix them with your own rules via `defineConfig`.

## Available presets

| Preset | Description | Key plugins |
|--------|-------------|-------------|
| `configs.js` | JavaScript | @eslint/js, import, promise, compat, sonarjs, security, unicorn, perfectionist, check-file, jsx-a11y, @stylistic |
| `configs.ts` | TypeScript (extends js) | + typescript-eslint (recommended + recommendedTypeChecked), import/resolver-typescript |
| `configs.react` | React + TypeScript (extends ts) | + react-x (rules-of-hooks, exhaustive-deps) |

## Custom configuration

```ts
import { defineConfig } from "eslint/config";
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.react,
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
        "no-console": "warn",
        "import/no-unresolved": ["error", { ignore: ["^bun:", "^node:"] }],
    },
});
```

### Ignoring files

```ts
export default defineConfig({
    extends: configs.ts,
    ignores: ["dist/**", "coverage/**", "**/*.d.ts"],
});
```

## Import aliases

`createEslintAlias` generates alias mappings for `eslint-import-resolver-alias`:

```js
import { utils } from "@front-utils/linter";

const aliases = utils.createEslintAlias({
    name: "app",
    basePath: ".",
    config: {
        utils: "src/utils",
        models: "src/models",
    },
});

// aliases → [["@app/utils", "./src/utils"], ["@app/models", "./src/models"]]
```

## File naming convention

The `check-file/filename-naming-convention` rule enforces `camelCase` for `.ts`/`.js` files. Config files (`*.config.*`, `eslint.config.*`) and test files (`*.test.*`) are excluded.

## Stylistic rules

All formatting rules use `@stylistic/eslint-plugin`. Legacy ESLint stylistic rules are disabled via `disable-legacy`. Customize in your config:

```ts
export default defineConfig({
    extends: configs.ts,
    rules: {
        "@stylistic/indent": ["warn", 2],
        "@stylistic/semi": ["error", "never"],
    },
});
```

## Troubleshooting

**Slow linting** — use `--cache` and limit `files` to your source directory.

**Import errors for Node builtins** — add to your rules:
```js
"import/no-unresolved": ["error", { ignore: ["^node:", "^bun:"] }]
```

**Type-checked rules fail in test_pkg / standalone files** — disable type-checked rules:
```js
import tseslint from "typescript-eslint";

export default defineConfig([
    { extends: configs.ts, files: ["**/*.ts"] },
    tseslint.configs.disableTypeChecked,
]);
```

## License

ISC
