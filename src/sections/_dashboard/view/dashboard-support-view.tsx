'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SUPPORT_TICKETS = [
  {
    id: 1,
    title: 'Системийн удаан ажиллах асуудал',
    description: 'Вэбтоон унших үед систем удаан ажиллаж байна',
    priority: 'high',
    status: 'open',
    category: 'technical',
    organization: 'Монгол Улсын Их Сургууль',
    createdBy: 'Батбаяр',
    createdAt: '2024-01-20 14:30',
    lastActivity: '2024-01-20 16:45',
    assignee: 'Сүпер админ',
    comments: 3,
  },
  {
    id: 2,
    title: 'Хэрэглэгч бүртгэх асуудал',
    description: 'Шинэ хэрэглэгч бүртгэхэд алдаа гарч байна',
    priority: 'medium',
    status: 'in_progress',
    category: 'user_management',
    organization: 'Шинэ Монгол Технологи',
    createdBy: 'Сэрээ',
    createdAt: '2024-01-19 10:15',
    lastActivity: '2024-01-20 09:30',
    assignee: 'Сүпер админ',
    comments: 5,
  },
  {
    id: 3,
    title: 'Төлбөрийн системийн асуудал',
    description: 'Төлбөр төлөхөд алдаа гарч байна',
    priority: 'high',
    status: 'resolved',
    category: 'billing',
    organization: 'Монголын Банк',
    createdBy: 'Оюунчимэг',
    createdAt: '2024-01-18 16:20',
    lastActivity: '2024-01-19 11:15',
    assignee: 'Сүпер админ',
    comments: 8,
  },
  {
    id: 4,
    title: 'Вэбтоон оруулах асуудал',
    description: 'Вэбтоон оруулах үед зураг харагдахгүй байна',
    priority: 'low',
    status: 'open',
    category: 'content',
    organization: 'Эрүүл Мэндийн Төв',
    createdBy: 'Энхтуяа',
    createdAt: '2024-01-17 13:45',
    lastActivity: '2024-01-17 13:45',
    assignee: 'Хариуцлагагүй',
    comments: 1,
  },
  {
    id: 5,
    title: 'API холболтын асуудал',
    description: 'API холбогдохгүй байна',
    priority: 'high',
    status: 'closed',
    category: 'api',
    organization: 'Монгол Улсын Их Сургууль',
    createdBy: 'Ганбаатар',
    createdAt: '2024-01-16 09:30',
    lastActivity: '2024-01-17 14:20',
    assignee: 'Сүпер админ',
    comments: 12,
  },
];

const TICKET_CATEGORIES = [
  { id: 'all', label: 'Бүгд', count: 5, color: 'default' },
  { id: 'technical', label: 'Техникийн', count: 1, color: 'error' },
  { id: 'user_management', label: 'Хэрэглэгч удирдлага', count: 1, color: 'info' },
  { id: 'billing', label: 'Төлбөр', count: 1, color: 'warning' },
  { id: 'content', label: 'Агуулга', count: 1, color: 'success' },
  { id: 'api', label: 'API', count: 1, color: 'secondary' },
];

const PRIORITY_COLORS = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

const STATUS_COLORS = {
  open: 'error',
  in_progress: 'warning',
  resolved: 'success',
  closed: 'default',
};

const STATUS_LABELS = {
  open: 'Нээлттэй',
  in_progress: 'Хийгдэж байна',
  resolved: 'Шийдэгдсэн',
  closed: 'Хаагдсан',
};

// ----------------------------------------------------------------------

export default function DashboardSupportView() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTickets =
    selectedCategory === 'all'
      ? SUPPORT_TICKETS
      : SUPPORT_TICKETS.filter((ticket) => ticket.category === selectedCategory);

  const getPriorityColor = (priority: string) =>
    PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'default';

  const getStatusColor = (status: string) =>
    STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'default';

  const getStatusLabel = (status: string) =>
    STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status;

  return (
    <Container maxWidth="xl">
      {/* Support Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="error.main" sx={{ mb: 1 }}>
            {SUPPORT_TICKETS.filter((t) => t.status === 'open').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Нээлттэй асуудал
          </Typography>
        </Card>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="warning.main" sx={{ mb: 1 }}>
            {SUPPORT_TICKETS.filter((t) => t.status === 'in_progress').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Хийгдэж байна
          </Typography>
        </Card>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="success.main" sx={{ mb: 1 }}>
            {SUPPORT_TICKETS.filter((t) => t.status === 'resolved').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Шийдэгдсэн
          </Typography>
        </Card>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="primary.main" sx={{ mb: 1 }}>
            {SUPPORT_TICKETS.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Нийт асуудал
          </Typography>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Categories Sidebar */}
        <Card sx={{ width: 250, p: 2, height: 'fit-content' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ангилал
          </Typography>
          <Stack spacing={1}>
            {TICKET_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'contained' : 'text'}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  justifyContent: 'space-between',
                  textAlign: 'left',
                }}
              >
                <Typography variant="body2">{category.label}</Typography>
                <Chip
                  label={category.count}
                  size="small"
                  color={category.color as any}
                  sx={{ ml: 1 }}
                />
              </Button>
            ))}
          </Stack>
        </Card>

        {/* Tickets List */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6">Асуудлын жагсаалт</Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:add-circle-bold" width={16} />}
              >
                Шинэ асуудал
              </Button>
            </Box>

            <Stack spacing={2}>
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                  onClick={() => {
                    // TODO: Implement ticket selection functionality
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        #{ticket.id} {ticket.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {ticket.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={getStatusLabel(ticket.status)}
                          size="small"
                          color={getStatusColor(ticket.status) as any}
                        />
                        <Chip
                          label={ticket.priority}
                          size="small"
                          color={getPriorityColor(ticket.priority) as any}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {ticket.organization}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.createdAt}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {ticket.assignee}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>{ticket.createdBy.charAt(0)}</Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.createdBy}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {ticket.comments} сэтгэгдэл
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="info">
                        <Iconify icon="solar:eye-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
