'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const REPORT_METRICS = [
  {
    title: 'Нийт нэхэмжлэл',
    value: '156',
    change: '+12.5%',
    changeType: 'increase',
    icon: 'solar:file-text-bold',
    color: 'primary',
  },
  {
    title: 'Төлөгдсөн',
    value: '142',
    change: '+8.2%',
    changeType: 'increase',
    icon: 'solar:check-circle-bold',
    color: 'success',
  },
  {
    title: 'Хүлээгдэж буй',
    value: '8',
    change: '-15.1%',
    changeType: 'decrease',
    icon: 'solar:clock-circle-bold',
    color: 'warning',
  },
  {
    title: 'Хугацаа хэтэрсэн',
    value: '6',
    change: '+5.3%',
    changeType: 'increase',
    icon: 'solar:danger-triangle-bold',
    color: 'error',
  },
];

const MONTHLY_DATA = [
  { month: '1-р сар', invoices: 45, paid: 42, pending: 2, overdue: 1, revenue: 12500000 },
  { month: '2-р сар', invoices: 52, paid: 48, pending: 3, overdue: 1, revenue: 15200000 },
  { month: '3-р сар', invoices: 38, paid: 35, pending: 2, overdue: 1, revenue: 11800000 },
  { month: '4-р сар', invoices: 61, paid: 58, pending: 2, overdue: 1, revenue: 18900000 },
  { month: '5-р сар', invoices: 48, paid: 45, pending: 2, overdue: 1, revenue: 14500000 },
  { month: '6-р сар', invoices: 55, paid: 52, pending: 2, overdue: 1, revenue: 16800000 },
];

const TOP_ORGANIZATIONS = [
  { name: 'Монгол Улсын Их Сургууль', invoices: 24, totalAmount: 4500000, paidAmount: 4200000 },
  {
    name: 'Улаанбаатар хотын засаг захиргаа',
    invoices: 18,
    totalAmount: 3200000,
    paidAmount: 3000000,
  },
  { name: 'Эрүүл мэндийн яам', invoices: 15, totalAmount: 2800000, paidAmount: 2500000 },
  {
    name: 'Боловсрол, соёл, шинжлэх ухаан, спортын яам',
    invoices: 12,
    totalAmount: 2200000,
    paidAmount: 2000000,
  },
  { name: 'Худалдаа, хөгжлийн банк', invoices: 10, totalAmount: 1800000, paidAmount: 1700000 },
];

export default function InvoiceReportView() {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Нэхэмжлэлийн тайлан</Typography>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Хугацаа</InputLabel>
            <Select
              value={selectedPeriod}
              label="Хугацаа"
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <MenuItem value="1month">1 сар</MenuItem>
              <MenuItem value="3months">3 сар</MenuItem>
              <MenuItem value="6months">6 сар</MenuItem>
              <MenuItem value="1year">1 жил</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Iconify icon="solar:download-bold" />}>
            PDF татах
          </Button>
        </Stack>
      </Box>

      {/* Metrics */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          mb: 4,
        }}
      >
        {REPORT_METRICS.map((metric, index) => (
          <Card key={index} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {metric.title}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {metric.value}
                </Typography>
                <Typography
                  variant="body2"
                  color={metric.changeType === 'increase' ? 'success.main' : 'error.main'}
                >
                  {metric.change}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: alpha((theme.palette as any)[metric.color].main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon={metric.icon}
                  width={32}
                  color={(theme.palette as any)[metric.color].main}
                />
              </Box>
            </Stack>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Monthly Chart */}
        <Box sx={{ flex: 2 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Сарын тайлан
            </Typography>
            <Box
              sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant="body1" color="text.secondary">
                График энд харагдана
              </Typography>
            </Box>
          </Card>

          {/* Monthly Data Table */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Сарын дэлгэрэнгүй
            </Typography>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCell>Сар</TableCell>
                  <TableCell align="right">Нэхэмжлэл</TableCell>
                  <TableCell align="right">Төлөгдсөн</TableCell>
                  <TableCell align="right">Хүлээгдэж буй</TableCell>
                  <TableCell align="right">Хугацаа хэтэрсэн</TableCell>
                  <TableCell align="right">Орлого</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MONTHLY_DATA.map((row) => (
                  <TableRow key={row.month} hover>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{row.invoices}</TableCell>
                    <TableCell align="right">
                      <Chip label={row.paid} color="success" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.pending} color="warning" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.overdue} color="error" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" color="primary.main">
                        {formatCurrency(row.revenue)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Card>
        </Box>

        {/* Top Organizations */}
        <Box sx={{ width: 400 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Топ байгууллагууд
            </Typography>
            <Stack spacing={2}>
              {TOP_ORGANIZATIONS.map((org, index) => (
                <Box
                  key={index}
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
                      {org.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      #{index + 1}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      {org.invoices} нэхэмжлэл
                    </Typography>
                    <Typography variant="subtitle2" color="primary.main">
                      {formatCurrency(org.totalAmount)}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Төлөгдсөн: {formatCurrency(org.paidAmount)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Хурдан статистик
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Нийт орлого:</Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {formatCurrency(89700000)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Төлөгдсөн:</Typography>
                <Typography variant="subtitle2" color="success.main">
                  {formatCurrency(82000000)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Хүлээгдэж буй:</Typography>
                <Typography variant="subtitle2" color="warning.main">
                  {formatCurrency(5500000)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Хугацаа хэтэрсэн:</Typography>
                <Typography variant="subtitle2" color="error.main">
                  {formatCurrency(2200000)}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
