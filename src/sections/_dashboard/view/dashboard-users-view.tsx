'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const MOCK_USERS = [
  {
    id: 1,
    name: 'Батбаяр',
    email: 'batbayar@num.edu.mn',
    organization: 'Монгол Улсын Их Сургууль',
    role: 'Админ',
    status: 'active',
    lastLogin: '2024-01-20 14:30',
    avatar: '/assets/images/avatar/avatar_1.jpg',
    webtoons: 12,
    views: 1234,
  },
  {
    id: 2,
    name: 'Сэрээ',
    email: 'seree@technology.mn',
    organization: 'Шинэ Монгол Технологи',
    role: 'Хэрэглэгч',
    status: 'active',
    lastLogin: '2024-01-20 12:15',
    avatar: '/assets/images/avatar/avatar_2.jpg',
    webtoons: 8,
    views: 856,
  },
  {
    id: 3,
    name: 'Оюунчимэг',
    email: 'oyunchimeg@bank.mn',
    organization: 'Монголын Банк',
    role: 'Модератор',
    status: 'inactive',
    lastLogin: '2024-01-18 09:45',
    avatar: '/assets/images/avatar/avatar_3.jpg',
    webtoons: 15,
    views: 2341,
  },
  {
    id: 4,
    name: 'Энхтуяа',
    email: 'enkhtuya@health.mn',
    organization: 'Эрүүл Мэндийн Төв',
    role: 'Хэрэглэгч',
    status: 'active',
    lastLogin: '2024-01-20 16:20',
    avatar: '/assets/images/avatar/avatar_4.jpg',
    webtoons: 5,
    views: 432,
  },
  {
    id: 5,
    name: 'Ганбаатар',
    email: 'ganbaatar@university.mn',
    organization: 'Монгол Улсын Их Сургууль',
    role: 'Хэрэглэгч',
    status: 'suspended',
    lastLogin: '2024-01-15 11:30',
    avatar: '/assets/images/avatar/avatar_5.jpg',
    webtoons: 3,
    views: 123,
  },
];

const USER_STATS = [
  {
    title: 'Нийт хэрэглэгч',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: 'solar:users-group-rounded-bold',
    color: 'primary',
  },
  {
    title: 'Идэвхтэй хэрэглэгч',
    value: '987',
    change: '+8%',
    changeType: 'increase',
    icon: 'solar:user-check-bold',
    color: 'success',
  },
  {
    title: 'Идэвхгүй хэрэглэгч',
    value: '156',
    change: '-2%',
    changeType: 'decrease',
    icon: 'solar:user-minus-bold',
    color: 'warning',
  },
  {
    title: 'Түдгэлзүүлсэн',
    value: '91',
    change: '+1%',
    changeType: 'increase',
    icon: 'solar:user-block-bold',
    color: 'error',
  },
];

// ----------------------------------------------------------------------

export default function DashboardUsersView() {
  const theme = useTheme();
  const [users, setUsers] = useState(MOCK_USERS);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers =
    filterStatus === 'all' ? users : users.filter((user) => user.status === filterStatus);

  return (
    <Container maxWidth="xl">
      {/* User Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          mb: 3,
        }}
      >
        {USER_STATS.map((stat, index) => (
          <Card key={index} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha((theme.palette as any)[stat.color].main, 0.08),
                  color: (theme.palette as any)[stat.color].main,
                }}
              >
                <Iconify icon={stat.icon} width={32} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: stat.changeType === 'increase' ? 'success.main' : 'error.main',
                    fontWeight: 'fontWeightSemiBold',
                  }}
                >
                  {stat.change} өнгөрсөн сартай харьцуулахад
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Users Table */}
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Бүх хэрэглэгчид</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant={filterStatus === 'all' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('all')}
            >
              Бүгд
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('active')}
            >
              Идэвхтэй
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('inactive')}
            >
              Идэвхгүй
            </Button>
            <Button
              variant={filterStatus === 'suspended' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('suspended')}
            >
              Түдгэлзүүлсэн
            </Button>
          </Stack>
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 1000 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 1fr 100px 120px 100px 100px 120px',
                gap: 2,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Аватар
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Нэр
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Имэйл
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Байгууллага
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Роль
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Төлөв
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Вэбтоон
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үзэлт
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үйлдэл
              </Typography>
            </Box>

            {/* Table Rows */}
            {filteredUsers.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 1fr 1fr 100px 120px 100px 100px 120px',
                  gap: 2,
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: 'center',
                }}
              >
                <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {user.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {user.organization}
                </Typography>

                <Typography variant="body2" textAlign="center" fontWeight="bold">
                  {user.role}
                </Typography>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor:
                        user.status === 'active'
                          ? alpha(theme.palette.success.main, 0.1)
                          : user.status === 'inactive'
                          ? alpha(theme.palette.warning.main, 0.1)
                          : alpha(theme.palette.error.main, 0.1),
                      color:
                        user.status === 'active'
                          ? 'success.main'
                          : user.status === 'inactive'
                          ? 'warning.main'
                          : 'error.main',
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {user.status === 'active'
                        ? 'Идэвхтэй'
                        : user.status === 'inactive'
                        ? 'Идэвхгүй'
                        : 'Түдгэлзүүлсэн'}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" textAlign="center">
                  {user.webtoons}
                </Typography>

                <Typography variant="body2" textAlign="center">
                  {user.views.toLocaleString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    color="info"
                    onClick={() => {
                      // TODO: Implement user view functionality
                    }}
                  >
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() =>
                      handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')
                    }
                  >
                    <Iconify
                      icon={
                        user.status === 'active' ? 'solar:user-block-bold' : 'solar:user-check-bold'
                      }
                      width={16}
                    />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
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
