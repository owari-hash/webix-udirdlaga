'use client';

import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { useSnackbar } from 'src/components/snackbar';
import { BusinessType, CreateOrganizationData, Industry } from 'src/types/organization';
import { organizationApi } from 'src/utils/organization-api';

// ----------------------------------------------------------------------

const AddOrganizationSchema = Yup.object().shape({
  name: Yup.string().required('Байгууллагын нэр шаардлагатай'),
  displayName: Yup.string().required('Харагдах нэр шаардлагатай'),
  subdomain: Yup.string()
    .required('Дэд домэйн шаардлагатай')
    .matches(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/, 'Зөвхөн жижиг үсэг, тоо, зураас зөвшөөрнө')
    .min(3, 'Хамгийн багадаа 3 тэмдэгт байх ёстой')
    .max(63, 'Хамгийн ихдээ 63 тэмдэгт байх ёстой'),
  phone: Yup.string().required('Утасны дугаар шаардлагатай'),
  email: Yup.string().email('Зөв имэйл хаяг оруулна уу').required('Имэйл шаардлагатай'),
  password: Yup.string().required('Нууц үг шаардлагатай'),
  description: Yup.string(),
  registrationNumber: Yup.string().required('Бүртгэлийн дугаар шаардлагатай'),
  businessType: Yup.string().required('Бизнесийн төрөл шаардлагатай'),
  industry: Yup.string().required('Салбар шаардлагатай'),
  address: Yup.object().shape({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string().default('Mongolia'),
  }),
});

const defaultValues = {
  name: '',
  displayName: '',
  subdomain: '',
  phone: '',
  email: '',
  password: '',
  description: '',
  registrationNumber: '',
  businessType: 'publisher' as BusinessType,
  industry: 'webtoon' as Industry,
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Mongolia',
  },
};

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

export default function OrganizationAddView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(AddOrganizationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const watchedName = watch('name');
  const watchedSubdomain = watch('subdomain');

  // Generate subdomain from organization name
  const generateSubdomain = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Auto-generate subdomain when name changes
  React.useEffect(() => {
    if (watchedName && !watchedSubdomain) {
      const generated = generateSubdomain(watchedName);
      setValue('subdomain', generated);
    }
  }, [watchedName, watchedSubdomain, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const organizationData: CreateOrganizationData = {
        name: data.name,
        displayName: data.displayName,
        description: data.description,
        email: [data.email],
        phone: [data.phone],
        password: data.password,
        registrationNumber: data.registrationNumber,
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          country: data.address.country,
          coordinates: {
            type: 'Point',
            coordinates: [0, 0], // Default coordinates
          },
        },
        subdomain: data.subdomain,
        businessType: data.businessType as BusinessType,
        industry: data.industry as Industry,
      };

      const result = await organizationApi.createOrganization(organizationData);

      enqueueSnackbar('Байгууллага амжилттай үүсгэгдлээ', { variant: 'success' });

      // Show login credentials
      enqueueSnackbar(
        `Нэвтрэх мэдээлэл: ${result.loginCredentials.username} / ${result.loginCredentials.password}`,
        { variant: 'info', autoHideDuration: 10000 }
      );

      router.push(paths.organization.root);
    } catch (error) {
      console.error('Failed to create organization:', error);
      enqueueSnackbar('Байгууллага үүсгэхэд алдаа гарлаа', { variant: 'error' });
    }
  });

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        sx={{ my: 5 }}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Байгууллага', href: paths.organization.root },
          { name: 'Шинэ байгууллага нэмэх' },
        ]}
      />

      <Typography variant="h4" sx={{ mb: 5 }}>
        Шинэ байгууллага нэмэх
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
              <RHFTextField name="password" label="Нууц үг" type="password" />
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
