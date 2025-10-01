'use client';

import { useRouter } from 'next/navigation';
import {
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { apiClient } from 'src/utils/api-client';
import { API_CONFIG } from 'src/config/api';
import {
  User,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  AuthContextType,
} from 'src/types/auth';

// ----------------------------------------------------------------------

// Re-export the type from the types file
export type { AuthContextType } from 'src/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const router = useRouter();

  // Check for existing authentication on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          const { user: storedUser, tokens: storedTokens } = authData;

          // Check if tokens are still valid
          if (storedTokens && storedTokens.expiresIn > Date.now()) {
            setUser(storedUser);
            setTokens(storedTokens);
            setIsAuthenticated(true);
            // Initialize API client with stored tokens
            apiClient.setTokens(storedTokens);
          } else if (storedTokens?.refreshToken) {
            // Try to refresh the token
            await refreshToken();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid auth data
        localStorage.removeItem('auth');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
      try {
        setIsLoading(true);

        const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials, {
          requireAuth: false,
        });

        if (!response.success) {
          return { success: false, error: response.message || 'Login failed' };
        }

        const {
          user: userData,
          accessToken,
          refreshToken,
        } = response.data as {
          user: User;
          accessToken: string;
          refreshToken: string;
        };

        // Create tokens object with expiration time
        const authTokens = {
          accessToken,
          refreshToken,
          expiresIn: Date.now() + 15 * 60 * 1000, // 15 minutes
        };

        // Store auth data
        const authData = {
          user: userData,
          tokens: authTokens,
        };

        localStorage.setItem('auth', JSON.stringify(authData));
        setUser(userData);
        setTokens(authTokens);
        setIsAuthenticated(true);

        apiClient.setTokens(authTokens);

        return { success: true };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error. Please try again.' };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
      try {
        setIsLoading(true);

        // Validate passwords match
        if (credentials.password !== credentials.confirmPassword) {
          return { success: false, error: 'Passwords do not match' };
        }

        const response = await apiClient.post(
          API_CONFIG.ENDPOINTS.AUTH.REGISTER,
          {
            email: credentials.email,
            password: credentials.password,
            displayName: credentials.displayName,
          },
          { requireAuth: false }
        );

        if (!response.success) {
          return { success: false, error: response.message || 'Registration failed' };
        }

        return { success: true };
      } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Network error. Please try again.' };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const storedAuth = localStorage.getItem('auth');
      if (!storedAuth) return false;

      const authData = JSON.parse(storedAuth);
      const { tokens: storedTokens } = authData;

      if (!storedTokens?.refreshToken) return false;

      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        { refreshToken: storedTokens.refreshToken },
        { requireAuth: false }
      );

      if (!response.success) return false;

      const { accessToken, refreshToken: newRefreshToken } = response.data as {
        accessToken: string;
        refreshToken: string;
      };

      // Create new tokens object with expiration time
      const authTokens = {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: Date.now() + 15 * 60 * 1000, // 15 minutes
      };

      // Update stored auth data
      const newAuthData = {
        user: authData.user, // Keep existing user data
        tokens: authTokens,
      };

      localStorage.setItem('auth', JSON.stringify(newAuthData));
      setTokens(authTokens);
      setIsAuthenticated(true);

      // Update API client with new tokens
      apiClient.setTokens(authTokens);

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, []);

  // Auto-refresh token before expiration
  useEffect(() => {
    if (!tokens) return undefined;

    const timeUntilExpiry = tokens.expiresIn - Date.now() - 60000; // Refresh 1 minute before expiry

    if (timeUntilExpiry > 0) {
      const timeoutId = setTimeout(() => {
        refreshToken();
      }, timeUntilExpiry);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [tokens, refreshToken]);

  const logout = useCallback(() => {
    // Call logout API to invalidate tokens on server
    if (tokens?.accessToken) {
      apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT).catch(console.error);
    }

    // Clear local state
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
    setTokens(null);

    // Clear API client tokens
    apiClient.setTokens(null);

    router.push('/auth/login-cover');
  }, [tokens, router]);

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);

        // Update stored auth data
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          authData.user = updatedUser;
          localStorage.setItem('auth', JSON.stringify(authData));
        }
      }
    },
    [user]
  );

  const hasRole = useCallback((role: string): boolean => user?.role === role, [user]);

  const hasAnyRole = useCallback(
    (roles: string[]): boolean => (user ? roles.includes(user.role) : false),
    [user]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      tokens,
      login,
      register,
      logout,
      refreshToken,
      updateUser,
      hasRole,
      hasAnyRole,
    }),
    [
      isAuthenticated,
      isLoading,
      user,
      tokens,
      login,
      register,
      logout,
      refreshToken,
      updateUser,
      hasRole,
      hasAnyRole,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ----------------------------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
