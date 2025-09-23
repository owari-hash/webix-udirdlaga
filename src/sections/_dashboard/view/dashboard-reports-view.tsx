'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

const REPORT_TYPES = [
  {
    id: 'system',
    title: 'Системийн тайлан',
    description: 'Системийн ерөнхий статистик, хэрэглэгч, сервер',
    icon: 'solar:server-bold',
    color: 'primary',
    count: 12,
  },
  {
    id: 'organization',
    title: 'Байгууллагын тайлан',
    description: 'Байгууллага тус бүрийн гүйцэтгэл, статистик',
    icon: 'solar:buildings-2-bold',
    color: 'success',
    count: 24,
  },
  {
    id: 'user',
    title: 'Хэрэглэгчийн тайлан',
    description: 'Хэрэглэгчдийн идэвх, үйл ажиллагааны тайлан',
    icon: 'solar:users-group-rounded-bold',
    color: 'info',
    count: 8,
  },
  {
    id: 'webtoon',
    title: 'Вэбтооны тайлан',
    description: 'Вэбтооны үзэлт, таалагдлын тайлан',
    icon: 'solar:book-2-bold',
    color: 'warning',
    count: 15,
  },
  {
    id: 'financial',
    title: 'Санхүүгийн тайлан',
    description: 'Орлого, зарлага, ашиг, алдагдлын тайлан',
    icon: 'solar:dollar-minimalistic-bold',
    color: 'error',
    count: 6,
  },
  {
    id: 'security',
    title: 'Аюулгүй байдлын тайлан',
    description: 'Нэвтрэлт, халдлага, аюулгүй байдлын тайлан',
    icon: 'solar:shield-check-bold',
    color: 'secondary',
    count: 4,
  },
];

const RECENT_REPORTS = [
  {
    id: 1,
    title: 'Сарын системийн тайлан - 2024 оны 1-р сар',
    type: 'system',
    organization: 'Бүх байгууллага',
    generatedBy: 'Супер админ',
    generatedAt: '2024-01-31 23:59',
    status: 'completed',
    size: '2.4 MB',
    downloads: 15,
  },
  {
    id: 2,
    title: 'Монгол Улсын Их Сургуулийн тайлан',
    type: 'organization',
    organization: 'Монгол Улсын Их Сургууль',
    generatedBy: 'Супер админ',
    generatedAt: '2024-01-30 14:30',
    status: 'completed',
    size: '1.8 MB',
    downloads: 8,
  },
  {
    id: 3,
    title: 'Хэрэглэгчийн идэвхийн тайлан',
    type: 'user',
    organization: 'Бүх байгууллага',
    generatedBy: 'Супер админ',
    generatedAt: '2024-01-29 10:15',
    status: 'generating',
    size: '-',
    downloads: 0,
  },
  {
    id: 4,
    title: 'Вэбтооны үзэлтийн тайлан',
    type: 'webtoon',
    organization: 'Бүх байгууллага',
    generatedBy: 'Супер админ',
    generatedAt: '2024-01-28 16:45',
    status: 'completed',
    size: '3.2 MB',
    downloads: 12,
  },
  {
    id: 5,
    title: 'Санхүүгийн сарын тайлан',
    type: 'financial',
    organization: 'Бүх байгууллага',
    generatedBy: 'Супер админ',
    generatedAt: '2024-01-27 09:20',
    status: 'completed',
    size: '1.5 MB',
    downloads: 6,
  },
];

// ----------------------------------------------------------------------

export default function DashboardReportsView() {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports =
    selectedType === 'all'
      ? RECENT_REPORTS
      : RECENT_REPORTS.filter((report) => report.type === selectedType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'generating':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Дууссан';
      case 'generating':
        return 'Үүсгэж байна';
      case 'failed':
        return 'Алдаатай';
      default:
        return 'Тодорхойгүй';
    }
  };

  return (
    <Container maxWidth="xl">

      {/* Report Types */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Тайлангийн төрлүүд
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3,
          }}
        >
          {REPORT_TYPES.map((type) => (
            <Card
              key={type.id}
              sx={{
                p: 3,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: theme.palette[type.color as keyof typeof theme.palette].main,
                  bgcolor: alpha(
                    theme.palette[type.color as keyof typeof theme.palette].main,
                    0.04
                  ),
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(
                      theme.palette[type.color as keyof typeof theme.palette].main,
                      0.08
                    ),
                    color: theme.palette[type.color as keyof typeof theme.palette].main,
                  }}
                >
                  <Iconify icon={type.icon} width={24} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {type.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {type.description}
                  </Typography>
                </Box>
                <Typography variant="h4" color="primary.main">
                  {type.count}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<Iconify icon="solar:file-text-bold" width={16} />}
              >
                Тайлан үүсгэх
              </Button>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Recent Reports */}
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Сүүлийн тайлангууд</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant={selectedType === 'all' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setSelectedType('all')}
            >
              Бүгд
            </Button>
            {REPORT_TYPES.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setSelectedType(type.id)}
              >
                {type.title}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 150px 120px 150px 100px 80px 100px 120px',
                gap: 2,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Тайлангийн нэр
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Төрөл
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Байгууллага
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үүсгэсэн
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үүсгэсэн огноо
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Төлөв
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Хэмжээ
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Татаж авалт
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үйлдэл
              </Typography>
            </Box>

            {/* Table Rows */}
            {filteredReports.map((report) => (
              <Box
                key={report.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 150px 120px 150px 100px 80px 100px 120px',
                  gap: 2,
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {report.title}
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {REPORT_TYPES.find((t) => t.id === report.type)?.title || report.type}
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {report.organization}
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {report.generatedBy}
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {report.generatedAt}
                </Typography>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: alpha(
                        theme.palette[getStatusColor(report.status) as keyof typeof theme.palette]
                          .main,
                        0.1
                      ),
                      color:
                        theme.palette[getStatusColor(report.status) as keyof typeof theme.palette]
                          .main,
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {getStatusText(report.status)}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {report.size}
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                  {report.downloads}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <IconButton size="small" color="info" disabled={report.status !== 'completed'}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" color="primary" disabled={report.status !== 'completed'}>
                    <Iconify icon="solar:download-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
