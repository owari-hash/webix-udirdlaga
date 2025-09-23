import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function PricingDashboard({ plans }: any) {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" textAlign="center" sx={{ mb: 5 }}>
        Dashboard Pricing
      </Typography>
      <Typography textAlign="center" color="text.secondary">
        Pricing plans for dashboard features
      </Typography>
    </Container>
  );
}
