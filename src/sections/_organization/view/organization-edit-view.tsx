'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { useSnackbar } from 'src/components/snackbar';
import { BusinessType, UpdateOrganizationData, Industry, Organization, SubscriptionPlan, SubscriptionStatus } from 'src/types/organization';
import { organizationApi } from 'src/utils/organization-api';
import { API_CONFIG } from 'src/config/api';

// ----------------------------------------------------------------------

const EditOrganizationSchema = Yup.object().shape({
  name: Yup.string().required('Байгууллагын нэр шаардлагатай'),
  displayName: Yup.string().required('Харагдах нэр шаардлагатай'),
  subdomain: Yup.string()
    .required('Дэд домэйн шаардлагатай')
    .matches(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/, 'Зөвхөн жижиг үсэг, тоо, зураас зөвшөөрнө')
    .min(3, 'Хамгийн багадаа 3 тэмдэгт байх ёстой')
    .max(63, 'Хамгийн ихдээ 63 тэмдэгт байх ёстой'),
  phone: Yup.string().required('Утасны дугаар шаардлагатай'),
  email: Yup.string().email('Зөв имэйл хаяг оруулна уу').required('Имэйл шаардлагатай'),
  description: Yup.string(),
  registrationNumber: Yup.string().required('Бүртгэлийн дугаар шаардлагатай'),
  businessType: Yup.string().required('Бизнесийн төрөл шаардлагатай'),
  industry: Yup.string().required('Салбар шаардлагатай'),
  logo: Yup.mixed(),
  address: Yup.object().shape({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string().default('Mongolia'),
  }),
  subscription: Yup.object().shape({
    plan: Yup.string().required('Төлөвлөгөө шаардлагатай'),
    status: Yup.string().required('Төлөв шаардлагатай'),
    endDate: Yup.string().nullable(),
  }),
});

// ----------------------------------------------------------------------

const BUSINESS_TYPE_OPTIONS = [
  { value: 'publisher', label: 'Хэвлэгч' },
  { value: 'distributor', label: 'Түгээгч' },
  { value: 'retailer', label: 'Жижиглэн худалдаачин' },
  { value: 'library', label: 'Номын сан' },
  { value: 'other', label: 'Бусад' },
];

const INDUSTRY_OPTIONS = [
  { value: 'webtoon', label: 'Вебтуун' },
  { value: 'manga', label: 'Манга' },
  { value: 'comics', label: 'Комикс' },
  { value: 'books', label: 'Ном' },
  { value: 'media', label: 'Хэвлэл мэдээлэл' },
  { value: 'education', label: 'Боловсрол' },
  { value: 'other', label: 'Бусад' },
];

const SUBSCRIPTION_PLAN_OPTIONS = [
  { value: 'free', label: 'Үнэгүй' },
  { value: 'basic', label: 'Энгийн' },
  { value: 'premium', label: 'Премиум' },
  { value: 'enterprise', label: 'Байгууллага' },
];

const SUBSCRIPTION_STATUS_OPTIONS = [
  { value: 'active', label: 'Идэвхтэй' },
  { value: 'inactive', label: 'Идэвхгүй' },
  { value: 'suspended', label: 'Түдгэлзүүлсэн' },
  { value: 'cancelled', label: 'Цуцалсан' },
];

const defaultValues = {
  name: '',
  displayName: '',
  subdomain: '',
  phone: '',
  email: '',
  description: '',
  registrationNumber: '',
  businessType: 'publisher' as BusinessType,
  industry: 'webtoon' as Industry,
  logo: null,
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Mongolia',
  },
  subscription: {
    plan: 'free' as SubscriptionPlan,
    status: 'active' as SubscriptionStatus,
    endDate: '',
  },
};

