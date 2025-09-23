'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const LOG_LEVELS = [
  { value: 'all', label: 'Бүгд' },
  { value: 'error', label: 'Алдаа' },
  { value: 'warning', label: 'Сэрэмжлүүлэг' },
  { value: 'info', label: 'Мэдээлэл' },
  { value: 'debug', label: 'Debug' },
];

const LOG_SOURCES = [
  { value: 'all', label: 'Бүгд' },
  { value: 'api', label: 'API' },
  { value: 'database', label: 'База өгөгдөл' },
  { value: 'auth', label: 'Нэвтрэх' },
  { value: 'payment', label: 'Төлбөр' },
  { value: 'system', label: 'Систем' },
];

const MOCK_LOGS = [
  {
    id: 1,
    timestamp: '2024-01-20 14:30:25',
    level: 'info',
    source: 'api',
    message: 'API хүсэлт амжилттай боловсруулагдлаа',
    details: 'GET /api/users - 200 OK',
    ip: '192.168.1.100',
    userId: 'user_123',
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:28:15',
    level: 'error',
    source: 'database',
    message: 'База өгөгдлийн холболт алдаа',
    details: 'Connection timeout after 30 seconds',
    ip: '192.168.1.50',
    userId: 'admin_001',
  },
  {
    id: 3,
    timestamp: '2024-01-20 14:25:42',
    level: 'warning',
    source: 'auth',
    message: 'Буруу нууц үгээр нэвтрэх оролдлого',
    details: 'Failed login attempt for user: test@example.com',
    ip: '203.45.67.89',
    userId: null,
  },
  {
    id: 4,
    timestamp: '2024-01-20 14:22:18',
    level: 'info',
    source: 'payment',
    message: 'Төлбөр амжилттай төлөгдлөө',
    details: 'Payment processed: $99.99 - Transaction ID: TXN_456789',
    ip: '192.168.1.75',
    userId: 'user_456',
  },
  {
    id: 5,
    timestamp: '2024-01-20 14:20:33',
    level: 'debug',
    source: 'system',
    message: 'Системийн шинэчлэл эхэлж байна',
    details: 'Starting system update process...',
    ip: '127.0.0.1',
    userId: 'system',
  },
  {
    id: 6,
    timestamp: '2024-01-20 14:18:55',
    level: 'error',
    source: 'api',
    message: 'API endpoint алдаа',
    details: 'POST /api/webtoons - 500 Internal Server Error',
    ip: '192.168.1.200',
    userId: 'user_789',
  },
];

const LOG_STATS = [
  {
    title: 'Өнөөдрийн лог',
    value: '1,247',
    change: '+12%',
    changeType: 'increase',
    icon: 'solar:document-text-bold',
    color: 'primary',
  },
  {
    title: 'Алдааны тоо',
    value: '23',
    change: '-5%',
    changeType: 'decrease',
    icon: 'solar:danger-circle-bold',
    color: 'error',
  },
  {
    title: 'Сэрэмжлүүлэг',
    value: '156',
    change: '+8%',
    changeType: 'increase',
    icon: 'solar:warning-circle-bold',
    color: 'warning',
  },
  {
    title: 'Хамгийн их хүсэлт',
    value: '2.4K',
    change: '+15%',
    changeType: 'increase',
    icon: 'solar:chart-bold',
    color: 'info',
  },
];

// ----------------------------------------------------------------------

export default function LogsManagementView() {
  const theme = useTheme();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'debug':
        return 'default';
      default:
        return 'default';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'error':
        return 'Алдаа';
      case 'warning':
        return 'Сэрэмжлүүлэг';
      case 'info':
        return 'Мэдээлэл';
      case 'debug':
        return 'Debug';
      default:
        return level;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'api':
        return 'primary';
      case 'database':
        return 'success';
      case 'auth':
        return 'warning';
      case 'payment':
        return 'info';
      case 'system':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getSourceText = (source: string) => {
    switch (source) {
      case 'api':
        return 'API';
      case 'database':
        return 'База өгөгдөл';
      case 'auth':
        return 'Нэвтрэх';
      case 'payment':
        return 'Төлбөр';
      case 'system':
        return 'Систем';
      default:
        return source;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Системийн лог
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Системийн бүх үйл ажиллагаа, алдаа, мэдээллийн лог
        </Typography>
      </Box>

      {/* Log Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {LOG_STATS.map((stat, index) => (
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
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          Лог шүүлт
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <TextField fullWidth label="Хайх" placeholder="Лог дотор хайх..." size="small" />
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Түвшин</InputLabel>
              <Select defaultValue="all" label="Түвшин">
                {LOG_LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Эх үүсвэр</InputLabel>
              <Select defaultValue="all" label="Эх үүсвэр">
                {LOG_SOURCES.map((source) => (
                  <MenuItem key={source.value} value={source.value}>
                    {source.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <TextField fullWidth label="IP хаяг" placeholder="192.168.1.1" size="small" />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:search-bold" width={16} />}
              >
                Хайх
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:download-bold" width={16} />}
              >
                Татах
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Logs Table */}
      <Card>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Лог жагсаалт
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="solar:refresh-bold" width={16} />}
            >
              Сэргээх
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" width={16} />}
            >
              Цэвэрлэх
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Огноо</TableCell>
                <TableCell>Түвшин</TableCell>
                <TableCell>Эх үүсвэр</TableCell>
                <TableCell>Мессеж</TableCell>
                <TableCell>IP хаяг</TableCell>
                <TableCell>Хэрэглэгч</TableCell>
                <TableCell>Үйлдэл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_LOGS.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {log.timestamp}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getLevelText(log.level)}
                      size="small"
                      color={getLevelColor(log.level) as any}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getSourceText(log.source)}
                      size="small"
                      color={getSourceColor(log.source) as any}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {log.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {log.details}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {log.ip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{log.userId || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Iconify icon="solar:eye-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="info">
                        <Iconify icon="solar:copy-bold" width={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
