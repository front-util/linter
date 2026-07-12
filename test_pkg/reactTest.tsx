/**
 * Расширенный React-тест для проверки всех правил React-конфига.
 */

// ─── Импорты ──────────────────────────────────────────────────────
import React, {
    createContext,
    use,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState
} from 'react';

import type { User, UserRole } from './helpers/types.ts';

import {
    A11yExample,
    ChildrenPropExample,
    Counter,
    EffectPatterns,
    ErrorBoundary,
    GenericList,
    IndexKeyList,
    InputField,
    MemoPatterns,
    NamedComponent,
    NamedForwarded,
    SafeHTML,
    ThemeProvider,
    TodoApp
} from './helpers/react-helpers.tsx';

// ─── Интерфейсы ───────────────────────────────────────────────────

interface AppProps {
    readonly title  : string;
    readonly version: string;
    readonly debug? : boolean;
}

interface UserCardProps {
    readonly user    : User;
    readonly onEdit  : (id: number) => void;
    readonly onDelete: (id: number) => void;
}

interface SearchBarProps {
    readonly value       : string;
    readonly onChange    : (value: string) => void;
    readonly placeholder?: string;
}

// ─── Context ──────────────────────────────────────────────────────

interface AppContextValue {
    user   : User | null;
    setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function useAppContext(): AppContextValue {
    const context = use(AppContext);

    if(!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
}

function AppProvider({ children, }: { readonly children: React.ReactNode; }) {
    const [user, setUser] = useState<User | null>(null);

    const value = useMemo(() => ({ user, setUser, }), [user]);

    return (
        <AppContext value={value}>
            {children}
        </AppContext>
    );
}

// ─── rules-of-hooks ───────────────────────────────────────────────

function ValidHooks() {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    const increment = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const doubled = useMemo(() => count * 2, [count]);

    return (
        <div ref={ref}>
            <p>{count} × 2 = {doubled}</p>
            <button onClick={increment}>+</button>
        </div>
    );
}

// ─── exhaustive-deps ──────────────────────────────────────────────

function DepsExample({ userId, }: { readonly userId: string; }) {
    const data = useMemo<User | null>(() => {
        return JSON.parse(`{"id": ${userId}, "name": "User ${userId}"}`) as User;
    }, [userId]);

    return <div>{data?.name}</div>;
}

// ─── no-array-index-key ───────────────────────────────────────────

function ListWithKeys({ items, }: { readonly items: string[]; }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

// ─── useReducer ───────────────────────────────────────────────────

interface TodoState {
    items : Array<{ id: number; text: string; done: boolean; }>;
    nextId: number;
}

type TodoAction
    = | { type: 'ADD'; text: string; }
        | { type: 'TOGGLE'; id: number; }
        | { type: 'DELETE'; id: number; };

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
        default: {
            return state;
        }
    }
}

function TodoList() {
    const [state, dispatch] = useReducer(todoReducer, { items: [], nextId: 1, });
    const [input, setInput] = useState('');

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
                {state.items.map((item) => (
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

// ─── Компоненты ───────────────────────────────────────────────────

function UserCard({ user, onEdit, onDelete, }: UserCardProps) {
    const handleEdit = useCallback(() => onEdit(user.id), [onEdit, user.id]);
    const handleDelete = useCallback(() => onDelete(user.id), [onDelete, user.id]);

    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

function SearchBar({ value, onChange, placeholder, }: SearchBarProps) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}

// ─── Ref as prop (React 19) ───────────────────────────────────────

function FancyInput({ label, ref, }: { readonly label: string; readonly ref: React.Ref<HTMLInputElement>; }) {
    return (
        <label>
            {label}
            <input ref={ref} />
        </label>
    );
}

// ─── Классовый компонент ──────────────────────────────────────────

interface LifecycleState {
    data   : string | null;
    loading: boolean;
}

class LifecycleComponent extends React.Component<{ readonly url: string; }, LifecycleState> {

    static readonly displayName = 'LifecycleComponent';

    state: LifecycleState = { data: null, loading: false, };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: { readonly url: string; }) {
        if(prevProps.url !== this.props.url) {
            this.fetchData();
        }
    }

    fetchData() {
        this.setState({ loading: true, });
        try {
            const data = JSON.stringify({ url: this.props.url, timestamp: Date.now(), });

            this.setState({ data, loading: false, });
        }
        catch{
            this.setState({ loading: false, });
        }
    }

    render() {
        if(this.state.loading) return <div>Loading...</div>;
        return <pre>{this.state.data}</pre>;
    }

}

// ─── Главный компонент ────────────────────────────────────────────

function App({ title, version, }: AppProps) {
    const [query, setQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const users = useMemo<User[]>(() => [
        { id: 1, name: 'Alice', email: 'alice@test.com', role: 'admin' as UserRole, createdAt: new Date(), },
        { id: 2, name: 'Bob', email: 'bob@test.com', role: 'editor' as UserRole, createdAt: new Date(), },
        { id: 3, name: 'Charlie', email: 'charlie@test.com', role: 'viewer' as UserRole, createdAt: new Date(), }
    ], []);

    const filteredUsers = useMemo(() => {
        if(!query) return users;
        const lower = query.toLowerCase();

        return users.filter((u) => u.name.toLowerCase().includes(lower));
    }, [users, query]);

    const handleEdit = useCallback((id: number) => {
        setSelectedUser(users.find((u) => u.id === id) ?? null);
    }, [users]);

    const handleDelete = useCallback((id: number) => {
        console.log('Delete', id);
    }, []);

    return (
        <AppProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <div>
                        <h1>{title} v{version}</h1>
                        <SearchBar value={query} onChange={setQuery} placeholder="Search..." />
                        <GenericList
                            items={filteredUsers}
                            renderItem={(user) => (
                                <UserCard
                                    user={user}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                            keyExtractor={(user) => String(user.id)}
                            emptyMessage="No users"
                        />
                        <TodoList />
                        <ValidHooks />
                        <DepsExample userId="1" />
                        <ListWithKeys items={['a', 'b', 'c']} />
                        <ChildrenPropExample>
                            <span>Child</span>
                        </ChildrenPropExample>
                        <SafeHTML text="Safe content" />
                        <NamedComponent />
                        <NamedForwarded />
                        <EffectPatterns userId="1" filters={{}} />
                        <MemoPatterns items={users} query={query} />
                        <TodoApp />
                        <Counter />
                        <A11yExample />
                        <IndexKeyList items={['a', 'b', 'c']} />
                        <InputField label="Name" value="" onChange={() => {}} />
                        <LifecycleComponent url="/api/data" />
                        {selectedUser && (
                            <div>
                                <p>{selectedUser.name}</p>
                                <p>{selectedUser.email}</p>
                            </div>
                        )}
                    </div>
                </ErrorBoundary>
            </ThemeProvider>
        </AppProvider>
    );
}

// ─── Экспорт ──────────────────────────────────────────────────────

export {
    App,
    AppProvider,
    FancyInput,
    LifecycleComponent,
    SearchBar,
    TodoList,
    useAppContext,
    UserCard,
};
