'use client';

import { ReactNode } from 'react';
import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

type RoleGuardProps = {
  children: ReactNode;
  roles: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // If true, user must have ALL roles; if false, user needs ANY role
};

export function RoleGuard({
  children,
  roles,
  fallback = null,
  requireAll = false,
}: RoleGuardProps) {
  const { user, hasAnyRole } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const hasAccess = requireAll
    ? roles.every((role) => user.role === role) // This doesn't make sense for single role, but keeping for future multi-role support
    : hasAnyRole(roles);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

// ----------------------------------------------------------------------

type AdminGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function SuperAdminGuard({ children, fallback = null }: AdminGuardProps) {
  return (
    <RoleGuard roles={['super_admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

// ----------------------------------------------------------------------

type OrgAdminGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function OrgAdminGuard({ children, fallback = null }: OrgAdminGuardProps) {
  return (
    <RoleGuard roles={['super_admin', 'org_admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

// ----------------------------------------------------------------------

type ModeratorGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ModeratorGuard({ children, fallback = null }: ModeratorGuardProps) {
  return (
    <RoleGuard roles={['super_admin', 'org_admin', 'org_moderator']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

// ----------------------------------------------------------------------

type UserGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function UserGuard({ children, fallback = null }: UserGuardProps) {
  return (
    <RoleGuard
      roles={['super_admin', 'org_admin', 'org_moderator', 'org_user']}
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
}

// ----------------------------------------------------------------------

type ViewerGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ViewerGuard({ children, fallback = null }: ViewerGuardProps) {
  return (
    <RoleGuard
      roles={['super_admin', 'org_admin', 'org_moderator', 'org_user', 'viewer']}
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
}
