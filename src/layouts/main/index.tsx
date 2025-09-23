'use client';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import { HEADER } from '../config-layout';
import SidebarLayout from '../sidebar/sidebar-layout';

import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career', '/career/', '/travel', '/travel/'];

const spacingLayout = [
  ...pathsOnDark,
  '/',
  '/e-learning',
  '/e-learning/',
  '/marketing',
  '/marketing/',
];

const sidebarPaths = [
  '/dashboard',
  '/organization',
  '/payment',
];

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const actionPage = (arr: string[]) => arr.some((path) => pathname.startsWith(path));

  // Use sidebar layout for dashboard, organization, and payment pages
  if (actionPage(sidebarPaths)) {
    return <SidebarLayout>{children}</SidebarLayout>;
  }

  // Use regular layout for other pages
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={actionPage(pathsOnDark)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}

        {children}
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
