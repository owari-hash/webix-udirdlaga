'use client';

import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const AddOrganizationSchema = Yup.object().shape({
  name: Yup.string().required('Байгууллагын нэр шаардлагатай'),
  subdomain: Yup.string()
    .required('Дэд домэйн шаардлагатай')
    .matches(/^[a-z0-9-]+$/, 'Зөвхөн жижиг үсэг, тоо, зураас зөвшөөрнө')
    .min(3, 'Хамгийн багадаа 3 тэмдэгт байх ёстой')
    .max(20, 'Хамгийн ихдээ 20 тэмдэгт байх ёстой'),
  phone: Yup.string().required('Утасны дугаар шаардлагатай'),
  email: Yup.string().email('Зөв имэйл хаяг оруулна уу').required('Имэйл шаардлагатай'),
  website: Yup.string().url('Зөв вэб сайт хаяг оруулна уу'),
  description: Yup.string(),
});

const defaultValues = {
  name: '',
  subdomain: '',
  phone: '',
  email: '',
  website: '',
  description: '',
};

// ----------------------------------------------------------------------

export default function OrganizationAddView() {
  const methods = useForm({
    resolver: yupResolver(AddOrganizationSchema),
    defaultValues,
  });

  const {
    reset,
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Organization data:', data);
      reset();
      // Here you would typically redirect to the organization list
      // or show a success message
    } catch (error) {
      console.error(error);
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
                        .webix.mn
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

            <RHFTextField name="website" label="Вэб сайт" />

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
