# Front-utils/linter

🚀 **Высокопроизводительная конфигурация ESLint для современных JavaScript/TypeScript проектов**

Оптимизированная конфигурация ESLint с фокусом на производительность и качество кода. Поддерживает JavaScript, TypeScript, React и тестирование.

## ✨ Особенности

- ⚡ **Высокая производительность** - оптимизированные правила и плагины
- 🎯 **ESLint 9 Flat Config** - современная плоская конфигурация
- 📦 **Готовые пресеты** - js, ts, react, test конфигурации
- 🔧 **Расширяемость** - легко кастомизировать под проект
- 📚 **TypeScript поддержка** - полный типчек и анализ
- ⚛️ **React интеграция** - хуки, JSX и лучшие практики

## 📊 Производительность

Результаты тестирования (среднее время на файл):
- **JavaScript**: ~2.7 сек
- **TypeScript**: ~3.6 сек
- **React**: ~3.7 сек

> **Улучшение производительности на 25-45%** после оптимизации медленных правил

## 🚀 Установка

```bash
# npm
npm install @front-utils/linter --save-dev

# yarn
yarn add @front-utils/linter -D

# bun
bun add @front-utils/linter --dev
```

## 📖 Быстрый старт

### Использование готовых конфигов

```js
// eslint.config.js
import { configs } from "@front-utils/linter";

// JavaScript проект
export default configs.js;

// TypeScript проект
export default configs.ts;

// React + TypeScript
export default configs.react;
```

### Кастомная конфигурация

```js
import { defineConfig } from 'eslint/config';
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.react,
    files  : ['src/**/*.{ts,tsx,js,jsx}'],
    rules  : {
        // Ваши кастомные правила
        'import/no-unresolved': ['error', { ignore: ['^bun:'], }],
    },
});
```

## 📋 Доступные конфигурации

| Конфиг | Описание | Включаемые плагины |
|--------|----------|-------------------|
| `configs.js` | Базовая JS конфигурация | @eslint/js, import, promise, compat, optimize-regex, sonarjs, filenames, jsx-a11y, security |
| `configs.ts` | TypeScript поддержка | + typescript-eslint, import/resolver-typescript |
| `configs.react` | React + TypeScript | + react, react-hooks, globals |

## 🔧 Создание алиасов

```js
import { utils } from "@front-utils/linter";
import importPlugin from 'eslint-plugin-import';

export const aliases = [
    ...utils.createEslintAlias({
        name: 'pkg',
        basePath: '.',
        config: {
            utils: 'src/infrastructure/utils',
            models: 'src/data/models'
        }
    }),
];

const importConfig = {
    plugins: { import: importPlugin },
    settings: {
        'import/resolver': {
            alias: {
                map       : aliases,
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    }
};
```

## 📦 Зависимости

### Минимальные зависимости (для configs.js)
```bash
npm install @eslint/js eslint-plugin-import eslint-plugin-promise --save-dev
```

### TypeScript проект (для configs.ts)
```bash
npm install typescript-eslint eslint-import-resolver-typescript --save-dev
```

### React проект (для configs.react)
```bash
npm install eslint-plugin-react eslint-plugin-react-hooks globals --save-dev
```

### Полный набор (monorepo)
```bash
npm install typescript-eslint eslint-plugin-react eslint-plugin-react-hooks \
    eslint-plugin-testing-library eslint-plugin-jest-dom globals --save-dev
```

### Дополнительные плагины (используются в базовой конфигурации)
```bash
# Опциональные плагины для расширенного функционала
npm install eslint-plugin-compat eslint-plugin-optimize-regex \
    eslint-plugin-sonarjs eslint-plugin-filenames \
    eslint-plugin-jsx-a11y eslint-plugin-security --save-dev
```

## ⚡ Оптимизации производительности

Конфигурация оптимизирована путем отключения медленных правил:

- ❌ `indent` - медленное форматирование
- ❌ `max-len` - проверка длины строк
- ❌ `unicorn/*` - отключены медленные правила
- ❌ `sonarjs` - отключен для ускорения
- ❌ `perfectionist/sort-imports` - заменен на `import/order`

## 🛠 Расширенное использование

### Кастомные правила

```js
import { defineConfig } from 'eslint/config';
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.react,
    rules: {
        // Отключить строгие правила для легаси кода
        'react/prop-types': 'off',
        'react/require-default-props': 'off',

        // Добавить кастомные правила
        'no-console': 'warn',
        'prefer-const': 'error',
    },
});
```

### Игнорирование файлов

```js
import { defineConfig } from 'eslint/config';
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.react,
    ignores: [
        'dist/**/*',
        'node_modules/**/*',
        'coverage/**/*',
        '**/*.d.ts',
    ],
});
```


## 📚 Примеры проектов

### Next.js + TypeScript
```js
// eslint.config.js
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.react,
    files  : ['**/*.{ts,tsx,js,jsx}'],
    settings: {
        react: {
            version: 'detect',
        },
    },
});
```

### Node.js API
```js
// eslint.config.js
import { configs } from "@front-utils/linter";

export default defineConfig({
    extends: configs.ts,
    files  : ['src/**/*.{ts,js}'],
    languageOptions: {
        globals: {
            console: 'readonly',
            process: 'readonly',
            Buffer: 'readonly',
        },
    },
});
```

## 🔍 Поиск и устранение проблем

### Медленная работа ESLint
1. Используйте `--cache` флаг
2. Ограничьте файлы: `files: ['src/**/*.{ts,tsx,js,jsx}']`
3. Отключите ненужные плагины

### Ошибки импорта
```js
// Добавьте в правила
rules: {
    'import/no-unresolved': ['error', {
        ignore: ['^bun:', '^node:'],
    }],
}
```

## 📄 Лицензия

ISC License
