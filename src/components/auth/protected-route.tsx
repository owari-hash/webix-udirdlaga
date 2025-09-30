'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/contexts/auth-context';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: string[];
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  roles = [],
  redirectTo = '/auth/login-cover',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasAnyRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If user doesn't have required role, redirect to unauthorized
    if (roles.length > 0 && !hasAnyRole(roles)) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, isLoading, user, roles, redirectTo, router, hasAnyRole]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated or doesn't have required role, don't render
  if (!isAuthenticated || (roles.length > 0 && !hasAnyRole(roles))) {
    return null;
  }

  return <>{children}</>;
}
