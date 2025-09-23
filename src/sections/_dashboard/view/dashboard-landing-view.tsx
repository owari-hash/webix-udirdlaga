'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const STATS_CARDS = [
  {
    title: 'Нийт байгууллага',
    value: '24',
    change: '+12%',
    changeType: 'increase',
    icon: 'solar:buildings-2-bold',
    color: 'primary',
    description: 'Бүртгэгдсэн байгууллагууд',
  },
  {
    title: 'Идэвхтэй хэрэглэгчид',
    value: '1,234',
    change: '+8%',
    changeType: 'increase',
    icon: 'solar:users-group-rounded-bold',
    color: 'success',
    description: 'Энэ сард нэвтэрсэн',
  },
  {
    title: 'Нийт вэбтоон',
    value: '5,678',
    change: '+23%',
    changeType: 'increase',
    icon: 'solar:book-2-bold',
    color: 'info',
    description: 'Оруулсан бүтээлүүд',
  },
  {
    title: 'Сарын орлого',
    value: '$12,345',
    change: '+15%',
    changeType: 'increase',
    icon: 'solar:dollar-minimalistic-bold',
    color: 'warning',
    description: 'Энэ сарын нийт орлого',
  },
  {
    title: 'Нэхэмжлэл',
    value: '156',
    change: '+5%',
    changeType: 'increase',
    icon: 'solar:receipt-bold',
    color: 'secondary',
    description: 'Энэ сард үүсгэсэн',
  },
  {
    title: 'Системийн ачаалал',
    value: '78%',
    change: '-3%',
    changeType: 'decrease',
    icon: 'solar:server-bold',
    color: 'error',
    description: 'Одоогийн ачаалал',
  },
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'organization_created',
    message: 'Шинэ байгууллага "Монгол Улсын Их Сургууль" бүртгэгдлээ',
    time: '2 цагийн өмнө',
    icon: 'solar:buildings-2-bold',
    color: 'primary',
  },
  {
    id: 2,
    type: 'user_registered',
    message: '15 шинэ хэрэглэгч бүртгэгдлээ',
    time: '4 цагийн өмнө',
    icon: 'solar:user-plus-bold',
    color: 'success',
  },
  {
    id: 3,
    type: 'webtoon_uploaded',
    message: '32 шинэ вэбтоон орууллаа',
    time: '6 цагийн өмнө',
    icon: 'solar:book-2-bold',
    color: 'info',
  },
  {
    id: 4,
    type: 'system_alert',
    message: 'Системийн шинэчлэл амжилттай хийгдлээ',
    time: '1 өдрийн өмнө',
    icon: 'solar:shield-check-bold',
    color: 'warning',
  },
];

const QUICK_ACTIONS = [
  {
    title: 'Байгууллага удирдах',
    description: 'Бүх байгууллагыг харах, нэмэх, засах',
    icon: 'solar:buildings-2-bold',
    color: 'primary',
    href: paths.organization.root,
  },
  {
    title: 'Хэрэглэгч удирдах',
    description: 'Бүх хэрэглэгчдийг харах, удирдах',
    icon: 'solar:users-group-rounded-bold',
    color: 'success',
    href: paths.dashboard.users,
  },
  {
    title: 'Төлбөр & Нэхэмжлэл',
    description: 'Төлбөр, нэхэмжлэлийн удирдлага',
    icon: 'solar:card-bold',
    color: 'info',
    href: paths.payment.root,
  },
  {
    title: 'Тайлан үзэх',
    description: 'Системийн тайлан, шинжилгээ харах',
    icon: 'solar:chart-2-bold',
    color: 'warning',
    href: paths.dashboard.reports,
  },
  {
    title: 'Тохиргоо',
    description: 'Системийн тохиргоо, параметрүүд',
    icon: 'solar:settings-bold',
    color: 'secondary',
    href: paths.dashboard.settings,
  },
  {
    title: 'Дэмжлэг',
    description: 'Техникийн дэмжлэг, тусламж',
    icon: 'solar:headphones-round-sound-bold',
    color: 'error',
    href: paths.dashboard.support,
  },
];

const TOP_ORGANIZATIONS = [
  { name: 'Монгол Улсын Их Сургууль', users: 245, webtoons: 89, status: 'active' },
  { name: 'Шинжлэх Ухааны Академи', users: 189, webtoons: 67, status: 'active' },
  { name: 'Технологийн Их Сургууль', users: 156, webtoons: 45, status: 'active' },
  { name: 'Эрүүл Мэндийн Их Сургууль', users: 134, webtoons: 38, status: 'pending' },
  { name: 'Хууль Зүйн Их Сургууль', users: 98, webtoons: 23, status: 'active' },
];

const SYSTEM_STATUS = [
  { name: 'Сервер', status: 'online', uptime: '99.9%' },
  { name: 'База өгөгдөл', status: 'online', uptime: '99.8%' },
  { name: 'CDN', status: 'online', uptime: '99.7%' },
  { name: 'Email сервис', status: 'online', uptime: '99.5%' },
];

// ----------------------------------------------------------------------

export default function DashboardLandingView() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Хяналтын самбар
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Webix вэбтоон платформын удирдлага, шинжилгээ, тайлан
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {STATS_CARDS.map((stat, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={2}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: alpha(
                    (theme.palette as any)[stat.color]?.main || theme.palette.primary.main,
                    0.04
                  ),
                  transform: 'translate(30px, -30px)',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(
                        (theme.palette as any)[stat.color]?.main || theme.palette.primary.main,
                        0.12
                      ),
                      color: (theme.palette as any)[stat.color]?.main || theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={stat.icon} width={24} />
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    color={stat.changeType === 'increase' ? 'success' : 'error'}
                    variant="soft"
                  />
                </Box>
                <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid xs={12} lg={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Сүүлийн үйл ажиллагаа
              </Typography>
              <Button variant="outlined" size="small">
                Бүгдийг харах
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {RECENT_ACTIVITIES.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.grey[500], 0.08),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: alpha(
                        (theme.palette as any)[activity.color]?.main || theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[activity.color]?.main || theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={activity.icon} width={20} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                      {activity.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12} lg={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Хурдан үйлдлүүд
            </Typography>
            <Grid container spacing={2}>
              {QUICK_ACTIONS.map((action, index) => (
                <Grid key={index} xs={12} sm={6} lg={12}>
                  <Card
                    component={RouterLink}
                    href={action.href}
                    sx={{
                      p: 2,
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      '&:hover': {
                        borderColor:
                          (theme.palette as any)[action.color]?.main || theme.palette.primary.main,
                        bgcolor: alpha(
                          (theme.palette as any)[action.color]?.main || theme.palette.primary.main,
                          0.04
                        ),
                        transform: 'translateY(-1px)',
                        boxShadow: theme.shadows[4],
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(
                            (theme.palette as any)[action.color]?.main ||
                              theme.palette.primary.main,
                            0.12
                          ),
                          color:
                            (theme.palette as any)[action.color]?.main ||
                            theme.palette.primary.main,
                        }}
                      >
                        <Iconify icon={action.icon} width={20} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Information */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Top Organizations */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Топ байгууллагууд
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TOP_ORGANIZATIONS.map((org, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {org.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {org.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {org.users} хэрэглэгч • {org.webtoons} вэбтоон
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={org.status === 'active' ? 'Идэвхтэй' : 'Хүлээгдэж буй'}
                    size="small"
                    color={org.status === 'active' ? 'success' : 'warning'}
                    variant="soft"
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Системийн төлөв
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SYSTEM_STATUS.map((service, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: service.status === 'online' ? 'success.main' : 'error.main',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {service.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {service.uptime}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
