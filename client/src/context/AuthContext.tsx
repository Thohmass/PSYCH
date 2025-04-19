import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { RoleType } from '@myproject/shared';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: RoleType | null;
    login: (role: RoleType) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<RoleType | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            setIsAuthenticated(true);
            setUserRole(storedRole as RoleType);
        }
    }, []);

    const login = (role: RoleType) => {
        setIsAuthenticated(true);
        setUserRole(role);
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};