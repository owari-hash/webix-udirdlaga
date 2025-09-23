'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
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

const MOCK_WEBTOONS = [
  {
    id: 1,
    title: 'Монголын домог',
    author: 'Батбаяр',
    organization: 'Монгол Улсын Их Сургууль',
    status: 'published',
    views: 15420,
    likes: 892,
    chapters: 24,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 2,
    title: 'Цагаан сар',
    author: 'Сараа',
    organization: 'Шинжлэх Ухааны Академи',
    status: 'draft',
    views: 8930,
    likes: 456,
    chapters: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
  },
  {
    id: 3,
    title: 'Хөх тэнгэр',
    author: 'Энхбаяр',
    organization: 'Технологийн Их Сургууль',
    status: 'published',
    views: 22100,
    likes: 1205,
    chapters: 18,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22',
  },
  {
    id: 4,
    title: 'Алтан наран',
    author: 'Мөнхбаяр',
    organization: 'Эрүүл Мэндийн Их Сургууль',
    status: 'review',
    views: 5670,
    likes: 234,
    chapters: 8,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19',
  },
];

const STATS_CARDS = [
  {
    title: 'Нийт вэбтоон',
    value: '156',
    change: '+12%',
    changeType: 'increase',
    icon: 'solar:book-2-bold',
    color: 'primary',
  },
  {
    title: 'Нийт үзэлт',
    value: '2.4M',
    change: '+23%',
    changeType: 'increase',
    icon: 'solar:eye-bold',
    color: 'success',
  },
  {
    title: 'Нийт дуртай',
    value: '45.2K',
    change: '+18%',
    changeType: 'increase',
    icon: 'solar:heart-bold',
    color: 'error',
  },
  {
    title: 'Дундаж үнэлгээ',
    value: '4.7',
    change: '+0.2',
    changeType: 'increase',
    icon: 'solar:star-bold',
    color: 'warning',
  },
];

// ----------------------------------------------------------------------

export default function WebtoonsManagementView() {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'review':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Нийтлэгдсэн';
      case 'draft':
        return 'Ноорог';
      case 'review':
        return 'Хянаж байна';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Вэбтоон удирдлага
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Бүх вэбтоон бүтээлийг харах, удирдах, засах
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {STATS_CARDS.map((stat, index) => (
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

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Вэбтоон жагсаалт
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Iconify icon="solar:filter-bold" width={16} />}>
            Шүүлт
          </Button>
          <Button variant="outlined" startIcon={<Iconify icon="solar:import-bold" width={16} />}>
            Импорт
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:add-circle-bold" width={16} />}
          >
            Шинэ вэбтоон
          </Button>
        </Box>
      </Box>

      {/* Webtoons Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Вэбтоон</TableCell>
                <TableCell>Зохиогч</TableCell>
                <TableCell>Байгууллага</TableCell>
                <TableCell>Төлөв</TableCell>
                <TableCell>Үзэлт</TableCell>
                <TableCell>Дуртай</TableCell>
                <TableCell>Бүлэг</TableCell>
                <TableCell>Огноо</TableCell>
                <TableCell>Үйлдэл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_WEBTOONS.map((webtoon) => (
                <TableRow key={webtoon.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                        {webtoon.title.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {webtoon.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {webtoon.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{webtoon.author}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{webtoon.organization}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(webtoon.status)}
                      size="small"
                      color={getStatusColor(webtoon.status) as any}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{webtoon.views.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{webtoon.likes.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{webtoon.chapters}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {webtoon.updatedAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Iconify icon="solar:eye-bold" width={16} />
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
    </Container>
  );
}
