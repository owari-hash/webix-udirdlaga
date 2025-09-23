'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const ANALYTICS_METRICS = [
  {
    title: 'Нийт хэрэглэгч',
    value: '12,345',
    change: '+12.5%',
    changeType: 'increase',
    icon: 'solar:users-group-rounded-bold',
    color: 'primary',
  },
  {
    title: 'Идэвхтэй хэрэглэгч',
    value: '8,765',
    change: '+8.2%',
    changeType: 'increase',
    icon: 'solar:user-check-bold',
    color: 'success',
  },
  {
    title: 'Нийт вэбтоон',
    value: '45,678',
    change: '+23.1%',
    changeType: 'increase',
    icon: 'solar:book-2-bold',
    color: 'info',
  },
  {
    title: 'Сарын үзэлт',
    value: '2.3M',
    change: '+15.7%',
    changeType: 'increase',
    icon: 'solar:eye-bold',
    color: 'warning',
  },
  {
    title: 'Дундаж сешн',
    value: '4.2 мин',
    change: '+2.1%',
    changeType: 'increase',
    icon: 'solar:clock-circle-bold',
    color: 'error',
  },
  {
    title: 'Орлого',
    value: '$45,678',
    change: '+18.9%',
    changeType: 'increase',
    icon: 'solar:dollar-minimalistic-bold',
    color: 'secondary',
  },
];

const TOP_ORGANIZATIONS = [
  {
    id: 1,
    name: 'Монгол Улсын Их Сургууль',
    subdomain: 'mongol-ulsyn-ikh-surguul',
    users: 1250,
    webtoons: 89,
    views: 45678,
    revenue: 12345,
    growth: '+12.5%',
  },
  {
    id: 2,
    name: 'Шинэ Монгол Технологи',
    subdomain: 'shine-mongol-technology',
    users: 890,
    webtoons: 67,
    views: 32156,
    revenue: 9876,
    growth: '+8.2%',
  },
  {
    id: 3,
    name: 'Монголын Банк',
    subdomain: 'mongolyn-bank',
    users: 2340,
    webtoons: 45,
    views: 28934,
    revenue: 15678,
    growth: '+15.7%',
  },
  {
    id: 4,
    name: 'Эрүүл Мэндийн Төв',
    subdomain: 'eruul-mendiin-tov',
    users: 567,
    webtoons: 23,
    views: 12345,
    revenue: 5432,
    growth: '+5.3%',
  },
];

const CHART_DATA = {
  labels: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар'],
  datasets: [
    {
      label: 'Хэрэглэгч',
      data: [1200, 1900, 3000, 5000, 2000, 3000],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
    },
    {
      label: 'Вэбтоон',
      data: [800, 1600, 2000, 3000, 1500, 2500],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46, 125, 50, 0.1)',
    },
  ],
};

// ----------------------------------------------------------------------

export default function DashboardAnalyticsView() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      {/* Analytics Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {ANALYTICS_METRICS.map((metric, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={2}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(
                    theme.palette[metric.color as keyof typeof theme.palette].main,
                    0.08
                  ),
                  color: theme.palette[metric.color as keyof typeof theme.palette].main,
                  mb: 2,
                }}
              >
                <Iconify icon={metric.icon} width={32} />
              </Box>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {metric.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: metric.changeType === 'increase' ? 'success.main' : 'error.main',
                  fontWeight: 'fontWeightSemiBold',
                }}
              >
                {metric.change}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Chart Placeholder */}
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Хэрэглэгч болон вэбтооны өсөлт
            </Typography>
            <Box
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.grey[500], 0.04),
                borderRadius: 1,
                border: '2px dashed',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Iconify
                  icon="solar:chart-2-bold"
                  width={64}
                  sx={{ color: 'text.secondary', mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  График энд харагдана
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Chart.js эсвэл Recharts ашиглан график нэмэх боломжтой
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid xs={12} md={4}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Хурдан статистик
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Өнөөдрийн хэрэглэгч
                </Typography>
                <Typography variant="h6">1,234</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Өнөөдрийн вэбтоон
                </Typography>
                <Typography variant="h6">56</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Өнөөдрийн үзэлт
                </Typography>
                <Typography variant="h6">12,345</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Дундаж сешн
                </Typography>
                <Typography variant="h6">4.2 мин</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Өнөөдрийн орлого
                </Typography>
                <Typography variant="h6">$1,234</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Top Organizations */}
      <Card sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Топ байгууллагууд
        </Typography>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                gap: 2,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Байгууллага
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Хэрэглэгч
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Вэбтоон
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үзэлт
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Орлого
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Өсөлт
              </Typography>
            </Box>
            {TOP_ORGANIZATIONS.map((org) => (
              <Box
                key={org.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                  gap: 2,
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {org.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {org.subdomain}.webix.mn
                  </Typography>
                </Box>
                <Typography variant="body2" textAlign="center">
                  {org.users.toLocaleString()}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {org.webtoons}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {org.views.toLocaleString()}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  ${org.revenue.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="center"
                  color="success.main"
                  fontWeight="bold"
                >
                  {org.growth}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
