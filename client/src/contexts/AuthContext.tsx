import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: number;
    username: string;
    email: string;
    role: "user" | "admin";
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "xplus-user";

// Simulated user database for demo
const DEMO_USERS: { email: string; password: string; name: string }[] = [
    { email: "demo@xplus.com", password: "demo123", name: "Demo User" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(AUTH_STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });
            if (!res.ok) {
                return { success: false, error: "Invalid email or password" };
            }
            const user = await res.json();
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, error: "Login failed" };
        }
    };

    const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password, email }), // backend expects username, we use email as username
            });
            if (!res.ok) {
                const text = await res.text();
                return { success: false, error: text || "Registration failed" };
            }
            const user = await res.json();
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, error: "Registration failed" };
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setUser(null);
            // Optionally redirect to home or login page
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
