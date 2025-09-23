'use client';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Sidebar from 'src/components/sidebar/sidebar';
import SidebarHeader from 'src/components/sidebar/sidebar-header';
import { useSidebar, SidebarProvider } from 'src/contexts/sidebar-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

function SidebarLayoutContent({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { open, onClose } = useSidebar();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar open={open} onClose={onClose} variant={isMobile ? 'temporary' : 'persistent'} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'margin 0.3s ease-in-out',
          marginLeft: isMobile ? 0 : open ? '280px' : '0px',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <SidebarHeader />

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: 'background.default',
            p: 3,
            marginTop: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function SidebarLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarProvider>
  );
}
