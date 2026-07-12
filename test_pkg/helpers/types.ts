/**
 * TS-типы и утилиты для тестирования всех TS-специфичных правил.
 */

// ─── Базовые типы ─────────────────────────────────────────────────

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

export enum UserRole {
    Admin = 'admin',
    Editor = 'editor',
    Viewer = 'viewer',
}

export type UserSummary = Pick<User, 'id' | 'name' | 'role'>;
export type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
export type PartialUser = Partial<User>;

// ─── Generics ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    page: number;
    pageSize: number;
    total: number;
}

export type ApiResult<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

export class DataStore<T extends { id: number }> {
    #items: T[] = [];

    add(item: T): void {
        this.#items.push(item);
    }

    findById(id: number): T | undefined {
        return this.#items.find((item) => item.id === id);
    }

    getAll(): readonly T[] {
        return Object.freeze([...this.#items]);
    }

    update(id: number, updates: Partial<T>): T | undefined {
        const index = this.#items.findIndex((item) => item.id === id);
        if (index === -1) return undefined;
        this.#items[index] = { ...this.#items[index], ...updates };
        return this.#items[index];
    }

    delete(id: number): boolean {
        const index = this.#items.findIndex((item) => item.id === id);
        if (index === -1) return false;
        this.#items.splice(index, 1);
        return true;
    }
}

// ─── Utility Types ────────────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<ApiResult<T>>;

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonEmptyArray<T> = [T, ...T[]];

// ─── Conditional Types ────────────────────────────────────────────

export type IsString<T> = T extends string ? true : false;
export type IsNumber<T> = T extends number ? true : false;
export type Flatten<T> = T extends Array<infer U> ? U : T;
export type PromiseValue<T> = T extends Promise<infer U> ? U : T;

// ─── Mapped Types ─────────────────────────────────────────────────

export type OptionalAll<T> = {
    [P in keyof T]?: T[P];
};

export type RequiredAll<T> = {
    [P in keyof T]-?: T[P];
};

export type NullableAll<T> = {
    [P in keyof T]: T[P] | null;
};

// ─── Overloads ────────────────────────────────────────────────────

export function parseInput(input: string): object;
export function parseInput(input: object): string;
export function parseInput(input: string | object): object | string {
    if (typeof input === 'string') {
        return JSON.parse(input);
    }
    return JSON.stringify(input);
}

// ─── Namespace ────────────────────────────────────────────────────

export namespace Validation {
    export interface Rule {
        name: string;
        validate: (value: unknown) => boolean;
        message: string;
    }

    export function createRule(
        name: string,
        validate: (value: unknown) => boolean,
        message: string,
    ): Rule {
        return { name, validate, message };
    }

    export function validateAll(
        value: unknown,
        rules: Rule[],
    ): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        for (const rule of rules) {
            if (!rule.validate(value)) {
                errors.push(rule.message);
            }
        }
        return { valid: errors.length === 0, errors };
    }
}

// ─── @typescript-eslint/no-use-before-define ──────────────────────

interface UserDTO {
    id: number;
    name: string;
    email: string;
}

function processUser(): UserDTO {
    return { id: 1, name: 'test', email: 'test@test.com' };
}

export { processUser };

// ─── @typescript-eslint/no-shadow ─────────────────────────────────

export const status = 'active';

export function getFileStatus(): string {
    const fileStatus = 'pending';
    return fileStatus;
}

// ─── Экспорт типов ────────────────────────────────────────────────

export type { User as UserType };
