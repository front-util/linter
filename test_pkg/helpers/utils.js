/**
 * JS-утилиты для тестирования всех правил JS-конфига.
 */

// ─── eqeqeq ───────────────────────────────────────────────────────
export function checkEquality(a, b) {
    if (a === b) return 'equal';
    if (a !== b) return 'not-equal';
    return 'unknown';
}

export function checkNullish(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    return 'defined';
}

// ─── no-var / prefer-const ────────────────────────────────────────
let globalCounter = 0;

export function incrementCounter() {
    const step = 1;
    globalCounter += step;
    return globalCounter;
}

export const CONSTANT_VALUE = 42;
export const CONSTANT_ARRAY = [1, 2, 3];

// ─── prefer-template ──────────────────────────────────────────────
export function greetUser(name, role) {
    const greeting = `Hello, ${name}!`;
    const message = `Role: ${role} | Name: ${name}`;
    return { greeting, message };
}

// ─── object-shorthand ─────────────────────────────────────────────
export function createUser(name, age, email) {
    const role = 'user';
    const active = true;
    return { name, age, email, role, active };
}

export function mergeConfigs(defaults, overrides) {
    return { ...defaults, ...overrides };
}

// ─── no-nested-ternary ────────────────────────────────────────────
export function classifyScore(score) {
    if (score > 90) return 'excellent';
    if (score > 70) return 'good';
    if (score > 50) return 'average';
    return 'poor';
}

// ─── no-useless-rename ────────────────────────────────────────────
export function renameDestructured({ name, age, email }) {
    return { name, age, email };
}

// ─── prefer-destructuring ─────────────────────────────────────────
export function extractFromArray(arr) {
    const [first, second, ...rest] = arr;
    return { first, second, rest };
}

// ─── prefer-exponentiation-operator ───────────────────────────────
export function calculatePower(base, exp) {
    return base ** exp;
}

export function calculateSquare(n) {
    return n ** 2;
}

// ─── prefer-object-has-own ────────────────────────────────────────
export function hasProperty(obj, key) {
    return Object.hasOwn(obj, key);
}

// ─── prefer-regex-literals ────────────────────────────────────────
export function createPatterns() {
    const email = /^[\w.-]+@[\w.-]+\.\w+$/;
    const phone = /\d{3}-\d{4}/;
    const url = /https?:\/\/[^\s]+/;
    return { email, phone, url };
}

// ─── prefer-arrow-callback ────────────────────────────────────────
export function processItems(items) {
    return items
        .map((item) => item.value * 2)
        .filter((item) => item > 10)
        .reduce((acc, item) => acc + item, 0);
}

