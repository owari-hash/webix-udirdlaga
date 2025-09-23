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

// ----------------------------------------------------------------------

type User = {
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check for existing authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo purposes, accept any email/password
      const userData: User = {
        email,
        displayName: email.split('@')[0],
        role: 'admin',
        photoURL: undefined,
      };

      const authData = {
        user: userData,
        isAuthenticated: true,
      };

      localStorage.setItem('auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(userData);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login-cover');
  }, [router]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout]
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
