'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/contexts/auth-context';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type WithAuthOptions = {
  roles?: string[];
  requireAuth?: boolean;
  redirectTo?: string;
};

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { roles = [], requireAuth = true, redirectTo = '/auth/login-cover' } = options;

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, user, hasAnyRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      // If authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // If user is authenticated but doesn't have required role
      if (isAuthenticated && roles.length > 0 && !hasAnyRole(roles)) {
        router.push('/unauthorized');
      }
    }, [isAuthenticated, isLoading, user, router, hasAnyRole]);

    // Show loading screen while checking authentication
    if (isLoading) {
      return <LoadingScreen />;
    }

    // If authentication is required but user is not authenticated, don't render
    if (requireAuth && !isAuthenticated) {
      return null;
    }

    // If user doesn't have required role, don't render
    if (isAuthenticated && roles.length > 0 && !hasAnyRole(roles)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
