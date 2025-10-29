'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import Logo from 'src/components/logo';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuth } from 'src/contexts/auth-context';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function LoginCoverView() {
  const passwordShow = useBoolean();
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Хэрэглэгчийн нэр шаардлагатай'),
    password: Yup.string().required('Нууц үг шаардлагатай'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await login({ username: data.username, password: data.password });
      if (result.success) {
        reset();
        enqueueSnackbar('Амжилттай нэвтэрлээ!', { variant: 'success' });
        router.push(paths.dashboard.root);
      } else {
        // Show better error messages with Mongolian support
        const errorMessage = result.error || 'Нэвтрэхэд алдаа гарлаа';
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          autoHideDuration: 6000,
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Гадаад алдаа гарлаа. Дахин оролдоно уу.', {
        variant: 'error',
        autoHideDuration: 6000,
      });
    }
  });

  const renderHead = (
    <Stack
      sx={{
        pb: 5,
        pt: { xs: 5, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h3" paragraph>
        Нэвтрэх
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Бүртгэл байхгүй юу? `}
        <Link component={RouterLink} href={paths.registerCover} variant="subtitle2" color="primary">
          Энд дарж бүртгүүлэх
        </Link>
      </Typography>
    </Stack>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>

      <Button color="inherit" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField name="username" label="Хэрэглэгчийн нэр" />

        <RHFTextField
          name="password"
          label="Нууц үг"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Нууц үг мартсан уу?
        </Link>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isLoading}
        >
          Нэвтрэх
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      <Logo />

      {renderHead}

      {renderSocials}

      <Divider sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          OR
        </Typography>
      </Divider>

      {renderForm}
    </>
  );
}
