import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
          403
        </Typography>

        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You don&apos;t have permission to access this page.
        </Typography>

        <Button variant="contained" size="large" onClick={() => router.back()}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
}
