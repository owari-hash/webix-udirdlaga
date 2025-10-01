'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const CONTENT_CATEGORIES = [
  {
    id: 'images',
    title: 'Зураг',
    count: 1245,
    size: '2.3 GB',
    icon: 'solar:gallery-bold',
    color: 'primary',
  },
  {
    id: 'videos',
    title: 'Видео',
    count: 89,
    size: '15.7 GB',
    icon: 'solar:video-frame-bold',
    color: 'success',
  },
  {
    id: 'documents',
    title: 'Баримт',
    count: 456,
    size: '890 MB',
    icon: 'solar:document-bold',
    color: 'info',
  },
  {
    id: 'audio',
    title: 'Дуу',
    count: 234,
    size: '1.2 GB',
    icon: 'solar:music-note-bold',
    color: 'warning',
  },
];

const RECENT_UPLOADS = [
  {
    id: 1,
    name: 'webtoon_cover_001.jpg',
    type: 'image',
    size: '2.4 MB',
    uploadedBy: 'Батбаяр',
    uploadedAt: '2 цагийн өмнө',
    status: 'processed',
  },
  {
    id: 2,
    name: 'chapter_15_audio.mp3',
    type: 'audio',
    size: '15.8 MB',
    uploadedBy: 'Сараа',
    uploadedAt: '4 цагийн өмнө',
    status: 'processing',
  },
  {
    id: 3,
    name: 'character_design.pdf',
    type: 'document',
    size: '3.2 MB',
    uploadedBy: 'Энхбаяр',
    uploadedAt: '6 цагийн өмнө',
    status: 'processed',
  },
  {
    id: 4,
    name: 'background_music.mp3',
    type: 'audio',
    size: '8.7 MB',
    uploadedBy: 'Мөнхбаяр',
    uploadedAt: '1 өдрийн өмнө',
    status: 'processed',
  },
];

// ----------------------------------------------------------------------

export default function ContentManagementView() {
  const theme = useTheme();

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return 'solar:gallery-bold';
      case 'video':
        return 'solar:video-frame-bold';
      case 'document':
        return 'solar:document-bold';
      case 'audio':
        return 'solar:music-note-bold';
      default:
        return 'solar:file-bold';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processed':
        return 'Бэлэн';
      case 'processing':
        return 'Боловсруулж байна';
      case 'error':
        return 'Алдаа';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Контент удирдлага
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Бүх файл, зураг, видео болон бусад контентуудыг удирдах
        </Typography>
      </Box>

      {/* Content Categories */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {CONTENT_CATEGORIES.map((category, index) => (
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
                cursor: 'pointer',
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
                    (theme.palette as any)[category.color]?.main || theme.palette.primary.main,
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
                        (theme.palette as any)[category.color]?.main || theme.palette.primary.main,
                        0.12
                      ),
                      color:
                        (theme.palette as any)[category.color]?.main || theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={category.icon} width={24} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {category.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      файл
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.size}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Uploads */}
        <Grid xs={12} lg={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Сүүлийн оруулсан файлууд
              </Typography>
              <Button variant="outlined" size="small">
                Бүгдийг харах
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {RECENT_UPLOADS.map((file) => (
                <Box
                  key={file.id}
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
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon={getFileTypeIcon(file.type)} width={20} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {file.size} • {file.uploadedBy} • {file.uploadedAt}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusText(file.status)}
                    size="small"
                    color={getStatusColor(file.status) as any}
                    variant="soft"
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12} lg={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Хурдан үйлдлүүд
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:upload-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Файл оруулах
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:folder-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Хавтас үүсгэх
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:search-bold" width={20} />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Хайх
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
    </Container>
  );
}
