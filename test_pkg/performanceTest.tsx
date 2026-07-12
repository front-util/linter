/**
 * Большой тестовый файл для оценки производительности линтера.
 * Импортирует из ВСЕХ helper-модулей, содержит все категории правил.
 */

// ─── IMPORTS ──────────────────────────────────────────────────────
import React, {
    useCallback,
    useMemo,
    useState
} from 'react';

import type {
    Nullable,
    Optional,
    User
} from './helpers/types.ts';

import {
    DataStore,
    getFileStatus,
    parseInput,
    processUser,
    Validation
} from './helpers/types.ts';
import {
    applyDefaults,
    BankAccount,
    calculatePower,
    calculateSquare,
    useAfterDefine as callAfterDefine,
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
    Square,
    TemperatureSensor,
    triple,
    unicornPatterns,
    withPadding
} from './helpers/utils.js';

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 1: ТИПЫ
// ═══════════════════════════════════════════════════════════════════

interface AppConfig {
    apiUrl : string;
    timeout: number;
    retries: number;
    debug  : boolean;
}

interface FeatureFlags {
    darkMode     : boolean;
    notifications: boolean;
    betaFeatures : boolean;
}

interface ThemeConfig {
    primaryColor: string;
    fontFamily  : string;
    fontSize    : number;
}

enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error'
}

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type HttpHeaders = Record<string, string>;

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 2: UTILITY TYPES
// ═══════════════════════════════════════════════════════════════════

type NullableConfig = Nullable<AppConfig>;
type OptionalConfig = Optional<AppConfig>;
type PartialConfig = Partial<AppConfig>;
type RequiredConfig = Required<AppConfig>;

type PickConfig = Pick<AppConfig, 'apiUrl' | 'timeout'>;
type OmitConfig = Omit<AppConfig, 'debug'>;

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 3: GENERICS С ОГРАНИЧЕНИЯМИ
// ═══════════════════════════════════════════════════════════════════

interface Identifiable {
    id: number;
}

interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

type Entity = Identifiable & Timestamped;

interface Repository<T extends Entity> {
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}

type Filter<T> = {
    [K in keyof T]?: T[K] extends string
        ? { contains?: string; equals?: string; }
        : T[K] extends number
            ? { equals?: number; gt?: number; lt?: number; }
            : { equals?: T[K]; };
};

type SortConfig<T> = {
    field    : keyof T;
    direction: 'asc' | 'desc';
};

type PaginationConfig = {
    page    : number;
    pageSize: number;
};

type QueryConfig<T> = {
    filter?    : Filter<T>;
    sort?      : SortConfig<T>;
    pagination?: PaginationConfig;
};

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 4: CONDITIONAL TYPES
// ═══════════════════════════════════════════════════════════════════

type IsEntity<T> = T extends Entity ? true : false;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

type MethodKeys<T> = {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];

type PropertyKeys<T> = {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : K;
}[keyof T];

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 5: MAPPED TYPES
// ═══════════════════════════════════════════════════════════════════

type ReadonlyMap<T> = {
    readonly [K in keyof T]: T[K];
};

type OptionalMap<T> = {
    [K in keyof T]?: T[K];
};

type NullableMap<T> = {
    [K in keyof T]: T[K] | null;
};

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 6: КЛАССЫ
// ═══════════════════════════════════════════════════════════════════

class EventEmitter2<T extends Record<string, unknown[]>> {

    #listeners = new Map<keyof T, Set<(...args: unknown[]) => void>>();
    #maxListeners = 10;

    on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): () => void {
        if(!this.#listeners.has(event)) {
            this.#listeners.set(event, new Set());
        }
        const listeners = this.#listeners.get(event)!;

        if(listeners.size >= this.#maxListeners) {
            console.warn(`Max listeners exceeded for: ${String(event)}`);
        }
        listeners.add(listener as (...args: unknown[]) => void);
        return () => this.off(event, listener);
    }

    off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
        this.#listeners.get(event)?.delete(listener as (...args: unknown[]) => void);
    }

    emit<K extends keyof T>(event: K, ...args: T[K]): void {
        const listeners = this.#listeners.get(event);

        if(listeners) {
            for(const listener of listeners) {
                listener(...args);
            }
        }
    }

    once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): () => void {
        const unsubscribe = this.on(event, (...args: T[K]) => {
            unsubscribe();
            listener(...args);
        });

        return unsubscribe;
    }

    removeAllListeners(event?: keyof T): void {
        if(event) {
            this.#listeners.delete(event);
        }
        else {
            this.#listeners.clear();
        }
    }

    listenerCount(event: keyof T): number {
        return this.#listeners.get(event)?.size ?? 0;
    }

}

