// ----------------------------------------------------------------------

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'org_admin' | 'org_moderator' | 'org_user' | 'viewer';
  lastLogin: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
};

export type AuthContextType = {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
};
