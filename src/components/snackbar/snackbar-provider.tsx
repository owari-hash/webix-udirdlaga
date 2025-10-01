'use client';

import { SnackbarProvider as MuiSnackbarProvider } from 'notistack';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function SnackbarProvider({ children }: Props) {
  return (
    <MuiSnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      dense
    >
      {children}
    </MuiSnackbarProvider>
  );
}

