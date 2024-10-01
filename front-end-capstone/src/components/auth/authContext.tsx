"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User{
    firstName: string; 
    lastName: string; 
    userName: string;
    email: string;
    wallet: number | null; 
}

interface AuthContextType {
    login: (token: string, user: User) => void;
    logout: () => void;
    user: User | null; 
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (authToken && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user); 
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
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
