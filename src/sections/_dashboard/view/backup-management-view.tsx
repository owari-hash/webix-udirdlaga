'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
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

const BACKUP_STATS = [
  {
    title: 'Нийт нөөцлөл',
    value: '24',
    change: '+2',
    changeType: 'increase',
    icon: 'solar:database-bold',
    color: 'primary',
  },
  {
    title: 'Нийт хэмжээ',
    value: '2.4 GB',
    change: '+120 MB',
    changeType: 'increase',
    icon: 'solar:folder-bold',
    color: 'success',
  },
  {
    title: 'Сүүлийн нөөцлөл',
    value: '2 цаг',
    change: 'Өмнө',
    changeType: 'neutral',
    icon: 'solar:clock-circle-bold',
    color: 'info',
  },
  {
    title: 'Хамгаалалтын түвшин',
    value: '95%',
    change: '+5%',
    changeType: 'increase',
    icon: 'solar:shield-check-bold',
    color: 'warning',
  },
];

const BACKUP_JOBS = [
  {
    id: 1,
    name: 'Өдөр тутмын нөөцлөл',
    type: 'automatic',
    status: 'completed',
    size: '156 MB',
    duration: '12 мин',
    createdAt: '2024-01-20 02:00:00',
    nextRun: '2024-01-21 02:00:00',
    retention: '30 хоног',
  },
  {
    id: 2,
    name: 'Долоо хоногийн нөөцлөл',
    type: 'automatic',
    status: 'completed',
    size: '1.2 GB',
    duration: '45 мин',
    createdAt: '2024-01-19 03:00:00',
    nextRun: '2024-01-26 03:00:00',
    retention: '12 долоо хоног',
  },
  {
    id: 3,
    name: 'Сарын нөөцлөл',
    type: 'automatic',
    status: 'completed',
    size: '4.8 GB',
    duration: '2 цаг 15 мин',
    createdAt: '2024-01-01 04:00:00',
    nextRun: '2024-02-01 04:00:00',
    retention: '12 сар',
  },
  {
    id: 4,
    name: 'Гар нөөцлөл',
    type: 'manual',
    status: 'running',
    size: '0 MB',
    duration: '0 мин',
    createdAt: '2024-01-20 14:30:00',
    nextRun: '-',
    retention: '7 хоног',
  },
];

const BACKUP_FILES = [
  {
    id: 1,
    name: 'backup_2024_01_20_020000.sql',
    type: 'database',
    size: '156 MB',
    createdAt: '2024-01-20 02:00:00',
    status: 'completed',
    location: 'Local Storage',
  },
  {
    id: 2,
    name: 'backup_2024_01_19_030000.tar.gz',
    type: 'full',
    size: '1.2 GB',
    createdAt: '2024-01-19 03:00:00',
    status: 'completed',
    location: 'AWS S3',
  },
  {
    id: 3,
    name: 'backup_2024_01_18_020000.sql',
    type: 'database',
    size: '148 MB',
    createdAt: '2024-01-18 02:00:00',
    status: 'completed',
    location: 'Local Storage',
  },
  {
    id: 4,
    name: 'backup_2024_01_17_020000.sql',
    type: 'database',
    size: '152 MB',
    createdAt: '2024-01-17 02:00:00',
    status: 'failed',
    location: 'Local Storage',
  },
];

// ----------------------------------------------------------------------

export default function BackupManagementView() {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'running':
        return 'info';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Дууссан';
      case 'running':
        return 'Явуулж байна';
      case 'failed':
        return 'Амжилтгүй';
      case 'pending':
        return 'Хүлээгдэж буй';
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'automatic':
        return 'primary';
      case 'manual':
        return 'secondary';
      case 'database':
        return 'info';
      case 'full':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'automatic':
        return 'Автомат';
      case 'manual':
        return 'Гар';
      case 'database':
        return 'База өгөгдөл';
      case 'full':
        return 'Бүрэн';
      default:
        return type;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Нөөцлөл удирдлага
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Системийн нөөцлөл, сэргээлт, хадгалалтын удирдлага
        </Typography>
      </Box>

      {/* Backup Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {BACKUP_STATS.map((stat, index) => (
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
                    color={
                      stat.changeType === 'increase'
                        ? 'success'
                        : stat.changeType === 'decrease'
                        ? 'error'
                        : 'default'
                    }
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

      <Grid container spacing={3}>
        {/* Backup Jobs */}
        <Grid xs={12} lg={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Нөөцлөлийн ажлууд
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="solar:add-bold" width={16} />}>
                Шинэ ажил
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Нэр</TableCell>
                    <TableCell>Төрөл</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Хэмжээ</TableCell>
                    <TableCell>Үргэлжлэх хугацаа</TableCell>
                    <TableCell>Дараагийн ажиллагаа</TableCell>
                    <TableCell>Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {BACKUP_JOBS.map((job) => (
                    <TableRow key={job.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {job.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Хадгалах хугацаа: {job.retention}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getTypeText(job.type)}
                          size="small"
                          color={getTypeColor(job.type) as any}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={getStatusText(job.status)}
                            size="small"
                            color={getStatusColor(job.status) as any}
                            variant="soft"
                          />
                          {job.status === 'running' && (
                            <LinearProgress
                              sx={{ width: 60, height: 4, borderRadius: 2 }}
                              color="info"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{job.size}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{job.duration}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {job.nextRun}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <Iconify icon="solar:play-bold" width={16} />
                          </IconButton>
                          <IconButton size="small" color="info">
                            <Iconify icon="solar:pen-bold" width={16} />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12} lg={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Хурдан үйлдлүүд
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:database-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                База өгөгдөл нөөцлөх
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:folder-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Бүрэн нөөцлөх
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:refresh-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Сэргээх
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:settings-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Тохиргоо
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Backup Files */}
      <Card sx={{ mt: 3 }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Нөөцлөлийн файлууд
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
              startIcon={<Iconify icon="solar:download-bold" width={16} />}
            >
              Татах
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Файлын нэр</TableCell>
                <TableCell>Төрөл</TableCell>
                <TableCell>Хэмжээ</TableCell>
                <TableCell>Үүсгэсэн огноо</TableCell>
                <TableCell>Байршил</TableCell>
                <TableCell>Төлөв</TableCell>
                <TableCell>Үйлдэл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BACKUP_FILES.map((file) => (
                <TableRow key={file.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        <Iconify icon="solar:file-bold" width={16} />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {file.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(file.type)}
                      size="small"
                      color={getTypeColor(file.type) as any}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{file.size}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {file.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{file.location}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(file.status)}
                      size="small"
                      color={getStatusColor(file.status) as any}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Iconify icon="solar:download-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="info">
                        <Iconify icon="solar:eye-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
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
