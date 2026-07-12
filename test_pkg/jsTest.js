/**
 * Расширенный JS-тест для проверки всех правил JS-конфига.
 */

// ─── Импорты (perfectionist/sort-imports: builtin → local) ────────
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
    applyDefaults,
    BankAccount,
    calculatePower,
    calculateSquare,
    checkEquality,
    checkNullish,
    Circle,
    classifyScore,
    Config,
    createPatterns,
    createUser,
    double,
    extractFromArray,
    greetUser,
    hasProperty,
    mergeConfigs,
    noShadowTest,
    processItems,
    QueryBuilder,
    Range,
    Rectangle,
    renameDestructured,
    sanitize,
    simpleLogic,
    sortItems,
    Square,
    TemperatureSensor,
    triple,
    unicornPatterns,
    useAfterDefine,
    withPadding
} from './helpers/utils.js';

// ─── eqeqeq ───────────────────────────────────────────────────────
const strictEqual = checkEquality(1, 1);
const strictNotEqual = checkEquality(1, 2);
const nullCheck = checkNullish(null);
const definedCheck = checkNullish(42);

// ─── no-var / prefer-const ────────────────────────────────────────
let mutableValue = 'can change';

mutableValue = 'changed';
const immutableRef = { value: 42, };

// ─── prefer-template ──────────────────────────────────────────────
const greeting = greetUser('Alice', 'admin');

// ─── object-shorthand ─────────────────────────────────────────────
const userObj = createUser('Bob', 25, 'bob@test.com');
const merged = mergeConfigs({ timeout: 3000, }, { retries: 3, });

// ─── no-nested-ternary ────────────────────────────────────────────
const scoreClass = classifyScore(85);

// ─── no-useless-rename ────────────────────────────────────────────
const { version, author, } = { version: '1.0.0', author: 'test', };
const renamed = renameDestructured({ name: 'Charlie', age: 30, email: 'c@test.com', });

// ─── prefer-destructuring ─────────────────────────────────────────
const [first, second, rest] = extractFromArray([1, 2, 3, 4, 5]);

// ─── prefer-exponentiation-operator ───────────────────────────────
const power = calculatePower(2, 10);
const squared = calculateSquare(7);
const directPower = 2 ** 10;

// ─── prefer-object-has-own ────────────────────────────────────────
const hasName = hasProperty({ name: 'test', }, 'name');

// ─── prefer-regex-literals ────────────────────────────────────────
const patterns = createPatterns();
const customRegex = /test/gi;

// ─── prefer-arrow-callback ────────────────────────────────────────
const processed = processItems([{ value: 5, }, { value: 15, }, { value: 25, }]);
const sorted = sortItems([{ name: 'b', }, { name: 'a', }]);

// ─── padding-line-between-statements ──────────────────────────────
const paddedResult = withPadding(1, 2, 3);

// ─── accessor-pairs ───────────────────────────────────────────────
const sensor = new TemperatureSensor(100);

sensor.celsius = 50;
const { fahrenheit, } = sensor;

sensor.fahrenheit = 212;

// ─── arrow-body-style ─────────────────────────────────────────────
const doubled = double(5);
const tripled = triple(5);

// ─── logical-assignment-operators ──────────────────────────────────
const defaultsApplied = applyDefaults({ timeout: null, retries: undefined, });

// ─── @stylistic/semi ──────────────────────────────────────────────
const a = 1;
const b = 2;
const c = a + b;

// ─── @stylistic/indent ────────────────────────────────────────────
const items = [1, 2, 3];
const result = items.map((n) => {
    return n * 2;
});

// ─── @stylistic/comma-dangle ──────────────────────────────────────
const trailingComma = {
    host : 'localhost',
    port : 3000,
    debug: true,
};

// ─── @stylistic/key-spacing ───────────────────────────────────────
const wellSpaced = {
    name  : 'test',
    value : 42,
    active: true,
};

// ─── @stylistic/no-multiple-empty-lines ───────────────────────────
const after = 1;

const later = 2;

// ─── @stylistic/arrow-parens ──────────────────────────────────────
const parensArrow = (x) => x * 2;
const parensArrowBody = (x) => {
    return x * 3;
};

// ─── promise/ правила ──────────────────────────────────────────────
async function processData(url) {
    const data = await readFile(url, 'utf8');

    return JSON.parse(data);
}

// ─── security/ правила ─────────────────────────────────────────────
const safeResult = sanitize('<script>alert(1)</script>');

// ─── sonarjs/ правила ──────────────────────────────────────────────
const logicResult = simpleLogic(1, 2, 3);

// ─── unicorn/ правила ──────────────────────────────────────────────
const unicornResult = unicornPatterns([1, 2, 3, 4, 5]);

// ─── no-shadow ─────────────────────────────────────────────────────
const shadowResult = noShadowTest();

// ─── no-use-before-define ─────────────────────────────────────────
const useBeforeResult = useAfterDefine();

// ─── Классы из helpers ────────────────────────────────────────────
const circle = new Circle(5);
const rect = new Rectangle(10, 20);
const sqShape = new Square(15);
const totalArea = circle.area() + rect.area() + sqShape.area();
const circumference = circle.circumference();
const perimeter = rect.perimeter();

const range = new Range(1, 100);
const rangeSum = range.sum();
const rangeArr = range.toArray();

function createAccount(owner, initial) {
    const acc = new BankAccount(owner, initial);

    acc.deposit(500);
    acc.withdraw(200);
    return acc;
}

const account = createAccount('Alice', 1000);

function initSettings() {
    const settings = Config.getInstance();

    settings.set('apiUrl', 'https://api.example.com');
    return settings;
}

const appSettings = initSettings();
const apiUrl = appSettings.get('apiUrl');

const queryBuilder = new QueryBuilder()
    .from('users')
    .select('id', 'name', 'email')
    .where('active = true')
    .build();

// ─── Чтение файлов ───────────────────────────────────────────────
async function readConfigFile(path) {
    const content = await readFile(path, 'utf8');
    const fullPath = join(process.cwd(), path);

    return { content, path: fullPath, };
}

// ─── Экспорт ──────────────────────────────────────────────────────
export {
    a,
    account,
    after,
    apiUrl,
    appSettings,
    author,
    b,
    c,
    circle,
    circumference,
    customRegex,
    defaultsApplied,
    definedCheck,
    directPower,
    doubled,
    fahrenheit,
    first,
    greeting,
    hasName,
    immutableRef,
    items,
    later,
    logicResult,
    merged,
    mutableValue,
    nullCheck,
    paddedResult,
    parensArrow,
    parensArrowBody,
    patterns,
    perimeter,
    power,
    processData,
    processed,
    queryBuilder,
    rangeArr,
    rangeSum,
    readConfigFile,
    rect,
    renamed,
    rest,
    result,
    safeResult,
    scoreClass,
    second,
    sensor,
    shadowResult,
    sorted,
    sqShape,
    squared,
    strictEqual,
    strictNotEqual,
    totalArea,
    trailingComma,
    tripled,
    unicornResult,
    useBeforeResult,
    userObj,
    version,
    wellSpaced,
};
