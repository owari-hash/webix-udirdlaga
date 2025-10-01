import { Box, CircularProgress, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body2" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
}

// Export as SplashScreen for backward compatibility
export const SplashScreen = LoadingScreen;
