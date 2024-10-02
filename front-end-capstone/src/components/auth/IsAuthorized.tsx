import { ReactNode } from 'react';
import { useAuth } from '../auth/authContext';

interface IsAuthorizedProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function IsAuthorized({ children, fallback = null }: IsAuthorizedProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}