import { ReactNode } from 'react';
import { useAuth } from '../auth/authContext';

interface IsNotAuthorizedProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function IsNotAuthorized({ children, fallback = null }: IsNotAuthorizedProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}