# План поддержки и актуализации ESLint-конфигурации

> **Текущий статус:** проект уже мигрирован на ESLint v10 (`eslint@10.3.0`, flat-config).
> Цель этого плана — довести все зависимости до последних версий, убрать устаревшие/
> заброшенные плагины, оптимизировать TypeScript-часть и устранить найденные дефекты.

## Принципы и контракты
- **Стабильность контракта для потребителей**: меняются только версии пакетов в
  `package.json`, публичный API (`configs.js` / `configs.ts` / `configs.react`,
  `utils.createEslintAlias`) остаётся без ломающих изменений.
- **Пакетный менеджер — `bun`** (не `npm`/`yarn`). Команды установки — `bun add -d`.
- **Форматирование — через `@stylistic/eslint-plugin`**. Дублирующие стилистические
  правила из других источников отключаются (`@stylistic/disable-legacy` уже включён —
  расширить покрытие).
- **Пользовательские правила** (`src/custom_rules.config.ts`) имеют приоритет и
  применяются к финальному конфигу последними.
- **Для публикуемого конфиг-пакета** runtime-плагины живут в `peerDependencies`
  (это правильно и **не** переносится в `dependencies`). В `devDependencies`
  дублируются только для локальной разработки/тестов. Опциональные плагины (react,
  testing-library и т.п.) остаются в `optionalDependencies` + `peerDependenciesMeta`.
- **Новые плагины** добавляются только с явного одобрения пользователя.
- Любое изменение проверяется: `bun run check:types` + `bun run check:lint` +
  `bun test`. Если ошибок много — уточнить у пользователя, какие правила отключить.

---

## Аудит текущего состояния (на дату ревизии)

### Версии, требующие обновления
| Пакет | Текущая | Целевая (latest) | Примечание |
|-------|---------|------------------|------------|
| `eslint` | 10.3.0 | **10.6.0** | требуется для `eslint-plugin-unicorn@70` (peer `eslint>=10.4`) |
| `typescript-eslint` | 8.59.3 | **8.62.1** | + переход на `projectService` |
| `eslint-plugin-unicorn` | 64.0.0 | **70.0.0** | major-бамп, проверить удалённые/переименованные правила |
| `eslint-plugin-perfectionist` | 5.9.0 | 5.9.1 | patch |
| `eslint-plugin-sonarjs` | 4.0.3 | 4.1.0 | minor |
| `eslint-plugin-security` | 4.0.0 | 4.0.1 | patch |
| `eslint-import-resolver-typescript` | 4.4.4 | 4.4.5 | patch |
| `globals` | 16.3.0 | **17.7.0** | major — свернуть ключи после обновления |
| `@eslint/js`, `@stylistic/eslint-plugin` | — | — | уже актуальны |

### Заброшенные плагины (последний релиз — 2022)
| Пакет | Решение |
|-------|---------|
| `eslint-plugin-filenames@1.3.2` | **Удалить** → заменить на `eslint-plugin-check-file` (правило `check-file/filename-naming-convention`, активно поддерживается) |
| `eslint-plugin-optimize-regex@1.2.1` | **Удалить** (одно правило, проект мёртв). При желании — `@eslint/regex` как замена валидации регулярок |

### Дефекты в коде (обнаружены при ревизии)
- `src/plugins/base.ts:72` — `unicorn/filename-case` настроен **дважды** (`snakeCase`
  здесь и `camelCase`/`pascalCase` в `custom_rules.config.ts`). Убрать дубль из `base.ts`,
  оставить единый источник истины в `custom_rules.config.ts`.
- `customRulesMap.onlyJS` — объявлен, но **нигде не применяется** (мёртвый код).
  Либо подключить в JS-секцию `base.ts`, либо удалить.
- `customRulesMap.test` (testing-library) — объявлен, но **нигде не применяется**.
  Подключить в отдельной тестовой секции (по `tests/**` / `*.test.*`) или удалить.
- `src/plugins/ts.ts` — `projectService: false` + ручной `project: [...]` — устаревший
  паттерн. Перейти на `projectService: true` (см. Фазу 3).
- В `eslint.config.ts` импорт `'./src/index'` без расширения — при сборке OK, но для
  единообразия добавить `.js` (как в остальных файлах `src/`).

