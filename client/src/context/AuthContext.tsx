import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { RoleType } from '@myproject/shared';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: RoleType | null;
    userId: string | undefined;
    login: (role: RoleType, id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<RoleType | null>(null);
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        const storedId = localStorage.getItem('userId');
        if (storedRole) {
            setIsAuthenticated(true);
            setUserRole(storedRole as RoleType);
            setUserId(storedId === null ? '' : storedId);
        }
    }, []);

    const login = (role: RoleType, id: string) => {
        console.log('login', role, id);
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', id);
        console.log(localStorage.getItem('userId'));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId('');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
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