// HttpClient удален — использует fetch, не поддерживаемый в compat

class Cache<K, V> {

    #store = new Map<K, { value: V; expiry: number; }>();
    #defaultTTL: number;

    constructor(defaultTTL = 300_000) {
        this.#defaultTTL = defaultTTL;
    }

    get(key: K): V | undefined {
        const entry = this.#store.get(key);

        if(!entry) return undefined;
        if(Date.now() > entry.expiry) {
            this.#store.delete(key);
            return undefined;
        }
        return entry.value;
    }

    set(key: K, value: V, ttl?: number): void {
        this.#store.set(key, {
            value,
            expiry: Date.now() + (ttl ?? this.#defaultTTL),
        });
    }

    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    delete(key: K): boolean {
        return this.#store.delete(key);
    }

    clear(): void {
        this.#store.clear();
    }

    get size(): number {
        return this.#store.size;
    }

    cleanup(): number {
        const now = Date.now();
        let cleaned = 0;

        for(const [key, entry] of this.#store) {
            if(now <= entry.expiry) {
                continue;
            }

            this.#store.delete(key);
            cleaned += 1;
        }
        return cleaned;
    }

}

class StateMachine<TState extends string, TEvent extends string> {

    #current  : TState;
    #transitions = new Map<string, TState>();
    #listeners: Array<(from: TState, to: TState, event: TEvent) => void> = [];

    constructor(initial: TState) {
        this.#current = initial;
    }

    addTransition(from: TState, event: TEvent, to: TState): this {
        this.#transitions.set(`${from}:${event}`, to);
        return this;
    }

    onTransition(listener: (from: TState, to: TState, event: TEvent) => void): void {
        this.#listeners.push(listener);
    }

    send(event: TEvent): boolean {
        const key = `${this.#current}:${event}`;
        const next = this.#transitions.get(key);

        if(!next) return false;

        const prev = this.#current;

        this.#current = next;
        for(const listener of this.#listeners) {
            listener(prev, next, event);
        }
        return true;
    }

    get state(): TState {
        return this.#current;
    }

    canSend(event: TEvent): boolean {
        return this.#transitions.has(`${this.#current}:${event}`);
    }

}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 7: ASYNC ПАТТЕРНЫ
// ═══════════════════════════════════════════════════════════════════

async function readWithRetry<T>(
    path: string,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> {
    const { readFile, } = await import('node:fs/promises');
    let lastError: Error | null = null;

    for(let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const content = await readFile(path, 'utf8');

            return JSON.parse(content) as T;
        }
        catch(error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            if(attempt < maxRetries) {
                const delay = baseDelay * 2 ** attempt;

                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError ?? new Error('Unknown error');
}

async function runSequentially<T>(
    tasks: Array<() => Promise<T>>
): Promise<T[]> {
    const results: T[] = [];

    for(const task of tasks) {
        results.push(await task());
    }
    return results;
}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 8: ФУНКЦИОНАЛЬНЫЕ ПАТТЕРНЫ
// ═══════════════════════════════════════════════════════════════════

function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => {
        let result = arg;

        for(let i = fns.length - 1; i >= 0; i -= 1) {
            result = fns[i](result);
        }
        return result;
    };
}

function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => {
        let result = arg;

        for(const fn of fns) {
            result = fn(result);
        }
        return result;
    };
}

function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
    return (a: A) => (b: B) => fn(a, b);
}