---

## Фазы работ

### Фаза 0 — Подготовка и резервная копия
- [ ] Создать ветку: `git checkout -b chore/deps-update-2026-07`
- [ ] Зафиксировать базовое состояние: `bun run check:types && bun run check:lint && bun test`
  (сохранить вывод как референс «до»).
- [ ] **Критерий приёмки:** ветка создана, baseline-проверки записаны.

### Фаза 1 — Бампы зависимостей (без ломающих изменений)
- [ ] `bun add -d eslint@^10.6.0`
- [ ] `bun add -d typescript-eslint@latest eslint-import-resolver-typescript@latest`
- [ ] `bun add -d eslint-plugin-perfectionist@latest eslint-plugin-sonarjs@latest eslint-plugin-security@latest`
- [ ] `bun add -d globals@latest`
- [ ] Запустить `bun run check:types && bun run check:lint && bun test`, починить регрессии.
- [ ] **Критерий приёмки:** все тесты зелёные, версии в таблице выше зафиксированы.

### Фаза 2 — Удаление заброшенных плагинов и их замена
- [ ] Удалить `eslint-plugin-filenames` и `eslint-plugin-optimize-regex`:
  `bun remove eslint-plugin-filenames eslint-plugin-optimize-regex`
  (а также `@types/eslint-plugin-jsx-a11y`/`@types/eslint-plugin-security`, если стали не нужны).
- [ ] Запросить у пользователя одобрение на **`eslint-plugin-check-file`**.
- [ ] Заменить `filenames/*` → `check-file/filename-naming-convention` в
  `src/plugins/base.ts` и `src/custom_rules.config.ts`. Правило `optimize-regex/*` —
  удалить без замены.
- [ ] Убрать дублирующую настройку `unicorn/filename-case` из `base.ts`.
- [ ] **Критерий приёмки:** в `package.json` нет заброшенных пакетов, правило имён
  файлов работает из единого места.

### Фаза 3 — Оптимизация TypeScript (переход на `projectService`)
Современная рекомендация typescript-eslint — `parserOptions.projectService` вместо
`parserOptions.project`: проще настраивать, быстрее работает, типы синхронизированы
с тем, что видит редактор.
- [ ] В `src/plugins/ts.ts`:
      - убрать `parserOptions.project: [...]` и `projectService: false`;
      - включить `parserOptions.projectService: true` (или
        `projectService: { defaultProject: 'tsconfig.json' }` для monorepo);
      - оставить `tsconfigRootDir: process.cwd()`.
- [ ] Рассмотреть переход `tseslint.configs.recommended` →
      **`tseslint.configs.recommendedTypeChecked`** (+ `recommendedTypeCheckedOnly`
      для нужных `files`) — даёт более сильные правила с типами. Обсудить с
      пользователем, т.к. может дать много новых ошибок.
- [ ] В `tsconfig.json` заменить устаревшее `"types": ["bun-types"]` на `"types": ["bun"]`
      (`@types/bun` уже установлен; `bun-types` — legacy).
- [ ] Опционально: включить `verbatimModuleSyntax`/`isolatedModules` для лучшей
      совместимости с современным TS-тулчейном.
- [ ] **Критерий приёмки:** `bun run check:types` и lint TS-файлов проходят без
      регрессий; скорость прогона на `test_pkg/` не хуже baseline.

### Фаза 4 — Чистка мёртвого кода и устранение дублей правил
- [ ] Решить судьбу `customRulesMap.onlyJS` (применить в `base.ts` для `jsFiles`
      через `files`-фильтр **или** удалить).
- [ ] Решить судьбу `customRulesMap.test`: либо подключить в новой секции
      `defineConfig({ files: ['**/*.test.*', 'tests/**'], plugins: { 'testing-library': ... }, rules: customRulesMap.test })`,
      либо удалить вместе с зависимостями `eslint-plugin-testing-library` /
      `eslint-plugin-jest-dom`, если тестовых правил в проде не будет.
- [ ] Сверить стилистические правила: убедиться, что для каждого правила из
      `customRules` есть соответствующее `@stylistic/*`, и базовые аналоги отключены
      (`@stylistic/disable-legacy` + явные `'off'`).
