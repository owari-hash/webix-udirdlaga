// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout',
      LOGOUT_ALL: '/api/auth/logout-all',
      PROFILE: '/api/auth/profile',
      VERIFY: '/api/auth/verify',
      CHANGE_PASSWORD: '/api/auth/change-password',
    },
    ORGANIZATIONS: {
      LIST: '/api/organizations',
      CREATE: '/api/organizations',
      GET: '/api/organizations',
      UPDATE: '/api/organizations',
      DELETE: '/api/organizations',
    },
    WEBTOONS: {
      LIST: '/api/webtoons',
      CREATE: '/api/webtoons',
      GET: '/api/webtoons',
      UPDATE: '/api/webtoons',
      DELETE: '/api/webtoons',
    },
    ANALYTICS: {
      DASHBOARD: '/api/analytics/dashboard',
      REPORTS: '/api/analytics/reports',
    },
    PAYMENTS: {
      LIST: '/api/payments',
      CREATE: '/api/payments',
      GET: '/api/payments',
    },
    NOTIFICATIONS: {
      LIST: '/api/notifications',
      MARK_READ: '/api/notifications/mark-read',
    },
    MESSAGES: {
      LIST: '/api/messages',
      SEND: '/api/messages',
    },
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Role hierarchy for permission checking
export const ROLE_HIERARCHY = {
  super_admin: 5,
  org_admin: 4,
  org_moderator: 3,
  org_user: 2,
  viewer: 1,
} as const;

export type Role = keyof typeof ROLE_HIERARCHY;

// Helper function to check if user has required role level
export function hasRoleLevel(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

// Helper function to get all roles at or above a certain level
export function getRolesAtOrAbove(role: Role): Role[] {
  return Object.keys(ROLE_HIERARCHY).filter(
    (r) => ROLE_HIERARCHY[r as Role] >= ROLE_HIERARCHY[role]
  ) as Role[];
}
