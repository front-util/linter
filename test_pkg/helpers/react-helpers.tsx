import React, {
    createContext,
    forwardRef,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState
} from 'react';

import type { User } from './types.ts';

// ─── Интерфейсы ───────────────────────────────────────────────────

interface BaseProps {
    className?: string;
    children? : React.ReactNode;
}

interface ListProps<T> {
    items        : T[];
    renderItem   : (item: T, index: number) => React.ReactNode;
    keyExtractor : (item: T) => string;
    emptyMessage?: string;
}

interface FormFieldProps {
    label    : string;
    value    : string;
    onChange : (value: string) => void;
    error?   : string;
    required?: boolean;
    disabled?: boolean;
}

interface CounterProps {
    initialValue?: number;
    step?        : number;
    min?         : number;
    max?         : number;
    onChange?    : (value: number) => void;
}

// ─── rules-of-hooks: Правильные хуки ──────────────────────────────

export function HookPatterns() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const prevCount = useRef(count);

    useEffect(() => {
        prevCount.current = count;
    }, [count]);

    const increment = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const doubled = useMemo(() => count * 2, [count]);

    return (
        <div ref={ref}>
            <p>Count: {count} (doubled: {doubled})</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={increment}>+</button>
        </div>
    );
}

// ─── exhaustive-deps: Полные зависимости ──────────────────────────

export function EffectWithDeps({ userId, token, }: { userId: string; token: string; }) {
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        function loadUser() {
            const user = JSON.parse(`{"id": ${userId}, "name": "User ${userId}", "token": "${token}"}`) as User;

            setData(user);
        }
        loadUser();
    }, [userId, token, setData]);

    return <div>{data?.name}</div>;
}

// ─── no-array-index-key: Правильные ключи ─────────────────────────

export function IndexKeyList({ items, }: { items: string[]; }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

// ─── no-children-prop ─────────────────────────────────────────────

export function ChildrenPropExample({ children, }: BaseProps) {
    return <div>{children}</div>;
}

// ─── no-danger ─────────────────────────────────────────────────────

export function SafeHTML({ text, }: { text: string; }) {
    return <div>{text}</div>;
}

// ─── no-missing-component-display-name ─────────────────────────────

export const NamedComponent = memo(() => {
    return <div>Has display name</div>;
});

export const NamedForwarded = forwardRef<HTMLDivElement>(
    (props, ref) => {
        return <div ref={ref}>Forwarded with name</div>;
    }
);

// ─── useEffect: Сложные зависимости ───────────────────────────────

export function EffectPatterns({ userId, filters, }: {
    userId : string;
    filters: Record<string, string>;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        function loadUser() {
            const loadedUser = JSON.parse(`{"id": ${userId}, "name": "User ${userId}"}`) as User;

            setUser(loadedUser);
            setLoading(false);
        }
        loadUser();
    }, [userId, filters]);

    if(loading) return <p>Loading...</p>;
    if(!user) return <p>Not found</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}

// ─── useMemo / useCallback ────────────────────────────────────────

export function MemoPatterns({ items, query, }: {
    items: User[];
    query: string;
}) {
    const [sortBy, setSortBy] = useState<keyof User>('name');

    const filtered = useMemo(() => {
        const lower = query.toLowerCase();

        return items
            .filter((item) =>
                item.name.toLowerCase().includes(lower)
                || item.email.toLowerCase().includes(lower)
            )
            .sort((a, b) => {
                const aVal = String(a[sortBy]);
                const bVal = String(b[sortBy]);

                return aVal.localeCompare(bVal);
            });
    }, [items, query, sortBy]);

    const handleSort = useCallback((field: keyof User) => {
        setSortBy(field);
    }, []);

    return (
        <div>
            <button onClick={() => handleSort('name')}>Name</button>
            <button onClick={() => handleSort('email')}>Email</button>
            <ul>
                {filtered.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

// ─── useReducer ───────────────────────────────────────────────────

interface TodoState {
    items : Array<{ id: number; text: string; done: boolean; }>;
    nextId: number;
    filter: 'all' | 'active' | 'done';
}

type TodoAction
    = | { type: 'ADD'; text: string; }
        | { type: 'TOGGLE'; id: number; }
        | { type: 'DELETE'; id: number; }
        | { type: 'SET_FILTER'; filter: TodoState['filter']; };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch(action.type) {
        case 'ADD': {
            return {
                ...state,
                items : [...state.items, { id: state.nextId, text: action.text, done: false, }],
                nextId: state.nextId + 1,
            };
        }
        case 'TOGGLE': {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.id ? { ...item, done: !item.done, } : item
                ),
            };
        }
        case 'DELETE': {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.id),
            };
        }
        case 'SET_FILTER': {
            return { ...state, filter: action.filter, };
        }
        default: {
            return state;
        }
    }
}

