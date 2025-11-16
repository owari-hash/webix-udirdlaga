'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: 'admin';
  }) => Promise<void>;
};

export default function AddOrgAdminDialog({ open, onClose, onSubmit }: Props) {
  const NewOrgAdminSchema = Yup.object().shape({
    firstName: Yup.string().required('Нэр шаардлагатай'),
    lastName: Yup.string().required('Овог шаардлагатай'),
    username: Yup.string().required('Хэрэглэгчийн нэр шаардлагатай'),
    email: Yup.string().email('Имэйл буруу байна').required('Имэйл шаардлагатай'),
    password: Yup.string().min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой').required('Нууц үг шаардлагатай'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Нууц үг таарахгүй байна')
      .required('Нууц үгийг давтана уу'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as const,
  };

  const methods = useForm({
    resolver: yupResolver(NewOrgAdminSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await onSubmit({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'admin',
      });
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmitForm}>
        <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Байгууллагын Админ нэмэх</DialogTitle>

        <DialogContent>
          <RHFTextField name="firstName" label="Нэр *" sx={{ mb: 2 }} />
          <RHFTextField name="lastName" label="Овог *" sx={{ mb: 2 }} />
          <RHFTextField name="username" label="Хэрэглэгчийн нэр *" sx={{ mb: 2 }} />
          <RHFTextField name="email" label="Имэйл *" sx={{ mb: 2 }} />
          <RHFTextField
            name="password"
            label="Нууц үг *"
            type="password"
            sx={{ mb: 2 }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Нууц үг давтах *"
            type="password"
            sx={{ mb: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Цуцлах
          </Button>

          <LoadingButton
            color="inherit"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitForm}
          >
            Нэмэх
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

