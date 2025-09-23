'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const MOCK_INVOICES = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    organization: 'Монгол Улсын Их Сургууль',
    amount: 1200000,
    status: 'paid',
    dueDate: '2024-01-15',
    createdDate: '2024-01-01',
    description: 'Webix платформын захиалга',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    organization: 'Улаанбаатар хотын засаг захиргаа',
    amount: 850000,
    status: 'pending',
    dueDate: '2024-01-20',
    createdDate: '2024-01-05',
    description: 'Системийн засвар үйлчилгээ',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    organization: 'Эрүүл мэндийн яам',
    amount: 2100000,
    status: 'overdue',
    dueDate: '2024-01-10',
    createdDate: '2023-12-20',
    description: 'Хувийн мэдээллийн хамгаалалт',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    organization: 'Боловсрол, соёл, шинжлэх ухаан, спортын яам',
    amount: 1500000,
    status: 'paid',
    dueDate: '2024-01-08',
    createdDate: '2023-12-25',
    description: 'Онлайн сургалтын систем',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    organization: 'Худалдаа, хөгжлийн банк',
    amount: 750000,
    status: 'draft',
    dueDate: '2024-01-25',
    createdDate: '2024-01-10',
    description: 'Санхүүгийн тайлангийн систем',
  },
];

const STATUS_CONFIG = {
  paid: { label: 'Төлөгдсөн', color: 'success' as const },
  pending: { label: 'Хүлээгдэж буй', color: 'warning' as const },
  overdue: { label: 'Хугацаа хэтэрсэн', color: 'error' as const },
  draft: { label: 'Ноорог', color: 'default' as const },
};

export default function InvoiceListView() {
  const theme = useTheme();
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices =
    filterStatus === 'all'
      ? invoices
      : invoices.filter((invoice) => invoice.status === filterStatus);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('mn-MN');

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Нэхэмжлэлийн жагсаалт</Typography>
        <Button
          component={RouterLink}
          href={paths.payment.invoice.create}
          variant="contained"
          startIcon={<Iconify icon="solar:add-circle-bold" />}
        >
          Шинэ нэхэмжлэл
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="Бүгд"
            variant={filterStatus === 'all' ? 'filled' : 'outlined'}
            onClick={() => setFilterStatus('all')}
          />
          {Object.entries(STATUS_CONFIG).map(([status, config]) => (
            <Chip
              key={status}
              label={config.label}
              variant={filterStatus === status ? 'filled' : 'outlined'}
              color={config.color}
              onClick={() => setFilterStatus(status)}
            />
          ))}
        </Stack>
      </Card>

      {/* Invoices Table */}
      <Card>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Нэхэмжлэлийн дугаар</TableCell>
              <TableCell>Байгууллага</TableCell>
              <TableCell>Дүн</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell>Төлөх хугацаа</TableCell>
              <TableCell>Үүсгэсэн огноо</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="medium">
                    {invoice.invoiceNumber}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 32, height: 32 }}>{invoice.organization.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" noWrap sx={{ maxWidth: 200 }}>
                        {invoice.organization}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {invoice.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" color="primary.main">
                    {formatCurrency(invoice.amount)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={STATUS_CONFIG[invoice.status as keyof typeof STATUS_CONFIG].label}
                    color={STATUS_CONFIG[invoice.status as keyof typeof STATUS_CONFIG].color}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Typography variant="body2">{formatDate(invoice.dueDate)}</Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(invoice.createdDate)}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => {
                        window.location.href = `${paths.payment.invoice.view}/${invoice.id}`;
                      }}
                    >
                      <Iconify icon="solar:eye-bold" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => {
                        window.location.href = `${paths.payment.invoice.edit}/${invoice.id}`;
                      }}
                    >
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => handleStatusChange(invoice.id, 'paid')}
                      title="Төлбөр төлөгдсөн гэж тэмдэглэх"
                    >
                      <Iconify icon="solar:check-circle-bold" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteInvoice(invoice.id)}
                      title="Устгах"
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </Card>
    </Container>
  );
}
