'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const PAYMENT_STATS = [
  {
    title: 'Нийт төлбөр',
    value: '₮12,450,000',
    change: '+12.5%',
    changeType: 'increase',
    icon: 'solar:dollar-minimalistic-bold',
    color: 'success',
  },
  {
    title: 'Хүлээгдэж буй төлбөр',
    value: '₮2,340,000',
    change: '+8.2%',
    changeType: 'increase',
    icon: 'solar:clock-circle-bold',
    color: 'warning',
  },
  {
    title: 'Хугацаа хэтэрсэн',
    value: '₮890,000',
    change: '-5.1%',
    changeType: 'decrease',
    icon: 'solar:danger-triangle-bold',
    color: 'error',
  },
  {
    title: 'Энэ сар',
    value: '₮3,120,000',
    change: '+15.3%',
    changeType: 'increase',
    icon: 'solar:calendar-bold',
    color: 'info',
  },
];

const QUICK_ACTIONS = [
  {
    title: 'Шинэ нэхэмжлэл үүсгэх',
    description: 'Байгууллагад нэхэмжлэл илгээх',
    icon: 'solar:file-add-bold',
    color: 'primary',
    href: paths.payment.invoice.create,
  },
  {
    title: 'Нэхэмжлэл илгээх',
    description: 'Бэлэн нэхэмжлэл илгээх',
    icon: 'solar:letter-unread-bold',
    color: 'info',
    href: paths.payment.invoice.send,
  },
  {
    title: 'Тайлан үзэх',
    description: 'Төлбөрийн тайлан үзэх',
    icon: 'solar:chart-2-bold',
    color: 'success',
    href: paths.payment.invoice.report,
  },
  {
    title: 'Нэхэмжлэлийн жагсаалт',
    description: 'Бүх нэхэмжлэлийн жагсаалт',
    icon: 'solar:list-bold',
    color: 'warning',
    href: paths.payment.invoice.list,
  },
];

const RECENT_PAYMENTS = [
  {
    id: '1',
    organization: 'Монгол Улсын Их Сургууль',
    amount: '₮1,200,000',
    status: 'paid',
    date: '2024-01-15',
    invoice: 'INV-2024-001',
  },
  {
    id: '2',
    organization: 'Улаанбаатар хотын засаг захиргаа',
    amount: '₮850,000',
    status: 'pending',
    date: '2024-01-14',
    invoice: 'INV-2024-002',
  },
  {
    id: '3',
    organization: 'Эрүүл мэндийн яам',
    amount: '₮2,100,000',
    status: 'overdue',
    date: '2024-01-10',
    invoice: 'INV-2024-003',
  },
  {
    id: '4',
    organization: 'Боловсрол, соёл, шинжлэх ухаан, спортын яам',
    amount: '₮1,500,000',
    status: 'paid',
    date: '2024-01-08',
    invoice: 'INV-2024-004',
  },
];

export default function PaymentManagementView() {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Төлөгдсөн';
      case 'pending':
        return 'Хүлээгдэж буй';
      case 'overdue':
        return 'Хугацаа хэтэрсэн';
      default:
        return 'Тодорхойгүй';
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Payment Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          mb: 4,
        }}
      >
        {PAYMENT_STATS.map((stat, index) => (
          <Card key={index} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  color={stat.changeType === 'increase' ? 'success.main' : 'error.main'}
                >
                  {stat.change}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: alpha((theme.palette as any)[stat.color].main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon={stat.icon}
                  width={32}
                  color={(theme.palette as any)[stat.color].main}
                />
              </Box>
            </Stack>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Quick Actions */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Хурдан үйлдлүүд
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 2,
            }}
          >
            {QUICK_ACTIONS.map((action, index) => (
              <Card
                key={index}
                component={RouterLink}
                href={action.href}
                sx={{
                  p: 3,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      bgcolor: alpha((theme.palette as any)[action.color].main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon={action.icon}
                      width={24}
                      color={(theme.palette as any)[action.color].main}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Recent Payments */}
        <Box sx={{ width: 400 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Сүүлийн төлбөрүүд
          </Typography>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              {RECENT_PAYMENTS.map((payment) => (
                <Box
                  key={payment.id}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: 200 }}>
                      {payment.organization}
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                        bgcolor: alpha(
                          (theme.palette as any)[getStatusColor(payment.status)].main,
                          0.1
                        ),
                      }}
                    >
                      <Typography
                        variant="caption"
                        color={`${getStatusColor(payment.status)}.main`}
                        fontWeight="medium"
                      >
                        {getStatusText(payment.status)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" color="primary.main">
                      {payment.amount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.date}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {payment.invoice}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Button
              fullWidth
              variant="outlined"
              component={RouterLink}
              href={paths.payment.invoice.list}
              sx={{ mt: 2 }}
            >
              Бүх төлбөр үзэх
            </Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
