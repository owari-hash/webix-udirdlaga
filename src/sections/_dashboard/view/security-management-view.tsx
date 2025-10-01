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
import LinearProgress from '@mui/material/LinearProgress';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SECURITY_FEATURES = [
  {
    id: '2fa',
    title: 'Хоёр хүчин зүйлийн баталгаажуулалт',
    description: 'SMS, Email, Authenticator app',
    enabled: true,
    icon: 'solar:shield-check-bold',
    color: 'success',
  },
  {
    id: 'ssl',
    title: 'SSL/TLS шифрлэлт',
    description: 'HTTPS холболт, SSL сертификат',
    enabled: true,
    icon: 'solar:lock-bold',
    color: 'primary',
  },
  {
    id: 'firewall',
    title: 'Firewall хамгаалалт',
    description: 'Сүлжээний хамгаалалт, DDoS хамгаалалт',
    enabled: true,
    icon: 'solar:shield-bold',
    color: 'info',
  },
  {
    id: 'backup',
    title: 'Автомат нөөцлөл',
    description: 'Өдөр бүр автомат нөөцлөл',
    enabled: true,
    icon: 'solar:database-bold',
    color: 'warning',
  },
];

const SECURITY_EVENTS = [
  {
    id: 1,
    type: 'login_attempt',
    title: 'Нэвтрэх оролдлого',
    description: 'Хэрэглэгч admin@webix.mn нэвтрэх оролдлого хийсэн',
    ip: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0',
    time: '2 цагийн өмнө',
    status: 'success',
    severity: 'low',
  },
  {
    id: 2,
    type: 'failed_login',
    title: 'Амжилтгүй нэвтрэх',
    description: 'Буруу нууц үгээр нэвтрэх оролдлого',
    ip: '203.45.67.89',
    userAgent: 'Firefox 119.0.0.0',
    time: '4 цагийн өмнө',
    status: 'failed',
    severity: 'medium',
  },
  {
    id: 3,
    type: 'suspicious_activity',
    title: 'Сэжигтэй үйл ажиллагаа',
    description: 'Олон удаа нэвтрэх оролдлого илрэлээ',
    ip: '45.78.123.45',
    userAgent: 'Safari 17.0.0.0',
    time: '6 цагийн өмнө',
    status: 'blocked',
    severity: 'high',
  },
  {
    id: 4,
    type: 'password_change',
    title: 'Нууц үг солигдсон',
    description: 'Хэрэглэгч нууц үгээ амжилттай солив',
    ip: '192.168.1.50',
    userAgent: 'Chrome 120.0.0.0',
    time: '1 өдрийн өмнө',
    status: 'success',
    severity: 'low',
  },
];

const SECURITY_METRICS = [
  {
    title: 'Хамгаалалтын түвшин',
    value: 95,
    color: 'success',
    icon: 'solar:shield-check-bold',
  },
  {
    title: 'Актив хэрэглэгчид',
    value: 1247,
    color: 'primary',
    icon: 'solar:users-group-rounded-bold',
  },
  {
    title: 'Хамгаалагдсан файлууд',
    value: 15678,
    color: 'info',
    icon: 'solar:file-lock-bold',
  },
  {
    title: 'Сүүлийн нөөцлөл',
    value: 2,
    color: 'warning',
    icon: 'solar:clock-circle-bold',
  },
];

// ----------------------------------------------------------------------

export default function SecurityManagementView() {
  const theme = useTheme();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'Бага';
      case 'medium':
        return 'Дундаж';
      case 'high':
        return 'Өндөр';
      default:
        return severity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'blocked':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Амжилттай';
      case 'failed':
        return 'Амжилтгүй';
      case 'blocked':
        return 'Хаагдсан';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Аюулгүй байдлын удирдлага
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Системийн аюулгүй байдал, хамгаалалт, хяналт
        </Typography>
      </Box>

      {/* Security Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {SECURITY_METRICS.map((metric, index) => (
          <Grid key={index} xs={12} sm={6} md={3}>
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
                    (theme.palette as any)[metric.color]?.main || theme.palette.primary.main,
                    0.04
                  ),
                  transform: 'translate(30px, -30px)',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(
                        (theme.palette as any)[metric.color]?.main || theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[metric.color]?.main || theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={metric.icon} width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {metric.value}
                    </Typography>
                    {metric.title === 'Хамгаалалтын түвшин' && (
                      <Typography variant="body2" color="text.secondary">
                        %
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {metric.title}
                </Typography>
                {metric.title === 'Хамгаалалтын түвшин' && (
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    sx={{
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.grey[500], 0.2),
                      '& .MuiLinearProgress-bar': {
                        bgcolor:
                          (theme.palette as any)[metric.color]?.main || theme.palette.primary.main,
                      },
                    }}
                  />
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Security Features */}
        <Grid xs={12} lg={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Хамгаалалтын тохиргоо
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {SECURITY_FEATURES.map((feature) => (
                <Box
                  key={feature.id}
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
                        (theme.palette as any)[feature.color]?.main || theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[feature.color]?.main || theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={feature.icon} width={24} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                  <FormControlLabel control={<Switch checked={feature.enabled} />} label="" />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Security Events */}
        <Grid xs={12} lg={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Аюулгүй байдлын үйл явдал
              </Typography>
              <Button variant="outlined" size="small">
                Бүгдийг харах
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SECURITY_EVENTS.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
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
                        (theme.palette as any)[getSeverityColor(event.severity)]?.main ||
                          theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[getSeverityColor(event.severity)]?.main ||
                        theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon="solar:shield-bold" width={20} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {event.title}
                      </Typography>
                      <Chip
                        label={getSeverityText(event.severity)}
                        size="small"
                        color={getSeverityColor(event.severity) as any}
                        variant="soft"
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'block' }}
                    >
                      {event.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'block' }}
                    >
                      IP: {event.ip} • {event.time}
                    </Typography>
                    <Chip
                      label={getStatusText(event.status)}
                      size="small"
                      color={getStatusColor(event.status) as any}
                      variant="soft"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
