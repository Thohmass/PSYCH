import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RoleType } from '@myproject/shared';

interface AuthGuardProps {
    role?: RoleType;
    redirectTo?: string;
}

export const useAuthGuard = ({ role, redirectTo = '/login' }: AuthGuardProps = {}) => {
    const { isAuthenticated, userRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(redirectTo);
        } else if (role && userRole !== role) {
            // Voliteľne môžeš presmerovať na inú stránku s informáciou o nedostatku práv
            navigate('/unauthorized');
        }
    }, [isAuthenticated, userRole, role, navigate, redirectTo]);

    return isAuthenticated && (!role || userRole === role);
};