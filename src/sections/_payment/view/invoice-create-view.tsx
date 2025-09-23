'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const CreateInvoiceSchema = Yup.object().shape({
  organization: Yup.string().required('Байгууллага сонгох шаардлагатай'),
  description: Yup.string().required('Тайлбар шаардлагатай'),
  amount: Yup.number().required('Дүн шаардлагатай').min(0, 'Дүн 0-ээс их байх ёстой'),
  dueDate: Yup.string().required('Төлөх хугацаа шаардлагатай'),
  currency: Yup.string().required('Валют сонгох шаардлагатай'),
  notes: Yup.string(),
});

const defaultValues = {
  organization: '',
  description: '',
  amount: 0,
  dueDate: '',
  currency: 'MNT',
  notes: '',
};

const MOCK_ORGANIZATIONS = [
  'Монгол Улсын Их Сургууль',
  'Улаанбаатар хотын засаг захиргаа',
  'Эрүүл мэндийн яам',
  'Боловсрол, соёл, шинжлэх ухаан, спортын яам',
  'Худалдаа, хөгжлийн банк',
  'Худалдаа, аж үйлдвэрийн танхим',
  'Монголын банк',
  'Монголын уул уурхайн холбоо',
];

const CURRENCY_OPTIONS = [
  { value: 'MNT', label: '₮ - Монгол төгрөг' },
  { value: 'USD', label: '$ - АНУ доллар' },
  { value: 'EUR', label: '€ - Евро' },
  { value: 'CNY', label: '¥ - Хятад юань' },
];

export default function InvoiceCreateView() {
  const [items, setItems] = useState([{ id: 1, description: '', quantity: 1, rate: 0, amount: 0 }]);

  const methods = useForm({
    resolver: yupResolver(CreateInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const watchedAmount = watch('amount');

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);

    // Update total amount
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    setValue('amount', totalAmount);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Invoice data:', { ...data, items });
      reset();
      setItems([{ id: 1, description: '', quantity: 1, rate: 0, amount: 0 }]);
    } catch (error) {
      console.error(error);
    }
  });

  const formatCurrency = (amount: number, currency: string) => {
    const symbols = { MNT: '₮', USD: '$', EUR: '€', CNY: '¥' };
    return `${symbols[currency as keyof typeof symbols]}${amount.toLocaleString()}`;
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Шинэ нэхэмжлэл үүсгэх
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          {/* Basic Information */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Үндсэн мэдээлэл
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
              <RHFSelect name="organization" label="Байгууллага">
                {MOCK_ORGANIZATIONS.map((org) => (
                  <MenuItem key={org} value={org}>
                    {org}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="currency" label="Валют">
                {CURRENCY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="dueDate"
                label="Төлөх хугацаа"
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField name="amount" label="Нийт дүн" type="number" disabled />
            </Box>

            <RHFTextField
              name="description"
              label="Нэхэмжлэлийн тайлбар"
              multiline
              rows={3}
              sx={{ mt: 3 }}
            />
          </Card>

          {/* Invoice Items */}
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6">Нэхэмжлэлийн зүйлс</Typography>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:add-circle-bold" />}
                onClick={addItem}
              >
                Зүйл нэмэх
              </Button>
            </Box>

            <Stack spacing={2}>
              {items.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      fullWidth
                      label="Тайлбар"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                    <TextField
                      label="Тоо"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      sx={{ width: 100 }}
                    />
                    <TextField
                      label="Үнэ"
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      sx={{ width: 120 }}
                    />
                    <TextField
                      label="Дүн"
                      type="number"
                      value={item.amount}
                      disabled
                      sx={{ width: 120 }}
                    />
                    {items.length > 1 && (
                      <IconButton color="error" onClick={() => removeItem(item.id)}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Нийт дүн:</Typography>
              <Typography variant="h5" color="primary.main">
                {formatCurrency(watchedAmount, watch('currency'))}
              </Typography>
            </Box>
          </Card>

          {/* Additional Notes */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Нэмэлт мэдээлэл
            </Typography>

            <RHFTextField
              name="notes"
              label="Тэмдэглэл"
              multiline
              rows={4}
              placeholder="Нэхэмжлэлд нэмэлт мэдээлэл оруулах..."
            />
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

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Нэхэмжлэл үүсгэх
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
