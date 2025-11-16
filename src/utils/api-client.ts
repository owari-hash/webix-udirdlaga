import { AuthTokens } from 'src/types/auth';
import { API_CONFIG } from 'src/config/api';

// ----------------------------------------------------------------------

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  requireAuth?: boolean;
};

type ApiResponse<T = any> = {
  data: T;
  success: boolean;
  message?: string;
  status: number;
};

type BackendResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// ----------------------------------------------------------------------

class ApiClient {
  private tokens: AuthTokens | null = null;

  // Get base URL dynamically based on current tenant
  private getBaseURL(): string {
    return API_CONFIG.BASE_URL;
  }

  constructor() {
    // No longer need to pass baseURL in constructor
    // It's now determined dynamically based on tenant
  }

  setTokens(tokens: AuthTokens | null) {
    this.tokens = tokens;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, requireAuth = true } = options;

    // Get base URL dynamically based on current tenant
    const baseURL = this.getBaseURL();
    const url = `${baseURL}${endpoint}`;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authorization header if tokens are available and auth is required
    if (requireAuth && this.tokens?.accessToken) {
      requestHeaders.Authorization = `Bearer ${this.tokens.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const backendResponse: BackendResponse<T> = await response.json();

      return {
        data: backendResponse.data || (backendResponse as any),
        success: response.ok && backendResponse.success,
        message: backendResponse.message,
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        data: null as T,
        success: false,
        message: 'Сүлжээний алдаа',
        status: 0,
      };
    }
  }

  // GET request
  async get<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) {
    return this.makeRequest<T>(endpoint, { ...options, method: 'POST', body });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PUT', body });
  }

  // DELETE request
  async delete<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PATCH', body });
  }
}

// Create a singleton instance
// Base URL is now determined dynamically based on tenant
export const apiClient = new ApiClient();

// ----------------------------------------------------------------------

// Auth-specific API methods
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials, { requireAuth: false }),

  register: (credentials: { email: string; password: string; displayName: string }) =>
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, credentials, { requireAuth: false }),

  refreshToken: (refreshToken: string) =>
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refreshToken }, { requireAuth: false }),

  logout: () => apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),

  logoutAll: () => apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT_ALL),

  getProfile: () => apiClient.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE),

  updateProfile: (userData: any) => apiClient.put(API_CONFIG.ENDPOINTS.AUTH.PROFILE, userData),

  changePassword: (passwordData: { currentPassword: string; newPassword: string }) =>
    apiClient.post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData),

  verifyToken: () => apiClient.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY),
};

// ----------------------------------------------------------------------

// User-specific API methods
export const userApi = {
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get('/users', { headers: { 'Cache-Control': 'no-cache' } }),

  getUser: (id: string) => apiClient.get(`/users/${id}`),

  createUser: (userData: any) => apiClient.post('/users', userData),

  updateUser: (id: string, userData: any) => apiClient.put(`/users/${id}`, userData),

  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};

// ----------------------------------------------------------------------

// Generic API methods for other resources
export const createApiMethods = (resource: string) => ({
  list: (params?: Record<string, any>) =>
    apiClient.get(`/${resource}`, { headers: { 'Cache-Control': 'no-cache' } }),

  get: (id: string) => apiClient.get(`/${resource}/${id}`),

  create: (data: any) => apiClient.post(`/${resource}`, data),

  update: (id: string, data: any) => apiClient.put(`/${resource}/${id}`, data),

  delete: (id: string) => apiClient.delete(`/${resource}/${id}`),
});
