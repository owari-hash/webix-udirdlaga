'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const SendInvoiceSchema = Yup.object().shape({
  invoiceId: Yup.string().required('Нэхэмжлэл сонгох шаардлагатай'),
  recipientEmail: Yup.string().email('Зөв имэйл хаяг оруулна уу').required('Имэйл шаардлагатай'),
  subject: Yup.string().required('Гарчиг шаардлагатай'),
  message: Yup.string().required('Зурвас шаардлагатай'),
  sendCopy: Yup.boolean(),
  reminderDays: Yup.number().min(1, 'Хамгийн багадаа 1 өдөр').max(30, 'Хамгийн ихдээ 30 өдөр'),
});

const defaultValues = {
  invoiceId: '',
  recipientEmail: '',
  subject: '',
  message: '',
  sendCopy: false,
  reminderDays: 7,
};

const MOCK_INVOICES = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    organization: 'Монгол Улсын Их Сургууль',
    amount: 1200000,
    status: 'draft',
    dueDate: '2024-01-15',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    organization: 'Улаанбаатар хотын засаг захиргаа',
    amount: 850000,
    status: 'draft',
    dueDate: '2024-01-20',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    organization: 'Эрүүл мэндийн яам',
    amount: 2100000,
    status: 'draft',
    dueDate: '2024-01-10',
  },
];

const EMAIL_TEMPLATES = [
  {
    id: 'standard',
    name: 'Стандарт захидал',
    subject: 'Нэхэмжлэл - {invoiceNumber}',
    message:
      'Сайн байна уу,\n\n{organization} байгууллагад {invoiceNumber} дугаартай нэхэмжлэл илгээж байна.\n\nДэлгэрэнгүй мэдээллийг хавсралтаас үзнэ үү.\n\nХүндэтгэсэн,\nWebix Team',
  },
  {
    id: 'urgent',
    name: 'Яаралтай захидал',
    subject: 'ЯАРАЛТАЙ: Нэхэмжлэл - {invoiceNumber}',
    message:
      'Сайн байна уу,\n\n{organization} байгууллагад {invoiceNumber} дугаартай нэхэмжлэл илгээж байна.\n\nЭнэ нэхэмжлэлийг {dueDate} хүртэл төлөх шаардлагатай.\n\nДэлгэрэнгүй мэдээллийг хавсралтаас үзнэ үү.\n\nХүндэтгэсэн,\nWebix Team',
  },
  {
    id: 'friendly',
    name: 'Найрсаг захидал',
    subject: 'Таны нэхэмжлэл бэлэн боллоо - {invoiceNumber}',
    message:
      'Сайн байна уу,\n\n{organization} байгууллагын хамт ажиллаж байгаадаа баяртай байна.\n\n{invoiceNumber} дугаартай нэхэмжлэл бэлэн болж, илгээж байна.\n\nАсуудал гарвал бидэнтэй холбоо барина уу.\n\nХүндэтгэсэн,\nWebix Team',
  },
];

export default function InvoiceSendView() {
  const theme = useTheme();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [sendingStatus, setSendingStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const methods = useForm({
    resolver: yupResolver(SendInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const watchedInvoiceId = watch('invoiceId');

  const selectedInvoice = MOCK_INVOICES.find((inv) => inv.id === watchedInvoiceId);

  const handleInvoiceSelect = (invoiceId: string) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceId));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    }
  };

  const handleTemplateSelect = (template: any) => {
    if (selectedInvoice) {
      const subject = template.subject.replace('{invoiceNumber}', selectedInvoice.invoiceNumber);
      const message = template.message
        .replace('{organization}', selectedInvoice.organization)
        .replace('{invoiceNumber}', selectedInvoice.invoiceNumber)
        .replace('{dueDate}', selectedInvoice.dueDate);

      setValue('subject', subject);
      setValue('message', message);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSendingStatus('sending');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Sending invoice:', data);
      setSendingStatus('sent');
      reset();
      setSelectedInvoices([]);
    } catch (error) {
      console.error(error);
      setSendingStatus('idle');
    }
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('mn-MN');

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Нэхэмжлэл илгээх
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          {/* Invoice Selection */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Нэхэмжлэл сонгох
            </Typography>

            <Stack spacing={2}>
              {MOCK_INVOICES.map((invoice) => (
                <Box
                  key={invoice.id}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: selectedInvoices.includes(invoice.id) ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    bgcolor: selectedInvoices.includes(invoice.id)
                      ? alpha(theme.palette.primary.main, 0.04)
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => handleInvoiceSelect(invoice.id)}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {invoice.invoiceNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {invoice.organization}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="primary.main">
                        {formatCurrency(invoice.amount)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Төлөх хугацаа: {formatDate(invoice.dueDate)}
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleInvoiceSelect(invoice.id)}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Email Configuration */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Имэйл тохиргоо
            </Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect name="invoiceId" label="Нэхэмжлэл сонгох">
                {MOCK_INVOICES.map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.invoiceNumber} - {invoice.organization}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="recipientEmail" label="Хүлээн авагчийн имэйл" />
            </Box>

            <RHFTextField name="subject" label="Гарчиг" sx={{ mt: 3 }} />

            <RHFTextField name="message" label="Зурвас" multiline rows={6} sx={{ mt: 3 }} />

            <FormControlLabel control={<Checkbox />} label="Өөртөө хуулах" sx={{ mt: 2 }} />
          </Card>

          {/* Email Templates */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Имэйл загварууд
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {EMAIL_TEMPLATES.map((template) => (
                <Chip
                  key={template.id}
                  label={template.name}
                  variant="outlined"
                  onClick={() => handleTemplateSelect(template)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Card>

          {/* Send Options */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Илгээх сонголтууд
            </Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="reminderDays"
                label="Сануулах өдөр"
                type="number"
                helperText="Хэдэн өдрийн дараа сануулах"
              />
            </Box>
          </Card>

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.payment.invoice.list}
              variant="outlined"
              color="inherit"
            >
              Цуцлах
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={selectedInvoices.length === 0}
            >
              {sendingStatus === 'sent' ? 'Илгээгдсэн' : 'Илгээх'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
