/**
 * Расширенный TS-тест для проверки всех правил TS-конфига.
 */

// ─── Импорты ──────────────────────────────────────────────────────
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import type {
    ApiResponse,
    Flatten,
    IsNumber,
    IsString,
    Nullable,
    NullableAll,
    Optional,
    OptionalAll,
    RequiredAll,
    User
} from './helpers/types.ts';

import {
    createValidationRule,
    DataStore,
    getFileStatus,
    parseInput,
    processUser,
    validateAll
} from './helpers/types.ts';

// ─── Базовые типы ─────────────────────────────────────────────────

interface FileInfo {
    name: string;
    size: number;
    path: string;
}

type FileList = FileInfo[];
type FileMap = Map<string, FileInfo>;

// ─── Enum ──────────────────────────────────────────────────────────

enum FileStatus {
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed'
}

enum Permission {
    Read = 1,
    Write = 2,
    Execute = 4
}

// ─── Generics ─────────────────────────────────────────────────────

interface Repository<T extends { id: number; }> {
    findById(id: number): T | null;
    findAll(): T[];
    create(item: Omit<T, 'id'>): T;
    update(id: number, updates: Partial<T>): T | null;
    delete(id: number): boolean;
}

class InMemoryRepository<T extends { id: number; }> implements Repository<T> {

    #items: T[] = [];
    #nextId = 1;

    findById(id: number): T | null {
        return this.#items.find((item) => item.id === id) ?? null;
    }

    findAll(): T[] {
        return [...this.#items];
    }

    create(item: Omit<T, 'id'>): T {
        const newItem = { ...item, id: this.#nextId++, } as T;

        this.#items.push(newItem);
        return newItem;
    }

    update(id: number, updates: Partial<T>): T | null {
        const index = this.#items.findIndex((item) => item.id === id);

        if(index === -1) return null;
        this.#items[index] = { ...this.#items[index], ...updates, };
        return this.#items[index];
    }

    delete(id: number): boolean {
        const index = this.#items.findIndex((item) => item.id === id);

        if(index === -1) return false;
        this.#items.splice(index, 1);
        return true;
    }

}

// ─── Utility Types ────────────────────────────────────────────────

type UserCreateData = Omit<User, 'id' | 'createdAt'>;
type UserUpdateData = Partial<Omit<User, 'id'>>;
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
type NullableUser = Nullable<User>;
type OptionalUser = Optional<User>;

// ─── Conditional Types ────────────────────────────────────────────

type IsStringTest = IsString<'hello'>;
type IsNumberTest = IsNumber<42>;
type FlattenedArray = Flatten<number[]>;

// ─── Mapped Types ─────────────────────────────────────────────────

type OptionalFileInfo = OptionalAll<FileInfo>;
type RequiredFileInfo = RequiredAll<FileInfo>;
type NullableFileInfo = NullableAll<FileInfo>;

// ─── Overloads ────────────────────────────────────────────────────

function formatValue(input: string): string;
function formatValue(input: number): string;
function formatValue(isEnabled: boolean): string;
function formatValue(input: string | number | boolean): string {
    if(typeof input === 'string') return input.toUpperCase();
    if(typeof input === 'number') return input.toFixed(2);
    return input ? 'YES' : 'NO';
}

// ─── Module (замена namespace) ─────────────────────────────────────

function getFileExtension(filename: string): string {
    const parts = filename.split('.');

    return parts.length > 1 ? parts[parts.length - 1] : '';
}

function isImageFile(filename: string): boolean {
    const ext = getFileExtension(filename).toLowerCase();

    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
}

// ─── @typescript-eslint/no-use-before-define ──────────────────────

interface UserDTO {
    id   : number;
    name : string;
    email: string;
}

function processUserDTO(): UserDTO {
    return { id: 1, name: 'test', email: 'test@test.com', };
}

// ─── @typescript-eslint/no-shadow ─────────────────────────────────

const status = 'active';

function getStatusValue(): string {
    const fileStatus = 'pending';

    return fileStatus;
}

// ─── Классы с типизацией ──────────────────────────────────────────

class FileService {

    #basePath: string;
    #cache   : Map<string, FileInfo>;

    constructor(basePath: string) {
        this.#basePath = basePath;
        this.#cache = new Map();
    }

    async readFileInfo(dir: string, filename: string): Promise<FileInfo> {
        const cacheKey = join(dir, filename);
        const cached = this.#cache.get(cacheKey);

        if(cached) return cached;

        const fullPath = join(this.#basePath, dir, filename);
        const stats = await stat(fullPath);
        const info: FileInfo = {
            name: filename,
            size: stats.size,
            path: fullPath,
        };

        this.#cache.set(cacheKey, info);
        return info;
    }

    clearCache(): void {
        this.#cache.clear();
    }

}

// ─── Async паттерны ───────────────────────────────────────────────

async function readWithRetry<T>(
    path: string,
    maxRetries = 3
): Promise<T> {
    let lastError: Error | null = null;

    for(let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const content = await readFile(path, 'utf8');

            return JSON.parse(content) as T;
        }
        catch(error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            if(attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        }
    }

    throw lastError ?? new Error('Unknown error');
}

// ─── DataStore из helpers ──────────────────────────────────────────

interface StoreItem {
    id   : number;
    name : string;
    value: number;
}

function createStoreWithData(): DataStore<StoreItem> {
    const store = new DataStore<StoreItem>();

    store.add({ id: 1, name: 'first', value: 100, });
    store.add({ id: 2, name: 'second', value: 200, });
    store.update(1, { value: 150, });
    store.delete(2);
    return store;
}

const store = createStoreWithData();
const found = store.findById(1);
const all = store.getAll();

// ─── parseInput из helpers ─────────────────────────────────────────

const parsed = parseInput('{"key": "value"}');
const stringified = parseInput({ key: 'value', });

// ─── Validation namespace из helpers ───────────────────────────────

const requiredRule = createValidationRule(
    'required',
    (value) => value !== null && value !== undefined && value !== '',
    'Field is required'
);

const minLengthRule = createValidationRule(
    'minLength',
    (value) => typeof value === 'string' && value.length >= 3,
    'Minimum 3 characters'
);

const validation = validateAll('ab', [requiredRule, minLengthRule]);

// ─── processUser из helpers ────────────────────────────────────────

const userDto = processUser();

// ─── getFileStatus из helpers ──────────────────────────────────────

const currentStatus = getFileStatus();

// ─── Экспорт ──────────────────────────────────────────────────────

export type {
    FileInfo,
    FileList,
    FileMap,
    NullableFileInfo,
    NullableUser,
    OptionalFileInfo,
    OptionalUser,
    Repository,
    RequiredFileInfo,
    StoreItem,
    UserCreateData,
    UserResponse,
    UsersResponse,
    UserUpdateData,
};

export {
    all,
    currentStatus,
    FileService,
    FileStatus,
    formatValue,
    found,
    getFileExtension,
    getStatusValue,
    InMemoryRepository,
    isImageFile,
    parsed,
    Permission,
    processUserDTO,
    readWithRetry,
    status,
    store,
    stringified,
    userDto,
    validation,
};
