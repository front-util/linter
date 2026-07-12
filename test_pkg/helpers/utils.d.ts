/**
 * Type declarations for utils.js
 */

export function checkEquality(a: unknown, b: unknown): string;
export function checkNullish(value: unknown): string;
export function incrementCounter(): number;
export const CONSTANT_VALUE: number;
export const CONSTANT_ARRAY: number[];
export function greetUser(name: string, role: string): { greeting: string; message: string; };
export function createUser(name: string, age: number, email: string): {
    name  : string;
    age   : number;
    email : string;
    role  : string;
    active: boolean;
};
export function mergeConfigs(defaults: Record<string, unknown>, overrides: Record<string, unknown>): Record<string, unknown>;
export function classifyScore(score: number): string;
export function renameDestructured(obj: { name: string; age: number; email: string; }): { name: string; age: number; email: string; };
export function extractFromArray(arr: unknown[]): { first: unknown; second: unknown; rest: unknown[]; };
export function calculatePower(base: number, exp: number): number;
export function calculateSquare(n: number): number;
export function hasProperty(obj: object, key: string): boolean;
export function createPatterns(): { email: RegExp; phone: RegExp; url: RegExp; };
export function processItems(items: Array<{ value: number; }>): number;
export function sortItems<T extends { name: string; }>(items: T[]): T[];
export function withPadding(a: number, b: number, c: number): number;
export function applyDefaults(options: Record<string, unknown>): Record<string, unknown>;
export function sanitize(input: string): string;
export function simpleLogic(a: number, b: number, c: number): number;
export function unicornPatterns(arr: unknown[]): { found: unknown; hasItems: boolean; first: unknown; last: unknown; };
export function noShadowTest(): string;
export function useAfterDefine(): number;
export function double(n: number): number;
export function triple(n: number): number;

export class TemperatureSensor {

    celsius   : number;
    fahrenheit: number;
    constructor(celsius: number);

}

export class Circle {

    readonly radius: number;
    constructor(radius: number);
    area(): number;
    circumference(): number;

}

export class Rectangle {

    readonly width : number;
    readonly height: number;
    constructor(width: number, height: number);
    area(): number;
    perimeter(): number;

}

export class Square extends Rectangle {

    constructor(side: number);

}

export class Range {

    constructor(start: number, end: number, step?: number);
    [Symbol.iterator](): Iterator<number>;
    toArray(): number[];
    sum(): number;

}

export class EventEmitter {

    on(event: string, callback: (...args: unknown[]) => void): () => void;
    off(event: string, callback: (...args: unknown[]) => void): void;
    emit(event: string, ...args: unknown[]): void;

}

export class QueryBuilder {

    from(table: string): this;
    select(...columns: string[]): this;
    where(condition: string): this;
    build(): string;

}

export class BankAccount {

    readonly balance: number;
    readonly owner  : string;
    constructor(owner: string, initialBalance?: number);
    deposit(amount: number): number;
    withdraw(amount: number): number;

}

export class Config {

    static getInstance(): Config;
    get(key: string, defaultValue?: unknown): unknown;
    set(key: string, value: unknown): void;

}

export class Logger {

    level: string;
    log(message: string): void;
    flush(): Array<{ level: string; message: string; timestamp: number; }>;

}

export class StaticUtils {

    static readonly PI: number;
    static readonly E : number;
    static circleArea(radius: number): number;
    static clamp(value: number, min: number, max: number): number;
    static formatValue(value: unknown): string;

}
