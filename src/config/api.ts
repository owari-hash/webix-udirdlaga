// API Configuration - Clean slate
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL || 'http://localhost:3000',
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
