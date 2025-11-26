'use client';

import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { organizationApi } from 'src/utils/organization-api';
import { Organization } from 'src/types/organization';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  orgId: string;
  onSuccess?: VoidFunction;
};

export default function QPayRegisterDialog({ open, onClose, orgId, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [merchantType, setMerchantType] = useState<'company' | 'person'>('company');
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [organization, setOrganization] = useState<Organization | null>(null);

  // Unified schema that validates based on merchant_type
  const QPaySchema = Yup.object().shape({
    merchant_type: Yup.string().oneOf(['company', 'person']).required(),
    terminal_id: Yup.string(),
    username: Yup.string(),
    password: Yup.string(),
    // Company fields
    owner_first_name: Yup.string(), // Optional
    owner_last_name: Yup.string(), // Optional
    register_number: Yup.string().required('Бүртгэлийн дугаар шаардлагатай'),
    company_name: Yup.string().when('merchant_type', {
      is: 'company',
      then: (schema) => schema.required('Байгууллагын нэр шаардлагатай'),
      otherwise: (schema) => schema,
    }),
    name: Yup.string().required('Нэр шаардлагатай'), // Required for both types
    name_eng: Yup.string(), // Optional
    // Person fields
    first_name: Yup.string().when('merchant_type', {
      is: 'person',
      then: (schema) => schema.required('Нэр шаардлагатай'),
      otherwise: (schema) => schema,
    }),
    last_name: Yup.string().when('merchant_type', {
      is: 'person',
      then: (schema) => schema.required('Овог шаардлагатай'),
      otherwise: (schema) => schema,
    }),
    business_name: Yup.string().when('merchant_type', {
      is: 'person',
      then: (schema) => schema.required('Бизнесийн нэр шаардлагатай'),
      otherwise: (schema) => schema,
    }),
    business_name_eng: Yup.string(), // Optional
    // Common fields
    mcc_code: Yup.string().required('MCC код шаардлагатай'),
    city: Yup.string().required('Хот шаардлагатай'),
    district: Yup.string().required('Дүүрэг шаардлагатай'),
    address: Yup.string().required('Хаяг шаардлагатай'),
    phone: Yup.string().required('Утас шаардлагатай'),
    email: Yup.string().email('Имэйл буруу байна').required('Имэйл шаардлагатай'),
    owner_register_no: Yup.string(),
  });

  const defaultValues = {
    merchant_type: 'company' as 'company' | 'person',
    terminal_id: '',
    username: '',
    password: '',
    // Company fields
    owner_first_name: '',
    owner_last_name: '',
    register_number: '',
    company_name: '',
    name: '',
    name_eng: '',
    mcc_code: '',
    city: '',
    district: '',
    address: '',
    phone: '',
    email: '',
    owner_register_no: '',
    // Person fields
    first_name: '',
    last_name: '',
    business_name: '',
    business_name_eng: '',
  };

  const methods = useForm({
    resolver: yupResolver(QPaySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = methods;

  const watchedMerchantType = watch('merchant_type') as 'company' | 'person';

  // Sync merchantType state with form value when it changes
  useEffect(() => {
    if (watchedMerchantType && watchedMerchantType !== merchantType) {
      setMerchantType(watchedMerchantType);
      // When switching types, preserve common fields and organization data
      const currentValues = watch();
      const preservedValues = {
        ...defaultValues,
        merchant_type: watchedMerchantType,
        // Preserve QPay credentials
        terminal_id: currentValues.terminal_id || '',
        username: currentValues.username || '',
        password: currentValues.password || '',
        // Preserve common organization data
        register_number: currentValues.register_number || '',
        email: currentValues.email || '',
        phone: currentValues.phone || '',
        address: currentValues.address || '',
        city: currentValues.city || '',
        district: currentValues.district || '',
        mcc_code: currentValues.mcc_code || '',
      };

      // If organization data is available, use it for the new type
      if (organization) {
        if (watchedMerchantType === 'company') {
          preservedValues.company_name = organization.name;
          preservedValues.name = organization.displayName || organization.name;
          preservedValues.name_eng = organization.name;
          preservedValues.owner_register_no = organization.taxId || '';
        } else {
          const nameParts = organization.name?.split(' ') || [];
          preservedValues.first_name = nameParts[0] || '';
          preservedValues.last_name = nameParts.slice(1).join(' ') || '';
          preservedValues.name = organization.displayName || organization.name;
          preservedValues.name_eng = organization.name;
          preservedValues.business_name = organization.name;
          preservedValues.business_name_eng = organization.name;
        }
      }

      reset(preservedValues);
    }
  }, [watchedMerchantType, organization]);

  // Load organization data and check QPay merchant status on open
  useEffect(() => {
    if (open && orgId) {
      loadOrganizationData();
      checkMerchantStatus();
    }
  }, [open, orgId]);

  // Load organization data and pre-fill form
  const loadOrganizationData = async () => {
    try {
      const orgData = await organizationApi.getOrganization(orgId);
      setOrganization(orgData);

      // Determine merchant type based on business type (default to company)
      const type: 'company' | 'person' = orgData.businessType === 'other' ? 'person' : 'company';
      setMerchantType(type);

      // Build address string
      const addressParts: string[] = [];
      if (orgData.address.street) addressParts.push(orgData.address.street);
      if (orgData.address.city) addressParts.push(orgData.address.city);
      if (orgData.address.state) addressParts.push(orgData.address.state);
      if (orgData.address.postalCode) addressParts.push(orgData.address.postalCode);
      if (orgData.address.country) addressParts.push(orgData.address.country);
      const fullAddress = addressParts.join(', ');

      // Pre-fill form with organization data
      const preFilledValues = {
        merchant_type: type,
        terminal_id: '',
        username: '',
        password: '',
        // Common fields
        register_number: orgData.registrationNumber || '',
        email: orgData.email?.[0] || '',
        phone: orgData.phone?.[0] || '',
        address: fullAddress || '',
        city: orgData.address?.city || orgData.address?.postalCode || '',
        district: orgData.address?.state || orgData.address?.postalCode || '',
        mcc_code: '', // Not available in org data
        // Company fields
        company_name: type === 'company' ? orgData.name : '',
        name: orgData.displayName || orgData.name || '',
        name_eng: orgData.name || '',
        owner_first_name: '',
        owner_last_name: '',
        owner_register_no: orgData.taxId || '',
        // Person fields
        first_name: type === 'person' ? orgData.name?.split(' ')[0] || '' : '',
        last_name: type === 'person' ? orgData.name?.split(' ').slice(1).join(' ') || '' : '',
        business_name: type === 'person' ? orgData.name : '',
        business_name_eng: type === 'person' ? orgData.name : '',
      };

      reset(preFilledValues);
    } catch (error) {
      console.error('Failed to load organization data:', error);
      // Reset to defaults if loading fails
      reset({
        ...defaultValues,
        merchant_type: 'company',
      });
      setMerchantType('company');
    }
  };

  const checkMerchantStatus = async () => {
    try {
      setCheckingStatus(true);
      const response = await organizationApi.getQPayMerchant(orgId);
      if (response && typeof response === 'object' && 'data' in response) {
        const responseData = response as { data?: { registered?: boolean } };
        if (responseData.data?.registered) {
          enqueueSnackbar('Энэ байгууллага QPay-д аль хэдийн бүртгэгдсэн байна', {
            variant: 'info',
          });
        }
      }
    } catch (error) {
      // Ignore errors, just check if already registered
    } finally {
      setCheckingStatus(false);
    }
  };

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await organizationApi.registerQPayMerchant(orgId, {
        ...data,
        merchant_type: data.merchant_type || merchantType,
      });
      enqueueSnackbar('QPay бүртгэл амжилттай хийгдлээ', { variant: 'success' });
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('QPay registration error:', error);
      enqueueSnackbar(error?.response?.data?.message || 'QPay бүртгэл хийхэд алдаа гарлаа', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmitForm}>
        <DialogTitle sx={{ typography: 'h3', pb: 3 }}>QPay Бүртгэл</DialogTitle>

        <DialogContent>
          {organization && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                bgcolor: 'info.50',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'info.200',
              }}
            >
              <Box sx={{ typography: 'caption', color: 'info.darker', fontWeight: 'medium' }}>
                Талбарууд байгууллагын мэдээллээс автоматаар бөглөгдсөн байна. Шаардлагатай бол
                засах боломжтой.
              </Box>
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <RHFSelect name="merchant_type" label="Худалдаачны төрөл *">
              <MenuItem value="company">Байгууллага</MenuItem>
              <MenuItem value="person">Хувь хүн</MenuItem>
            </RHFSelect>
          </Box>

          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <RHFTextField
              name="terminal_id"
              label="Terminal ID (сонголттой)"
              helperText="Хэрэв хоосон байвал QPay автоматаар үндсэн терминал онооно"
              sx={{ mb: 2 }}
            />
            <RHFTextField name="username" label="QPay Username (сонголттой)" sx={{ mb: 2 }} />
            <RHFTextField
              name="password"
              label="QPay Password (сонголттой)"
              type="password"
              sx={{ mb: 2 }}
            />
            <Box sx={{ typography: 'caption', color: 'text.secondary', mt: 1 }}>
              Хэрэв эдгээр талбарууд хоосон байвал системийн тохиргооны мэдээллийг ашиглана. QPay
              QuickQR нь бүртгэл үүсэх үед автоматаар үндсэн терминал оноодог.
            </Box>
          </Box>

          {merchantType === 'company' ? (
            <>
              <RHFTextField
                name="owner_first_name"
                label="Эзэмшлийн эзний нэр (сонголттой)"
                sx={{ mb: 2 }}
              />
              <RHFTextField
                name="owner_last_name"
                label="Эзэмшлийн эзний овог (сонголттой)"
                sx={{ mb: 2 }}
              />
              <RHFTextField name="register_number" label="Бүртгэлийн дугаар *" sx={{ mb: 2 }} />
              <RHFTextField name="company_name" label="Байгууллагын нэр *" sx={{ mb: 2 }} />
              <RHFTextField name="name" label="Нэр *" sx={{ mb: 2 }} />
              <RHFTextField name="name_eng" label="Нэр (Англи) (сонголттой)" sx={{ mb: 2 }} />
              <RHFTextField name="mcc_code" label="MCC код *" sx={{ mb: 2 }} />
              <RHFTextField name="city" label="Хот *" sx={{ mb: 2 }} />
              <RHFTextField name="district" label="Дүүрэг *" sx={{ mb: 2 }} />
              <RHFTextField name="address" label="Хаяг *" sx={{ mb: 2 }} />
              <RHFTextField name="phone" label="Утас *" sx={{ mb: 2 }} />
              <RHFTextField name="email" label="Имэйл *" sx={{ mb: 2 }} />
              <RHFTextField
                name="owner_register_no"
                label="Эзэмшлийн эзний бүртгэлийн дугаар (сонголттой)"
                sx={{ mb: 2 }}
              />
            </>
          ) : (
            <>
              <RHFTextField name="register_number" label="Бүртгэлийн дугаар *" sx={{ mb: 2 }} />
              <RHFTextField name="first_name" label="Нэр *" sx={{ mb: 2 }} />
              <RHFTextField name="last_name" label="Овог *" sx={{ mb: 2 }} />
              <RHFTextField name="name" label="Нэр *" sx={{ mb: 2 }} />
              <RHFTextField name="name_eng" label="Нэр (Англи) (сонголттой)" sx={{ mb: 2 }} />
              <RHFTextField name="business_name" label="Бизнесийн нэр *" sx={{ mb: 2 }} />
              <RHFTextField
                name="business_name_eng"
                label="Бизнесийн нэр (Англи) (сонголттой)"
                sx={{ mb: 2 }}
              />
              <RHFTextField name="mcc_code" label="MCC код *" sx={{ mb: 2 }} />
              <RHFTextField name="city" label="Хот *" sx={{ mb: 2 }} />
              <RHFTextField name="district" label="Дүүрэг *" sx={{ mb: 2 }} />
              <RHFTextField name="address" label="Хаяг *" sx={{ mb: 2 }} />
              <RHFTextField name="phone" label="Утас *" sx={{ mb: 2 }} />
              <RHFTextField name="email" label="Имэйл *" sx={{ mb: 2 }} />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Цуцлах
          </Button>

          <LoadingButton
            color="inherit"
            type="submit"
            variant="contained"
            loading={isSubmitting || loading}
            onClick={onSubmitForm}
          >
            Бүртгэх
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
