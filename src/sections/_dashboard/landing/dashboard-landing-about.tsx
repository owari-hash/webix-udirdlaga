import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const ROWS = [
  {
    label: 'төсөл',
    total: 20,
    content: 'Амжилттай хэрэгжүүлсэн төслүүд. Үйлчлүүлэгчдийн хэрэгцээг хангасан шийдлүүд.',
  },
  {
    label: 'сэтгэл хангалуун үйлчлүүлэгч',
    total: 32000,
    content: 'Манай үйлчилгээнд сэтгэл хангалуун үйлчлүүлэгчид. Найдвартай түншлэл.',
  },
  {
    label: 'жилийн туршлага',
    total: 20,
    content: 'Олон жилийн туршлага бүхий мэргэжилтнүүд. Чанартай үйлчилгээ.',
  },
];

// ----------------------------------------------------------------------

export default function DashboardLandingAbout() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Image
        alt="landing about"
        src="/assets/images/marketing/marketing_post_hero.jpg"
        ratio="16/9"
        sx={{
          borderRadius: 1.5,
          mb: { xs: 5, md: 10 },
        }}
      />

      <Grid
        container
        columnSpacing={{ xs: 0, md: 3 }}
        rowSpacing={{ xs: 5, md: 0 }}
        justifyContent="space-between"
      >
        <Grid
          xs={12}
          md={5}
          sx={{
            textAlign: { xs: 'center', md: 'right' },
          }}
        >
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Бидний тухай
          </Typography>

          <Typography variant="h2" sx={{ my: 3 }}>
            Бид хэн бэ
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Бид дижитал шийдлүүд бүтээх чадварлаг баг юм. Үйлчлүүлэгчдийнхээ амжилтанд хувь нэмэр
            оруулахыг зорьдог. Инновацийн технологи ашиглан бизнесийн өсөлтөд дэмжлэг үзүүлдэг.
            Манай зорилго бол найдвартай түншлэл бий болгох явдал юм.
          </Typography>

          <Button
            size="large"
            color="inherit"
            endIcon={<Iconify icon="carbon:chevron-right" />}
            sx={{ my: 5 }}
          >
            Дэлгэрэнгүй
          </Button>
        </Grid>

        <Grid xs={12} md={6}>
          <Stack spacing={5}>
            {ROWS.map((row) => (
              <Stack
                key={row.label}
                direction="row"
                alignItems="center"
                divider={
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ ml: 3, mr: 5, borderStyle: 'dashed' }}
                  />
                }
              >
                <Stack spacing={1} sx={{ width: 1, maxWidth: 100 }}>
                  <Stack direction="row">
                    <Typography variant="h2">{fShortenNumber(row.total)}</Typography>
                    <Box component="span" sx={{ color: 'primary.main', typography: 'h4' }}>
                      +
                    </Box>
                  </Stack>

                  <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                    {row.label}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.content}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