export default function OrganizationEditView() {
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [formReady, setFormReady] = useState(false);

  const organizationId = params?.id as string;

  const methods = useForm({
    resolver: yupResolver(EditOrganizationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Load organization data
  useEffect(() => {
    const loadOrganization = async () => {
      if (!organizationId) {
        enqueueSnackbar('Байгууллагын ID олдсонгүй', { variant: 'error' });
        router.push(paths.organization.root);
        return;
      }

      try {
        setLoading(true);
        const response = await organizationApi.getOrganization(organizationId);
        
        console.log('Loaded organization response:', response);
        
        // Extract organization from response - handle both {organization: {...}} and direct organization object
        const org = (response as any).organization || response;
        setOrganization(org);

        console.log('Extracted organization:', org);

        // Construct full logo URL if it's a relative path
        let logoUrl = org.logo || null;
        if (logoUrl && typeof logoUrl === 'string' && logoUrl.startsWith('/') && !logoUrl.startsWith('//')) {
          const baseUrl = API_CONFIG.BASE_URL;
          logoUrl = `${baseUrl}${logoUrl}`;
        }

        // Pre-populate form with existing data
        const formData = {
          name: org.name || '',
          displayName: org.displayName || '',
          subdomain: org.subdomain || '',
          phone: org.phone?.[0] || '',
          email: org.email?.[0] || '',
          description: org.description || '',
          registrationNumber: org.registrationNumber || '',
          businessType: (org.businessType || 'publisher') as BusinessType,
          industry: (org.industry || 'webtoon') as Industry,
          logo: logoUrl,
          address: {
            street: org.address?.street || '',
            city: org.address?.city || '',
            state: org.address?.state || '',
            postalCode: org.address?.postalCode || '',
            country: org.address?.country || 'Mongolia',
          },
          subscription: {
            plan: (org.subscription?.plan || 'free') as SubscriptionPlan,
            status: (org.subscription?.status || 'active') as SubscriptionStatus,
            endDate: org.subscription?.endDate ? new Date(org.subscription.endDate).toISOString().split('T')[0] : '',
          },
        };

        console.log('Form data to reset:', formData);
        
        // Use reset with shouldValidate: false to avoid validation errors during load
        reset(formData, { keepDefaultValues: false });
        
        // Mark form as ready after a brief delay to ensure reset completes
        setTimeout(() => {
          setFormReady(true);
        }, 100);
      } catch (error) {
        console.error('Failed to load organization:', error);
        enqueueSnackbar('Байгууллагын мэдээлэл ачаалахад алдаа гарлаа', { variant: 'error' });
        router.push(paths.organization.root);
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [organizationId, reset, router, enqueueSnackbar]);

  const onSubmit = handleSubmit(async (data) => {
    if (!organizationId) return;

    try {
      const updateData: UpdateOrganizationData = {
        name: data.name,
        displayName: data.displayName,
        description: data.description,
        logo: data.logo, // Can be File, string (URL), or null
        email: [data.email],
        phone: [data.phone],
        registrationNumber: data.registrationNumber,
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          country: data.address.country,
          coordinates: organization?.address?.coordinates || {
            type: 'Point',
            coordinates: [0, 0],
          },
        },
        subdomain: data.subdomain,
        businessType: data.businessType as BusinessType,
        industry: data.industry as Industry,
        subscription: {
          plan: data.subscription.plan as SubscriptionPlan,
          status: data.subscription.status as SubscriptionStatus,
          startDate: organization?.subscription?.startDate || new Date().toISOString(),
          endDate: data.subscription.endDate ? new Date(data.subscription.endDate).toISOString() : undefined,
          autoRenew: organization?.subscription?.autoRenew ?? true,
        },
      };

      await organizationApi.updateOrganization(organizationId, updateData);

      enqueueSnackbar('Байгууллага амжилттай шинэчлэгдлээ', { variant: 'success' });

      router.push(paths.organization.root);
    } catch (error) {
      console.error('Failed to update organization:', error);
      enqueueSnackbar('Байгууллага шинэчлэхэд алдаа гарлаа', { variant: 'error' });
    }
  });

  if (loading || !organization || !formReady) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        sx={{ my: 5 }}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Байгууллага', href: paths.organization.root },
          { name: 'Байгууллага засах' },
        ]}
      />

      <Typography variant="h4" sx={{ mb: 5 }}>
        Байгууллага засах
      </Typography>

      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3}>
            <Typography variant="h6">Үндсэн мэдээлэл</Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Байгууллагын нэр" />
              <RHFTextField name="displayName" label="Харагдах нэр" />
            </Box>

            <RHFUpload
              name="logo"
              thumbnail
              helperText="Байгууллагын лого зураг (PNG, JPG, GIF)"
            />

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
                name="subdomain"
                label="Дэд домэйн"
                placeholder="org-name"
                helperText="Жишээ: mongol-ulsyn-ikh-surguul"
                InputProps={{
                  endAdornment: (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                        py: 0.5,
                        bgcolor: 'grey.100',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.300',
                        ml: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        .anzaidev.fun
                      </Typography>
                    </Box>
                  ),
                }}
              />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="phone" label="Утасны дугаар" />
              <RHFTextField name="email" label="И-мэйл" />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="registrationNumber" label="Бүртгэлийн дугаар" />
              <RHFSelect name="businessType" label="Бизнесийн төрөл">
                {BUSINESS_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            <RHFSelect name="industry" label="Салбар">
              {INDUSTRY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Typography variant="h6">Лиценз ба Төлөвлөгөө</Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect name="subscription.plan" label="Төлөвлөгөө">
                {SUBSCRIPTION_PLAN_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="subscription.status" label="Төлөв">
                {SUBSCRIPTION_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="subscription.endDate"
                label="Дуусах хугацаа"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Typography variant="h6">Хаягийн мэдээлэл</Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="address.street" label="Гудамж" />
              <RHFTextField name="address.city" label="Хот" />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="address.state" label="Аймаг/Дүүрэг" />
              <RHFTextField name="address.postalCode" label="Шуудангийн код" />
            </Box>

            <RHFTextField name="address.country" label="Улс" defaultValue="Mongolia" disabled />

            <RHFTextField
              name="description"
              label="Тайлбар"
              multiline
              rows={4}
              placeholder="Байгууллагын тухай нэмэлт мэдээлэл..."
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                component={RouterLink}
                href={paths.organization.root}
                variant="outlined"
                color="inherit"
              >
                Цуцлах
              </Button>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Хадгалах
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}

