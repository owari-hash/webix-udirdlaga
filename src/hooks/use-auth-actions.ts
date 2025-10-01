import { useCallback } from 'react';
import { useAuth } from 'src/contexts/auth-context';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export function useAuthActions() {
  const { login, register, logout, updateUser, refreshToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const result = await login(credentials);

        if (result.success) {
          enqueueSnackbar('Login successful!', { variant: 'success' });
          return { success: true };
        }
        enqueueSnackbar(result.error || 'Login failed', { variant: 'error' });
        return { success: false, error: result.error };
      } catch (error) {
        console.error('Login error:', error);
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
        return { success: false, error: 'An unexpected error occurred' };
      }
    },
    [login, enqueueSnackbar]
  );

  const handleRegister = useCallback(
    async (credentials: {
      email: string;
      password: string;
      confirmPassword: string;
      displayName?: string;
    }) => {
      try {
        const result = await register(credentials);

        if (result.success) {
          enqueueSnackbar(
            'Registration successful! Please check your email to verify your account.',
            {
              variant: 'success',
            }
          );
          return { success: true };
        }
        enqueueSnackbar(result.error || 'Registration failed', { variant: 'error' });
        return { success: false, error: result.error };
      } catch (error) {
        console.error('Registration error:', error);
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
        return { success: false, error: 'An unexpected error occurred' };
      }
    },
    [register, enqueueSnackbar]
  );

  const handleLogout = useCallback(() => {
    try {
      logout();
      enqueueSnackbar('Logged out successfully', { variant: 'info' });
    } catch (error) {
      console.error('Logout error:', error);
      enqueueSnackbar('Error during logout', { variant: 'error' });
    }
  }, [logout, enqueueSnackbar]);

  const handleUpdateUser = useCallback(
    async (userData: any) => {
      try {
        updateUser(userData);
        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        return { success: true };
      } catch (error) {
        console.error('Update user error:', error);
        enqueueSnackbar('Failed to update profile', { variant: 'error' });
        return { success: false, error: 'Failed to update profile' };
      }
    },
    [updateUser, enqueueSnackbar]
  );

  const handleRefreshToken = useCallback(async () => {
    try {
      const success = await refreshToken();
      if (!success) {
        enqueueSnackbar('Session expired. Please log in again.', { variant: 'warning' });
      }
      return success;
    } catch (error) {
      console.error('Token refresh error:', error);
      enqueueSnackbar('Failed to refresh session', { variant: 'error' });
      return false;
    }
  }, [refreshToken, enqueueSnackbar]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateUser,
    handleRefreshToken,
  };
}