function memoize<TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => TReturn,
    keyFn?: (...args: TArgs) => string
): (...args: TArgs) => TReturn {
    const cache = new Map<string, TReturn>();

    return (...args: TArgs) => {
        const key = keyFn ? keyFn(...args) : JSON.stringify(args);

        if(cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);

        cache.set(key, result);
        return result;
    };
}

function debounce<TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delay: number
): (...args: TArgs) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: TArgs) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

function throttle<TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    limit: number
): (...args: TArgs) => void {
    let isInThrottle = false;

    return (...args: TArgs) => {
        if(isInThrottle) {
            return;
        }

        fn(...args);
        isInThrottle = true;
        setTimeout(() => {
            isInThrottle = false;
        }, limit);
    };
}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 9: АЛГОРИТМЫ
// ═══════════════════════════════════════════════════════════════════

function fibonacci(n: number): number {
    if(n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function flattenArray<T>(arr: unknown[]): T[] {
    const result: T[] = [];

    for(const item of arr) {
        if(Array.isArray(item)) {
            result.push(...flattenArray<T>(item));
        }
        else {
            result.push(item as T);
        }
    }
    return result;
}

function deepClone<T>(obj: T): T {
    if(obj === null || typeof obj !== 'object') return obj;
    if(obj instanceof Date) return new Date(obj) as T;
    if(Array.isArray(obj)) return obj.map((item) => deepClone(item)) as T;
    if(obj instanceof Map) {
        const cloned = new Map();

        for(const [key, value] of obj) {
            cloned.set(deepClone(key), deepClone(value));
        }
        return cloned as T;
    }
    if(obj instanceof Set) {
        const cloned = new Set();

        for(const value of obj) {
            cloned.add(deepClone(value));
        }
        return cloned as T;
    }
    const cloned = {} as T;

    for(const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        (cloned as Record<string, unknown>)[key] = deepClone(
            value
        );
    }
    return cloned;
}

function quickSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    if(arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => compare(x, pivot) < 0);
    const middle = arr.filter((x) => compare(x, pivot) === 0);
    const right = arr.filter((x) => compare(x, pivot) > 0);

    return [...quickSort(left, compare), ...middle, ...quickSort(right, compare)];
}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 10: УТИЛИТЫ
// ═══════════════════════════════════════════════════════════════════

function formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let size = bytes;

    while(size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function formatDate(date: Date, locale = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, {
        year : 'numeric',
        month: 'long',
        day  : 'numeric',
    }).format(date);
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

function slugify(text: string): string {
    let result = text
        .toLowerCase()
        .replaceAll(/[^\w\s-]/g, '')
        .replaceAll(/[\s_]+/g, '-');

    while(result.startsWith('-')) result = result.slice(1);
    while(result.endsWith('-')) result = result.slice(0, -1);
    return result;
}

function truncate(text: string, maxLength: number, suffix = '...'): string {
    if(text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
}

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function camelToKebab(text: string): string {
    return text.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function kebabToCamel(text: string): string {
    return text.replaceAll(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function groupBy<T, K extends string | number>(
    items: T[],
    keyFn: (item: T) => K
): Record<K, T[]> {
    const groups = new Map<K, T[]>();

    for(const item of items) {
        const key = keyFn(item);

        if(!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(item);
    }

    return Object.fromEntries(groups) as Record<K, T[]>;
}

function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
    const seen = new Set<string>();

    return items.filter((item) => {
        const key = keyFn(item);

        if(seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function chunk<T>(items: T[], size: number): T[][] {
    const chunks: T[][] = [];

    for(let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items];

    for(let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i];

        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 11: JSX КОМПОНЕНТЫ
// ═══════════════════════════════════════════════════════════════════

interface AppProps {
    readonly title  : string;
    readonly version: string;
    readonly config : AppConfig;
    readonly users  : User[];
}

interface UserListProps {
    readonly users      : User[];
    readonly onSelect   : (user: User) => void;
    readonly selectedId?: number;
    readonly loading?   : boolean;
}

interface SearchProps {
    readonly value       : string;
    readonly onChange    : (value: string) => void;
    readonly onSubmit    : () => void;
    readonly placeholder?: string;
}

interface PaginationProps {
    readonly page        : number;
    readonly totalPages  : number;
    readonly onPageChange: (page: number) => void;
}

interface StatCardProps {
    readonly label: string;
    readonly value: string | number;
    readonly icon?: React.ReactNode;
}

function StatCard({ label, value, icon, }: StatCardProps) {
    return (
        <div className="stat-card">
            {icon && <div className="stat-icon">{icon}</div>}
            <div className="stat-content">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
            </div>
        </div>
    );
}

function Pagination({ page, totalPages, onPageChange, }: PaginationProps) {
    const pages = useMemo(() => {
        const result: number[] = [];
        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for(let i = start; i <= end; i += 1) {
            result.push(i);
        }
        return result;
    }, [page, totalPages]);

    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                Previous
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={p === page ? 'active' : ''}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}
            <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                Next
            </button>
        </div>
    );
}

function SearchBar({ value, onChange, onSubmit, placeholder, }: SearchProps) {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if(e.key === 'Enter') onSubmit();
        },
        [onSubmit]
    );

    return (
        <div className="search-bar">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <button onClick={onSubmit}>Search</button>
        </div>
    );
}

function UserList({ users, onSelect, selectedId, loading, }: UserListProps) {
    if(loading) return <div>Loading...</div>;
    if(users.length === 0) return <div>No users</div>;

    return (
        <ul className="user-list">
            {users.map((user) => (
                <li
                    key={user.id}
                    className={user.id === selectedId ? 'selected' : ''}
                    onClick={() => onSelect(user)}
                >
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{user.role}</span>
                </li>
            ))}
        </ul>
    );
}

function PerformanceApp({ title, version, config: appConfig, users, }: AppProps) {
    const [query, setQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const filteredUsers = useMemo(() => {
        if(!query) return users;
        const lower = query.toLowerCase();

        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(lower)
                || u.email.toLowerCase().includes(lower)
        );
    }, [users, query]);

    const totalPages = useMemo(
        () => Math.ceil(filteredUsers.length / pageSize),
        [filteredUsers.length]
    );

    const paginatedUsers = useMemo(() => {
        const start = (page - 1) * pageSize;

        return filteredUsers.slice(start, start + pageSize);
    }, [filteredUsers, page]);

    const stats = useMemo(() => ({
        total   : users.length,
        filtered: filteredUsers.length,
    }), [users, filteredUsers]);

    const handleSearch = useCallback(() => setPage(1), []);
    const handleUserSelect = useCallback((user: User) => setSelectedUser(user), []);
    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
        setSelectedUser(null);
    }, []);

    return (
        <div className="app">
            <header>
                <h1>{title} v{version}</h1>
            </header>
            <div className="stats-row">
                <StatCard label="Total Users" value={stats.total} />
                <StatCard label="Filtered" value={stats.filtered} />
                <StatCard label="Page" value={`${page}/${totalPages}`} />
            </div>
            <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSearch}
                placeholder="Search users..."
            />
            <div className="content">
                <UserList
                    users={paginatedUsers}
                    onSelect={handleUserSelect}
                    selectedId={selectedUser?.id}
                />
                {selectedUser && (
                    <div>
                        <h2>{selectedUser.name}</h2>
                        <p>{selectedUser.email}</p>
                        <p>{selectedUser.role}</p>
                    </div>
                )}
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <footer>
                <p>Config: {appConfig.apiUrl}</p>
            </footer>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════
// СЕКЦИЯ 12: ИСПОЛЬЗОВАНИЕ HELPERS (в функциях, не на top-level)
// ═══════════════════════════════════════════════════════════════════

function getUtilsHelpers() {
    const equalityResult = checkEquality(1, 1);
    const nullResult = checkNullish(null);
    const scoreClass = classifyScore(85);
    const renamed = renameDestructured({ name: 'Test', age: 25, email: 'test@test.com', });
    const { first, second, rest, } = extractFromArray([1, 2, 3, 4, 5]);
    const power = calculatePower(2, 10);
    const squared = calculateSquare(7);
    const hasName = hasProperty({ name: 'test', }, 'name');
    const patterns = createPatterns();
    const processed = processItems([{ value: 5, }, { value: 15, }]);
    const greeting = greetUser('Alice', 'admin');
    const userObj = createUser('Bob', 25, 'bob@test.com');
    const merged = mergeConfigs({ timeout: 3000, }, { retries: 3, });
    const padded = withPadding(1, 2, 3);
    const doubled = double(5);
    const tripled = triple(5);
    const safe = sanitize('<script>alert(1)</script>');
    const logic = simpleLogic(1, 2, 3);
    const unicorn = unicornPatterns([1, 2, 3]);
    const shadow = noShadowTest();
    const useBefore = callAfterDefine();
    const defaultsApplied = applyDefaults({ timeout: null, retries: undefined, });

    return {
        equalityResult, nullResult, scoreClass, renamed,
        first, second, rest, power, squared, hasName, patterns,
        processed, greeting, userObj, merged, padded, doubled,
        tripled, safe, logic, unicorn, shadow, useBefore, defaultsApplied,
    };
}

function getTypesHelpers() {
    const store = new DataStore<{ id: number; name: string; }>();

    store.add({ id: 1, name: 'first', });
    store.add({ id: 2, name: 'second', });
    const found = store.findById(1);
    const allItems = store.getAll();

    store.update(1, { name: 'updated', });
    store.delete(2);

    const parsed = parseInput('{"key": "value"}');
    const stringified = parseInput({ key: 'value', });

    const rule = Validation.createRule('required', (v) => !!v, 'Required');
    const result = Validation.validateAll('test', [rule]);

    const userDto = processUser();
    const currentStatus = getFileStatus();

    return {
        store, found, allItems, parsed, stringified,
        rule, result, userDto, currentStatus,
    };
}

function getClassesHelpers() {
    const circle = new Circle(5);
    const rect = new Rectangle(10, 20);
    const sq = new Square(15);
    const totalArea = circle.area() + rect.area() + sq.area();

    const range = new Range(1, 100);
    const rangeSum = range.sum();

    const query = new QueryBuilder()
        .from('users')
        .select('id', 'name', 'email')
        .where('active = true')
        .build();

    const appSettings = Config.getInstance();

    appSettings.set('key', 'value');
    const configVal = appSettings.get('key');

    const account = new BankAccount('Alice', 1000);

    account.deposit(500);
    account.withdraw(200);
    const { balance, } = account;

    const sensor = new TemperatureSensor(100);
    const { fahrenheit, } = sensor;

    return {
        circle, rect, sq, totalArea, range, rangeSum,
        query, appSettings, configVal, account, balance,
        sensor, fahrenheit,
    };
}

// ═══════════════════════════════════════════════════════════════════
// ЭКСПОРТ
// ═══════════════════════════════════════════════════════════════════

export type {
    AppConfig,
    AppProps,
    Entity,
    FeatureFlags,
    Filter,
    HttpHeaders,
    Identifiable,
    IsEntity,
    MethodKeys,
    NullableConfig,
    NullableMap,
    OmitConfig,
    OptionalConfig,
    OptionalMap,
    PaginationConfig,
    PaginationProps,
    PartialConfig,
    PickConfig,
    PropertyKeys,
    QueryConfig,
    ReadonlyMap,
    Repository,
    RequiredConfig,
    SearchProps,
    SortConfig,
    StatCardProps,
    ThemeConfig,
    Timestamped,
    UnwrapArray,
    UnwrapPromise,
    UserListProps,
};

export {
    Cache,
    camelToKebab,
    capitalize,
    chunk,
    compose,
    curry,
    debounce,
    deepClone,
    EventEmitter2,
    fibonacci,
    flattenArray,
    formatDate,
    formatFileSize,
    generateId,
    getClassesHelpers,
    getTypesHelpers,
    getUtilsHelpers,
    groupBy,
    HttpMethod,
    kebabToCamel,
    LogLevel,
    memoize,
    Pagination,
    PerformanceApp,
    pipe,
    quickSort,
    readWithRetry,
    runSequentially,
    SearchBar,
    shuffle,
    slugify,
    StatCard,
    StateMachine,
    throttle,
    truncate,
    uniqueBy,
    UserList,
};
