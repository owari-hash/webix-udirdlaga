import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function BlogDashboardLatestPosts({ posts }: any) {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" textAlign="center" sx={{ mb: 5 }}>
        Latest Dashboard Updates
      </Typography>
      <Typography textAlign="center" color="text.secondary">
        Recent updates and announcements
      </Typography>
    </Container>
  );
}