export function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, {
        items : [],
        nextId: 1,
        filter: 'all',
    });
    const [input, setInput] = useState('');

    const filteredItems = useMemo(() => {
        switch(state.filter) {
            case 'active': { return state.items.filter((i) => !i.done);
            }
            case 'done': { return state.items.filter((i) => i.done);
            }
            default: { return state.items;
            }
        }
    }, [state.items, state.filter]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if(input.trim()) {
            dispatch({ type: 'ADD', text: input.trim(), });
            setInput('');
        }
    }, [input, dispatch]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit">Add</button>
            </form>
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <span onClick={() => dispatch({ type: 'TOGGLE', id: item.id, })}>
                            {item.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'DELETE', id: item.id, })}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ─── Generic компонент ─────────────────────────────────────────────

export function GenericList<T>({
    items,
    renderItem,
    keyExtractor,
    emptyMessage = 'No items',
}: ListProps<T>) {
    if(items.length === 0) return <p>{emptyMessage}</p>;

    return (
        <ul>
            {items.map((item, index) => (
                <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
            ))}
        </ul>
    );
}

// ─── forwardRef ───────────────────────────────────────────────────

export const InputField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, value, onChange, error, required, disabled, }, ref) => {
        return (
            <div>
                <label>
                    {label}{required && ' *'}
                    <input
                        ref={ref}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                    />
                </label>
                {error && <span>{error}</span>}
            </div>
        );
    }
);

// ─── Counter ──────────────────────────────────────────────────────

export function Counter({
    initialValue = 0,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    onChange,
}: CounterProps) {
    const [count, setCount] = useState(initialValue);
    const prevRef = useRef(count);

    useEffect(() => {
        if(prevRef.current === count) {
            return;
        }

        prevRef.current = count;
        onChange?.(count);
    }, [count, onChange]);

    const increment = useCallback(() => {
        setCount((c) => Math.min(c + step, max));
    }, [step, max]);

    const decrement = useCallback(() => {
        setCount((c) => Math.max(c - step, min));
    }, [step, min]);

    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

// ─── JSX-a11y ─────────────────────────────────────────────────────

export function A11yExample() {
    return (
        <div>
            <a href="/link">Click me</a>
            <button onClick={() => console.log('clicked')}>Button</button>
            <ul>
                <li>Item</li>
            </ul>
        </div>
    );
}

// ─── Error Boundary ───────────────────────────────────────────────

interface ErrorBoundaryState {
    hasError: boolean;
    error   : Error | null;
}

export class ErrorBoundary extends React.Component<BaseProps, ErrorBoundaryState> {

    static readonly displayName = 'ErrorBoundary';

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, };
    }

    constructor(props: BaseProps) {
        super(props);
        this.state = { hasError: false, error: null, };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if(this.state.hasError) {
            return <div>Error: {this.state.error?.message}</div>;
        }
        return this.props.children;
    }

}

// ─── Context ──────────────────────────────────────────────────────

interface ThemeContextValue {
    theme      : 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, }: BaseProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme, }), [theme, toggleTheme]);

    return (
        <ThemeContext value={value}>
            {children}
        </ThemeContext>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
