# AGENTS.md

ESLint 9 flat-config presets (`js`, `ts`, `react`) published as `@front-utils/linter`.

## Commands

| Action | Command |
|---|---|
| Test | `bun test` |
| Typecheck | `bun run check:types` |
| Lint (self) | `bun run check:lint` |
| Build (dist + types) | `bun run build` |
| Validate a preset against test_pkg | `bun run test:js` / `test:ts` / `test:react` |
| Publish (build + npm publish) | `bun run publish:linter` |

**Build before test_pkg validation.** The `test_pkg/eslint.config.*` files import from `../dist/`, so `bun run build` must succeed first.

**Lint order:** lint-staged runs `check:lint` then `check:types` on staged `.ts/.tsx` files. Pre-push runs `bun test`.

## Architecture

```
src/index.ts          → entrypoint, exports { configs, utils }
src/plugins/base.ts   → configs.js  (JS preset)
src/plugins/ts.ts     → configs.ts  (TS preset)
src/plugins/react.ts  → configs.react (React+TS preset)
src/custom_rules.config.ts → all rule overrides (referenced by plugin files)
src/utils.ts          → createEslintAlias helper
src/constants.ts      → shared file globs and ignores
src/types.ts          → LinterConfig, CustomTypes
types/                → emitted .d.ts (from tsconfig.build.json declarationDir)
dist/                 → emitted JS (from tsconfig.build.json outDir)
tests/                → bun:test unit tests that run ESLint programmatically
test_pkg/             → integration fixtures; standalone eslint configs + sample files
```

## Key details

- **Runtime is Bun.** Tests use `bun:test`. Lockfile is `bun.lockb`. Engine requirement is Node >= 20 but dev/test tooling is Bun.
- **tsconfig.build.json** is the build config (`rootDir: ./src`). The root tsconfig also includes `tests/` and `eslint.config.ts` for typechecking.
- **Peer dependencies are broad** (`>=9.0.0` for eslint, `*` for most plugins). Optional deps (react, testing-library, jest-dom, globals, typescript-eslint) are in `optionalDependencies`.
- **No monorepo.** Single package, `test_pkg/` is a fixture directory, not a workspace member.
- **Git hooks** via `simple-git-hooks`: pre-commit → lint-staged, pre-push → `bun test`.
- **CI** only publishes on GitHub release (`npm publish --provenance`). No CI for tests or lint.
