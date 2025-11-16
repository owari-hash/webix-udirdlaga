import { getTenantApiUrl } from './tenants';

// API Configuration - Clean slate
// Uses tenant-based configuration for multi-database support
export const API_CONFIG = {
  get BASE_URL() {
    return process.env.NEXT_PUBLIC_API_URL || getTenantApiUrl();
  },
  get EXTERNAL_API_URL() {
    return process.env.EXTERNAL_API_URL || getTenantApiUrl();
  },
  ENDPOINTS: {
    HEALTH: '/api/health',
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
      VERIFY: '/api/organizations',
      GET_BY_SUBDOMAIN: '/api/organizations/subdomain',
      CHECK_SUBDOMAIN: '/api/organizations/check-subdomain',
    },
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};
