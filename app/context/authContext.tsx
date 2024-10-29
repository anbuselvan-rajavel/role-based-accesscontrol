"use client"
// context/authContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';

interface User {
    username: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string, role: 'admin' | 'user') => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string, role: 'admin' | 'user') => {
        // Mock authentication logic
        if ((role === 'admin' && username === 'admin' && password === 'admin') ||
            (role === 'user' && username === 'user' && password === 'user')) {
            const userData = { username, role };
            setUser(userData);
            setCookie('user', JSON.stringify(userData)); // Store user data in cookies
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        deleteCookie('user'); // Remove user data from cookies
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