export function sortItems(items) {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

// ─── padding-line-between-statements ──────────────────────────────
export function withPadding(a, b, c) {
    const x = a + b;
    const y = b + c;

    const z = x * y;

    if (z > 0) return z;

    return 0;
}

// ─── accessor-pairs ───────────────────────────────────────────────
export class TemperatureSensor {
    #celsius = 0;

    constructor(celsius) {
        this.#celsius = celsius;
    }

    get celsius() {
        return this.#celsius;
    }

    set celsius(value) {
        this.#celsius = value;
    }

    get fahrenheit() {
        return (this.#celsius * 9) / 5 + 32;
    }

    set fahrenheit(value) {
        this.#celsius = ((value - 32) * 5) / 9;
    }
}

// ─── arrow-body-style ─────────────────────────────────────────────
export const double = (n) => n * 2;
export const triple = (n) => n * 3;

// ─── logical-assignment-operators ──────────────────────────────────
export function applyDefaults(options) {
    options.timeout ??= 3000;
    options.retries ??= 3;
    return options;
}

// ─── @stylistic rules (compliant) ─────────────────────────────────
export function stylisticDemo() {
    const a = 1;
    const b = 2;

    const result = a + b;

    return result;
}

export const wellSpaced = {
    name    : 'test',
    value   : 42,
    active  : true,
};

export function trailingComma(
    param1,
    param2,
    param3,
) {
    return [param1, param2, param3];
}

// ─── promise/ правила ──────────────────────────────────────────────
export async function readJson(path) {
    const { readFile } = await import('node:fs/promises');
    const content = await readFile(path, 'utf8');
    return JSON.parse(content);
}

export function promiseChain() {
    return readJson('/tmp/data.json')
        .then((data) => data.items)
        .catch((err) => {
            console.error(err);
            return [];
        });
}

// ─── security/ правила ─────────────────────────────────────────────
export function sanitize(input) {
    return input.replace(/[<>]/g, '');
}

// ─── sonarjs/ правила ──────────────────────────────────────────────
export function simpleLogic(a, b, c) {
    if (a > 0 && b > 0 && c > 0) {
        return a + b + c;
    }
    if (a > 0 && b > 0) {
        return a + b;
    }
    return 0;
}

// ─── unicorn/ правила ──────────────────────────────────────────────
export function unicornPatterns(arr) {
    const found = arr.find(Boolean);
    const hasItems = arr.length > 0;
    const first = arr.at(0);
    const last = arr.at(-1);
    return { found, hasItems, first, last };
}

// ─── no-shadow ─────────────────────────────────────────────────────
const outerValue = 'outer';

export function noShadowTest() {
    const innerValue = 'inner';
    return innerValue;
}

// ─── no-use-before-define ─────────────────────────────────────────
function helperFunction() {
    return 42;
}

export function useAfterDefine() {
    return helperFunction();
}

// ─── Классы ───────────────────────────────────────────────────────
export class Circle {
    #radius;

    constructor(radius) {
        this.#radius = radius;
    }

    get radius() {
        return this.#radius;
    }

    area() {
        return Math.PI * this.#radius ** 2;
    }

    circumference() {
        return 2 * Math.PI * this.#radius;
    }
}

export class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    area() {
        return this.#width * this.#height;
    }

    perimeter() {
        return 2 * (this.#width + this.#height);
    }
}

export class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

export class Range {
    #start;
    #end;
    #step;

    constructor(start, end, step = 1) {
        this.#start = start;
        this.#end = end;
        this.#step = step;
    }

    [Symbol.iterator]() {
        let current = this.#start;
        const end = this.#end;
        const step = this.#step;

        return {
            next() {
                if (current < end) {
                    const value = current;
                    current += step;
                    return { value, done: false };
                }
                return { value: undefined, done: true };
            },
        };
    }

    toArray() {
        return [...this];
    }

    sum() {
        let total = 0;
        for (const value of this) {
            total += value;
        }
        return total;
    }
}

export class EventEmitter {
    #listeners = new Map();

    on(event, callback) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, new Set());
        }
        this.#listeners.get(event).add(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        this.#listeners.get(event)?.delete(callback);
    }

    emit(event, ...args) {
        const callbacks = this.#listeners.get(event);
        if (callbacks) {
            for (const callback of callbacks) {
                callback(...args);
            }
        }
    }
}

export class QueryBuilder {
    #table = '';
    #conditions = [];
    #selects = ['*'];

    from(table) {
        this.#table = table;
        return this;
    }

    select(...columns) {
        this.#selects = columns;
        return this;
    }

    where(condition) {
        this.#conditions.push(condition);
        return this;
    }

    build() {
        let sql = `SELECT ${this.#selects.join(', ')} FROM ${this.#table}`;
        if (this.#conditions.length > 0) {
            sql += ` WHERE ${this.#conditions.join(' AND ')}`;
        }
        return sql;
    }
}

export class BankAccount {
    #owner;
    #balance = 0;

    constructor(owner, initialBalance = 0) {
        this.#owner = owner;
        this.#balance = initialBalance;
    }

    get balance() {
        return this.#balance;
    }

    get owner() {
        return this.#owner;
    }

    deposit(amount) {
        if (amount <= 0) throw new RangeError('Amount must be positive');
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (amount <= 0) throw new RangeError('Amount must be positive');
        if (amount > this.#balance) throw new Error('Insufficient funds');
        this.#balance -= amount;
        return this.#balance;
    }
}

export class Config {
    static #instance = null;
    #data = {};

    static getInstance() {
        if (!Config.#instance) {
            Config.#instance = new Config();
        }
        return Config.#instance;
    }

    get(key, defaultValue = undefined) {
        return this.#data[key] ?? defaultValue;
    }

    set(key, value) {
        this.#data[key] = value;
    }
}
