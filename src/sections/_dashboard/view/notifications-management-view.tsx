'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const NOTIFICATION_TYPES = [
  {
    id: 'email',
    title: 'Имэйл мэдэгдэл',
    description: 'Шинэ хэрэглэгч, төлбөр, системийн мэдэгдэл',
    enabled: true,
    icon: 'solar:letter-unread-bold',
    color: 'primary',
  },
  {
    id: 'push',
    title: 'Push мэдэгдэл',
    description: 'Вэб браузер дээр шууд мэдэгдэл',
    enabled: true,
    icon: 'solar:bell-bold',
    color: 'success',
  },
  {
    id: 'sms',
    title: 'SMS мэдэгдэл',
    description: 'Утасны дугаар руу илгээх мэдэгдэл',
    enabled: false,
    icon: 'solar:phone-bold',
    color: 'info',
  },
  {
    id: 'system',
    title: 'Системийн мэдэгдэл',
    description: 'Системийн алдаа, шинэчлэл, удирдлага',
    enabled: true,
    icon: 'solar:shield-bold',
    color: 'warning',
  },
];

const RECENT_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Шинэ байгууллага бүртгэгдлээ',
    message: 'Монгол Улсын Их Сургууль байгууллага амжилттай бүртгэгдлээ',
    type: 'organization',
    time: '2 цагийн өмнө',
    read: false,
    icon: 'solar:buildings-2-bold',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Төлбөр төлөгдлөө',
    message: 'INV-2024-001 нэхэмжлэлийн төлбөр амжилттай төлөгдлөө',
    type: 'payment',
    time: '4 цагийн өмнө',
    read: true,
    icon: 'solar:card-bold',
    color: 'success',
  },
  {
    id: 3,
    title: 'Системийн шинэчлэл',
    message: 'Вэбтоон платформын шинэчлэл амжилттай хийгдлээ',
    type: 'system',
    time: '6 цагийн өмнө',
    read: true,
    icon: 'solar:shield-check-bold',
    color: 'info',
  },
  {
    id: 4,
    title: 'Хэрэглэгчийн хүсэлт',
    message: 'Техникийн дэмжлэгийн шинэ хүсэлт ирлээ',
    type: 'support',
    time: '1 өдрийн өмнө',
    read: false,
    icon: 'solar:headphones-bold',
    color: 'warning',
  },
];

const NOTIFICATION_TEMPLATES = [
  {
    id: 1,
    name: 'Байгууллага бүртгэх',
    subject: 'Шинэ байгууллага бүртгэгдлээ',
    type: 'email',
    status: 'active',
  },
  {
    id: 2,
    name: 'Төлбөр төлөх',
    subject: 'Төлбөр төлөгдлөө',
    type: 'email',
    status: 'active',
  },
  {
    id: 3,
    name: 'Системийн алдаа',
    subject: 'Системийн алдаа илрэлээ',
    type: 'system',
    status: 'active',
  },
  {
    id: 4,
    name: 'Хэрэглэгч бүртгэх',
    subject: 'Шинэ хэрэглэгч бүртгэгдлээ',
    type: 'email',
    status: 'inactive',
  },
];

// ----------------------------------------------------------------------

export default function NotificationsManagementView() {
  const theme = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organization':
        return 'primary';
      case 'payment':
        return 'success';
      case 'system':
        return 'info';
      case 'support':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'organization':
        return 'Байгууллага';
      case 'payment':
        return 'Төлбөр';
      case 'system':
        return 'Систем';
      case 'support':
        return 'Дэмжлэг';
      default:
        return type;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Мэдэгдэл удирдлага
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Системийн мэдэгдэл, имэйл загвар, тохиргоог удирдах
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid xs={12} lg={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Мэдэгдэлийн тохиргоо
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {NOTIFICATION_TYPES.map((notification) => (
                <Box
                  key={notification.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: alpha(
                        (theme.palette as any)[notification.color]?.main ||
                          theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[notification.color]?.main ||
                        theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={notification.icon} width={24} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.description}
                    </Typography>
                  </Box>
                  <FormControlLabel control={<Switch checked={notification.enabled} />} label="" />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Recent Notifications */}
        <Grid xs={12} lg={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Сүүлийн мэдэгдэл
              </Typography>
              <Button variant="outlined" size="small">
                Бүгдийг харах
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {RECENT_NOTIFICATIONS.map((notification) => (
                <Box
                  key={notification.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: notification.read
                      ? alpha(theme.palette.grey[500], 0.04)
                      : alpha(theme.palette.primary.main, 0.08),
                    border: '1px solid',
                    borderColor: notification.read ? 'divider' : 'primary.main',
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
                        (theme.palette as any)[notification.color]?.main ||
                          theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[notification.color]?.main ||
                        theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={notification.icon} width={20} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'block' }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={getTypeText(notification.type)}
                    size="small"
                    color={getTypeColor(notification.type) as any}
                    variant="soft"
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Email Templates */}
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Имэйл загварууд
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="solar:add-bold" width={16} />}>
                Шинэ загвар
              </Button>
            </Box>
            <Grid container spacing={2}>
              {NOTIFICATION_TEMPLATES.map((template) => (
                <Grid key={template.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: theme.shadows[4],
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        <Iconify icon="solar:letter-bold" width={16} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {template.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {template.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {template.subject}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label={template.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                        size="small"
                        color={template.status === 'active' ? 'success' : 'default'}
                        variant="soft"
                      />
                      <Button size="small" variant="outlined">
                        Засах
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
