import jwt from 'jsonwebtoken';
import { User, AuthTokens } from 'src/types/auth';

// ----------------------------------------------------------------------

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ----------------------------------------------------------------------

export function generateTokens(user: User): AuthTokens {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign({ userId: user._id, type: 'refresh' }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: Date.now() + 15 * 60 * 1000, // 15 minutes
  };
}

// ----------------------------------------------------------------------

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// ----------------------------------------------------------------------

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}

// ----------------------------------------------------------------------

export function getTokenExpirationTime(token: string): number | null {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return null;

    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    return null;
  }
}

// ----------------------------------------------------------------------

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
}

// ----------------------------------------------------------------------

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ----------------------------------------------------------------------

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ----------------------------------------------------------------------

export function sanitizeUserInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// ----------------------------------------------------------------------

export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

// ----------------------------------------------------------------------

export function createAuthHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

// ----------------------------------------------------------------------

export function getStoredAuthData(): { user: User; tokens: AuthTokens } | null {
  try {
    const storedAuth = localStorage.getItem('auth');
    if (!storedAuth) return null;

    const authData = JSON.parse(storedAuth);

    // Check if tokens are still valid
    if (authData.tokens && authData.tokens.expiresIn > Date.now()) {
      return authData;
    }

    return null;
  } catch (error) {
    console.error('Error parsing stored auth data:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

export function clearStoredAuthData(): void {
  localStorage.removeItem('auth');
}

// ----------------------------------------------------------------------

export function storeAuthData(user: User, tokens: AuthTokens): void {
  const authData = { user, tokens };
  localStorage.setItem('auth', JSON.stringify(authData));
}
