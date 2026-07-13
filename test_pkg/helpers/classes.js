/**
 * Классы и ООП-паттерны для тестирования правил JS-конфига.
 * Покрывает accessor-pairs, class-methods-use-this, unicorn и др.
 */

// ─── accessor-pairs: Только getter ────────────────────────────────

export class TemperatureSensor {

    #celsius = 0;

    constructor(celsius) {
        this.#celsius = celsius;
    }

    get fahrenheit() {
        return (this.#celsius * 9) / 5 + 32;
    }

    get kelvin() {
        return this.#celsius + 273.15;
    }

}

// ─── accessor-pairs: Только setter ─────────────────────────────────

export class Logger {

    #level = 'info';
    #buffer = [];

    set level(newLevel) {
        this.#level = newLevel;
    }

    set bufferSize(size) {
        this.#buffer = new Array(size);
    }

    log(message) {
        this.#buffer.push({ level: this.#level, message, timestamp: Date.now(), });
    }

    flush() {
        const entries = [...this.#buffer];

        this.#buffer = [];
        return entries;
    }

}

// ─── class-methods-use-this ───────────────────────────────────────

export class StaticUtils {

    static PI = 3.14159;
    static E = 2.71828;

    static circleArea(radius) {
        return StaticUtils.PI * radius ** 2;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    formatAsStatic(value) {
        return `Value: ${value}`;
    }

}

// ─── Приватные поля ────────────────────────────────────────────────

export class BankAccount {

    #owner;
    #balance = 0;
    #transactions = [];

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
        if(amount <= 0) throw new RangeError('Amount must be positive');
        this.#balance += amount;
        this.#transactions.push({ type: 'deposit', amount, date: new Date(), });
        return this.#balance;
    }

    withdraw(amount) {
        if(amount <= 0) throw new RangeError('Amount must be positive');
        if(amount > this.#balance) throw new Error('Insufficient funds');
        this.#balance -= amount;
        this.#transactions.push({ type: 'withdraw', amount, date: new Date(), });
        return this.#balance;
    }

    getStatement() {
        return {
            owner       : this.#owner,
            balance     : this.#balance,
            transactions: [...this.#transactions],
        };
    }

}

// ─── Наследование ──────────────────────────────────────────────────

export class Shape {

    #color;

    constructor(color = 'black') {
        this.#color = color;
    }

    get color() {
        return this.#color;
    }

    area() {
        return 0;
    }

    toString() {
        return `Shape(color=${this.#color})`;
    }

}

export class Circle extends Shape {

    #radius;

    constructor(radius, color = 'black') {
        super(color);
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

    toString() {
        return `Circle(r=${this.#radius}, color=${this.color})`;
    }

}

export class Rectangle extends Shape {

    #width;
    #height;

    constructor(width, height, color = 'black') {
        super(color);
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

    toString() {
        return `Rectangle(${this.#width}x${this.#height}, color=${this.color})`;
    }

}

export class Square extends Rectangle {

    constructor(side, color = 'black') {
        super(side, side, color);
    }

    toString() {
        return `Square(side=${this.width}, color=${this.color})`;
    }

}

// ─── Symbol.iterator ──────────────────────────────────────────────

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
                if(current < end) {
                    const value = current;

                    current += step;
                    return { value, done: false, };
                }
                return { value: undefined, done: true, };
            },
        };
    }

    toArray() {
        return [...this];
    }

    sum() {
        let total = 0;

        for(const value of this) {
            total += value;
        }
        return total;
    }

}

// ─── Event Emitter ────────────────────────────────────────────────

export class EventEmitter {

    #listeners = new Map();

    on(event, callback) {
        if(!this.#listeners.has(event)) {
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

        if(callbacks) {
            for(const callback of callbacks) {
                callback(...args);
            }
        }
    }

    once(event, callback) {
        const unsubscribe = this.on(event, (...args) => {
            unsubscribe();
            callback(...args);
        });

        return unsubscribe;
    }

}

// ─── Builder Pattern ──────────────────────────────────────────────

export class QueryBuilder {

    #table = '';
    #conditions = [];
    #orderBy = null;
    #limit = null;
    #offset = null;
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

    order(column, direction = 'ASC') {
        this.#orderBy = { column, direction, };
        return this;
    }

    take(limit) {
        this.#limit = limit;
        return this;
    }

    skip(offset) {
        this.#offset = offset;
        return this;
    }

    build() {
        let sql = `SELECT ${this.#selects.join(', ')} FROM ${this.#table}`;

        if(this.#conditions.length > 0) {
            sql += ` WHERE ${this.#conditions.join(' AND ')}`;
        }
        if(this.#orderBy) {
            sql += ` ORDER BY ${this.#orderBy.column} ${this.#orderBy.direction}`;
        }
        if(this.#limit !== null) {
            sql += ` LIMIT ${this.#limit}`;
        }
        if(this.#offset !== null) {
            sql += ` OFFSET ${this.#offset}`;
        }
        return sql;
    }

}

// ─── Singleton ────────────────────────────────────────────────────

export class Config {

    static #instance = null;
    #data = {};

    static getInstance() {
        if(!Config.#instance) {
            Config.#instance = new Config();
        }
        return Config.#instance;
    }

    get(key, defaultValue) {
        return this.#data[key] ?? defaultValue;
    }

    set(key, value) {
        this.#data[key] = value;
    }

    has(key) {
        return Object.hasOwn(this.#data, key);
    }

    delete(key) {
        delete this.#data[key];
    }

    clear() {
        this.#data = {};
    }

}
