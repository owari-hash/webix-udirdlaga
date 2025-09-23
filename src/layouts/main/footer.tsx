import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <footer>
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
          © 2025 Webix. Бүх эрх хуулиар хамгаалагдсан.
        </Typography>
      </Container>
    </footer>
  );
}
