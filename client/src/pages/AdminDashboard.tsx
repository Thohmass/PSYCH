import React from 'react';
import {useAuthGuard} from '../hooks/useAuthGuard';
import {UserRole} from 'shared/roles';

const AdminDashboard: React.FC = () => {
    const isAdmin = useAuthGuard({ role: UserRole.Admin, redirectTo: '/login' });

    if (!isAdmin) {
        return <div>Nemáte prístup na túto stránku.</div>;
    }

    return (
        <div>
            <h2>Administrátorský panel</h2>
            <p>Vitajte v administrátorskom paneli!</p>
            {/* Obsah pre administrátorov */}
        </div>
    );
};

export default AdminDashboard;