- [ ] **Критерий приёмки:** `grep -r 'onlyJS\|customRulesMap.test' src` либо
      подключены, либо отсутствуют; дублей стилистических правил нет.

### Фаза 5 — Проверка конфликтов через `--print-config`
- [ ] Для каждого целевого файла выгрузить итоговый конфиг и сравнить:
  ```bash
  npx eslint --print-config src/index.ts          > cfg.ts.json
  npx eslint --print-config src/plugins/react.ts  > cfg.react.json
  npx eslint --print-config test_pkg/js_test.js   > cfg.js.json
  ```
- [ ] Найти правила, переопределяемые несколько раз, и оставить единственный
      источник в `custom_rules.config.ts`.
- [ ] **Критерий приёмки:** дерево конфигов детерминировано, без конфликтующих
      переопределений.

### Фаза 6 — Проверка на `test_pkg` и регрессии `src/`
- [ ] `bun run test:js && bun run test:ts && bun run test:react` (нужна пересборка
      `bun run build` — `test_pkg` импортит `../dist`).
- [ ] `bun run check:lint` по всему `src/`.
- [ ] Если ошибок много — составить список и решить с пользователем: отключить
      правило / добавить `// eslint-disable` / починить код.
- [ ] **Критерий приёмки:** ноль ошибок либо зафиксированный согласованный список
      исключений.

### Фаза 7 — Обновление `package.json` метаданных и `engines`
- [ ] Поднять `engines.node` при необходимости ( unicorn 70 / eslint 10.6 требуют
      Node ≥20.x — проверить).
- [ ] Привести в порядок `peerDependencies`/`peerDependenciesMeta`/
      `optionalDependencies` согласно принципам выше (без переноса в `dependencies`).
- [ ] Удалить неиспользуемые `@types/*`, если соответствующие плагины убраны.
- [ ] **Критерий приёмки:** `bun install` чистый, `npm pack --dry-run` показывает
      разумный состав.

### Фаза 8 — Дополнительные плагины (по согласованию с пользователем)
Кандидаты на рассмотрение (каждый — только после одобрения):
- `eslint-plugin-import-x` — современный форк `eslint-plugin-import`, лучше работает
  с flat-config и ESLint 10. Возможна полная замена `eslint-plugin-import`.
- `@eslint/regex` — валидация/оптимизация регулярок (замена optimize-regex).
- `eslint-plugin-react-compiler` — правила под React Compiler (если используется).
- **Критерий приёмки:** принятый список добавлен, протестирован.

### Фаза 9 — Документация
- [ ] Обновить `README.md`: убрать упоминание «ESLint 9», указать актуальные версии,
  пресеты и команды; привести пример flat-config под v10.
- [ ] Добавить раздел «Требуемые peer-зависимости» с таблицей.
- [ ] Обновить таблицу «Доступные конфигурации» с реальным списком плагинов.
- [ ] **Критерий приёмки:** примеры из README воспроизводимы на чистом проекте.

### Фаза 10 — Релиз
- [ ] Обновить `version` в `package.json` (minor или major — по объёму ломающих
      изменений для потребителей).
- [ ] `git commit`, PR, ревью.
- [ ] После мержа: `bun run publish:linter`.
- [ ] **Критерий приёмки:** пакет опубликован, потребитель может поставить без ошибок.

---

## Риски и откат
- **Откат на любой стадии:** `git checkout main -- .` или `git branch -D` ветки.
- **Главные риски:**
  1. `eslint-plugin-unicorn@70` (major) — могут быть удалены/переименованы правила;
     сверить с changelog и обновить отключения в `custom_rules.config.ts`.
  2. `globals@17` (major) — изменены/удалены некоторые ключи; проверить
     `globals.browser/node/jest`.
  3. `recommendedTypeChecked` — существенный прирост новых ошибок; вводить
     опционально и поэтапно.
- **Совет:** выполнять фазы отдельными коммитами для точечного отката.

## История изменений плана
- 2026-07-05 — полная переработка: отражён реальный статус (ESLint 10 уже стоит),
  добавлены конкретные версии/замены, фаза `projectService`, чистка мёртвого кода,
  устранены ошибочные ссылки на Airbnb и противоречие с peerDependencies.
